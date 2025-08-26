import "@arcgis/core/assets/esri/themes/light/main.css";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Popup from "@arcgis/core/widgets/Popup";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Basemap from "@arcgis/core/Basemap";
import BasemapWidget from "@/app/peta/jakarta/desktop/BasemapWidget";
import Kordinat from "@/app/peta/jakarta/components/Kordinat";
import FullScreen from "@/app/peta/jakarta/components/FullScreen";
import Zoom from "@/app/peta/jakarta/components/Zoom";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import PopUp from "./PopUp";
import Search from "./Search";
import MeasurementArea from "@/app/peta/jakarta/components/MeasureArea";
import MeasurementLine from "@/app/peta/jakarta/components/MeasureLine";

const MapComponent = ({ view, setView, layers, setRdtrLayers, setKDB, setKDH, setKLB, setSubLayer, draw}) => {
  const theme = useTheme();
  const isMobile2 = useMediaQuery(theme.breakpoints.down("431"));
  const mapRef = useRef();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [popUpCoordinate, setPopupCoordinate] = useState([]);
  const [drawStatus, setDrawStatus] = useState();
  const [drawingType, setDrawingType] = useState();

  useEffect(() => {
    if (layers) {
      const map = new Map({
        basemap: "streets",
      });

      const view = new MapView({
        map: map,
        zoom: 15,
        center: [106.826959, -6.176923],
        ui: {
          components: [],
        },
        container: mapRef.current,
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
      setView(view);

      const layerGroups = [];

      layers.forEach((group, index) => {
        const layerGroup = new GroupLayer({
          title: group.name,
          visible: group.visible,
          id: index,
        });
        layerGroups.push(layerGroup);
        group.layers.forEach((layer) => {
          if (layer.url.includes("MapServer")) {
            const urlArray = layer.url.split("/");
            const idLayer = parseInt(urlArray[urlArray.length - 1]);
            const parentUrl = urlArray.slice(0, -1).join("/");
            const mapImageLayer = new MapImageLayer({
              url: parentUrl,
              title: layer.title,
              visible: layer.visible,
              opacity: layer.opacity,
              sublayers: [
                {
                  id: idLayer,
                },
              ],
              id: layer.id,
            });
            if(layer.attributes){
              mapImageLayer.customAttributes = layer.attributes;
            }
            layerGroup.add(mapImageLayer);
          } else {
            const featureLayer = new FeatureLayer({
              url: layer.url,
              title: layer.title,
              visible: layer.visible,
              opacity: layer.opacity,
              outFields: layer.outFields,
              id: layer.id,
              popupEnabled: false,
            });
            if(layer.attributes) {
              featureLayer.customAttributes = layer.attributes;
            }
            layerGroup.add(featureLayer);
          }
        });
      });

      map.addMany(layerGroups);
      setRdtrLayers(layerGroups);
    }
  }, [layers]);

  useEffect(() => {
    if (layers && view) {
      const groupLayerRDTR = view.map.layers.items.find(
        (group) => group.title === "Rencana Pola Ruang RDTR"
      );
      if (groupLayerRDTR?.layers.length > 0) {
        const layerPolaRuang = groupLayerRDTR.layers.items.find(
          (layer) => layer.title === "Rencana Pola Ruang RDTR"
        );

        layerPolaRuang.when(() => {
          const subLayer = layerPolaRuang.findSublayerById(0);
          setSubLayer(subLayer);
        });

        view.on("click", async (event) => {
          const attributes = await fetcAttributeLayerPolaRuang(
            layerPolaRuang,
            event
          );
          setKDB(attributes.KDB);
          setKDH(attributes.KDH);
          setKLB(attributes.KLB_FINAL);
          setPopupCoordinate({ x: event.mapPoint.x, y: event.mapPoint.y });
          setOpenPopUp(true);
        });
      }
    }
  }, [layers, view]);

  const fetcAttributeLayerPolaRuang = async (layerPolaRuang, event) => {
    const url = `${layerPolaRuang.url}/identify`;
    const params = new URLSearchParams({
      geometry: JSON.stringify({
        x: event.mapPoint.x,
        y: event.mapPoint.y,
        spatialReference: { wkid: 102100 },
      }),
      geometryType: "esriGeometryPoint",
      sr: "102100",
      tolerance: "5",
      mapExtent: JSON.stringify(view.extent.toJSON()),
      imageDisplay: `${view.width},${view.height},96`,
      f: "json",
      returnGeometry: "false",
      layers: "all",
      returnFieldName: "true",
    });

    const response = await fetch(`${url}?${params.toString()}`);
    const identifyResponse = await response.json();

    if (identifyResponse.results.length > 0) {
      const attributes = identifyResponse.results[0].attributes;
      return attributes;
    } else {
      console.log("No features found at the clicked location.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      ref={mapRef}
    >
      <Box
        sx={{
          position: "absolute",
          left: "2%",
          bottom: "2%",
          width: "300px",
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Kordinat view={view} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          right: "2%",
          bottom: "2%",
          rowGap: 2,
          alignItems: "flex-end",
        }}
      >
        <BasemapWidget
          view={view}
          buttonSize={"48px"}
          imageSize={40}
        />
        <FullScreen buttonSize={"48px"} />
        <MeasurementArea buttonSize={"48px"} draw={draw} view={view} drawStatus={drawStatus} setDrawStatus={setDrawStatus} tooltip={"left"} drawingType={drawingType} setDrawingType={setDrawingType} />
        <MeasurementLine buttonSize={"48px"} draw={draw} view={view} drawStatus={drawStatus} setDrawStatus={setDrawStatus} tooltip={"left"} drawingType={drawingType} setDrawingType={setDrawingType} />
        <Zoom buttonSize={"48px"} view={view} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          right: "2%",
          top: "9%",
        }}
      >
        {openPopUp && (
          <PopUp
            view={view}
            setOpenPopup={setOpenPopUp}
            popUpCoordinate={popUpCoordinate}
          />
        )}
      </Box>
      <Box
        sx={{
          padding: "15px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 0,
          zIndex: 10,
        }}
      >
        <Search view={view} bahasa="ID" />
      </Box>
    </Box>
  );
};

export default MapComponent;
