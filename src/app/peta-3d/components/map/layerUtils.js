// components/map/layerUtils.js
import { CONFIG } from "./config";
import { cleanGeometry } from "./utils";

export const updateLayers = (
  mapInstance,
  geoData,
  showFloodAreaAll,
  showBuildings,
  showStreet,
  showDamGate
) => {
  if (!mapInstance?.isStyleLoaded()) {
    console.warn("Style not loaded, skipping updateLayers");
    return;
  }

  if (!geoData || typeof geoData !== "object") {
    console.warn("Invalid geoData provided, skipping updateLayers");
    return;
  }

  // PERBAIKAN 1: Urutan layer yang benar (dari bawah ke atas)
  // Layer yang lebih dulu dalam array akan berada di bawah
  const layerOrder = ["jalan", "genangan", "bangunan", "pintu_air"];

  console.time("updateLayers");

  // PERBAIKAN 2: Simpan posisi basemap sebelum update
  const basemapLayerId = "basemap-layer";
  const hasBasemap = !!mapInstance.getLayer(basemapLayerId);

  layerOrder.forEach((key, index) => {
    const layerConfig = CONFIG.LAYERS[key];
    if (!layerConfig) {
      console.warn(`Layer config for ${key} not found`);
      return;
    }

    const { id, source, type, paint, beforeId } = layerConfig;
    const { data, show } = {
      genangan: { data: geoData.genangan, show: showFloodAreaAll },
      bangunan: { data: geoData.bangunan, show: showBuildings },
      jalan: { data: geoData.jalan, show: showStreet },
      pintu_air: { data: geoData.pintu_air, show: showDamGate },
    }[key];

    if (!data || !Array.isArray(data.features)) {
      console.warn(`Missing features for ${source}, hiding layer`);
      if (!mapInstance.getSource(source)) {
        mapInstance.addSource(source, {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
      }
      if (mapInstance.getLayer(id)) {
        mapInstance.setLayoutProperty(id, "visibility", "none");
      }
      return;
    }

    const geoJson = {
      type: "FeatureCollection",
      features: data.features
        .map((f) => ({
          ...f,
          geometry: cleanGeometry(f.geometry),
          properties: {
            ...f.properties,
            HEIGHT: f.properties?.HEIGHT || 10,
            ZONA: f.properties?.ZONA || "N/A",
            TMA: f.properties?.TMA || 0,
          },
        }))
        .filter((f) => f.geometry),
    };

    if (geoJson.features.length === 0) {
      if (mapInstance.getLayer(id)) {
        mapInstance.setLayoutProperty(id, "visibility", "none");
      }
      return;
    }

    // Update source
    if (!mapInstance.getSource(source)) {
      mapInstance.addSource(source, { type: "geojson", data: geoJson });
    } else {
      mapInstance.getSource(source).setData(geoJson);
    }

    // PERBAIKAN 3: Tambah layer dengan positioning yang lebih cerdas
    if (!mapInstance.getLayer(id)) {
      let addBeforeId = null;

      // Untuk layer pertama (jalan), tambahkan setelah basemap jika ada
      if (index === 0 && hasBasemap) {
        // Cari layer setelah basemap untuk dijadikan reference
        const allLayers = mapInstance.getStyle().layers;
        const basemapIndex = allLayers.findIndex(
          (l) => l.id === basemapLayerId
        );
        if (basemapIndex >= 0 && basemapIndex < allLayers.length - 1) {
          addBeforeId = allLayers[basemapIndex + 1].id;
        }
      }
      // Untuk layer lainnya, gunakan beforeId dari config atau layer sebelumnya
      else {
        if (beforeId && mapInstance.getLayer(beforeId)) {
          addBeforeId = beforeId;
        } else if (index > 0) {
          // Tambahkan setelah layer sebelumnya dalam urutan
          const prevLayerKey = layerOrder[index - 1];
          const prevLayerId = CONFIG.LAYERS[prevLayerKey]?.id;
          if (prevLayerId && mapInstance.getLayer(prevLayerId)) {
            // Cari layer setelah layer sebelumnya
            const allLayers = mapInstance.getStyle().layers;
            const prevIndex = allLayers.findIndex((l) => l.id === prevLayerId);
            if (prevIndex >= 0 && prevIndex < allLayers.length - 1) {
              addBeforeId = allLayers[prevIndex + 1].id;
            }
          }
        }
      }

      // Tambah layer
      const layerSpec = {
        id,
        source,
        type,
        paint,
      };

      if (addBeforeId) {
        layerSpec.beforeId = addBeforeId;
      }

      mapInstance.addLayer(layerSpec);
    }

    // Set visibility
    mapInstance.setLayoutProperty(id, "visibility", show ? "visible" : "none");

    // PERBAIKAN 4: Positioning setelah layer ditambah (hanya jika perlu)
    if (
      beforeId &&
      mapInstance.getLayer(beforeId) &&
      mapInstance.getLayer(id)
    ) {
      try {
        mapInstance.moveLayer(id, beforeId);
      } catch (error) {
        console.warn(`Failed to move layer ${id}:`, error);
      }
    }
  });

  // PERBAIKAN 5: Pastikan basemap tetap di paling bawah setelah semua update
  if (hasBasemap) {
    setTimeout(() => {
      try {
        const allLayers = mapInstance.getStyle().layers;
        const basemapIndex = allLayers.findIndex(
          (l) => l.id === basemapLayerId
        );

        if (basemapIndex > 0) {
          console.log("🔧 Moving basemap back to bottom...");
          // Ambil layer paling bawah yang bukan basemap
          const bottomNonBasemapLayer = allLayers.find(
            (l) => l.id !== basemapLayerId && l.type !== "background"
          );

          if (bottomNonBasemapLayer) {
            mapInstance.moveLayer(basemapLayerId, bottomNonBasemapLayer.id);
            console.log("✅ Basemap moved to bottom position");
          }
        }

        // Debug layer order
        debugLayerOrder(mapInstance);
      } catch (error) {
        console.warn("Failed to reorder basemap:", error);
      }
    }, 50);
  }

  console.timeEnd("updateLayers");
};

// UTILITY: Debug layer order
const debugLayerOrder = (mapInstance) => {
  if (!mapInstance) return;

  const layers = mapInstance.getStyle().layers;
  console.log("🔍 Current layer order (bottom to top):");

  layers.forEach((layer, index) => {
    const isBasemap = layer.id.includes("basemap");
    const symbol = isBasemap
      ? "🗺️"
      : layer.type === "fill"
      ? "🟦"
      : layer.type === "line"
      ? "📍"
      : layer.type === "circle"
      ? "⭕"
      : "📍";
  });
};

// UTILITY: Ensure correct layer order (bisa dipanggil dari komponen)
export const ensureBasemapAtBottom = (mapInstance) => {
  if (!mapInstance?.isStyleLoaded()) return;

  const basemapLayerId = "basemap-layer";
  if (!mapInstance.getLayer(basemapLayerId)) return;

  const allLayers = mapInstance.getStyle().layers;
  const basemapIndex = allLayers.findIndex((l) => l.id === basemapLayerId);

  if (basemapIndex > 0) {
    console.log("🔧 Ensuring basemap is at bottom...");
    const bottomLayer = allLayers[0];

    try {
      mapInstance.moveLayer(basemapLayerId, bottomLayer.id);
      console.log("✅ Basemap moved to bottom");
    } catch (error) {
      console.warn("Failed to move basemap:", error);
    }
  }
};

// UTILITY: Force layer order (untuk emergency fix)
export const forceCorrectLayerOrder = (mapInstance) => {
  if (!mapInstance?.isStyleLoaded()) return;

  console.log("🚨 Force fixing layer order...");

  const correctOrder = [
    "basemap-layer", // Paling bawah
    CONFIG.LAYERS.jalan?.id,
    CONFIG.LAYERS.genangan?.id,
    CONFIG.LAYERS.bangunan?.id,
    CONFIG.LAYERS.pintu_air?.id, // Paling atas
  ].filter((id) => id && mapInstance.getLayer(id));

  // Pindah satu per satu dari bawah ke atas
  for (let i = correctOrder.length - 1; i >= 0; i--) {
    const layerId = correctOrder[i];
    const nextLayerId = correctOrder[i + 1];

    try {
      if (nextLayerId) {
        mapInstance.moveLayer(layerId, nextLayerId);
      }
    } catch (error) {
      console.warn(`Failed to move ${layerId}:`, error);
    }
  }

  console.log("✅ Force layer order completed");
  debugLayerOrder(mapInstance);
};
