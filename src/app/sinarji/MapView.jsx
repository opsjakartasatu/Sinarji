"use client";
import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import Zoom from "@arcgis/core/widgets/Zoom";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { useMapContext } from "./MapContext";

const GEOSERVER_URL = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms";

export default function MapViewComponent() {
  const mapNodeRef = useRef(null);
  const { setView, layersState, setLayersState } = useMapContext();
  const mapRef = useRef(null);

  // Inisialisasi Map dan MapView
  useEffect(() => {
    const map = new Map({ basemap: "satellite" });
    mapRef.current = map;

    const mv = new MapView({
      container: mapNodeRef.current,
      map,
      center: [106.8456, -6.2088],
      zoom: 11,
      ui: { components: [] },
    });

    const zoom = new Zoom({ view: mv });
    mv.ui.add(zoom, "bottom-right");

    mv.when(() => setView(mv));

    return () => mv.destroy();
  }, [setView]);

  // Fetch GetCapabilities dari Geoserver
  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const url = `${GEOSERVER_URL}?service=WMS&request=GetCapabilities&version=1.1.1`;
        const res = await fetch(url);
        const text = await res.text();
        const xml = new DOMParser().parseFromString(text, "text/xml");

        const nodes = Array.from(xml.getElementsByTagName("Layer")).filter((n) => n.getElementsByTagName("Name")[0]);

        const parsed = nodes.map((n) => {
          const name = n.getElementsByTagName("Name")[0].textContent;
          const title = n.getElementsByTagName("Title")[0]?.textContent || name;
          return {
            id: name,
            name,
            title,
            visible: false,
            opacity: 1,
          };
        });

        setLayersState(parsed);
      } catch (err) {
        console.error("GetCapabilities error:", err);
      }
    };

    fetchCapabilities();
  }, [setLayersState]);

  // Sinkronisasi layersState dengan map
  useEffect(() => {
    if (!mapRef.current) return;

    // Loop semua layer config
    layersState.forEach((layerConfig) => {
      const { id, name, visible, opacity } = layerConfig;

      // Cari layer existing di map
      let existingLayer = mapRef.current.findLayerById(id);

      if (visible && !existingLayer) {
        // Tambahkan WMSLayer baru
        const newLayer = new WMSLayer({
          id,
          url: GEOSERVER_URL,
          sublayers: [{ name }],
          opacity,
        });
        mapRef.current.add(newLayer);
      } else if (!visible && existingLayer) {
        // Hapus layer dari map
        mapRef.current.remove(existingLayer);
      } else if (visible && existingLayer) {
        // Update opacity
        existingLayer.opacity = opacity;
      }
    });
  }, [layersState]);

  return <div ref={mapNodeRef} style={{ width: "100%", height: "100%" }} />;
}
