"use client";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import { MapProvider } from "./MapContext";
// import Sidebar from "./Sidebar";
import Sidebar from "@/components/sidebarDashboard/SidebarSinarji";
import Navbar from "@/components/navbar/NavbarSinarji";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function Page() {
  return (
    <MapProvider>
      <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
        <Sidebar />
        <Box sx={{ flex: 1 }}>
          <Navbar />
          <MapView />
        </Box>
      </Box>
    </MapProvider>
  );
}
