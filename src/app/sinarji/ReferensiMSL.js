// ReferensiMSL.js
const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const mslLayers = [];
for (let year = 1975; year <= 2024; year++) {
  mslLayers.push({
    id: `msl-${year}`,
    name: `DTM_tanpa_tanggul_MSL_SLR_${year}`,
    title: `MSL SLR ${year}`,
    year, // tambahin properti time series + scroll ke layer yang aktif
    visible: false,
    opacity: 0.75,
    url, // penting untuk ambil GEOSERVER_URL_FEWS
  });
}

export { url, mslLayers };
