"use client";
import React, { useRef, useEffect } from "react";
import { Box, Paper, CardContent, Typography, IconButton, Slider, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMapContext } from "@/app/sinarji/MapContext";
import InformasiPeta from "@/app/sinarji/InformasiPeta";
import { FaBars, FaChevronLeft } from "react-icons/fa";

export default function Sidebar() {
  const {
    layersState,
    showSidebar,
    setShowSidebar,
    handleToggle,
    handleOpacityChange,
    handleToggleSettings,
    handleRemoveAll,
    activeMenu,
    activeSubMenu,
    currentYear, // << ambil dari context
  } = useMapContext();

  const itemRefs = useRef({}); // simpan ref per layer

  // Auto scroll ketika currentYear berubah
  useEffect(() => {
    if (currentYear && itemRefs.current[currentYear]) {
      itemRefs.current[currentYear].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentYear]);

  return (
    <>
      {/* Tombol toggle */}
      <IconButton
        onClick={() => setShowSidebar((s) => !s)}
        sx={{
          position: "absolute",
          top: 90,
          left: 35,
          zIndex: 2,
          bgcolor: "#0d47a1",
          color: "white",
          width: 40,
          height: 40,
          borderRadius: 1.5,
          boxShadow: 3,
          transition: "left 0.3s ease",
          "&:hover": { bgcolor: "#0b3a8f" },
        }}
      >
        {showSidebar ? <FaChevronLeft /> : <FaBars />}
      </IconButton>

      {/* Sidebar */}
      {showSidebar && (
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            top: 135,
            left: 35,
            zIndex: 2,
            width: 300,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.98)",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 2 }}>
            {/* Header */}
            <Box
              sx={{
                bgcolor: "#0d47a1",
                color: "white",
                borderRadius: 2,
                px: 2,
                py: 1.2,
                mb: 2,
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              <Typography variant="subtitle10" sx={{ fontWeight: 800 }}>
                {activeMenu && activeSubMenu ? `Daftar Layer ${activeMenu} - ${activeSubMenu}` : "Daftar Layer"}
              </Typography>
            </Box>

            {/* Daftar layer */}
            <Box sx={{ maxHeight: "15vh", overflowY: "auto", pr: 1 }}>
              <List disablePadding>
                {layersState.map((layer, i) => {
                  // misal layer punya properti year untuk dicocokkan dengan currentYear
                  const isActive = currentYear === layer.year;

                  return (
                    <Box key={`${layer.name}-${i}`} ref={(el) => (itemRefs.current[layer.year] = el)}>
                      <ListItem
                        disableGutters
                        sx={{
                          alignItems: "center",
                          py: 0,
                          display: "flex",
                          minHeight: 28,
                          bgcolor: isActive
                            ? "rgba(13,71,161,0.1)" // highlight
                            : "transparent",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Checkbox size="small" checked={!!layer.visible} onChange={() => handleToggle(i)} />
                        </ListItemIcon>

                        <Tooltip title={layer.title}>
                          <ListItemText
                            primary={layer.title}
                            primaryTypographyProps={{
                              noWrap: true,
                              sx: {
                                fontSize: 12.5,
                                fontWeight: 600,
                                color: isActive ? "var(--jakartasatu-orange)" : "inherit",
                              },
                            }}
                          />
                        </Tooltip>

                        <IconButton size="small" onClick={() => handleToggleSettings(i)} sx={{ ml: 0.5 }}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </ListItem>

                      {/* Slider opacity */}
                      {layer.showSettings && layer.visible && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            px: 2,
                            mt: 0.5,
                          }}
                        >
                          <VisibilityOffIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                          <Slider value={Math.round((layer.opacity ?? 1) * 100)} min={0} max={100} step={1} onChange={(_, v) => handleOpacityChange(i, Array.isArray(v) ? v[0] : v)} sx={{ flex: 1 }} />
                          <VisibilityIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </List>
            </Box>

            {/* Tombol hapus semua */}
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleRemoveAll}
              sx={{
                mt: 1,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                fontSize: 15,
              }}
            >
              Hapus Semua
            </Button>

            {/* Informasi Peta di bawah */}
            <Box sx={{ mt: 2 }}>
              <InformasiPeta />
            </Box>
          </CardContent>
        </Paper>
      )}
    </>
  );
}
