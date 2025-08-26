import "@arcgis/core/assets/esri/themes/light/main.css";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Draw from "@arcgis/core/views/draw/Draw";
import Popup from "@arcgis/core/widgets/Popup";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Desktop from "./screen/Desktop";
import TabletLandscape from "./screen/TabletLandscape";
import FeatureTable from "@arcgis/core/widgets/FeatureTable";
import TabletPortrait from "./screen/TabletPortrait";
import MobilePortrait from "./screen/MobilePortrait";
import MobileLandscape from "./screen/MobileLandscape";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Basemap from "@arcgis/core/Basemap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import Navbar from "@/components/navbar/navbar";
import "../../../components/navbar/style.css";

const TourContent = ({ index, nextHandle, stopTour, screenType }) => {
  const content = [
    "Selamat datang di website Jakartasatu",
    "Tersedia berbagai kategori data spasial, silahkan",
    "Ruang tempat layer data yang telah diaktifkan",
    "Buka katalog data spasial",
    "Jelajahi kategori data spasial yang tersedia",
    "Jelajahi list data spasial sesuai kategori",
    "Tambahkan layer ke halaman peta",
    "Tutup window katalog data spasial",
    "Detail dari layer, ada beberapa fungsi yang bisa diterapkan",
    "Mengaktifkan dan menonaktifkan layer bisa dengan klik checkbox",
    "Tombol info layer untuk melihat detail data layer",
    "Info detail layer bisa dilihat disini",
    "Tombol untuk melihat tabel layer",
    "Tabel layer akan muncul disini",
    "Tombol untuk melakukan query layer",
    "Query layer dilakukan dengan menentukan expresi di dalam query window ini",
    "Berikut adalah query Kelurahan Cideng",
    "Tombol untuk menambahkan query",
    "Tombol untuk mereset query",
    "Terapkan expresi query yang sudah dibuat pada layar",
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: "5px" }}>
      <Typography>{content[index]}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", columnGap: "5px" }}>
        <Button sx={{ width: "120px", height: "30px", backgroundColor: "lightblue", borderRadius: "5px", "&:hover": { backgroundColor: "lightblue" } }} onClick={() => nextHandle(screenType)}>
          ({index + 1}/20)Next
        </Button>
        <Button sx={{ width: "50px", height: "30px", backgroundColor: "lightblue", borderRadius: "5px", "&:hover": { backgroundColor: "lightblue" } }} onClick={stopTour}>
          Stop
        </Button>
      </Box>
    </Box>
  );
};

const MapComponent = ({ screenType }) => {
  const mapRef = useRef();
  const tableRef = useRef([]);
  const [view, setView] = useState();
  const [tableOpen, setTableOpen] = useState(false);
  const [mejaKerjaOpen, setMejaKerjaOpen] = useState(false);
  const [draw, setDraw] = useState();
  const [drawStatus, setDrawStatus] = useState(false);
  const [drawingType, setDrawingType] = useState();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [addedLayers, setAddedLayers] = useState([]);
  const [data, setData] = useState();
  const [group, setGroup] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [allLayer, setAllLayer] = useState("");
  const [layerList, setLayerList] = useState([]);
  const [infoLayerOpen, setInfoLayerOpen] = useState(false);
  const [tableLayer, setTableLayer] = useState();
  const [selectedLayer, setSelectedLayer] = useState();
  const [queryOpen, setQueryOpen] = useState(false);
  const [basemapDKI, setBasemapDKI] = useState();

  const handleCatalogToggle = () => setCatalogOpen(!catalogOpen);
  const mejaKerjaToggle = () => setMejaKerjaOpen(!mejaKerjaOpen);
  const tableToggle = () => setTableOpen(!tableOpen);
  const handleRemoveAll = () => {
    setAddedLayers([]);
    view.map.removeMany(view.map.layers.items.filter((layer) => layer.title !== "Locate User"));
    tableRef.current.innerHTML = "";
  };

  useEffect(() => {
    const basemap2020 = new Basemap({
      title: "Peta Dasar 2020",
      thumbnailUrl: "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/afe064255a184168ae05628587819480/data",
      baseLayers: new TileLayer({
        title: "Peta Dasar 2020",
        url: "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/Peta_Dasar_DKI_Jakarta/MapServer",
      }),
    });
    setBasemapDKI(basemap2020);
    const persilBPN = new FeatureLayer({
      url: "https://jakartasatu.jakarta.go.id/server/rest/services/BPN/Bidang_BPN_View/FeatureServer/0",
      title: "Peta Bidang BPN Offline",
      id: 86,
      opacity: 0.5,
      visible: false,
    });
    const batas_rt = new FeatureLayer({
      url: "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/0",
      title: "Batas Administrasi RT",
      id: 49,
      opacity: 0.5,
      visible: false,
    });
    const batas_rw = new FeatureLayer({
      url: "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/1",
      title: "Batas Administrasi RW",
      id: 48,
      opacity: 0.5,
      visible: false,
    });
    const batas_kelurahan = new FeatureLayer({
      url: "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/2",
      title: "Batas Administrasi Kelurahan",
      id: 47,
      opacity: 0.5,
      visible: false,
    });
    const batas_kecamatan = new FeatureLayer({
      url: "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/3",
      title: "Batas Administrasi Kecamatan",
      id: 46,
      opacity: 0.5,
      visible: false,
    });
    const map = new Map({
      basemap: basemap2020,
      layers: [persilBPN, batas_rt, batas_rw, batas_kelurahan, batas_kecamatan],
    });
    setAddedLayers((prevLayers) => [...prevLayers, persilBPN, batas_rt, batas_rw, batas_kelurahan, batas_kecamatan]);
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
  }, []);

  useEffect(() => {
    const tables = document.querySelectorAll(".table-element");
    if (view && screenType && tableLayer && tables) {
      tables.forEach((element) => {
        element.innerHTML = "";
        new FeatureTable({
          view: view,
          layer: tableLayer,
          container: element,
          highlightEnabled: true,
        });
      });
    }
  }, [screenType, tableLayer, view]);

  const nextHandle = (screenType) => {
    setTourState((prevState) => {
      if (prevState.stepIndex < 19) {
        if (prevState.stepIndex === 0) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 1) {
          mejaKerjaToggle();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 2) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 3) {
          if (screenType === "Desktop") {
            document.getElementById("tombol-catalog-layer-desktop").click();
          } else if (screenType === "Tablet Landscape") {
            document.getElementById("tombol-catalog-layer-tablet-landscape").click();
            console.log("Here");
          }
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 4) {
          document.getElementById("list-catalog-group-4").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 5) {
          const buttons = document.getElementsByClassName("button-catalog-11");
          if (buttons[0].childNodes[1].data === "Tambah") {
            buttons[0].click();
          }
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 6) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 7) {
          document.getElementById("close-catalog-button").click();
          document.getElementById("colapse-layer-button-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 8) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 9) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 10) {
          document.getElementById("layer-info-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 11) {
          document.getElementById("layer-info-content-close-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 12) {
          document.getElementById("layer-table-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 13) {
          const buttons = document.getElementsByClassName("open-table");
          buttons[0].click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 14) {
          document.getElementById("layer-query-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 15) {
          const boxQuery = document.getElementById("box-expression-11-0").childNodes;
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 16) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 17) {
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
        if (prevState.stepIndex === 18) {
          document.getElementById("apply-query-11").click();
          const newState = {
            run: true,
            stepIndex: prevState.stepIndex + 1,
            steps: prevState.steps,
          };
          return newState;
        }
      } else {
        document.getElementById("close-query-11").click();
        const newState = {
          run: false,
          stepIndex: 0,
          steps: prevState.steps,
        };
        return newState;
      }
    });
  };

  const stopTour = () => {
    setTourState((prevState) => ({
      ...prevState,
      run: false,
      stepIndex: 0,
    }));
  };

  const generateTourSteps = (screenType) => [
    {
      content: <TourContent index={0} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "center",
      target: "#map-view",
      hideFooter: true,
    },
    {
      content: <TourContent index={1} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "bottom",
      target: screenType === "Desktop" ? "#meja-kerja-desktop" : "#meja-kerja-tablet-landscape",
      hideFooter: true,
    },
    {
      content: <TourContent index={2} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "right",
      target: screenType === "Desktop" ? "#isi-meja-kerja-desktop" : "#isi-meja-kerja-tablet-landscape",
      hideFooter: true,
    },
    {
      content: <TourContent index={3} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "right",
      target: screenType === "Desktop" ? "#tombol-catalog-layer-desktop" : "#tombol-catalog-layer-tablet-landscape",
      hideFooter: true,
    },
    {
      content: <TourContent index={4} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "top",
      target: "#box-catalog",
      hideFooter: true,
    },
    {
      content: <TourContent index={5} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "right",
      target: "#list-catalog-group-4",
      hideFooter: true,
    },
    {
      content: <TourContent index={6} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "bottom",
      target: ".button-catalog-11",
      hideFooter: true,
    },
    {
      content: <TourContent index={7} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "bottom",
      target: "#close-catalog-button",
      hideFooter: true,
    },
    {
      content: <TourContent index={8} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "right",
      target: "#colapse-layer-button-11",
      hideFooter: true,
    },
    {
      content: <TourContent index={9} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "bottom",
      target: "#checkbox-layer-11",
      hideFooter: true,
    },
    {
      content: <TourContent index={10} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "bottom",
      target: "#layer-info-11",
      hideFooter: true,
    },
    {
      content: <TourContent index={11} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "top",
      target: "#layer-info-content",
      hideFooter: true,
    },
    {
      content: <TourContent index={12} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "top",
      target: "#layer-table-11",
      hideFooter: true,
    },
    {
      content: <TourContent index={13} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "top",
      target: "#layer-table-content",
      hideFooter: true,
    },
    {
      content: <TourContent index={14} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "top",
      target: "#layer-query-11",
      hideFooter: true,
    },
    {
      content: <TourContent index={15} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "top",
      target: "#layer-query-content",
      hideFooter: true,
    },
    {
      content: <TourContent index={16} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "right",
      target: "#box-expression-11-0",
      hideFooter: true,
    },
    {
      content: <TourContent index={17} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "right",
      target: "#add-query-11",
      hideFooter: true,
    },
    {
      content: <TourContent index={18} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "right",
      target: "#reset-query-11",
      hideFooter: true,
    },
    {
      content: <TourContent index={19} nextHandle={nextHandle} stopTour={stopTour} screenType={screenType} />,
      placement: "right",
      target: "#apply-query-11",
      hideFooter: true,
    },
  ];

  const [tourState, setTourState] = useState({
    run: false,
    stepIndex: 0,
    steps: generateTourSteps(screenType),
  });

  return (
    <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "white", display: "flex", position: "relative", fontFamily: "var(--font-family)" }} ref={mapRef} id="map-view">
      <Box sx={{ position: "absolute", display: "flex", justifyContent: "center", left: "50%" }}>
        <div className="navbarPeta">
          <Navbar />
        </div>
      </Box>
      <Desktop
        screenType={screenType}
        view={view}
        tableOpen={tableOpen}
        setTableOpen={setTableOpen}
        draw={draw}
        drawStatus={drawStatus}
        drawingType={drawingType}
        setDrawStatus={setDrawStatus}
        setDrawingType={setDrawingType}
        tableToggle={tableToggle}
        tableRef={tableRef}
        mejaKerjaOpen={mejaKerjaOpen}
        mejaKerjaToggle={mejaKerjaToggle}
        handleCatalogToggle={handleCatalogToggle}
        catalogOpen={catalogOpen}
        handleRemoveAll={handleRemoveAll}
        setCatalogOpen={setCatalogOpen}
        data={data}
        setData={setData}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        allLayer={allLayer}
        setAllLayer={setAllLayer}
        group={group}
        setGroup={setGroup}
        addedLayers={addedLayers}
        setAddedLayers={setAddedLayers}
        infoLayerOpen={infoLayerOpen}
        setInfoLayerOpen={setInfoLayerOpen}
        layerList={layerList}
        setLayerList={setLayerList}
        setTableLayer={setTableLayer}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        queryOpen={queryOpen}
        setQueryOpen={setQueryOpen}
        tourState={tourState}
        setTourState={setTourState}
        basemapDKI={basemapDKI}
      />
      <TabletLandscape
        screenType={screenType}
        view={view}
        addedLayers={addedLayers}
        setAddedLayers={setAddedLayers}
        allLayer={allLayer}
        setAllLayer={setAllLayer}
        catalogOpen={catalogOpen}
        setCatalogOpen={setCatalogOpen}
        data={data}
        setData={setData}
        group={group}
        setGroup={setGroup}
        handleCatalogToggle={handleCatalogToggle}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        mejaKerjaOpen={mejaKerjaOpen}
        setMejaKerjaOpen={setMejaKerjaOpen}
        mejaKerjaToggle={mejaKerjaToggle}
        handleRemoveAll={handleRemoveAll}
        layerList={layerList}
        setLayerList={setLayerList}
        infoLayerOpen={infoLayerOpen}
        setInfoLayerOpen={setInfoLayerOpen}
        setTableOpen={setTableOpen}
        tableRef={tableRef}
        draw={draw}
        drawStatus={drawStatus}
        setDrawStatus={setDrawStatus}
        drawingType={drawingType}
        setDrawingType={setDrawingType}
        tableOpen={tableOpen}
        tableToggle={tableToggle}
        setTableLayer={setTableLayer}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        queryOpen={queryOpen}
        setQueryOpen={setQueryOpen}
        tourState={tourState}
        setTourState={setTourState}
        basemapDKI={basemapDKI}
      />
      <TabletPortrait
        screenType={screenType}
        view={view}
        tableOpen={tableOpen}
        tableToggle={tableToggle}
        addedLayers={addedLayers}
        allLayer={allLayer}
        catalogOpen={catalogOpen}
        data={data}
        draw={draw}
        drawStatus={drawStatus}
        drawingType={drawingType}
        group={group}
        handleCatalogToggle={handleCatalogToggle}
        handleRemoveAll={handleRemoveAll}
        infoLayerOpen={infoLayerOpen}
        layerList={layerList}
        mejaKerjaOpen={mejaKerjaOpen}
        mejaKerjaToggle={mejaKerjaToggle}
        searchInput={searchInput}
        setAddedLayers={setAddedLayers}
        setAllLayer={setAllLayer}
        setCatalogOpen={setCatalogOpen}
        setData={setData}
        setDrawStatus={setDrawStatus}
        setDrawingType={setDrawingType}
        setGroup={setGroup}
        setInfoLayerOpen={setInfoLayerOpen}
        setTableOpen={setTableOpen}
        setLayerList={setLayerList}
        setMejaKerjaOpen={setMejaKerjaOpen}
        setSearchInput={setSearchInput}
        setTableLayer={setTableLayer}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        queryOpen={queryOpen}
        setQueryOpen={setQueryOpen}
        tourState={tourState}
        setTourState={setTourState}
        basemapDKI={basemapDKI}
      />
      <MobilePortrait
        view={view}
        screenType={screenType}
        catalogOpen={catalogOpen}
        setCatalogOpen={setCatalogOpen}
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
        draw={draw}
        drawStatus={drawStatus}
        drawingType={drawingType}
        setDrawStatus={setDrawStatus}
        setDrawingType={setDrawingType}
        mejaKerjaOpen={mejaKerjaOpen}
        setMejaKerjaOpen={setMejaKerjaOpen}
        mejaKerjaToggle={mejaKerjaToggle}
        infoLayerOpen={infoLayerOpen}
        setInfoLayerOpen={setInfoLayerOpen}
        layerList={layerList}
        setLayerList={setLayerList}
        tableOpen={tableOpen}
        tableRef={tableRef}
        tableToggle={tableToggle}
        setTableOpen={setTableOpen}
        setTableLayer={setTableLayer}
        handleRemoveAll={handleRemoveAll}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        queryOpen={queryOpen}
        setQueryOpen={setQueryOpen}
        tourState={tourState}
        basemapDKI={basemapDKI}
      />
      <MobileLandscape
        view={view}
        screenType={screenType}
        catalogOpen={catalogOpen}
        setCatalogOpen={setCatalogOpen}
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
        draw={draw}
        drawStatus={drawStatus}
        drawingType={drawingType}
        setDrawStatus={setDrawStatus}
        setDrawingType={setDrawingType}
        mejaKerjaOpen={mejaKerjaOpen}
        setMejaKerjaOpen={setMejaKerjaOpen}
        mejaKerjaToggle={mejaKerjaToggle}
        infoLayerOpen={infoLayerOpen}
        setInfoLayerOpen={setInfoLayerOpen}
        layerList={layerList}
        setLayerList={setLayerList}
        tableOpen={tableOpen}
        tableRef={tableRef}
        tableToggle={tableToggle}
        setTableOpen={setTableOpen}
        setTableLayer={setTableLayer}
        handleRemoveAll={handleRemoveAll}
        queryOpen={queryOpen}
        setQueryOpen={setQueryOpen}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        tourState={tourState}
        basemapDKI={basemapDKI}
      />
    </Box>
  );
};

export default MapComponent;
