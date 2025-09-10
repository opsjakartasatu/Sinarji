// WT_AkuiferTertekan2.js

const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const wtakuifertertekan2Layers = [];

// Daftar interval awal (range 5 tahun) -> nama layer
const intervals = [
  { start: 1975, end: 1979, base: 1975 },
  { start: 1980, end: 1984, base: 1980 },
  { start: 1985, end: 1989, base: 1985 },
  { start: 1990, end: 1994, base: 1990 },
  { start: 1995, end: 1999, base: 1995 },
  { start: 2000, end: 2004, base: 2000 },
];

// Fungsi untuk dapatkan nama layer
function getLayerName(year) {
  // cek dulu interval 5 tahunan
  for (const { start, end, base } of intervals) {
    if (year >= start && year <= end) {
      return `BW_Delta_WT_${base}`;
    }
  }
  // kalau di luar interval, berarti 1:1 dengan tahun
  return `BW_Delta_WT_${year}`;
}

// Generate daftar layer
for (let year = 1975; year <= 2024; year++) {
  const name = getLayerName(year);

  wtakuifertertekan2Layers.push({
    id: `wtakuifertertekan2Layers-${year}`,
    name,
    title: `Akuifer Tertekan 2 - ${year}`,
    year, // tambahin properti time series + scroll ke layer yang aktif
    opacity: 0.75,
    url,
  });
}

export { url, wtakuifertertekan2Layers };
