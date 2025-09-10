// SkenarioBanjirQ50.js

const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const skenariobanjirq50Layers = [];
for (let year = 2007; year <= 2024; year++) {
  skenariobanjirq50Layers.push({
    id: `q50-${year}`,
    name: `Banjir_Q50_${year}`,
    title: `Banjir Q50 - ${year}`,
    year, // tambahin properti time series + scroll ke layer yang aktif
    opacity: 0.75,
    url, // penting untuk ambil GEOSERVER_URL_FEWS
  });
}

export { url, skenariobanjirq50Layers };
