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
                    "judul": "Penambahan Fitur Histori Foto Udara DKI Jakarta",
                    "deskripsi": [
                        {
                            "gambar": "/assets/whats-new-penambahan-fitur-histori-foto-udara-dki-jakarta.png",
                            "subJudul": "Lorem Ipsum",
                            "subDeskripsi": "Lorem ipsum dolor sit amet consectetur. Et vitae porttitor non donec ornare mauris tempus in elementum. Rhoncus lacus eu amet sed id accumsan hendrerit. Maecenas faucibus amet gravida sed facilisis. Non pulvinar nunc ipsum facilisis massa in tempor pharetra ut."
                        },
                        {
                            "gambar": "/assets/whats-new-penambahan-fitur-histori-foto-udara-dki-jakarta.png",
                            "subJudul": "Mattis Malesuada",
                            "subDeskripsi": "Mattis malesuada sem mauris sed in mauris dui euismod egestas. Sagittis scelerisque vitae maecenas vitae quis elit felis malesuada. Massa viverra sollicitudin in nibh ut. Sem id eu proin nunc. Sed arcu sit nullam aliquet enim rutrum sagittis accumsan."
                        },
                        {
                            "gambar": "/assets/whats-new-penambahan-fitur-histori-foto-udara-dki-jakarta.png",
                            "subJudul": "Mattis Malesuada",
                            "subDeskripsi": "Mattis malesuada sem mauris sed in mauris dui euismod egestas. Sagittis scelerisque vitae maecenas vitae quis elit felis malesuada. Massa viverra sollicitudin in nibh ut. Sem id eu proin nunc. Sed arcu sit nullam aliquet enim rutrum sagittis accumsan."
                        },
                    ],
                    "link": "http://localhost:3000/geoportal/foto-udara",
                    "tanggal": "07 April 2025",
                    "kategori": "Website",
                },
                {
                    "id": 2,
                    "judul": "Tampilan Baru pada Open Data di Aplikasi Jakarta Satu",
                    "deskripsi": [
                        {
                            "gambar": "/assets/whats-new-tampilan-baru-pada-open-data-di-aplikasi-jakarta-satu.png",
                            "subJudul": "Lorem Ipsum",
                            "subDeskripsi": "Lorem ipsum dolor sit amet consectetur. Et vitae porttitor non donec ornare mauris tempus in elementum. Rhoncus lacus eu amet sed id accumsan hendrerit. Maecenas faucibus amet gravida sed facilisis. Non pulvinar nunc ipsum facilisis massa in tempor pharetra ut."
                        },
                        {
                            "gambar": "/assets/whats-new-tampilan-baru-pada-open-data-di-aplikasi-jakarta-satu.png",
                            "subJudul": "Mattis Malesuada",
                            "subDeskripsi": "Mattis malesuada sem mauris sed in mauris dui euismod egestas. Sagittis scelerisque vitae maecenas vitae quis elit felis malesuada. Massa viverra sollicitudin in nibh ut. Sem id eu proin nunc. Sed arcu sit nullam aliquet enim rutrum sagittis accumsan."
                        },
                        {
                            "gambar": "/assets/whats-new-tampilan-baru-pada-open-data-di-aplikasi-jakarta-satu.png",
                            "subJudul": "Lorem Ipsum",
                            "subDeskripsi": "Lorem ipsum dolor sit amet consectetur. Et vitae porttitor non donec ornare mauris tempus in elementum. Rhoncus lacus eu amet sed id accumsan hendrerit. Maecenas faucibus amet gravida sed facilisis. Non pulvinar nunc ipsum facilisis massa in tempor pharetra ut."
                        },
                        {
                            "gambar": "/assets/whats-new-tampilan-baru-pada-open-data-di-aplikasi-jakarta-satu.png",
                            "subJudul": "Mattis Malesuada",
                            "subDeskripsi": "Mattis malesuada sem mauris sed in mauris dui euismod egestas. Sagittis scelerisque vitae maecenas vitae quis elit felis malesuada. Massa viverra sollicitudin in nibh ut. Sem id eu proin nunc. Sed arcu sit nullam aliquet enim rutrum sagittis accumsan."
                        },
                    ],
                    "link": "",
                    "tanggal": "05 April 2025",
                    "kategori": "Mobile",
                },
                {
                    "id": 3,
                    "judul": "Perubahan Desain pada Peta Jakarta",
                    "deskripsi": [
                        {
                            "gambar": "/assets/whats-new-perubahan-desain-pada-peta-jakarta.png",
                            "subJudul": "Lorem Ipsum",
                            "subDeskripsi": "Lorem ipsum dolor sit amet consectetur. Et vitae porttitor non donec ornare mauris tempus in elementum. Rhoncus lacus eu amet sed id accumsan hendrerit. Maecenas faucibus amet gravida sed facilisis. Non pulvinar nunc ipsum facilisis massa in tempor pharetra ut."
                        },
                    ],
                    "link": "http://localhost:3000/geoportal/peta/jakarta",
                    "tanggal": "04 April 2025",
                    "kategori": "Website",
                },
            ]
        }

        return NextResponse.json(whatsNewAPI)
    }
}