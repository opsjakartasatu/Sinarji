// components/map/config.js

export const CONFIG = {
  WFS_URL: "https://gis-dev.dcktrp.id/gispublik/publik/ows",
  TIME_API_URL: `${process.env.BASE_URL}/api/proxy/peta-3d/simulasi-banjir`,
  INITIAL_VIEW: {
    center: [106.85924690676352, -6.263091040363924],
    zoom: 17,
    pitch: 45,
    bearing: -17.6,
  },
  WFS_PARAMS: {
    service: "WFS",
    version: "1.0.0",
    request: "GetFeature",
    outputFormat: "application/json",
    srsName: "EPSG:4326",
    maxFeatures: "500",
  },
  BASEMAPS: {
    google: {
      tiles: ["https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
      attribution: "© Google Maps",
    },
    osm: {
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    opentopo: {
      tiles: [
        "https://a.tile.opentopomap.org/{z}/{x}/{y}.png",
        "https://b.tile.opentopomap.org/{z}/{x}/{y}.png",
        "https://c.tile.opentopomap.org/{z}/{x}/{y}.png",
      ],
      attribution:
        '© <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
    },
    cartodb_positron: {
      tiles: [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      ],
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/attributions">CARTO</a>',
    },
  },
  LAYERS: {
    genangan: {
      id: "genangan_all_layer",
      source: "genangan",
      type: "fill",
      paint: {
        "fill-color": "lightblue",
        "fill-opacity": 0.8,
      },
      beforeId: "bangunan-layer",
    },
    bangunan: {
      id: "bangunan-layer",
      source: "bangunan",
      type: "fill-extrusion",
      paint: {
        "fill-extrusion-color": "brown",
        "fill-extrusion-height": ["get", "HEIGHT"],
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": 0.9,
      },
    },
    jalan: {
      id: "jalan-layer",
      source: "jalan",
      type: "line",
      paint: {
        "line-color": "#FF6200",
        "line-width": ["interpolate", ["linear"], ["zoom"], 12, 1, 16, 3],
        "line-opacity": 0.8,
      },
      beforeId: "bangunan-layer",
    },
    pintu_air: {
      id: "pintu-air-layer",
      source: "pintu_air",
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "#1E90FF",
        "circle-stroke-width": 1,
        "circle-stroke-color": "#ffffff",
      },
      beforeId: "bangunan-layer",
      // Pintu air layer can be toggled on/off by user
    },
  },
  LEGEND: [
    {
      key: "showFloodAreaAll",
      color: "lightblue",
      label: "Genangan",
      shape: "square",
    },
    {
      key: "showBuildings",
      label: "Bangunan",
      color: "#654321",
      shape: "square",
    },
    { key: "showStreet", color: "#FF6200", label: "Jalan", shape: "line" },
    {
      key: "showDamGate",
      color: "#1E90FF",
      label: "Pintu Air",
      shape: "circle",
    },
  ],
};
