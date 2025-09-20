const url = "https://sinarji-geo.dsdajakarta.id/geoserver/fews/wms?";

// === Default WMS Options ===
const defaultWMSOpts = {
  version: "1.1.1",
  spatialReference: { wkid: 32748 }, // sesuai XML
  customParameters: {
    styles: "fews_raster_ht_tt", // default style dari capabilities
  },
};

/**
 * Helper umum untuk bikin daftar layer tahunan
 */
function generateLayers(prefix, nameFn, titleFn, start, end, opts = {}) {
  const layers = [];
  for (let year = start; year <= end; year++) {
    const name = nameFn(year);
    if (!name) continue;
    layers.push({
      id: `${prefix}-${year}`,
      name,
      title: titleFn(year),
      year,
      intervalBase: opts.intervalBaseFn ? opts.intervalBaseFn(year) : year,
      opacity: opts.opacity ?? 0.75,
      visible: opts.visible ?? false,
      url,
      wmsOpts: { ...defaultWMSOpts, ...(opts.wmsOpts || {}) }, // merge default + custom
    });
  }
  return layers;
}

// === Interval Helper ===
const akuiferIntervals = [
  { start: 1975, end: 1979, base: 1975 },
  { start: 1980, end: 1984, base: 1980 },
  { start: 1985, end: 1989, base: 1985 },
  { start: 1990, end: 1994, base: 1990 },
  { start: 1995, end: 1999, base: 1995 },
  { start: 2000, end: 2004, base: 2000 },
];
function getIntervalBase(year) {
  const interval = akuiferIntervals.find(({ start, end }) => year >= start && year <= end);
  return interval ? interval.base : year;
}

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
function getLajuLayerName(year) {
  const interval = lajuIntervals.find(({ start, end }) => year >= start && year <= end);
  return interval ? interval.name : null;
}

// === Layer Tahunan ===
const hightideLayers = generateLayers(
  "hightide",
  (year) => `DTM_tanpa_tanggul_HighTide_SLR_${year}`,
  (year) => `High Tide - ${year}`,
  1975,
  2024
);

const mslLayers = generateLayers(
  "msl",
  (year) => `DTM_tanpa_tanggul_MSL_SLR_${year}`,
  (year) => `MSL - ${year}`,
  1975,
  2024
);

const lajuLayers = generateLayers(
  "laju",
  (year) => getLajuLayerName(year),
  (year) => `Laju Subs ${year}`,
  1975,
  2024
);

const magnitudeLayers = generateLayers(
  "magnitude",
  (year) => `Magnitude_Subs_${year}`,
  (year) => `Magnitude Subs - ${year}`,
  1975,
  2024
);

const wtakuifertertekan1Layers = generateLayers(
  "wtakuifertertekan1",
  (year) => `AT_Delta_WT_${getIntervalBase(year)}`,
  (year) => `WT Akuifer Tertekan 1 - ${year}`,
  1975,
  2024
);

const wtakuifertertekan2Layers = generateLayers(
  "wtakuifertertekan2",
  (year) => `BW_Delta_WT_${getIntervalBase(year)}`,
  (year) => `WT Akuifer Tertekan 2 - ${year}`,
  1975,
  2024
);

const akuifertertekan1Layers = generateLayers(
  "akuifertertekan1",
  (year) => `KA_Delta_WT_${getIntervalBase(year)}`,
  (year) => `Akuifer Tertekan 1 - ${year}`,
  1975,
  2024
);

const akuifertertekan2Layers = generateLayers(
  "akuifertertekan2",
  (year) => `KAB_Delta_WT_${getIntervalBase(year)}`,
  (year) => `Akuifer Tertekan 2 - ${year}`,
  1975,
  2024
);

const zonatertekan1Layers = generateLayers(
  "zonatertekan1",
  (year) => `za_${year}`,
  (year) => `Zona Tertekan 1 - ${year}`,
  1975,
  2024
);

const zonatertekan2Layers = generateLayers(
  "zonatertekan2",
  (year) => `zb_${year}`,
  (year) => `Zona Tertekan 2 - ${year}`,
  1975,
  2024
);

const intrusiairlautLayers = generateLayers(
  "intrusiairlaut",
  (year) => `Intrusi_${year}`,
  (year) => `Intrusi Air Laut - ${year}`,
  2007,
  2024
);

const skenariobanjirq5Layers = generateLayers(
  "skenariobanjirq5",
  (year) => `Banjir_Q5_${year}`,
  (year) => `Banjir Q5 - ${year}`,
  2007,
  2024
);

const skenariobanjirq25Layers = generateLayers(
  "skenariobanjirq25",
  (year) => `Banjir_Q25_${year}`,
  (year) => `Banjir Q25 - ${year}`,
  2007,
  2024
);

const skenariobanjirq50Layers = generateLayers(
  "skenariobanjirq50",
  (year) => `Banjir_Q50_${year}`,
  (year) => `Banjir Q50 - ${year}`,
  2007,
  2024
);

const skenariotanpatanggulLayers = generateLayers(
  "skenariotanpatanggul",
  (year) => `Rob_Dike_${year}`,
  (year) => `Tanpa Tanggul - ${year}`,
  2007,
  2024
);

const skenariodengantanggulLayers = generateLayers(
  "skenariodengantanggul",
  (year) => `Rob_NoDike_${year}`,
  (year) => `Dengan Tanggul - ${year}`,
  2007,
  2024
);

// Export semua
export {
  hightideLayers,
  mslLayers,
  lajuLayers,
  magnitudeLayers,
  wtakuifertertekan1Layers,
  wtakuifertertekan2Layers,
  akuifertertekan1Layers,
  akuifertertekan2Layers,
  zonatertekan1Layers,
  zonatertekan2Layers,
  intrusiairlautLayers,
  skenariobanjirq5Layers,
  skenariobanjirq25Layers,
  skenariobanjirq50Layers,
  skenariotanpatanggulLayers,
  skenariodengantanggulLayers,
};
