"use client";
import React, { useState } from "react";
import { Box, Paper, CardContent, Typography, IconButton, Collapse } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMapContext } from "./MapContext";
import legends from "./LegendaConfig";

export default function InformasiPeta() {
  const { activeMenu, activeSubMenu, pixelValue } = useMapContext();
  const [open, setOpen] = useState(true);

  const judul = activeMenu && activeSubMenu ? `Peta ${activeMenu} - ${activeSubMenu}` : "";

  // Ambil legend sesuai menu yang aktif
  const menuLegends = legends[activeMenu] || [];

  return (
    <Box
      sx={{
        position: "absolute",
        mt: 1,
        top: 450, // letak di bawah sidebar
        left: 35,
        zIndex: 2,
        width: 320,
      }}
    >
      <Paper elevation={6} sx={{ borderRadius: 3, overflow: "hidden" }}>
        {/* Header */}
        <Box
          sx={{
            bgcolor: "#0d47a1",
            color: "white",
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Informasi Peta
          </Typography>
          <IconButton size="small" onClick={() => setOpen(!open)} sx={{ color: "white" }}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        {/* Isi collapsible */}
        <Collapse in={open}>
          <CardContent>
            {/* Judul peta */}
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {judul}
            </Typography>

            {/* Nilai pixel */}
            <Typography variant="body2" sx={{ mt: 1 }}>
              {activeSubMenu
                ? pixelValue
                  ? (() => {
                      const match = pixelValue.match(/GRAY_INDEX\s*=\s*([0-9\.\-eE]+)/);
                      if (match) {
                        return `Nilai: ${parseFloat(match[1]).toFixed(4)}`;
                      }
                      return "Tidak ada nilai pixel pada lokasi ini";
                    })()
                  : "Nilai: *klik peta untuk menampilkan nilai"
                : "Pilih menu untuk menampilkan informasi peta"}
            </Typography>

            {/* Render semua legend dalam 1 baris */}
            {/* Render semua legend secara horizontal */}
            {menuLegends.length > 0 && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column", // tiap legend di baris sendiri
                  gap: 1.5,
                }}
              >
                {menuLegends.map((legend, idx) => {
                  const labels = legend.labels || [];
                  const labelText = labels.length > 1 ? `${labels[0]} – ${labels[1]}` : legend.title;

                  return (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      {/* Kotak gradient */}
                      <Box
                        sx={{
                          width: 50,
                          height: 20,
                          borderRadius: 1,
                          background: legend.gradient,
                        }}
                      />

                      {/* Label di sebelah kanan kotak */}
                      <Typography variant="caption" sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                        {labelText}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            )}
          </CardContent>
        </Collapse>
      </Paper>
    </Box>
  );
}
