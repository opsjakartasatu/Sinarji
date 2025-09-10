"use client";
import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import Zoom from "@arcgis/core/widgets/Zoom";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { useMapContext } from "./MapContext";
import "./style.css";

const GEOSERVER_URL_ADMIN = "https://gis.dcktrp.id/gispublik/publik/Batas%20Administrasi%20Wilayah%20Jakarta/ows?service=WMS&version=1.3.0&request=GetCapabilities";

export default function MapViewComponent() {
  const mapNodeRef = useRef(null);
  const { setView, setMap, layersState, setPixelValue } = useMapContext();
  const mapRef = useRef(null);
  const viewRef = useRef(null);

  // Inisialisasi Map dan MapView
  useEffect(() => {
    const map = new Map({ basemap: "satellite" });
    mapRef.current = map;
    setMap(map);

    const mv = new MapView({
      container: mapNodeRef.current,
      map,
      center: [106.8456, -6.2088],
      zoom: 11,
      ui: { components: [] },
    });

    viewRef.current = mv;
    setView(mv);

    // widget
    const zoom = new Zoom({ view: mv });
    mv.ui.add(zoom, { position: "bottom-right" });

    const basemapGallery = new BasemapGallery({ view: mv });
    const basemapExpand = new Expand({
      view: mv,
      content: basemapGallery,
      expandTooltip: "Pilih Basemap",
      expandIconClass: "esri-icon-basemap",
    });
    mv.ui.add(basemapExpand, { position: "bottom-right", index: 1 });

    // Admin layer
    const adminLayer = new WMSLayer({
      id: "batas-admin",
      url: GEOSERVER_URL_ADMIN,
      sublayers: [{ name: "Batas Administrasi Wilayah Jakarta" }],
      opacity: 1,
      visible: true,
    });
    map.add(adminLayer, map.layers.length);

    return () => mv.destroy();
  }, [setView, setMap]);

  // Sinkronisasi layersState dengan map
  useEffect(() => {
    if (!mapRef.current) return;

    layersState.forEach((layerConfig) => {
      const { id, name, names, visible, opacity, url } = layerConfig;
      let existingLayer = mapRef.current.findLayerById(id);

      if (visible && !existingLayer) {
        const newLayer = new WMSLayer({
          id,
          url,
          sublayers: names ? names.map((n) => ({ name: n })) : [{ name }],
          opacity,
        });
        mapRef.current.add(newLayer);
      } else if (!visible && existingLayer) {
        mapRef.current.remove(existingLayer);
      } else if (visible && existingLayer) {
        existingLayer.opacity = opacity;
      }
    });

    // Admin layer selalu di paling atas
    const adminLayer = mapRef.current.findLayerById("batas-admin");
    if (adminLayer) {
      mapRef.current.reorder(adminLayer, mapRef.current.layers.length - 1);
    }
  }, [layersState]);

  // Handler klik → GetFeatureInfo
  useEffect(() => {
    if (!viewRef.current) return;

    const handler = viewRef.current.on("click", async (event) => {
      // cari layer raster aktif (skip batas-admin)
      const activeLayer = layersState.find((l) => l.visible && l.id !== "batas-admin");
      if (!activeLayer) return;

      const { url, name } = activeLayer;
      const extent = viewRef.current.extent;
      const bbox = `${extent.xmin},${extent.ymin},${extent.xmax},${extent.ymax}`;

      const params = new URLSearchParams({
        service: "WMS",
        version: "1.1.1",
        request: "GetFeatureInfo",
        layers: name,
        query_layers: name,
        bbox,
        srs: "EPSG:3857", // pakai Web Mercator sesuai MapView
        width: viewRef.current.width,
        height: viewRef.current.height,
        x: Math.floor(event.x),
        y: Math.floor(event.y),
        info_format: "text/plain", // raster biasanya support ini
      });

      try {
        const res = await fetch(`${url}?${params.toString()}`);
        const data = await res.text(); // ambil text
        console.log("Pixel value (raw):", data);

        // simpan ke context
        setPixelValue(data);
      } catch (err) {
        console.error("GetFeatureInfo error:", err);
      }
    });

    return () => handler.remove();
  }, [layersState, setPixelValue]);

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <Box ref={mapNodeRef} sx={{ width: "100%", height: "100%" }} />
    </Box>
  );
}
