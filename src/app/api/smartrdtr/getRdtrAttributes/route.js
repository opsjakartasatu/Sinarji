import { NextResponse } from "next/server";

const rdtrAttributes = [
  { key: "NAMOBJ", label: "Nama Objek" },
  { key: "NAMZON_1", label: "Nama Zona" },
  { key: "KODZON_1", label: "Kode Zona" },
  { key: "NAMSZN_1", label: "Nama Subzona" },
  { key: "KODSZN_1", label: "Kode Subzona" },
  { key: "JNSRPR", label: "Jenis Rencana Pola Ruang" },
  { key: "KODEWP", label: "Kode WP" },
  { key: "KODSWP", label: "Kode SWP" },
  { key: "KODBLK", label: "Kode Blok" },
  { key: "KODSBL", label: "Kode Sub Blok" },
  { key: "WADMPR", label: "Wilayah Administrasi Provinsi" },
  { key: "WADMKK", label: "Wilayah Administrasi Kabupaten/Kota" },
  { key: "WADMKC", label: "Wilayah Administrasi Kecamatan" },
  { key: "WADMKD", label: "Wilayah Administrasi Kelurahan/Desa" },
  { key: "KKOP_1", label: "Kawasan Keselamatan Operasi Penerbangan" },
  { key: "LP2B_2", label: "Lahan Pertanian Pangan Berkelanjutan" },
  { key: "KRB_03", label: "Kawasan Rawan Bencana" },
  { key: "TOD_04", label: "Kawasan Berorientasi Transit" },
  { key: "TEB_05", label: "Tempat Evakuasi Bencana" },
  { key: "PUSLIT", label: "Pusat Penelitian" },
  { key: "CAGBUD", label: "Kawasan Cagar Budaya" },
  { key: "RESAIR", label: "Kawasan Resapan Air" },
  { key: "KSMPDN", label: "Kawasan Sempadan" },
  { key: "HANKAM", label: "Kawasan Pertanahan dan Keamanan" },
  { key: "KKARST", label: "Kawasan Karst" },
  { key: "PTBGMB", label: "Kawasan Pertambangan Mineral dan Batubara" },
  { key: "MGRSAT", label: "Kawasan Migrasi Satwa" },
  { key: "RDBUMI", label: "Ruang Dalam Bumi" },
  { key: "TPZ_00", label: "Teknik Pengaturan Zonasi" },
  { key: "REMARK", label: "Catatan" },
  { key: "LUASHA", label: "Luas Area" },
  { key: "KDB", label: "KDB" },
  { key: "KLB_FINAL", label: "KLB" },
  { key: "KTB", label: "KTB" },
  { key: "KDH", label: "KDH" },
  { key: "BST", label: "Bersyarat" },
  { key: "IZN", label: "Diizinkan" },
  { key: "TBS", label: "Terbatas Bersyarat" },
  { key: "TBT", label: "Terbatas" },
];

export async function POST(request) {
  const formData = await request.formData();

  const layerUrl = formData.get("layerUrl");
  const geometry = JSON.parse(formData.get("geometry"));
  const spatialReference = formData.get("spatialReference");
  const mapExtent = JSON.parse(formData.get("mapExtent"));
  const viewWidth = formData.get("viewWidth");
  const viewHeight = formData.get("viewHeight");

  const identifyUrl = `${layerUrl}/identify`;
  const params = new URLSearchParams({
    geometry: JSON.stringify(geometry),
    geometryType: "esriGeometryPoint",
    sr: spatialReference,
    mapExtent: JSON.stringify(mapExtent),
    tolerance: "5",
    imageDisplay: `${viewWidth},${viewHeight},96`,
    returnGeometry: "true",
    f: "json",
    returnFieldName: "true",
  });

  try {
    const response = await fetch(`${identifyUrl}?${params.toString()}`);
    const data = await response.json();

    const filteredResults = data.results.map((result) => {
      const filteredAttrs = {};

      rdtrAttributes.forEach(({ key, label }) => {
        if (result.attributes[key] !== undefined) {
          filteredAttrs[label] = result.attributes[key];
        }
      });

      return {
        layerName: result.layerName,
        geometry: result.geometry,
        attributes: filteredAttrs,
      };
    });

    return NextResponse.json({ results: filteredResults }, { status: 200 });
  } catch (err) {
    console.error("Error fetching attributes:", err);
    return NextResponse.json(
      { error: "Failed to fetch RDTR attributes." },
      { status: 500 }
    );
  }
}
