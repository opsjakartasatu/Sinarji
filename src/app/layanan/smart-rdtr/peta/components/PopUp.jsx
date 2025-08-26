import { Close } from "@mui/icons-material";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import { Box, IconButton, Typography, Pagination } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Polygon from "@arcgis/core/geometry/Polygon.js";

const PopUp = ({ view, setOpenPopup, popUpCoordinate }) => {
  const [popUpContents, setPopupContents] = useState([]);
  const [clickedGeometries, setClickedGeometries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const highlightLayerRef = useRef(new GraphicsLayer());

  useEffect(() => {
    const highlightLayer = highlightLayerRef.current;
    if (!view.map.layers.includes(highlightLayer)) {
      view.map.add(highlightLayer);
    }

    return () => {
      view.map.remove(highlightLayer);
    };
  }, [view]);

  useEffect(() => {
    const fetchLayerAttributes = async () => {
      if (!popUpCoordinate || !view) return;

      let allResults = [];
      let allGeometries = [];

      const visibleUpperLayers = view.map.layers.items.filter(
        (layer) => layer.visible
      );

      for (const layer of visibleUpperLayers) {
        if (layer.type === "feature" && layer.visible) {
          const featureResults = await getAttributesFeatureLayer(
            layer,
            popUpCoordinate,
            view
          );
          allResults.push(...featureResults);
          allGeometries.push(...featureResults.map((r) => r.geometry));
        } else if (layer.type === "map-image" && layer.visible) {
          const mapImageResults = await getAttributesMapImageLayer(
            layer,
            popUpCoordinate,
            view
          );
          allResults.push(...mapImageResults);
          allGeometries.push(...mapImageResults.map((r) => r.geometry));
        } else if (layer.type === "group" && layer.visible) {
          for (const subLayer of layer.layers.items) {
            if (subLayer.type === "feature" && subLayer.visible) {
              const featureResults = await getAttributesFeatureLayer(
                subLayer,
                popUpCoordinate,
                view
              );
              allResults.push(...featureResults);
              allGeometries.push(
                ...featureResults.map((r) => r.geometry)
              );
            } else if (subLayer.type === "map-image" && subLayer.visible) {
              const mapImageResults = await getAttributesMapImageLayer(
                subLayer,
                popUpCoordinate,
                view
              );
              allResults.push(...mapImageResults);
              allGeometries.push(
                ...mapImageResults.map((r) => r.geometry)
              );
            }
          }
        }
      }

      allResults = allResults.reverse();
      allGeometries = allGeometries.reverse();

      setPopupContents(allResults);
      setClickedGeometries(allGeometries);

      if (allGeometries.length > 0) {
        updateHighlightGeometry(allGeometries[0], view); 
      }
    };

    fetchLayerAttributes();
  }, [popUpCoordinate, view]);

  useEffect(() => {
    if (view && clickedGeometries.length > 0) {
      updateHighlightGeometry(clickedGeometries[currentPage - 1], view);
    }
  }, [currentPage, clickedGeometries, view]);

  const updateHighlightGeometry = (geometry, view) => {
  const highlightLayer = highlightLayerRef.current;
  highlightLayer.removeAll();

  if (!geometry) {
    console.warn("No geometry provided for highlighting");
    return;
  }

  console.log("Geometry to highlight:", geometry); 

  try {
    let highlightGraphic;

    if (geometry.rings && Array.isArray(geometry.rings) && geometry.rings.length > 0) {
      console.log("Creating polygon highlight from rings");
      
      const validRings = geometry.rings.filter(ring => 
        Array.isArray(ring) && ring.length >= 3 && 
        ring.every(point => Array.isArray(point) && point.length >= 2)
      );

      if (validRings.length > 0) {
        highlightGraphic = new Graphic({
          geometry: new Polygon({
            rings: validRings,
            spatialReference: geometry.spatialReference || { 
              wkid: view.spatialReference.wkid,
              latestWkid: view.spatialReference.latestWkid 
            },
          }),
          symbol: new SimpleFillSymbol({
            color: [255, 0, 0, 0.3], 
            outline: {
              color: [255, 0, 0],
              width: 2,
            },
          }),
        });
      }
    } 

    else if (geometry.paths && Array.isArray(geometry.paths) && geometry.paths.length > 0) {
      
      const firstPath = geometry.paths[0];
      if (Array.isArray(firstPath) && firstPath.length >= 2) {
        const bufferDistance = view.resolution * 8; 
        const coordinates = firstPath.flat ? firstPath : firstPath;
        
        if (coordinates.length >= 2) {
          const xs = coordinates.map(coord => coord[0]);
          const ys = coordinates.map(coord => coord[1]);
          const minX = Math.min(...xs);
          const maxX = Math.max(...xs);
          const minY = Math.min(...ys);
          const maxY = Math.max(...ys);
          
          const ring = [
            [minX - bufferDistance, minY - bufferDistance],
            [maxX + bufferDistance, minY - bufferDistance],
            [maxX + bufferDistance, maxY + bufferDistance],
            [minX - bufferDistance, maxY + bufferDistance],
            [minX - bufferDistance, minY - bufferDistance] 
          ];
          
          highlightGraphic = new Graphic({
            geometry: new Polygon({
              rings: [ring],
              spatialReference: geometry.spatialReference || { 
                wkid: view.spatialReference.wkid,
                latestWkid: view.spatialReference.latestWkid 
              },
            }),
            symbol: new SimpleFillSymbol({
              color: [255, 0, 0, 0.3],
              outline: {
                color: [255, 0, 0],
                width: 2,
              },
            }),
          });
        }
      }
    } 
    else if (geometry.x !== undefined && geometry.y !== undefined) {
      console.log("Creating polygon highlight from point");
      
      const bufferDistance = view.resolution * 15; 
      const rings = [[
        [geometry.x - bufferDistance, geometry.y - bufferDistance],
        [geometry.x + bufferDistance, geometry.y - bufferDistance],
        [geometry.x + bufferDistance, geometry.y + bufferDistance],
        [geometry.x - bufferDistance, geometry.y + bufferDistance],
        [geometry.x - bufferDistance, geometry.y - bufferDistance]
      ]];
      
      highlightGraphic = new Graphic({
        geometry: new Polygon({
          rings: rings,
          spatialReference: geometry.spatialReference || { 
            wkid: view.spatialReference.wkid,
            latestWkid: view.spatialReference.latestWkid 
          },
        }),
        symbol: new SimpleFillSymbol({
          color: [255, 0, 0, 0.3],
          outline: {
            color: [255, 0, 0],
            width: 2,
          },
        }),
      });
    }

    if (highlightGraphic) {
      highlightLayer.add(highlightGraphic);
      console.log("Highlight added successfully");
      
    } else {
      console.warn("Could not create highlight graphic from geometry:", geometry);
      console.warn("Geometry structure:", JSON.stringify(geometry, null, 2));
    }
  } catch (error) {
    console.error("Error creating highlight:", error);
    console.error("Geometry that caused error:", geometry);
  }
};

  const handleClosePopup = () => {
    highlightLayerRef.current.removeAll();
    setOpenPopup(false);
  };

  const currentItems = popUpContents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(popUpContents.length / itemsPerPage);

  return (
    <Box sx={{ boxShadow: "2px 4px 12px 0px rgba(0, 0, 0, 0.10)" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--jakartasatu-biru)",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <Typography
          variant="p"
          sx={{
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            lineHeight: "150%",
            padding: "12px 20px",
          }}
        >
          {currentItems[0]?.layerTitle || currentItems[0]?.layerName || "Nama Layer"}
        </Typography>
        <IconButton onClick={handleClosePopup}>
          <Close sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          padding: "5px 20px",
          width: "460px",
          maxHeight: "255px",
          backgroundColor: "white",
          borderRadius: "0 0 10px 10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            overflowY: "auto",
            flexGrow: 1,
            paddingRight: "10px",
            marginRight: "-10px",

            "::-webkit-scrollbar": {
              width: "8px",
            },
            "::-webkit-scrollbar-track": {
              borderRadius: "4px",
              border: "1px solid #DFE6E9",
              margin: "20px",
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
          {currentItems.map((result, index) => (
            <Box key={index}>
              {Object.entries(result.attributes).map(([key, value]) => (
                <Typography
                  key={key}
                  sx={{
                    fontFamily: "inherit",
                    color: "var(--jakartasatu-biru)",
                    fontSize: "14px",
                    fontWeight: "600",
                    margin: "20px 0",
                  }}
                >
                  {key} :{" "}
                  <span
                    style={{ fontWeight: "500", color: "rgba(0, 0, 0, 0.70)" }}
                  >
                    {value}
                  </span>
                </Typography>
              ))}
            </Box>
          ))}
        </Box>

        {totalPages > 1 && (
          <Box
            sx={{
              marginTop: "10px",
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <IconButton
              sx={{
                transform: "rotate(90deg)",
                color: "var(--jakartasatu-biru)",
              }}
              onClick={() => handlePageChange(null, currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ExpandCircleDownRoundedIcon sx={{ fontSize: "40px" }} />
            </IconButton>

            <Typography
              variant="p"
              sx={{
                color: "var(--jakartasatu-biru)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {currentPage} dari {totalPages}
            </Typography>

            <IconButton
              sx={{
                transform: "rotate(-90deg)",
                color: "var(--jakartasatu-biru)",
              }}
              onClick={() => handlePageChange(null, currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ExpandCircleDownRoundedIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PopUp;

const getAttributesFeatureLayer = async (layer, coordinates, view) => {
  const url = `${layer.url}/${layer.layerId}/query?`;
  const params = new URLSearchParams({
    geometry: JSON.stringify({
      x: coordinates.x,
      y: coordinates.y,
      spatialReference: { wkid: view.spatialReference.wkid },
    }),
    geometryType: "esriGeometryPoint",
    sr: view.spatialReference.wkid,
    tolerance: 5,
    f: "json",
    returnGeometry: "true",
    outFields: "*",
    outSR: view.spatialReference.wkid,
    geometryPrecision: 6,
  });

  try {
    const response = await fetch(`${url}${params.toString()}`);
    const queryResponse = await response.json();

    return queryResponse.features.map((feature) => {
      let attributes = feature.attributes;

      if (layer.customAttributes) {
        const filteredAttrs = {};
        layer.customAttributes.forEach(({ key, label }) => {
          if (attributes?.[key] !== undefined) {
            filteredAttrs[label] = attributes[key];
          }
        });
        attributes = filteredAttrs;
      }

      return {
        attributes,
        geometry: {
          ...feature.geometry,
          spatialReference: feature.geometry.spatialReference || { wkid: view.spatialReference.wkid }
        },
        layerTitle: layer.title,
      };
    });
  } catch (err) {
    console.error("Error fetching feature layer attributes:", err);
    return [];
  }
};

const getAttributesMapImageLayer = async (layer, coordinates, view) => {
  const geometry = {
    x: coordinates.x,
    y: coordinates.y,
    spatialReference: { wkid: view.spatialReference.wkid },
  };

  const mapExtent = view.extent.toJSON();
  const imageDisplay = `${view.width},${view.height},96`;
  const url = `${layer.url}/identify`;

  const params = new URLSearchParams({
    geometry: JSON.stringify(geometry),
    geometryType: "esriGeometryPoint",
    sr: view.spatialReference.wkid,
    tolerance: "5",
    mapExtent: JSON.stringify(mapExtent),
    imageDisplay,
    returnGeometry: "true",
    layers: "all",
    f: "json",
    returnFieldName: "true",
  });

  try {
    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.error("Invalid identify response:", data);
      return [];
    }

    console.log("Map Image Layer results count:", data.results.length); 

    return data.results.map((result, index) => {
      console.log(`Result ${index}:`, result); 
      
      let attributes = result.attributes;
      let geometry = result.geometry;

      console.log(`Original geometry for result ${index}:`, geometry);

      if (geometry) {
        if (!geometry.spatialReference) {
          geometry.spatialReference = { 
            wkid: view.spatialReference.wkid,
            latestWkid: view.spatialReference.latestWkid 
          };
        }

        if (result.geometryType === "esriGeometryPolygon" && geometry.rings) {
          console.log(`Polygon geometry processed for result ${index}`);
        } else if (result.geometryType === "esriGeometryPolyline" && geometry.paths) {
          console.log(`Polyline geometry detected for result ${index}, converting to polygon`);
          
          if (geometry.paths && geometry.paths.length > 0) {
            const path = geometry.paths[0];
            if (path.length > 2) {
              const bufferDistance = view.resolution * 5; 
            
              let ring = [...path];
              if (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1]) {
                ring.push(ring[0]); 
              }
              
              geometry = {
                rings: [ring],
                spatialReference: geometry.spatialReference
              };
            }
          }
        } else if (result.geometryType === "esriGeometryPoint" && (geometry.x !== undefined && geometry.y !== undefined)) {
          console.log(`Point geometry detected for result ${index}, creating buffer`);
          
          const bufferDistance = view.resolution * 10; 
          const rings = [[
            [geometry.x - bufferDistance, geometry.y - bufferDistance],
            [geometry.x + bufferDistance, geometry.y - bufferDistance],
            [geometry.x + bufferDistance, geometry.y + bufferDistance],
            [geometry.x - bufferDistance, geometry.y + bufferDistance],
            [geometry.x - bufferDistance, geometry.y - bufferDistance]
          ]];
          
          geometry = {
            rings: rings,
            spatialReference: geometry.spatialReference
          };
        }

        console.log(`Processed geometry for result ${index}:`, geometry);
      }

      // Handle custom attributes if they exist
      if (layer.customAttributes) {
        const filteredAttrs = {};
        layer.customAttributes.forEach(({ key, label }) => {
          if (attributes?.[key] !== undefined) {
            filteredAttrs[label] = attributes[key];
          }
        });
        attributes = filteredAttrs;
      }

      return {
        attributes,
        geometry,
        geometryType: result.geometryType, 
        layerTitle: layer.title || result.layerName,
        layerName: result.layerName,
        layerId: result.layerId
      };
    });
  } catch (err) {
    console.error("Error fetching identify data:", err);
    return [];
  }
};