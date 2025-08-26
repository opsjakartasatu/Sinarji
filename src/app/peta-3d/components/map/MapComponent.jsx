"use client";

import {
  Box,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
  Typography,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/Add";
import ZoomOutIcon from "@mui/icons-material/Remove";
import HomeIcon from "@mui/icons-material/Home";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorIcon from "@mui/icons-material/Error";
import TimelineIcon from "@mui/icons-material/Timeline";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Map } from "maplibre-gl";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "maplibre-gl/dist/maplibre-gl.css";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import MapLegend from "./MapLegend";
import MapBasemap from "./MapBasemap";
import MapOption from "./MapOption";
import { CONFIG } from "./config";
import {
  cleanGeometry,
  fetchGeoData,
  calculateCentroid,
  parseTime,
  timeToMinutes,
} from "./utils";
import { updateLayers } from "./layerUtils";
import TimeSlider from "./TimeSlider";
import Statistik from "./Statistik";

// Enhanced utility functions
const formatCQLTime = (time) => {
  if (!time) return "";
  if (typeof time === "string") {
    if (time.match(/^\d{2}:\d{2}$/)) {
      return `${time}:00`;
    }
    if (time.match(/^\d{2}:\d{2}:\d{2}$/)) {
      return time;
    }
    const parsed = parseTime(time);
    if (parsed) {
      return parsed.length === 5 ? `${parsed}:00` : parsed;
    }
  }

  return time.toString();
};

const normalizeTime = (time) => {
  if (!time) return null;
  const timeStr = time.toString().trim();

  if (timeStr.includes(":")) {
    const parts = timeStr.split(":");
    if (parts.length >= 2) {
      const hours = parts[0].padStart(2, "0");
      const minutes = parts[1].padStart(2, "0");
      return `${hours}:${minutes}`;
    }
  }

  if (timeStr.includes(".")) {
    const parts = timeStr.split(".");
    if (parts.length >= 2) {
      const hours = parts[0].padStart(2, "0");
      const minutes = parts[1].padStart(2, "0");
      return `${hours}:${minutes}`;
    }
  }

  return timeStr;
};

const findMatchingTimeData = (timeAndStatsData, selectedTime) => {
  if (!Array.isArray(timeAndStatsData) || !selectedTime) return null;

  const normalizedSelectedTime = normalizeTime(selectedTime);

  let matchedData = timeAndStatsData.find((item) => {
    const itemTime = normalizeTime(item.jam);
    return itemTime === normalizedSelectedTime;
  });

  if (!matchedData) {
    matchedData = timeAndStatsData.find((item) => {
      const parsedItemTime = parseTime(item.jam);
      const parsedSelectedTime = parseTime(selectedTime);
      return parsedItemTime === parsedSelectedTime;
    });
  }

  if (!matchedData) {
    matchedData = timeAndStatsData.find((item) => {
      const itemTimeStr = item.jam?.toString().replace(/[:\s]/g, "");
      const selectedTimeStr = selectedTime?.toString().replace(/[:\s]/g, "");
      return itemTimeStr === selectedTimeStr;
    });
  }

  return matchedData;
};

const extractStatsFromData = (data) => {
  if (!data) return null;

  console.log("Extracting stats from data:", data);
  const stats = data.stats || data.statistik || data;
  const extractedStats = {
    totalLuasGenangan:
      stats.area_banjir ||
      stats.totalLuasGenangan ||
      stats.total_luas_genangan ||
      stats.luasGenangan ||
      stats.luas_genangan ||
      0,
    jumlahBangunanTerdampak:
      stats.jumlah_bangunan ||
      stats.jumlahBangunanTerdampak ||
      stats.jumlah_bangunan_terdampak ||
      stats.bangunanTerdampak ||
      stats.bangunan_terdampak ||
      0,
    luasJalanTergenang:
      stats.jalan_banjir ||
      stats.luasJalanTergenang ||
      stats.luas_jalan_tergenang ||
      stats.jalanTergenang ||
      stats.jalan_tergenang ||
      0,
    jumlah_kk: stats.jumlah_kk || stats.jumlahKK || stats.kk || 0,
    luas_bangunan:
      stats["luas bangunan"] ||
      stats.luas_bangunan ||
      stats.luasBangunan ||
      stats.bangunan ||
      0,
    ruas_jalan: stats.ruas_jalan || stats.ruasJalan || stats.jalan || 0,
  };
  return extractedStats;
};

// Error types untuk kategorisasi error
const ERROR_TYPES = {
  NETWORK: "network",
  MAP_INIT: "map_init",
  DATA_FETCH: "data_fetch",
  LAYER_UPDATE: "layer_update",
  FULLSCREEN: "fullscreen",
  VALIDATION: "validation",
};

// Error severity levels
const ERROR_SEVERITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
};

// Custom Error Classes
class MapError extends Error {
  constructor(
    message,
    type = ERROR_TYPES.NETWORK,
    severity = ERROR_SEVERITY.MEDIUM,
    originalError = null
  ) {
    super(message);
    this.name = "MapError";
    this.type = type;
    this.severity = severity;
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
  }
}

class DataFetchError extends MapError {
  constructor(message, url, originalError) {
    super(message, ERROR_TYPES.DATA_FETCH, ERROR_SEVERITY.HIGH, originalError);
    this.name = "DataFetchError";
    this.url = url;
  }
}

class MapInitError extends MapError {
  constructor(message, originalError) {
    super(
      message,
      ERROR_TYPES.MAP_INIT,
      ERROR_SEVERITY.CRITICAL,
      originalError
    );
    this.name = "MapInitError";
  }
}

// Error Handler Hook
const useErrorHandler = () => {
  const [errors, setErrors] = useState([]);
  const [retryCount, setRetryCount] = useState({});

  const logError = useCallback((error) => {
    console.error(`[${error.type}] ${error.message}`, {
      timestamp: error.timestamp,
      severity: error.severity,
      originalError: error.originalError,
    });

    // Send to monitoring service (placeholder)
    // sendErrorToMonitoring(error);
  }, []);

  const handleError = useCallback(
    (error) => {
      const mapError =
        error instanceof MapError
          ? error
          : new MapError(
              error.message,
              ERROR_TYPES.NETWORK,
              ERROR_SEVERITY.MEDIUM,
              error
            );

      logError(mapError);
      setErrors((prev) => [...prev, mapError]);

      // Show user-friendly notification
      switch (mapError.severity) {
        case ERROR_SEVERITY.CRITICAL:
          toast.error(`Kesalahan kritis: ${mapError.message}`, {
            autoClose: false,
          });
          break;
        case ERROR_SEVERITY.HIGH:
          toast.error(`Kesalahan: ${mapError.message}`, { autoClose: 8000 });
          break;
        case ERROR_SEVERITY.MEDIUM:
          toast.warn(`Peringatan: ${mapError.message}`, { autoClose: 5000 });
          break;
        case ERROR_SEVERITY.LOW:
          toast.info(`Info: ${mapError.message}`, { autoClose: 3000 });
          break;
      }

      return mapError;
    },
    [logError]
  );

  const retry = useCallback(
    (key, fn, maxRetries = 3) => {
      const currentRetry = retryCount[key] || 0;
      if (currentRetry >= maxRetries) {
        throw new MapError(
          `Maksimal percobaan ulang (${maxRetries}) telah tercapai untuk ${key}`,
          ERROR_TYPES.NETWORK,
          ERROR_SEVERITY.HIGH
        );
      }

      setRetryCount((prev) => ({ ...prev, [key]: currentRetry + 1 }));
      return fn();
    },
    [retryCount]
  );

  const clearErrors = useCallback(() => {
    setErrors([]);
    setRetryCount({});
  }, []);

  return { errors, handleError, retry, clearErrors };
};

// Enhanced fetch function with error handling
const safeApiCall = async (url, errorMessage, retryFn = null) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new DataFetchError(
        `HTTP ${response.status}: ${response.statusText}`,
        url,
        new Error(`Failed to fetch ${url}`)
      );
    }

    const data = await response.json();

    if (!data) {
      throw new DataFetchError("Data kosong diterima dari server", url);
    }

    return data;
  } catch (error) {
    console.error("API Call Error:", error);

    if (error instanceof DataFetchError) {
      throw error;
    }

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new DataFetchError(
        "Koneksi jaringan gagal. Periksa koneksi internet Anda.",
        url,
        error
      );
    }

    throw new DataFetchError(
      errorMessage || "Gagal mengambil data dari server",
      url,
      error
    );
  }
};

const MapComponent = ({
  selectedLayers,
  showBuildings = true,
  showFloodAreaAll = true,
  showStreet = true,
  showDamGate = true,
  onLayerChange,
  onMapLayerChange,
  basemap = "cartodb_positron",
  selectedTime: propSelectedTime,
  onTimesUpdate,
  onTimeChange,
  onStatsUpdate,
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [is3DMode, setIs3DMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [geoData, setGeoData] = useState({
    genangan: { type: "FeatureCollection", features: [] },
    bangunan: { type: "FeatureCollection", features: [] },
    jalan: { type: "FeatureCollection", features: [] },
    pintu_air: { type: "FeatureCollection", features: [] },
  });
  const [times, setTimes] = useState([]);
  const [stats, setStats] = useState({
    totalLuasGenangan: 0,
    jumlahBangunanTerdampak: 0,
    luasJalanTergenang: 0,
    jumlah_kk: 0,
    luas_bangunan: 0,
    ruas_jalan: 0,
  });
  const [popup, setPopup] = useState({
    visible: false,
    content: "",
    coordinates: null,
  });
  const [selectedTime, setSelectedTime] = useState(propSelectedTime);
  const [showLegend, setShowLegend] = useState(true);
  const [showOption, setShowOption] = useState(true);
  const [showMapOption, setShowMapOption] = useState(false);
  const [showBasemap, setShowBasemap] = useState(false);
  const [currentBasemap, setCurrentBasemap] = useState(basemap);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showSlider, setShowSlider] = useState(false); // Hidden by default on mobile
  const [showStatistik, setShowStatistik] = useState(false); // Hidden by default on mobile

  const { errors, handleError, retry, clearErrors } = useErrorHandler();

  // Validasi props
  const validateProps = useCallback(() => {
    if (!CONFIG) {
      throw new MapError(
        "CONFIG tidak ditemukan",
        ERROR_TYPES.VALIDATION,
        ERROR_SEVERITY.CRITICAL
      );
    }
    if (!CONFIG.INITIAL_VIEW) {
      throw new MapError(
        "INITIAL_VIEW tidak dikonfigurasi",
        ERROR_TYPES.VALIDATION,
        ERROR_SEVERITY.CRITICAL
      );
    }
    if (!CONFIG.WFS_URL) {
      throw new MapError(
        "WFS_URL tidak dikonfigurasi",
        ERROR_TYPES.VALIDATION,
        ERROR_SEVERITY.CRITICAL
      );
    }
  }, []);

  // Safe map initialization
  const initializeMap = useCallback(async () => {
    try {
      validateProps();
      setIsLoading(true);
      setHasError(false);
      clearErrors();

      if (!mapRef.current) {
        throw new MapInitError("Map container tidak ditemukan");
      }

      const basemapConfig = CONFIG.BASEMAPS[currentBasemap];

      const mapInstance = new Map({
        container: mapRef.current,
        ...CONFIG.INITIAL_VIEW,
        style: {
          version: 8,
          sources: {
            basemap: {
              type: "raster",
              ...CONFIG.BASEMAPS[currentBasemap],
              tileSize: 256,
              maxzoom: 19,
            },
          },
          layers: [{ id: "basemap-layer", type: "raster", source: "basemap" }],
          light: {
            anchor: "viewport",
            color: "white",
            intensity: 0.6,
            position: [1.15, 210, 30],
          },
        },
        zoomControl: false,
      });

      // Handle map errors
      mapInstance.on("error", (e) => {
        handleError(
          new MapError(
            `Map error: ${e.error?.message || "Unknown map error"}`,
            ERROR_TYPES.MAP_INIT,
            ERROR_SEVERITY.HIGH,
            e.error
          )
        );
      });

      setMap(mapInstance);
      return mapInstance;
    } catch (error) {
      const mapError =
        error instanceof MapError
          ? error
          : new MapInitError("Gagal menginisialisasi peta", error);
      handleError(mapError);
      setHasError(true);
      setErrorMessage(mapError.message);
      throw mapError;
    } finally {
      setIsLoading(false);
    }
  }, [currentBasemap, validateProps, handleError, clearErrors]);

  // Safe data fetching - Only fetch static data if not already available
  const fetchStaticData = useCallback(async () => {
    try {
      setIsLoading(true);

      const fetches = [];

      if (
        showDamGate &&
        (!geoData.pintu_air || geoData.pintu_air.features.length === 0)
      ) {
        const pintuAirParams = {
          ...CONFIG.WFS_PARAMS,
          typeName: "publik:tr_banjir_pintu_air",
        };

        // Tambahkan bounding box untuk layer statis juga
        if (map) {
          const bounds = map.getBounds();
          const minX = bounds.getWest();
          const minY = bounds.getSouth();
          const maxX = bounds.getEast();
          const maxY = bounds.getNorth();
          const buffer = 0.1;
          const geomField = "geom"; // Sesuaikan dengan nama field geometri di layer pintu_air
          const envelope = `ENVELOPE(${minX}, ${maxX}, ${maxY}, ${minY})`;
          pintuAirParams.CQL_FILTER = `DWITHIN(${geomField}, ${envelope}, ${buffer}, meters)`;
        }

        const pintuAirUrl = `${CONFIG.WFS_URL}?${new URLSearchParams(
          pintuAirParams
        )}`;
        fetches.push({
          key: "pintu_air",
          url: pintuAirUrl,
          errorMsg: "Gagal memuat data pintu air",
        });
      }

      // Only fetch if there are fetches to make
      if (fetches.length > 0) {
        const results = await Promise.allSettled(
          fetches.map(async ({ key, url, errorMsg }) => {
            try {
              const data = await safeApiCall(url, errorMsg);
              return { key, data };
            } catch (error) {
              handleError(error);
              return { key, data: { type: "FeatureCollection", features: [] } };
            }
          })
        );

        const newStaticData = results.reduce((acc, result) => {
          if (result.status === "fulfilled") {
            const { key, data } = result.value;
            return { ...acc, [key]: data };
          }
          return acc;
        }, {});

        setGeoData((prev) => ({ ...prev, ...newStaticData }));
        return newStaticData;
      }

      return {};
    } catch (error) {
      handleError(new DataFetchError("Gagal mengambil data statis", "", error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, showDamGate, geoData]);

  function getExtentFromCentroidAndZoom(
    [lon, lat],
    zoom,
    mapWidthPx = 1024,
    mapHeightPx = 768
  ) {
    const EARTH_RADIUS = 6378137;
    const TILE_SIZE = 512;
    const initialResolution = (2 * Math.PI * EARTH_RADIUS) / TILE_SIZE;
    const resolution = initialResolution / Math.pow(2, zoom);

    const halfWidth = (mapWidthPx / 2) * resolution;
    const halfHeight = (mapHeightPx / 2) * resolution;

    const deltaLon =
      ((halfWidth / EARTH_RADIUS) * (180 / Math.PI)) /
      Math.cos((lat * Math.PI) / 180);
    const deltaLat = (halfHeight / EARTH_RADIUS) * (180 / Math.PI);

    return {
      west: lon - deltaLon,
      east: lon + deltaLon,
      south: lat - deltaLat,
      north: lat + deltaLat,
    };
  }

  const fetchDynamicData = useCallback(async () => {
    if (isFetchingData) {
      return;
    }

    try {
      setIsFetchingData(true);
      setIsLoading(true);

      // Step 1: Fetch all features from tr_banjir_simulasi (WFS) to get available times
      const wfsUrl = `${CONFIG.WFS_URL}?${new URLSearchParams({
        ...CONFIG.WFS_PARAMS,
        typeName: "publik:tr_banjir_simulasi",
      })}`;
      const wfsData = await fetchGeoData(
        wfsUrl,
        "Gagal memuat data WFS tr_banjir_simulasi"
      );
      const features = wfsData.features || [];

      // Step 2: Extract unique EVENT_TIME (full ISO)
      const uniqueTimes = Array.from(
        new Set(features.map((f) => f.properties?.EVENT_TIME).filter(Boolean))
      ).sort();

      // Step 3: Set times state
      setTimes(uniqueTimes);

      // Step 4: Determine the time to use for CQL filtering
      let timeToUse = selectedTime;
      if (uniqueTimes.length === 0) {
        return;
      }

      if (!timeToUse || !uniqueTimes.includes(timeToUse)) {
        timeToUse = uniqueTimes[0];
        setSelectedTime(timeToUse);
        if (onTimeChange) onTimeChange(timeToUse);
      } else {
      }

      // Step 5: (Optional) Fetch stats from API eksternal jika dibutuhkan
      let statsData = null;
      if (timeToUse) {
        // Ambil jam saja jika timeToUse ISO
        const jam = timeToUse.includes("T")
          ? timeToUse.split("T")[1].substring(0, 5)
          : timeToUse;
        // let timeApiUrl = CONFIG.TIME_API_URL + `?jam=${encodeURIComponent(jam)}`;
        let timeApiUrl = CONFIG.TIME_API_URL;
        statsData = await safeApiCall(
          timeApiUrl,
          "Gagal memuat data waktu dan statistik"
        );
        if (Array.isArray(statsData) && statsData.length) {
          // Ambil index waktu yang dipilih di slider
          const sliderTimes = uniqueTimes.map((t) =>
            t && t.includes("T") ? t.split("T")[1].substring(0, 5) : t
          );
          const selectedIndex = sliderTimes.findIndex((t) => t === jam);
          // Jika index tidak ada, fallback ke 0
          const statIndex =
            selectedIndex >= 0 && selectedIndex < statsData.length
              ? selectedIndex
              : 0;
          const matchedData = statsData[statIndex];
          if (matchedData) {
            const extractedStats = extractStatsFromData(matchedData);
            setStats(extractedStats);
            if (onStatsUpdate) onStatsUpdate(extractedStats);
          }
        }
      }

      // Step 6: Fetch all layer data with proper filtering
      let fetches = [];

      // Prepare CQL filter for all layers
      let cqlFilter = "";
      if (timeToUse) {
        cqlFilter = `EVENT_TIME = '${timeToUse}'`;
        console.log("🔧 Using CQL filter for all layers:", cqlFilter);
      } else {
        console.log(
          "⚠️ No time available for CQL filtering, will fetch all data"
        );
      }

      // Fetch flood area data with CQL filter
      if (showFloodAreaAll) {
        const floodParams = {
          ...CONFIG.WFS_PARAMS,
          typeName: "publik:tr_banjir_simulasi",
        };

        if (cqlFilter) {
          const bounds = map.getBounds();
          const minX = bounds.getWest();
          const minY = bounds.getSouth();
          const maxX = bounds.getEast();
          const maxY = bounds.getNorth();
          const buffer = 0.1;
          const geomField = "geom";
          const envelope = `ENVELOPE(${minX}, ${maxX}, ${maxY}, ${minY})`;
          floodParams.CQL_FILTER = `${cqlFilter} AND DWITHIN(${geomField}, ${envelope}, ${buffer}, meters)`;
        }
        const floodUrl = `${CONFIG.WFS_URL}?${new URLSearchParams(
          floodParams
        )}`;
        console.log("genangan", floodUrl);
        fetches.push({
          key: "genangan",
          url: floodUrl,
          errorMsg: "Gagal memuat data genangan",
        });
        console.log("🔧 Fetching genangan data with CQL filter:", cqlFilter);
      }

      // Fetch bangunan data with bounding box
      if (showBuildings) {
        const bangunanParams = {
          ...CONFIG.WFS_PARAMS,
          typeName: "publik:tr_banjir_bangunan",
        };

        if (cqlFilter) {
          const bounds = map.getBounds();
          const minX = bounds.getWest();
          const minY = bounds.getSouth();
          const maxX = bounds.getEast();
          const maxY = bounds.getNorth();
          const buffer = 0.1;
          const geomField = "geom"; // Sesuaikan dengan nama field geometri di layer bangunan
          const envelope = `ENVELOPE(${minX}, ${maxX}, ${maxY}, ${minY})`;
          bangunanParams.CQL_FILTER = `${cqlFilter} AND DWITHIN(${geomField}, ${envelope}, ${buffer}, meters)`;
        }

        const bangunanUrl = `${CONFIG.WFS_URL}?${new URLSearchParams(
          bangunanParams
        )}`;
        fetches.push({
          key: "bangunan",
          url: bangunanUrl,
          errorMsg: "Gagal memuat data bangunan",
        });
        console.log(
          "🔧 Fetching bangunan data with CQL filter and bounding box:",
          bangunanParams.CQL_FILTER
        );
      }

      // Fetch jalan data with bounding box
      if (showStreet) {
        const jalanParams = {
          ...CONFIG.WFS_PARAMS,
          typeName: "publik:tr_banjir_jalan",
        };

        if (cqlFilter) {
          const bounds = map.getBounds();
          const minX = bounds.getWest();
          const minY = bounds.getSouth();
          const maxX = bounds.getEast();
          const maxY = bounds.getNorth();
          const buffer = 0.1;
          const geomField = "geom"; // Sesuaikan dengan nama field geometri di layer jalan
          const envelope = `ENVELOPE(${minX}, ${maxX}, ${maxY}, ${minY})`;
          jalanParams.CQL_FILTER = `${cqlFilter} AND DWITHIN(${geomField}, ${envelope}, ${buffer}, meters)`;
        }

        const jalanUrl = `${CONFIG.WFS_URL}?${new URLSearchParams(
          jalanParams
        )}`;
        fetches.push({
          key: "jalan",
          url: jalanUrl,
          errorMsg: "Gagal memuat data jalan",
        });
        console.log(
          "🔧 Fetching jalan data with CQL filter and bounding box:",
          jalanParams.CQL_FILTER
        );
      }

      const results = await Promise.allSettled(
        fetches.map(async ({ key, url, errorMsg }) => {
          try {
            const data = await safeApiCall(url, errorMsg);
            console.log(`${key} data received:`, data);
            return { key, data };
          } catch (error) {
            console.error(`Error fetching ${key}:`, error);
            handleError(error);
            return { key, data: { type: "FeatureCollection", features: [] } };
          }
        })
      );

      const geoDataResults = results.reduce(
        (acc, result) => {
          if (result.status === "fulfilled") {
            const { key, data } = result.value;
            if (key === "genangan_fallback") {
              if (
                !acc.genangan ||
                !acc.genangan.features ||
                acc.genangan.features.length === 0
              ) {
                console.log("Using fallback genangan data");
                return { ...acc, genangan: data };
              }
            } else {
              return { ...acc, [key]: data };
            }
          }
          return acc;
        },
        { genangan: { type: "FeatureCollection", features: [] } }
      );

      const updatedGeo = { ...geoData, ...geoDataResults };
      setGeoData(updatedGeo);

      console.log("Updated geo data:", updatedGeo);

      // Step 5: Update map layers (without changing map position)
      try {
        if (map && map.isStyleLoaded()) {
          updateLayers(
            map,
            updatedGeo,
            showFloodAreaAll,
            showBuildings,
            showStreet,
            showDamGate
          );
        }
      } catch (error) {
        handleError(
          new MapError(
            "Gagal memperbarui layer peta",
            ERROR_TYPES.LAYER_UPDATE,
            ERROR_SEVERITY.MEDIUM,
            error
          )
        );
      }

      // Step 6: Update map view - Only on initial load
      if (isInitialLoad) {
        try {
          const centroid = calculateCentroid(updatedGeo);
        } catch (error) {
          handleError(
            new MapError(
              "Gagal memperbarui tampilan peta",
              ERROR_TYPES.MAP_INIT,
              ERROR_SEVERITY.LOW,
              error
            )
          );
        }
      }
    } catch (error) {
      console.error("Dynamic data fetch error:", error);
      handleError(
        new DataFetchError("Gagal mengambil data dinamis", "", error)
      );
    } finally {
      setIsLoading(false);
      setIsFetchingData(false);
    }
  }, [
    selectedTime,
    showFloodAreaAll,
    map,
    geoData,
    onStatsUpdate,
    onTimesUpdate,
    onTimeChange,
    handleError,
    isInitialLoad,
    isFetchingData,
  ]);

  const fetchDistinctEventTimesSimulasi = async () => {
    try {
      const url = `${CONFIG.WFS_URL}?${new URLSearchParams({
        ...CONFIG.WFS_PARAMS,
        typeName: "publik:tr_banjir_simulasi",
      })}`;
      const data = await fetchGeoData(
        url,
        "Gagal memuat waktu EVENT_TIME dari tr_banjir_simulasi"
      );
      const features = data.features || [];
      // Extract unique full ISO EVENT_TIME values
      const uniqueTimes = Array.from(
        new Set(features.map((f) => f.properties?.EVENT_TIME).filter(Boolean))
      ).sort();
      return uniqueTimes;
    } catch (err) {
      console.error("Failed to fetch distinct EVENT_TIME:", err);
      return [];
    }
  };

  useEffect(() => {
    if (!map) return;

    const handleMoveEnd = () => {
      fetchDynamicData();
    };
    map.on("moveend", handleMoveEnd);
    return () => map.off("moveend", handleMoveEnd);
  }, [map, fetchDynamicData]);

  // Map initialization effect
  useEffect(() => {
    let mapInstance = null;

    const setupMap = async () => {
      try {
        mapInstance = await initializeMap();

        // Event handlers with error handling
        const handleStyleLoad = () => {
          try {
            if (mapInstance.isStyleLoaded()) {
              updateLayers(
                mapInstance,
                geoData,
                showFloodAreaAll,
                showBuildings,
                showStreet,
                showDamGate
              );

              // Restore map position after layer update
              setTimeout(() => {
                if (mapInstance && mapInstance.isStyleLoaded()) {
                  mapInstance.setCenter(currentCenter);
                  mapInstance.setZoom(currentZoom);
                }
              }, 100);
            }
          } catch (error) {
            handleError(
              new MapError(
                "Gagal memuat style peta",
                ERROR_TYPES.LAYER_UPDATE,
                ERROR_SEVERITY.MEDIUM,
                error
              )
            );
          }
        };

        const handleClick = (e) => {
          try {
            const availableLayers = [
              CONFIG.LAYERS.genangan.id,
              CONFIG.LAYERS.bangunan.id,
              CONFIG.LAYERS.jalan.id,
              CONFIG.LAYERS.pintu_air.id,
            ].filter((layerId) => mapInstance.getLayer(layerId));

            const features = mapInstance.queryRenderedFeatures(e.point, {
              layers: availableLayers,
            });

            if (features.length > 0) {
              const feature = features[0];
              const properties = feature.properties || {};
              const allowedAttributes =
                {
                  genangan: ["ZONA", "TMA", "EVENT_TIME"],
                  bangunan: ["HEIGHT"],
                  jalan: ["NAMOBJ", "LUASJLN", "EVENT_TIME"],
                  pintu_air: ["STATUS", "PINTU_AIR"],
                }[feature.layer.id.split("-")[0]] || [];

              let content = `<b>Layer: ${
                feature.layer.id.split("-")[0]
              }</b><br>`;
              allowedAttributes.forEach((key) => {
                if (properties[key] !== undefined && properties[key] !== null) {
                  content += `${key}: ${properties[key]}<br>`;
                }
              });

              setPopup({
                visible: true,
                content,
                coordinates: [e.lngLat.lng, e.lngLat.lat],
              });
            } else {
              setPopup({ visible: false, content: "", coordinates: null });
            }
          } catch (error) {
            handleError(
              new MapError(
                "Gagal memproses klik peta",
                ERROR_TYPES.MAP_INIT,
                ERROR_SEVERITY.LOW,
                error
              )
            );
          }
        };

        const handleMouseMove = (e) => {
          try {
            const availableLayers = [
              CONFIG.LAYERS.genangan.id,
              CONFIG.LAYERS.bangunan.id,
              CONFIG.LAYERS.jalan.id,
              CONFIG.LAYERS.pintu_air.id,
            ].filter((layerId) => mapInstance.getLayer(layerId));

            const features = mapInstance.queryRenderedFeatures(e.point, {
              layers: availableLayers,
            });

            mapInstance.getCanvas().style.cursor = features.length
              ? "pointer"
              : "";
          } catch (error) {
            // Silent error for mouse events
          }
        };

        // Register event handlers
        mapInstance.on("style.load", handleStyleLoad);
        mapInstance.on("click", handleClick);
        mapInstance.on("mousemove", handleMouseMove);

        // Fetch initial data
        await fetchStaticData();
      } catch (error) {
        console.error("Map setup failed:", error);
      }
    };

    setupMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [currentBasemap]);

  // Sync selectedTime with prop
  useEffect(() => {
    if (propSelectedTime !== selectedTime) {
      console.log("Syncing selected time:", propSelectedTime);
      setSelectedTime(propSelectedTime);
    }
  }, [propSelectedTime, selectedTime]);

  // Fetch times first, then trigger dynamic data fetch
  useEffect(() => {
    if (!map) return;

    const fetchTimesAndData = async () => {
      try {
        // Let fetchDynamicData handle everything - it will fetch times and set them
        console.log(">> Starting dynamic data fetch");
        fetchDynamicData();
      } catch (error) {
        console.error("Error in fetchTimesAndData:", error);
      }
    };

    if (map.isStyleLoaded()) {
      fetchTimesAndData();
    } else {
      map.once("load", fetchTimesAndData);
    }
  }, [map, showFloodAreaAll, fetchDynamicData]);

  // Update layers when layer visibility changes (without changing map position)
  useEffect(() => {
    if (!map || !map.isStyleLoaded()) return;

    console.log("🔄 Layer visibility changed:", {
      showFloodAreaAll,
      showBuildings,
      showStreet,
      showDamGate,
    });

    // Store current map position before updating layers
    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();

    updateLayers(
      map,
      geoData,
      showFloodAreaAll,
      showBuildings,
      showStreet,
      showDamGate
    );
  }, [map, geoData, showFloodAreaAll, showBuildings, showStreet, showDamGate]);

  // Force layer update on initial load to ensure all layers are visible
  useEffect(() => {
    if (!map || !map.isStyleLoaded() || isInitialLoad) return;

    console.log("🔄 Initial layer update:", {
      showFloodAreaAll,
      showBuildings,
      showStreet,
      showDamGate,
    });

    updateLayers(
      map,
      geoData,
      showFloodAreaAll,
      showBuildings,
      showStreet,
      showDamGate
    );
  }, [
    map,
    isInitialLoad,
    showFloodAreaAll,
    showBuildings,
    showStreet,
    showDamGate,
  ]);

  // Safe map controls

  const supportsTerrainMode = () => {
    // Kalau basemap sekarang ada terrainSource di CONFIG, berarti support
    return CONFIG.BASEMAPS[currentBasemap]?.terrainSource !== undefined;
  };

  // Hapus handle3DToggle dan ganti dengan:
  const handle2DMode = useCallback(() => {
    try {
      if (!map) return;
      console.log("Switching to 2D mode");
      map.flyTo({
        pitch: 0,
        bearing: 0,
        duration: 1500,
      });
      setIs3DMode(false);
    } catch (error) {
      handleError(
        new MapError(
          "Gagal mengubah ke mode 2D",
          ERROR_TYPES.MAP_INIT,
          ERROR_SEVERITY.LOW,
          error
        )
      );
    }
  }, [map, handleError]);

  const handle3DMode = useCallback(() => {
    try {
      if (!map) return;
      console.log("Switching to 3D mode");
      map.flyTo({
        pitch: 60,
        bearing: -17.6,
        duration: 1500,
      });
      setIs3DMode(true);
    } catch (error) {
      handleError(
        new MapError(
          "Gagal mengubah ke mode 3D",
          ERROR_TYPES.MAP_INIT,
          ERROR_SEVERITY.LOW,
          error
        )
      );
    }
  }, [map, handleError]);

  const handleZoom = useCallback(
    (dir) => {
      try {
        if (!map)
          throw new MapError(
            "Peta tidak tersedia",
            ERROR_TYPES.MAP_INIT,
            ERROR_SEVERITY.LOW
          );
        map[dir === "in" ? "zoomIn" : "zoomOut"]({ duration: 500 });
      } catch (error) {
        handleError(
          error instanceof MapError
            ? error
            : new MapError(
                "Gagal melakukan zoom",
                ERROR_TYPES.MAP_INIT,
                ERROR_SEVERITY.LOW,
                error
              )
        );
      }
    },
    [map, handleError]
  );

  const handleResetView = useCallback(() => {
    try {
      if (!map)
        throw new MapError(
          "Peta tidak tersedia",
          ERROR_TYPES.MAP_INIT,
          ERROR_SEVERITY.LOW
        );
      map.flyTo({ ...CONFIG.INITIAL_VIEW, duration: 1000 });
    } catch (error) {
      handleError(
        error instanceof MapError
          ? error
          : new MapError(
              "Gagal mereset tampilan",
              ERROR_TYPES.MAP_INIT,
              ERROR_SEVERITY.LOW,
              error
            )
      );
    }
  }, [map, handleError]);

  const handleFullscreen = useCallback(() => {
    try {
      const elem = mapRef.current;
      if (!elem)
        throw new MapError(
          "Elemen peta tidak ditemukan",
          ERROR_TYPES.FULLSCREEN,
          ERROR_SEVERITY.LOW
        );

      if (!isFullscreen) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else {
          throw new MapError(
            "Fullscreen tidak didukung browser",
            ERROR_TYPES.FULLSCREEN,
            ERROR_SEVERITY.LOW
          );
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      handleError(
        error instanceof MapError
          ? error
          : new MapError(
              "Gagal mengubah mode fullscreen",
              ERROR_TYPES.FULLSCREEN,
              ERROR_SEVERITY.LOW,
              error
            )
      );
    }
  }, [isFullscreen, handleError]);

  const handleRetryLoad = useCallback(() => {
    setHasError(false);
    setErrorMessage("");
    clearErrors();
    initializeMap();
  }, [initializeMap, clearErrors]);

  // Handler untuk membuka MapOption
  const handleOpenMapOption = useCallback(() => {
    setShowMapOption(true);
  }, []);

  // Handler untuk menutup MapOption
  const handleCloseMapOption = useCallback(() => {
    setShowMapOption(false);
  }, []);

  // Tambahkan handler ini di dalam komponen MapComponent,
  // setelah handler-handler lain seperti handleZoom, handleResetView, dll

  const handleBasemapChange = useCallback(
    (newBasemap) => {
      try {
        if (!map)
          throw new MapError(
            "Peta tidak tersedia",
            ERROR_TYPES.MAP_INIT,
            ERROR_SEVERITY.LOW
          );

        const basemapConfig = CONFIG.BASEMAPS[newBasemap];
        if (!basemapConfig)
          throw new MapError(
            `Basemap '${newBasemap}' tidak ditemukan`,
            ERROR_TYPES.VALIDATION,
            ERROR_SEVERITY.MEDIUM
          );

        console.log("Changing basemap to:", newBasemap);

        // Store current 3D state
        const currentPitch = map.getPitch();
        const currentBearing = map.getBearing();

        // Preserve 3D mode when switching between compatible basemaps
        const shouldPreserve3D = currentPitch > 30 && supportsTerrainMode();

        // Ganti seluruh style
        const newStyle = {
          version: 8,
          sources: {
            basemap: {
              type: "raster",
              tiles: basemapConfig.tiles,
              tileSize: 256,
              maxzoom: 19,
              attribution: basemapConfig.attribution,
            },
          },
          layers: [
            {
              id: "basemap-layer",
              type: "raster",
              source: "basemap",
            },
          ],
          light: {
            anchor: "viewport",
            color: "white",
            intensity: 0.6,
            position: [1.15, 210, 30],
          },
        };

        map.setStyle(newStyle);

        // Setelah style baru selesai dimuat, inject ulang layer custom
        map.once("styledata", () => {
          console.log("Style reloaded. Re-adding custom layers...");
          updateLayers(
            map,
            geoData, // data flood, bangunan, dll.
            showFloodAreaAll,
            showBuildings,
            showStreet,
            showDamGate
          );

          if (shouldPreserve3D || is3DMode) {
            setTimeout(() => {
              map.flyTo({
                pitch: currentPitch > 30 ? currentPitch : 60,
                bearing: currentBearing,
                duration: 1000,
              });
            }, 500);
          }
        });

        setCurrentBasemap(newBasemap);
        setShowBasemap(false);

        console.log("Basemap changed successfully to:", newBasemap);
      } catch (error) {
        console.error("Error changing basemap:", error);
        handleError(
          error instanceof MapError
            ? error
            : new MapError(
                "Gagal mengubah basemap",
                ERROR_TYPES.MAP_INIT,
                ERROR_SEVERITY.MEDIUM,
                error
              )
        );
      }
    },
    [
      map,
      currentBasemap,
      handleError,
      geoData,
      showFloodAreaAll,
      showBuildings,
      showStreet,
      showDamGate,
      is3DMode,
    ]
  );

  // TAMBAHKAN useEffect BARU INI DI SINI - untuk sync 3D mode
  useEffect(() => {
    if (!map) return;

    const handlePitchChange = () => {
      const currentPitch = map.getPitch();
      setIs3DMode(currentPitch > 30);
    };

    map.on("pitchend", handlePitchChange);

    // Initial check
    handlePitchChange();

    return () => {
      map.off("pitchend", handlePitchChange);
    };
  }, [map]);

  // Fullscreen event handler
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // Render error state
  if (hasError) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 200px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <ErrorIcon sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Gagal Memuat Peta
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mb: 3, textAlign: "center" }}
        >
          {errorMessage}
        </Typography>
        <IconButton
          onClick={handleRetryLoad}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100%", position: "absolute" }}>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Box ref={mapRef} sx={{ width: "100%", height: "100%" }} />

      <IconButton
        onClick={() => setShowMapOption((v) => !v)}
        sx={{
          position: "absolute",
          bottom: 397,
          right: 20,
          zIndex: 1000,
          width: 50,
          height: 48,
          borderRadius: "16px",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        <Image
          src="/geoportal/assets/layer-opsi.png"
          alt="Legend Icon"
          width={30}
          height={30}
          style={{ objectFit: "contain" }}
        />
      </IconButton>

      <IconButton
        onClick={() => setShowLegend((v) => !v)}
        sx={{
          position: "absolute",
          bottom: 345,
          right: 20,
          zIndex: 1000,
          width: 50,
          height: 48,
          borderRadius: "16px",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        <Image
          src="/geoportal/assets/legenda-peta3d.png"
          alt="Legend Icon"
          width={30}
          height={30}
          style={{ objectFit: "contain" }}
        />
      </IconButton>

      <IconButton
        onClick={() => setShowBasemap((v) => !v)}
        sx={{
          position: "absolute",
          bottom: 449,
          right: 20,
          zIndex: 1000,
          width: 50,
          height: 48,
          borderRadius: "16px",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        <Image
          src="/geoportal/assets/basemap-peta3d.png"
          alt="Legend Icon"
          width={30}
          height={30}
          style={{ objectFit: "contain" }}
        />
      </IconButton>

      {showLegend && (
        <MapLegend
          showBuildings={showBuildings}
          showFloodAreaAll={showFloodAreaAll}
          showStreet={showStreet}
          showDamGate={showDamGate}
          onClose={() => setShowLegend(false)}
        />
      )}

      {showMapOption && (
        <MapOption
          onClose={handleCloseMapOption}
          onLayerChange={onLayerChange}
          showBuildings={selectedLayers.buildings}
          showDamGate={selectedLayers.damGate}
          showFloodAreaAll={selectedLayers.genanganAll}
          showStreet={selectedLayers.street}
          basemap={basemap}
          onBasemapChange={handleBasemapChange}
        />
      )}

      {showBasemap && (
        <MapBasemap
          basemap={currentBasemap}
          onBasemapChange={handleBasemapChange}
          onClose={() => setShowBasemap(false)}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          bottom: 40,
          right: 20,
          width: 50,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          p: 1,
          borderRadius: 3,
          boxShadow: 2,
          zIndex: 1000,
        }}
      >
        {[
          {
            icon: <ZoomInIcon />,
            onClick: () => handleZoom("in"),
            label: "Zoom in",
          },
          {
            icon: <ZoomOutIcon />,
            onClick: () => handleZoom("out"),
            label: "Zoom out",
          },
          {
            icon: <HomeIcon />,
            onClick: handleResetView,
            label: "Reset view",
          },
          // Tombol 3D sementara pakai HomeIcon
          {
            icon: (
              <Box
                component="img"
                src="/geoportal/assets/2d.png" // Sesuaikan path icon 2D
                alt="2D Icon"
                sx={{
                  width: 24,
                  height: 24,
                  objectFit: "contain",
                  filter: !is3DMode ? "drop-shadow(0 0 4px #1976d2)" : "none",
                  transform: !is3DMode ? "scale(1.1)" : "scale(1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  opacity: !is3DMode ? 1 : 0.7,
                }}
              />
            ),
            onClick: handle2DMode,
            label: "2D view",
            disabled: !is3DMode,
          },
          // Tombol 3D
          {
            icon: (
              <Box
                component="img"
                src="/geoportal/assets/3d.png" // Sesuaikan path icon 3D
                alt="3D Icon"
                sx={{
                  width: 24,
                  height: 24,
                  objectFit: "contain",
                  filter: is3DMode ? "drop-shadow(0 0 4px #1976d2)" : "none",
                  transform: is3DMode ? "scale(1.1)" : "scale(1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  opacity: is3DMode ? 1 : 0.7,
                }}
              />
            ),
            onClick: handle3DMode,
            label: "3D view",
            disabled: is3DMode,
          },
          {
            icon: isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />,
            onClick: handleFullscreen,
            label: isFullscreen ? "Exit fullscreen" : "Enter fullscreen",
          },
        ].map(({ icon, onClick, label, disabled }, i) => (
          <IconButton
            key={i}
            onClick={onClick}
            aria-label={label}
            disabled={disabled}
            sx={{
              "&:hover": {
                bgcolor: disabled ? "transparent" : "rgba(0, 0, 0, 0.04)",
                transform: disabled ? "none" : "scale(1.05)",
              },
              transition: "all 0.2s ease",
              cursor: disabled ? "default" : "pointer",
            }}
          >
            {icon}
          </IconButton>
        ))}
      </Box>

      {popup.visible && (
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            right: 90,
            background: "#fefefe",
            p: 2,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 1000,
            maxWidth: 280,
            border: "1px solid #ccc",
            animation: "fadeIn 0.3s ease-in-out",
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() =>
                setPopup({ visible: false, content: "", coordinates: null })
              }
              aria-label="Close popup"
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            sx={{
              fontSize: "0.875rem",
              color: "#333",
              lineHeight: 1.5,
              px: 1,
            }}
            dangerouslySetInnerHTML={{ __html: popup.content }}
          />
        </Box>
      )}

      {/* Error notification snackbar */}
      {errors.length > 0 && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={clearErrors}
          sx={{ position: "absolute", bottom: 120, right: 20 }}
        >
          <Alert onClose={clearErrors} severity="error" sx={{ width: "100%" }}>
            Ada {errors.length} kesalahan yang terjadi. Periksa konsol untuk
            detail.
          </Alert>
        </Snackbar>
      )}

      {/* Mobile Toggle Buttons */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          display: { xs: "flex", sm: "none" }, // Only show on mobile
          flexDirection: "column",
          gap: 1,
          zIndex: 101,
        }}
      >
        <IconButton
          onClick={() => setShowSlider(!showSlider)}
          sx={{
            width: 40,
            height: 40,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
          }}
        >
          <TimelineIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
        <IconButton
          onClick={() => setShowStatistik(!showStatistik)}
          sx={{
            width: 40,
            height: 40,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 1)" },
          }}
        >
          <BarChartIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
      </Box>

      {/* Render TimeSlider - Mobile (conditional) dan Desktop (always visible) */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 80, sm: 90 },
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 100,
          // Mobile: hanya tampil jika showSlider true, Desktop: selalu tampil
          visibility: { xs: showSlider ? "visible" : "hidden", sm: "visible" },
        }}
      >
        {times.length > 0 ? (
          <TimeSlider
            times={times.map((t) =>
              t && t.includes("T") ? t.split("T")[1].substring(0, 5) : t
            )}
            selectedTime={
              selectedTime && selectedTime.includes("T")
                ? selectedTime.split("T")[1].substring(0, 5)
                : selectedTime
            }
            onTimeChange={(displayTime) => {
              const fullTime =
                times.find(
                  (t) =>
                    t &&
                    t.includes("T") &&
                    t.split("T")[1].substring(0, 5) === displayTime
                ) || times.find((t) => t === displayTime);
              setSelectedTime(fullTime);
              if (onTimeChange) onTimeChange(fullTime);
            }}
            sliderSx={{
              maxWidth: { xs: 350, sm: 400, md: 500 },
              px: { xs: 2, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
        ) : (
          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.9)",
              px: { xs: 2, sm: 3 },
              py: { xs: 1.5, sm: 2 },
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
            >
              Memuat data waktu genangan...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Render Statistik - Mobile (conditional) dan Desktop (always visible) */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 100, sm: 20 },
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 100,
          // Mobile: hanya tampil jika showStatistik true, Desktop: selalu tampil
          visibility: {
            xs: showStatistik ? "visible" : "hidden",
            sm: "visible",
          },
        }}
      >
        <Statistik
          totalLuasGenangan={stats.totalLuasGenangan}
          jumlahBangunanTerdampak={stats.jumlahBangunanTerdampak}
          jumlah_kk={stats.jumlah_kk}
          luas_bangunan={stats.luas_bangunan}
          luasJalanTergenang={stats.luasJalanTergenang}
          ruas_jalan={stats.ruas_jalan}
        />
      </Box>
    </Box>
  );
};

export default MapComponent;
