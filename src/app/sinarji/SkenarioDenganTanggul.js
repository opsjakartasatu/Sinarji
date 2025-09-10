// SkenarioDenganTanggul.js

const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const skenariodengantanggulLayers = [];
for (let year = 2007; year <= 2024; year++) {
  skenariodengantanggulLayers.push({
    id: `robdike-${year}`,
    name: `Rob_Dike_${year}`,
    title: `Dengan Tanggul - ${year}`,
    year, // tambahin properti time series + scroll ke layer yang aktif
    opacity: 0.75,
    url, // penting untuk ambil GEOSERVER_URL_FEWS
  });
}

export { url, skenariodengantanggulLayers };
