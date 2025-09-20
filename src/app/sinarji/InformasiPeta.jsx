"use client";
import React, { useState } from "react";
import { Box, Paper, CardContent, Typography, IconButton } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useMapContext } from "./MapContext";
import legends from "./LegendaConfig";

export default function InformasiPeta({ target = "main", position = "left" }) {
  const {
    // global
    activeMenu,
    activeSubMenu,
    pixelValue,
    // left
    activeMenuLeft,
    activeSubMenuLeft,
    pixelValueLeft,
    // right
    activeMenuRight,
    activeSubMenuRight,
    pixelValueRight,
  } = useMapContext();

  const [open, setOpen] = useState(false);

  // pick per-target state
  const menu = target === "left" ? activeMenuLeft : target === "right" ? activeMenuRight : activeMenu;
  const subMenu = target === "left" ? activeSubMenuLeft : target === "right" ? activeSubMenuRight : activeSubMenu;
  const pixel = target === "left" ? pixelValueLeft : target === "right" ? pixelValueRight : pixelValue;

  const menuLegends = menu && subMenu ? legends[menu]?.[subMenu] || [] : [];

  // parsing GRAY_INDEX like sebelumnya
  const renderPixelText = () => {
    if (!subMenu) return "Pilih menu untuk menampilkan informasi peta";
    if (!pixel) return "Nilai: *klik peta untuk menampilkan nilai";
    try {
      const match = pixel.match(/GRAY_INDEX\s*=\s*([0-9\.\-eE]+)/);
      if (match) return `Nilai: ${parseFloat(match[1]).toFixed(4)}`;
      // fallback: show first number found
      const numMatch = pixel.match(/([-+]?\d*\.\d+|\d+)/);
      if (numMatch) return `Nilai: ${parseFloat(numMatch[0]).toFixed(4)}`;
      return "Tidak ada nilai pixel pada lokasi ini";
    } catch (e) {
      return "Tidak ada nilai pixel pada lokasi ini";
    }
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen((s) => !s)}
        sx={{
          position: "absolute",
          bottom: 15,
          [position]: 35,
          zIndex: 1300,
          bgcolor: "#0d47a1",
          color: "white",
          width: 40,
          height: 40,
          borderRadius: 1.5,
          boxShadow: 3,
          "&:hover": { bgcolor: "#0b3a8f" },
        }}
        aria-label={`toggle-informasi-${target}`}
      >
        <FormatListBulletedIcon />
      </IconButton>

      {open && (
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            bottom: 15,
            [position]: 80,
            zIndex: 1300,
            width: 300,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.98)",
            overflow: "hidden",
          }}
        >
          <Box sx={{ bgcolor: "#0d47a1", color: "white", px: 2, py: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Informasi Peta
            </Typography>
          </Box>

          <CardContent>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {renderPixelText()}
            </Typography>

            {/* Legend (tetap per submenu, tidak mengikuti layer selection individual) */}
            {menuLegends.length > 0 && (
              <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {menuLegends.map((legend, idx) => (
                  <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ width: 50, height: 20, borderRadius: 1, background: legend.gradient }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                      {legend.title || (legend.labels ? legend.labels.join(" - ") : "")}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Paper>
      )}
    </>
  );
}
