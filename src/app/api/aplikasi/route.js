import { NextResponse } from "next/server";

export async function GET(req) {
    if (req.method === 'GET') {
        const aplikasiAPI =
            [
                {
                    id: 1,
                    judul: 'SIMBG Jakarta',
                    icon: '/assets/aplikasi-simbg-new.png',
                    deskripsi: 'SIMBG Daerah Khusus Jakarta adalah sistem elektronik untuk mengelola proses Persetujuan Bangunan Gedung di Jakarta.',
                    link: 'https://simbg.jakarta.go.id/',
                    newTab: true
                },
                {
                    id: 2,
                    judul: 'Surveilans',
                    icon: '/assets/aplikasi-surveilans.png',
                    deskripsi: 'Menampilkan data kondisi kesehatan, angka kematian, serta rumah sakit hasil kolaborasi dengan Dinas Kesehatan DKI Jakarta.',
                    link: 'https://surveilans-dinkes.jakarta.go.id/',
                    newTab: true
                },
                {
                    id: 3,
                    judul: 'DBDKlim',
                    icon: '/assets/aplikasi-dbdklim.png',
                    deskripsi: 'Peta prediksi angka insiden DBD dan prediksi kelembaban udara dalam upaya mencegah penyebaran penyakit DBD.',
                    link: 'https://iklim.bmkg.go.id/id/dbdklim/',
                    newTab: true
                },
                {
                    id: 4,
                    judul: 'Histori Foto Udara',
                    icon: '/assets/aplikasi-history-foto-udara.png',
                    deskripsi: 'Menjelajahi perubahan Jakarta melalui foto udara yang merekam transformasi kota.',
                    // link: 'http://localhost:3000/geoportal/foto-udara',
                    link: `${process.env.BASE_URL}/foto-udara`,
                    // link: 'https://jakartasatu.jakarta.go.id/geoportal/foto-udara',
                    newTab: false
                },
            ]

        return NextResponse.json(aplikasiAPI)
    }
}