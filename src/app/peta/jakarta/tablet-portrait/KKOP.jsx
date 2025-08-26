import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Paper,
  Tooltip,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Calculate,
  Close,
  LocationOn,
  Visibility,
  VisibilityOff,
  Refresh,
} from "@mui/icons-material";

import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";

const KKOP = ({ 
  view, 
  buttonSize = "40px", 
  tooltip = "left",
  position = { top: "150px", right: "90px" }, 
  containerRef = null 
}) => {
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [buildingHeight, setBuildingHeight] = useState("");
  const [pointData, setPointData] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [layerLoading, setLayerLoading] = useState(false); 
  
  const sketchVMRef = useRef(null);
  const drawLayerRef = useRef(null);
  const featureLayerRef = useRef(null);
  const drawnPointRef = useRef(null);
  const [layerVisible, setLayerVisible] = useState(true);
  const clickHandlerRef = useRef(null); 
  
  const contentContainerRef = useRef(null);

  const cleanup = useCallback(() => {
    if (view) {
      if (clickHandlerRef.current) {
        clickHandlerRef.current.remove();
        clickHandlerRef.current = null;
      }
      
      if (drawLayerRef.current) {
        view.map.remove(drawLayerRef.current);
        drawLayerRef.current = null;
      }
      if (featureLayerRef.current) {
        view.map.remove(featureLayerRef.current);
        featureLayerRef.current = null;
      }
    }
    
    if (sketchVMRef.current) {
      sketchVMRef.current.destroy();
      sketchVMRef.current = null;
    }
    
    drawnPointRef.current = null;
    setPointData(null);
    setResult("");
    setError("");
    setIsDrawing(false);
    setBuildingHeight("");
    setLayerVisible(true);
    setLayerLoading(false);
  }, [view]);

  const handleSketchCreate = useCallback(async (event) => {
    if (event.state === "complete") {
      setIsDrawing(false);
      setError("");
      
      try {
        if (drawnPointRef.current && drawLayerRef.current) {
          drawLayerRef.current.remove(drawnPointRef.current);
        }

        const pointSymbol = {
          type: "simple-marker",
          color: [255, 0, 0],
          size: "12px",
          outline: {
            color: [255, 255, 255],
            width: 2
          }
        };

        const newPoint = new Graphic({
          geometry: event.graphic.geometry,
          symbol: pointSymbol
        });
        
        if (drawLayerRef.current) {
          drawLayerRef.current.add(newPoint);
          drawnPointRef.current = newPoint;
        }

        const lat = event.graphic.geometry.latitude;
        const lon = event.graphic.geometry.longitude;

        setLoading(true);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        try {
          const response = await fetch(
            `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`,
            { 
              signal: controller.signal,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }
          );
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (!data.results || data.results.length === 0) {
            throw new Error('No elevation data found');
          }
          
          const elevation = data.results[0].elevation;
          
          setPointData({
            latitude: parseFloat(lat.toFixed(6)),
            longitude: parseFloat(lon.toFixed(6)),
            elevation: elevation,
            geometry: event.graphic.geometry
          });
          
        } catch (fetchError) {
          clearTimeout(timeoutId);
          if (fetchError.name === 'AbortError') {
            throw new Error('Request timeout - silakan coba lagi');
          } else {
            throw new Error('Gagal mengambil data elevasi: ' + fetchError.message);
          }
        }
        
      } catch (error) {
        console.error("Error in handleSketchCreate:", error);
        setError(error.message || "Gagal mengambil data lokasi");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  // Add function to handle view clicks and prevent popup
  const handleViewClick = useCallback((event) => {
    // Check if click is on KKOP layer
    view.hitTest(event).then((response) => {
      const kKOPHit = response.results.find(result => 
        result.graphic && result.graphic.layer === featureLayerRef.current
      );
    
      if (kKOPHit) {
        event.stopPropagation();
        if (view.popup) {
          view.popup.close();
        }
      }
    });
  }, [view]);

  useEffect(() => {
    if (widgetOpen && view && !sketchVMRef.current) {
      try {
        setLayerLoading(true); 
        
        const graphicsLayer = new GraphicsLayer({
          title: "KKOP Drawing Layer",
          listMode: "hide"
        });
        
        view.map.add(graphicsLayer);
        drawLayerRef.current = graphicsLayer;

        const sketch = new SketchViewModel({
          view: view,
          layer: graphicsLayer,
          pointSymbol: {
            type: "simple-marker",
            color: [255, 0, 0],
            size: "12px",
            outline: {
              color: [255, 255, 255],
              width: 2
            }
          },
          defaultCreateOptions: {
            hasZ: false,
            defaultZ: 0
          }
        });
        
        sketchVMRef.current = sketch;

        // Create KKOP layer with multiple popup prevention methods
        const kKOPLayer = new FeatureLayer({
          url: "https://jakartasatu.jakarta.go.id/server/rest/services/Kawasan_Keselamatan_Operasi_Penerbangan/MapServer/0",
          outFields: ["*"],
          visible: true,
          title: "KKOP Layer",
          // Multiple ways to disable popup
          popupEnabled: false,
          popupTemplate: null,
          // Additional popup prevention
          autoPopupEnabled: false
        });
        
        // Add click handler to prevent popup
        clickHandlerRef.current = view.on("click", handleViewClick);
        
        // Alternative method: disable popup at layer level after loading
        kKOPLayer.when(() => {
          console.log("KKOP Layer loaded successfully");
          
          // Force disable popup after layer loads
          kKOPLayer.popupEnabled = false;
          kKOPLayer.popupTemplate = null;
          
          // If view has popup widget, configure it to ignore this layer
          if (view.popup) {
            // Store original popup configuration
            const originalPopupEnabled = view.popup.autoOpenEnabled;
            
            // Override popup's hit test to exclude KKOP layer
            const originalHitTest = view.hitTest.bind(view);
            view.hitTest = function(screenPoint, options) {
              return originalHitTest(screenPoint, options).then((response) => {
                // Filter out KKOP layer results
                if (response && response.results) {
                  response.results = response.results.filter(result => 
                    !(result.graphic && result.graphic.layer === kKOPLayer)
                  );
                }
                return response;
              });
            };
          }
          
          setLayerVisible(kKOPLayer.visible);
          setLayerLoading(false);
        }).catch((error) => {
          console.error("Failed to load KKOP layer:", error);
          setError("Gagal memuat layer KKOP");
          setLayerLoading(false); 
        });
        
        view.map.add(kKOPLayer);
        featureLayerRef.current = kKOPLayer;

        sketch.on("create", handleSketchCreate);
        
      } catch (error) {
        console.error("Error initializing widget:", error);
        setError("Gagal menginisialisasi widget");
        setLayerLoading(false);
      }
    }

    if (!widgetOpen) {
      cleanup();
    }

    return () => {
      if (!widgetOpen) {
        cleanup();
      }
    };
  }, [widgetOpen, view, handleSketchCreate, cleanup, handleViewClick]);

  const handleDrawPoint = useCallback(() => {
    if (sketchVMRef.current && !isDrawing && !loading) {
      setIsDrawing(true);
      setResult("");
      setError("");
      
      try {
        sketchVMRef.current.create("point");
      } catch (error) {
        console.error("Error starting point creation:", error);
        setError("Gagal memulai mode gambar");
        setIsDrawing(false);
      }
    }
  }, [isDrawing, loading]);

  const handleCalculate = useCallback(async () => {
    if (!pointData || !buildingHeight || isNaN(parseFloat(buildingHeight))) {
      setError("Mohon gambar titik dan masukkan tinggi bangunan yang valid");
      return;
    }

    if (!featureLayerRef.current) {
      setError("Layer KKOP tidak tersedia");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult("");
      
      const queryPromise = featureLayerRef.current.queryFeatures({
        geometry: pointData.geometry,
        spatialRelationship: "intersects",
        returnGeometry: true,
        outFields: ["*"],
        maxRecordCount: 10
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timeout')), 15000)
      );

      const queryResult = await Promise.race([queryPromise, timeoutPromise]);

      if (!queryResult.features || queryResult.features.length === 0) {
        setResult("❌ Tidak ada polygon KKOP yang berintersect dengan titik ini");
        setTimeout(() => {
          if (contentContainerRef.current) {
            contentContainerRef.current.scrollTop = contentContainerRef.current.scrollHeight;
          }
        }, 100);
        return;
      }

      const polygon = queryResult.features[0];
      const attributes = polygon.attributes;
      
      const elevasi = attributes.ELEVASI_1 || attributes.ELEVASI || attributes.elevasi || 0;
      const elevasiMSL = attributes.ELEVASIMSL_1 || attributes.ELEVASIMSL || attributes.elevasi_msl || 0;

      const height = parseFloat(buildingHeight);
      const refMSL = elevasi - elevasiMSL;
      const heightGround = pointData.elevation - refMSL;
      const heightBuildingAES = height + heightGround;

      let status = "";
      let severity = "info";
      
      if (elevasi === 0) {
        status = "❌ Tidak diperbolehkan ada bangunan kecuali peralatan navigasi penerbangan";
        severity = "error";
      } else {
        if (heightBuildingAES <= elevasi) {
          status = "✅ Di bawah batas ketinggian KKOP";
          severity = "success";
        } else {
          status = "⚠️ Melebihi batas ketinggian KKOP";
          severity = "warning";
        }
      }

      const resultText = `Hasil Perhitungan KKOP:
       Ketinggian Bangunan AES: ${heightBuildingAES.toFixed(2)} m
       Batas KKOP: ${elevasi} m
       Status: ${status}
    
       ${severity === 'warning' ? 'Selisih: ' + (heightBuildingAES - elevasi).toFixed(2) + ' m (melebihi batas)' : ''}`;

      setResult(resultText);
      setTimeout(() => {
        if (contentContainerRef.current) {
          contentContainerRef.current.scrollTop = contentContainerRef.current.scrollHeight;
        }
      }, 100);
      
    } catch (error) {
      console.error("Calculation error:", error);
      setError("Error dalam perhitungan: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [pointData, buildingHeight]);

  const handleClose = useCallback(() => {
    setWidgetOpen(false);
  }, []);

  const handleReset = useCallback(() => {
    setPointData(null);
    setResult("");
    setError("");
    setBuildingHeight("");
    setIsDrawing(false);
    
    // Clear graphics
    if (drawLayerRef.current) {
      drawLayerRef.current.removeAll();
    }
    drawnPointRef.current = null;
    
    // Scroll back to top after reset
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0;
    }
  }, []);

  const getWidgetPosition = () => {
    if (containerRef && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      return {
        position: "fixed", 
        top: `${containerRect.top + 5}px`,
        right: `${window.innerWidth - containerRect.right + 5}px`,
        zIndex: 1000
      };
    }
    
    return {
      position: "absolute",
      ...position,
      zIndex: 1000
    };
  };

 return (
    <>
      <Tooltip title="Perhitungan KKOP" placement={tooltip}>
        <Box
          sx={{
            width: buttonSize,
            height: buttonSize,
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "1px solid #e9ecef",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 4px 12px rgba(0, 53, 119, 0.15)",
            "&:hover": { 
              background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px rgba(0, 53, 119, 0.25)",
            },
            "&:active": {
              transform: "translateY(0px)",
            }
          }}
          onClick={() => setWidgetOpen(!widgetOpen)}
        >
          <Calculate sx={{ 
            color: "grey", 
            fontSize: "24px",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
          }} />
        </Box>
      </Tooltip>

      {widgetOpen && (
        <Paper
          sx={{
            ...getWidgetPosition(),
            width: "300px",
            height: "300px",
            bgcolor: "white",
            borderRadius: 4,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(0, 53, 119, 0.1)",
            boxShadow: "0 20px 40px rgba(0, 53, 119, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1.5,
              background: "linear-gradient(135deg, #003577 0%, #004088 50%, #0056b3 100%)",
              color: "white",
              flexShrink: 0,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }
            }}
          >
            <Typography variant="h6" sx={{ 
              fontSize: "14px", 
              fontWeight: "600",
              letterSpacing: "0.5px",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
            }}>
              Perhitungan KKOP
            </Typography>
            <Box sx={{ 
              display: "flex", 
              gap: 0.5,
              position: "absolute",
              right: 1
            }}>
              <IconButton 
                onClick={handleReset} 
                sx={{ 
                  color: "white", 
                  p: 1,
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": { 
                    backgroundColor: "rgba(255,255,255,0.15)",
                    transform: "scale(1.05)"
                  }
                }}
                size="small"
                title="Reset"
              >
                <Refresh fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={handleClose} 
                sx={{ 
                  color: "white", 
                  p: 1,
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": { 
                    backgroundColor: "rgba(255,255,255,0.15)",
                    transform: "scale(1.05)"
                  }
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>

          {/* Layer Loading Indicator - Enhanced design */}
          {layerLoading && (
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center", 
                justifyContent: "center",
                p: 3,
                gap: 2,
                background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                borderBottom: "1px solid rgba(0, 53, 119, 0.1)"
              }}
            >
              <CircularProgress 
                size={32} 
                sx={{ 
                  color: "#003577",
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  }
                }} 
              />
              <Typography variant="body2" sx={{ 
                color: "#6c757d",
                fontWeight: "500",
                textAlign: "center"
              }}>
                Memuat layer KKOP...
              </Typography>
            </Box>
          )}

          {/* Content - Enhanced scrollbar and spacing */}
          <Box 
            ref={contentContainerRef}
            sx={{ 
              p: 2.5, 
              display: "flex", 
              flexDirection: "column", 
              gap: 3, 
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              // Enhanced scrollbar
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "rgba(0, 53, 119, 0.05)",
                borderRadius: "4px",
                margin: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "linear-gradient(180deg, #003577 0%, #004088 100%)",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": {
                  background: "linear-gradient(180deg, #004088 0%, #0056b3 100%)",
                },
              },
              scrollbarWidth: "thin",
              scrollbarColor: "#003577 rgba(0, 53, 119, 0.05)",
            }}
          >
            
            {/* Error Display - Enhanced alert */}
            {error && (
              <Alert 
                severity="error" 
                onClose={() => setError("")}
                sx={{
                  borderRadius: 2,
                  border: "1px solid rgba(211, 47, 47, 0.2)",
                  "& .MuiAlert-icon": {
                    color: "#d32f2f"
                  }
                }}
              >
                {error}
              </Alert>
            )}

            {/* Draw Point Section - Enhanced card design */}
            <Box sx={{
              p: 2,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
              border: "1px solid rgba(0, 53, 119, 0.1)",
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0, 53, 119, 0.1)",
              }
            }}>
              <Typography variant="subtitle2" sx={{ 
                mb: 2, 
                fontWeight: "600",
                color: "#003577",
                display: "flex",
                alignItems: "center",
                gap: 1
              }}>
                <Box sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #003577 0%, #004088 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}>
                  1
                </Box>
                Gambar Titik Lokasi
              </Typography>
              <Button
                variant="contained"
                onClick={handleDrawPoint}
                disabled={isDrawing || loading || layerLoading}
                startIcon={isDrawing ? <CircularProgress size={16} color="inherit" /> : <LocationOn />}
                sx={{
                  background: isDrawing ? "#6c757d" : "linear-gradient(135deg, #003577 0%, #004088 100%)",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "600",
                  py: 1.2,
                  boxShadow: "0 4px 12px rgba(0, 53, 119, 0.3)",
                  transition: "all 0.3s",
                  "&:hover": { 
                    background: "linear-gradient(135deg, #004088 0%, #0056b3 100%)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 16px rgba(0, 53, 119, 0.4)",
                  },
                  "&:disabled": { 
                    background: "#e9ecef",
                    color: "#6c757d",
                    boxShadow: "none"
                  },
                  width: "100%",
                }}
              >
                {isDrawing ? "Klik pada peta..." : "Pilih Lokasi"}
              </Button>
            </Box>

          {/* Point Information - Enhanced info card */}
           {pointData && (
            <Box sx={{ 
              p: 2.5, 
              background: "linear-gradient(135deg, #e3f2fd 0%, #f0f8ff 100%)",
              borderRadius: 3, 
              border: "1px solid rgba(3, 169, 244, 0.2)",
              position: "relative",
              fontFamily: "monospace",
              lineHeight: 1.6,
              color: "#003577",
              fontSize: "0.875rem",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #003577, #004088, #0056b3)",
                borderRadius: "3px 3px 0 0",
              }
            }}>
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1, 
                mb: 1,
                fontWeight: "600"
              }}>
                📍 Koordinat:
              </Box>
              <Box sx={{ pl: 2, mb: 1 }}>
                Lat: <strong>{pointData.latitude}</strong><br />
                Lon: <strong>{pointData.longitude}</strong>
              </Box>
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1,
                fontWeight: "600"
              }}>
                📏 Elevasi: <strong>{pointData.elevation} m</strong>
              </Box>
            </Box>
          )}

            {/* Building Height Input - Enhanced input design */}
            <Box sx={{
              p: 2,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
              border: "1px solid rgba(0, 53, 119, 0.1)",
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0, 53, 119, 0.1)",
              }
            }}>
              <Typography variant="subtitle2" sx={{ 
                mb: 2, 
                fontWeight: "600",
                color: "#003577",
                display: "flex",
                alignItems: "center",
                gap: 1
              }}>
                <Box sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #003577 0%, #004088 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}>
                  2
                </Box>
                Masukan Tinggi Bangunan
              </Typography>
              <TextField
                fullWidth
                type="number"
                label="Tinggi Bangunan (meter)"
                value={buildingHeight}
                onChange={(e) => setBuildingHeight(e.target.value)}
                disabled={loading || layerLoading}
                size="small"
                inputProps={{ min: 0, step: 0.1 }}
                helperText="Masukkan tinggi bangunan dalam meter"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.2s",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#003577",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#003577",
                      borderWidth: "2px",
                    }
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#003577",
                  }
                }}
              />
            </Box>

            {/* Calculate Button - Enhanced design */}
            <Button
              variant="contained"
              onClick={handleCalculate}
              disabled={!pointData || !buildingHeight || loading || isDrawing || layerLoading}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Calculate />}
              sx={{
                background: loading ? "#6c757d" : "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "600",
                py: 1.5,
                fontSize: "16px",
                boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
                transition: "all 0.3s",
                "&:hover": { 
                  background: "linear-gradient(135deg, #218838 0%, #1e7e34 100%)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 16px rgba(40, 167, 69, 0.4)",
                },
                "&:disabled": { 
                  background: "#e9ecef",
                  color: "#6c757d",
                  boxShadow: "none"
                },
              }}
            >
              {loading ? "Menghitung..." : "Hitung KKOP"}
            </Button>

            {/* Results - Enhanced alert design */}
            {result && (
              <Alert 
                severity={
                  result.includes("Melebihi") ? "warning" : 
                  result.includes("Di bawah") ? "success" : 
                  result.includes("Tidak diperbolehkan") ? "error" : "info"
                }
                sx={{ 
                  borderRadius: 3,
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  whiteSpace: "pre-line",
                  "& .MuiAlert-message": {
                    fontFamily: "monospace",
                    fontSize: "12px",
                    lineHeight: 1.5
                  },
                  "& .MuiAlert-icon": {
                    fontSize: "20px"
                  }
                }}
              >
                {result}
              </Alert>
            )}

            {/* Loading Indicator - Enhanced spinner */}
            {loading && (
              <Box sx={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                p: 3,
                gap: 2
              }}>
                <CircularProgress 
                  size={28} 
                  sx={{ 
                    color: "#003577",
                    "& .MuiCircularProgress-circle": {
                      strokeLinecap: "round",
                    }
                  }} 
                />
                <Typography variant="body2" sx={{ 
                  color: "#6c757d",
                  fontWeight: "500"
                }}>
                  Memproses...
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      )}
    </>
  );
};

export default KKOP;