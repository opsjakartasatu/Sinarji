"use client";
import React, { createContext, useContext, useState, useRef, useEffect, useMemo } from "react";

// ============================
// Import semua layer
// ============================
import { hightideLayers } from "./ReferensiHighTide";
import { mslLayers } from "./ReferensiMSL";
import { lajuLayers } from "./Laju";
import { magnitudeLayers } from "./Magnitude";
import { wtakuifertertekan1Layers } from "./WT_AkuiferTertekan1";
import { wtakuifertertekan2Layers } from "./WT_AkuiferTertekan2";
import { akuifertertekan1Layers } from "./AkuiferTertekan1";
import { akuifertertekan2Layers } from "./AkuiferTertekan2";
import { zonatertekan1Layers } from "./ZonaTertekan1";
import { zonatertekan2Layers } from "./ZonaTertekan2";
import { intrusiairlautLayers } from "./IntrusiAirLaut";
import { skenariobanjirq5Layers } from "./SkenarioBanjirQ5";
import { skenariobanjirq25Layers } from "./SkenarioBanjirQ25";
import { skenariobanjirq50Layers } from "./SkenarioBanjirQ50";
import { skenariotanpatanggulLayers } from "./SkenarioTanpaTanggul";
import { skenariodengantanggulLayers } from "./SkenarioDenganTanggul";

// ============================
// Context setup
// ============================
const MapContext = createContext();
export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
  // ============================
  // Map / View state
  // ============================
  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);

  // ============================
  // Layers & UI state
  // ============================
  const [layersState, setLayersState] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [showInformasiPeta, setShowInformasiPeta] = useState(true);
  const [activeUrl, setActiveUrl] = useState(null);
  const [activeLayers, setActiveLayers] = useState([]);
  const [pixelValue, setPixelValue] = useState(null);
  const [selectedLayerId, setSelectedLayerId] = useState(null);


  // ============================
  // Play / Animation state
  // ============================
  const [isPlayingState, _setIsPlayingState] = useState(false);
  const [speed, setSpeed] = useState(3000); // default 3 detik
  const isPlayingRef = useRef(false);
  const playTimeoutRef = useRef(null);
  const playlistRef = useRef([]);
  const indexRef = useRef(0);

  // ============================
  // Global: ganti layer aktif
  // ============================
  const handleLayerChange = (layerId) => {
    setSelectedLayerId(layerId);

    setLayersState((prev) =>
      prev.map((l) => ({
        ...l,
        visible: l.id === layerId,
      }))
    );
  };

  // ============================
  // 🆕 Hitung activeLayer berdasarkan selectedLayerId
  // ============================
  const activeLayer = useMemo(() => {
    if (!selectedLayerId) return null;
    return layersState.find((l) => l.id === selectedLayerId) || null;
  }, [selectedLayerId, layersState]);

  // ============================
  // Animasi Play
  // ============================
  const step = () => {
    if (!isPlayingRef.current) return;

    const list = playlistRef.current || [];
    if (!list.length) return;

    const idx = indexRef.current % list.length;
    const layer = list[idx];

    if (layer && layer.id) {
      handleLayerChange(layer.id);
    }

    indexRef.current = (idx + 1) % list.length;
    playTimeoutRef.current = setTimeout(step, speed);
  };

  const startPlay = (layers = null, fromIndex = 0) => {
    clearTimeout(playTimeoutRef.current);

    playlistRef.current = layers ?? playlistRef.current ?? akuifertertekan1Layers;
    indexRef.current = fromIndex;

    isPlayingRef.current = true;
    _setIsPlayingState(true);

    step();
  };

  const stopPlay = () => {
    isPlayingRef.current = false;
    _setIsPlayingState(false);
    clearTimeout(playTimeoutRef.current);
  };

  const togglePlay = (layers = null) => {
    if (isPlayingRef.current) stopPlay();
    else startPlay(layers);
  };

  // ============================
  // Effects
  // ============================
  useEffect(() => {
    return () => clearTimeout(playTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (isPlayingRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = setTimeout(step, speed);
    }
  }, [speed]);

  // ============================
  // Helper: Tambah layer unik
  // ============================
  const addUniqueLayers = (layers) => {
    setLayersState((prev) => {
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = layers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true);
  };

  // ============================
  // Loader untuk setiap kategori
  // ============================
  const loadHighTideLayers = () => addUniqueLayers(hightideLayers);
  const loadMSLLayers = () => addUniqueLayers(mslLayers);
  const loadLajuLayers = () => addUniqueLayers(lajuLayers);
  const loadMagnitudeLayers = () => addUniqueLayers(magnitudeLayers);
  const loadWTAkuiferTertekan1Layers = () => addUniqueLayers(wtakuifertertekan1Layers);
  const loadWTAkuiferTertekan2Layers = () => addUniqueLayers(wtakuifertertekan2Layers);
  const loadAkuiferTertekan1Layers = () => addUniqueLayers(akuifertertekan1Layers);
  const loadAkuiferTertekan2Layers = () => addUniqueLayers(akuifertertekan2Layers);
  const loadZonaTertekan1Layers = () => addUniqueLayers(zonatertekan1Layers);
  const loadZonaTertekan2Layers = () => addUniqueLayers(zonatertekan2Layers);
  const loadIntrusiAirLautLayers = () => addUniqueLayers(intrusiairlautLayers);
  const loadSkenarioBanjirQ5Layers = () => addUniqueLayers(skenariobanjirq5Layers);
  const loadSkenarioBanjirQ25Layers = () => addUniqueLayers(skenariobanjirq25Layers);
  const loadSkenarioBanjirQ50Layers = () => addUniqueLayers(skenariobanjirq50Layers);
  const loadSkenarioTanpaTanggulLayers = () => addUniqueLayers(skenariotanpatanggulLayers);
  const loadSkenarioDenganTanggulLayers = () => addUniqueLayers(skenariodengantanggulLayers);

  // ============================
  // Menu selection
  // ============================
  const handleSelectMenuLayers = (parentLabel, childLabel = null) => {
    setActiveMenu(parentLabel);
    setActiveSubMenu(childLabel);
    setPixelValue(null);

    if (map && map.layers) {
      map.layers.forEach((layer) => {
        if (layer.id !== "batas-admin") {
          try {
            map.remove(layer);
          } catch (e) {
            // ignore
          }
        }
      });
    }

    let newLayers = [];
    if (childLabel === "Referensi High Tide") {
      newLayers = hightideLayers;
    } else if (childLabel === "Referensi MSL") {
      newLayers = mslLayers;
    } else if (childLabel === "Laju") {
      newLayers = lajuLayers;
    } else if (childLabel === "Magnitude") {
      newLayers = magnitudeLayers;
    } else if (childLabel === "WT-Akuifer Tertekan 1") {
      newLayers = wtakuifertertekan1Layers;
    } else if (childLabel === "WT-Akuifer Tertekan 2") {
      newLayers = wtakuifertertekan2Layers;
    } else if (childLabel === "Akuifer Tertekan 1") {
      newLayers = akuifertertekan1Layers;
    } else if (childLabel === "Akuifer Tertekan 2") {
      newLayers = akuifertertekan2Layers;
    } else if (childLabel === "Zona Tertekan 1") {
      newLayers = zonatertekan1Layers;
    } else if (childLabel === "Zona Tertekan 2") {
      newLayers = zonatertekan2Layers;
    } else if (childLabel === "Air Laut") {
      newLayers = intrusiairlautLayers;
    } else if (childLabel === "Skenario Banjir Q5") {
      newLayers = skenariobanjirq5Layers;
    } else if (childLabel === "Skenario Banjir Q25") {
      newLayers = skenariobanjirq25Layers;
    } else if (childLabel === "Skenario Banjir Q50") {
      newLayers = skenariobanjirq50Layers;
    } else if (childLabel === "Skenario Tanpa Tanggul") {
      newLayers = skenariotanpatanggulLayers;
    } else if (childLabel === "Skenario Dengan Tanggul") {
      newLayers = skenariodengantanggulLayers;
    }
    // bisa lanjut tambahkan menu lain di sini

    // Update state → sidebar ikut berubah
    setLayersState(newLayers);


    // 🚀 Tambahan: set playlist supaya bisa di-play
    playlistRef.current = newLayers;
    indexRef.current = 0;
  };

  // ============================
  // Simple layer controls
  // ============================
  const handleToggle = (idx) => {
    setLayersState((prev) =>
      prev.map((l, i) => (i === idx ? { ...l, visible: !l.visible } : l))
    );
  };

  const handleOpacityChange = (idx, percent) => {
    const p = Array.isArray(percent) ? percent[0] : percent;
    setLayersState((prev) =>
      prev.map((layer, i) =>
        i === idx ? { ...layer, opacity: p / 100 } : layer
      )
    );
  };

  const handleToggleSettings = (idx) => {
    setLayersState((prev) =>
      prev.map((layer, i) =>
        i === idx ? { ...layer, showSettings: !layer.showSettings } : layer
      )
    );
  };

  const handleRemoveAll = () => {
    setLayersState((prev) => prev.map((layer) => ({ ...layer, visible: false })));
  };

  // ============================
  // Provider value
  // ============================
  return (
    <MapContext.Provider
      value={{
        // Map & View
        map,
        setMap,
        view,
        setView,

        // Layers & UI
        layersState,
        setLayersState,
        activeUrl,
        activeLayers,
        activeMenu,
        setActiveMenu,
        activeSubMenu,
        setActiveSubMenu,
        showSidebar,
        setShowSidebar,
        showInformasiPeta,
        setShowInformasiPeta,

        // Pixel info
        pixelValue,
        setPixelValue,

        // Loaders
        loadHighTideLayers,
        loadMSLLayers,
        loadLajuLayers,
        loadMagnitudeLayers,
        loadWTAkuiferTertekan1Layers,
        loadWTAkuiferTertekan2Layers,
        loadAkuiferTertekan1Layers,
        loadAkuiferTertekan2Layers,
        loadZonaTertekan1Layers,
        loadZonaTertekan2Layers,
        loadIntrusiAirLautLayers,
        loadSkenarioBanjirQ5Layers,
        loadSkenarioBanjirQ25Layers,
        loadSkenarioBanjirQ50Layers,
        loadSkenarioTanpaTanggulLayers,
        loadSkenarioDenganTanggulLayers,

        // Handlers
        handleToggle,
        handleOpacityChange,
        handleToggleSettings,
        handleRemoveAll,
        handleSelectMenuLayers,

        // Play & Animation
        handleLayerChange,
        selectedLayerId,
        activeLayer,
        isPlaying: isPlayingState,
        speed,
        setSpeed,
        startPlay,
        stopPlay,
        togglePlay,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
