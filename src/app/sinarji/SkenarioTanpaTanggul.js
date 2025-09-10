// SkenarioTanpaTanggul.js

const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const skenariotanpatanggulLayers = [];
for (let year = 2007; year <= 2024; year++) {
  skenariotanpatanggulLayers.push({
    id: `robnodike-${year}`,
    name: `Rob_NoDike_${year}`,
    title: `Tanpa Tanggul - ${year}`,
    year, // tambahin properti time series + scroll ke layer yang aktif
    opacity: 0.75,
    url, // penting untuk ambil GEOSERVER_URL_FEWS
  });
}

export { url, skenariotanpatanggulLayers };
