import { ExpandLess, Layers, MoreHoriz } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LayerDetail from "./LayerDetail";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";

// Variable global untuk melacak status layer default
const defaultLayersStatus = {
  isDefaultLayersAdded: false
};

const LayerList = ({
  view,
  layerList,
  setLayerList,
  addedLayers,
  setAddedLayers,
  infoLayerOpen,
  setInfoLayerOpen,
  setTableOpen,
  modalStyle,
  setTableLayer,
  setSelectedLayer,
  setQueryOpen,
  bahasa,
  setOpenPopup,
  setPopUpCoordinate,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [highlightGraphicsLayer, setHighlightGraphicsLayer] = useState(null);

  const DEFAULT_LAYER_NAMES = [
    "Batas Administrasi Rukun Tetangga (RT)",
    "Batas Administrasi Rukun Warga (RW)",
    "Batas Administrasi Kelurahan",
    "Batas Administrasi Kecamatan",
    "Batas Administrasi Kabupaten/Kota",
  ];

  const addDefaultLayers = async () => {
    // Check global status variable instead of useRef
    if (!view || !view.map || defaultLayersStatus.isDefaultLayersAdded) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://jakartasatu.jakarta.go.id/apimobile/internal/backend/katalog-data/public2"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch layer catalog data");
      }

      const data = await response.json();
      const newAddedLayers = [...addedLayers];

      // Memproses default layer
      for (const defaultLayerName of DEFAULT_LAYER_NAMES) {
        const existingLayer = addedLayers.find(
          (layer) => layer.title === defaultLayerName
        );
        if (existingLayer) {
          continue;
        }
        let defaultLayer = null;
        for (const group of data.maps) {
          const found = group.layers.find(
            (layer) => layer.nama_alias === defaultLayerName
          );
          if (found) {
            defaultLayer = found;
            break;
          }
        }

        if (!defaultLayer) {
          console.warn(
            `Default layer "${defaultLayerName}" not found in catalog`
          );
          continue;
        }

        let selectedLayer = addLayer(defaultLayer);
        if (selectedLayer) {
          newAddedLayers.push(selectedLayer);
        }
      }

      if (newAddedLayers.length > addedLayers.length) {
        setAddedLayers(newAddedLayers);
      }
      
      // Set global flag to true to prevent adding default layers again
      defaultLayersStatus.isDefaultLayersAdded = true;
    } catch (error) {
      console.error("Error adding default layers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addLayer = (layer) => {
      const isLayerAdded = addedLayers.some(
        (addedLayer) => addedLayer.id === layer.id_data
      );
      if (isLayerAdded) {
        return;
      }
  
      let selectedLayer;
      if (layer.url_data && layer.url_data.includes("MapServer")) {
        const urlArray = layer.url_data.split("/");
        const idLayer = parseInt(urlArray[urlArray.length - 1]);
        if (isNaN(idLayer)) {
          console.error(
            "ID sublayer tidak valid, periksa format URL MapServer:",
            layer.url_data
          );
          if (
            layer.url_data_feature &&
            layer.url_data_feature.includes("FeatureServer")
          ) {
            selectedLayer = new FeatureLayer({
              url: layer.url_data_feature,
              id: layer.id_data,
              title: layer.nama_alias,
              opacity: 0.5,
              listMode: "show",
            });
          } else {
            return;
          }
        } else {
          const parentUrl = urlArray.slice(0, -1).join("/");
  
          selectedLayer = new MapImageLayer({
            url: parentUrl,
            id: layer.id_data,
            title: layer.nama_alias,
            opacity: 0.5,
            listMode: "show",
            sublayers: [
              {
                id: idLayer,
              },
            ],
          });
          selectedLayer.when(() => {
            const clickHandlerId = `click.${layer.id_data}`;
            view.on(clickHandlerId, null);
  
            view.on("click", (event) => {
              if (selectedLayer.visible) {
                setPopUpCoordinate(event.mapPoint);
                setOpenPopup(true);
  
                if (highlightGraphicsLayer) {
                  highlightGraphicsLayer.removeAll();
                }
  
                fetchGeometryAndAttributes(selectedLayer, event.mapPoint).then(
                  (result) => {
                    if (result && result.geometry) {
                      displayGeometry(result.geometry);
                    }
                  }
                );
              }
            });
          });
        }
      } else if (
        layer.url_data_feature &&
        layer.url_data_feature.includes("FeatureServer")
      ) {
        selectedLayer = new FeatureLayer({
          url: layer.url_data_feature,
          id: layer.id_data,
          title: layer.nama_alias,
          opacity: 0.5,
          listMode: "show",
        });
  
        view.on("click", (event) => {
          if (selectedLayer.visible) {
            view.hitTest(event).then((response) => {
              const featureHit = response.results.find(
                (result) =>
                  result.graphic &&
                  result.graphic.layer &&
                  result.graphic.layer.id === layer.id_data
              );
  
              if (featureHit) {
                if (highlightGraphicsLayer) {
                  highlightGraphicsLayer.removeAll();
                }
  
                const geometry = featureHit.graphic.geometry;
                if (geometry) {
                  displayGeometry(geometry);
                }
              }
            });
          }
        });
      } else {
        selectedLayer = new FeatureLayer({
          url: layer.url_data_feature || layer.url_data,
          id: layer.id_data,
          title: layer.nama_alias,
          opacity: 0.5,
          listMode: "show",
        });
      }
  
      const infoItem = {
        nama_data: layer.nama_data,
        nama_kugi: layer.nama_kugi,
        deskripsi_data: layer.deskripsi_data,
        simpul_jaringan: layer.simpul_jaringan,
      };
      selectedLayer.customDescription = infoItem;
      view.map.add(selectedLayer);
      setAddedLayers((prevLayers) => [...prevLayers, selectedLayer]);
    };
    
  // Load default layers only once
  useEffect(() => {
    if (view && view.map) {
      // Check if default layers already exist in the map
      const defaultLayerExists = DEFAULT_LAYER_NAMES.some(name => {
        return view.map.layers.some(layer => layer.title === name);
      });
      
      if (defaultLayerExists) {
        // If at least one default layer exists, mark as already added
        defaultLayersStatus.isDefaultLayersAdded = true;
        setIsLoading(false);
      } else {
        // Otherwise proceed with adding default layers
        addDefaultLayers();
      }
    }
  }, [view?.map]);

  useEffect(() => {
    if (
      view?.map?.layers?.items?.filter(
        (layer) => layer.listMode === "show" && layer.title !== "Locate User"
      ).length > 0
    ) {
      setLayerList((prevState) => {
        return view.map.layers.items
          .filter(
            (layer) =>
              layer.listMode === "show" && layer.title !== "Locate User"
          )
          .map((layer) => {
            const prevLayer = prevState.find(
              (prev) => prev.layer.id === layer.id
            );
            const newexpand = prevLayer ? prevLayer.expand : false;
            const newLayer = prevLayer ? prevLayer.layer : layer;
            return {
              ...prevLayer,
              layer: newLayer,
              expand: newexpand,
            };
          });
      });
    }
  }, [view?.map?.layers?.items?.length, addedLayers.length]);

  const displayGeometry = (geometry) => {
    if (!geometry || !highlightGraphicsLayer) return;
    highlightGraphicsLayer.removeAll();
    
    let symbol;
    
    if (geometry.type === "point" || geometry.constructor.name === "Point") {
      // Point symbol
      symbol = {
        type: "simple-marker",
        color: [255, 0, 0],
        size: 12,
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      };
    } else if (geometry.type === "polyline" || geometry.paths || geometry.constructor.name === "Polyline") {
      // Line symbol
      symbol = {
        type: "simple-line",
        color: [255, 0, 0],
        width: 3
      };
    } else {
      // Default polygon symbol
      symbol = {
        type: "simple-fill",
        color: [255, 0, 0, 0.5], 
        outline: {
          color: [255, 0, 0],
          width: 2
        }
      };
    }
    
    const graphic = new Graphic({
      geometry: geometry,
      symbol: symbol
    });
    
    highlightGraphicsLayer.add(graphic);
  };

  const fetchGeometryAndAttributes = async (layer, mapPoint) => {
    const url = `${layer.url}/identify`;
    const params = new URLSearchParams({
      geometry: JSON.stringify({
        x: mapPoint.x,
        y: mapPoint.y,
        spatialReference: { wkid: 102100 },
      }),
      geometryType: "esriGeometryPoint",
      sr: "102100",
      tolerance: "5",
      mapExtent: JSON.stringify(view.extent.toJSON()),
      imageDisplay: `${view.width},${view.height},96`,
      f: "json",
      returnGeometry: "true", 
      layers: "all",
    });

    try {
      const response = await fetch(`${url}?${params.toString()}`);
      const identifyResponse = await response.json();

      if (identifyResponse.results && identifyResponse.results.length > 0) {
        const result = identifyResponse.results[0];
        const attributes = result.attributes;
        
        // Parse geometri dari respons
        let geometry;
        if (result.geometry && result.geometry.rings) {
          // Jika geometri adalah polygon
          geometry = new Polygon({
            rings: result.geometry.rings,
            spatialReference: view.spatialReference
          });
        } else if (result.geometry && result.geometry.paths) {
          // Jika geometri adalah polyline
          geometry = new Polyline({
            paths: result.geometry.paths,
            spatialReference: view.spatialReference
          });
        } else if (result.geometry && result.geometry.x && result.geometry.y) {
          // Jika geometri adalah point
          geometry = new Point({
            x: result.geometry.x,
            y: result.geometry.y,
            spatialReference: view.spatialReference
          });
        }
        
        return { attributes, geometry };
      } else {
        console.log("No features found at the clicked location.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching geometry:", error);
      return null;
    }
  };

  useEffect(() => {
    if (view) {
      const existingHighlightLayer = view.map.findLayerById("highlightLayer");
      if (!existingHighlightLayer) {
        const graphicsLayer = new GraphicsLayer({
          id: "highlightLayer",
          listMode: "hide" 
        });
        
        view.map.add(graphicsLayer);
        setHighlightGraphicsLayer(graphicsLayer);
      } else {
        setHighlightGraphicsLayer(existingHighlightLayer);
      }
    }
  }, [view]);

  const handleCollapse = (index) => {
    setLayerList((prevState) => {
      const updatedState = [...prevState];
      updatedState[index].expand = !updatedState[index].expand;
      return updatedState;
    });
  };

  const handleToggleVisibile = (list, index) => {
    return () => {
      list.layer.visible = !list.layer.visible;
      setLayerList((prevState) => {
        const updatedState = [...prevState];
        updatedState[index].visible = list.layer.visible;
        return updatedState;
      });
    };
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <List
        sx={{
          height: "auto",
          width: "100%",
          overflowY: "scroll",
          background: "white", 
          borderRadius: "0 0 8px 8px",
          "::-webkit-scrollbar": {
            width: "8px",
          },
          "::-webkit-scrollbar-track": {
            borderRadius: "4px",
            border: "1px solid #DFE6E9",
            margin: "10px",
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
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Box className="loader"></Box>
          </Box>
        ) : view?.map?.layers?.items?.filter(
            (layer) =>
              layer.listMode === "show" && layer.title !== "Locate User"
          )?.length > 0 ? (
          view?.map?.layers?.items
            ?.filter(
              (layer) =>
                layer.listMode === "show" && layer.title !== "Locate User"
            )
            ?.map((layer, index) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  padding: "0 0 0 12px",
                }}
                key={index}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={!!layerList[index]?.layer?.visible ?? false}
                    onChange={handleToggleVisibile(layerList[index], index)}
                    id={`checkbox-layer-${layerList[index]?.layer?.id}`}
                    icon={
                      <Box
                        sx={{
                          width: 19,
                          height: 19,
                          border: "2px solid #003577",
                          borderRadius: "6px",
                        }}
                      />
                    }
                    checkedIcon={
                      <Box
                        sx={{
                          width: 19,
                          height: 19,
                          backgroundColor: "#003577",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CheckIcon sx={{ color: "white", fontSize: 16 }} />
                      </Box>
                    }
                    sx={{ padding: "0px" }}
                  />
                  <ListItemButton
                    onClick={() => handleCollapse(index)}
                    id={`colapse-layer-button-${layerList[index]?.layer?.id}`}
                    sx={{ flexGrow: 1 }}
                  >
                    <ListItemText
                      primary={layer.title}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: "500",
                        paddingRight: "12px",
                      }}
                    />
                    {layerList[index]?.expand ? <ExpandLess /> : <MoreHoriz />}
                  </ListItemButton>
                </Box>
                <Collapse in={layerList[index]?.expand}>
                  <Box sx={{ display: "grid", width: "100%" }}>
                    <LayerDetail
                      view={view}
                      addedLayers={addedLayers}
                      infoLayerOpen={infoLayerOpen}
                      layer={layer}
                      modalStyle={modalStyle}
                      setAddedLayers={setAddedLayers}
                      setInfoLayerOpen={setInfoLayerOpen}
                      setTableOpen={setTableOpen}
                      setTableLayer={setTableLayer}
                      setSelectedLayer={setSelectedLayer}
                      setQueryOpen={setQueryOpen}
                    />
                  </Box>
                </Collapse>
              </Box>
            ))
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            {bahasa === "ID" ? (
              <Box>
                <Typography>Tambahkan Layer Data dengan Tombol</Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography
                    sx={{
                      textWrap: "nowrap",
                      color: "#F7941D",
                      fontWeight: "700",
                      fontSize: "16px",
                    }}
                  >
                    Katalog Layer
                  </Typography>
                  <Layers sx={{ color: "grey" }} />
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography>Add the Layer by using</Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography sx={{ textWrap: "nowrap" }}>
                    Layer Catalogue
                  </Typography>
                  <Layers sx={{ color: "grey" }} />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </List>
    </Box>
  );
};

export default LayerList;