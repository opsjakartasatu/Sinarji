"use client";
import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import Zoom from "@arcgis/core/widgets/Zoom";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { useMapContext } from "./MapContext";
import Sidebar from "@/components/sidebarDashboard/SidebarSinarji";
import InformasiPeta from "@/app/sinarji/InformasiPeta";
import "./style.css";

const GEOSERVER_URL_ADMIN = "https://gis.dcktrp.id/gispublik/publik/Batas%20Administrasi%20Wilayah%20Jakarta/ows?service=WMS&version=1.3.0&request=GetCapabilities";

export default function CompareView() {
  const { isCompareMode, layersStateLeft, layersStateRight, setMapLeft, setViewLeft, setMapRight, setViewRight, setPixelValueLeft, setPixelValueRight, viewLeft, viewRight } = useMapContext();

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const mapLeftRef = useRef(null);
  const mapRightRef = useRef(null);

  useEffect(() => {
    if (!isCompareMode) return;

    // --- Map Left
    const mapLeft = new Map({ basemap: "satellite" });
    mapLeftRef.current = mapLeft;
    setMapLeft(mapLeft);

    const mvLeft = new MapView({
      container: leftRef.current,
      map: mapLeft,
      center: [106.8456, -6.2088],
      zoom: 12,
      ui: { components: [] },
    });
    setViewLeft(mvLeft);
    mvLeft.ui.add(new Zoom({ view: mvLeft }), "bottom-right");

    // --- Map Right
    const mapRight = new Map({ basemap: "satellite" });
    mapRightRef.current = mapRight;
    setMapRight(mapRight);

    const mvRight = new MapView({
      container: rightRef.current,
      map: mapRight,
      center: [106.8456, -6.2088],
      zoom: 12,
      ui: { components: [] },
    });
    setViewRight(mvRight);
    mvRight.ui.add(new Zoom({ view: mvRight }), "bottom-left");

    // --- Admin Layers
    const adminLayerLeft = new WMSLayer({
      id: "batas-admin",
      url: GEOSERVER_URL_ADMIN,
      sublayers: [{ name: "Batas Administrasi Wilayah Jakarta" }],
      opacity: 1,
      visible: true,
    });
    mapLeft.add(adminLayerLeft);

    const adminLayerRight = new WMSLayer({
      id: "batas-admin",
      url: GEOSERVER_URL_ADMIN,
      sublayers: [{ name: "Batas Administrasi Wilayah Jakarta" }],
      opacity: 1,
      visible: true,
    });
    mapRight.add(adminLayerRight);

    // === Sync view
    function syncViews(view1, view2) {
      let timeout;
      const stopWatch = reactiveUtils.watch(
        () => view1.viewpoint,
        (vp) => {
          if (!vp || !view2 || view2.destroyed) return; // <-- cek view2
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            if (!view2.destroyed) view2.viewpoint = vp.clone();
          }, 80);
        }
      );
      return stopWatch; // simpan agar bisa dibersihkan
    }

    syncViews(mvLeft, mvRight);
    syncViews(mvRight, mvLeft);

    const stop1 = syncViews(mvLeft, mvRight);
    const stop2 = syncViews(mvRight, mvLeft);

    return () => {
      try {
        mvLeft.destroy();
        mvRight.destroy();
      } catch (e) {}
      stop1 && stop1.remove(); // bersihkan watch
      stop2 && stop2.remove();
    };
  }, [isCompareMode, setMapLeft, setViewLeft, setMapRight, setViewRight]);

  // === Sync layers & add raster layer clickable
  const syncLayers = (layersState, mapRef) => {
    if (!mapRef.current) return;

    layersState.forEach((layerConfig) => {
      const { id, name, names, visible, opacity, url } = layerConfig;
      let existing = mapRef.current.findLayerById(id);

      if (visible && !existing) {
        const layer = new WMSLayer({
          id,
          url,
          sublayers: names ? names.map((n) => ({ name: n, popupEnabled: true })) : [{ name, popupEnabled: true }],
          opacity,
        });
        mapRef.current.add(layer);
      } else if (!visible && existing) {
        mapRef.current.remove(existing);
      } else if (visible && existing) {
        existing.opacity = opacity;
      }
    });

    // pastikan admin layer paling atas
    const adminLayer = mapRef.current.findLayerById("batas-admin");
    if (adminLayer) {
      mapRef.current.reorder(adminLayer, mapRef.current.layers.length - 1);
    }
  };

  useEffect(() => syncLayers(layersStateLeft, mapLeftRef), [layersStateLeft]);
  useEffect(() => syncLayers(layersStateRight, mapRightRef), [layersStateRight]);

  // === GetFeatureInfo LEFT
  useEffect(() => {
    if (!viewLeft) return;

    const handler = viewLeft.on("click", async (event) => {
      if (!mapLeftRef.current) return;

      const activeLayerConfig = layersStateLeft.find((l) => l.visible && l.id !== "batas-admin");
      if (!activeLayerConfig) {
        setPixelValueLeft(null);
        return;
      }

      const layer = mapLeftRef.current.findLayerById(activeLayerConfig.id);
      if (!layer) {
        setPixelValueLeft(null);
        return;
      }

      try {
        await layer.when();
        await viewLeft.whenLayerView(layer); // pastikan layer siap

        const screenPoint = viewLeft.toScreen(event.mapPoint);
        const extent = viewLeft.extent;
        const bbox = `${extent.xmin},${extent.ymin},${extent.xmax},${extent.ymax}`;

        const params = new URLSearchParams({
          service: "WMS",
          version: "1.1.1",
          request: "GetFeatureInfo",
          layers: activeLayerConfig.name,
          query_layers: activeLayerConfig.name,
          bbox,
          srs: "EPSG:3857",
          width: viewLeft.width,
          height: viewLeft.height,
          x: Math.floor(screenPoint.x),
          y: Math.floor(screenPoint.y),
          info_format: "text/plain",
        });

        const res = await fetch(`${activeLayerConfig.url}?${params.toString()}`);
        const text = await res.text();
        const match = text.match(/GRAY_INDEX\s*=\s*([0-9\.\-eE]+)/);

        if (match) {
          setPixelValueLeft({ raw: text, value: parseFloat(match[1]) });
        } else {
          setPixelValueLeft({ raw: text, value: null, error: true });
        }
      } catch (err) {
        console.error("GetFeatureInfo Left gagal:", err);
        setPixelValueLeft(null);
      }
    });

    return () => handler && handler.remove();
  }, [layersStateLeft, setPixelValueLeft, viewLeft]);

  // === GetFeatureInfo RIGHT
  useEffect(() => {
    if (!viewRight) return;

    const handler = viewRight.on("click", async (event) => {
      if (!mapRightRef.current) return;

      const activeLayerConfig = layersStateRight.find((l) => l.visible && l.id !== "batas-admin");
      if (!activeLayerConfig) {
        setPixelValueRight(null);
        return;
      }

      const layer = mapRightRef.current.findLayerById(activeLayerConfig.id);
      if (!layer) {
        setPixelValueRight(null);
        return;
      }

      try {
        await layer.when();
        await viewRight.whenLayerView(layer); // pastikan layer siap

        const screenPoint = viewRight.toScreen(event.mapPoint);
        const extent = viewRight.extent;
        const bbox = `${extent.xmin},${extent.ymin},${extent.xmax},${extent.ymax}`;

        const params = new URLSearchParams({
          service: "WMS",
          version: "1.1.1",
          request: "GetFeatureInfo",
          layers: activeLayerConfig.name,
          query_layers: activeLayerConfig.name,
          bbox,
          srs: "EPSG:3857",
          width: viewRight.width,
          height: viewRight.height,
          x: Math.floor(screenPoint.x),
          y: Math.floor(screenPoint.y),
          info_format: "text/plain",
        });

        const res = await fetch(`${activeLayerConfig.url}?${params.toString()}`);
        const text = await res.text();
        const match = text.match(/GRAY_INDEX\s*=\s*([0-9\.\-eE]+)/);

        if (match) {
          setPixelValueRight({ raw: text, value: parseFloat(match[1]) });
        } else {
          setPixelValueRight({ raw: text, value: null, error: true });
        }
      } catch (err) {
        console.error("GetFeatureInfo Right gagal:", err);
        setPixelValueRight(null);
      }
    });

    return () => handler && handler.remove();
  }, [layersStateRight, setPixelValueRight, viewRight]);

  if (!isCompareMode) return null;

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%", position: "relative" }}>
      <Sidebar target="left" />
      <Box ref={leftRef} sx={{ flex: 1, borderRight: "2px solid #ccc" }} id="map-left" />
      <Box ref={rightRef} sx={{ flex: 1, borderLeft: "2px solid #ccc" }} id="map-right" />
      <Sidebar target="right" />
      <InformasiPeta target="left" position="left" />
      <InformasiPeta target="right" position="right" />
    </Box>
  );
}
