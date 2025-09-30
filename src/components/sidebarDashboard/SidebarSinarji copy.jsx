"use client";
import React, { useRef, useEffect } from "react";
import { Box, Paper, CardContent, Typography, IconButton, Slider, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMapContext } from "@/app/sinarji/MapContext";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { FaBars } from "react-icons/fa";

export default function Sidebar({ target = "main" }) {
  const {
    layersState,
    setLayersState,
    layersStateLeft,
    setLayersStateLeft,
    layersStateRight,
    setLayersStateRight,
    showSidebar,
    setShowSidebar,
    handleSelectMenuLayers,
    handleToggleSettings,
    handleOpacityChange,
    activeMenu,
    activeSubMenu,
    currentYear,
  } = useMapContext();

  // pilih state sesuai target
  let currentLayers = layersState;
  let setCurrentLayers = setLayersState;
  if (target === "left") {
    currentLayers = layersStateLeft;
    setCurrentLayers = setLayersStateLeft;
  } else if (target === "right") {
    currentLayers = layersStateRight;
    setCurrentLayers = setLayersStateRight;
  }

  const itemRefs = useRef({});
  const listRef = useRef(null);

  const lastMenuRef = useRef(null);
  const lastSubMenuRef = useRef(null);

  // Auto scroll highlight currentYear hanya untuk main
  useEffect(() => {
    if (target === "main" && currentYear && itemRefs.current[currentYear]) {
      itemRefs.current[currentYear].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentYear, target]);

  // Auto panggil handleSelectMenuLayers saat submenu berubah
  useEffect(() => {
    if (activeMenu && activeSubMenu && (lastMenuRef.current !== activeMenu || lastSubMenuRef.current !== activeSubMenu)) {
      // hanya jalan kalau submenu/menu berbeda dari sebelumnya
      handleSelectMenuLayers(activeMenu, activeSubMenu, target);

      // update cache
      lastMenuRef.current = activeMenu;
      lastSubMenuRef.current = activeSubMenu;
    }
  }, [activeMenu, activeSubMenu, target]);

  // Reset scroll saat submenu berubah (khusus main)
  useEffect(() => {
    if (target === "main" && listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [activeMenu, activeSubMenu, target]);

  const handleToggle = (idx) => {
    setCurrentLayers((prev) => prev.map((layer, i) => (i === idx ? { ...layer, visible: !layer.visible } : layer)));
  };

  const handleRemoveAll = () => {
    setCurrentLayers((prev) => prev.map((layer) => ({ ...layer, visible: false })));
  };

  return (
    <>
      {/* Tombol toggle sidebar */}
      <IconButton
        onClick={() => setShowSidebar((s) => !s)}
        sx={{
          position: "absolute",
          top: 145,
          left: target === "right" ? "auto" : 35,
          right: target === "right" ? 35 : "auto",
          zIndex: 2,
          bgcolor: "#0d47a1",
          color: "white",
          width: 40,
          height: 40,
          borderRadius: 1.5,
          boxShadow: 3,
          transition: "all 0.3s ease",
          "&:hover": { bgcolor: "#0b3a8f" },
        }}
      >
        {showSidebar ? <MenuOpenIcon /> : <FaBars />}
      </IconButton>

      {/* Sidebar */}
      {showSidebar && (
        <Paper
          elevation={8}
          data-sidebar={target}
          sx={{
            position: "absolute",
            top: 145,
            left: target === "right" ? "auto" : 80,
            right: target === "right" ? 80 : "auto",
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
                {target === "left" ? "Daftar Layer Kiri" : target === "right" ? "Daftar Layer Kanan" : activeMenu && activeSubMenu ? `Daftar Layer ${activeMenu} - ${activeSubMenu}` : "Daftar Layer"}
              </Typography>
            </Box>

            {/* Daftar layer */}
            <Box id="layer-list-container" ref={listRef} sx={{ maxHeight: "20vh", overflowY: "auto", pr: 1 }}>
              <List disablePadding>
                {currentLayers.map((layer, i) => {
                  const isActive = target === "main" && currentYear === layer.year;
                  return (
                    <Box key={`${layer.name}-${i}`} ref={(el) => (el ? (itemRefs.current[layer.year] = el) : null)}>
                      <ListItem disableGutters sx={{ alignItems: "center", py: 0, display: "flex", minHeight: 28 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Checkbox size="small" checked={!!layer.visible} onChange={() => handleToggle(i)} />
                        </ListItemIcon>
                        <ListItemText
                          primary={layer.title}
                          primaryTypographyProps={{
                            noWrap: true,
                            sx: { fontSize: 12.5, fontWeight: 600, color: isActive ? "var(--jakartasatu-orange)" : "inherit" },
                          }}
                        />
                        <IconButton size="small" onClick={() => handleToggleSettings(i)} sx={{ ml: 0.5 }}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </ListItem>

                      {layer.showSettings && layer.visible && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, mt: 0.5 }}>
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
            <Button fullWidth variant="contained" color="error" onClick={handleRemoveAll} disabled={currentLayers.filter((l) => l.visible).length <= 1} sx={{ mt: 1, borderRadius: 2, fontWeight: 700, textTransform: "none", fontSize: 15 }}>
              Hapus Semua
            </Button>

            {/* Informasi Peta */}
            {/* <Box sx={{ mt: 2 }}>
              <InformasiPeta />
            </Box> */}
          </CardContent>
        </Paper>
      )}
    </>
  );
}
