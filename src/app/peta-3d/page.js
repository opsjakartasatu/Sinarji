"use client";

import { Box } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import Header from "./Header";
import MapComponent from "./components/map/MapComponent";
import TimeSlider from "./components/map/TimeSlider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [selectedLayers, setSelectedLayers] = useState({
    buildings: true, // Bangunan layer - visible by default
    damGate: true, // Pintu air layer - visible by default and can be toggled
    genanganAll: true, // Genangan layer - visible by default with earliest time
    street: true, // Jalan layer - visible by default
  });

  const [selectedTime, setSelectedTime] = useState(null);
  const [times, setTimes] = useState([]);
  const [basemap, setBasemap] = useState("cartodb_positron");
  const [stats, setStats] = useState({
    totalLuasGenangan: 0,
    jumlahBangunanTerdampak: 0,
    luasJalanTergenang: 0,
    jumlah_kk: 0,
    luas_bangunan: 0,
    ruas_jalan: 0,
  });

  const handleLayerChange = useCallback((layerName, checked) => {
    setSelectedLayers((prevLayers) => ({
      ...prevLayers,
      [layerName]: checked,
    }));
    if (process.env.NODE_ENV !== "production") {
    }
  }, []);

  const handleBasemapChange = useCallback((newBasemap) => {
    setBasemap(newBasemap);
    if (process.env.NODE_ENV !== "production") {
    }
  }, []);

  const handleTimeChange = useCallback((time) => {
    setSelectedTime(time);
    if (process.env.NODE_ENV !== "production") {
    }
  }, []);

  const handleTimesUpdate = useCallback((newTimes) => {
    setTimes(newTimes);
    if (process.env.NODE_ENV !== "production") {
    }
  }, []);

  const handleStatsUpdate = useCallback((newStats) => {
    setStats(newStats);
    if (process.env.NODE_ENV !== "production") {
    }
  }, []);

  const handleMapLayerChange = useCallback((layerName, checked) => {
    // Jika dipanggil dengan 2 parameter (layerName, checked) - dari MapOption
    if (typeof layerName === "string" && typeof checked === "boolean") {
      setSelectedLayers((prevLayers) => ({
        ...prevLayers,
        [layerName]: checked,
      }));
      if (process.env.NODE_ENV !== "production") {
        console.log(`Layer ${layerName} set to ${checked}`);
      }
    } else {
      // Jika dipanggil dengan 1 parameter (layers object) - dari MapComponent
      if (process.env.NODE_ENV !== "production") {
        console.log("Active layers:", layerName); // layerName di sini adalah layers object
      }
    }
  }, []);

  useEffect(() => {}, [selectedTime, times]);

  useEffect(() => {
    if (!selectedTime && times.length > 0) {
      const initialTime = times[0];
      setSelectedTime(initialTime);
      handleTimeChange(initialTime);
    }
  }, [times]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Header />
      <MapComponent
        selectedLayers={selectedLayers}
        showBuildings={selectedLayers.buildings}
        showDamGate={selectedLayers.damGate}
        showFloodAreaAll={selectedLayers.genanganAll}
        showStreet={selectedLayers.street}
        onLayerChange={handleMapLayerChange}
        basemap={basemap}
        selectedTime={selectedTime}
        onTimesUpdate={handleTimesUpdate}
        onTimeChange={handleTimeChange}
        onStatsUpdate={handleStatsUpdate}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default Page;
