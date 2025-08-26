"use client"

import { motion } from 'framer-motion';

import styles from "../../components/page.module.css";

import Navbar from '../../components/navbar/navbar';
import "../../components/navbar/style.css";
import Footer from '../../components/footer/footer';
import ScrollTop from '../../components/scrollTop';
import KritikSaran from '../../components/kritikSaran';
import Breadcrumbs from '../../components/breadcrumbs';

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import { Box, Button, Card, CardContent, CardMedia, Divider, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from '@/components/CustomImage';

const TxtOrderList = {
    marginLeft: "40px",
    color: "rgba(0, 0, 0, 0.70)",
    textAlign: "justify",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "30px",
}

const TxtOrderListA = {
    marginLeft: "20px",
    color: "rgba(0, 0, 0, 0.70)",
    textAlign: "justify",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "30px",
}

const TxtSelamatDatang = styled(Typography)(() => ({
    color: "var(--jakartasatu-biru)",
    fontSize: "22px",
    fontWeight: 800,
}));

const TxtJudul = styled(Typography)(() => ({
    color: "rgba(0, 0, 0, 0.80)",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "30px",
}));

const TxtIsi = styled(Typography)(() => ({
    color: "rgba(0, 0, 0, 0.70)",
    textAlign: "justify",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "30px",
}));

function keijakanPrivasi() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
    const isMobile900 = useMediaQuery(theme.breakpoints.down("md"));

    const breadcrumbs = [
        // { label: "Beranda", href: "/" },
        // { label: "Tentang" }
    ];

    useEffect(() => {
        document.title = "Kebijakan Privasi | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    return (
        <>
            <main className={styles.main}>
                <motion.div
                    className="navbar"
                    variants={navbarVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Navbar />
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <div className={styles.container}>
                        <section style={{ width: "90vw", maxWidth: "1260px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Typography variant="p"
                                style={{
                                    color: 'var(--jakartasatu-biru)',
                                    textAlign: "center",
                                    fontSize: "36px",
                                    fontWeight: "800",
                                }}>
                                Kebijakan & Privasi
                            </Typography>
                            <Divider
                                style={{
                                    margin: '15px auto 80px auto',
                                    backgroundColor: 'var(--jakartasatu-biru)',
                                    height: 5,
                                    width: '75px',
                                    borderRadius: '4px',
                                }}
                            />
                            <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtIsi variant='p'>
                                        Kebijakan Privasi ini adalah komitmen nyata dari <b>Jakarta Satu</b> untuk menghargai dan melindungi setiap data atau informasi pribadi Pengguna aplikasi <b>Jakarta Satu</b>.
                                    </TxtIsi>
                                    <TxtIsi variant='p'>
                                        Kebijakan Privasi ini (beserta syarat-syarat penggunaan sebagaimana tercantum dalam "Syarat & Ketentuan" dan informasi lain yang tercantum di aplikasi <b>Jakarta Satu</b>) menetapkan dasar atas perolehan, pengumpulan, pengolahan, penganalisisan, penampilan, pembukaan, dan/atau segala bentuk pengelolaan yang terkait dengan data atau informasi yang Pengguna berikan kepada <b>Jakarta Satu</b> atau yang <b>Jakarta Satu</b> kumpulkan dari Pengguna, termasuk data pribadi Pengguna, baik pada saat Pengguna melakukan pendaftaran di aplikasi, mengakses aplikasi, maupun mempergunakan layanan-layanan pada aplikasi (selanjutnya disebut sebagai "data").
                                    </TxtIsi>
                                    <TxtIsi variant='p'>
                                        Dengan mengakses dan/atau mempergunakan layanan <b>Jakarta Satu</b>, Pengguna menyatakan bahwa setiap data Pengguna merupakan data yang benar dan sah, serta Pengguna dianggap telah membaca dan memahami dan memberikan persetujuan kepada <b>Jakarta Satu</b> untuk memperoleh, mengumpulkan, menyimpan, mengelola, dan mempergunakan data tersebut sebagaimana tercantum dalam Kebijakan Privasi maupun Syarat & Ketentuan <b>Jakarta Satu</b>.
                                    </TxtIsi>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Perolehan dan Pengumpulan Data Pengguna
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        <b>Jakarta Satu</b> mengumpulkan data Pengguna dengan tujuan untuk mengelola dan memperlancar proses penggunaan situs, serta tujuan-tujuan lainnya selama diizinkan oleh peraturan perundang-undangan yang berlaku. Adapun data Pengguna yang dikumpulkan adalah sebagai berikut:
                                    </TxtIsi>
                                    <ol style={TxtOrderList}>
                                        <li>Data yang diserahkan secara mandiri oleh Pengguna, termasuk namun tidak terbatas, pada data yang diserahkan pada saat Pengguna:</li>
                                        <ol type='a' style={TxtOrderListA}>
                                            <li>Membuat atau memperbarui akun <b>Jakarta Satu</b>, termasuk di antaranya nama pengguna <i>(username)</i>, Nomor NIK, alamat <i>email</i>, nomor telepon, <i>password</i>, alamat sesuai dengan KTP, foto, dan lain-lain yang diminta <b>Jakarta Satu</b>;</li>
                                            <li>mengisi survei yang dikirimkan oleh <b>Jakarta Satu</b> atau atas nama <b>Jakarta Satu</b>;</li>
                                            <li>melakukan interaksi dengan Pengguna lainnya melalui fitur pesan, diskusi, ulasan, rating, dan sebagainya;</li>
                                            <li>menggunakan fitur yang membutuhkan izin akses terhadap perangkat Pengguna seperti izin akses membuka kamera pada saat masuk ke menu <i>scan</i> QR Code.</li>
                                        </ol>
                                        <li>Data yang terekam pada saat Pengguna mempergunakan aplikasi <b>Jakarta Satu</b>, termasuk namun tidak terbatas pada:</li>
                                        <ol type='a' style={TxtOrderListA}>
                                            <li>Data lokasi riil atau perkiraannya seperti alamat IP, lokasi Wi-Fi, <i>geolocation</i>, dan sebagainya;</li>
                                            <li>Data lokasi geografis Pengguna saat menggunakan aplikasi maupun tidak, untuk menyediakan Pengguna layanan mengenai informasi lokasi zona terdampak sesuai dengan acuan yang ditentukan oleh Pemerintah Republik Indonesia, menampilkan statistik kasus Covid-19 di lokasi sekitar Pengguna;</li>
                                            <li>Data berupa waktu dari setiap aktivitas Pengguna, termasuk aktivitas pendaftaran, <i>login</i>, dan lain sebagainya;</li>
                                            <li>Data seluruh konten yang Pengguna buat, Pengguna bagikan, atau Pengguna kirimkan dalam bentuk audio, video, teks, gambar, atau jenis media atau <i>file</i> perangkat lunak lainnya disediakan atas nama Pengguna, termasuk informasi di konten atau tentang konten yang Pengguna sediakan, seperti lokasi foto atau tanggal pembuatan <i>file</i>;</li>
                                            <li>Data terkait topik yang dibaca dan umpan-balik;</li>
                                            <li>Data yang diberikan oleh orang lain tentang Pengguna saat menggunakan layanan, termasuk saat mereka mengirim pesan kepada Pengguna atau mengunggah informasi tentang Pengguna;</li>
                                            <li>Data semua komunikasi dengan pengguna lainnya;</li>
                                            <li>Data penggunaan atau preferensi Pengguna, di antaranya interaksi Pengguna dalam menggunakan aplikasi, pilihan yang disimpan, serta pengaturan yang dipilih. Data tersebut diperoleh menggunakan <i>cookies</i>, <i>pixel tags</i>, dan teknologi serupa yang menciptakan dan mempertahankan pengenal unik;</li>
                                            <li>Data perangkat, di antaranya jenis perangkat yang digunakan untuk mengakses aplikasi, termasuk model perangkat keras, sistem operasi dan versinya, perangkat lunak, nama <i>file</i> dan versinya, pilihan bahasa, pengenal perangkat unik, pengenal iklan, nomor seri, informasi gerakan perangkat, dan/atau informasi jaringan seluler;</li>
                                            <li>Data catatan (<i>log</i>), di antaranya catatan pada server yang menerima data seperti alamat IP perangkat, tanggal dan waktu akses, fitur aplikasi atau laman yang dilihat, proses kerja aplikasi dan aktivitas sistem lainnya, jenis peramban, dan/atau situs atau layanan Pihak Ketiga yang Pengguna gunakan sebelum berinteraksi dengan aplikasi;</li>
                                            <li>Data komunikasi, masukan, saran, dan ide pengguna yang dikirimkan kepada kami;</li>
                                            <li>Data yang berkaitan dengan kepentingan penggunaan layanan perpajakan dan layanan kesehatan pada aplikasi seperti Nomor BPJS Kesehatan, Nomor BPJS Ketenagakerjaan, Nomor Pokok Wajib Pajak, Nomor Objek Pajak PBB, Nomor Kendaraan, Nomor Objek Pajak Daerah, dan sebagainya;</li>
                                            <li>Data yang berkaitan dengan kepentingan penggunaan layanan transaksi pada Aplikasi; dan</li>
                                            <li>Data yang Pengguna berikan saat Pengguna atau organisasi Pengguna yang menghubungi atau berinteraksi dengan kami untuk dukungan terkait layanan;</li>
                                        </ol>
                                        <li>Data yang diperoleh dari sumber lain, termasuk:</li>
                                        <ol type='a' style={TxtOrderListA}>
                                            <li>Nama</li>
                                            <li>Alamat <i>Email</i></li>
                                            <li>Jenis Kelamin</li>
                                            <li>Tempat dan Waktu Kelahiran</li>
                                            <li>Kartu Keluarga</li>
                                            <li>Foto</li>
                                            <li>User ID</li>
                                            <li>Nomor Paspor</li>
                                        </ol>
                                    </ol>
                                    <TxtIsi variant='p'>
                                        <b>Jakarta Satu</b> dapat menggabungkan data yang diperoleh dari sumber tersebut dengan data lain yang dimilikinya.
                                    </TxtIsi>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Penggunaan Data
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        <b>Jakarta Satu</b> dapat menggunakan keseluruhan atau sebagian data yang diperoleh dan dikumpulkan dari Pengguna sebagaimana disebutkan dalam bagian sebelumnya untuk hal-hal sebagai berikut:
                                    </TxtIsi>
                                    <ol style={TxtOrderList}>
                                        <li>Memproses segala bentuk permintaan maupun aktivitas yang dilakukan oleh Pengguna melalui aplikasi.</li>
                                        <li>Penyediaan fitur-fitur untuk memberikan, mewujudkan, memelihara, dan memperbaiki layanan kami, termasuk:</li>
                                        <ol type='a' style={TxtOrderListA}>
                                            <li>menawarkan, memperoleh, menyediakan, atau memfasilitasi layanan dan/atau produk-produk lainnya baik bersumber dari <b>Jakarta Satu</b> atau Pihak Ketiga;</li>
                                            <li>memungkinkan fitur untuk memprivasikan akun <b>Jakarta Satu</b> Pengguna, seperti <i>Like</i>, <i>Share</i>, <i>Bookmark</i>; dan/atau</li>
                                            <li>melakukan kegiatan internal yang diperlukan untuk menyediakan layanan pada situs/aplikasi <b>Jakarta Satu</b>, seperti pemecahan masalah <i>software</i>, <i>bug</i>, permasalahan operasional, melakukan analisis data, pengujian dan penelitian, dan untuk memantau dan menganalisis kecenderungan penggunaan dan aktivitas.</li>
                                        </ol>
                                        <li>Menghubungi Pengguna melalui <i>email</i>, surat, telepon, fax, dan lain-lain, termasuk namun tidak terbatas, untuk membantu dan/atau memproses penyelesaian kendala.</li>
                                        <li>Menggunakan informasi yang diperoleh dari Pengguna untuk tujuan penelitian, analisis, pengembangan dan pengujian guna meningkatkan keamanan dan keamanan layanan-layanan pada aplikasi, serta mengembangkan fitur pada aplikasi.</li>
                                        <li>Menggunakan informasi yang diperoleh dari Pengguna sebagai informasi umum dalam dasbor untuk pemerintah dalam pengambilan keputusan.</li>
                                        <li>Menginformasikan kepada Pengguna terkait layanan, studi, survei, berita, perkembangan terbaru, acara dan lain-lain, baik melalui aplikasi maupun melalui media lainnya. <b>Jakarta Satu</b> juga dapat menggunakan informasi tersebut untuk menyajikan konten yang relevan tentang layanan <b>Jakarta Satu</b>.</li>
                                        <li>Menggunakan informasi yang diperoleh dari Pengguna untuk kebutuhan fitur pada aplikasi sehubungan dengan pemenuhan persyaratan dan kewajiban dari peraturan perundang-undangan yang berkaitan dengan kepentingan perpajakan di Indonesia.</li>
                                        <li>Menggunakan informasi yang diperoleh dari Pengguna untuk tujuan yang diperlukan untuk melakukan proses pembayaran yang berkaitan dengan transaksi non-perpajakan.</li>
                                        <li>Melakukan <i>monitoring</i> atau pun investigasi terhadap konten atau interaksi mencurigakan yang terindikasi mengandung unsur pelanggaran terhadap Syarat & Ketentuan atau ketentuan hukum yang berlaku, serta melakukan tindakan-tindakan yang diperlukan sebagai tindak lanjut dari hasil <i>monitoring</i> atau investigasi transaksi tersebut.</li>
                                    </ol>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Penggunaan Data Untuk Penanganan dan Pencegahan Covid-19
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        <b>Jakarta Satu</b> dapat menggunakan keseluruhan atau sebagian data yang diperoleh dan dikumpulkan dari Pengguna sebagaimana disebutkan dalam bagian sebelumnya, untuk kepentingan publik berkaitan dengan penanganan dan pencegahan Covid-19 sesuai dengan kebijakan Pemerintah untuk hal-hal sebagai berikut:
                                    </TxtIsi>
                                    <ol style={TxtOrderList}>
                                        <li>Menampilkan lokasi sesuai kategori zona risiko (tinggi, sedang, rendah, tidak ada kasus, tidak terdampak) yang kriterianya ditentukan oleh Pemerintah Republik Indonesia, meskipun saat aplikasi sedang tidak dijalankan.</li>
                                        <li>Penggunaan Data untuk kepentinga publik yang berkaitan dengan penganggulangan dan pencegahan Covid-19 hanya akan diproses dan disimpan selama masa pandemi sesuai dengan regulasi yang berlaku oleh Pemerintah Republik Indonesia.</li>
                                    </ol>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Pengungkapan Data Pribadi Pengguna
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        <b>Jakarta Satu</b> menjamin tidak ada penjualan, pengalihan, distribusi atau meminjamkan data pribadi Pengguna kepada Pihak Ketiga lain, tanpa terdapat izin dari Pengguna, kecuali dalam hal-hal sebagai berikut:
                                    </TxtIsi>
                                    <ol style={TxtOrderList}>
                                        <li>Dibutuhkan adanya pengungkapan data Pengguna kepada mitra atau Pihak Ketiga lain yang membantu <b>Jakarta Satu</b> dalam menyajikan layanan pada aplikasi dan memproses segala bentuk aktivitas Pengguna dalam aplikasi, termasuk memproses transaksi, verifikasi pembayaran, pengiriman produk, dan lain-lain.</li>
                                        <li><b>Jakarta Satu</b> dapat menyediakan informasi yang relevan kepada Pihak Ketiga sesuai dengan persetujuan Pengguna untuk menggunakan layanan Pihak Ketiga, termasuk di antaranya aplikasi atau situs lain yang telah saling mengintegrasikan API (<i>Application Programming Interface</i>) atau layanannya.</li>
                                        <li>Dibutuhkan adanya komunikasi antara Pihak Ketiga dengan Pengguna dalam hal penyelesaian kendala maupun hal-hal lainnya.</li>
                                        <li><b>Jakarta Satu</b> dapat menyediakan informasi yang relevan kepada vendor, konsultan, firma riset, atau penyedia layanan sejenis.</li>
                                        <li>Pengguna menghubungi <b>Jakarta Satu</b> melalui media publik seperti blog, media sosial, dan fitur tertentu pada aplikasi, komunikasi antara Pengguna dan <b>Jakarta Satu</b> mungkin dapat dilihat secara publik.</li>
                                        <li><b>Jakarta Satu</b> dapat membagikan informasi Pengguna kepada anak perusahaan dan afiliasinya untuk membantu memberikan layanan atau melakukan pengolahan data untuk dan atas nama <b>Jakarta Satu</b>.</li>
                                        <li><b>Jakarta Satu</b> mengungkapkan data Pengguna dalam upaya mematuhi kewajiban hukum dan/atau adanya permintaan yang sah dari aparat penegak hukum.</li>
                                    </ol>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        <i>Cookies</i>
                                    </TxtJudul>
                                    <ol style={TxtOrderList}>
                                        <li><i>Cookies</i> adalah <i>file</i> kecil yang secara otomatis akan mengambil tempat di dalam perangkat Pengguna yang menjalankan fungsi dalam menyimpan preferensi maupun konfigurasi Pengguna selama mengunjungi suatu situs.</li>
                                        <li><i>Cookies</i> tersebut tidak diperuntukkan untuk digunakan pada saat melakukan akses data lain yang Pengguna miliki di perangkat komputer Pengguna, selain dari yang telah Pengguna setujui untuk disampaikan.</li>
                                        <li>Walaupun secara otomatis perangkat komputer Pengguna akan menerima <i>cookies</i>, Pengguna dapat menentukan pilihan untuk melakukan modifikasi melalui pengaturan <i>browser</i> Pengguna yaitu dengan memilih untuk menolak <i>cookies</i> (pilihan ini dapat membatasi layanan optimal pada saat melakukan akses ke situs).</li>
                                        <li><b>Jakarta Satu</b> menggunakan fitur <i>Google Analytics Demographics and Interest</i>. Data yang kami peroleh dari fitur tersebut, seperti umur, jenis kelamin, minat Pengguna, dan lain-lain, akan kami gunakan untuk pengembangan situs dan konten <b>Jakarta Satu</b>. Jika tidak ingin data Pengguna terlacak oleh <i>Google Analytics</i>, Pengguna dapat menggunakan <i>Add-On Google Analytics Opt-Out Browser</i>.</li>
                                        <li><b>Jakarta Satu</b> dapat menggunakan fitur-fitur yang disediakan oleh Pihak Ketiga dalam rangka meningkatkan layanan dan konten <b>Jakarta Satu</b>, termasuk di antaranya ialah penyesuaian dan penyajian iklan kepada setiap Pengguna berdasarkan minat atau riwayat kunjungan. Jika Pengguna tidak ingin iklan ditampilkan berdasarkan penyesuaian tersebut, maka Pengguna dapat mengaturnya melalui <i>browser</i>.</li>
                                    </ol>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Pilihan Pengguna dan Transparansi
                                    </TxtJudul>
                                    <ol style={TxtOrderList}>
                                        <li>Perangkat seluler pada umumnya (android dan sebagainya) memiliki pengaturan sehingga aplikasi <b>Jakarta Satu</b> tidak dapat mengakses data tertentu tanpa persetujuan dari Pengguna. Perangkat Android akan memberikan pemberitahuan kepada Pengguna saat aplikasi <b>Jakarta Satu</b> pertama kali dimuat. Dengan menggunakan aplikasi dan memberikan akses terhadap aplikasi, Pengguna dianggap memberikan persetujuannya terhadap Kebijakan Privasi.</li>
                                        <li>Setelah konten dibuat, Pengguna memiliki kesempatan untuk memberikan penilaian dan ulasan terhadap akun satu sama lain. Informasi ini mungkin dapat dilihat secara publik dengan persetujuan Pengguna.</li>
                                        <li>Pengguna dapat mengakses dan mengubah informasi berupa alamat <i>email</i>, nomor telepon, tanggal lahir, jenis kelamin, daftar alamat, melalui fitur Pengaturan pada aplikasi.</li>
                                        <li>Pengguna dapat menarik diri dari informasi atau notifikasi berupa buletin, ulasan, diskusi konten, pesan pribadi, atau pesan pribadi dari Admin yang dikirimkan oleh <b>Jakarta Satu</b> melalui fitur Pengaturan pada aplikasi. <b>Jakarta Satu</b> tetap dapat mengirimkan pesan atau <i>email</i> berupa keterangan transaksi atau informasi terkait akun Pengguna.</li>
                                        <li>Sejauh diizinkan oleh ketentuan yang berlaku, Pengguna dapat menghubungi <b>Jakarta Satu</b> untuk melakukan penarikan persetujuan terhadap perolehan, pengumpulan, penyimpanan, pengelolaan, dan penggunaan data Pengguna. Apabila terjadi demikian maka Pengguna memahami konsekuensi bahwa Pengguna tidak dapat menggunakan layanan aplikasi <b>Jakarta Satu</b>.</li>
                                    </ol>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Penyimpanan dan Penghapusan Data Pribadi
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        <b>Jakarta Satu</b> akan menyimpan data Pengguna yang Pengguna berikan kepada <b>Jakarta Satu</b> atau yang <b>Jakarta Satu</b> kumpulkan dari Pengguna, termasuk data pribadi Pengguna, baik pada saat Pengguna melakukan pendaftaran di aplikasi, mengakses aplikasi, maupun mempergunakan layanan-layanan pada aplikasi di <i>server database</i> utama selama akun Pengguna aktif dan/atau selama penyimpanan yang diperlukan atau diperbolehkan oleh peraturan perundang-undangan yang berlaku.
                                    </TxtIsi>
                                    <TxtIsi variant='p'>
                                        <b>Jakarta Satu</b> akan berhenti menyimpan, menghapus dan/atau menganonim data Pengguna secepatnya apabila data Pengguna sudah tidak lagi diperlukan untuk memenuhi kebutuhan pengguna dalam menggunakan layanan-layanan aplikasi dan penyimpanan data tidak diperlukan lagi untuk kepentingan kepatuhan terhadap peraturan perundang-undangan yang berlaku.
                                    </TxtIsi>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Pembaruan Kebijakan Privasi
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        <b>Jakarta Satu</b> dapat sewaktu-waktu melakukan perubahan atau pembaruan terhadap Kebijakan Privasi ini. <b>Jakarta Satu</b> menyarankan agar Pengguna membaca secara seksama dan memeriksa halaman Kebijakan Privasi ini dari waktu ke waktu untuk mengetahui perubahan apa pun. Dengan tetap mengakses dan menggunakan layanan aplikasi <b>Jakarta Satu</b>, maka Pengguna dianggap menyetujui perubahan-perubahan dalam Kebijakan Privasi.
                                    </TxtIsi>
                                </Stack>
                            </Stack>
                        </section>
                    </div>

                    <Footer />
                </motion.div>
            </main>
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default keijakanPrivasi;