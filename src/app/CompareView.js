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
import { useMapContext } from "@/app/sinarji/MapContext";
import Sidebar from "@/components/sidebarDashboard/SidebarSinarji";
import InformasiPeta from "@/app/sinarji/InformasiPeta";

const GEOSERVER_URL_ADMIN = "https://gis.dcktrp.id/gispublik/publik/Batas%20Administrasi%20Wilayah%20Jakarta/ows?service=WMS&version=1.3.0&request=GetCapabilities";

export default function CompareView() {
  const { isCompareMode, layersStateLeft, layersStateRight, setMapLeft, setViewLeft, setMapRight, setViewRight, setPixelValueLeft, setPixelValueRight, viewLeft, viewRight } = useMapContext();

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const mapLeftRef = useRef(null);
  const mapRightRef = useRef(null);
  const viewLeftRef = useRef(null);
  const viewRightRef = useRef(null);

  // === Init maps (once when compare mode enabled)
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
      zoom: 11,
      ui: { components: [] },
    });
    viewLeftRef.current = mvLeft;
    setViewLeft(mvLeft);

    mvLeft.ui.add(new Zoom({ view: mvLeft }), "bottom-right");
    mvLeft.ui.add(
      new Expand({
        view: mvLeft,
        content: new BasemapGallery({ view: mvLeft }),
        expandTooltip: "Pilih Basemap",
        expandIconClass: "esri-icon-basemap",
      }),
      "bottom-right"
    );

    const adminLayerLeft = new WMSLayer({
      id: "batas-admin",
      url: GEOSERVER_URL_ADMIN,
      sublayers: [{ name: "Batas Administrasi Wilayah Jakarta" }],
      opacity: 1,
      visible: true,
    });
    mapLeft.add(adminLayerLeft);

    // --- Map Right
    const mapRight = new Map({ basemap: "satellite" });
    mapRightRef.current = mapRight;
    setMapRight(mapRight);

    const mvRight = new MapView({
      container: rightRef.current,
      map: mapRight,
      center: [106.8456, -6.2088],
      zoom: 11,
      ui: { components: [] },
    });
    viewRightRef.current = mvRight;
    setViewRight(mvRight);

    mvRight.ui.add(new Zoom({ view: mvRight }), "bottom-right");
    mvRight.ui.add(
      new Expand({
        view: mvRight,
        content: new BasemapGallery({ view: mvRight }),
        expandTooltip: "Pilih Basemap",
        expandIconClass: "esri-icon-basemap",
      }),
      "bottom-right"
    );

    const adminLayerRight = new WMSLayer({
      id: "batas-admin",
      url: GEOSERVER_URL_ADMIN,
      sublayers: [{ name: "Batas Administrasi Wilayah Jakarta" }],
      opacity: 1,
      visible: true,
    });
    mapRight.add(adminLayerRight);

    // sync extent antar view
    function syncViews(view1, view2) {
      let isSyncing = false;
      view1.when(() => {
        view1.watch("extent", (ext) => {
          if (isSyncing || !ext) return;
          isSyncing = true;
          view2.when(() => {
            view2.goTo(ext, { animate: false }).finally(() => {
              isSyncing = false;
            });
          });
        });
      });
    }
    syncViews(mvLeft, mvRight);
    syncViews(mvRight, mvLeft);

    return () => {
      try {
        mvLeft.destroy();
        mvRight.destroy();
      } catch (e) {}
    };
  }, [isCompareMode, setMapLeft, setViewLeft, setMapRight, setViewRight]);

  // === Sync layersStateLeft -> mapLeft (existing logic)
  useEffect(() => {
    if (!mapLeftRef.current) return;

    layersStateLeft.forEach((layerConfig) => {
      const { id, name, names, visible, opacity, url } = layerConfig;
      let existing = mapLeftRef.current.findLayerById(id);

      if (visible && !existing) {
        const newLayer = new WMSLayer({
          id,
          url,
          sublayers: names ? names.map((n) => ({ name: n })) : [{ name }],
          opacity,
        });
        mapLeftRef.current.add(newLayer);
      } else if (!visible && existing) {
        mapLeftRef.current.remove(existing);
      } else if (visible && existing) {
        existing.opacity = opacity;
      }
    });
  }, [layersStateLeft]);

  // === Sync layersStateRight -> mapRight (existing logic)
  useEffect(() => {
    if (!mapRightRef.current) return;

    layersStateRight.forEach((layerConfig) => {
      const { id, name, names, visible, opacity, url } = layerConfig;
      let existing = mapRightRef.current.findLayerById(id);

      if (visible && !existing) {
        const newLayer = new WMSLayer({
          id,
          url,
          sublayers: names ? names.map((n) => ({ name: n })) : [{ name }],
          opacity,
        });
        mapRightRef.current.add(newLayer);
      } else if (!visible && existing) {
        mapRightRef.current.remove(existing);
      } else if (visible && existing) {
        existing.opacity = opacity;
      }
    });
  }, [layersStateRight]);

  // === GetFeatureInfo LEFT (register/unregister dengan cleanup)
  useEffect(() => {
    if (!viewLeft) return;

    let handler = viewLeft.on("click", async (event) => {
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
        console.log("GetFeatureInfo LEFT result:", text); // <-- debug dulu
        setPixelValueLeft(text);
      } catch (err) {
        console.error("GetFeatureInfo Left gagal:", err);
        setPixelValueLeft(null);
      }
    });

    return () => {
      handler && handler.remove();
    };
  }, [layersStateLeft, setPixelValueLeft]);

  // === GetFeatureInfo RIGHT (mirip, tapi untuk sisi kanan)
  useEffect(() => {
    if (!viewRight) return;

    let handler = viewRight.on("click", async (event) => {
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
        console.log("GetFeatureInfo RIGHT result:", text); // <-- debug dulu
        setPixelValueRight(text);
      } catch (err) {
        console.error("GetFeatureInfo Right gagal:", err);
        setPixelValueRight(null);
      }
    });

    return () => {
      handler && handler.remove();
    };
  }, [layersStateRight, setPixelValueRight]);

  if (!isCompareMode) return null;

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%", position: "relative" }}>
      <Sidebar position="left" target="left" />
      <Box ref={leftRef} sx={{ flex: 1, borderRight: "2px solid #ccc" }} id="map-left" />
      <Box ref={rightRef} sx={{ flex: 1, borderLeft: "2px solid #ccc" }} id="map-right" />
      <Sidebar position="right" target="right" />

      <InformasiPeta target="left" position="left" />
      <InformasiPeta target="right" position="right" />
    </Box>
  );
}
