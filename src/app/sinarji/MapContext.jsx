"use client";
import React, { createContext, useContext, useState } from "react";

const MapContext = createContext();
export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
  const [layersState, setLayersState] = useState([]);
  const [view, setView] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // Toggle on/off layer
  const handleToggle = (idx) => {
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, visible: !layer.visible } : layer)));
  };

  // Ubah opacity (Sidebar pakai range 0–100 → convert ke 0–1)
  const handleOpacityChange = (idx, percent) => {
    const p = Array.isArray(percent) ? percent[0] : percent; // guard MUI (number | number[])
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, opacity: p / 100 } : layer)));
  };

  // Toggle setting panel untuk tiap layer
  const handleToggleSettings = (idx) => {
    setLayersState((prev) => prev.map((layer, i) => (i === idx ? { ...layer, showSettings: !layer.showSettings } : layer)));
  };

  // Hapus semua layer dari map
  const handleRemoveAll = () => {
    setLayersState((prev) => prev.map((layer) => ({ ...layer, visible: false })));
  };

  return (
    <MapContext.Provider
      value={{
        view,
        setView,
        layersState,
        setLayersState,
        showSidebar,
        setShowSidebar,
        handleToggle,
        handleOpacityChange,
        handleToggleSettings,
        handleRemoveAll,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
