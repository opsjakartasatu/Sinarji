import { Close } from "@mui/icons-material";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";
import Point from "@arcgis/core/geometry/Point.js";

const PopUp = ({ view, setOpenPopup, popUpCoordinate }) => {
  const [popUpContents, setPopupContents] = useState([]);
  const [clickedGeometries, setClickedGeometries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const highlightLayerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (view) {
      view.popup.autoOpenEnabled = false;
      view.popup.dockEnabled = false;
    }

    if (!highlightLayerRef.current && view) {
      highlightLayerRef.current = new GraphicsLayer({
        id: "popupHighlightLayer", 
        listMode: "hide", 
        elevationInfo: { mode: "relative-to-scene" } 
      });
      
      view.map.add(highlightLayerRef.current);
    }
    
    return () => {
      if (highlightLayerRef.current && view?.map) {
        view.map.remove(highlightLayerRef.current);
        highlightLayerRef.current = null;
      }
    };
  }, [view]);

  useEffect(() => {
    const fetchLayerAttributes = async () => {
      if (!popUpCoordinate || !view) return;
      
      setIsLoading(true);
    
      try {
        const hasQueryableLayers = await checkIfHasQueryableLayers(view);
        
        if (!hasQueryableLayers) {
          setOpenPopup(false);
          return;
        }

        const { results, geometries } = await queryAllLayers(view, popUpCoordinate);

        if (results.length === 0) {
          setOpenPopup(false);
          return;
        }

        const validResults = results.filter(result => 
          result.attributes && Object.keys(result.attributes).length > 0
        );

        if (validResults.length === 0) {
          setOpenPopup(false);
          return;
        }
      
        setPopupContents(validResults);
        setClickedGeometries(geometries.slice(0, validResults.length));
      
        if (geometries.length > 0) {
          updateHighlightGeometry(geometries[0], view); 
        }
        
        setCurrentPage(1);
      } catch (error) {
        console.error("Error saat mengambil atribut layer:", error);
        setOpenPopup(false);
      } finally {
        setIsLoading(false);
      }
    };    

    fetchLayerAttributes();
  }, [popUpCoordinate, view]);

  const checkIfHasQueryableLayers = async (view) => {
    if (!view || !view.map) return false;
    
    const layers = view.map.layers.items.filter(layer => layer.visible);
    
    if (layers.length === 0) {
      return false;
    }
    
    const queryableLayers = layers.filter(layer => {
      if (layer.type === "feature" && layer.visible) {
        return true;
      }
      if (layer.type === "map-image" && layer.visible) {
        return true;
      }
      if (layer.type === "group" && layer.visible) {
        return layer.layers && layer.layers.items.some(subLayer => 
          subLayer.visible && (subLayer.type === "feature" || subLayer.type === "map-image")
        );
      }
      return false;
    });
    
    return queryableLayers.length > 0;
  };

  useEffect(() => {
    if (view && clickedGeometries.length > 0) {
      updateHighlightGeometry(clickedGeometries[currentPage - 1], view); 
    }
  }, [currentPage, clickedGeometries, view]);

 const queryAllLayers = async (view, coordinate, clickedLayer = null) => {
  let allResults = [];
  let allGeometries = [];
  
  let layersToQuery = view.map.layers.items.filter(layer => {
    if (!layer.visible) return false;
    
    if (layer.type === "feature") return true;
    if (layer.type === "map-image") return true;
    if (layer.type === "group") {
      return layer.layers && layer.layers.items.some(subLayer => 
        subLayer.visible && (subLayer.type === "feature" || subLayer.type === "map-image")
      );
    }
    return false;
  });
  
  if (clickedLayer) {
    layersToQuery = [clickedLayer];
  }
  
  if (layersToQuery.length === 0) {
    return { results: [], geometries: [] };
  }
  
  for (const layer of layersToQuery) {
    try {
      if (layer.type === "feature" && layer.visible) {
        const featureResults = await queryFeatureLayer(layer, coordinate, view);
        const validFeatureResults = featureResults.filter(result => 
          result && result.attributes && Object.keys(result.attributes).length > 0
        );
        allResults.push(...validFeatureResults);
        allGeometries.push(...validFeatureResults.map(r => r.geometry));
      } 
      else if (layer.type === "map-image" && layer.visible) {
        const mapImageResults = await queryMapImageLayer(layer, coordinate, view);
        const validMapImageResults = mapImageResults.filter(result => 
          result && result.attributes && Object.keys(result.attributes).length > 0
        );
        allResults.push(...validMapImageResults);
        allGeometries.push(...validMapImageResults.map(r => r.geometry));
      } 
      else if (layer.type === "group") {
        const groupResults = await processGroupLayer(layer, coordinate, view);
        const validGroupResults = groupResults.results.filter(result => 
          result && result.attributes && Object.keys(result.attributes).length > 0
        );
        allResults.push(...validGroupResults);
        allGeometries.push(...validGroupResults.map(r => r.geometry));
      }
    } catch (error) {
      console.error(`Error saat memproses layer ${layer.title}:`, error);
    }
  }
  
  if (clickedLayer && allResults.length > 0) {
    const specificResults = allResults.filter(result => 
      result.layerTitle === clickedLayer.title || 
      result.layerId === clickedLayer.id
    );
    
    if (specificResults.length > 0) {
      return {
        results: specificResults,
        geometries: specificResults.map(r => r.geometry)
      };
    }
  }
  
  return {
    results: allResults.reverse(),
    geometries: allGeometries.reverse()
  };
};
  
  const processGroupLayer = async (groupLayer, coordinate, view) => {
    let results = [];
    let geometries = [];
    
    for (const subLayer of groupLayer.layers.items) {
      try {
        if (subLayer.type === "feature" && subLayer.visible) {
          const featureResults = await queryFeatureLayer(subLayer, coordinate, view);
          results.push(...featureResults);
          geometries.push(...featureResults.map(r => r.geometry));
        } 
        else if (subLayer.type === "map-image" && subLayer.visible) {
          const mapImageResults = await queryMapImageLayer(subLayer, coordinate, view);
          results.push(...mapImageResults);
          geometries.push(...mapImageResults.map(r => r.geometry));
        }
        else if (subLayer.type === "group" && subLayer.visible) {
          const nestedResults = await processGroupLayer(subLayer, coordinate, view);
          results.push(...nestedResults.results);
          geometries.push(...nestedResults.geometries);
        }
      } catch (error) {
        console.error(`Error saat memproses sublayer ${subLayer.title}:`, error);
      }
    }
    
    return { results, geometries };
  };

  const updateHighlightGeometry = (geometry, view) => {
    if (!highlightLayerRef.current || !geometry) return;
    highlightLayerRef.current.removeAll();

    try {
      let esriGeometry;
      let symbol;
      
      if (geometry.rings) {
        esriGeometry = new Polygon({
          rings: geometry.rings,
          spatialReference: { wkid: view.spatialReference.wkid }
        });
        
        symbol = new SimpleFillSymbol({
          color: [255, 0, 0, 0.3],
          outline: {
            color: [255, 0, 0],
            width: 2
          }
        });
      } else if (geometry.paths) {
        esriGeometry = new Polyline({
          paths: geometry.paths,
          spatialReference: { wkid: view.spatialReference.wkid }
        });
        
        symbol = new SimpleLineSymbol({
          color: [255, 0, 0],
          width: 3
        });
      } else if (geometry.x !== undefined && geometry.y !== undefined) {
        esriGeometry = new Point({
          x: geometry.x,
          y: geometry.y,
          spatialReference: { wkid: view.spatialReference.wkid }
        });
        
        symbol = new SimpleMarkerSymbol({
          color: [255, 0, 0],
          size: 12,
          outline: {
            color: [255, 255, 255],
            width: 2
          }
        });
      } else if (geometry.type === "point") {
        esriGeometry = geometry;
        
        symbol = new SimpleMarkerSymbol({
          color: [255, 0, 0],
          size: 12,
          outline: {
            color: [255, 255, 255],
            width: 2
          }
        });
      } else if (geometry.type === "polyline") {
        esriGeometry = geometry;
        
        symbol = new SimpleLineSymbol({
          color: [255, 0, 0],
          width: 3
        });
      } else if (geometry.type === "polygon") {
        esriGeometry = geometry;
        
        symbol = new SimpleFillSymbol({
          color: [255, 0, 0, 0.3],
          outline: {
            color: [255, 0, 0],
            width: 2
          }
        });
      } else {
        console.warn("Tipe geometri tidak dikenal:", geometry);
        return;
      }

      const highlightGraphic = new Graphic({
        geometry: esriGeometry,
        symbol: symbol
      });

      highlightLayerRef.current.add(highlightGraphic);
    } catch (error) {
      console.error("Error saat menambahkan highlight graphic:", error);
    }
  };

  const parseDialogFields = (fieldsData) => {
    if (!fieldsData) return [];
    
    if (Array.isArray(fieldsData)) {
      return fieldsData.map(item => typeof item === 'string' ? item.trim() : String(item));
    }
   
    if (typeof fieldsData === 'string') {
      if (fieldsData.trim().startsWith('[') || fieldsData.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(fieldsData);
          if (Array.isArray(parsed)) {
            return parsed.map(item => typeof item === 'string' ? item.trim() : String(item));
          }
        } catch (e) {
        }
      }
      
      return fieldsData.split(',').map(item => item.trim());
    }
    
    return [];
  };
  
  const extractFieldsFromPopupTemplate = (layer) => {
    try {
      if (layer.popupTemplate) {
        if (layer.popupTemplate.content && 
            Array.isArray(layer.popupTemplate.content.fieldInfos)) {
          return layer.popupTemplate.content.fieldInfos
            .filter(info => info.visible !== false)
            .map(info => info.fieldName);
        }

        if (typeof layer.popupTemplate.content === 'string') {
          const fieldMatches = layer.popupTemplate.content.match(/\{([^}]+)\}/g);
          if (fieldMatches) {
            return fieldMatches.map(match => match.substring(1, match.length - 1));
          }
        }
        
        if (Array.isArray(layer.popupTemplate.content)) {
          const fieldNames = [];
          
          for (const contentItem of layer.popupTemplate.content) {
            if (contentItem.type === "fields" && Array.isArray(contentItem.fieldInfos)) {
              fieldNames.push(
                ...contentItem.fieldInfos
                  .filter(info => info.visible !== false)
                  .map(info => info.fieldName)
              );
            }
          }
          
          if (fieldNames.length > 0) {
            return fieldNames;
          }
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error saat mengekstrak field popup template:", error);
      return null;
    }
  };
  
  const getAttributesDirectFromFields = (attributes, result) => {
    let fieldsToDisplay = null;
    
    if (result.variable_dialog_alias && 
        ((Array.isArray(result.variable_dialog_alias) && result.variable_dialog_alias.length > 0) ||
        (typeof result.variable_dialog_alias === 'string' && result.variable_dialog_alias.trim() !== ''))) {
      fieldsToDisplay = parseDialogFields(result.variable_dialog_alias);
    }
    
    if ((!fieldsToDisplay || fieldsToDisplay.length === 0) && result.popupFields) {
      fieldsToDisplay = result.popupFields;
    }
    
    if (!fieldsToDisplay || fieldsToDisplay.length === 0) {
      return attributes;
    }
   
    const attributeKeysLower = {};
    Object.keys(attributes).forEach(key => {
      attributeKeysLower[key.toLowerCase()] = key;
    });
  
    const filteredAttributes = {};
  
    fieldsToDisplay.forEach(field => {
      if (typeof field !== 'string') {
        return;
      }

      if (attributes[field] !== undefined) {
        filteredAttributes[field] = attributes[field];
        return;
      }
      
      const fieldLower = field.toLowerCase().trim();
      for (const key in attributeKeysLower) {
        if (key === fieldLower || key.includes(fieldLower) || fieldLower.includes(key)) {
          const actualKey = attributeKeysLower[key];
          filteredAttributes[field] = attributes[actualKey];
          return;
        }
      }
    });
  
    if (Object.keys(filteredAttributes).length === 0) {
      return attributes;
    }
    
    return filteredAttributes;
  };
  
 const queryFeatureLayer = async (layer, coordinates, view) => {
  const canQuery = layer.url && 
                   ((layer.url.includes("FeatureServer") || layer.type === "feature") && 
                    typeof layer.queryFeatures === 'function');
  
  if (canQuery) {
    try {
      const bufferDistance = 10; 
      const screenPoint = {
        x: coordinates.x,
        y: coordinates.y
      };
      
      const bufferGeometry = {
        x: coordinates.x,
        y: coordinates.y,
        spatialReference: view.spatialReference,
        type: "point"
      };
    
      const query = {
        geometry: bufferGeometry,
        returnGeometry: true,
        outFields: "*",
        distance: layer.geometryType === "polyline" ? bufferDistance : 3,
        units: "meters",
        spatialRelationship: "intersects"
      };
      
      const featureSet = await layer.queryFeatures(query);
      
      if (featureSet.features.length === 0) {
        if (layer.geometryType === "polyline" || layer.title.toLowerCase().includes("garis")) {
          query.distance = bufferDistance * 3;
          const retryFeatureSet = await layer.queryFeatures(query);
          
          if (retryFeatureSet.features.length > 0) {
            return processFeatureResults(retryFeatureSet, layer);
          }
        }
        return [];
      }
  
      const popupFields = extractFieldsFromPopupTemplate(layer);
      
      return processFeatureResults(featureSet, layer);
    } catch (error) {
      console.error("Error saat query feature layer:", error);
        return [];
      }
    } else {
      try {
        const layerUrl = layer.url || "";
        const layerId = layer.layerId !== undefined ? layer.layerId : 0;
        const url = `${layerUrl}/${layerId}/query?`;
        
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

        const response = await fetch(`${url}${params.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const queryResponse = await response.json();
        
        if (!queryResponse.features || queryResponse.features.length === 0) {
          return [];
        }
        
        const popupFields = extractFieldsFromPopupTemplate(layer);

        return (queryResponse.features || []).map((feature) => ({
          attributes: feature.attributes || {},
          geometry: feature.geometry,
          layerTitle: layer.title || "Feature Layer",
          variable_dialog_alias: layer.variable_dialog_alias || [],
          popupFields
        }));
      } catch (error) {
        console.error("Error saat query feature layer melalui REST:", error);
        return [];
      }
    }
  };

  const processFeatureResults = (featureSet, layer) => {
    return featureSet.features.map(feature => {
      let variable_dialog_alias = [];
      if (layer.variable_dialog_alias) {
        variable_dialog_alias = Array.isArray(layer.variable_dialog_alias) ? 
          [...layer.variable_dialog_alias] : 
          parseDialogFields(layer.variable_dialog_alias);
      }

      if (feature.attributes.variable_dialog_alias && (!variable_dialog_alias || variable_dialog_alias.length === 0)) {
        try {
          const featureVarDialog = parseDialogFields(feature.attributes.variable_dialog_alias);
          if (featureVarDialog && featureVarDialog.length > 0) {
            variable_dialog_alias = featureVarDialog;
          }
        } catch (e) {
          console.warn("Tidak bisa parse feature variable_dialog_alias", e);
        }
      }
      
      return {
        attributes: feature.attributes,
        geometry: feature.geometry,
        layerTitle: layer.title || "Feature Layer",
        variable_dialog_alias,
        popupFields: extractFieldsFromPopupTemplate(layer)
      };
    });
  };

  const queryMapImageLayer = async (layer, coordinates, view) => {
    try {
      const mapExtent = view.extent.toJSON();
      const imageDisplay = `${view.width},${view.height},96`;
    
      const geometry = {
        x: coordinates.x,
        y: coordinates.y,
        spatialReference: { wkid: view.spatialReference.wkid },
      };
    
      const url = `${layer.url}/identify`;
      
      let layersToQuery = "visible";
      
      if (layer.sublayers && layer.sublayers.items && layer.sublayers.items.length > 0) {
        const visibleSublayers = layer.sublayers.items
          .filter(sublayer => sublayer.visible !== false)
          .map(sublayer => sublayer.id);
        
        if (visibleSublayers.length > 0) {
          layersToQuery = `visible:${visibleSublayers.join(',')}`;
        }
      }
      
      const params = new URLSearchParams({
        geometry: JSON.stringify(geometry),
        geometryType: "esriGeometryPoint",
        sr: view.spatialReference.wkid,
        tolerance: 5, 
        mapExtent: JSON.stringify(mapExtent),
        imageDisplay,
        f: "json",
        returnGeometry: "true",
        layers: layersToQuery,
      });
    
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const identifyResponse = await response.json();
    
      if (!identifyResponse.results || identifyResponse.results.length === 0) {
        return [];
      }

      const filteredResults = (identifyResponse.results || []).filter(result => {
        if (layer.sublayers && layer.sublayers.items && layer.sublayers.items.length > 0) {
          return layer.sublayers.items.some(sublayer => sublayer.id === result.layerId);
        }
        return true;
      });
      
      if (filteredResults.length === 0) {
        return [];
      }
      
      return filteredResults.map((result) => {
        let variable_dialog_alias = [];
        if (typeof layer.getVariableDialogForSubLayer === 'function') {
          try {
            const sublayerInfo = layer.getVariableDialogForSubLayer(result.layerId);
            variable_dialog_alias = parseDialogFields(sublayerInfo.alias);
          } catch (err) {
            variable_dialog_alias = parseDialogFields(layer.variable_dialog_alias);
          }
        } else {
          variable_dialog_alias = parseDialogFields(layer.variable_dialog_alias);
        }
        
        let popupFields = null;
        if (layer.findSublayerById && typeof layer.findSublayerById === 'function') {
          try {
            const sublayer = layer.findSublayerById(result.layerId);
            if (sublayer) {
              popupFields = extractFieldsFromPopupTemplate(sublayer);
            }
          } catch (err) {
            console.warn("Error menemukan sublayer:", err);
          }
        }
        
        return {
          attributes: result.attributes || {},
          geometry: result.geometry,
          layerTitle: result.layerName || layer.title || "Map Image Layer",
          layerId: result.layerId,
          variable_dialog_alias,
          popupFields
        };
      });
    } catch (error) {
      console.error("Error saat identifikasi map image layer:", error);
      return [];
    }
  };

  const handleClosePopup = () => {
    if (highlightLayerRef.current) {
      highlightLayerRef.current.removeAll();
    }
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

  if (isLoading || popUpContents.length === 0) {
    return null;
  }

  return (
    <Box sx={{ boxShadow: "2px 4px 12px 0px rgba(0, 0, 0, 0.10)" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start", 
          background: "var(--jakartasatu-biru)",
          borderRadius: "10px 10px 0 0",
          padding: "12px 20px", 
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            lineHeight: "150%",
            overflowWrap: "break-word", 
            wordWrap: "break-word",
            hyphens: "auto",
            maxWidth: "400px",
            paddingRight: "10px", 
          }}
        >
          {currentItems[0]?.layerTitle || "Nama Layer"}
        </Typography>
        <IconButton 
          onClick={handleClosePopup}
          sx={{ 
            padding: "4px",
            marginTop: "-4px", 
            marginRight: "-12px" 
          }}
        >
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
          {currentItems.map((result, index) => {
            const filteredAttributes = getAttributesDirectFromFields(result.attributes, result);
            
            return (
              <Box key={index}>
                {Object.keys(filteredAttributes).length > 0 ? (
                  Object.entries(filteredAttributes).map(([key, value]) => (
                    <Typography
                      key={key}
                      sx={{
                        fontFamily: "inherit",
                        color: "var(--jakartasatu-biru)",
                        fontSize: "14px",
                        fontWeight: "600",
                        margin: "20px 0",
                        wordBreak: "break-word", 
                      }}
                    >
                      {key} :{" "}
                      <span
                        style={{ fontWeight: "500", color: "rgba(0, 0, 0, 0.70)" }}
                      >
                        {value !== null && value !== undefined ? value : 'N/A'}
                      </span>
                    </Typography>
                  ))
                ) : (
                  <Typography
                    sx={{
                      fontFamily: "inherit",
                      color: "var(--jakartasatu-biru)",
                      fontSize: "14px",
                      fontWeight: "600",
                      margin: "20px 0",
                      textAlign: "center",
                    }}
                  >
                    Tidak ada data untuk ditampilkan
                  </Typography>
                )}
              </Box>
            );
          })}
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