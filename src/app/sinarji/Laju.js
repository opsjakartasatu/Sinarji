// Laju.js
const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const lajuLayers = [];

// Definisi interval tahun dan nama layer
const lajuIntervals = [
  { start: 1975, end: 1979, name: "Laju_Subs_1975_1979_m" },
  { start: 1980, end: 1984, name: "Laju_Subs_1980_1984_m" },
  { start: 1985, end: 1989, name: "Laju_Subs_1985_1989_m" },
  { start: 1990, end: 1995, name: "Laju_Subs_1990_1995_m" },
  { start: 1996, end: 2010, name: "Laju_Subs_1996_2010_m" },
  { start: 2011, end: 2014, name: "Laju_Subs_2011_2014_m" },
  { start: 2015, end: 2022, name: "Laju_Subs_2015_2022_m" },
  { start: 2023, end: 2024, name: "Laju_Subs_2023_m" },
];

// Fungsi untuk cari nama layer sesuai tahun
function getLajuLayerName(year) {
  const interval = lajuIntervals.find(({ start, end }) => year >= start && year <= end);
  return interval ? interval.name : null;
}

// Generate daftar layer
for (let year = 1975; year <= 2024; year++) {
  const name = getLajuLayerName(year);

  if (name) {
    lajuLayers.push({
      id: `laju-${year}`,
      name, // selalu satu nama sesuai interval
      title: `Laju Subs ${year}`, // tampil per tahun
      opacity: 0.75,
      url,
    });
  }
}

export { url, lajuLayers };
