import { NextResponse } from "next/server";

export async function GET(req) {
    if (req.method === 'GET') {
        const katalogPetaAPI =
        {
            "status": true,
            "message": "Success",
            "data": [
                {
                    "id": 1,
                    "slug": "informasi-jumlah-data-aset-web",
                    "namaData": "Informasi Jumlah Data Aset Web",
                    "deskripsi": "Peta yang menampilkan jumlah dan sebaran lokasi aset terdiri dari KIB A, KIB C, dan KIB D",
                    "type": "public",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/ebb8491d1a69489e9ad6029acf9a7dc8",
                    "simpuljaringan": "DCKTRP\r\n",
                    "simpuljaringan_nama": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "simpuljaringan_id": "54a65b28-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 31 Januari 2020",
                        "Sifat data public",
                        "Proses update setiap bulan Juli",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Aset Kib C (Bangunan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_Kib_C_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Aset KIB A (Tanah)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_KIB_A_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Peta Batas Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/batas_kelurahan_vs_dukcapil/MapServer"
                        },
                        {
                            "name": "PETA TANAH ATR/BPN",
                            "url": "https://jakartasatu.jakarta.go.id/proxy_wms/proxy.php?url=https://bhumi.atrbpn.go.id/geoserver/pemda/ows?"
                        }
                    ],
                    "kategori": null,
                    "created": "2020-01-31 17:58:14",
                    "modified": "2023-07-18 07:14:10"
                },
                {
                    "id": 7,
                    "slug": "informasi-jumlah-data-aset-mobile",
                    "namaData": "Informasi Jumlah Data Aset Mobile",
                    "deskripsi": "Peta yang menampilkan informasi jumlah dan sebaran lokasi aset mencakup KIB A (Tanah), KIB C (Bangunan), dan KIB D (Jalan, Irigasi, Jaringan)",
                    "type": "public",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/e6f351dacbb04ef6ad21122e1d6e84da",
                    "simpuljaringan": "DCKTRP\r\n",
                    "simpuljaringan_nama": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "simpuljaringan_id": "54a65b28-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 23 Maret 2021",
                        "Sifat data public",
                        "Proses update setiap bulan November",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Aset KIB A (Tanah)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_KIB_A_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "PETA TANAH ATR/BPN",
                            "url": "https://jakartasatu.jakarta.go.id/proxy_wms/proxy.php?url=https://bhumi.atrbpn.go.id/geoserver/pemda/ows?"
                        },
                        {
                            "name": "Peta Batas Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/batas_kelurahan_vs_dukcapil/MapServer"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Aset Kib C (Bangunan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_Kib_C_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        }
                    ],
                    "kategori": null,
                    "created": "2021-03-23 06:42:30",
                    "modified": "2023-11-27 08:32:53"
                },
                {
                    "id": 11,
                    "slug": "kegiatan-pemetaan-aset-(kib)-pemerintah-provinsi-dki-jakarta",
                    "namaData": "Kegiatan Pemetaan Aset (KIB) Pemerintah Provinsi DKI Jakarta",
                    "deskripsi": "Peta yang menampilkan jumlah dan sebaran lokasi aset terdiri dari KIB A, KIB C, dan KIB D",
                    "type": "public",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/ebb8491d1a69489e9ad6029acf9a7dc8",
                    "simpuljaringan": "DBM\r\n",
                    "simpuljaringan_nama": "Dinas Bina Marga",
                    "simpuljaringan_id": "4ec72deb-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 31 Januari 2020",
                        "Sifat data public",
                        "Proses update setiap bulan Juli",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Aset Kib C (Bangunan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_Kib_C_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Aset KIB A (Tanah)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_KIB_A_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "PETA TANAH ATR/BPN",
                            "url": "https://jakartasatu.jakarta.go.id/proxy_wms/proxy.php?url=https://bhumi.atrbpn.go.id/geoserver/pemda/ows?"
                        },
                        {
                            "name": "Peta Batas Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/batas_kelurahan_vs_dukcapil/MapServer"
                        }
                    ],
                    "kategori": null,
                    "created": "2020-01-31 17:58:14",
                    "modified": "2023-07-18 07:14:10"
                },
                {
                    "id": 19,
                    "slug": "pendataan-peta-aset-kib-a-2023",
                    "namaData": "Pendataan Peta Aset KIB A 2023",
                    "deskripsi": "Peta yang menampilkan informasi terkait aset KIB A terupdate hasil integrasi antara BPAD dan Jakarta Satu",
                    "type": "shared",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/webappviewer/index.html?id=2347d07bea4a4b4685616c139ebeeb08",
                    "simpuljaringan": "DBM\r\n",
                    "simpuljaringan_nama": "Dinas Bina Marga",
                    "simpuljaringan_id": "4ec72deb-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Peta",
                    "metadata": [
                        "Dibuat tanggal 11 November 2022",
                        "Sifat data shared",
                        "Proses update setiap bulan November",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Titik Aset KIB A 2023",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Pendataan_Aset_KIB_A_2023/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Persil BPN - Jakarta Barat",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/8"
                        },
                        {
                            "name": "Persil BPN - Jakarta Selatan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/9"
                        },
                        {
                            "name": "Bidang Aset KIB A",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Input_Integrasi_Aset_View/FeatureServer/0"
                        },
                        {
                            "name": "Persil BPN - Jakarta Timur",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/10"
                        },
                        {
                            "name": "Persil BPN - Jakarta Utara & Pulau Seribu",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/7"
                        },
                        {
                            "name": "Persil BPN - Jakarta Pusat",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/6"
                        },
                        {
                            "name": "Batas Administrasi Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/r"
                        },
                        {
                            "name": "Titik Aset KIB A 2023",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Pendataan_Aset_KIB_A_2023/FeatureServer/0"
                        },
                        {
                            "name": "Bidang Aset KIB A",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Input_Integrasi_Aset_View/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Persil BPN - Jakarta Barat",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/8"
                        },
                        {
                            "name": "Persil BPN - Jakarta Selatan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/9"
                        },
                        {
                            "name": "Persil BPN - Jakarta Timur",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/10"
                        },
                        {
                            "name": "Persil BPN - Jakarta Utara & Pulau Seribu",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/7"
                        },
                        {
                            "name": "Persil BPN - Jakarta Pusat",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/6"
                        },
                        {
                            "name": "Batas Administrasi Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/r"
                        }
                    ],
                    "kategori": null,
                    "created": "2022-11-11 09:29:33",
                    "modified": "2023-11-02 05:45:50"
                },
                {
                    "id": 20,
                    "slug": "persil-aset-hpl",
                    "namaData": "Persil Aset HPL",
                    "deskripsi": "Dashboard yang menampilkan informasi mengenai jumlah aset HPL dan persil yang berada pada aset HPL berdasarkan hak",
                    "type": "shared",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/dashboards/d04ea1b16cf341598482482bb65db824",
                    "simpuljaringan": "BPAD\r\n",
                    "simpuljaringan_nama": "Badan Pengelolaan Aset Daerah",
                    "simpuljaringan_id": "19fbfe07-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 26 Agustus 2022",
                        "Sifat data shared",
                        "Proses update setiap bulan Februari",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2020",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/1"
                        },
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2019",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/2"
                        },
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2018",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/3"
                        },
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2017",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/4"
                        },
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2016",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/5"
                        },
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2015",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/6"
                        },
                        {
                            "name": "Batas RW",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Batas_Administrasi_DKI_Jakarta/FeatureServer/2"
                        },
                        {
                            "name": "Batas Kelurahan",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Batas_Administrasi_DKI_Jakarta/FeatureServer/1"
                        },
                        {
                            "name": "Batas Kecamatan",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Batas_Administrasi_DKI_Jakarta/FeatureServer/0"
                        },
                        {
                            "name": "Infrastruktur Titik",
                            "url": "https://services6.arcgis."
                        },
                        {
                            "name": "Infrasutruktur Garis/Saluran",
                            "url": null
                        },
                        {
                            "name": "Wilayah Terdampak Banjir DCKTRP",
                            "url": null
                        }
                    ],
                    "kategori": null,
                    "created": "2022-08-26 01:46:50",
                    "modified": "2023-02-21 01:30:36"
                },
                {
                    "id": 29,
                    "slug": "peta-aset",
                    "namaData": "Peta Aset",
                    "deskripsi": "Peta yang menampilkan informasi aset KIB A, C, dan D DKI Jakarta ",
                    "type": "org",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/webappviewer/index.html?id=f97535e1062d42d8bb03c694dece9acc",
                    "simpuljaringan": "DBM\r\n",
                    "simpuljaringan_nama": "Dinas Bina Marga",
                    "simpuljaringan_id": "4ec72deb-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Peta",
                    "metadata": [
                        "Dibuat tanggal 04 Maret 2020",
                        "Sifat data org",
                        "Proses update setiap bulan Mei",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Aset Kib C (Bangunan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_Kib_C_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Aset KIB A (Tanah)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_KIB_A_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Peta Batas Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/batas_kelurahan_vs_dukcapil/MapServer"
                        },
                        {
                            "name": "PETA TANAH ATR/BPN",
                            "url": "https://jakartasatu.jakarta.go.id/proxy_wms/proxy.php?url=https://bhumi.atrbpn.go.id/geoserver/pemda/ows?"
                        }
                    ],
                    "kategori": null,
                    "created": "2020-03-04 14:33:40",
                    "modified": "2024-05-17 04:58:55"
                },
                {
                    "id": 35,
                    "slug": "platform-infrastruktur-kota",
                    "namaData": "Platform Infrastruktur Kota",
                    "deskripsi": "Peta yang menampilkan infrastuktur kota berdasarkan analisa UHI dan RTH",
                    "type": "private",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/webappviewer/index.html?id=ae887c6d92f349aeae775ce7b2c1e457",
                    "simpuljaringan": "DCKTRP\r\n",
                    "simpuljaringan_nama": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "simpuljaringan_id": "54a65b28-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Peta",
                    "metadata": [
                        "Dibuat tanggal 26 September 2023",
                        "Sifat data private",
                        "Proses update setiap bulan November",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Histori Banjir BPBD Time Aware - Histori Banjir BPBD",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPBD/Histori_Banjir_BPBD_Time_Aware/FeatureServer/0"
                        },
                        {
                            "name": "Pemukiman Kumuh",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/DV/Pemukiman_Kumuh/FeatureServer/0"
                        },
                        {
                            "name": "Data Portal Kumuh Jakarta - Lokasi Kumuh Kel",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Data_Portal_Kumuh_Jakarta/FeatureServer/0"
                        },
                        {
                            "name": "Data Portal Kumuh Jakarta - Kawasan Kumuh Kel",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Data_Portal_Kumuh_Jakarta/FeatureServer/1"
                        },
                        {
                            "name": "JPO Bina Marga - SDE.JPO Point",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JPO_Bina_Marga/FeatureServer/0"
                        },
                        {
                            "name": "Halte Dinas Bina Marga Edit - Halte Dinas Bina Marga",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BINAMARGA/Halte_Dinas_Bina_Marga_Edit/FeatureServer/0"
                        },
                        {
                            "name": "Persebaran Rusun View - Lokasi Rusun",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/DISPERUM/Persebaran_Rusun_View/FeatureServer/0"
                        },
                        {
                            "name": "ASET VIEW - Peta Aset KIB A (Tanah)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/ASET_VIEW/FeatureServer/1"
                        },
                        {
                            "name": "ASET VIEW - Peta Aset KIB C (Bangunan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/ASET_VIEW/FeatureServer/0"
                        },
                        {
                            "name": "ASET VIEW - Peta Aset KIB D (Jalan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/ASET_VIEW/FeatureServer/2"
                        },
                        {
                            "name": "Kualitas Udara",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/Dinas_L"
                        },
                        {
                            "name": "UHI 2021 tif",
                            "url": null
                        },
                        {
                            "name": "Rencana Pola Ruang RDTR 2022",
                            "url": null
                        },
                        {
                            "name": "Peta Dasar DKI Jakarta",
                            "url": null
                        },
                        {
                            "name": "BATAS ADMINISTRASI DKI JAKARTA",
                            "url": null
                        },
                        {
                            "name": "Geodatabase Bidang Pengelolaan Air Limbah - Rev Pengelolaan Limbah",
                            "url": null
                        },
                        {
                            "name": "Geodatabase Bidang Pengelolaan Air Limbah - SPALD Terpusat",
                            "url": null
                        },
                        {
                            "name": "Geodatabase Bidang Pengelolaan Air Limbah - Rev TangkiSeptik RT",
                            "url": null
                        },
                        {
                            "name": "Geodatabase Bidang Pengelolaan Air Limbah - Zona JSS",
                            "url": null
                        },
                        {
                            "name": "SPAM",
                            "url": null
                        },
                        {
                            "name": "service e7f497dd73144077897b7a533b070da4 - Pendataan Drainase Vertikal Jakarta",
                            "url": null
                        },
                        {
                            "name": "Saluran Drainase Tersier gdb - Saluran Drainase Tersier",
                            "url": null
                        },
                        {
                            "name": "Titik Kontrol Geodesi",
                            "url": null
                        },
                        {
                            "name": "Hasil Ukur DKI Jakarta",
                            "url": null
                        },
                        {
                            "name": "Data Utilitas View - TELEKOMUNIKASI",
                            "url": null
                        },
                        {
                            "name": "Data Utilitas View - PLN",
                            "url": null
                        },
                        {
                            "name": "Data U",
                            "url": null
                        }
                    ],
                    "kategori": null,
                    "created": "2023-09-26 02:13:47",
                    "modified": "2023-11-13 04:22:32"
                },
                {
                    "id": 43,
                    "slug": "verifikasi-aset-2023",
                    "namaData": "Verifikasi Aset 2023",
                    "deskripsi": "Peta yang menampilkan informasi mengenai verifikasi aset DKI Jakarta",
                    "type": "shared",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/dashboards/fc6c04b40fe846e28046bf6c8a016e24",
                    "simpuljaringan": "DBM\r\n",
                    "simpuljaringan_nama": "Dinas Bina Marga",
                    "simpuljaringan_id": "4ec72deb-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 10 Oktober 2023",
                        "Sifat data shared",
                        "Proses update setiap bulan November",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Verifikasi Aset 2023",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Verifikasi_Aset_2023/FeatureServer/0"
                        }
                    ],
                    "kategori": null,
                    "created": "2023-10-10 01:56:41",
                    "modified": "2023-11-08 03:18:04"
                },
                {
                    "id": 44,
                    "slug": "peta-informasi-persil-aset-hpl",
                    "namaData": "Peta Informasi Persil Aset HPL",
                    "deskripsi": "Dashboard yang menampilkan informasi mengenai bidang atas aset HPL",
                    "type": "shared",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/dashboards/c7dcea43a00e40648e00644b335f4dc2",
                    "simpuljaringan": "BPAD\r\n",
                    "simpuljaringan_nama": "Badan Pengelolaan Aset Daerah",
                    "simpuljaringan_id": "19fbfe07-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 20 Februari 2023",
                        "Sifat data shared",
                        "Proses update setiap bulan April",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Data Bidang Aset HPL",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/Data_Bidang_Aset_HPL/FeatureServer/0"
                        },
                        {
                            "name": "Aset HPL",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Aset_HPL_View/FeatureServer/0"
                        },
                        {
                            "name": "Batas Administrasi Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/2"
                        }
                    ],
                    "kategori": null,
                    "created": "2023-02-20 14:51:22",
                    "modified": "2024-04-03 21:12:17"
                },
                {
                    "id": 47,
                    "slug": "monev-sumur-resapan-lintas-sektor",
                    "namaData": "Monev Sumur Resapan Lintas Sektor",
                    "deskripsi": "Dashboard yang menampilkan monitoring evaluasi sumur resapan di DKI Jakarta",
                    "type": "public",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/87a6f5d357c84802b8e6def15dd518ba",
                    "simpuljaringan": "DSDA\r\n",
                    "simpuljaringan_nama": "Dinas Sumber Daya Air",
                    "simpuljaringan_id": "c8df4623-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 24 Juli 2021",
                        "Sifat data public",
                        "Proses update setiap bulan November",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Titik Sumur Resapan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/service_d86d05679fd140cfb1c7fa0b0a37ecb3/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Batas Kecamatan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/3"
                        },
                        {
                            "name": "Peta Struktur",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/Peta_Struktur_Jakarta_2018_Tanpa_Penutup/MapServer"
                        },
                        {
                            "name": "Peta Struktur",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/Peta_Struktur_Jakarta_2018_Tanpa_Penutup/MapServer"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        }
                    ],
                    "kategori": null,
                    "created": "2021-07-24 09:25:59",
                    "modified": "2023-11-27 09:00:32"
                },
                {
                    "id": 1,
                    "slug": "informasi-jumlah-data-aset-web",
                    "namaData": "Informasi Jumlah Data Aset Web",
                    "deskripsi": "Peta yang menampilkan jumlah dan sebaran lokasi aset terdiri dari KIB A, KIB C, dan KIB D",
                    "type": "public",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/ebb8491d1a69489e9ad6029acf9a7dc8",
                    "simpuljaringan": "DCKTRP\r\n",
                    "simpuljaringan_nama": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "simpuljaringan_id": "54a65b28-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Peta",
                    "metadata": [
                        "Dibuat tanggal 31 Januari 2020",
                        "Sifat data public",
                        "Proses update setiap bulan Juli",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Aset Kib C (Bangunan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_Kib_C_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Aset KIB A (Tanah)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_KIB_A_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Peta Batas Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/batas_kelurahan_vs_dukcapil/MapServer"
                        },
                        {
                            "name": "PETA TANAH ATR/BPN",
                            "url": "https://jakartasatu.jakarta.go.id/proxy_wms/proxy.php?url=https://bhumi.atrbpn.go.id/geoserver/pemda/ows?"
                        }
                    ],
                    "kategori": null,
                    "created": "2020-01-31 17:58:14",
                    "modified": "2023-07-18 07:14:10"
                },
                {
                    "id": 7,
                    "slug": "informasi-jumlah-data-aset-mobile",
                    "namaData": "Informasi Jumlah Data Aset Mobile",
                    "deskripsi": "Peta yang menampilkan informasi jumlah dan sebaran lokasi aset mencakup KIB A (Tanah), KIB C (Bangunan), dan KIB D (Jalan, Irigasi, Jaringan)",
                    "type": "public",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/e6f351dacbb04ef6ad21122e1d6e84da",
                    "simpuljaringan": "DCKTRP\r\n",
                    "simpuljaringan_nama": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "simpuljaringan_id": "54a65b28-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Peta",
                    "metadata": [
                        "Dibuat tanggal 23 Maret 2021",
                        "Sifat data public",
                        "Proses update setiap bulan November",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Aset KIB A (Tanah)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_KIB_A_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "PETA TANAH ATR/BPN",
                            "url": "https://jakartasatu.jakarta.go.id/proxy_wms/proxy.php?url=https://bhumi.atrbpn.go.id/geoserver/pemda/ows?"
                        },
                        {
                            "name": "Peta Batas Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/batas_kelurahan_vs_dukcapil/MapServer"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Aset Kib C (Bangunan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_Kib_C_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        }
                    ],
                    "kategori": null,
                    "created": "2021-03-23 06:42:30",
                    "modified": "2023-11-27 08:32:53"
                },
                {
                    "id": 11,
                    "slug": "kegiatan-pemetaan-aset-(kib)-pemerintah-provinsi-dki-jakarta",
                    "namaData": "Kegiatan Pemetaan Aset (KIB) Pemerintah Provinsi DKI Jakarta",
                    "deskripsi": "Peta yang menampilkan jumlah dan sebaran lokasi aset terdiri dari KIB A, KIB C, dan KIB D",
                    "type": "public",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/ebb8491d1a69489e9ad6029acf9a7dc8",
                    "simpuljaringan": "DBM\r\n",
                    "simpuljaringan_nama": "Dinas Bina Marga",
                    "simpuljaringan_id": "4ec72deb-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Peta",
                    "metadata": [
                        "Dibuat tanggal 31 Januari 2020",
                        "Sifat data public",
                        "Proses update setiap bulan Juli",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Aset Kib C (Bangunan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_Kib_C_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Aset KIB A (Tanah)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_KIB_A_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "PETA TANAH ATR/BPN",
                            "url": "https://jakartasatu.jakarta.go.id/proxy_wms/proxy.php?url=https://bhumi.atrbpn.go.id/geoserver/pemda/ows?"
                        },
                        {
                            "name": "Peta Batas Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/batas_kelurahan_vs_dukcapil/MapServer"
                        }
                    ],
                    "kategori": null,
                    "created": "2020-01-31 17:58:14",
                    "modified": "2023-07-18 07:14:10"
                },
                {
                    "id": 19,
                    "slug": "pendataan-peta-aset-kib-a-2023",
                    "namaData": "Pendataan Peta Aset KIB A 2023",
                    "deskripsi": "Peta yang menampilkan informasi terkait aset KIB A terupdate hasil integrasi antara BPAD dan Jakarta Satu",
                    "type": "shared",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/webappviewer/index.html?id=2347d07bea4a4b4685616c139ebeeb08",
                    "simpuljaringan": "DBM\r\n",
                    "simpuljaringan_nama": "Dinas Bina Marga",
                    "simpuljaringan_id": "4ec72deb-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 11 November 2022",
                        "Sifat data shared",
                        "Proses update setiap bulan November",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Titik Aset KIB A 2023",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Pendataan_Aset_KIB_A_2023/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Persil BPN - Jakarta Barat",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/8"
                        },
                        {
                            "name": "Persil BPN - Jakarta Selatan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/9"
                        },
                        {
                            "name": "Bidang Aset KIB A",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Input_Integrasi_Aset_View/FeatureServer/0"
                        },
                        {
                            "name": "Persil BPN - Jakarta Timur",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/10"
                        },
                        {
                            "name": "Persil BPN - Jakarta Utara & Pulau Seribu",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/7"
                        },
                        {
                            "name": "Persil BPN - Jakarta Pusat",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/6"
                        },
                        {
                            "name": "Batas Administrasi Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/r"
                        },
                        {
                            "name": "Titik Aset KIB A 2023",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Pendataan_Aset_KIB_A_2023/FeatureServer/0"
                        },
                        {
                            "name": "Bidang Aset KIB A",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Input_Integrasi_Aset_View/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Persil BPN - Jakarta Barat",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/8"
                        },
                        {
                            "name": "Persil BPN - Jakarta Selatan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/9"
                        },
                        {
                            "name": "Persil BPN - Jakarta Timur",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/10"
                        },
                        {
                            "name": "Persil BPN - Jakarta Utara & Pulau Seribu",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/7"
                        },
                        {
                            "name": "Persil BPN - Jakarta Pusat",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Persil_BPN_2021/FeatureServer/6"
                        },
                        {
                            "name": "Batas Administrasi Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/r"
                        }
                    ],
                    "kategori": null,
                    "created": "2022-11-11 09:29:33",
                    "modified": "2023-11-02 05:45:50"
                },
                {
                    "id": 20,
                    "slug": "persil-aset-hpl",
                    "namaData": "Persil Aset HPL",
                    "deskripsi": "Dashboard yang menampilkan informasi mengenai jumlah aset HPL dan persil yang berada pada aset HPL berdasarkan hak",
                    "type": "shared",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/dashboards/d04ea1b16cf341598482482bb65db824",
                    "simpuljaringan": "BPAD\r\n",
                    "simpuljaringan_nama": "Badan Pengelolaan Aset Daerah",
                    "simpuljaringan_id": "19fbfe07-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Peta",
                    "metadata": [
                        "Dibuat tanggal 26 Agustus 2022",
                        "Sifat data shared",
                        "Proses update setiap bulan Februari",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2020",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/1"
                        },
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2019",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/2"
                        },
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2018",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/3"
                        },
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2017",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/4"
                        },
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2016",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/5"
                        },
                        {
                            "name": "Wilayah Terdampak Banjir BPBD 2015",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Wilayah_Terdampak_Banjir/FeatureServer/6"
                        },
                        {
                            "name": "Batas RW",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Batas_Administrasi_DKI_Jakarta/FeatureServer/2"
                        },
                        {
                            "name": "Batas Kelurahan",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Batas_Administrasi_DKI_Jakarta/FeatureServer/1"
                        },
                        {
                            "name": "Batas Kecamatan",
                            "url": "https://services6.arcgis.com/LpNjFysmsfdTpDD0/arcgis/rest/services/Batas_Administrasi_DKI_Jakarta/FeatureServer/0"
                        },
                        {
                            "name": "Infrastruktur Titik",
                            "url": "https://services6.arcgis."
                        },
                        {
                            "name": "Infrasutruktur Garis/Saluran",
                            "url": null
                        },
                        {
                            "name": "Wilayah Terdampak Banjir DCKTRP",
                            "url": null
                        }
                    ],
                    "kategori": null,
                    "created": "2022-08-26 01:46:50",
                    "modified": "2023-02-21 01:30:36"
                },
                {
                    "id": 29,
                    "slug": "peta-aset",
                    "namaData": "Peta Aset",
                    "deskripsi": "Peta yang menampilkan informasi aset KIB A, C, dan D DKI Jakarta ",
                    "type": "org",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/webappviewer/index.html?id=f97535e1062d42d8bb03c694dece9acc",
                    "simpuljaringan": "DBM\r\n",
                    "simpuljaringan_nama": "Dinas Bina Marga",
                    "simpuljaringan_id": "4ec72deb-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 04 Maret 2020",
                        "Sifat data org",
                        "Proses update setiap bulan Mei",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Aset Kib C (Bangunan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_Kib_C_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Aset KIB A (Tanah)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/Aset_KIB_A_Pencarian/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        },
                        {
                            "name": "Peta Batas Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/batas_kelurahan_vs_dukcapil/MapServer"
                        },
                        {
                            "name": "PETA TANAH ATR/BPN",
                            "url": "https://jakartasatu.jakarta.go.id/proxy_wms/proxy.php?url=https://bhumi.atrbpn.go.id/geoserver/pemda/ows?"
                        }
                    ],
                    "kategori": null,
                    "created": "2020-03-04 14:33:40",
                    "modified": "2024-05-17 04:58:55"
                },
                {
                    "id": 35,
                    "slug": "platform-infrastruktur-kota",
                    "namaData": "Platform Infrastruktur Kota",
                    "deskripsi": "Peta yang menampilkan infrastuktur kota berdasarkan analisa UHI dan RTH",
                    "type": "private",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/webappviewer/index.html?id=ae887c6d92f349aeae775ce7b2c1e457",
                    "simpuljaringan": "DCKTRP\r\n",
                    "simpuljaringan_nama": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "simpuljaringan_id": "54a65b28-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 26 September 2023",
                        "Sifat data private",
                        "Proses update setiap bulan November",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Histori Banjir BPBD Time Aware - Histori Banjir BPBD",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPBD/Histori_Banjir_BPBD_Time_Aware/FeatureServer/0"
                        },
                        {
                            "name": "Pemukiman Kumuh",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/DV/Pemukiman_Kumuh/FeatureServer/0"
                        },
                        {
                            "name": "Data Portal Kumuh Jakarta - Lokasi Kumuh Kel",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Data_Portal_Kumuh_Jakarta/FeatureServer/0"
                        },
                        {
                            "name": "Data Portal Kumuh Jakarta - Kawasan Kumuh Kel",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/Data_Portal_Kumuh_Jakarta/FeatureServer/1"
                        },
                        {
                            "name": "JPO Bina Marga - SDE.JPO Point",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JPO_Bina_Marga/FeatureServer/0"
                        },
                        {
                            "name": "Halte Dinas Bina Marga Edit - Halte Dinas Bina Marga",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BINAMARGA/Halte_Dinas_Bina_Marga_Edit/FeatureServer/0"
                        },
                        {
                            "name": "Persebaran Rusun View - Lokasi Rusun",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/DISPERUM/Persebaran_Rusun_View/FeatureServer/0"
                        },
                        {
                            "name": "ASET VIEW - Peta Aset KIB A (Tanah)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/ASET_VIEW/FeatureServer/1"
                        },
                        {
                            "name": "ASET VIEW - Peta Aset KIB C (Bangunan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/ASET_VIEW/FeatureServer/0"
                        },
                        {
                            "name": "ASET VIEW - Peta Aset KIB D (Jalan)",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/BPAD/ASET_VIEW/FeatureServer/2"
                        },
                        {
                            "name": "Kualitas Udara",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/Dinas_L"
                        },
                        {
                            "name": "UHI 2021 tif",
                            "url": null
                        },
                        {
                            "name": "Rencana Pola Ruang RDTR 2022",
                            "url": null
                        },
                        {
                            "name": "Peta Dasar DKI Jakarta",
                            "url": null
                        },
                        {
                            "name": "BATAS ADMINISTRASI DKI JAKARTA",
                            "url": null
                        },
                        {
                            "name": "Geodatabase Bidang Pengelolaan Air Limbah - Rev Pengelolaan Limbah",
                            "url": null
                        },
                        {
                            "name": "Geodatabase Bidang Pengelolaan Air Limbah - SPALD Terpusat",
                            "url": null
                        },
                        {
                            "name": "Geodatabase Bidang Pengelolaan Air Limbah - Rev TangkiSeptik RT",
                            "url": null
                        },
                        {
                            "name": "Geodatabase Bidang Pengelolaan Air Limbah - Zona JSS",
                            "url": null
                        },
                        {
                            "name": "SPAM",
                            "url": null
                        },
                        {
                            "name": "service e7f497dd73144077897b7a533b070da4 - Pendataan Drainase Vertikal Jakarta",
                            "url": null
                        },
                        {
                            "name": "Saluran Drainase Tersier gdb - Saluran Drainase Tersier",
                            "url": null
                        },
                        {
                            "name": "Titik Kontrol Geodesi",
                            "url": null
                        },
                        {
                            "name": "Hasil Ukur DKI Jakarta",
                            "url": null
                        },
                        {
                            "name": "Data Utilitas View - TELEKOMUNIKASI",
                            "url": null
                        },
                        {
                            "name": "Data Utilitas View - PLN",
                            "url": null
                        },
                        {
                            "name": "Data U",
                            "url": null
                        }
                    ],
                    "kategori": null,
                    "created": "2023-09-26 02:13:47",
                    "modified": "2023-11-13 04:22:32"
                },
                {
                    "id": 43,
                    "slug": "verifikasi-aset-2023",
                    "namaData": "Verifikasi Aset 2023",
                    "deskripsi": "Peta yang menampilkan informasi mengenai verifikasi aset DKI Jakarta",
                    "type": "shared",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/dashboards/fc6c04b40fe846e28046bf6c8a016e24",
                    "simpuljaringan": "DBM\r\n",
                    "simpuljaringan_nama": "Dinas Bina Marga",
                    "simpuljaringan_id": "4ec72deb-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Peta",
                    "metadata": [
                        "Dibuat tanggal 10 Oktober 2023",
                        "Sifat data shared",
                        "Proses update setiap bulan November",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Verifikasi Aset 2023",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Verifikasi_Aset_2023/FeatureServer/0"
                        }
                    ],
                    "kategori": null,
                    "created": "2023-10-10 01:56:41",
                    "modified": "2023-11-08 03:18:04"
                },
                {
                    "id": 44,
                    "slug": "peta-informasi-persil-aset-hpl",
                    "namaData": "Peta Informasi Persil Aset HPL",
                    "deskripsi": "Dashboard yang menampilkan informasi mengenai bidang atas aset HPL",
                    "type": "shared",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/dashboards/c7dcea43a00e40648e00644b335f4dc2",
                    "simpuljaringan": "BPAD\r\n",
                    "simpuljaringan_nama": "Badan Pengelolaan Aset Daerah",
                    "simpuljaringan_id": "19fbfe07-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Peta",
                    "metadata": [
                        "Dibuat tanggal 20 Februari 2023",
                        "Sifat data shared",
                        "Proses update setiap bulan April",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Data Bidang Aset HPL",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/Data_Bidang_Aset_HPL/FeatureServer/0"
                        },
                        {
                            "name": "Aset HPL",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/BPAD/Aset_HPL_View/FeatureServer/0"
                        },
                        {
                            "name": "Batas Administrasi Kelurahan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/2"
                        }
                    ],
                    "kategori": null,
                    "created": "2023-02-20 14:51:22",
                    "modified": "2024-04-03 21:12:17"
                },
                {
                    "id": 47,
                    "slug": "monev-sumur-resapan-lintas-sektor",
                    "namaData": "Monev Sumur Resapan Lintas Sektor",
                    "deskripsi": "Dashboard yang menampilkan monitoring evaluasi sumur resapan di DKI Jakarta",
                    "type": "public",
                    "imgSrc": "",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/87a6f5d357c84802b8e6def15dd518ba",
                    "simpuljaringan": "DSDA\r\n",
                    "simpuljaringan_nama": "Dinas Sumber Daya Air",
                    "simpuljaringan_id": "c8df4623-619a-11ee-9305-506b8d729ce3",
                    "tipe_peta": "Dashboard",
                    "metadata": [
                        "Dibuat tanggal 24 Juli 2021",
                        "Sifat data public",
                        "Proses update setiap bulan November",
                        "Cakupan area "
                    ],
                    "komponenlayer": [
                        {
                            "name": "Titik Sumur Resapan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Hosted/service_d86d05679fd140cfb1c7fa0b0a37ecb3/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB C (Bangunan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/0"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB A (Tanah)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/1"
                        },
                        {
                            "name": "Batas Kecamatan",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/Batas_Administrasi_Update/Batas_Administrasi_DKI_Jakarta_Update_View/FeatureServer/3"
                        },
                        {
                            "name": "Peta Struktur",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/Peta_Struktur_Jakarta_2018_Tanpa_Penutup/MapServer"
                        },
                        {
                            "name": "Peta Struktur",
                            "url": "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/Peta_Struktur_Jakarta_2018_Tanpa_Penutup/MapServer"
                        },
                        {
                            "name": "Peta Aset KIB A - Peta Aset KIB D (Jalan, Irigasi, Jaringan)",
                            "url": "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Peta_Aset_KIB_A/FeatureServer/2"
                        }
                    ],
                    "kategori": null,
                    "created": "2021-07-24 09:25:59",
                    "modified": "2023-11-27 09:00:32"
                }
            ],
            "meta": {
                "pagination": {
                    "total": 208,
                    "count": 10,
                    "per_page": 10,
                    "current_page": 1,
                    "total_pages": 21,
                    "links": {
                        "next": "http://127.0.0.1:8014//v4/katalog-peta?page=2"
                    }
                }
            }
        }

        return NextResponse.json(katalogPetaAPI)
    }
}