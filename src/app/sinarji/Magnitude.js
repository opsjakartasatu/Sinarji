// Magnitude.js

const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const magnitudeLayers = [];
for (let year = 1975; year <= 2024; year++) {
  magnitudeLayers.push({
    id: `magnitude-${year}`,
    name: `Magnitude_Subs_${year}`,
    title: `Magnitude Subs ${year}`,
    year, // tambahin properti time series + scroll ke layer yang aktif
    opacity: 0.75,
    url, // penting untuk ambil GEOSERVER_URL_FEWS
  });
}

export { url, magnitudeLayers };
