import { NextResponse } from "next/server";

export async function GET(req) {
    if (req.method === 'GET') {
        const lampiranRDTRAPI =
        {
            "status": true,
            "message": "Success",
            "data": [
                {
                    "id": 1,
                    "judul1": "Lampiran I",
                    "judul2": " - Peta Batas Wilayah Administrasi Darat",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/e11643efccda467d8b0a4a39ee6520be/data",
                    "iframe": null,
                },
                {
                    "id": 2,
                    "judul1": "Lampiran II",
                    "judul2": " - Peta Rencana Pengembangan Pusat Pelayanan",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/8b15cc44cf354dda8a5c042ea49a8610/data",
                    "iframe": null,
                    "akordion": [
                        {
                            "judul1": "Lampiran II",
                            "judul2": " - Peta Rencana Pengembangan Pusat Pelayanan",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/8b15cc44cf354dda8a5c042ea49a8610/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran II",
                            "judul2": " - Peta Rencana Jaringan Transportasi",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/2eb23d1dc5ce4326a094e73b6239824b/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran II",
                            "judul2": " - Peta Rencana Jaringan Energi",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/c84b6462294d41f384528324b4b28cf1/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran II",
                            "judul2": " - Peta Rencana Jaringan Telekomunikasi",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/20f8da8b8d044448be3567b293ee4c7f/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran II",
                            "judul2": " - Peta Rencana Prasarana Sumber Daya Air",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/9d0a17d49a8d4af9abedba7f9c3d2433/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran II",
                            "judul2": " - Peta Rencana Jaringan Air Minum",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/070ba9bac84e4a68be3466dfac68a784/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran II",
                            "judul2": " - Peta Rencana Jaringan Drainase",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/0b0f5fc1e8cc41e382051c127bae22ae/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran II",
                            "judul2": " - Peta Rencana Jaringan Air Limbah dan Limbah Bahan Berbahaya dan Beracun (B3)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/2efa4fb7fa364197a18545400ffdbbc1/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran II",
                            "judul2": " - Peta Rencana Prasarana Persampahan",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/5246abcb56624dc5997d2a1557932303/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran II",
                            "judul2": " - Peta Rencana Jaringan Prasarana Lainnya",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/a2c66dfafa214921b034670f2230debb/data",
                            "iframe": null
                        }
                    ],
                },
                {
                    "id": 3,
                    "judul1": "Lampiran III",
                    "judul2": " - Peta Koridor Pembatasan Lalu Lintas",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/81dc8a87f4a34899b799f05af56c7e23/data",
                    "iframe": null
                },
                {
                    "id": 4,
                    "judul1": "Lampiran IV",
                    "judul2": " - Peta Daerah Layanan Polder",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/b54ea2dbd1844817b81e42a8e1f2d159/data",
                    "iframe": null
                },
                {
                    "id": 5,
                    "judul1": "Lampiran V",
                    "judul2": " - Peta Daerah Pelarangan Penggunaan Air Tanah",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/b8d9384169e34c9aa728b0c9720c366f/data",
                    "iframe": null
                },
                {
                    "id": 6,
                    "judul1": "Lampiran VI",
                    "judul2": " - Peta Daerah Layanan IPAL",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/00b27645d66a4812999aa13a391740b5/data",
                    "iframe": null
                },
                {
                    "id": 7,
                    "judul1": "Lampiran VII",
                    "judul2": " - Klasifikasi dan Kriteria Zona dan Sub Zona",
                    "gambar": null,
                    "iframe": "https://drive.google.com/file/d/1H2KhhYlU55izqU-sssoKJgIbowG6n5RW/preview",
                },
                {
                    "id": 8,
                    "judul1": "Lampiran VIII",
                    "judul2": " - Peta Rencana Pola Ruang",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/2c66d9ba791645d9958cdcd7018c7c36/data",
                    "iframe": null,
                },
                {
                    "id": 9,
                    "judul1": "Lampiran IX",
                    "judul2": " - Indikasi Program Pemanfaatan Ruang",
                    "gambar": null,
                    "iframe": "https://drive.google.com/file/d/1obF-RirftS2SNIwH9Y8buMDlkl5lSxSJ/preview",
                },
                {
                    "id": 10,
                    "judul1": "Lampiran X",
                    "judul2": " - Ketentuan Kegiatan dan Penggunaan Lahan dalam Zona/Sub Zona untuk Fungsi Bangunan",
                    "gambar": null,
                    "iframe": "https://drive.google.com/file/d/1yNv4YV-U7qbKyDr6TVb-nLqyCJZswQHh/preview",
                },
                {
                    "id": 11,
                    "judul1": "Lampiran XI",
                    "judul2": " - Intensitas Pemanfaatan Ruang",
                    "gambar": null,
                    "iframe": "https://drive.google.com/file/d/1OoIAXX8A35qGJHpu1pFxLZIlb7kqDdQR/preview",
                },
                {
                    "id": 12,
                    "judul1": "Lampiran XII",
                    "judul2": " - Peta Intensitas Pemanfaatan Ruang Sub Zona K-1, K-2, dan K-3",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/e6372c0bfaf44a359433ed0511684e5f/data",
                    "iframe": null
                },
                {
                    "id": 13,
                    "judul1": "Lampiran XIII",
                    "judul2": " - Peta Kawasan Keselamatan Operasional Penerbangan (KKOP)",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/42d1cfb1f9904efebd2645322310f635/data",
                    "iframe": null,
                    "akordion": [
                        {
                            "judul1": "Lampiran XIII",
                            "judul2": " - Peta Kawasan Keselamatan Operasional Penerbangan (KKOP)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/42d1cfb1f9904efebd2645322310f635/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIII",
                            "judul2": " - Peta Bangunan Cagar Budaya",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/44179a59a84f49da813b1884f73546df/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIII",
                            "judul2": " - Peta Kawasan Rawan Bencana",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/7e45d654943843849532ace31ba556f2/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIII",
                            "judul2": " - Peta Kawasan Rawan Banjir",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/a20a4f22fc684d0da7c603e57e896644/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIII",
                            "judul2": " - Peta Kawasan Rawan Penurunan Muka Tanah",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/ce95c54e8c674a84912ad5a38e2e2050/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIII",
                            "judul2": " - Peta Kawasan Sempadan",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/89c3c7abacdc483ab145691a1a4fcd07/data",
                            "iframe": null
                        }
                    ],
                },
                {
                    "id": 14,
                    "judul1": "Lampiran XIV",
                    "judul2": " - Daftar Bangunan Cagar Budaya dan Golongan",
                    "gambar": null,
                    "iframe": "https://drive.google.com/file/d/1TGUfr-e3Z2M6_DY92lnbe-dn4Svjex0B/preview",
                },
                {
                    "id": 15,
                    "judul1": "Lampiran XV",
                    "judul2": " - Kegiatan Hunian",
                    "gambar": null,
                    "iframe": "https://drive.google.com/file/d/1Iz5UCAmFRXX-Ut3eeRjRfQ7IU7q7YL6f/preview",
                },
                {
                    "id": 16,
                    "judul1": "Lampiran XVI",
                    "judul2": " - Koridor GSB Nol",
                    "gambar": null,
                    "iframe": "https://drive.google.com/file/d/1bRG8xYo0xj6xfGB4BQ5y3IwvZ4Bji5Nf/preview",
                },
                {
                    "id": 17,
                    "judul1": "Lampiran XVII",
                    "judul2": " - Peta Koridor GSB Nol",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/83f0a86c5ef0489e8d1b766483e6ed12/data",
                    "iframe": null
                },
                {
                    "id": 18,
                    "judul1": "Lampiran XVIII",
                    "judul2": " - Peta Potensi Ruang Terbuka Hijau dan Ruang Terbuka Biru",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/b3da3a03ec8d48ffa40b620af8e3d67e/data",
                    "iframe": null
                },
                {
                    "id": 19,
                    "judul1": "Lampiran XIX",
                    "judul2": " - Zona Bonus (Kode b)",
                    "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/acbc5ad7816049a0b87496e75f82b723/data",
                    "iframe": null,
                    "akordion": [
                        {
                            "judul1": "Lampiran XIX",
                            "judul2": " - Zona Bonus (Kode b)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/acbc5ad7816049a0b87496e75f82b723/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIX",
                            "judul2": " - Zona Performa (Kode d)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/79d8401680c2457b8a284e10e0ae32fd/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIX",
                            "judul2": " - Zona Ambang (Kode h)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/50d0efd965c74e06b96529e41ef85936/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIX",
                            "judul2": " - Zona Khusus (Kode j)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/7333d0871ec74afe94b0b9b77071d0a4/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIX",
                            "judul2": " - Pengendalian Pertumbuhan (Kode K1)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/a065bfd1ab064a369b9cecd1fb92b2f9/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIX",
                            "judul2": " - Pengendalian Pertumbuhan (Kode K2)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/7a89d089b50144369e4827d28687015f/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIX",
                            "judul2": " - Pelestarian Cagar Budaya (Kode L)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/baa9d9d5b6ad428c9eaa3773455764da/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIX",
                            "judul2": " - Zona Intensitas Sangat Tinggi (Kode m1)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/fc1e630b585f4791a915b2bfd7618dd6/data",
                            "iframe": null
                        },
                        {
                            "judul1": "Lampiran XIX",
                            "judul2": " - Zona Intensitas Sangat Tinggi (Kode m2)",
                            "gambar": "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/4a7b8b293b174f3594cfe7f3bef7c843/data",
                            "iframe": null
                        },
                    ],
                },
                {
                    "id": 20,
                    "judul1": "Lampiran XX",
                    "judul2": " - Peta Indeks Pengendali",
                    "gambar": null,
                    "iframe": "https://drive.google.com/file/d/1R3WFcMadHllZekpxxLFdSwM3V3K5IjOP/preview",
                },
            ]
        }

        return NextResponse.json(lampiranRDTRAPI)
    }
}