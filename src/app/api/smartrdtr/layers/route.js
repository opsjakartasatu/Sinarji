import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const data = {
      message: "Success",
      data: [
        {
          name: "Rencana Struktur Ruang",
          visible: false,
          layers: [
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/1",
              title: "Rencana Infrastruktur Transportasi",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/2",
              title: "Rencana Infrastruktur Telekomunikasi",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/3",
              title: "Rencana Infrastruktur Sumber Daya Air",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/4",
              title: "Rencana Pengembangan Pusat Pelayanan",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/5",
              title: "Rencana Infrastruktur Prasarana Lainnya",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/6",
              title: "Rencana Jaringan Persampahan",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/7",
              title: "Rencana Infrastruktur Energi",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/8",
              title: "Rencana Infrastruktur Drainase",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/9",
              title:
                "Rencana Infrastruktur Pengelolaan Air Limbah dan Pengelolaan Limbah Bahan Berbahaya dan Beracun (B3)",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/10",
              title: "Rencana Infrastruktur Air Minum",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/11",
              title: "Rencana Jaringan Transportasi",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/12",
              title: "Rencana Jaringan Telekomunikasi",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/13",
              title: "Rencana Jaringan Sumber Daya Air",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/14",
              title: "Rencana Jaringan Prasarana Lainnya",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/15",
              title: "Rencana Jaringan Energi",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/16",
              title: "Rencana Jaringan Drainase",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/17",
              title:
                "Rencana Jaringan Pengelolaan Air Limbah dan Pengelolaan Limbah Bahan Berbahaya dan Beracun (B3)",
              opacity: 0.5,
              visible: true,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Rencana_Struktur_Ruang/MapServer/18",
              title: "Rencana Jaringan Air Minum",
              opacity: 0.5,
              visible: true,
            },
          ],
        },
        {
          name: "Peta Riwayat Tata Ruang",
          visible: false,
          layers: [
            {
              url: "https://tataruang.jakarta.go.id/server/rest/services/peta_operasional/Informasi_Rencana_Kota_DKI_Jakarta_View/FeatureServer/3",
              title: "Rencana Detail Tata Ruang 2014",
              visible: true,
              opacity: 0.5,
              id: 1,
            },
            {
              url: "https://tataruang.jakarta.go.id/server/rest/services/peta_operasional/Informasi_Rencana_Kota_DKI_Jakarta_View/FeatureServer/2",
              title: "Rencana Jalan 2014",
              visible: true,
              opacity: 0.5,
              id: 2,
            },
            {
              url: "https://tataruang.jakarta.go.id/server/rest/services/peta_operasional/Informasi_Rencana_Kota_DKI_Jakarta_View/FeatureServer/0",
              title: "Rencana Dimensi Jalan 2014",
              visible: true,
              opacity: 0.5,
              id: 3,
            },
            {
              url: "https://tataruang.jakarta.go.id/server/rest/services/peta_operasional/Informasi_Rencana_Kota_DKI_Jakarta_View/FeatureServer/1",
              title: "Rencana Dimensi Sungai 2014",
              visible: true,
              opacity: 0.5,
              id: 4,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/RRTRWC_2005/FeatureServer/0",
              title: "Rencana Rinci Tata Ruang Wilayah 2005",
              visible: true,
              opacity: 0.5,
              id: 5,
            },
          ],
        },
        {
          name: "Peta Tematik RDTR",
          visible: false,
          layers: [
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/0",
              title: "Zona Pengendalian Pertumbuhan",
              visible: true,
              opacity: 0.5,
              id: 6,
              attributes: [
                {key: "TPZ", label: "TPZ"}
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/1",
              title: "Koridor GSB Nol",
              visible: true,
              opacity: 0.5,
              id: 7,
              attributes: [
                {key: "NAMOBJ", label: "Nama Objek"},
                {key: "REMARK", label: "Catatan"},
                {key: "SBDATA", label: "Sumber"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/2",
              title: "Kawasan Berorientasi Transit",
              visible: true,
              opacity: 0.5,
              id: 8,
              attributes: [
                {key: "nama_stasi", label: "Nama Stasiun"},
                {key: "namobj", label: "Nama Objek"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/3",
              title: "Kawasan Kompak",
              visible: true,
              opacity: 0.5,
              id: 9,
              attributes: [
                {key: "nama_udgl", label: "Nama Kawasan"},
                {key: "namobj", label: "Nama Objek"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/4",
              title: "Zona Ketentuan Khusus",
              visible: true,
              opacity: 0.5,
              id: 10,
              attributes: [
                {key: "tpz", label: "TPZ"},
                {key: "kawasan", label: "Kawasan"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/5",
              title: "Zona Ambang",
              visible: true,
              opacity: 0.5,
              id: 11,
              attributes: [
                {key: "tpz", label: "TPZ"},
                {key: "namobj", label: "Nama Objek"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/6",
              title: "Zona Pelestarian Cagar Budaya",
              visible: true,
              opacity: 0.5,
              id: 12,
              attributes: [
                {key: "tpz", label: "TPZ"},
                {key: "namobj", label: "Nama Objek"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/7",
              title: "Kawasan Bebas Air Tanah",
              visible: true,
              opacity: 0.5,
              id: 13,
              attributes: [
                {key: "nama", label: "Nama"},
                {key: "wilayah", label: "Wilayah"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/8",
              title: "Jalan Bebas Air Tanah",
              visible: true,
              opacity: 0.5,
              id: 14,
              attributes: [
                {key: "nama", label: "Nama"},
                {key: "wilayah", label: "Wilayah"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/9",
              title: "Potensi RTH dan RTB",
              visible: true,
              opacity: 0.5,
              id: 15,
              attributes: [
                {key: "namobj", label: "Keterangan"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/10",
              title: "Kawasan Keselamatan Operasi Penerbangan",
              visible: true,
              opacity: 0.5,
              id: 16,
              attributes: [
                {key: "bandara", label: "Nama Bandara"},
                {key: "kawasan", label: "Kawasan"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/11",
              title: "Bangunan Cagar Budaya",
              visible: true,
              opacity: 0.5,
              id: 17,
              attributes: [
                {key: "namobj", label: "Nama Bangunan"},
                {key: "cagbud", label: "Jenis"},
                {key: "alamat", label: "Alamat"},
                {key: "sbdata", label: "Sumber"},
                {key: "golongan", label: "Golongan"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/12",
              title: "Daerah Pelayanan IPAL",
              visible: true,
              opacity: 0.5,
              id: 18,
              attributes: [
                {key: "remark", label: "Catatan"}
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/13",
              title: "Daerah Layanan Polder",
              visible: true,
              opacity: 0.5,
              id: 19,
              attributes: [
                {key: "namobj", label: "Nama Objek"}
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/14",
              title: "Intensitas Zona Perdagangan dan Jasa",
              visible: true,
              opacity: 0.5,
              id: 20,
              attributes: [
                {key: "NAMOBJ", label: "Nama Objek"},
                {key: "total_skor", label: "Skor Performa"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/15",
              title: "Koridor Pembatasan Lalu Lintas",
              visible: true,
              opacity: 0.5,
              id: 21,
              attributes: [
                {key: "NAMOBJ", label: "Nama Objek"},
                {key: "REMARK", label: "Catatan"},
                {key: "SBDATA", label: "Sumber"}
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/16",
              title: "Kawasan Rawan Penurunan Muka Tanah",
              visible: true,
              opacity: 0.5,
              id: 22,
              attributes: [
                {key: "namobj", label: "Nama Objek"}
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/17",
              title: "Kawasan Rawan Banjir",
              visible: true,
              opacity: 0.5,
              id: 23,
              attributes: [
                {key: "hazard_cla", label: "Klasifikasi"}
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/18",
              title: "Zona Bonus",
              visible: true,
              opacity: 0.5,
              id: 24,
              attributes: [
                {key: "namobj", label: "Nama Objek"},
                {key: "skor_bon", label: "Skor Bonus"},
              ]
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Peta_Tematik_RDTR/FeatureServer/19",
              title: "Zona Intensitas Sangat Tinggi",
              visible: true,
              opacity: 0.5,
              id: 25,
              attributes: [
                {key: "namobj", label: "Nama Objek"},
                {key: "wadmpr", label: "Provinsi"},
                {key: "wadmkk", label: "Kabupaten/Kota"},
                {key: "wadmkc", label: "Kecamatan"},
                {key: "wadmkd", label: "Kelurahan"},
              ]
            },
          ],
        },
        {
          name: "Rencana Pola Ruang RDTR",
          visible: true,
          layers: [
            {
              url: "https://tataruang.jakarta.go.id/server/rest/services/Peta_Operasional_RDTR_View/MapServer/0",
              title: "Rencana Pola Ruang RDTR",
              visible: true,
              opacity: 0.5,
              id: 26,
              attributes: [
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
                { key: "PTBGMB", label: "Kawasan Pertambangan Mineral dan Batubara"},
                { key: "MGRSAT", label: "Kawasan Migrasi Satwa" },
                { key: "RDBUMI", label: "Ruang Dalam Bumi" },
                { key: "TPZ_00", label: "Teknik Pengaturan Zonasi" },
                { key: "REMARK", label: "Catatan" },
                { key: "LUASHA", label: "Luas Area" },
                { key: "KLB_FINAL", label: "KLB" },
                { key: "KDB", label: "KDB" },
                { key: "KDH", label: "KDH" },
                { key: "KTB", label: "KTB" },
                { key: "BST", label: "Bersyarat" },
                { key: "IZN", label: "Diizinkan" },
                { key: "TBS", label: "Terbatas Bersyarat" },
                { key: "TBT", label: "Terbatas" },
              ],
            },
          ],
        },
        {
          name: "Persil BPN",
          visible: false,
          layers: [
            {
              url: "https://dki-siap.atrbpn.go.id/server/rest/services/persil_k3/MapServer/0",
              title: "Persil BPN",
              visible: true,
              opacity: 0.5,
              id: 27,
              attributes: [
                { key: "nib", label: "NIB" },
                { key: "jenishak", label: "Jenis Hak" },
                { key: "luastertulis", label: "Luas Tertulis" },
                { key: "tanggal_update", label: "Tanggal Update" },
              ],
            },
          ],
        },
        {
          name: "Batas Wilayah",
          visible: false,
          layers: [
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/5",
              title: "Batas Administrasi Kabupaten/Kota",
              visible: true,
              opacity: 0.5,
              id: 28,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/4",
              title: "Batas Administrasi Kecamatan",
              visible: true,
              opacity: 0.5,
              id: 29,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/3",
              title: "Batas Administrasi Kelurahan",
              visible: true,
              opacity: 0.5,
              id: 30,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/2",
              title: "Batas Administrasi RW",
              visible: true,
              opacity: 0.5,
              id: 31,
            },
            {
              url: "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/1",
              title: "Batas Administrasi RT",
              visible: true,
              opacity: 0.5,
              id: 32,
            },
          ],
        },
      ],
    };
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
