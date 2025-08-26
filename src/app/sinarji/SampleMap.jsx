"use client";

import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map"; // ArcGIS Map object
import MapView from "@arcgis/core/views/MapView"; // 2D MapView
import WMSLayer from "@arcgis/core/layers/WMSLayer"; // WMS layer support
import Zoom from "@arcgis/core/widgets/Zoom"; // Zoom widget
import "@arcgis/core/assets/esri/themes/light/main.css"; // ArcGIS CSS (client-side only)

// MUI components used for the sidebar UI
import { Box, Paper, CardContent, Typography, IconButton, Slider, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// NOTE: Ganti dengan URL GeoServer WMS kamu.
// Untuk Next.js lebih baik menaruh ini di env var: process.env.NEXT_PUBLIC_GEOSERVER_URL
const GEOSERVER_URL = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms"; // GANTI URL

/**
 * MapWithSidebar
 * - Komponen React client-side yang menampilkan MapView ArcGIS dan sidebar MUI
 * - Mendapat daftar layer WMS dari GeoServer via GetCapabilities
 * - Mengizinkan menyalakan/mematikan layer, mengubah opasitas, dan menghapus semua layer
 */
export default function MapWithSidebar() {
  // reference ke DOM node yang akan dijadikan container MapView
  const mapNodeRef = useRef(null);

  // state untuk menyimpan instance MapView (bisa null saat belum siap)
  const [view, setView] = useState(null);

  // state untuk mengontrol sidebar (show/hide)
  const [showSidebar, setShowSidebar] = useState(true);

  // layersState: array of objects dengan properti:
  // { name, title, visible, opacity (0-100), wmsLayer (ArcGIS WMSLayer instance|null), showSettings }
  const [layersState, setLayersState] = useState([]);

  /**
   * Inisialisasi ArcGIS Map dan MapView — hanya dijalankan sekali ([] dependency)
   * "use client" di atas memastikan file ini dijalankan di client (Next.js)
   */
  useEffect(() => {
    // buat Map dengan basemap satellite
    const map = new Map({ basemap: "satellite" });

    // buat MapView dan attach ke DOM node (mapNodeRef.current)
    const mv = new MapView({
      container: mapNodeRef.current, // DOM node
      map, // instance Map
      center: [106.8456, -6.2088], // [lon, lat] — Jakarta
      zoom: 10,
      ui: { components: [] }, // kosongkan UI default (kita atur widget manual)
    });

    // Tambahkan widget Zoom — beri properti `view` (bukan mv atau view)
    // Posisi widget di bottom-right
    const zoom = new Zoom({ view: mv });
    mv.ui.add(zoom, "bottom-right");

    // saat mv ready, simpan instance ke state agar efek lain (GetCapabilities) dapat berjalan
    mv.when(() => setView(mv));

    // cleanup saat komponen unmount: destroy MapView agar resource dibebaskan
    return () => mv?.destroy();
  }, []);

  /**
   * Fetch GetCapabilities dari GeoServer — ambil daftar <Layer>
   * Dependensi: berjalan ulang saat `view` berubah (seharusnya hanya satu kali setelah view siap)
   */
  useEffect(() => {
    if (!view) return; // jika view belum siap, skip
    let cancelled = false; // flag untuk mencegah update state setelah unmount

    const fetchCapabilities = async () => {
      try {
        // Build URL GetCapabilities. Versi 1.1.1 dipakai di contoh ini — jika server pakai 1.3.0,
        // perhatikan perbedaan koordinat/CRS.
        const url = `${GEOSERVER_URL}?service=WMS&request=GetCapabilities&version=1.1.1`;

        // Fetch XML dari GeoServer
        const res = await fetch(url);
        const text = await res.text();

        // Parse XML string menjadi DOM untuk diekstrak
        const xml = new DOMParser().parseFromString(text, "text/xml");

        // Ambil semua elemen <Layer> yang memiliki <Name> (layer terdaftar)
        // Beberapa <Layer> di GetCapabilities bersifat parent (folder) tanpa <Name>
        const nodes = Array.from(xml.getElementsByTagName("Layer")).filter((n) => n.getElementsByTagName("Name")[0]);

        // Map tiap node menjadi objek layerState minimal
        const parsed = nodes.map((n) => {
          const name = n.getElementsByTagName("Name")[0].textContent;
          const titleNode = n.getElementsByTagName("Title")[0];
          const title = titleNode ? titleNode.textContent.trim() : name; // fallback ke name

          return {
            name,
            title,
            visible: false,
            opacity: 100,
            wmsLayer: null,
            showSettings: false,
          };
        });

        // jika komponen masih mounted, update state
        if (!cancelled) setLayersState(parsed);
      } catch (err) {
        console.error("GetCapabilities error:", err);
      }
    };

    fetchCapabilities();

    // cleanup effect
    return () => {
      cancelled = true;
    };
  }, [view]);

  /**
   * Toggle layer on/off
   * - Jika WMSLayer instance belum dibuat, buat baru dan tambahkan ke view.map
   * - Jika sudah ada, cukup ubah properti visible
   */
  const handleToggle = (idx) => {
    if (!view) return;
    setLayersState((prev) => {
      const next = [...prev];
      const item = { ...next[idx] };

      // jika belum ada instance WMSLayer untuk layer ini, buat dan tambahkan
      if (!item.wmsLayer) {
        const layer = new WMSLayer({
          url: GEOSERVER_URL,
          sublayers: [{ name: item.name }], // pilih sublayer berdasarkan name dari GetCapabilities
          visible: true,
          opacity: (item.opacity ?? 100) / 100,
        });

        // tambahkan ke peta
        view.map.add(layer);

        // simpan instance di state sehingga saat toggle berikutnya kita tidak membuat lagi
        item.wmsLayer = layer;
        item.visible = true;
      } else {
        // jika sudah ada, cukup invert visibility
        item.wmsLayer.visible = !item.wmsLayer.visible;
        item.visible = item.wmsLayer.visible;
      }

      next[idx] = item;
      return next;
    });
  };

  /**
   * Ubah opacity layer (slider value: 0-100)
   * - langsung update properti opacity pada WMSLayer jika instance ada
   */
  const handleOpacityChange = (idx, value) => {
    setLayersState((prev) => {
      const next = [...prev];
      const item = { ...next[idx], opacity: value };
      if (item.wmsLayer) item.wmsLayer.opacity = value / 100;
      next[idx] = item;
      return next;
    });
  };

  // toggle pengaturan (showSettings) pada item spesifik
  const handleToggleSettings = (idx) => {
    setLayersState((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], showSettings: !next[idx].showSettings };
      return next;
    });
  };

  /**
   * Hapus semua layer yang sudah ditambahkan ke peta
   * - Remove dari view.map dan destroy jika tersedia
   * - Reset properties di state
   */
  const handleRemoveAll = () => {
    if (!view) return;
    setLayersState((prev) => {
      // Remove semua layer nyata dari map
      prev.forEach((item) => {
        if (item.wmsLayer) {
          try {
            view.map.remove(item.wmsLayer);
            // jika objek layer punya method destroy, panggil (beberapa layer menyediakan ini)
            item.wmsLayer.destroy?.();
          } catch {}
        }
      });

      // kembalikan state baru dengan reference wmsLayer di-null-kan
      return prev.map((p) => ({
        ...p,
        wmsLayer: null,
        visible: false,
        showSettings: false,
      }));
    });
  };

  // --- JSX UI (Map container + Sidebar) ---
  return (
    <Box sx={{ position: "relative", height: "100vh", width: "100%" }}>
      {/* DOM node untuk MapView — ArcGIS akan menempelkan kanvas/map ke node ini */}
      <Box ref={mapNodeRef} sx={{ position: "absolute", inset: 0 }} />

      {/* Tombol toggle untuk menampilkan/menyembunyikan sidebar */}
      <IconButton
        onClick={() => setShowSidebar((s) => !s)}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 2000,
          bgcolor: "#0d47a1",
          color: "white",
          width: 48,
          height: 48,
          borderRadius: 1.5,
          boxShadow: 3,
          "&:hover": { bgcolor: "#0b3a8f" },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar — tampilkan hanya jika showSidebar true */}
      {showSidebar && (
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            top: 72,
            left: 16,
            zIndex: 1500,
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
                Katalog Layer
              </Typography>
            </Box>

            {/* Daftar layer (scrollable) */}
            <Box sx={{ maxHeight: "60vh", overflowY: "auto", pr: 1 }}>
              <List disablePadding>
                {layersState.map((layer, i) => (
                  <Box key={layer.name} sx={{ mb: 1.5 }}>
                    <ListItem
                      disableGutters
                      sx={{
                        alignItems: "center",
                        py: 0.5,
                        display: "flex",
                      }}
                    >
                      {/* Checkbox untuk toggle visibility */}
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Checkbox size="small" checked={!!layer.visible} onChange={() => handleToggle(i)} />
                      </ListItemIcon>

                      {/* Nama layer (title) — pakai Tooltip agar bisa dilihat penuh */}
                      <Tooltip title={layer.title}>
                        <ListItemText
                          primary={layer.title}
                          primaryTypographyProps={{
                            noWrap: true,
                            sx: { fontSize: 13, fontWeight: 600 },
                          }}
                        />
                      </Tooltip>

                      {/* Tombol 3-titik untuk menampilkan pengaturan (transparansi) */}
                      <IconButton size="small" onClick={() => handleToggleSettings(i)} sx={{ ml: 1 }}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </ListItem>

                    {/* Pengaturan transparansi — tampilkan hanya jika showSettings true dan layer visible */}
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
                        <Slider value={layer.opacity ?? 100} min={0} max={100} step={1} onChange={(_, v) => handleOpacityChange(i, v)} sx={{ flex: 1 }} />
                        <VisibilityIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                      </Box>
                    )}
                  </Box>
                ))}
              </List>
            </Box>

            {/* Tombol Hapus Semua */}
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
    </Box>
  );
}
