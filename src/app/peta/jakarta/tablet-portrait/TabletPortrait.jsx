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

import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Layers,
  Menu,
  MenuOpen,
} from "@mui/icons-material";

import MeasurementArea from "../components/MeasureArea";
import MeasurementLine from "../components/MeasureLine";
import Zoom from "../components/Zoom";
import Kordinat from "../components/Kordinat";
import Locate from "../components/Locate";
import Bahasa from "../components/Bahasa";
import FullScreen from "../components/FullScreen";
import Home from "../components/Home";

import LayerList from "./LayerList";
import LayerQuery from "./LayerQuery";
import LayerInfo from "./LayerInfo";
import Catalog from "./Catalog";
import Search from "./Search";
import BasemapWidget from "./BasemapWidget";

import Navbar from "@/components/navbar/navbar";
import "@/components/navbar/style.css";
import UploadData from "../components/UploadData";
import PopUp from "./PopUp.jsx";


const modalStyle = {
  position: "absolute",
  flexDirection: "column",
  justifyContent: "space-between",
  top: "50vh",
  left: "50vw",
  transform: "translate(-50%, -50%)",
  width: "65vw",
  height: "60vh",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  borderRadius: 4,
  color: "black",
  zIndex: 999
};

const TabletLandscape = () => {
  const mapRef = useRef();
  const tableRef = useRef([]);
  const [view, setView] = useState();
  const [basemapDKI, setBasemapDKI] = useState();
  const [addedLayers, setAddedLayers] = useState([]);
  const [draw, setDraw] = useState();
  const [drawStatus, setDrawStatus] = useState(false);
  const [drawingType, setDrawingType] = useState();
  const [tableOpen, setTableOpen] = useState(false);
  const [infoLayerOpen, setInfoLayerOpen] = useState(false);
  const [layerList, setLayerList] = useState([]);
  const [mejaKerjaOpen, setMejaKerjaOpen] = useState(true);
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
  const [openPopup, setOpenPopup] = useState(false);
  const [layerChange, setLayerChange] = useState(false);
  const [popUpCoordinate, setPopUpCoordinate] = useState(null);

  const tableToggle = () => setTableOpen(!tableOpen);
  const mejaKerjaToggle = () => setMejaKerjaOpen(!mejaKerjaOpen);
  const handleCatalogToggle = () => setCatalogOpen(!catalogOpen);
  const handleRemoveAll = () => {
    setAddedLayers([]);
    view.map.removeMany(
      view.map.layers.items.filter((layer) => layer.title !== "Locate User")
    );
    const tables = document.querySelectorAll(".table-element");
    tables.forEach((element) => {
      element.innerHTML = "";
    });
  };

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
          flexDirection: "row",
          top: "110px",
          right: "2%",
          alignItems: "flex-start",
          columnGap: "7px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "7px",
            alignItems: "flex-end",
          }}
        >
          <Search view={view} width={"250px"} height={"40px"} bahasa={bahasa}/>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "7px",
            alignItems: "flex-end",
          }}
        >
          <Bahasa buttonSize={"40px"} tooltip={"left"} bahasa={bahasa} setBahasa={setBahasa}/>
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "7px",
            alignItems: "flex-end",
          }}
        >
          <FullScreen buttonSize={"40px"} tooltip={"left"} />
          <Home
            view={view}
            buttonSize={"40px"}
            center={[106.826959, -6.176923]}
            zoom={15}
            tooltip={"left"}
          />
          <Locate view={view} buttonSize={"40px"} tooltip={"left"} />
          <BasemapWidget
            view={view}
            buttonSize={"40px"}
            imageSize={34}
            basemapDKI={basemapDKI}
            tooltip={"left"}
          />
        </Box>
      </Box>
      {/* BOT RIGHT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          position: "absolute",
          right: "2%",
          bottom: tableOpen ? "30%" : "2%",
          rowGap: "7px",
        }}
      >
        <Zoom view={view} buttonSize={"40px"} />
        <Kordinat view={view} />
      </Box>
      {/* BOT MID */}
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          width: "100%",
          height: tableOpen ? "30%" : "28px",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        id="layer-table-content"
      >
        <Box
          sx={{
            display: "flex",
            width: "120px",
            height: "28px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          {tableOpen ? (
            <IconButton
              onClick={tableToggle}
              sx={{
                color: "black",
                backgroundColor: "white",
                width: "100%",
                height: "100%",
              }}
              className="open-table"
            >
              <KeyboardArrowDown />
            </IconButton>
          ) : (
            <IconButton
              onClick={tableToggle}
              sx={{
                color: "black",
                backgroundColor: "white",
                width: "100%",
                height: "100%",
              }}
              className="open-table"
            >
              <KeyboardArrowUp />
            </IconButton>
          )}
        </Box>
        {tableOpen && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
            id="layer-table-content"
          >
            <Box
              sx={{ width: "100%", height: "100%" }}
              className="table-element"
            />
          </Box>
        )}
      </Box>
      {/* TOP LEFT */}
 <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: "10px",
          position: "absolute",
          left: "2%",
          top: "110px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "48px",
            height: "48px",
            backgroundColor: "#003577",
            borderRadius: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
          id="meja-kerja-desktop"
        >
          {mejaKerjaOpen ? (
            <IconButton onClick={mejaKerjaToggle} sx={{ color: "white" }}>
              <MenuOpen />
            </IconButton>
          ) : (
            <IconButton onClick={mejaKerjaToggle} sx={{ color: "white" }}>
              <Menu />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: mejaKerjaOpen ? "300px" : "0px",
          height: mejaKerjaOpen ? (tableOpen ? "45%" : "65%") : "0px", 
          maxHeight: "calc(100vh - 200px)", 
          minHeight: mejaKerjaOpen ? "400px" : "0px",
          display: "flex",
          flexDirection: "column",
          position: "fixed", 
          left: "2%",
          top: "168px",
          backgroundColor: "white",
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "13px",
          paddingBottom: "13px",
          zIndex: 1000,
          overflow: "hidden", 
          transition: "width 0.3s ease, height 0.3s ease",
        }}
        id="isi-meja-kerja-desktop"
      >
        {mejaKerjaOpen && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                height: "50px", 
                flexShrink: 0,
              }}
            >
              <Button
                sx={{
                  width: "90%",
                  height: "40px", 
                  color: "white",
                  backgroundColor: "#003577",
                  borderRadius: 2,
                  fontWeight: "600",
                  fontSize: "16px", 
                  textTransform: "capitalize",
                  "&:hover": { backgroundColor: "#003577", color: "white" },
                }}
                onClick={handleCatalogToggle}
                endIcon={<Layers />}
                id="tombol-catalog-layer-desktop"
              >
                {bahasa === "ID" ? "Katalog Layer" : "Layer Catalogue"}
              </Button>
            </Box>
            <Box 
              sx={{ 
                display: "flex", 
                width: "90%", 
                flex: 1,
                minHeight: 0, 
                overflow: "hidden", 
              }}
            >
              <LayerList
                view={view}
                addedLayers={addedLayers}
                infoLayerOpen={infoLayerOpen}
                setInfoLayerOpen={setInfoLayerOpen}
                layerList={layerList}
                modalStyle={modalStyle}
                setAddedLayers={setAddedLayers}
                setLayerList={setLayerList}
                setTableOpen={setTableOpen}
                setTableLayer={setTableLayer}
                setSelectedLayer={setSelectedLayer}
                setQueryOpen={setQueryOpen}
                bahasa={bahasa}
                setOpenPopup={setOpenPopup}         
                setPopUpCoordinate={setPopUpCoordinate}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                height: "50px", 
                flexShrink: 0, 
              }}
            >
              <Button
                sx={{
                  width: "90%",
                  height: "40px", 
                  color: "white",
                  backgroundColor: "#ff1a1a",
                  borderRadius: 2,
                  fontWeight: "600",
                  fontSize: "16px", 
                  textTransform: "capitalize",
                  "&:hover": { backgroundColor: "#ff1a1a", color: "white" },
                }}
                onClick={handleRemoveAll}
                endIcon={<Delete />}
              >
                {bahasa === "ID" ? "Hapus Semua" : "Remove All"}
              </Button>
            </Box>
          </>
        )}
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
        <Box sx={{position: "absolute", display: "flex", right: "5%", bottom: tableOpen ? "35%" : "15%",}}>
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

export default TabletLandscape;
