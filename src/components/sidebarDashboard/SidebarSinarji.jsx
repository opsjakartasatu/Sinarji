"use client";
import React from "react";
import { Box, Paper, CardContent, Typography, IconButton, Slider, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMapContext } from "@/app/sinarji/MapContext";
import { FaBars, FaChevronLeft } from "react-icons/fa";

export default function Sidebar() {
  const { layersState, showSidebar, setShowSidebar, handleToggle, handleOpacityChange, handleToggleSettings, handleRemoveAll } = useMapContext();

  return (
    <>
      {/* Tombol toggle */}
      <IconButton
        onClick={() => setShowSidebar((s) => !s)}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 2,
          bgcolor: "#0d47a1",
          color: "white",
          width: 48,
          height: 48,
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
            top: 72,
            left: 16,
            zIndex: 2,
            width: 360,
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
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                Daftar Layer
              </Typography>
            </Box>

            {/* Daftar layer */}
            <Box sx={{ maxHeight: "60vh", overflowY: "auto", pr: 1 }}>
              <List disablePadding>
                {layersState.map((layer, i) => (
                  <Box key={`${layer.name}-${i}`} sx={{ mb: 1.5 }}>
                    <ListItem
                      disableGutters
                      sx={{
                        alignItems: "center",
                        py: 0.5,
                        display: "flex",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Checkbox size="small" checked={!!layer.visible} onChange={() => handleToggle(i)} />
                      </ListItemIcon>

                      <Tooltip title={layer.title}>
                        <ListItemText
                          primary={layer.title}
                          primaryTypographyProps={{
                            noWrap: true,
                            sx: { fontSize: 13, fontWeight: 600 },
                          }}
                        />
                      </Tooltip>

                      <IconButton size="small" onClick={() => handleToggleSettings(i)} sx={{ ml: 1 }}>
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
                        <Slider
                          value={Math.round((layer.opacity ?? 1) * 100)} // 0–1 → 0–100 utk UI
                          min={0}
                          max={100}
                          step={1}
                          onChange={(_, v) => handleOpacityChange(i, Array.isArray(v) ? v[0] : v)}
                          sx={{ flex: 1 }}
                        />
                        <VisibilityIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                      </Box>
                    )}
                  </Box>
                ))}
              </List>
            </Box>

            {/* Tombol hapus semua */}
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleRemoveAll}
              sx={{
                mt: 2,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                fontSize: 15,
              }}
            >
              Hapus Semua
            </Button>
          </CardContent>
        </Paper>
      )}
    </>
  );
}
