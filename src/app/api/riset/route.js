import { NextResponse } from "next/server";

export async function GET(req) {
    if (req.method === 'GET') {
        const risetAPI =
            [
                {
                    "id": 1,
                    "slug": "jakarta-to-global-city",
                    "namaData": "Jakarta to Global City",
                    "deskripsi": "Jakarta punya potensi besar jadi kota global, tapi tantangannya tidak kecil kemacetan, polusi, ketimpangan sosial, dan minimnya dukungan inovasi. Agar transisi ini berhasil, dibutuhkan strategi matang dan kolaborasi semua pihak. Jadi, siapkah kita mendukung Jakarta bersaing di kancah dunia?",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/storymaps/stories/3b2497fb5be840f494914cb64955b7e5"
                },
                {
                    "id": 2,
                    "slug": "regenerasi-perkotaan-kawasan-bandar-kemayoran",
                    "namaData": "Regenerasi Perkotaan Kawasan Bandar Kemayoran",
                    "deskripsi": "Bandar Kemayoran punya peluang besar jadi pusat bisnis, hunian, dan ruang publik yang berkembang. Supaya potensinya optimal, kawasan ini perlu diregenerasi agar lebih fungsional, hidup, dan berkelanjutan. Penelitian ini mengulas strategi transformasi agar Bandar Kemayoran makin relevan bagi warga dan ekonomi Jakarta!",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://tataruang.jakarta.go.id/portal/apps/storymaps/stories/6de62f3688c14181a0788e6f95742863"
                },
                {
                    "id": 3,
                    "slug": "analisis-kapasitas-sekolah-negeri-dan-kaitannya-dengan-sistem-ppdb-di-dki-jakarta",
                    "namaData": "Analisis Kapasitas Sekolah Negeri dan Kaitannya dengan Sistem PPDB di DKI Jakarta",
                    "deskripsi": "Sistem PPDB di Jakarta masih penuh tantangan sekolah favorit kelebihan peminat, sementara yang lain sepi pendaftar. Analisis spasial sekolah dan daya tampung bisa membantu distribusi siswa lebih adil. Mampukah sistem ini benar-benar mewujudkan pendidikan merata?",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/storymaps/stories/e1246351c415410089e6bab0867e49df"
                },
                {
                    "id": 4,
                    "slug": "aksesibilitas-objek-wisata-bagi-pejalan-kaki-di-dki-jakarta",
                    "namaData": "Aksesibilitas Objek Wisata Bagi Pejalan Kaki di DKI Jakarta",
                    "deskripsi": "Jakarta punya banyak destinasi wisata, didukung KRL, LRT, dan MRT yang mempermudah akses. Tapi, ramahkah buat pejalan kaki? Trotoar masih butuh perbaikan, dan aksesibilitas belum merata. Stasiun Jakarta Kota, Boulevard Utara, dan Bundaran HI punya akses terbaik ke wisata. Ke depan, Jakarta harus lebih nyaman dijelajahi tanpa kendaraan pribadi. Siapkah Jakarta jadi kota wisata ramah pejalan kaki?",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://tataruang.jakarta.go.id/portal/apps/storymaps/stories/3b9c288391a84127b49636ad72ed7443"
                },
                // {
                //     "id": 5,
                //     "slug": "aksesibilitas-sekolah-menengah-atas-di-dki-jakarta-berdasarkan-layanan-bus-Sekolah",
                //     "namaData": "Aksesibilitas Sekolah Menengah Atas di DKI Jakarta (Berdasarkan Layanan Bus Sekolah)",
                //     "deskripsi": "",
                //     "Gubernur100Hari": false,
                //     "penerbit": "Jakarta Satu",
                //     "tanggalTerbit": "2024",
                //     "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                //     "link": "https://tataruang.jakarta.go.id/portal/apps/storymaps/stories/608217878522478b82ac630bb370c4f7"
                // },
                {
                    "id": 6,
                    "slug": "analisis-pola-persebaran-umkm-di-dki-jakarta",
                    "namaData": "Analisis Pola Persebaran UMKM di DKI Jakarta",
                    "deskripsi": "Kenapa ada daerah UMKM yang rame, sementara yang lain sepi? Penelitian ini mengulas pola persebaran UMKM di Jakarta, mengungkap hotspot bisnis, dan strategi biar makin cuan. Dengan data dan peta, UMKM bisa tumbuh lebih optimal dan kebijakan bisa lebih pro-UMKM!",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://jakartasatu.jakarta.go.id/portal/apps/storymaps/stories/43f37e60496e4a62956f86d8559770d5"
                },
                {
                    "id": 7,
                    "slug": "pemodelan-dan-prediksi-konsentrasi-nilai-polutan-provinsi-dki-jakarta",
                    "namaData": "Pemodelan dan Prediksi Konsentrasi Nilai Polutan Provinsi DKI Jakarta",
                    "deskripsi": "Polusi udara Jakarta makin parah, tapi gimana cara memprediksi polutan ke depan? Penelitian ini mengembangkan model prediksi dengan analisis tren musiman dan data kualitas udara untuk mendukung kebijakan. Semoga Jakarta bisa bernapas lebih lega!",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://tataruang.jakarta.go.id/portal/apps/storymaps/stories/63e63d89bd87478283d66aec30c1aef0"
                },
                {
                    "id": 8,
                    "slug": "estimasi-jumlah-penduduk-terpapar-bencana-banjir-wilayah-dki-jakarta",
                    "namaData": "Estimasi Jumlah Penduduk Terpapar Bencana Banjir Wilayah DKI Jakarta",
                    "deskripsi": "Perkembangan pesat di Jakarta membawa dampak langsung pada peningkatan jumlah penduduk yang terpapar risiko banjir. Setiap tahun, semakin banyak kawasan yang terendam, yang tentu saja mengganggu aktivitas sehari-hari.  Lantas, apakah kita bisa memprediksi wilayah yang berpotensi terendam banjir untuk langkah mitigasi di masa depan? Cek caranya disini!",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://tataruang.jakarta.go.id/portal/apps/storymaps/stories/113807ece9594f5c818d2c8f19b410f9"
                },
                {
                    "id": 9,
                    "slug": "analisis-faktor-transportasi-terhadap-nilai-tanah",
                    "namaData": "Analisis Faktor Transportasi Terhadap Nilai Tanah",
                    "deskripsi": "MRT Jakarta bukan sekadar transportasi, tapi juga pemicu naiknya harga tanah di sekitarnya. Akses yang lebih mudah bikin properti di jalurnya makin diburu. Jika tren ini terus berlanjut, peluang investasi di sekitar MRT bisa makin menjanjikan. Seberapa besar ya efeknya?",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://tataruang.jakarta.go.id/portal/apps/storymaps/stories/292d9428ec0b47caa2e77a6d53809265"
                },
                {
                    "id": 10,
                    "slug": "pemetaan-pohon",
                    "namaData": "Pemetaan Pohon",
                    "deskripsi": "Penelitian ini menggunakan AI (YOLO) untuk mendeteksi pohon di Jakarta melalui citra satelit/UAV. Data ini membantu memahami sebaran pohon, yang berperan menyerap karbon, menurunkan suhu, dan mengurangi polusi. Hasilnya bisa jadi landasan perencanaan kota yang lebih hijau dan berkelanjutan!",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://docs.google.com/document/d/1AlfNzfN1ZXFNdhxdnTTO9Criv7pYuXj55oDuSwfDnEk/preview?tab=t.0"
                },
                {
                    "id": 11,
                    "slug": "perhitungan-lahan-terbangun",
                    "namaData": "Perhitungan Lahan Terbangun",
                    "deskripsi": "Perubahan lahan terbangun dapat memengaruhi ketersediaan ruang hijau di Jakarta. Dengan analisis data satelit dan teknologi GIS, perubahan lahan dapat dipantau secara lebih akurat. Upaya ini bisa membantu menjaga keseimbangan antara pembangunan dan lingkungan!",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://drive.google.com/file/d/11W2eNVomg5f9_mXyiEPVfDpveZf5hdv-/preview"
                },
                {
                    "id": 12,
                    "slug": "perhitungan-lahan-terbangun-dan-daya-dukung-untuk-bangunan",
                    "namaData": "Perhitungan Lahan Terbangun dan Daya Dukung untuk Bangunan",
                    "deskripsi": "Jakarta terus berkembang, tapi lahan terbangun makin mendominasi, sementara ruang hijau terdesak. Jika dibiarkan, dampaknya bisa serius bagi lingkungan dan kualitas hidup. Bisakah tata ruang yang bijak menjaga keseimbangan? Temukan jawabannya!",
                    "Gubernur100Hari": false,
                    "penerbit": "Jakarta Satu",
                    "tanggalTerbit": "2024",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://docs.google.com/document/d/1AwuuECPDXqLBVJUCeUPhNxFGg-KcRSAtBYlGeZh_9Wg/preview?tab=t.0"
                },
                // {
                //     "id": 13,
                //     "slug": "gerakan-masyarakat-punya-apar-gempar",
                //     "namaData": "Gerakan Masyarakat Punya APAR (GEMPAR)",
                //     "deskripsi": "",
                //     "penerbit": "Jakarta Satu",
                //     "Gubernur100Hari": "true",
                //     "tanggalTerbit": "",
                //     "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                //     "link": "https://jakartasatu.jakarta.go.id/geoportal/informasi/publikasi/gerakan-masyarakat-punya-apar-gempar"
                // },
                {
                    "id": 13,
                    "slug": "gerakan-masyarakat-punya-apar-gempar",
                    "namaData": "Gerakan Masyarakat Punya APAR (GEMPAR)",
                    "deskripsi": "Banyak cara memitigasi kebakaran, salah satunya dengan memastikan APAR tersedia di lokasi yang tepat. Tapi, di mana saja titik-titik krusial yang paling membutuhkan? Temukan rekomendasinya di sini!",
                    "penerbit": "Jakarta Satu",
                    "Gubernur100Hari": true,
                    "tanggalTerbit": "2025",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://public.tableau.com/app/profile/jakarta.satu/viz/Project100HariGubernur-GerakanMasyarakatPunyaAPARGEMPAR/Halaman1"
                },
                {
                    "id": 14,
                    "slug": "rekomendasi-taman-dibuka-24-jam",
                    "namaData": "Rekomendasi Taman Dibuka 24 Jam",
                    "deskripsi": "Jakarta butuh ruang hijau yang lebih fleksibel, tapi jam operasional taman masih terbatas. Analisis spasial menunjukkan taman mana yang potensial dibuka 24 jam. Bukan sekadar pajangan, taman bisa bikin kota makin hidup. Yuk, manfaatkan lebih baik!",
                    "penerbit": "Jakarta Satu",
                    "Gubernur100Hari": true,
                    "tanggalTerbit": "2025",
                    "imgSrc": "/assets/Gambar-detail-peta-katalog-peta.png",
                    "link": "https://public.tableau.com/app/profile/jakarta.satu/viz/Program100HariGubernur-RekomendasiTamanDibuka24Jam/DashboardTaman"
                },
            ]

        return NextResponse.json(risetAPI)
    }
}