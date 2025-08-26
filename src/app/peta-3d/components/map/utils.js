// components/map/utils.js
import { toast } from "react-toastify";
import { CONFIG } from "./config";

export const cleanGeometry = (geometry) => {
  if (!geometry || !geometry.type || !geometry.coordinates) {
    console.warn("Invalid geometry provided");
    return null;
  }

  const closeRingIfNeeded = (ring) => {
    const first = ring[0];
    const last = ring[ring.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
      ring.push(first);
    }
    return ring;
  };

  const filterUnique = (ring) =>
    ring.filter(
      (pt, i, arr) =>
        i === arr.length - 1 ||
        pt[0] !== arr[(i + 1) % arr.length][0] ||
        pt[1] !== arr[(i + 1) % arr.length][1]
    );

  if (geometry.type === "Point") {
    return geometry.coordinates.length >= 2 ? geometry : null;
  }

  if (geometry.type === "Polygon") {
    const cleaned = geometry.coordinates
      .map((ring) => {
        const unique = filterUnique(ring);
        if (unique.length >= 4) {
          return closeRingIfNeeded(unique);
        }
        return null;
      })
      .filter(Boolean);

    return cleaned.length > 0
      ? { type: "Polygon", coordinates: cleaned }
      : null;
  }

  if (geometry.type === "MultiPolygon") {
    const cleaned = geometry.coordinates
      .map((polygon) =>
        polygon
          .map((ring) => {
            const unique = filterUnique(ring);
            if (unique.length >= 4) {
              return closeRingIfNeeded(unique);
            }
            return null;
          })
          .filter(Boolean)
      )
      .filter((poly) => poly.length);

    return cleaned.length
      ? { type: "MultiPolygon", coordinates: cleaned }
      : null;
  }

  console.warn("Unsupported geometry type:", geometry.type);
  return null;
};

export const parseTime = (eventTime) => {
  if (typeof eventTime !== "string") return null;
  if (eventTime.includes("T")) {
    const timePart = eventTime.split("T")[1];
    return timePart?.substring(0, 5) || null;
  }
  return eventTime.length >= 5 ? eventTime.substring(0, 5) : null;
};

export const timeToMinutes = (timeStr) => {
  try {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  } catch {
    return null;
  }
};

export const formatCQLTime = (timeStr, dateStr = "2025-05-28") => {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(":").map(Number);
  const date = new Date(dateStr);
  date.setUTCHours(h, m, 0, 0);
  return date.toISOString().replace(".000Z", "Z");
};

export const fetchGeoData = async (url, errorMsg = "Failed to fetch data") => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      mode: "cors",
      credentials: "omit",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${errorMsg}`);
    const data = await res.json();
    console.log(`API ${url} response:`, data);

    // Handle WFS response
    if (url.includes(CONFIG.WFS_URL)) {
      const validFeatures = (data.features || [])
        .map((f) => ({
          ...f,
          geometry: cleanGeometry(f.geometry),
          properties: {
            ...f.properties,
            ZONA: f.properties?.ZONA || "N/A",
            TMA: f.properties?.TMA || 0,
          },
        }))
        .filter((f) => f.geometry);
      return { type: "FeatureCollection", features: validFeatures };
    }

    // Handle TIME API response
    if (url.includes(CONFIG.TIME_API_URL)) {
      return Array.isArray(data)
        ? data.map((item) => ({
            jam: item.jam,
            stats: {
              totalLuasGenangan: item.area_banjir || 0,
              jumlahBangunanTerdampak: item.jumlah_bangunan || 0,
              luasJalanTergenang: item.jalan_banjir || 0,
              jumlah_kk: item.jumlah_kk || 0,
              luas_bangunan: item.luas_bangunan || 0,
              ruas_jalan: item.ruas_jalan || 0,
            },
          }))
        : [];
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    toast.error(errorMsg);
    return url.includes(CONFIG.TIME_API_URL)
      ? []
      : { type: "FeatureCollection", features: [] };
  }
};

export const calculateCentroid = (geoData) => {
  const activeFeatures = [
    ...(geoData.genangan?.features || []),
    ...(geoData.bangunan?.features || []),
    ...(geoData.jalan?.features || []),
  ];
  if (activeFeatures.length === 0) return CONFIG.INITIAL_VIEW.center;

  let lngSum = 0,
    latSum = 0,
    count = 0;

  activeFeatures.forEach((feature) => {
    if (!feature.geometry) return;
    const { type, coordinates } = feature.geometry;
    if (type === "Point") {
      lngSum += coordinates[0];
      latSum += coordinates[1];
      count++;
    } else if (type === "Polygon") {
      coordinates[0].forEach(([lng, lat]) => {
        lngSum += lng;
        latSum += lat;
        count++;
      });
    } else if (type === "MultiPolygon") {
      coordinates.forEach((polygon) =>
        polygon[0].forEach(([lng, lat]) => {
          lngSum += lng;
          latSum += lat;
          count++;
        })
      );
    }
  });

  return count > 0
    ? [lngSum / count, latSum / count]
    : CONFIG.INITIAL_VIEW.center;
};
