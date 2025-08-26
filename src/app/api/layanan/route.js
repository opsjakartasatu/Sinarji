import { NextResponse } from "next/server";

export async function GET(req) {
    if (req.method === 'GET') {
        const layananAPI =
        {
            "layananData": [
                {
                    "id": "1",
                    "slug": "apotek",
                    "namaData": "Apotek",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Kesehatan",
                    "icon": "/assets/layanan-apotek.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "2",
                    "slug": "bangunan-pemerintah",
                    "namaData": "Bangunan Pemerintah",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "icon": "/assets/layanan-bangunan-pemerintah.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "3",
                    "slug": "banjir",
                    "namaData": "Banjir",
                    "kategoriData": "Transportasi",
                    "skpd": "Badan Penanggulangan Bencana Daerah",
                    "icon": "/assets/layanan-banjir.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "4",
                    "slug": "cagar-budaya",
                    "namaData": "Cagar Budaya",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-cagar-budaya.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "5",
                    "slug": "danau-embung-waduk",
                    "namaData": "Danau Embung Waduk",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Sumber Daya Air",
                    "icon": "/assets/layanan-danau-waduk-embung.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "6",
                    "slug": "daya-tarik-wisata",
                    "namaData": "Daya Tarik Wisata",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-daya-tarik-wisata.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "7",
                    "slug": "transportasi",
                    "namaData": "Transportasi",
                    "kategoriData": "Faskes",
                    "skpd": "Dinas Kesehatan",
                    "icon": "/assets/layanan-faskes.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "8",
                    "slug": "kesehatan",
                    "namaData": "Kesehatan",
                    "kategoriData": "Halte",
                    "skpd": "Dinas Perhubungan",
                    "icon": "/assets/layanan-halte.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "9",
                    "slug": "apotek-23123123",
                    "namaData": "Apotek 23123123",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Kesehatan",
                    "icon": "/assets/layanan-apotek.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "10",
                    "slug": "bangunan-pemerintah-22323",
                    "namaData": "Bangunan Pemerintah 22323",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "icon": "/assets/layanan-bangunan-pemerintah.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "11",
                    "slug": "banjir-5131",
                    "namaData": "Banjir 5131",
                    "kategoriData": "Transportasi",
                    "skpd": "Badan Penanggulangan Bencana Daerah",
                    "icon": "/assets/layanan-banjir.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "12",
                    "slug": "cagar-budaya-35151",
                    "namaData": "Cagar Budaya 35151",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-cagar-budaya.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "13",
                    "slug": "danau-embung-waduk-51531",
                    "namaData": "Danau Embung Waduk 51531",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Sumber Daya Air",
                    "icon": "/assets/layanan-danau-waduk-embung.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "14",
                    "slug": "daya-tarik-wisata-9955",
                    "namaData": "Daya Tarik Wisata 9955",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-daya-tarik-wisata.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "15",
                    "slug": "transportasi-554466",
                    "namaData": "Transportasi 554466",
                    "kategoriData": "Faskes",
                    "skpd": "Dinas Kesehatan",
                    "icon": "/assets/layanan-faskes.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "16",
                    "slug": "kesehatan-2222",
                    "namaData": "Kesehatan 2222",
                    "kategoriData": "Halte",
                    "skpd": "Dinas Perhubungan",
                    "icon": "/assets/layanan-halte.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "17",
                    "slug": "apotek-753",
                    "namaData": "Apotek 753",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Kesehatan",
                    "icon": "/assets/layanan-apotek.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "18",
                    "slug": "bangunan-pemerintah-159",
                    "namaData": "Bangunan Pemerintah 159",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "icon": "/assets/layanan-bangunan-pemerintah.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "19",
                    "slug": "banjir-963",
                    "namaData": "Banjir 963",
                    "kategoriData": "Transportasi",
                    "skpd": "Badan Penanggulangan Bencana Daerah",
                    "icon": "/assets/layanan-banjir.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "20",
                    "slug": "cagar-budaya-729",
                    "namaData": "Cagar Budaya 729",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-cagar-budaya.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "21",
                    "slug": "danau-embung-waduk-789456",
                    "namaData": "Danau Embung Waduk 789456",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Sumber Daya Air",
                    "icon": "/assets/layanan-danau-waduk-embung.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "22",
                    "slug": "daya-tarik-wisata-456123",
                    "namaData": "Daya Tarik Wisata 456123",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-daya-tarik-wisata.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "23",
                    "slug": "transportasi-258147",
                    "namaData": "Transportasi 258147",
                    "kategoriData": "Faskes",
                    "skpd": "Dinas Kesehatan",
                    "icon": "/assets/layanan-faskes.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "24",
                    "slug": "kesehatan-159753",
                    "namaData": "Kesehatan 159753",
                    "kategoriData": "Halte",
                    "skpd": "Dinas Perhubungan",
                    "icon": "/assets/layanan-halte.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "25",
                    "slug": "apotek-321987",
                    "namaData": "Apotek 321987",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Kesehatan",
                    "icon": "/assets/layanan-apotek.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "26",
                    "slug": "bangunan-pemerintah-684",
                    "namaData": "Bangunan Pemerintah 684",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "icon": "/assets/layanan-bangunan-pemerintah.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "27",
                    "slug": "banjir-1155",
                    "namaData": "Banjir 1155",
                    "kategoriData": "Transportasi",
                    "skpd": "Badan Penanggulangan Bencana Daerah",
                    "icon": "/assets/layanan-banjir.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "28",
                    "slug": "cagar-budaya-998855",
                    "namaData": "Cagar Budaya 998855",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-cagar-budaya.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "29",
                    "slug": "danau-embung-waduk-4433",
                    "namaData": "Danau Embung Waduk 4433",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Sumber Daya Air",
                    "icon": "/assets/layanan-danau-waduk-embung.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "30",
                    "slug": "daya-tarik-wisata-0011",
                    "namaData": "Daya Tarik Wisata 0011",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-daya-tarik-wisata.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "31",
                    "slug": "kesehatan-3300",
                    "namaData": "Kesehatan 3300",
                    "kategoriData": "Halte",
                    "skpd": "Dinas Perhubungan",
                    "icon": "/assets/layanan-halte.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "32",
                    "slug": "banjir-446600",
                    "namaData": "Banjir 446600",
                    "kategoriData": "Transportasi",
                    "skpd": "Badan Penanggulangan Bencana Daerah",
                    "icon": "/assets/layanan-banjir.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "33",
                    "slug": "cagar-budaya-110022",
                    "namaData": "Cagar Budaya 110022",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-cagar-budaya.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "34",
                    "slug": "danau-embung-waduk-880077",
                    "namaData": "Danau Embung Waduk 880077",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Sumber Daya Air",
                    "icon": "/assets/layanan-danau-waduk-embung.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "35",
                    "slug": "daya-tarik-wisata-0000",
                    "namaData": "Daya Tarik Wisata 0000",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-daya-tarik-wisata.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "36",
                    "slug": "kesehatan-6341",
                    "namaData": "Kesehatan 6341",
                    "kategoriData": "Halte",
                    "skpd": "Dinas Perhubungan",
                    "icon": "/assets/layanan-halte.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "37",
                    "slug": "bangunan-pemerintah-1230",
                    "namaData": "Bangunan Pemerintah 1230",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan",
                    "icon": "/assets/layanan-bangunan-pemerintah.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "38",
                    "slug": "banjir-741852",
                    "namaData": "Banjir 741852",
                    "kategoriData": "Transportasi",
                    "skpd": "Badan Penanggulangan Bencana Daerah",
                    "icon": "/assets/layanan-banjir.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "39",
                    "slug": "danau-embung-waduk-9638",
                    "namaData": "Danau Embung Waduk 9638",
                    "kategoriData": "Kesehatan",
                    "skpd": "Dinas Sumber Daya Air",
                    "icon": "/assets/layanan-danau-waduk-embung.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Privat",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "40",
                    "slug": "daya-tarik-wisata-6549",
                    "namaData": "Daya Tarik Wisata 6549",
                    "kategoriData": "Transportasi",
                    "skpd": "Dinas Pariwisata dan Ekonomi Kreatif",
                    "icon": "/assets/layanan-daya-tarik-wisata.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                },
                {
                    "id": "41",
                    "slug": "kesehatan-8888",
                    "namaData": "Kesehatan 8888",
                    "kategoriData": "Halte",
                    "skpd": "Dinas Perhubungan",
                    "icon": "/assets/layanan-halte.png",
                    "desc": "Lorem ipsum dolor sit amet consectetur. Mollis nec consectetur ultrices nulla rhoncus neque tellus ac porttitor. Diam purus pellentesque risus ut tortor netus massa molestie scelerisque. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur",
                    "button": "Detail Info",
                    "type": "Publik",
                    "imgSrc": "/assets/Gambar-detail-peta-layanan.png",
                    "link": "",
                    "metadata": {
                        "createdAt": "Dibuat tanggal 12 November 2023",
                        "sifatData": "Sifat data publik",
                        "prosesUpdate": "Proses update setiap bulan",
                        "cakupanArea": "Cakupan area Jakarta Timur"
                    },
                    "komponenLayer": {
                        "batasAdministrasi": "Layer peta batas administrasi",
                        "petaTaman": "Layer peta taman",
                        "petaLokasiBermain": "Layer peta lokasi taman bermain"
                    }
                }
            ],
            "kategori": [
                {
                    "id": "1",
                    "namaKategori": "Apotek"
                },
                {
                    "id": "2",
                    "namaKategori": "Bangunan"
                },
                {
                    "id": "3",
                    "namaKategori": "Bangunan Pemerintah"
                },
                {
                    "id": "4",
                    "namaKategori": "Banjir"
                },
                {
                    "id": "5",
                    "namaKategori": "Cagar Budaya"
                },
                {
                    "id": "6",
                    "namaKategori": "Danau Embung Waduk"
                },
                {
                    "id": "7",
                    "namaKategori": "Daya Tarik Wisata"
                },
                {
                    "id": "8",
                    "namaKategori": "Faskes"
                },
                {
                    "id": "9",
                    "namaKategori": "Halte"
                },
                {
                    "id": "10",
                    "namaKategori": "Kependudukan"
                },
                {
                    "id": "11",
                    "namaKategori": "Minimarket"
                },
                {
                    "id": "12",
                    "namaKategori": "Niaga"
                },
                {
                    "id": "13",
                    "namaKategori": "Pendidikan"
                },
                {
                    "id": "14",
                    "namaKategori": "Penggunaan Lahan"
                },
                {
                    "id": "15",
                    "namaKategori": "Permukiman Kumuh"
                },
                {
                    "id": "16",
                    "namaKategori": "Pusat Perbelanjaan"
                },
                {
                    "id": "17",
                    "namaKategori": "Sarana Ibadah"
                },
                {
                    "id": "18",
                    "namaKategori": "Sosial"
                },
                {
                    "id": "19",
                    "namaKategori": "Stasiun KA"
                },
                {
                    "id": "20",
                    "namaKategori": "Stasiun Pengisian Bahan Bakar Gas (SPBG)"
                },
                {
                    "id": "21",
                    "namaKategori": "Stasiun Pengisian Bahan Bakar Umum (SPBU)"
                },
                {
                    "id": "22",
                    "namaKategori": "Supermarket"
                },
                {
                    "id": "23",
                    "namaKategori": "Taman"
                },
                {
                    "id": "24",
                    "namaKategori": "Terminal Bis"
                }
            ],
            "simpulJaringan": [
                {
                    "id": "b817bd74-6197-11ee-847e-484d7eb96577",
                    "namaSkpd": "Badan Penanggulangan Bencana Daerah"
                },
                {
                    "id": "f4d7860e-6197-11ee-847e-484d7eb96577",
                    "namaSkpd": "Badan Pendapatan Daerah"
                },
                {
                    "id": "19fbfe07-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Badan Pengelolaan Aset Daerah"
                },
                {
                    "id": "28f7c946-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Badan Perencanaan Pembangunan Daerah"
                },
                {
                    "id": "3108ee58-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Badan Pertanahan Nasional"
                },
                {
                    "id": "48ea0354-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Biro Tata Pemerintahan"
                },
                {
                    "id": "4ec72deb-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Bina Marga"
                },
                {
                    "id": "54a65b28-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Cipta Karya, Tata Ruang, dan Pertanahan"
                },
                {
                    "id": "5d2577b5-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Pertamanan dan Hutan Kota"
                },
                {
                    "id": "6430e6e1-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Kesehatan"
                },
                {
                    "id": "6b2660f6-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Ketahanan Pangan Kelautan dan Pertanian"
                },
                {
                    "id": "724cab49-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Lingkungan Hidup"
                },
                {
                    "id": "7974ab07-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Pariwisata dan Ekonomi Kreatif"
                },
                {
                    "id": "7f885c7a-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Pemberdayaan, Perlindungan Anak, dan Pengendalian Penduduk"
                },
                {
                    "id": "8560bd74-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Pemuda dan Olahraga"
                },
                {
                    "id": "8c01722f-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu"
                },
                {
                    "id": "930a997a-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Penanggulangan Kebakaran dan Penyelamatan"
                },
                {
                    "id": "c975936c-619f-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Pendidikan"
                },
                {
                    "id": "a42ae910-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Perhubungan"
                },
                {
                    "id": "b8eb59b8-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Perumahan Rakyat dan Kawasan Pemukiman"
                },
                {
                    "id": "c159523c-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Sosial"
                },
                {
                    "id": "c8df4623-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Sumber Daya Air"
                },
                {
                    "id": "ceb600f6-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Tenaga Kerja Transmigrasi, dan Energi"
                },
                {
                    "id": "d5604ae8-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Jaklingko"
                },
                {
                    "id": "dc09c9b1-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Satuan Polisi Pamong Praja"
                },
                {
                    "id": "e1e1f8aa-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Biro Pendidikan dan Mental Spiritual"
                },
                {
                    "id": "e781993e-619a-11ee-9305-506b8d729ce3",
                    "namaSkpd": "Dinas Perindustrian, Perdagangan, Koprasi, Usaha Kecil dan Menengah"
                }
            ]
        }

        return NextResponse.json(layananAPI)
    }
}