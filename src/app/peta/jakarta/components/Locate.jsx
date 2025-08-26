import React, { useState, useEffect } from "react";
import { MyLocation, MyLocationOutlined } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import Point from "@arcgis/core/geometry/Point.js";

const Locate = ({ view, buttonSize, tooltip }) => {
  const [userLayer, setUserLayer] = useState(null);
  const [isWidgetActive, setIsWidgetActive] = useState(true);

  // Koordinat fallback untuk Monas
  const monasCoordinates = { latitude: -6.1754, longitude: 106.8272 };

  // Fungsi untuk membuat grafik marker lokasi (ikon) dengan popup
  const createMarkerGraphic = (coords) => {
    const locationIconSVG = `
    <svg width="256px" height="256px" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0C3.99844 0 0 3.99844 0 9C0 10.7297 0.515625 12.0656 1.41094 13.4203L8.05313 23.4984C8.25469 23.8031 8.60156 24 9 24C9.39844 24 9.75 23.7984 9.94688 23.4984L16.5891 13.4203C17.4844 12.0656 18 10.7297 18 9C18 3.99844 14.0016 0 9 0ZM9 13.9969C6.23906 13.9969 3.99844 11.7563 3.99844 8.99063C3.99844 6.225 6.23906 3.98438 9 3.98438C11.7609 3.98438 14.0016 6.225 14.0016 8.99063C14.0016 11.7563 11.7609 13.9969 9 13.9969Z" fill="#003577"/>
        <circle cx="9" cy="9" r="5" fill="#F7941D"/>
    </svg>
    `;

    const locationIconUrl =
      "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(locationIconSVG);

    return new Graphic({
      geometry: new Point({
        latitude: coords.latitude,
        longitude: coords.longitude,
      }),
      symbol: {
        type: "picture-marker",
        url: locationIconUrl,
        width: "38px",
        height: "38px",
      },
      popupTemplate: {
        title: "Lokasi Anda",
      },
    });
  };

  const addLocationLayer = (graphics) => {
    if (!view || !graphics || graphics.length === 0) return;
    
    if (userLayer) {
      try {
        view.map.remove(userLayer);
      } catch (err) {
        console.error("Error removing user layer:", err);
      }
    }

    // Tunggu semua layer dimuat sebelum menambahkan marker lokasi
    const waitForLayersToLoad = async () => {
      const areAllLayersLoaded = () => {
        if (!view || !view.map || !view.map.allLayers) return false;
        
        let allLoaded = true;
        view.map.allLayers.forEach(layer => {
          if (layer.id !== "locateUserLayer" && layer.loaded === false) {
            allLoaded = false;
          }
        });
        return allLoaded;
      };

      return new Promise((resolve) => {
        const checkLoading = () => {
          if (areAllLayersLoaded()) {
            resolve();
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        
        // Batasi waktu tunggu maksimal 3 detik
        const timeout = setTimeout(() => {
          resolve();
        }, 3000);
        
        checkLoading();
      });
    };

    // Buat layer baru dengan z-index yang sangat tinggi
    const createAndAddLayer = async () => {
      await waitForLayersToLoad();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verifikasi view masih tersedia
      if (!view || !view.map) return;
      
      const newLayer = new GraphicsLayer({
        graphics: graphics,
        title: "Locate User",
        id: "locateUserLayer",
        zIndex: 999, 
      });

      setUserLayer(newLayer);
      
      if (view?.map) {
        try {
          view.map.add(newLayer);
          view.map.reorder(newLayer, view.map.allLayers.length - 1);
          
          // Delay tambahan untuk memastikan layer di atas
          setTimeout(() => {
            if (view && newLayer) {
              try {
                view.map.reorder(newLayer, view.map.allLayers.length - 1);
                try {
                  const markerElements = document.querySelectorAll('div[data-layer-id="locateUserLayer"]');
                  markerElements.forEach(el => {
                    if (el && el.style) {
                      el.style.zIndex = "9999";
                      el.style.position = "relative";
                    }
                    
                    const svgElements = el.querySelectorAll('svg, img, path');
                    svgElements.forEach(svg => {
                      if (svg && svg.style) {
                        svg.style.zIndex = "9999";
                        svg.style.position = "relative";
                      }
                    });
                  });
                } catch (e) {
                  console.error("Error applying CSS override:", e);
                }
              } catch (err) {
                console.error("Error reordering layer:", err);
              }
            }
          }, 1000);
          
          // Fix for goTo error - Check if view is ready and add error handling
          if (view && view.ready && graphics[0] && graphics[0].geometry) {
            try {
              view.goTo(
                {
                  target: graphics[0].geometry,
                  zoom: 16,
                },
                { animate: true }
              ).catch(err => {
                console.error("Error during view.goTo animation:", err);
              });
            } catch (err) {
              console.error("Error calling view.goTo:", err);
            }
          }
        } catch (err) {
          console.error("Error adding layer to map:", err);
        }
      }
    };
    createAndAddLayer();
  };

  // Fallback ke koordinat Monas
  const fallbackToMonas = () => {
    const markerGraphic = createMarkerGraphic(monasCoordinates);
    addLocationLayer([markerGraphic]);
  };

  const getUserLocation = () => {
    if (!("geolocation" in navigator)) {
      console.warn("Geolocation tidak didukung oleh browser ini");
      fallbackToMonas();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (!latitude || !longitude) {
          console.error("Koordinat tidak valid, fallback ke Monas.");
          fallbackToMonas();
          return;
        }

        const coords = { latitude, longitude };
        const markerGraphic = createMarkerGraphic(coords);
        addLocationLayer([markerGraphic]);
      },
      (error) => {
        console.error("Error getting user location:", error);
        fallbackToMonas();
      },
      { timeout: 10000, maximumAge: 0 } // Add timeout to geolocation
    );
  };

  // Meminta izin lokasi dari pengguna
  const requestLocationPermission = async () => {
    if (!view) {
      console.warn("View tidak tersedia, tidak dapat menampilkan lokasi");
      return;
    }
    
    if (!("permissions" in navigator)) {
      getUserLocation();
      return;
    }

    try {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permissionStatus.state === "granted" || permissionStatus.state === "prompt") {
        getUserLocation();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Akses Lokasi Tidak Diaktifkan",
          text: "Silahkan aktifkan izin lokasi di perangkat Anda untuk menggunakan fitur ini. Saat ini sistem akan menampilkan lokasi secara default di titik Monumen Nasional.",
          timer: 10000,
          timerProgressBar: true,
        });
        fallbackToMonas();
      }
    } catch (err) {
      console.error("Error requesting geolocation permission:", err);
      fallbackToMonas();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!view) return;
    
    let isComponentMounted = true;
    
    const initTimer = setTimeout(() => {
      if (isComponentMounted && view) {
        requestLocationPermission();
      }
    }, 1500); 
    
    // Ensure view is ready before setting up handlers
    const setupHandlers = () => {
      if (!view || !view.ready) {
        setTimeout(setupHandlers, 100);
        return;
      }
      
      let layerAddHandler;
      let layerViewCreateHandler;
      
      try {
        layerAddHandler = view.map?.allLayers?.on("change", () => {
          if (userLayer && isComponentMounted) {
            setTimeout(() => {
              if (view && userLayer && isComponentMounted) {
                try {
                  view.map.reorder(userLayer, view.map.allLayers.length - 1);
                } catch (err) {
                  console.error("Error reordering layer:", err);
                }
              }
            }, 300);
          }
        });
        
        layerViewCreateHandler = view.on("layerview-create", (event) => {
          setTimeout(() => {
            if (userLayer && isComponentMounted) {
              try {
                view.map.reorder(userLayer, view.map.allLayers.length - 1);
              } catch (err) {
                console.error("Error reordering layer:", err);
              }
            }
          }, 300);
        });
      } catch (err) {
        console.error("Error setting up view event handlers:", err);
      }
      
      return { layerAddHandler, layerViewCreateHandler };
    };
    
    const handlers = setupHandlers();
    
    return () => {
      isComponentMounted = false;
      clearTimeout(initTimer);
      
      if (handlers?.layerAddHandler) {
        try {
          handlers.layerAddHandler.remove();
        } catch (err) {
          console.error("Error removing layer add handler:", err);
        }
      }
      
      if (handlers?.layerViewCreateHandler) {
        try {
          handlers.layerViewCreateHandler.remove();
        } catch (err) {
          console.error("Error removing layerview create handler:", err);
        }
      }
      
      if (userLayer && view && view.map) {
        try {
          view.map.remove(userLayer);
        } catch (err) {
          console.error("Error removing user layer on cleanup:", err);
        }
      }
    };
  }, [view]);

  const handleButtonAdd = () => {
    setIsWidgetActive(true);
    setTimeout(() => {
      requestLocationPermission();
    }, 800);
  };

  const handleButtonRemoved = () => {
    if (userLayer && view && view.map) {
      try {
        view.map.remove(userLayer);
      } catch (err) {
        console.error("Error removing user layer:", err);
      }
    }
    setIsWidgetActive(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        backgroundColor: "white",
        rowGap: 2,
        maxWidth: "48px",
      }}
    >
      {isWidgetActive ? (
        <Tooltip title="Matikan Lokasi" placement={tooltip}>
          <IconButton
            sx={{
              height: buttonSize,
              width: buttonSize,
              padding: 0,
              backgroundColor: "#e4e4e4",
            }}
            onClick={handleButtonRemoved}
          >
            <MyLocationOutlined />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Aktifkan Lokasi" placement={tooltip}>
          <IconButton
            sx={{
              height: buttonSize,
              width: buttonSize,
              padding: 0,
              backgroundColor: "white",
            }}
            onClick={handleButtonAdd}
          >
            <MyLocation />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default Locate;