import FeatureTable from "@arcgis/core/widgets/FeatureTable";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LayerView from "@arcgis/core/views/layers/LayerView";
import Query from "@arcgis/core/rest/support/Query";
import {
  Close,
  Delete,
  FilterAlt,
  GridOn,
  Info,
  Visibility,
  VisibilityOff,
  TableView,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Modal,
  Slider,
  Stack,
  Tooltip,
  Typography,
  CircularProgress,
  Button,
  Alert,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";

const LayerDetail = ({
  view,
  layer,
  addedLayers,
  setAddedLayers,
  setInfoLayerOpen,
  setTableOpen,
  setTableLayer,
  setSelectedLayer,
  setQueryOpen,
  highlightGraphicsLayer,
}) => {
  const [opacity, setOpacity] = useState(layer?.opacity || 0.5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (layer) {
      setOpacity(layer.opacity);
    }
  }, [layer]);

  const handleOpenQuery = () => {
    setQueryOpen(false);
    setSelectedLayer(layer);
    setQueryOpen(true);
  };

  const handleInfo = () => {
    setInfoLayerOpen(false);
    setSelectedLayer(layer);
    setInfoLayerOpen(true);
  };

  const handleTable = async (layerDetail) => {
    try {
      setLoading(true);
      setTableOpen(true);
      setTableLayer(layerDetail);
      
      const currentLayer = await view.map.layers.items.find(
        (layer) => layer.id === layerDetail?.id
      );
      
      if (!currentLayer) {
        console.error("Layer tidak ditemukan:", layerDetail?.id);
        setLoading(false);
        return;
      }
      
      const tables = document.querySelectorAll(".table-element");
      if (tables.length > 0) {
        tables.forEach(async (element) => {
          element.innerHTML = "";
          
          if (currentLayer.type === "map-image") {
            if (!currentLayer.loaded) {
              await currentLayer.load();
            }
            
            const sublayers = currentLayer.sublayers?.items;
            if (sublayers && sublayers.length > 0) {
              let sublayerId = sublayers[0].id;
              if (currentLayer.sublayers && currentLayer.sublayers.items.length > 0) {
                const visibleSublayer = sublayers.find(sl => sl.visible !== false);
                if (visibleSublayer) {
                  sublayerId = visibleSublayer.id;
                }
              }
              
              try {
                const sublayerUrl = `${currentLayer.url}/${sublayerId}`;
                console.log("Mencoba mengakses sublayer:", sublayerUrl);
                const sublayerFL = new FeatureLayer({
                  url: sublayerUrl,
                  outFields: ["*"],
                  title: `${currentLayer.title} - Layer ${sublayerId}`
                });
                await sublayerFL.load();
                if (sublayerFL.geometryType) {
                  new FeatureTable({
                    view: view,
                    layer: sublayerFL,
                    container: element,
                    highlightEnabled: true,
                    visibleElements: {
                      selectionColumn: true,
                      menuItems: {
                        clearSelection: true,
                        refreshData: true,
                        toggleColumns: true,
                        zoomTo: true
                      }
                    }
                  });
                } else {
                  element.innerHTML = `<div style="padding: 20px;">Tidak dapat menampilkan atribut karena layer tidak memiliki fitur yang dapat diakses.</div>`;
                }
              } catch (sublayerError) {
                console.error("Error saat memuat sublayer:", sublayerError);
                try {
                  const layerInfoResponse = await fetch(`${currentLayer.url}/${sublayerId}?f=json`);
                  const layerInfo = await layerInfoResponse.json();
                  
                  if (layerInfo && layerInfo.fields) {
                    const queryUrl = `${currentLayer.url}/${sublayerId}/query?where=1=1&outFields=*&returnGeometry=false&f=json`;
                    const queryResponse = await fetch(queryUrl);
                    const queryData = await queryResponse.json();
                    
                    if (queryData && queryData.features && queryData.features.length > 0) {
                      createCustomTable(element, layerInfo.fields, queryData.features);
                    } else {
                      element.innerHTML = `<div style="padding: 20px;">Layer tidak memiliki data atau tidak dapat diakses.</div>`;
                    }
                  }
                } catch (queryError) {
                  console.error("Error saat query data:", queryError);
                  element.innerHTML = `<div style="padding: 20px;">Tidak dapat mengakses data layer. Error: ${queryError.message}</div>`;
                }
              }
            } else {
              element.innerHTML = `<div style="padding: 20px;">MapImageLayer tidak memiliki sublayer yang dapat ditampilkan.</div>`;
            }
          } else {
            try {
              if (!currentLayer.loaded) {
                await currentLayer.load();
              }
              
              new FeatureTable({
                view: view,
                layer: currentLayer,
                container: element,
                highlightEnabled: true,
                visibleElements: {
                  selectionColumn: true,
                  menuItems: {
                    clearSelection: true,
                    refreshData: true,
                    toggleColumns: true,
                    zoomTo: true
                  }
                }
              });
            } catch (featureLayerError) {
              console.error("Error saat menampilkan tabel FeatureLayer:", featureLayerError);
              element.innerHTML = `<div style="padding: 20px;">Tidak dapat menampilkan atribut layer. Error: ${featureLayerError.message}</div>`;
            }
          }
          setLoading(false);
        });
      } else {
        console.warn("Tidak ada elemen '.table-element' ditemukan di DOM");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error saat menampilkan tabel:", error);
      setLoading(false);
    }
  };
  
  const createCustomTable = (container, fields, features) => {
    const table = document.createElement('table');
    table.className = 'custom-feature-table';
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    headerRow.style.backgroundColor = '#f2f2f2';
    headerRow.style.fontWeight = 'bold';
    
    fields.forEach(field => {
      const th = document.createElement('th');
      th.textContent = field.alias || field.name;
      th.style.padding = '8px';
      th.style.borderBottom = '1px solid #ddd';
      th.style.textAlign = 'left';
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    features.slice(0, 1000).forEach((feature, index) => {
      const row = document.createElement('tr');
      row.style.borderBottom = '1px solid #ddd';
      if (index % 2 === 0) {
        row.style.backgroundColor = '#f9f9f9';
      }
      
      fields.forEach(field => {
        const td = document.createElement('td');
        const value = feature.attributes[field.name];
        td.textContent = value !== null && value !== undefined ? value.toString() : '';
        td.style.padding = '8px';
        row.appendChild(td);
      });
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    if (features.length > 1000) {
      const infoDiv = document.createElement('div');
      infoDiv.textContent = 'Menampilkan 1000 dari ' + features.length + ' fitur';
      infoDiv.style.padding = '8px';
      infoDiv.style.backgroundColor = '#f2f2f2';
      container.appendChild(infoDiv);
    }
    
    container.appendChild(table);
  };

  const handleDelete = (layer) => {
    const layerIndexToRemove = addedLayers.findIndex(
      (addedLayer) => addedLayer.id === layer.id
    );
    
    if (layerIndexToRemove !== -1) {
      view.map.remove(addedLayers[layerIndexToRemove]);
      setAddedLayers((prevLayers) => {
        const updatedLayers = [...prevLayers];
        updatedLayers.splice(layerIndexToRemove, 1);
        return updatedLayers;
      });
      
      if (highlightGraphicsLayer) {
        highlightGraphicsLayer.removeAll();
      }
      
      const tables = document.querySelectorAll(".table-element");
      tables.forEach((element) => {
        element.innerHTML = "";
      });
      setTableOpen(false);
    }
  };

  const sliderHandle = (layer, value) => {
    if (!layer) return;
    
    setOpacity(value);
    layer.opacity = value;
  };

  if (!layer) {
    return null;
  }

  return (
    <Box sx={{ display: "grid", flexDirection: "column" }}>
      <Box sx={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-evenly" }}>
        {!layer.isUploaded && (
          <Tooltip title="Info" placement="top">
            <IconButton onClick={handleInfo} id={`layer-info-${layer.id}`}>
              <Info />
            </IconButton>
          </Tooltip>
        )}
        
        <Tooltip title="Tabel Atribut" placement="top">
          <IconButton 
            onClick={() => handleTable(layer)} 
            id={`layer-table-${layer.id}`}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : <GridOn />}
          </IconButton>
        </Tooltip>
        
        {!layer.isUploaded && (
          <Tooltip title="Query" placement="top">
            <IconButton onClick={handleOpenQuery} id={`layer-query-${layer.id}`}>
              <FilterAlt />
            </IconButton>
          </Tooltip>
        )}
        
        <Tooltip title="Hapus Layer" placement="top">
          <IconButton onClick={() => handleDelete(layer)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "auto",
          justifyContent: "start",
          paddingLeft: 2,
        }}
      >
        {layer && (
          <Stack
            spacing={2}
            direction="row"
            sx={{ width: "100%", paddingRight: 2 }}
            alignItems="center"
          >
            <VisibilityOff sx={{ color: "#757575", width: "20px" }} />
            <Slider
              valueLabelDisplay="auto"
              value={opacity}
              min={0}
              max={1}
              step={0.1}
              onChange={(event, value) => sliderHandle(layer, value)}
              sx={{ width: "80%" }}
            />
            <Visibility sx={{ color: "#757575", width: "20px" }} />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default LayerDetail;