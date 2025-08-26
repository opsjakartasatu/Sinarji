"use client";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function Page() {
  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "white" }}>
      <MapComponent />
    </Box>
  );
}
