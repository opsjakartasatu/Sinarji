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

import { Box, IconButton, Tab } from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
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
  top: "55vh",
  left: "50vw",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "65vh",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: "5px",
  borderRadius: 4,
  color: "black",
  zIndex: 999
};

const MobileLandscape = () => {
  const mapRef = useRef();
  const tableRef = useRef([]);
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

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const panelToggle = () => setPanelOpen(!panelOpen);
  const handleCatalogToggle = () => setCatalogOpen(!catalogOpen);

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
      basemap: "satellite", // ganti basemap default
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
          top: "0px",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: "50px",
            backdropFilter: "blur(10px)",
            position: "fixed",
            height: "67px",
            width: panelOpen ? "60vw" : "97vw",
            marginTop: "14px",
            padding: "0 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: "14px",
            zIndex: 999,
            left: "1.5vw",
          }}
        >
          <Navbar halamanPetaJakarta={halamanPetaJakarta} />
        </div>
      </Box>
      {/*TOP LEFT*/}
      <Box
        sx={{
          position: "absolute",
          left: "1.5vw",
          top: "20%",
          display: "flex",
          flexDirection: "row",
          columnGap: "5px",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
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
            id="tombol-catalog-layer-tablet-landscape"
          >
            <Layers />
          </IconButton>
          <Home
            buttonSize={"40px"}
            view={view}
            center={[106.826959, -6.176923]}
            zoom={15}
            tooltip={"right"}
          />
          <Locate view={view} buttonSize={"40px"} tooltip={"right"}/>
          <Bahasa buttonSize={"40px"} tooltip={"right"} bahasa={bahasa} setBahasa={setBahasa}/>
          <MeasurementArea
            view={view}
            buttonSize={"40px"}
            draw={draw}
            drawStatus={drawStatus}
            drawingType={drawingType}
            setDrawStatus={setDrawStatus}
            setDrawingType={setDrawingType}
            tooltip={"right"}
          />
          <MeasurementLine
            view={view}
            buttonSize={"40px"}
            draw={draw}
            drawStatus={drawStatus}
            drawingType={drawingType}
            setDrawStatus={setDrawStatus}
            setDrawingType={setDrawingType}
            tooltip={"right"}
          />
          
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: "calc(1.5vw + 45px)",
          top: "20%",
          display: "flex",
          flexDirection: "row",
          columnGap: "5px",
          alignItems: "flex-start",
        }}
      >
         <UploadData
          view={view} 
          setLayerChange={setLayerChange}
          buttonSize={"40px"}
         />
        <Search width={"200px"} view={view} height={"40px"} bahasa={bahasa}/>
      </Box>
      {/*RIGHT MID*/}
      <Box
        sx={{
          height: "100%",
          width: panelOpen ? "37vw" : "30px",
          display: "flex",
          top: "0px",
          right: "0px",
          position: "absolute",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            height: "50px",
            backgroundColor: "white",
            width: "30px",
            top: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "9px 0px 0px 9px",
            transform: panelOpen ? "translate(-30px)" : "translate(0px)",
          }}
        >
          <IconButton onClick={panelToggle}>
            {panelOpen ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
        </Box>
        {panelOpen && (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              backgroundColor: "white",
              position: "absolute",
              bottom: "0px",
              left: "0px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <TabContext value={tabvalue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <Tab label={bahasa === "ID" ? "Daftar Layer" : "Layer List"} value="1" />
                  <Tab label={bahasa === "ID" ? "Tabel" : "Table"} value="2" />
                </TabList>
              </Box>
              <TabPanel 
                value="1" 
                sx={{ 
                  width: "100%", 
                  height: "auto",
                  padding: "0",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  top: "49px",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }}
              >
                <Box sx={{ 
                  display: "flex", 
                  width: "100%", 
                  height: "100%",
                  flexDirection: "column",
                  padding: "16px"
                }}>
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
                    tableRef={tableRef}
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
                sx={{ 
                  width: "100%", 
                  height: "100%",
                  padding: "0",
                  position: "absolute",
                  top: "49px",
                  bottom: "0",
                  left: "0",
                  right: "0"
                }}
                id="table-panel"
              >
              </TabPanel>
            </TabContext>
          </Box>
        )}
      </Box>
      {/* BOT LEFT */}
      <Box sx={{ left: "1.5vw", bottom: "5%", position: "absolute" }}>
        <BasemapWidget
          basemapDKI={basemapDKI}
          buttonSize={"40px"}
          imageSize={34}
          view={view}
          tooltip={"top"}
        />
      </Box>
      {/*Window Area*/}
      <Box>
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

export default MobileLandscape;