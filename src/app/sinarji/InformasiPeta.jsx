"use client";
import React, { useState } from "react";
import { Box, Paper, CardContent, useTheme, useMediaQuery, Typography, IconButton } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useMapContext } from "./MapContext";
import legends from "./LegendaConfig";

export default function InformasiPeta({ position = "left", target = "main" }) {
  const { pixelValue, pixelValueLeft, pixelValueRight, activeMenu, activeSubMenu, activeMenuLeft, activeSubMenuLeft, activeMenuRight, activeSubMenuRight } = useMapContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(640)); // HP kecil
  const isTablet = useMediaQuery(theme.breakpoints.down(1366)); // Tablet

  // tentukan pixel & legend sesuai target
  let pixel = pixelValue;
  let menu = activeMenu;
  let submenu = activeSubMenu;

  if (target === "left") {
    pixel = pixelValueLeft;
    menu = activeMenuLeft;
    submenu = activeSubMenuLeft;
  } else if (target === "right") {
    pixel = pixelValueRight;
    menu = activeMenuRight;
    submenu = activeSubMenuRight;
  }

  const menuLegends = legends[menu]?.[submenu] || [];
  const [open, setOpen] = useState(false); // langsung terbuka

  const renderPixelText = () => {
    if (!pixel) return "*Klik pada peta untuk melihat nilai pixel.";
    if (pixel.error) return "Gagal mengambil data pixel.";
    if (pixel.value === null || pixel.value === undefined) return "Tidak ada nilai pixel.";
    return `Nilai Pixel: ${pixel.value.toFixed(3)}`;
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen((s) => !s)}
        sx={{
          position: "absolute",
          bottom: isMobile ? 100 : isTablet ? 500 : 40,
          [position]: 35,
          zIndex: 2000,
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
            bottom: isMobile ? 140 : isTablet ? 500 : 40,
            [position]: 80,
            zIndex: 2000,
            width: isMobile ? "85vw" : isTablet ? "30vw" : "300px",
            maxHeight: isMobile ? "45vh" : isTablet ? "60vh" : "70vh",
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.98)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: "#0d47a1",
              color: "white",
              borderRadius: 2,
              py: 1.5,
              mb: 1,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            <Typography variant="subtitle10" sx={{ fontWeight: 500, fontSize: 16 }}>
              Informasi Peta
            </Typography>
          </Box>

          <CardContent>
            {/* Pixel value */}
            <Typography variant="body2" sx={{ mt: 0 }}>
              {renderPixelText()}
            </Typography>

            {/* Legend */}
            {menuLegends.length > 0 && (
              <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {menuLegends.map((legend, idx) => (
                  <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 20,
                        borderRadius: 1,
                        background: legend.gradient,
                      }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: 550, fontSize: 12, whiteSpace: "nowrap" }}>
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
