"use client";

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Typography,
} from "@mui/material";
import { Map } from "maplibre-gl";
import React, { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = ({ session, survey_id }) => {
  const [map, setMap] = useState();
  const [basemapType, setBasemapType] = useState("osm");
  const [geoJSONData, setGeoJSONData] = useState();
  const mapRef = useRef();

  useEffect(() => {
    const initialMap = new Map({
      container: mapRef.current,
      center: [106.827, -6.176],
      zoom: 15,
      style: {
        version: 8,
        ...basemaps[basemapType],
      },
    });
    setMap(initialMap);

    const containerLayout = document.getElementById("containerLayout");
    containerLayout.style.maxWidth = "none";

    return () => {
      initialMap.remove();
      containerLayout.style.maxWidth = "1280px";
    };
  }, []);

  useEffect(() => {
    //fetch geoJSON
    if (map && survey_id) {
      const getData = async () => {
        const response = await fetch(
          `${process.env.API_WEB}/survey/hasil-survey?survey_id=${survey_id}`,
          {
            headers: {
              Authorization: `Bearer ${session.user.access_token}`,
            },
          }
        );
        const data = await response.json();
        setGeoJSONData(data);
      };
      getData();
    }
  }, [map, survey_id]);

  useEffect(() => {
    //add geoJSON to the map
    if (map && geoJSONData) {
      map.on("load", () => {
        if (map.getSource("survey-data")) {
          map.removeLayer("survey-layer");
          map.removeSource("survey-data");
        }

        map.addSource("survey-data", {
          type: "geojson",
          data: geoJSONData,
        });

        map.addLayer({
          id: "survey-layer",
          type: "circle",
          source: "survey-data",
          paint: {
            "circle-radius": 6,
            "circle-color": "#61ff22ff",
            "circle-stroke-width": 1,
            "circle-stroke-color": "#040504ff",
          },
        });
      });
    }
  }, [map, geoJSONData]);

  const handleChangeBasemap = (event) => {
    const selected = event.target.value;
    setBasemapType(selected);
    if (map) {
      map.setStyle({
        version: 8,
        ...basemaps[selected],
      });
    }

    map.once("styledata", () => {
      if (geoJSONData) {
        map.addSource("survey-data", {
          type: "geojson",
          data: geoJSONData,
        });

        map.addLayer({
          id: "survey-layer",
          type: "circle",
          source: "survey-data",
          paint: {
            "circle-radius": 6,
            "circle-color": "#61ff22ff",
            "circle-stroke-width": 1,
            "circle-stroke-color": "#040504ff",
          },
        });
      }
    });
  };

  return (
    <Box sx={{ width: "100%", height: "100%", maxWidth: "2000px" }}>
      <Box
        ref={mapRef}
        sx={{ width: "100vw", height: "100%", paddingRight: "-100px" }}
      />
      <FormControl
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          background: "white",
          p: 1,
          borderRadius: "5px",
        }}
        size="small"
      >
        <Select
          labelId="basemap-select-label"
          value={basemapType}
          onChange={handleChangeBasemap}
        >
          <MenuItem value="osm">OSM</MenuItem>
          <MenuItem value="esri-satellite">Esri Satellite</MenuItem>
          <MenuItem value="esri-street">Esri Street</MenuItem>
          <MenuItem value="esri-hybrid">Esri Hybrid</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: "1280px" }}>
        <Box sx={{  }}>
          <Typography>aksdbsajkdljsahd;osadbsajhdb</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MapComponent;

const basemaps = {
  osm: {
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution:
          "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      },
    },
    layers: [
      {
        id: "osm-tiles",
        type: "raster",
        source: "osm",
      },
    ],
  },
  "esri-satellite": {
    sources: {
      "esri-satellite": {
        type: "raster",
        tiles: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution: "Tiles © Esri — Source: Esri, Earthstar Geographics",
      },
    },
    layers: [
      {
        id: "satellite",
        type: "raster",
        source: "esri-satellite",
      },
    ],
  },
  "esri-street": {
    sources: {
      "esri-street": {
        type: "raster",
        tiles: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution:
          "Tiles © Esri — Source: Esri, HERE, Garmin, OpenStreetMap contributors",
      },
    },
    layers: [
      {
        id: "street",
        type: "raster",
        source: "esri-street",
      },
    ],
  },
  "esri-hybrid": {
    sources: {
      "esri-satellite": {
        type: "raster",
        tiles: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution: "Tiles © Esri — Source: Esri, Earthstar Geographics",
      },
      "esri-labels": {
        type: "raster",
        tiles: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution: "Labels © Esri",
      },
    },
    layers: [
      {
        id: "satellite",
        type: "raster",
        source: "esri-satellite",
      },
      {
        id: "labels",
        type: "raster",
        source: "esri-labels",
      },
    ],
  },
};
