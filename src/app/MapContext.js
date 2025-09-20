"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
// import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import WMSLayer from "@arcgis/core/layers/WMSLayer";

import {
  hightideLayers,
  mslLayers,
  lajuLayers,
  magnitudeLayers,
  wtakuifertertekan1Layers,
  wtakuifertertekan2Layers,
  akuifertertekan1Layers,
  akuifertertekan2Layers,
  zonatertekan1Layers,
  zonatertekan2Layers,
  intrusiairlautLayers,
  skenariobanjirq5Layers,
  skenariobanjirq25Layers,
  skenariobanjirq50Layers,
  skenariotanpatanggulLayers,
  skenariodengantanggulLayers,
} from "./MapLayers";

export const MapContext = createContext();
export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [layersState, setLayersState] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [pixelValue, setPixelValue] = useState(null);
  const [multiActive, setMultiActive] = useState(false);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [mapLeft, setMapLeft] = useState(null);
  const [viewLeft, setViewLeft] = useState(null);
  const [mapRight, setMapRight] = useState(null);
  const [viewRight, setViewRight] = useState(null);
  const [layersStateLeft, setLayersStateLeft] = useState([]);
  const [layersStateRight, setLayersStateRight] = useState([]);
  const [pixelValueLeft, setPixelValueLeft] = useState(null);
  const [pixelValueRight, setPixelValueRight] = useState(null);
  const [activeMenuLeft, setActiveMenuLeft] = useState(null);
  const [activeSubMenuLeft, setActiveSubMenuLeft] = useState(null);
  const [activeMenuRight, setActiveMenuRight] = useState(null);
  const [activeSubMenuRight, setActiveSubMenuRight] = useState(null);

  const playIntervalRef = useRef(null);

  // Reset pixel jika semua layer mati
  useEffect(() => {
    const hasActiveLayer = layersState.some((l) => l.visible);
    if (!hasActiveLayer) setPixelValue(null);
  }, [layersState]);

  // Toggle layer utama
  const handleToggle = (idx) => {
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, visible: !layer.visible } : layer)));
  };

  const handleToggleLeft = (idx) => {
    setLayersStateLeft((prev) => prev.map((layer, i) => (i === idx ? { ...layer, visible: !layer.visible } : layer)));
  };

  const handleToggleRight = (idx) => {
    setLayersStateRight((prev) => prev.map((layer, i) => (i === idx ? { ...layer, visible: !layer.visible } : layer)));
  };

  const handleOpacityChange = (idx, percent) => {
    const p = Array.isArray(percent) ? percent[0] : percent;
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, opacity: p / 100 } : layer)));
  };

  const handleToggleSettings = (idx) => {
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, showSettings: !layer.showSettings } : layer)));
  };

  const handleRemoveAll = () => {
    setLayersState((prev) => prev.map((layer) => ({ ...layer, visible: false })));
    setPixelValue(null);
  };

  // Fungsi aman untuk select menu layers
  // === helper untuk ambil layer sesuai submenu ===
  const getLayersForSubmenu = (parentLabel, childLabel) => {
    switch (childLabel) {
      case "Referensi High Tide":
        return hightideLayers;
      case "Referensi MSL":
        return mslLayers;
      case "Laju":
        return lajuLayers;
      case "Magnitude":
        return magnitudeLayers;
      case "WT-Akuifer Tertekan 1":
        return wtakuifertertekan1Layers;
      case "WT-Akuifer Tertekan 2":
        return wtakuifertertekan2Layers;
      case "Akuifer Tertekan 1":
        return akuifertertekan1Layers;
      case "Akuifer Tertekan 2":
        return akuifertertekan2Layers;
      case "Zona Tertekan 1":
        return zonatertekan1Layers;
      case "Zona Tertekan 2":
        return zonatertekan2Layers;
      case "Air Laut":
        return intrusiairlautLayers;
      case "Skenario Banjir Q5":
        return skenariobanjirq5Layers;
      case "Skenario Banjir Q25":
        return skenariobanjirq25Layers;
      case "Skenario Banjir Q50":
        return skenariobanjirq50Layers;
      case "Skenario Tanpa Tanggul":
        return skenariotanpatanggulLayers;
      case "Skenario Dengan Tanggul":
        return skenariodengantanggulLayers;
      default:
        return [];
    }
  };

  // Helper aman untuk tambah layer
  const addLayerSafely = async (mapTarget, layer) => {
    try {
      if (!layer || !layer.instance) return;

      // tunggu layer load
      if (layer.instance.load) {
        await layer.instance.load();
      }

      // tambahkan hanya kalau belum ada
      if (!mapTarget.findLayerById(layer.instance.id)) {
        mapTarget.add(layer.instance);
      }

      console.log("Layer ditambahkan:", layer.instance.id);
    } catch (err) {
      console.warn("Gagal tambah layer:", layer.id, err);
    }
  };

  // === Fungsi utama untuk ganti submenu ===
  // === Fungsi utama untuk ganti submenu ===
  const handleSelectMenuLayers = (parentLabel, childLabel = null, target = "main") => {
    // jika mode biasa -> set active global
    if (!isCompareMode) {
      setActiveMenu(parentLabel);
      setActiveSubMenu(childLabel);
    } else {
      // jika compare mode -> set per-target
      if (target === "left") {
        setActiveMenuLeft(parentLabel);
        setActiveSubMenuLeft(childLabel);
      } else if (target === "right") {
        setActiveMenuRight(parentLabel);
        setActiveSubMenuRight(childLabel);
      }
    }

    let mapTarget = map;
    let setState = setLayersState;

    if (isCompareMode) {
      if (target === "left") {
        mapTarget = mapLeft;
        setState = setLayersStateLeft;
      } else if (target === "right") {
        mapTarget = mapRight;
        setState = setLayersStateRight;
      }
    }

    if (!mapTarget) return;

    // clear semua layer kecuali Batas Admin
    const keepLayers = mapTarget.layers.filter((lyr) => lyr.id === "batas-admin");
    mapTarget.removeAll();
    keepLayers.forEach((lyr) => mapTarget.add(lyr));

    const newLayers = getLayersForSubmenu(parentLabel, childLabel);

    // build WMSLayer instances
    const layersPrepared = newLayers.map((l) => {
      const instance = new WMSLayer({
        url: l.url,
        sublayers: [{ name: l.name }],
        id: l.id,
        title: l.title,
        opacity: l.opacity ?? 1,
        visible: l.visible ?? false, // start hidden
      });

      return {
        ...l,
        visible: l.visible ?? false,
        showSettings: false,
        instance,
      };
    });

    setState(layersPrepared);

    // tambahkan ke map
    layersPrepared.forEach((layer) => {
      // NOTE: fungsi addLayerSafely kamu menerima (mapTarget, layer) atau (layer, mapTarget)
      // dari implementasimu sebelumnya digunakan: addLayerSafely(layer, mapTarget);
      // supaya aman, gunakan signature yang sesuai dengan implementasimu saat ini:
      addLayerSafely(layer, mapTarget);
    });

    setCurrentYear(null);
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleCheckboxChange = (layerId, checked) => {
    setLayersState((prev) => {
      const updated = prev.map((layer) => (layer.id === layerId ? { ...layer, checked } : layer));
      setMultiActive(updated.filter((l) => l.checked).length > 1);
      return updated;
    });
  };

  const getYearRange = (submenu) => {
    const lateStart = ["Air Laut", "Skenario Banjir Q5", "Skenario Banjir Q25", "Skenario Banjir Q50", "Skenario Tanpa Tanggul", "Skenario Dengan Tanggul"];
    return lateStart.includes(submenu) ? { start: 1975, end: 2024 } : { start: 2000, end: 2024 };
  };

  const updateVisibleLayers = (year) => {
    setLayersState((prev) => prev.map((layer) => ({ ...layer, visible: layer.year === year })));
  };

  const startPlay = () => {
    if (!activeSubMenu || !map || layersState.length === 0) return;
    setIsPlaying(true);
    setIsPaused(false);

    const firstLayer = layersState[0];
    if (!firstLayer) return;

    setCurrentYear(firstLayer.year);
    updateVisibleLayers(firstLayer.year);

    let currentIndex = 0;
    playIntervalRef.current = setInterval(() => {
      currentIndex += 1;
      if (currentIndex >= layersState.length) {
        clearInterval(playIntervalRef.current);
        setIsPlaying(false);
        return;
      }
      const nextLayer = layersState[currentIndex];
      setCurrentYear(nextLayer.year);
      updateVisibleLayers(nextLayer.year);
    }, 5000);
  };

  const pausePlay = () => {
    clearInterval(playIntervalRef.current);
    setIsPaused(true);
  };

  const resumePlay = () => {
    if (!activeSubMenu) return;
    const { start, end } = getYearRange(activeSubMenu);
    setIsPaused(false);

    playIntervalRef.current = setInterval(() => {
      setCurrentYear((prev) => {
        if (prev >= end) {
          clearInterval(playIntervalRef.current);
          setIsPlaying(false);
          return prev;
        }
        updateVisibleLayers(prev + 1);
        return prev + 1;
      });
    }, 5000);
  };

  const stopPlay = () => {
    clearInterval(playIntervalRef.current);
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Sync map layer dengan state
  useEffect(() => {
    if (!map) return;
    layersState.forEach((layer) => {
      const mapLayer = map.findLayerById(layer.id);
      if (mapLayer) {
        mapLayer.visible = layer.visible;
        mapLayer.opacity = layer.opacity ?? 1;
      }
    });
  }, [layersState, map]);

  useEffect(() => {
    if (isCompareMode) {
      if (layersStateLeft.length === 0) setLayersStateLeft(layersState.map((l) => ({ ...l, visible: false, showSettings: false })));
      if (layersStateRight.length === 0) setLayersStateRight(layersState.map((l) => ({ ...l, visible: false, showSettings: false })));
    }
  }, [isCompareMode, layersState]);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        view,
        setView,
        layersState,
        setLayersState,
        activeMenu,
        setActiveMenu,
        activeSubMenu,
        setActiveSubMenu,
        currentYear,
        isPlaying,
        isPaused,
        startPlay,
        pausePlay,
        resumePlay,
        stopPlay,
        showSidebar,
        setShowSidebar,
        pixelValue,
        setPixelValue,
        handleToggle,
        handleToggleLeft,
        handleToggleRight,
        handleOpacityChange,
        handleToggleSettings,
        handleRemoveAll,
        handleSelectMenuLayers,
        multiActive,
        isCompareMode,
        setIsCompareMode,
        mapLeft,
        setMapLeft,
        mapRight,
        setMapRight,
        viewLeft,
        setViewLeft,
        viewRight,
        setViewRight,
        layersStateLeft,
        setLayersStateLeft,
        layersStateRight,
        setLayersStateRight,
        pixelValueLeft,
        setPixelValueLeft,
        pixelValueRight,
        setPixelValueRight,
        activeMenuLeft,
        setActiveMenuLeft,
        activeSubMenuLeft,
        setActiveSubMenuLeft,
        activeMenuRight,
        setActiveMenuRight,
        activeSubMenuRight,
        setActiveSubMenuRight,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
