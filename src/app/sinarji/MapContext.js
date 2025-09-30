"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
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

// Cache layer supaya tidak selalu trigger GetCapabilities
const layerInstanceCache = {};
const getOrCreateWMSLayer = (l) => {
  if (layerInstanceCache[l.id]) {
    return layerInstanceCache[l.id];
  }
  const instance = new WMSLayer({
    url: l.url,
    sublayers: [{ name: l.name }],
    id: l.id,
    title: l.title,
    opacity: l.opacity ?? 1,
    visible: l.visible ?? false,
  });
  layerInstanceCache[l.id] = instance;
  return instance;
};

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

  useEffect(() => {
    const hasActiveLayer = layersState.some((l) => l.visible);
    if (!hasActiveLayer) setPixelValue(null);
  }, [layersState]);

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

  // Ubah opacity (0–100 → 0–1)
  const handleOpacityChange = (idx, percent) => {
    const p = Array.isArray(percent) ? percent[0] : percent;
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, opacity: p / 100 } : layer)));
  };

  // Toggle panel setting layer
  const handleToggleSettings = (idx) => {
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, showSettings: !layer.showSettings } : layer)));
  };

  const handleToggle = (idx) => {
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, visible: !layer.visible } : layer)));
  };

  const handleToggleLeft = (idx) => {
    setLayersStateLeft((prev) => prev.map((layer, i) => (i === idx ? { ...layer, visible: !layer.visible } : layer)));
  };

  const handleToggleRight = (idx) => {
    setLayersStateRight((prev) => prev.map((layer, i) => (i === idx ? { ...layer, visible: !layer.visible } : layer)));
  };

  const addLayerSafely = async (mapTarget, layer) => {
    try {
      if (!layer || !layer.instance) return;
      if (layer.instance.load) {
        await layer.instance.load();
      }
      if (!mapTarget.findLayerById(layer.instance.id)) {
        mapTarget.add(layer.instance);
      }
    } catch (err) {
      console.warn("Gagal tambah layer:", layer.id, err);
    }
  };

  const handleSelectMenuLayers = (parentLabel, childLabel = null, target = "main") => {
    if (target === "left") {
      setActiveMenuLeft(parentLabel);
      setActiveSubMenuLeft(childLabel);
    } else if (target === "right") {
      setActiveMenuRight(parentLabel);
      setActiveSubMenuRight(childLabel);
    } else {
      setActiveMenu(parentLabel);
      setActiveSubMenu(childLabel);
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

    const keepLayers = mapTarget.layers.filter((lyr) => lyr.id === "batas-admin");
    mapTarget.removeAll();
    keepLayers.forEach((lyr) => mapTarget.add(lyr));

    const newLayers = getLayersForSubmenu(parentLabel, childLabel);

    const layersPrepared = newLayers.map((l) => {
      const instance = getOrCreateWMSLayer(l); //pakai cache
      return {
        ...l,
        visible: l.visible ?? false,
        showSettings: false,
        instance,
      };
    });

    setState(layersPrepared);

    layersPrepared.forEach((layer) => {
      addLayerSafely(mapTarget, layer);
    });

    setCurrentYear(null);
    setIsPlaying(false);
    setIsPaused(false);

    if (target === "left") {
      setPixelValueLeft(null);
    } else if (target === "right") {
      setPixelValueRight(null);
    } else {
      setPixelValue(null);
    }
  };

  // Fungsi play/pause/resume/stop
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
  // akhir fungsi play

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
    if (!mapLeft) return;
    layersStateLeft.forEach((layer) => {
      const mapLayer = mapLeft.findLayerById(layer.id);
      if (mapLayer) {
        mapLayer.visible = layer.visible;
        mapLayer.opacity = layer.opacity ?? 1;
      }
    });
  }, [layersStateLeft, mapLeft]);

  useEffect(() => {
    if (!mapRight) return;
    layersStateRight.forEach((layer) => {
      const mapLayer = mapRight.findLayerById(layer.id);
      if (mapLayer) {
        mapLayer.visible = layer.visible;
        mapLayer.opacity = layer.opacity ?? 1;
      }
    });
  }, [layersStateRight, mapRight]);

  useEffect(() => {
    if (isCompareMode) {
      if (layersStateLeft.length === 0) {
        setLayersStateLeft(layersState.map((l) => ({ ...l, showSettings: false })));
      }
      if (layersStateRight.length === 0) {
        setLayersStateRight(layersState.map((l) => ({ ...l, showSettings: false })));
      }
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
        handleSelectMenuLayers,
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
        handleToggle,
        handleToggleLeft,
        handleToggleRight,
        handleOpacityChange,
        handleToggleSettings,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
