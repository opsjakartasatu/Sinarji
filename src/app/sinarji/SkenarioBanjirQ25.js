// SkenarioBanjirQ25.js

const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const skenariobanjirq25Layers = [];
for (let year = 2007; year <= 2024; year++) {
  skenariobanjirq25Layers.push({
    id: `q25-${year}`,
    name: `Banjir_Q25_${year}`,
    title: `Banjir Q25 - ${year}`,
    year, // tambahin properti time series + scroll ke layer yang aktif
    opacity: 0.75,
    url, // penting untuk ambil GEOSERVER_URL_FEWS
  });
}

export { url, skenariobanjirq25Layers };
