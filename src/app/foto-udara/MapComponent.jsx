"use client";

import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import Swipe from "@arcgis/core/widgets/Swipe";
import { Box, Stack, Tooltip, Button, Typography, IconButton } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CloseIcon from "@mui/icons-material/Close";
import Search from "./Search";
import "@arcgis/core/assets/esri/themes/light/main.css";
import Navbar from "@/components/navbar/navbarFotoUdara";
import { useMediaQuery } from "@mui/material";

const TRANSITION_INTERVAL = 8000;

// Data foto udara
const aerialPhotosMapping = [
  { year: 1972, id: "1972", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_1972/ows", name: "dki:dki_1972" }], label: "1972" },
  { year: 1976, id: "1976", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_1976/ows", name: "dki:dki_1976" }], label: "1976" },
  { year: 1978, id: "1978", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_1978/ows", name: "dki:dki_1978" }], label: "1978" },
  { year: 1979, id: "1979", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_1979/ows", name: "dki:dki_1979" }], label: "1979" },
  { year: 1982, id: "1982", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_1982/ows", name: "dki:dki_1982" }], label: "1982" },
  { year: 1985, id: "1985", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_1985/ows", name: "dki:dki_1985" }], label: "1985" },
  { year: 1994, id: "1994-1", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_1994/ows", name: "dki:dki_1994" }], label: "1994" },
  { year: 1994, id: "1994-2", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_1994_2/ows", name: "dki:dki_1994_2" }], label: "1994" },
  { year: 2014, id: "2014", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_2014/ows", name: "dki:dki_2014" }], label: "2014" },
  { year: 2020, id: "2020", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_2020/ows", name: "dki:dki_2020" }], label: "2020" },
  { year: 2022, id: "2022-MS", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_2022_MultiSpectral/ows", name: "dki:dki_2022_MultiSpectral" }], label: "2022" },
  { year: 2022, id: "2022-Neo", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_2022_Neo/ows", name: "dki:dki_2022_Neo" }], label: "2022" },
  { year: 2023, id: "2023", layers: [{ wmsUrl: "https://gis-dev.dcktrp.id/gisimagery/dki/dki_2023/ows", name: "dki:dki_2023" }], label: "2023" },
];

// Menambahan unique layer foto udara
const uniqueLayerEntries = aerialPhotosMapping.map((item) => ({
  year: item.year,
  id: item.id,
  label: item.label,
}));

// Komponen YearList
const YearList = ({ layerEntries, selectedLayerId, onLayerSelect, side = "left", topOffset = "250px", sideOffset = "30px" }) => {
  const scrollBoxRef = useRef(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const checkForScroll = () => {
      if (scrollBoxRef.current) {
        const isScrollable = scrollBoxRef.current.scrollHeight > scrollBoxRef.current.clientHeight;
        setHasScroll(isScrollable);
      }
    };
    checkForScroll();
    window.addEventListener("resize", checkForScroll);
    return () => {
      window.removeEventListener("resize", checkForScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "200px",
        [side]: sideOffset,
        width: "90px",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "2px 4px 12px 0px rgba(0, 0, 0, 0.10)",
        zIndex: 99,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#003366",
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
          py: 1,
        }}
      >
        Tahun
      </Box>

      <Box sx={{ backgroundColor: "#fff" }}>
        <Box
          ref={scrollBoxRef}
          sx={{
            p: 1,
            mr: hasScroll ? 1 : 0,
            maxHeight: "60vh",
            overflowY: "auto",
            "::-webkit-scrollbar": { width: "4px" },
            "::-webkit-scrollbar-track": {
              borderRadius: "4px",
              border: "1px solid #DFE6E9",
              margin: "10px 0",
              width: "10px",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#003577",
              borderRadius: "5px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#002b5e",
            },
          }}
        >
          {layerEntries.map((entry) => (
            <Box
              key={entry.id}
              onClick={() => onLayerSelect(entry.id)}
              sx={{
                cursor: "pointer",
                color: selectedLayerId === entry.id ? "#fff" : "#003366",
                backgroundColor: selectedLayerId === entry.id ? "#FF9900" : "transparent",
                fontWeight: "bold",
                textAlign: "center",
                borderRadius: 1,
                p: 1,
                mb: 1,
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: selectedLayerId === entry.id ? "#FF9900" : "rgba(0, 51, 102, 0.1)",
                },
              }}
            >
              {entry.label}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const YearDropdown = ({ layerEntries, selectedLayerId, onLayerSelect, label = "Tahun" }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (id) => {
    onLayerSelect(id);
    setOpen(false);
  };

  const selectedEntry = layerEntries.find((entry) => entry.id === selectedLayerId) || { label: "" };

  return (
    <Box sx={{ position: "relative", width: "120px", zIndex: 1002 }}>
      {/* Tombol dropdown */}
      <Button
        onClick={handleToggle}
        sx={{
          width: "100%",
          backgroundColor: "#FF9900",
          color: "white",
          borderRadius: "25px",
          textAlign: "center",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 12px",
          "&:hover": { backgroundColor: "#E68A00" },
        }}
      >
        <Typography sx={{ marginRight: 1 }}>{selectedEntry.label || "2023"}</Typography>
      </Button>

      {/* Daftar tahun */}
      {open && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            maxHeight: "60vh",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            marginTop: "5px",
            overflow: "hidden",
          }}
        >
          <Box sx={{ backgroundColor: "#003366", color: "#fff", textAlign: "center", fontWeight: "bold", py: 1 }}>{label}</Box>

          <Box
            sx={{
              maxHeight: "50vh",
              overflowY: "auto",
              "::-webkit-scrollbar": { width: "4px" },
              "::-webkit-scrollbar-track": { borderRadius: "4px", border: "1px solid #DFE6E9", margin: "10px 0", width: "10px" },
              "::-webkit-scrollbar-thumb": { background: "#003577", borderRadius: "5px" },
            }}
          >
            {layerEntries.map((entry) => (
              <Box
                key={entry.id}
                onClick={() => handleSelect(entry.id)}
                sx={{
                  cursor: "pointer",
                  color: selectedLayerId === entry.id ? "#fff" : "#003366",
                  backgroundColor: selectedLayerId === entry.id ? "#FF9900" : "transparent",
                  fontWeight: "bold",
                  textAlign: "center",
                  p: 1,
                  transition: "all 0.3s",
                  "&:hover": { backgroundColor: selectedLayerId === entry.id ? "#FF9900" : "rgba(0, 51, 102, 0.1)" },
                }}
              >
                {entry.label}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const MapComponent = () => {
  const leftMapRef = useRef(null);
  const rightMapRef = useRef(null);

  const [leftMapView, setLeftMapView] = useState(null);
  const [rightMapView, setRightMapView] = useState(null);

  const [selectedLayerId, setSelectedLayerId] = useState("2023");
  const [compareLayerId, setCompareLayerId] = useState("1972");

  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSwipeMode, setIsSwipeMode] = useState(false);
  const [isCompareMode, setIsCompareMode] = useState(false);

  const layersRef = useRef({});
  const swipeWidgetRef = useRef(null);
  const playerTimeoutRef = useRef(null);
  const syncInProgressRef = useRef(false);
  const globalStyleRef = useRef(null);

  const [metadataList, setMetadataList] = useState([]);
  const [selectedMetadata, setSelectedMetadata] = useState(null);
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);

  const isMobilePortrait = useMediaQuery("(max-width:600px) and (orientation: portrait)");
  const isMobileLandscape = useMediaQuery("(max-width:960px) and (orientation: landscape)");
  const isMobile = isMobilePortrait || isMobileLandscape;

  // Fetch metadata (URL endpoint silakan disesuaikan)
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch("/geoportal/api/foto_udara");
        const json = await res.json();
        if (json?.status) {
          setMetadataList(json.data);
        }
      } catch (err) {
        console.error("Error fetching metadata:", err);
      }
    };
    fetchMetadata();
  }, []);

  // Update selectedMetadata setiap kali popup terbuka
  useEffect(() => {
    if (isMetadataOpen) {
      const currentLayer = aerialPhotosMapping.find((item) => item.id === selectedLayerId);
      const year = currentLayer?.year || 2023;
      const found = metadataList.find((item) => item.namaData?.includes(year.toString()));
      if (found) {
        setSelectedMetadata(found);
      } else {
        setSelectedMetadata(null);
      }
    }
  }, [selectedLayerId, metadataList, isMetadataOpen]);

  // Buka popup metadata
  const handleOpenMetadata = () => {
    const currentLayer = aerialPhotosMapping.find((item) => item.id === selectedLayerId);
    const year = currentLayer?.year || 2023;
    const found = metadataList.find((item) => item.namaData?.includes(year.toString()));
    if (found) {
      setSelectedMetadata(found);
      setIsMetadataOpen(true);
    } else {
      alert(`Metadata untuk tahun ${year} tidak ditemukan.`);
    }
  };

  // Tutup popup metadata
  const handleCloseMetadata = () => {
    setIsMetadataOpen(false);
    setSelectedMetadata(null);
  };

  // Global style hilangkan outline ArcGIS
  useEffect(() => {
    const globalStyle = document.createElement("style");
    globalStyle.textContent = `
      .esri-view-surface:focus,
      .esri-view-surface:focus-visible,
      .esri-view-surface--inset-outline,
      .esri-view-surface--inset-outline:focus,
      .esri-view-surface--inset-outline:focus:before,
      .esri-view-surface--inset-outline:focus-visible:before,
      .esri-view-root:focus,
      .esri-view-root:focus-visible,
      .esri-view canvas:focus,
      .esri-view canvas:focus-visible,
      .esri-component:focus,
      .esri-component:focus-visible {
        outline: none !important;
        box-shadow: none !important;
        border: none !important;
      }
    `;
    document.head.appendChild(globalStyle);
    globalStyleRef.current = globalStyle;

    return () => {
      if (globalStyleRef.current) {
        document.head.removeChild(globalStyleRef.current);
      }
    };
  }, []);

  // Membuat WMSLayer
  const createWMSLayer = (layerInfo, layerId) => {
    const layer = new WMSLayer({
      url: layerInfo.wmsUrl,
      sublayers: [{ name: layerInfo.name }],
      opacity: 1,
      visible: true,
      blendMode: "normal",
    });
    if (!layersRef.current[layerId]) {
      layersRef.current[layerId] = [];
    }
    layersRef.current[layerId].push(layer);
    return layer;
  };

  // Preload semua layer
  const preloadLayers = async () => {
    try {
      setIsLoading(true);
      const layerPromises = [];
      aerialPhotosMapping.forEach((layerData) => {
        const layerId = layerData.id;
        layerData.layers.forEach((layerInfo) => {
          const layer = createWMSLayer(layerInfo, layerId);
          layerPromises.push(layer.load());
        });
      });
      await Promise.all(layerPromises);
      return true;
    } catch (error) {
      console.error("Error preloading layers:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Nonaktifkan popup & selection
  const disableViewSelection = (view) => {
    if (!view) return;
    view.on("click", (event) => {
      event.stopPropagation();
    });
    view.popup.autoOpenEnabled = false;
    view.popup.dockEnabled = false;
    setTimeout(() => {
      const container = view.container;
      if (container) {
        container.style.outline = "none";
        container.style.boxShadow = "none";
        const style = document.createElement("style");
        style.textContent = `
          .esri-view-root:focus,
          .esri-view-root:focus-visible,
          .esri-view-surface:focus,
          .esri-view-surface:focus-visible,
          .esri-view-surface--inset-outline,
          .esri-view-surface--inset-outline:focus,
          .esri-view-surface--inset-outline:focus-visible,
          .esri-view-surface--inset-outline:before,
          .esri-view-surface--inset-outline:focus:before,
          .esri-view-surface--inset-outline:focus-visible:before,
          canvas:focus,
          canvas:focus-visible,
          *:focus,
          *:focus-visible {
            outline: none !important;
            box-shadow: none !important;
            border: none !important;
          }
        `;
        container.appendChild(style);
        const canvasElements = container.querySelectorAll("canvas");
        canvasElements.forEach((canvas) => {
          canvas.setAttribute("tabindex", "-1");
          canvas.style.outline = "none";
          canvas.style.boxShadow = "none";
        });
      }
    }, 500);
  };

  // Inisialisasi map tunggal
  const initializeSingleMap = async () => {
    try {
      setIsLoading(true);
      const map = new Map({ basemap: "streets" });
      const view = new MapView({
        container: leftMapRef.current,
        map: map,
        center: [106.827153, -6.175392],
        zoom: 11,
        constraints: { rotationEnabled: false },
        ui: { components: [] },
        highlightOptions: {
          color: [0, 0, 0, 0],
          fillOpacity: 0,
        },
      });
      await view.when();
      setLeftMapView(view);
      await preloadLayers();
      // Layer default 2023
      const initialLayers = layersRef.current["2023"];
      if (initialLayers && initialLayers.length > 0) {
        initialLayers.forEach((layer) => {
          map.add(layer, 1);
        });
      }
      disableViewSelection(view);
    } catch (error) {
      console.error("Error initializing map:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Inisialisasi 2 map (compare)
  const initializeCompareMaps = async () => {
    try {
      setIsLoading(true);
      const leftMap = new Map({ basemap: "streets" });
      const rightMap = new Map({ basemap: "streets" });

      if (isMobilePortrait) {
        leftMapRef.current.style.width = "100%";
        leftMapRef.current.style.height = "50%";
        leftMapRef.current.style.top = "0";
        leftMapRef.current.style.left = "0";
        leftMapRef.current.style.borderRight = "none";
        leftMapRef.current.style.borderBottom = "3px solid white";

        rightMapRef.current.style.width = "100%";
        rightMapRef.current.style.height = "50%";
        rightMapRef.current.style.top = "50%";
        rightMapRef.current.style.right = "0";
      }

      const leftView = new MapView({
        container: leftMapRef.current,
        map: leftMap,
        center: [106.827153, -6.175392],
        zoom: 10,
        constraints: { rotationEnabled: false },
        ui: { components: [] },
        highlightOptions: {
          color: [0, 0, 0, 0],
          fillOpacity: 0,
        },
        popupEnabled: false,
      });

      const rightView = new MapView({
        container: rightMapRef.current,
        map: rightMap,
        center: [106.827153, -6.175392],
        zoom: 10,
        constraints: { rotationEnabled: false },
        ui: { components: [] },
        highlightOptions: {
          color: [0, 0, 0, 0],
          fillOpacity: 0,
        },
        popupEnabled: false,
      });

      await Promise.all([leftView.when(), rightView.when()]);
      setLeftMapView(leftView);
      setRightMapView(rightView);
      await preloadLayers();

      const leftLayers = layersRef.current[selectedLayerId];
      const rightLayers = layersRef.current[compareLayerId];
      if (leftLayers?.length > 0) {
        leftLayers.forEach((layer) => {
          leftMap.add(layer, 1);
        });
      }
      if (rightLayers?.length > 0) {
        rightLayers.forEach((layer) => {
          rightMap.add(layer, 1);
        });
      }
      synchronizeViews(leftView, rightView);
      disableViewSelection(leftView);
      disableViewSelection(rightView);
    } catch (error) {
      console.error("Error initializing compare maps:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sinkronisasi viewpoint compare
  const synchronizeViews = (view1, view2) => {
    if (!view1 || !view2) return;
    const syncViews = (source, target) => {
      if (syncInProgressRef.current) return;
      syncInProgressRef.current = true;
      target
        .goTo(
          {
            target: source.center,
            zoom: source.zoom,
            rotation: source.rotation,
          },
          { duration: 0, easing: "linear" }
        )
        .catch(() => {})
        .finally(() => {
          syncInProgressRef.current = false;
        });
    };
    view1.watch("viewpoint", () => syncViews(view1, view2));
    view2.watch("viewpoint", () => syncViews(view2, view1));
    view1.on("drag", (event) => {
      if (event.action !== "end" && !syncInProgressRef.current) {
        syncViews(view1, view2);
      }
    });
    view2.on("drag", (event) => {
      if (event.action !== "end" && !syncInProgressRef.current) {
        syncViews(view2, view1);
      }
    });
    view1.on("mouse-wheel", () => {
      if (!syncInProgressRef.current) {
        syncViews(view1, view2);
      }
    });
    view2.on("mouse-wheel", () => {
      if (!syncInProgressRef.current) {
        syncViews(view2, view1);
      }
    });
  };

  // Setiap kali compare mode berubah
  useEffect(() => {
    if (!leftMapRef.current) return;
    const cleanup = () => {
      if (leftMapView) leftMapView.destroy();
      if (rightMapView) rightMapView.destroy();
      if (playerTimeoutRef.current) clearTimeout(playerTimeoutRef.current);
      if (swipeWidgetRef.current) swipeWidgetRef.current.destroy();
      layersRef.current = {};
    };

    if (isCompareMode) {
      cleanup();
      initializeCompareMaps();
    } else {
      cleanup();
      initializeSingleMap();
    }
    return cleanup;
  }, [isCompareMode]);

  useEffect(() => {
    if (leftMapView) disableViewSelection(leftMapView);
    if (rightMapView) disableViewSelection(rightMapView);
  }, [leftMapView, rightMapView]);

  // Tampilkan satu layer di map tunggal
  const showSingleLayer = (layerId) => {
    if (!leftMapView?.map || isCompareMode) return;
    leftMapView.map.layers.removeAll();
    const layers = layersRef.current[layerId];
    if (layers?.length > 0) {
      layers.forEach((layer) => {
        leftMapView.map.add(layer, 1);
      });
    }
  };

  // Update widget swipe
  const updateSwipeWidget = () => {
    if (!isSwipeMode || !leftMapView || isCompareMode) return;
    const leftLayers = layersRef.current[selectedLayerId];
    const rightLayers = layersRef.current[compareLayerId];
    if (leftLayers?.length > 0 && rightLayers?.length > 0) {
      if (swipeWidgetRef.current) {
        swipeWidgetRef.current.destroy();
      }
      leftMapView.map.layers.removeAll();
      [...leftLayers, ...rightLayers].forEach((layer) => {
        leftMapView.map.add(layer);
      });

      // Komponen Swipe
      const swipeDirection = isMobilePortrait ? "vertical" : "horizontal";
      swipeWidgetRef.current = new Swipe({
        view: leftMapView,
        leadingLayers: leftLayers,
        trailingLayers: rightLayers,
        direction: swipeDirection,
        position: 50,
      });

      leftMapView.ui.add(swipeWidgetRef.current);

      swipeWidgetRef.current.when(() => {
        swipeWidgetRef.current.container.style.zIndex = "9999";
        const divider = swipeWidgetRef.current.container.querySelector(".esri-swipe__divider");
        if (divider) {
          divider.style.background = "none";
          divider.style.border = "none";
          divider.style.boxShadow = "none";
          divider.style.width = "0";
          divider.style.cursor = swipeDirection === "horizontal" ? "col-resize" : "row-resize";
          if (swipeDirection === "horizontal") {
            divider.style.borderLeft = "3px solid #ffffff";
            divider.style.borderTop = "none";
          } else {
            divider.style.borderLeft = "none";
            divider.style.borderTop = "3px solid #ffffff";
          }
        }
      });
    }
  };

  // Update map compare
  const updateCompareMaps = () => {
    if (!isCompareMode || !leftMapView || !rightMapView) return;
    const leftLayers = layersRef.current[selectedLayerId];
    const rightLayers = layersRef.current[compareLayerId];
    if (leftLayers?.length > 0) {
      leftMapView.map.layers.removeAll();
      leftLayers.forEach((layer) => {
        leftMapView.map.add(layer, 1);
      });
    }
    if (rightLayers?.length > 0) {
      rightMapView.map.layers.removeAll();
      rightLayers.forEach((layer) => {
        rightMapView.map.add(layer, 1);
      });
    }
  };

  // Ganti layer
  const handleLayerChange = async (layerId, isCompare = false) => {
    try {
      setIsLoading(true);
      if (isCompare) {
        setCompareLayerId(layerId);
      } else {
        setSelectedLayerId(layerId);
      }
      if (isCompareMode) {
        updateCompareMaps();
      } else if (isSwipeMode) {
        updateSwipeWidget();
      } else {
        showSingleLayer(layerId);
      }
    } catch (error) {
      console.error("Error changing layer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle swipe
  const toggleSwipeMode = async () => {
    try {
      setIsLoading(true);
      if (isCompareMode) {
        setIsCompareMode(false);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      const newSwipeMode = !isSwipeMode;
      setIsSwipeMode(newSwipeMode);
      if (newSwipeMode) {
        updateSwipeWidget();
      } else {
        if (swipeWidgetRef.current) {
          swipeWidgetRef.current.destroy();
          swipeWidgetRef.current = null;
        }
        showSingleLayer(selectedLayerId);
      }
    } catch (error) {
      console.error("Error toggling swipe mode:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle compare
  const toggleCompareMode = async () => {
    try {
      setIsLoading(true);
      if (isSwipeMode) {
        if (swipeWidgetRef.current) {
          swipeWidgetRef.current.destroy();
          swipeWidgetRef.current = null;
        }
        setIsSwipeMode(false);
      }
      const newCompareMode = !isCompareMode;
      setIsCompareMode(newCompareMode);
    } catch (error) {
      console.error("Error toggling compare mode:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update map ketika layer diubah
  useEffect(() => {
    if (isSwipeMode && !isCompareMode) {
      updateSwipeWidget();
    } else if (isCompareMode) {
      updateCompareMaps();
    }
  }, [selectedLayerId, compareLayerId, isSwipeMode, isCompareMode]);

  // Hilangkan outline berkala (compare)
  useEffect(() => {
    if (!isCompareMode) return;
    const interval = setInterval(() => {
      if (leftMapView && leftMapView.container) {
        leftMapView.container.style.outline = "none";
        leftMapView.container.style.boxShadow = "none";
        const canvasElements = leftMapView.container.querySelectorAll("canvas");
        canvasElements.forEach((canvas) => {
          canvas.style.outline = "none";
          canvas.style.boxShadow = "none";
        });
      }
      if (rightMapView && rightMapView.container) {
        rightMapView.container.style.outline = "none";
        rightMapView.container.style.boxShadow = "none";
        const canvasElements = rightMapView.container.querySelectorAll("canvas");
        canvasElements.forEach((canvas) => {
          canvas.style.outline = "none";
          canvas.style.boxShadow = "none";
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompareMode, leftMapView, rightMapView]);

  // Play Foto Udara
  const playNextLayer = () => {
    if (!isPlaying) return;
    const currentIndex = uniqueLayerEntries.findIndex((entry) => entry.id === selectedLayerId);
    const nextIndex = (currentIndex + 1) % uniqueLayerEntries.length;
    const nextLayerId = uniqueLayerEntries[nextIndex].id;
    handleLayerChange(nextLayerId);
    playerTimeoutRef.current = setTimeout(playNextLayer, TRANSITION_INTERVAL);
  };

  useEffect(() => {
    if (isPlaying) {
      playerTimeoutRef.current = setTimeout(playNextLayer, TRANSITION_INTERVAL);
    } else if (playerTimeoutRef.current) {
      clearTimeout(playerTimeoutRef.current);
    }
    return () => {
      if (playerTimeoutRef.current) {
        clearTimeout(playerTimeoutRef.current);
      }
    };
  }, [isPlaying, selectedLayerId]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Navbar untuk tombol-tombol (Play, Swipe, Compare) */}
      <Box sx={{ display: "flex", justifyContent: "center", left: "50%" }}>
        <Navbar isPlaying={isPlaying} togglePlay={togglePlay} isSwipeMode={isSwipeMode} toggleSwipeMode={toggleSwipeMode} isCompareMode={isCompareMode} toggleCompareMode={toggleCompareMode} />
      </Box>

      {/* Container Map */}
      <Box sx={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
        {!isCompareMode && (
          <Box
            ref={leftMapRef}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        )}

        {isCompareMode && (
          <>
            <Box
              ref={leftMapRef}
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: isMobilePortrait ? "100%" : "50%",
                height: isMobilePortrait ? "50%" : "100%",
                borderRight: isMobilePortrait ? "none" : "3px solid white",
                borderBottom: isMobilePortrait ? "3px solid white" : "none",
              }}
            />
            <Box
              ref={rightMapRef}
              sx={{
                position: "absolute",
                top: isMobilePortrait ? "50%" : 0,
                bottom: 0,
                right: 0,
                width: isMobilePortrait ? "100%" : "50%",
                height: isMobilePortrait ? "50%" : "100%",
              }}
            />
          </>
        )}

        {/* Search bar */}
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="left"
          spacing={2}
          sx={{
            mt: isMobile ? 12 : 15,
            position: "relative",
            zIndex: 1001,
          }}
        >
          <Search view={isCompareMode ? null : leftMapView} views={isCompareMode ? [leftMapView, rightMapView] : null} width={isMobile ? "80px" : "200px"} height="48px" />
        </Stack>

        {/* Pilihan Tahun */}
        {!isLoading && (
          <>
            {isMobilePortrait || isMobileLandscape ? (
              <Box
                sx={{
                  position: "absolute",
                  top: "150px",
                  left: "10px",
                  zIndex: 1001,
                }}
              >
                <YearDropdown layerEntries={uniqueLayerEntries} selectedLayerId={selectedLayerId} onLayerSelect={(id) => handleLayerChange(id)} label="Tahun" />
              </Box>
            ) : (
              <YearList layerEntries={uniqueLayerEntries} selectedLayerId={selectedLayerId} onLayerSelect={(id) => handleLayerChange(id)} side="left" topOffset="150px" sideOffset="30px" />
            )}

            {/* Pilihan Tahun Dalam Fitur Compare/Swipe*/}
            {(isCompareMode || (isSwipeMode && !isCompareMode)) &&
              (isMobilePortrait || isMobileLandscape ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: "150px",
                    right: "10px",
                    zIndex: 1001,
                  }}
                >
                  <YearDropdown layerEntries={uniqueLayerEntries} selectedLayerId={compareLayerId} onLayerSelect={(id) => handleLayerChange(id, true)} label="Tahun" />
                </Box>
              ) : (
                <YearList layerEntries={uniqueLayerEntries} selectedLayerId={compareLayerId} onLayerSelect={(id) => handleLayerChange(id, true)} side="right" topOffset="150px" sideOffset="30px" />
              ))}

            {/* Tombol Metadata */}
            {!isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: "15px",
                  left: "30px",
                  zIndex: 9999,
                }}
              >
                <Tooltip title="Informasi Metadata">
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: "40px",
                      height: "40px",
                      backgroundColor: "white",
                      color: "#003366",
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      border: "2px solid #003366",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                    }}
                    onClick={handleOpenMetadata}
                  >
                    <ArticleIcon />
                  </Button>
                </Tooltip>
              </Box>
            )}
          </>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 9999,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Box sx={{ display: "inline-block", position: "relative", width: 80, height: 80 }}>
                <Box
                  sx={{
                    position: "absolute",
                    border: "4px solid #003366",
                    borderRadius: "50%",
                    borderTop: "4px solid #FF9900",
                    width: 50,
                    height: 50,
                    animation: "spin 1s linear infinite",
                    "@keyframes spin": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    margin: "auto",
                  }}
                />
              </Box>
              <Box sx={{ mt: 2, fontWeight: "bold", color: "#003366" }}>Loading...</Box>
            </Box>
          </Box>
        )}
      </Box>

      {isMetadataOpen && !isMobile && (
        <Box sx={{ position: "absolute", bottom: "30px", left: "180px", width: "360px", backgroundColor: "#fff", borderRadius: 2, boxShadow: "0 2px 5px rgba(0,0,0,0.2)", zIndex: 9999 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#003366", color: "#fff", px: 2, py: 1, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Metadata {selectedMetadata?.namaData?.match(/\d+/) || ""}
            </Typography>
            <IconButton size="small" onClick={handleCloseMetadata} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              p: 2,
              maxHeight: "200px",
              overflowY: "auto",
              "&::-webkit-scrollbar": { width: "8px" },
              "&::-webkit-scrollbar-thumb": { backgroundColor: "#003366", borderRadius: "4px" },
              "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
            }}
          >
            {selectedMetadata ? (
              <>
                <Box sx={{ display: "flex", pr: 1, mb: 1, alignItems: "center" }}>
                  <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Nama Data</Typography>
                  <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                  <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.namaData}</Typography>
                </Box>

                <Box sx={{ display: "flex", pr: 1, mb: 1, alignItems: "center" }}>
                  <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Deskripsi</Typography>
                  <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                  <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.deskripsiData}</Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", pr: 1 }}>
                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Usage</Typography>
                    <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                    <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.usage}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Resolusi</Typography>
                    <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                    <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.resolusi}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Sumber Data</Typography>
                    <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                    <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.sumberData}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Cara Mendapatkan Data</Typography>
                    <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                    <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.caraMendapatkanData}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Referensi Spasial</Typography>
                    <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                    <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.spatialsRepresentation}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Kelengkapan</Typography>
                    <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                    <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.kelengkapan}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Penjelasan</Typography>
                    <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                    <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.penjelasan}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Akurasi Geometris</Typography>
                    <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                    <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.akurasiGeometris}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Akurasi Temporal</Typography>
                    <Typography sx={{ width: "5%", textAlign: "center", alignSelf: "center" }}>:</Typography>
                    <Typography sx={{ width: "65%", textAlign: "justify", whiteSpace: "normal" }}>{selectedMetadata.akurasiTemporal}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                    <Typography sx={{ width: "30%", fontWeight: "bold", color: "#003366", textAlign: "justify" }}>Kegunaan</Typography>
                    <Typography
                      sx={{
                        width: "5%",
                        textAlign: "center",
                        alignSelf: "center",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      sx={{
                        width: "65%",
                        textAlign: "justify",
                        whiteSpace: "normal",
                      }}
                    >
                      {selectedMetadata.kegunaan}
                    </Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <Typography>Tidak ada metadata.</Typography>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default MapComponent;
