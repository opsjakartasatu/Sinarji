// IntrusiAirLaut.js

const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const intrusiairlautLayers = [];
for (let year = 2007; year <= 2024; year++) {
  intrusiairlautLayers.push({
    id: `intrusi-${year}`,
    name: `Intrusi_${year}`,
    title: `Intrusi Air Laut - ${year}`,
    year, // tambahin properti time series + scroll ke layer yang aktif
    opacity: 0.75,
    url, // penting untuk ambil GEOSERVER_URL_FEWS
  });
}

export { url, intrusiairlautLayers };
