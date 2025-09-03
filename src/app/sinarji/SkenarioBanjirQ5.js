// SkenarioBanjirQ5.js

const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const skenariobanjirq5Layers = [];
for (let year = 2007; year <= 2024; year++) {
  skenariobanjirq5Layers.push({
    id: `q5-${year}`,
    name: `Banjir_Q5_${year}`,
    title: `Banjir Q5 - ${year}`,
    // visible: year === 1975, // default aktif hanya 1975
    opacity: 0.75,
    url, // penting untuk ambil GEOSERVER_URL_FEWS
  });
}

export { url, skenariobanjirq5Layers };
