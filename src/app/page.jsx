"use client";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import { MapProvider, useMapContext } from "./MapContext";
import Sidebar from "@/components/sidebarDashboard/SidebarSinarji";
import Navbar from "@/components/navbar/NavbarSinarji";
import PlayControl from "./PlayControl";
import CompareView from "./CompareView";
import InformasiPeta from "./InformasiPeta"; // 🔹 import komponen baru

const MapView = dynamic(() => import("./MapView"), { ssr: false });

function MainContent() {
  const { isCompareMode } = useMapContext();

  // 🔹 State untuk handle sidebar
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const sidebarWidth = sidebarOpen ? 320 : 64; // sesuaikan dengan ukuran sidebar kamu

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      {/* Sidebar */}
      {isCompareMode ? (
        <>
          <Sidebar target="left" onToggle={setSidebarOpen} />
          <Sidebar target="right" />
        </>
      ) : (
        <Sidebar target="main" onToggle={setSidebarOpen} />
      )}

      {/* Konten Utama */}
      <Box sx={{ flex: 1, position: "relative" }}>
        <Navbar />

        {/* Switch antara Map utama & Compare */}
        {isCompareMode ? <CompareView /> : <MapView />}

        {/* PlayControl hanya tampil saat mode normal */}
        {!isCompareMode && <PlayControl />}

        {/* 🔹 Informasi Peta (floating ikut sidebar) */}
        {isCompareMode ? (
          <>
            {/* <InformasiPeta position="left" />
            <InformasiPeta position="right" /> */}
          </>
        ) : (
          <InformasiPeta position="left" />
        )}
      </Box>
    </Box>
  );
}

export default function Page() {
  return (
    <MapProvider>
      <MainContent />
    </MapProvider>
  );
}
