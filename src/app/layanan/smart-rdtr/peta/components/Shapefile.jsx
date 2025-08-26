import { useEffect } from "react";
import shpjs from "shpjs";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import { Button } from "@mui/material";

const Shapefile = ({ geoJSON, setGeoJSON, view }) => {

  useEffect(() => {
    if (view && geoJSON) {
      const blob = new Blob([JSON.stringify(geoJSON)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);

      const geometryType = geoJSON.features[0].geometry.type;

      const symbolPolygon = {
        type: "simple-fill",
        color: [227, 139, 79, 1],
        outline: {
          color: [255, 255, 255, 1],
          width: 1
        }
      }
      const symbolPolyline = {
        type: "simple-line",
        color: [51, 51, 204, 1],
        width: "4pt"
      }
      const symbolPoint = {
        type: "simple-marker",
        color: [255, 165, 0, 1],
        outline: {
          color: "#FFFFFF",
          width: 1
        },
        size: "10px"
      }
      const renderer = {
        type: "simple",
        symbol: geometryType === "Point" ? symbolPoint : geometryType === "Polyline" ? symbolPolyline : symbolPolygon
      }

      //GroupLayer Check
      let groupLayer;
      const groupLayerGeoJSON = view?.map?.layers?.items?.find((group) => group.title === "Shapefile Layer");
      if (!groupLayerGeoJSON) {
        groupLayer = new GroupLayer({
          title: "Shapefile Layer",
          visible: true,
        });
        view.map.add(groupLayer);
      } else {
        groupLayer = groupLayerGeoJSON
      }

      //LayerCheck
      const layerTitle = geoJSON.fileName;
      const layergeoJSON = groupLayerGeoJSON?.layers?.items?.find((layer) => layer.title === layerTitle);
      if (!layergeoJSON) {
        const geojson = new GeoJSONLayer({
          url: url,
          title: layerTitle,
          visible: true,
          renderer: renderer,
        });
        groupLayer.add(geojson);
      }
    }
  }, [view, geoJSON])

  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      const shapefle = e.target.files[0];
      const geojson = await shpjs(await shapefle.arrayBuffer());
      setGeoJSON(geojson);
    } catch (error) {
      console.error("Cant get the file");
    }
  };

  const handleClick = () => {
    const inputElement = document.getElementById("input-upload-data");
    inputElement.click();
  }

  return (
    <>
      <input
        type="file"
        accept=".zip"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="input-upload-data"
      />
      <Button variant={"contained"}
        startIcon={
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path d="M5.25 17.5H15.75M10.5 14V3.5M10.5 3.5L13.5625 6.5625M10.5 3.5L7.4375 6.5625" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
        sx={{
          marginTop: "44px",
          fontFamily: 'var(--font-family)',
          borderRadius: "30px",
          boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
          backgroundColor: 'var(--jakartasatu-biru)',
          color: "white",
          textTransform: "none",

          fontSize: "16px",
          fontWeight: "600",
        }}
        onClick={handleClick}>
        Upload Data (.shp)
      </Button>
    </>
  );
};

export default Shapefile;
