"use client";

import React, { useEffect, useRef, useState } from "react";

import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Map from "@arcgis/core/Map";
import Draw from "@arcgis/core/views/draw/Draw";
import MapView from "@arcgis/core/views/MapView";
import Popup from "@arcgis/core/widgets/Popup";
import FeatureTable from "@arcgis/core/widgets/FeatureTable";
import "@arcgis/core/assets/esri/themes/light/main.css";

import { Box, Button, IconButton, Tab, Typography } from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Layers,
} from "@mui/icons-material";

import MeasurementArea from "../components/MeasureArea";
import MeasurementLine from "../components/MeasureLine";
import Locate from "../components/Locate";
import Bahasa from "../components/Bahasa";
import Home from "../components/Home";

import LayerList from "./LayerList";
import LayerQuery from "./LayerQuery";
import LayerInfo from "./LayerInfo";
import Catalog from "./Catalog";
import Search from "./Search";
import BasemapWidget from "./BasemapWidget";

import Navbar from "@/components/navbar/navbar";
import "@/components/navbar/style.css";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UploadData from "../components/UploadData";
import PopUp from "./PopUp.jsx";

const modalStyle = {
  position: "absolute",
  flexDirection: "column",
  justifyContent: "space-between",
  top: "50vh",
  left: "50vw",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "70vh",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  borderRadius: 4,
  color: "black",
  zIndex: 999
};

const MobilePortrait = () => {
  const mapRef = useRef();
  const tablePanelRef = useRef(null);
  const [view, setView] = useState();
  const [basemapDKI, setBasemapDKI] = useState();
  const [addedLayers, setAddedLayers] = useState([]);
  const [draw, setDraw] = useState();
  const [drawStatus, setDrawStatus] = useState(false);
  const [drawingType, setDrawingType] = useState();
  const [panelOpen, setPanelOpen] = useState(false);
  const [infoLayerOpen, setInfoLayerOpen] = useState(false);
  const [layerList, setLayerList] = useState([]);
  const [tableLayer, setTableLayer] = useState();
  const [featureTable, setFeatureTable] = useState(null);
  const [queryOpen, setQueryOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [allLayer, setAllLayer] = useState("");
  const [data, setData] = useState();
  const [group, setGroup] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [currentGroupName, setCurrentGroupName] = useState("");
  const [bahasa, setBahasa] = useState("ID");
  const [layerChange, setLayerChange] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [popUpCoordinate, setPopUpCoordinate] = useState(null);

  const [tabvalue, setTabValue] = useState("1");
  const tableToggle = () => setTableOpen(!tableOpen);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const panelToggle = () => setPanelOpen(!panelOpen);
  const handleCatalogToggle = () => setCatalogOpen(!catalogOpen);

  // Function to create feature table when a layer is selected
  const createFeatureTable = (layer) => {
    if (!layer || !view || !tablePanelRef.current) return;
    
    // Clean up previous table if exists
    if (featureTable) {
      featureTable.destroy();
    }
    
    // Clear the table container
    while (tablePanelRef.current.firstChild) {
      tablePanelRef.current.removeChild(tablePanelRef.current.firstChild);
    }
    
    // Create a new container for the feature table
    const tableContainer = document.createElement("div");
    tableContainer.style.width = "100%";
    tableContainer.style.height = "100%";
    tablePanelRef.current.appendChild(tableContainer);
    
    // Create the new feature table
    const table = new FeatureTable({
      view: view,
      layer: layer,
      container: tableContainer,
      visibleElements: {
        header: true,
        menu: true,
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      }
    });
    
    setFeatureTable(table);
    // Automatically switch to table tab when a table is created
    setTabValue("2");
  };

  // Effect to create feature table when tableLayer changes
  useEffect(() => {
    if (tableLayer) {
      createFeatureTable(tableLayer);
    }
  }, [tableLayer, view]);

  useEffect(() => {
    const basemap2020 = new Basemap({
      title: "Peta Dasar 2020",
      thumbnailUrl:
        "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/afe064255a184168ae05628587819480/data",
      baseLayers: new TileLayer({
        title: "Peta Dasar 2020",
        url: "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/Peta_Dasar_DKI_Jakarta/MapServer",
      }),
    });
    setBasemapDKI(basemap2020);
    const map = new Map({
      basemap: "satellite", 
    });
    const view = new MapView({
      map: map,
      zoom: 15,
      center: [106.826959, -6.176923],
      container: mapRef.current,
      ui: {
        components: [],
      },
      popup: new Popup({
        defaultPopupTemplateEnabled: true,
        dockEnabled: false,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false,
        },
        visibleElements: {
          closeButton: true,
        },
      }),
    });
    const draw = new Draw({
      view: view,
    });
    setDraw(draw);
    setView(view);
    return () => {
      if (featureTable) {
        featureTable.destroy();
      }
      map.destroy();
      view.destroy();
    };
  }, []);

  const [halamanPetaJakarta, setHalamanPetaJakarta] = useState(true);

  useEffect(() => {
    setHalamanPetaJakarta(true);
  }, []);

  return (
    <Box ref={mapRef} id="map-view" sx={{ width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          left: "50%",
        }}
      >
        <div className="navbarPeta">
          <Navbar halamanPetaJakarta={halamanPetaJakarta} />
        </div>
      </Box>
      {/* TOP RIGHT */}
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          top: "12%",
          right: "2%",
          alignItems: "flex-end",
          rowGap: "7px",
        }}
      >
        <Home
          view={view}
          buttonSize={"40px"}
          center={[106.826959, -6.176923]}
          zoom={15}
          tooltip={"left"}
        />
        <Locate view={view} buttonSize={"40px"} tooltip={"left"} />
        <Bahasa buttonSize={"38px"} tooltip={"left"} bahasa={bahasa} setBahasa={setBahasa} />
        <UploadData
          view={view}
          setLayerChange={setLayerChange}
          buttonSize={"40px"}
          tooltip={"left"}
        />
        <MeasurementArea
          view={view}
          buttonSize={"40px"}
          draw={draw}
          drawStatus={drawStatus}
          setDrawStatus={setDrawStatus}
          drawingType={drawingType}
          setDrawingType={setDrawingType}
          tooltip={"left"}
        />
        <MeasurementLine
          view={view}
          buttonSize={"40px"}
          draw={draw}
          drawStatus={drawStatus}
          setDrawStatus={setDrawStatus}
          drawingType={drawingType}
          setDrawingType={setDrawingType}
          tooltip={"left"}
        />
        <BasemapWidget
          view={view}
          buttonSize={"40px"}
          imageSize={34}
          basemapDKI={basemapDKI}
          tooltip={"left"}
        />
      </Box>
      {/* TOP MID */}
      <Box
        sx={{
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        <Search view={view} height={"40px"} width={"250px"} bahasa={bahasa} />
      </Box>
      {/* TOP LEFT */}
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          top: "12%",
          left: "2%",
          alignItems: "flex-end",
          rowGap: "7px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            rowGap: "7px",
          }}
        >
          <IconButton
            sx={{
              display: "flex",
              width: "40px",
              height: "40px",
              borderRadius: "5px",
              backgroundColor: "white",
              ":hover": { backgroundColor: "white" },
            }}
            onClick={() => setCatalogOpen(true)}
            id="tombol-catalog-layer-mobile-portrait"
          >
            <Layers />
          </IconButton>
        </Box>
      </Box>
      {/* BOT MID */}
      <Box
        sx={{
          height: panelOpen ? "320px" : "30px",
          width: "100%",
          display: "flex",
          bottom: "0px",
          left: "0px",
          position: "absolute",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            height: "30px",
            backgroundColor: "white",
            width: "50px",
            left: "50%",
            transform: "translate(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "9px 9px 0px 0px",
          }}
        >
          <IconButton onClick={panelToggle} id="toggle-bottom-panel">
            {panelOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </IconButton>
        </Box>
        {panelOpen && (
          <Box
            sx={{
              width: "100%",
              height: "290px",
              backgroundColor: "white",
              position: "absolute",
              bottom: "0px",
              left: "0px",
            }}
            id="bottom-panel"
          >
            <TabContext value={tabvalue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <Tab label={bahasa === "ID" ? "Daftar Layer" : "Layer List"} value="1" />
                  <Tab 
                    label={bahasa === "ID" ? "Tabel" : "Table"} 
                    value="2" 
                    disabled={!tableLayer}
                  />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ width: "100%", height: "210px", overflow: "auto" }}>
                <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
                  <LayerList
                    view={view}
                    addedLayers={addedLayers}
                    infoLayerOpen={infoLayerOpen}
                    setInfoLayerOpen={setInfoLayerOpen}
                    layerList={layerList}
                    modalStyle={modalStyle}
                    setAddedLayers={setAddedLayers}
                    setLayerList={setLayerList}
                    setTableOpen={setPanelOpen}
                    setTableLayer={setTableLayer}
                    setQueryOpen={setQueryOpen}
                    setSelectedLayer={setSelectedLayer}
                    bahasa={bahasa}
                    setTabValue={setTabValue}
                    setOpenPopup={setOpenPopup}         
                    setPopUpCoordinate={setPopUpCoordinate}
                  />
                </Box>
              </TabPanel>
              <TabPanel
                value="2"
                sx={{ width: "100%", height: "210px", padding: "0px" }}
                id="table-panel"
              >
                <Box 
                  ref={tablePanelRef} 
                  sx={{ width: "100%", height: "100%", overflow: "auto" }}
                >
                  {!tableLayer && (
                    <Typography align="center" sx={{ mt: 2 }}>
                      {bahasa === "ID" 
                        ? "Silakan pilih layer untuk menampilkan tabel" 
                        : "Please select a layer to display table"}
                    </Typography>
                  )}
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        )}
      </Box>
      {/*Window Area*/}
      <Box>
        {catalogOpen && (
          <Catalog
            view={view}
            data={data}
            setData={setData}
            addedLayers={addedLayers}
            setAddedLayers={setAddedLayers}
            allLayer={allLayer}
            setAllLayer={setAllLayer}
            group={group}
            setGroup={setGroup}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleCatalogToggle={handleCatalogToggle}
            modalStyle={modalStyle}
            currentGroupName={currentGroupName}
            setCurrentGroupName={setCurrentGroupName}
            bahasa={bahasa}
            setOpenPopup={setOpenPopup}
            setPopUpCoordinate={setPopUpCoordinate}
          />
        )}
      </Box>
      <Box
        display={infoLayerOpen ? "flex" : "none"}
        sx={modalStyle}
        id="layer-info-content"
      >
        {selectedLayer && (
          <LayerInfo
            layer={selectedLayer}
            setInfoLayerOpen={setInfoLayerOpen}
          />
        )}
      </Box>
      <Box
        display={queryOpen ? "flex" : "none"}
        sx={modalStyle}
        id="layer-query-content"
      >
        {selectedLayer && (
          <LayerQuery
            view={view}
            layer={selectedLayer}
            queryOpen={queryOpen}
            setQueryOpen={setQueryOpen}
          />
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          right: "5%",
          bottom: tableOpen ? "35%" : "10%",
          transition: "bottom 0.3s ease",
        }}
      >
        {openPopup && popUpCoordinate && (
          <PopUp
            view={view} 
            setOpenPopup={setOpenPopup} 
            popUpCoordinate={popUpCoordinate} 
          />
        )}
      </Box>
    </Box>
  );
};

export default MobilePortrait;