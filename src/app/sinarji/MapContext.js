"use client";
import { useEffect, useRef } from "react";
import React, { createContext, useContext, useState } from "react";
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

const MapContext = createContext();
export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null); // simpan instance map (ArcGIS Map)
  const [view, setView] = useState(null); // simpan MapView
  const [layersState, setLayersState] = useState([]); // daftar layer aktif
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeMenu, setActiveMenu] = useState(""); // menu peta aktif
  const [activeSubMenu, setActiveSubMenu] = useState(""); //submenu peta aktif
  const [showInformasiPeta, setShowInformasiPeta] = useState(true);
  const [activeUrl, setActiveUrl] = useState(null);
  const [activeLayers, setActiveLayers] = useState([]);
  const [pixelValue, setPixelValue] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef(null);

  // saat semua layer sudah dimatikan.
  useEffect(() => {
    const hasActiveLayer = layersState.some((layer) => layer.visible);
    if (!hasActiveLayer) {
      setPixelValue(null); // reset pixel kalau semua layer dimatikan
    }
  }, [layersState]);

  // === Fungsi khusus: load semua layer ReferensiHighTide (1975–2024) ===
  const loadHighTideLayers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik ReferensiHighTide berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = hightideLayers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer ReferensiMSL (1975–2024) ===
  const loadMSLLayers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik ReferensiMSL berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = mslLayers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer Laju (1975–2024) ===
  const loadLajuLayers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik Laju berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = lajuLayers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer Magnitude (1975–2024) ===
  const loadMagnitudeLayers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik Magnitude berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = magnitudeLayers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer WT-AkuiferTertekan1 (1975–2024) ===
  const loadWTAkuiferTertekan1Layers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik WT-AkuiferTertekan1 berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = wtakuifertertekan1Layers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer WT-AkuiferTertekan2 (1975–2024) ===
  const loadWTAkuiferTertekan2Layers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik WT-AkuiferTertekan2 berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = wtakuifertertekan2Layers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer AkuiferTertekan1 (1975–2024) ===
  const loadAkuiferTertekan1Layers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik AkuiferTertekan1 berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = akuifertertekan1Layers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer AkuiferTertekan2 (1975–2024) ===
  const loadAkuiferTertekan2Layers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik AkuiferTertekan1 berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = akuifertertekan2Layers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer ZonaTertekan1 (1975–2024) ===
  const loadZonaTertekan1Layers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik AkuiferTertekan1 berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = zonatertekan1Layers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer ZonaTertekan2 (1975–2024) ===
  const loadZonaTertekan2Layers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik ZonaTertekan2 berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = zonatertekan2Layers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer IntrusiAirLaut (2007–2024) ===
  const loadIntrusiAirLautLayers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik IntrusiAirLaut berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = intrusiairlautLayers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer SkenarioBanjirQ5 (2007–2024) ===
  const loadSkenarioBanjirQ5Layers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik SkenarioBanjirQ5 berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = skenariobanjirq5Layers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer SkenarioBanjir25 (2007–2024) ===
  const loadSkenarioBanjirQ25Layers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik SkenarioBanjirQ25 berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = skenariobanjirq25Layers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer SkenarioBanjir50 (2007–2024) ===
  const loadSkenarioBanjirQ50Layers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik SkenarioBanjirQ25 berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = skenariobanjirq50Layers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer SkenarioTanpaTanggul (2007–2024) ===
  const loadSkenarioTanpaTanggulLayers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik SkenarioTanpaTanggul berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = skenariotanpatanggulLayers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Fungsi khusus: load semua layer SkenarioDenganTanggul (2007–2024) ===
  const loadSkenarioDenganTanggulLayers = () => {
    setLayersState((prev) => {
      // hindari duplikat kalau user klik SkenarioDenganTanggul berkali-kali
      const existingIds = new Set(prev.map((l) => l.id));
      const newLayers = skenariodengantanggulLayers.filter((l) => !existingIds.has(l.id));
      return [...prev, ...newLayers];
    });
    setShowSidebar(true); // buka sidebar otomatis
  };

  // === Toggle on/off layer (checkbox) ===
  const handleToggle = (idx) => {
    setLayersState((prev) => prev.map((l, i) => (i === idx ? { ...l, visible: !l.visible } : l)));
  };

  // === Ubah opacity (0–100 → 0–1) ===
  const handleOpacityChange = (idx, percent) => {
    const p = Array.isArray(percent) ? percent[0] : percent;
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, opacity: p / 100 } : layer)));
  };

  // === Toggle panel setting layer ===
  const handleToggleSettings = (idx) => {
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, showSettings: !layer.showSettings } : layer)));
  };

  // === Matikan semua layer ===
  const handleRemoveAll = () => {
    setLayersState((prev) => prev.map((layer) => ({ ...layer, visible: false })));
    setPixelValue(null); // reset nilai pixel
  };

  // fungsi ganti menu peta
  const handleSelectMenuLayers = (parentLabel, childLabel = null) => {
    setActiveMenu(parentLabel); // simpan menu utama
    setActiveSubMenu(childLabel); // simpan sub menu (kalau ada)
    setPixelValue(null);
    if (!map) return;

    // Hapus semua layer kecuali admin
    map.layers.forEach((layer) => {
      if (layer.id !== "batas-admin") {
        map.remove(layer);
      }
    });

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
  };

  // helper: tentukan range tahun sesuai submenu
  const getYearRange = (submenu) => {
    // submenu tertentu mulai dari 2007
    const lateStart = ["Air Laut", "Skenario Banjir Q5", "Skenario Banjir Q25", "Skenario Banjir Q50", "Skenario Tanpa Tanggul", "Skenario Dengan Tanggul"];

    if (lateStart.includes(submenu)) {
      return { start: 2007, end: 2024 };
    }
    // default mulai dari 1975
    return { start: 1975, end: 2024 };
  };

  const startPlay = () => {
    if (!activeSubMenu) return;

    const { start, end } = getYearRange(activeSubMenu);

    setIsPlaying(true);

    // Hanya set ke start jika currentYear belum ada atau sudah di luar range
    setCurrentYear((prev) => {
      if (!prev || prev < start || prev > end) return start;
      return prev;
    });

    playIntervalRef.current = setInterval(() => {
      setCurrentYear((prev) => {
        if (prev >= end) {
          clearInterval(playIntervalRef.current);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
  };

  const stopPlay = () => {
    clearInterval(playIntervalRef.current);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (currentYear) {
      setLayersState((prev) =>
        prev.map((layer) => ({
          ...layer,
          visible: layer.id.endsWith(currentYear.toString()),
        }))
      );
    }
  }, [currentYear]);

  return (
    <MapContext.Provider
      value={{
        // Map & View
        map,
        setMap,
        view,
        setView,

        // Layers
        layersState,
        setLayersState,
        activeUrl,
        activeLayers,
        activeMenu,
        setActiveMenu,
        activeSubMenu,
        setActiveSubMenu,
        currentYear,
        isPlaying,
        startPlay,
        stopPlay,

        // UI State
        showSidebar,
        setShowSidebar,
        showInformasiPeta,
        setShowInformasiPeta,

        // Pixel info
        pixelValue,
        setPixelValue,

        // Layer loaders
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
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
