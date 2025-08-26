import React from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import { Close } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  ListItemText,
  Switch,
  Typography,
  Checkbox,
  MenuItem,
  OutlinedInput,
  Stack,
  Collapse,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./style.css";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    border: "1px solid rgba(0,0,0,.2)",
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

const Catalog = ({
  view,
  handleCatalogToggle,
  data,
  setData,
  group,
  setGroup,
  setAllLayer,
  addedLayers,
  setAddedLayers,
  modalStyle,
  currentGroupName,
  setCurrentGroupName,
  bahasa,
  setOpenPopup,
  setPopUpCoordinate
}) => {
  const searchInputRef = useRef(null);
  const [apiActive, setApiActive] = useState(true);
  const [simpulJaringanList, setSimpulJaringanList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [selectedSimpulJaringan, setSelectedSimpulJaringan] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchSimpulJaringan, setSearchSimpulJaringan] = useState("");
  const [selectedKategori, setSelectedKategori] = useState([]);
  const [filteredLayers, setFilteredLayers] = useState([]);
  const [highlightGraphicsLayer, setHighlightGraphicsLayer] = useState(null);
  const [isMinimizedKategori, setIsMinimizedKategori] = useState(false);
  const [isMinimizedSimpul, setIsMinimizedSimpul] = useState(false);

  const sortLayersByName = (layers) => {
    return [...layers].sort((a, b) => {
      if (a.nama_alias && b.nama_alias) {
        return a.nama_alias.localeCompare(b.nama_alias);
      }
      return 0;
    });
  };

  const sortGroupsByName = (groups) => {
    return [...groups].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  };

   const addLayer = (layer) => {
        const isLayerAdded = addedLayers.some(
          (addedLayer) => addedLayer.id === layer.id_data
        );
        if (isLayerAdded) {
          return;
        }
  
        let variable_dialog_name = [];
        let variable_dialog_alias = [];
      
        const parseDialogField = (field) => {
          console.log("Parsing dialog field in addLayer:", field);
          
          if (!field) return [];
          
          if (Array.isArray(field)) {
            return field.map(item => typeof item === 'string' ? item.trim() : String(item));
          }
          
          if (typeof field === 'string') {
            if (field.trim().startsWith('[') || field.trim().startsWith('{')) {
              try {
                const parsed = JSON.parse(field);
                if (Array.isArray(parsed)) {
                  return parsed.map(item => typeof item === 'string' ? item.trim() : String(item));
                }
              } catch (e) {
                console.debug("Failed to parse as JSON, using comma split", e);
              }
            }
          
            return field.split(',').map(item => item.trim());
          }
          
          return [];
        };
        
        variable_dialog_name = parseDialogField(layer.variable_dialog_name);
        variable_dialog_alias = parseDialogField(layer.variable_dialog_alias);
        
        console.log("Parsed variable_dialog_name:", variable_dialog_name);
        console.log("Parsed variable_dialog_alias:", variable_dialog_alias);
        
        if (variable_dialog_name.length > variable_dialog_alias.length) {
          const additionalAliases = variable_dialog_name.slice(variable_dialog_alias.length);
          variable_dialog_alias = [...variable_dialog_alias, ...additionalAliases];
          console.log("Extended variable_dialog_alias to match name length:", variable_dialog_alias);
        }
  
        let selectedLayer;
        if (layer.url_data && layer.url_data.includes("MapServer")) {
          // Kode yang sudah ada untuk MapServer...
          const urlArray = layer.url_data.split("/");
          const idLayer = parseInt(urlArray[urlArray.length - 1]);
          if (isNaN(idLayer)) {
            console.error("ID sublayer tidak valid, periksa format URL MapServer:", layer.url_data);
            if (layer.url_data_feature && layer.url_data_feature.includes("FeatureServer")) {
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
                  variable_dialog_name: variable_dialog_name,
                  variable_dialog_alias: variable_dialog_alias
                },
              ],
            });
            
            selectedLayer.when(() => {
              if (selectedLayer.sublayers && selectedLayer.sublayers.items.length > 0) {
                selectedLayer.sublayers.items.forEach(sublayer => {
                  sublayer.variable_dialog_name = variable_dialog_name;
                  sublayer.variable_dialog_alias = variable_dialog_alias;
                });
              }
              
              const clickHandlerId = `click.${layer.id_data}`;
              view.on(clickHandlerId, null);
  
              view.on("click", (event) => {
                if (selectedLayer.visible) {
                  setPopUpCoordinate(event.mapPoint);
                  setOpenPopup(true);
                  
                  if (highlightGraphicsLayer) {
                    highlightGraphicsLayer.removeAll();
                  }
                  
                  fetchGeometryAndAttributes(selectedLayer, event.mapPoint)
                    .then(result => {
                      if (result && result.geometry) {
                        displayGeometry(result.geometry);
                      }
                    });
                }
              });
            });
          }
        }
        else if (layer.url_data_feature && layer.url_data_feature.includes("FeatureServer")) {
          selectedLayer = new FeatureLayer({
            url: layer.url_data_feature,
            id: layer.id_data,
            title: layer.nama_alias,
            opacity: 0.5,
            listMode: "show",
            popupEnabled: false
          });
          
          selectedLayer.variable_dialog_name = variable_dialog_name;
          selectedLayer.variable_dialog_alias = variable_dialog_alias;
       
          const clickHandlerId = `click.${layer.id_data}`;
          view.on(clickHandlerId, null);
         
          view.on("click", (event) => {
            if (selectedLayer.visible) {
              view.hitTest(event)
                .then(response => {
                  const featureHit = response.results.find(result => 
                    result.graphic && result.graphic.layer && result.graphic.layer.id === layer.id_data
                  );
                  
                  if (featureHit) {
                    setPopUpCoordinate(event.mapPoint);
                    setOpenPopup(true);
                    
                    if (highlightGraphicsLayer) {
                      highlightGraphicsLayer.removeAll();
                    }
                    
                    fetchGeometryAndAttributes(selectedLayer, event.mapPoint)
                      .then(result => {
                        if (result && result.geometry) {
                          displayGeometry(result.geometry);
                        }
                      })
                      .catch(error => {
                        console.error("Error fetching geometry and attributes:", error);
                        
                        const geometry = featureHit.graphic.geometry;
                        if (geometry) {
                          displayGeometry(geometry);
                        }
                      });
                  }
                });
            }
          });
        }
        else {
          selectedLayer = new FeatureLayer({
            url: layer.url_data_feature || layer.url_data,
            id: layer.id_data,
            title: layer.nama_alias,
            opacity: 0.5,
            listMode: "show",
            popupEnabled: false
          });
          
          selectedLayer.variable_dialog_name = variable_dialog_name;
          selectedLayer.variable_dialog_alias = variable_dialog_alias;
          
          const clickHandlerId = `click.${layer.id_data}`;
          view.on(clickHandlerId, null);
          
          view.on("click", (event) => {
            if (selectedLayer.visible) {
              setPopUpCoordinate(event.mapPoint);
              setOpenPopup(true);
              
              if (highlightGraphicsLayer) {
                highlightGraphicsLayer.removeAll();
              }
              
              fetchGeometryAndAttributes(selectedLayer, event.mapPoint)
                .then(result => {
                  if (result && result.geometry) {
                    displayGeometry(result.geometry);
                  }
                });
            }
          });
        }
  
        const infoItem = {
          nama_data: layer.nama_data,
          nama_kugi: layer.nama_kugi,
          deskripsi_data: layer.deskripsi_data,
          simpul_jaringan: layer.simpul_jaringan,
        };
      
        selectedLayer.customDescription = infoItem;
        
        selectedLayer.variable_dialog_name = variable_dialog_name;
        selectedLayer.variable_dialog_alias = variable_dialog_alias;
        
        if (selectedLayer.type === "map-image") {
          selectedLayer.getVariableDialogForSubLayer = (sublayerId) => {
            const sublayer = selectedLayer.sublayers?.items.find(sl => sl.id === sublayerId);
            if (sublayer) {
              return {
                name: sublayer.variable_dialog_name || variable_dialog_name,
                alias: sublayer.variable_dialog_alias || variable_dialog_alias
              };
            }
            return {
              name: variable_dialog_name,
              alias: variable_dialog_alias
            };
          };
        }
      
        else if (selectedLayer.type === "feature") {
          selectedLayer.getVariableDialogForLayer = () => {
            return {
              name: variable_dialog_name,
              alias: variable_dialog_alias
            };
          };
        }
  
        view.map.add(selectedLayer);
        setAddedLayers((prevLayers) => [...prevLayers, selectedLayer]);
      };

  const removeLayer = (layer) => {
    const layerIndexToRemove = addedLayers.findIndex(
      (addedLayer) => addedLayer.id == layer.id_data
    );
    if (layerIndexToRemove !== -1) {
      view.map.remove(addedLayers[layerIndexToRemove]);
      setAddedLayers((prevLayers) => {
        const newLayers = [...prevLayers];
        newLayers.splice(layerIndexToRemove, 1);
        return newLayers;
      });
    }
  };

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

  const handleGroup = (group) => {
    setGroup(group);
    setCurrentGroupName(group.name);
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
        
        // Parse geometry from response
        let geometry;
        if (result.geometry && result.geometry.rings) {
          // If geometry is a polygon
          geometry = new Polygon({
            rings: result.geometry.rings,
            spatialReference: view.spatialReference
          });
        } else if (result.geometry && result.geometry.paths) {
          // If geometry is a polyline
          geometry = new Polyline({
            paths: result.geometry.paths,
            spatialReference: view.spatialReference
          });
        } else if (result.geometry && result.geometry.x !== undefined && result.geometry.y !== undefined) {
          // If geometry is a point
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

  const handleGroupChange = (event) => {
    const value = event.target.value;
    setSelectedGroups(value);
    const selectedGroup = data?.maps?.find(
      (g) => g.name === value[value.length - 1]
    );
    if (selectedGroup) {
      setGroup(selectedGroup);
    }
  };

  const basePath = process.env.SERVER_PUBLIC_BASE_PATH ?? "";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("431"));
  const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));

  const applyFilters = () => {
    if (!group?.layers) return [];
  
    return group.layers.filter((layer) => {
      const matchesSearch =
        !searchInput ||
        !layer.nama_alias ||
        layer.nama_alias.toLowerCase().includes(searchInput.toLowerCase());
  
      const matchesKategori =
        selectedKategori.length === 0 ||
        (layer.kategori && selectedKategori.includes(layer.kategori));
  
      const matchesSimpul =
        selectedSimpulJaringan.length === 0 ||
        selectedSimpulJaringan.includes(layer.simpul_jaringan);
  
      return matchesSearch && matchesKategori && matchesSimpul;
    }).sort((a, b) => {
      if (sortOrder === "asc") {
        return a.nama_alias.localeCompare(b.nama_alias);
      } else {
        return b.nama_alias.localeCompare(a.nama_alias);
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredLayers(applyFilters());
    }, 300); 
    
    return () => clearTimeout(timer);
  }, [searchInput, selectedKategori, selectedSimpulJaringan, group, sortOrder]);

  const getSimpulJaringanList = async () => {
    try {
      const response = await fetch(
        "https://jakartasatu.jakarta.go.id/apimobile/internal/backend/katalog-data/list-simpul-jaringan"
      );
      const data = await response.json();
      setSimpulJaringanList(data);
    } catch (error) {
      console.error("Error fetching simpul jaringan data:", error);
    }
  };

   // Handle pencarian simpul jaringan
   const handleSearchSimpulJaringan = (event) => {
    const searchTerm = event.target.value;
    setSearchSimpulJaringan(searchTerm);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm);
    
  };

  // Filter simpul jaringan berdasarkan pencarian
  const filteredSimpulJaringan = simpulJaringanList
    ? simpulJaringanList.filter((item) =>
        item.simpul_jaringan
          .toLowerCase()
          .includes(searchSimpulJaringan.toLowerCase())
      )
    : [];

  const kategoriOptions = data?.maps
    ? data.maps
        .filter(
          (group) => group.name && group.name.toLowerCase() !== "semua data"
        )
        .map((group) => group.name)
    : [];

  useEffect(() => {
    getSimpulJaringanList();
  }, []);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: "40px",
    backgroundColor: "white",
    marginTop: "50px",
    outline: "1.5px solid #00357766",
    "&:hover": {
      backgroundColor: "white",
    },
    width: "672px",
    height: "39px",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    color: "#003577",
    fontWeight: 500,
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    opacity: "0.4",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "rgba(0, 53, 119)", // 40% opacity (66 in HEX = ~40%, a6 is closer)
    fontWeight: 500,
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "600px",
        "&:focus": {
          width: "600px",
        },
      },
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jakartasatu.jakarta.go.id/apimobile/internal/backend/katalog-data/public2"
        );
        if (!response.ok) {
          setApiActive(false);
          throw new Error("API Response was not ok");
        } else {
          setApiActive(true);
        }
        const responseData = await response.json();

        const sortedMaps = responseData.maps.map((group) => {
          const filteredLayers = group.layers
            .filter((layer) => layer.nama_alias !== null)
            .map((layer) => ({
              ...layer,
              kategori: group.name, 
            }));
          const sortedLayers = sortLayersByName(filteredLayers);
          return { ...group, layers: sortedLayers };
        });

        const sortedGroups = sortGroupsByName(sortedMaps);
        const sortedData = { ...responseData, maps: sortedGroups };

        setData(sortedData);

        let allLayers = [];
        sortedData.maps.forEach((group) => {
          group.layers.forEach((layer) => {
            allLayers.push(layer);
          });
        });

        allLayers = sortLayersByName(allLayers);

        const allLayersGroup = {
          name: "SEMUA DATA",
          layers: allLayers,
        };

        setAllLayer(allLayersGroup);

        if (!currentGroupName) {
          setGroup(allLayersGroup);
          setCurrentGroupName(allLayersGroup.name);
          setFilteredLayers(allLayers); 
        } else {
          const currentGroup = sortedData.maps.find(g => g.name === currentGroupName) || allLayersGroup;
          setFilteredLayers(currentGroup.layers);
        }
      } catch (error) {
        console.error("Error fetching API: ", error);
      }
    };

    if (view) {
      fetchData();
    }
  }, [view]);
  
  return (
    <Box
      sx={{
        ...modalStyle,
        backgroundColor: "#F7F6FF",
        width: "711px",
        height: "552px",
        border: "none",
        outline: "none",
      }}
      id="box-catalog"
      display={"flex"}
    >
       <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 48,                   // angka → px otomatis
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,                        // padding-left/right = theme.spacing(2)
          bgcolor: "#003577",
          borderRadius: "8px 8px 0 0",
          color: "white",
        }}
      >
       <Typography variant="h6" sx={{ fontSize: "18px", justifyContent: "center", fontWeight: "500" }}>
          {bahasa === "ID" ? "Katalog Layer" : "Layer Catalogue"}
        </Typography>
          <IconButton
            onClick={handleCatalogToggle}
            sx={{
                  width: "40px",
                  height: "40px",
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  transform: "translateY(-50%)",
                  marginRight: "15px",
                  alignItems: "center",
                  padding: "8px",
                  "&:hover": {backgroundColor: "rgba(255, 255, 255, 0.1)",},
                  zIndex: 10,}}
                  id="close-catalog-button"
                  disableRipple={false}
            >
              <Close />
          </IconButton>
      </Box>
         
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ padding: "8px 16px" }}>
          <Search sx={{ flex: 1, marginTop: "35px" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={bahasa === "ID" ? "Cari" : "Search"}
              inputProps={{ "aria-label": "search" }}
              value={searchInput}
              onChange={handleSearchChange}
              ref={searchInputRef}
              // Add autoFocus attribute to maintain focus on input
              autoFocus={searchInput.length > 0}
            />
          </Search>
        </Toolbar>
      </Box>
      {apiActive ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "80%",
            width: "100%",
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              flexGrow: 1,
              overflow: "hidden",
            }}
          >
            {/* data dropdown */}
            <Box
              sx={{
                height: "420px",
                width: "202px",
              }}
            >
              <Stack
                direction="column"
                gap={2}
                justifyContent="flex-start"
                alignItems="space-between"
                sx={{ height: "100%" }}
              >
                {/* Box Kategori KUGI */}
                <Box
                  sx={{
                    flex: isMinimizedKategori ? "0 0 auto" : "1",
                    transition: "flex 0.3s ease",
                    width: "100%",
                    marginTop: "0px",
                    marginLeft: "6px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "8px",
                    background: "white",
                    border: "1px solid #DFE6E9",
                    overflow: "hidden",
                  }}
                >
                  {/* Header Kategori KUGI */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: isMinimizedKategori
                        ? "8px"
                        : "8px 8px 0px 0px",
                      background: "#003577",
                      padding: "10px 12px 10px 28px",
                      height: "40px",
                    }}
                  >
                    <Typography
                      variant="p"
                      sx={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Kategori KUGI
                    </Typography>
                    <IconButton
                      onClick={() =>
                        setIsMinimizedKategori(!isMinimizedKategori)
                      }
                      sx={{ color: "white" }}
                    >
                      {isMinimizedKategori ? (
                        <ExpandMoreIcon />
                      ) : (
                        <ExpandLessIcon />
                      )}
                    </IconButton>
                  </Box>
  
                  {/* Scrollable Wrapper with consistent scrollbar */}
                  <Box
                    sx={{
                      flex: 1,
                      minHeight: 0,
                      overflowY: "auto",
                      background:
                        kategoriOptions.length > 0 ? "white" : "transparent",
                      borderRadius: "0 0 8px 8px",
                      "::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "::-webkit-scrollbar-track": {
                        borderRadius: "4px",
                        margin: "10px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "#003577",
                        borderRadius: "5px",
                      },
                      "::-webkit-scrollbar-thumb:hover": {
                        background: "#002b5e",
                      },
                      display: isMinimizedKategori ? "none" : "block",
                    }}
                  >
                    {/* Content Kategori KUGI */}
                    {kategoriOptions.map((kategori) => (
                      <MenuItem
                        key={kategori}
                        value={kategori}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textTransform: "capitalize",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        <Checkbox
                          checked={selectedKategori.includes(kategori)}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedKategori((prev) => [...prev, kategori]);
                            } else {
                              setSelectedKategori((prev) =>
                                prev.filter((item) => item !== kategori)
                              );
                            }
                          }}
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
                          sx={{ padding: "5px 10px 5px 0" }}
                        />
                        <ListItemText
                          primary={kategori
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                          primaryTypographyProps={{
                            fontSize: 14,
                            color: "#4B4B4B",
                          }}
                          sx={{ marginTop: "2px" }}
                        />
                      </MenuItem>
                    ))}
                  </Box>
                </Box>
  
                {/* Box Simpul Jaringan */}
                <Box
                  sx={{
                    flex: isMinimizedSimpul ? "0 0 auto" : "1",
                    transition: "flex 0.3s ease",
                    width: "100%",
                    marginTop: "0px",
                    marginLeft: "6px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "8px",
                    background: "white",
                    border: "1px solid #DFE6E9",
                    overflow: "hidden",
                  }}
                >
                  {/* Header Simpul Jaringan */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: isMinimizedSimpul
                        ? "8px"
                        : "8px 8px 0px 0px",
                      background: "#003577",
                      padding: "10px 12px 10px 28px",
                      height: "40px",
                    }}
                  >
                    <Typography
                      variant="p"
                      sx={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Simpul Jaringan
                    </Typography>
                    <IconButton
                      onClick={() => setIsMinimizedSimpul(!isMinimizedSimpul)}
                      sx={{ color: "white" }}
                    >
                      {isMinimizedSimpul ? (
                        <ExpandMoreIcon />
                      ) : (
                        <ExpandLessIcon />
                      )}
                    </IconButton>
                  </Box>
  
                  {/* Single scrollable container for Simpul Jaringan */}
                  <Box
                    sx={{
                      flex: 1,
                      minHeight: 0,
                      overflowY: "auto",
                      background: "white",
                      borderRadius: "0 0 8px 8px",
                      "::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "::-webkit-scrollbar-track": {
                        borderRadius: "4px",
                        margin: "10px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "#003577",
                        borderRadius: "5px",
                      },
                      "::-webkit-scrollbar-thumb:hover": {
                        background: "#002b5e",
                      },
                      display: isMinimizedSimpul ? "none" : "block",
                      padding: "10px",
                    }}
                  >
                    {/* Search box for Simpul Jaringan */}
                    <OutlinedInput
                      type="search"
                      placeholder="Cari simpul jaringan"
                      onChange={handleSearchSimpulJaringan}
                      value={searchSimpulJaringan}
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "rgba(0, 53, 119, 0.3)" }} />
                        </InputAdornment>
                      }
                      sx={{
                        fontFamily: "var(--font-family)",
                        fontSize: "11.5px",
                        width: "180px",
                        maxWidth: "500px",
                        height: "30px",
                        paddingRight: "10px",
                        textAlign: "right",
                        borderRadius: "40px",
                        background: "white",
                        border: "1px solid rgba(0, 69, 129, 0.30)",
                        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.05)",
                        "&:hover": {
                          borderColor: "#003577",
                        },
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                    />
  
                    {/* List of simpul jaringan items without additional scrollbar */}
                    <Box sx={{ marginTop: "10px" }}>
                    {filteredSimpulJaringan.map((item) => (
                      <MenuItem
                        key={item.simpul_jaringan}
                        value={item.simpul_jaringan}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textTransform: "capitalize",
                          fontSize: "14px",
                          fontWeight: "500",
                          width: "100%",
                          padding: "0 5px",
                          // Add margin between items for better spacing
                          marginBottom: "8px", // Add space between list items
                        }}
                      >
                        <Checkbox
                          checked={selectedSimpulJaringan.includes(item.simpul_jaringan)}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedSimpulJaringan((prev) => [
                                ...prev,
                                item.simpul_jaringan,
                              ]);
                            } else {
                              setSelectedSimpulJaringan((prev) =>
                                prev.filter((s) => s !== item.simpul_jaringan)
                              );
                            }
                          }}
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
                          sx={{ 
                            padding: "5px 10px 5px 0",
                            // Increase spacing around the checkbox
                            marginRight: "4px"
                          }}
                        />
                        <ListItemText
                          primary={item.simpul_jaringan}
                          primaryTypographyProps={{
                            fontSize: 14,
                            color: "#4B4B4B",
                            whiteSpace: "normal",
                            overflow: "visible",
                            textOverflow: "clip",
                            // Improve text spacing
                            paddingTop: "2px",
                            paddingBottom: "2px",
                          }}
                          sx={{ marginTop: "2px" }}
                        />
                      </MenuItem>
                    ))}
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Box>
  
            <Box
              sx={{
                width: "448px",
                height: "420px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%", 
                  maxHeight: "420px",
                  overflowY: "auto",
                  justifyContent: "center",
                  "::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "::-webkit-scrollbar-track": {
                    borderRadius: "4px",
                    margin: "10px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#003577",
                    borderRadius: "5px",
                  },
                  "::-webkit-scrollbar-thumb:hover": {
                    background: "#002b5e",
                  },
                  padding: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1.5px solid #00357733",
                  paddingLeft: "30px",
                }}
              >
                {/* Indikator filter */}
                {(selectedKategori.length > 0 || selectedSimpulJaringan.length > 0) && (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      marginBottom: "12px",
                      padding: "8px",
                      backgroundColor: "#F0F7FF",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#003577", fontWeight: "500" }}>
                      Hasil Filter Berdasarkan :
                    </Typography>
                    {selectedKategori.length > 0 && (
                      <Typography variant="body2" sx={{ color: "#003577" }}>
                        {selectedKategori.length} Katalog Unsur Geografi Indonesia (KUGI)
                      </Typography>
                    )}
                    {selectedSimpulJaringan.length > 0 && (
                      <Typography variant="body2" sx={{ color: "#003577" }}>
                        {selectedSimpulJaringan.length} Simpul Jaringan
                      </Typography>
                    )}
                  </Box>
                )}
  
                <Grid container spacing={2} columnSpacing={4} sx={{ minHeight: "300px" }}>
                  {Array.from(
                    new Map(filteredLayers.map(layer => [layer.id_data, layer])).values()
                  ).map((layer) => {
                    const isLayerActive = addedLayers?.length > 0 &&
                      addedLayers.some((e) => e.id == layer.id_data);

                    return (
                      <Grid
                        item
                        xs={6}
                        key={`card-${layer.id_data}`}
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          columnGap: '3px',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            width: '100%',
                            padding: '8px 0',
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: '#f7f9fc',
                              borderRadius: '4px',
                            }
                          }}
                          onClick={() => {
                            isLayerActive ? removeLayer(layer) : addLayer(layer);
                          }}
                          className={`layer-toggle-box-${layer.id_data}`}
                        >
                          <FormControlLabel
                            control={<IOSSwitch />}
                            value={isLayerActive}
                            checked={isLayerActive}
                            sx={{ marginRight: "8px" }}
                          />
                          <Typography
                            sx={{
                              fontSize: '14px',
                              fontWeight: 600,
                              padding: 0,
                              margin: 0,
                              color: '#003577CC',
                              flexGrow: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {layer.nama_alias}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
                
                {/* Pesan jika tidak ada hasil */}
                {filteredLayers.length === 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                      width: "100%",
                      marginTop: "16px",
                    }}
                  >
                    <Typography sx={{ color: "#003577", fontStyle: "italic" }}>
                      {bahasa === "ID" ? "Tidak ada hasil" : "No results found"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: "80%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "#003577", fontStyle: "italic" }}>
            {bahasa === "ID"
              ? "Gagal memuat data. Silakan coba lagi nanti."
              : "Failed to load data. Please try again later."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Catalog;
