import { NextResponse } from "next/server";

export async function GET(req) {
    if (req.method === 'GET') {
        const whatsNewAPI =
        {
            "status": true,
            "message": "Success",
            "data": [
                {
                    "id": 1,
                    "judul": "Melihat Jakarta dari Udara: Fitur Histori Foto Udara Telah Hadir",
                    "deskripsi": [
                        {
                            "gambar": "/assets/whats-new/histori-foto-udara.png",
                            "contents": [
                                {
                                    "subJudul": "",
                                    "subDeskripsi": "Histori Foto Udara DKI Jakarta Histori Foto Udara merupakan sebuah web aplikasi interaktif yang menyajikan visualisasi perubahan lanskap Kota Jakarta dari tahun 1972 hingga 2023 melalui foto udara. Aplikasi ini memungkinkan pengguna untuk menelusuri transformasi wilayah Jakarta secara kronologis dalam rentang waktu lebih dari lima dekade. Untuk mendukung pengalaman tersebut, aplikasi ini dilengkapi dengan berbagai fitur yang dirancang agar mudah digunakan dan memberikan informasi secara mendalam kepada pengguna."
                                },
                            ],
                        },
                        {
                            "gambar": "/assets/whats-new/foto-udara-play-compare-swipe.png",
                            "contents": [
                                {
                                    "subJudul": "",
                                    "subDeskripsi": "Dalam aplikasi histori foto udara, tersedia berbagai fitur yang dapat digunakan oleh pengguna, antara lain:",
                                },
                                {
                                    "subJudul": "Play Foto Udara",
                                    "subDeskripsi": "Fitur play digunakan untuk memperlihatkan perubahan kota Jakarta dari tahun ke tahun secara otomatis, seperti memutar sebuah tayangan. Ketika klik tombol “Play” maka pengguna akan menyaksikan urutan foto udara mulai tahun 1972 hingga 2023 berganti satu persatu seolah-olah melihat perjalanan singkat perkembangan Kota Jakarta.",
                                },
                                {
                                    "subJudul": "Compare Foto Udara",
                                    "subDeskripsi": "Compare Foto Udara Compare Foto Udara digunakan untuk membandingkan dua foto udara dari periode waktu yang berbeda secara berdampingan. Misalnya, pilih foto tahun 1985 dan foto tahun 2023, maka kedua foot udara tersebut bersebelahan. Fitur ini dapat digunakan untuk memudahkan melihat secara langsung perbedaan tata ruang, bangunan, dan infrastruktur yang ada di Kota Jakarta dari masa ke masa.",
                                },
                                {
                                    "subJudul": "Swipe Foto Udara",
                                    "subDeskripsi": "Fitur Swipe memungkinkan pengguna untuk melihat perbedaan foto udara dari tahun ke tahun dengan menggeser garis pemisah pada peta untuk menampilkan dua lapisan foto udara sekaligus. Geser ke kiri atau kanan, dan foto lama serta foto baru akan berganti dan akan terlihat perbandingannya secara langsung pada lokasi yang sama.",
                                },
                            ],
                        },
                        {
                            "gambar": "/assets/whats-new/foto-udara-metadata.png",
                            "contents": [
                                {
                                    "subJudul": "Metadata Foto Udara",
                                    "subDeskripsi": "Selain melihat rekaman foto udara pengguna juga dapat langsung melihat metadata foto udara seperti Resolusi, Sumber Data, Referensi Spasial, Kegunaan dan informasi lainnya.",
                                }
                            ],
                        },
                    ],
                    "link": "http://localhost:3000/geoportal/foto-udara",
                    "tanggal": "07 April 2025",
                    "kategori": "Website",
                },
                {
                    "id": 2,
                    "judul": "Cek Kualitas Udara di Aplikasi Jakarta Satu Mobile",
                    "deskripsi": [
                        {
                            "gambar": "/assets/whats-new/mobile-kualitas-udara.png",
                            "contents": [
                                {
                                    "subJudul": "",
                                    "subDeskripsi": "Informasi kualitas udara Jakarta terkini dapat dilihat pada aplikasi Jakarta Satu Mobile. Berikut uraian yang dapat memudahkan Anda dalam memahami informasi yang tersedia:"
                                },
                                {
                                    "subJudul": "AQI (Air Quality Index) Value",
                                    "subDeskripsi": "Menampilkan nilai indeks kualitas udara terkini di Jakarta. Nilai ini mencerminkan tingkat polusi udara dan dampaknya terhadap kesehatan, mulai dari kategori \\\"Baik\\\" hingga \\\"Berbahaya\\\"."
                                },
                                {
                                    "subJudul": "Temperatur",
                                    "subDeskripsi": "Tampilan informasi suhu udara terkini di Jakarta. Informasi ini membantu mengetahui kondisi cuaca pada saat ini yang bisa mempengaruhi kenyamanan aktivitas harian."
                                },
                                {
                                    "subJudul": "Kelembaban Udara",
                                    "subDeskripsi": "Menampilkan persentase kelembaban udara di Jakarta. Kelembaban berpengaruh terhadap tingkat kenyamanan serta persepsi suhu panas atau dingin."
                                },
                                {
                                    "subJudul": "Kecepatan Angin",
                                    "subDeskripsi": "Memberikan informasi tentang kecepatan angin yang sedang berlangsung. Kecepatan angin berperan dalam penyebaran polusi udara dan dapat memengaruhi kualitas udara serta kondisi cuaca."
                                },
                            ],
                        },
                    ],
                    "link": "",
                    "tanggal": "05 April 2025",
                    "kategori": "Mobile",
                },
                {
                    "id": 3,
                    "judul": "Fitur Baru Kini Dapat Diakses di Peta Jakarta",
                    "deskripsi": [
                        {
                            "gambar": "/assets/whats-new/peta-jakarta-print.png",
                            "contents": [
                                {
                                    "subJudul": "Widget Print Peta",
                                    "subDeskripsi": "Print Peta memudahkan Anda untuk membuat peta cetak tampilan peta yang telah dipilih oleh pengguna seperti Batas Administrasi, Rencana Tata Ruang, Jaringan Jalan, dan layer-layer lainnya yang terdapat di Jakarta Satu."
                                }
                            ],
                        },
                        {
                            "gambar": "/assets/whats-new/peta-jakarta-upload.png",
                            "contents": [
                                {
                                    "subJudul": "Widget Upload Data",
                                    "subDeskripsi": "Upload Data merupakan sebuah widget yang memudahkan pengguna untuk menampilkan data spasial milik mereka dalam berbagai format. Widget upload data dapat memungkikan pengguna untuk mengunggah file shapefile (.shp) beserta berkas pelengkapnya (.dbf, .shx, dll.) dalam bentuk (.zip) untuk ditampilkan langsung di peta. Selain itu widget ini juga memungkinkan untuk menambahkan menampilkan data spasial dalam bentuk layanan seperti Web Map Server (WMS) ataupun Web Feature Server (WFS) melalui URL service."
                                }
                            ],
                        },
                    ],
                    "link": "http://localhost:3000/geoportal/peta/jakarta",
                    "tanggal": "04 April 2025",
                    "kategori": "Website",
                },
                {
                    "id": 4,
                    "judul": "Penyempurnaan Desain Metadata Smart RDTR",
                    "deskripsi": [
                        {
                            "gambar": "/assets/whats-new/smart-rdtr-metadata.png",
                            "contents": [
                                {
                                    "subJudul": "",
                                    "subDeskripsi": "Desain metadata pada Smart RDTR telah diperbarui dari tampilan yang sebelumnya flat dan minim kontras menjadi tampilan yang lebih modern dan mudah dibaca. Kini, kotak tersebut memiliki header berwarna biru kontras dengan teks putih, serta struktur informasi yang lebih rapi dengan pemisahan jelas antara label dan isi. Perubahan ini bertujuan untuk meningkatkan keterbacaan, kenyamanan, dan pengalaman pengguna saat mengakses informasi tata ruang."
                                }
                            ],
                        },
                    ],
                    "link": "http://localhost:3000/geoportal/layanan/smart-rdtr/peta",
                    "tanggal": "04 April 2025",
                    "kategori": "Website",
                },
            ]
        }

        return NextResponse.json(whatsNewAPI)
    }
}