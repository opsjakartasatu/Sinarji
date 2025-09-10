// ReferensiHighTide.js
const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

const hightideLayers = [];
for (let year = 1975; year <= 2024; year++) {
  hightideLayers.push({
    id: `hightide-${year}`,
    name: `DTM_tanpa_tanggul_HighTide_SLR_${year}`,
    title: `HighTide SLR ${year}`,
    year, // tambahin properti time series + scroll ke layer yang aktif
    opacity: 0.75,
    visible: false,
    url, // tambahkan url agar MapView tahu pakai endpoint mana
  });
}

export { url, hightideLayers };
