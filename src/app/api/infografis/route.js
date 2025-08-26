import { NextResponse } from "next/server";

export async function GET(req) {
    if (req.method === 'GET') {
        const infografisAPI =
        {
            "status": true,
            "message": "Success",
            "data": [
                {
                    "id": 1,
                    "deskripsi": "OMG! OMG! Jakarta Satu punya peta 3D keren?😱 \n Apa iya? Iyaa dongg!🥰",
                    "link": "https://www.instagram.com/p/DCswthkS7ll/?img_index=1",
                    "gambar": [
                        "/assets/infografis-1.png"
                    ],
                },
                {
                    "id": 2,
                    "deskripsi": "Halo Sobat Jakarta Satu! 😉 \n Tahu gak sih bencana alam merupakan suatu peristiwa alam yang memiliki dampak besar bagi kehidupan manusia...",
                    "link": "https://www.instagram.com/p/DCTZ6b1y3rq/?img_index=1",
                    "gambar": [
                        "/assets/infografis-2-1.png",
                        "/assets/infografis-2-2.png",
                        "/assets/infografis-2-3.png",
                        "/assets/infografis-2-4.png",
                        "/assets/infografis-2-5.png",
                        "/assets/infografis-2-6.png",
                        "/assets/infografis-2-7.png",
                        "/assets/infografis-2-8.png",
                        "/assets/infografis-2-9.png",
                    ],
                },
                {
                    "id": 3,
                    "deskripsi": "#SobJakartaSatu, kamu sudah tahu belum kalau Jakarta punya peta aset? \n Pemetaan Aset ini merupakan salah satu upaya penting yang dapat dilakukan dalam pengelolaan aset, lho! \n Kira-kira kenapa sepenting itu ya #SobJakartaSatu?",
                    "link": "https://www.instagram.com/p/DAKqRdJSksk/?img_index=1",
                    "gambar": [
                        "/assets/infografis-3.png",
                    ],
                },
                {
                    "id": 4,
                    "deskripsi": "Pernah gak sih kamu berpikir cara ikan bermigrasi bagaimana?🤔 \n Padahal bumi punya laut yang begitu luas, ada tidak ya lokasi yang aman untuk ikan bermigrasi?😱",
                    "link": "https://www.instagram.com/p/C_eri4Cygox/?img_index=1",
                    "gambar": [
                        "/assets/infografis-4-1.png",
                        "/assets/infografis-4-2.png",
                        "/assets/infografis-4-3.png",
                        "/assets/infografis-4-4.png",
                        "/assets/infografis-4-5.png",
                        "/assets/infografis-4-6.png",
                        "/assets/infografis-4-7.png",
                        "/assets/infografis-4-8.png"
                    ],
                },
                {
                    "id": 5,
                    "deskripsi": "Kamu #TahuGakSih bagaimana proses pembuatan peta? Ternyata kegiatan pengukuran dan pematokan memiliki peran penting loh di dalamnya😲.... \n Meski terdengar serupa, namun kegiatan pengukuran dan pematokan memiliki perbedaan loh! Kira-kira apa ya perbedaannya?🤔",
                    "link": "https://www.instagram.com/p/C_ac8pJPbtG/?img_index=1",
                    "gambar": [
                        "/assets/infografis-5.png"
                    ],
                },
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

        return NextResponse.json(infografisAPI)
    }
}