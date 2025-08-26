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

function syaratKetentuan() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
    const isMobile900 = useMediaQuery(theme.breakpoints.down("md"));

    const breadcrumbs = [
        // { label: "Beranda", href: "/" },
        // { label: "Tentang" }
    ];

    useEffect(() => {
        document.title = "Syarat Ketentuan | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
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
                                Syarat & Ketentuan
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
                                    <TxtSelamatDatang variant='p'>
                                        Selamat Datang di Jakarta Satu
                                    </TxtSelamatDatang>
                                    <TxtIsi variant='p'>
                                        Syarat & ketentuan yang ditetapkan di bawah ini mengatur Pengguna layanan yang yang disediakan oleh <b>Jakarta Satu</b>, baik berupa informasi, teks, grafik, atau data lain, unduhan, unggahan, atau menggunakan layanan (secara garis besar disebut sebagai data atau konten). Pengguna disarankan membaca dengan seksama karena dapat berdampak kepada hak dan kewajiban Pengguna di bawah hukum.
                                    </TxtIsi>
                                    <TxtIsi variant='p'>
                                        Dengan mendaftar dan/atau menggunakan aplikasi <b>Jakarta Satu</b>, maka Pengguna dianggap telah membaca, mengerti, memahami, dan menyetujui semua isi dalam Syarat & Ketentuan. Syarat & Ketentuan ini merupakan bentuk kesepakatan yang dituangkan dalam sebuah perjanjian yang sah antara Pengguna dengan aplikasi <b>Jakarta Satu</b>. Jika Pengguna tidak menyetujui salah satu, sebagian, atau seluruh isi Syarat & Ketentuan, maka Pengguna tidak diperkenankan menggunakan layanan di aplikasi <b>Jakarta Satu</b>.
                                    </TxtIsi>
                                    <TxtIsi variant='p'>
                                        Perjanjian ini berlaku sejak tanggal 27 September 2022.
                                    </TxtIsi>
                                    <TxtIsi variant='p'>
                                        Kami berhak untuk mengubah Syarat & Ketentuan ini dari waktu ke waktu tanpa pemberitahuan. Pengguna mengakui dan menyetujui bahwa merupakan tanggung jawab Pengguna untuk meninjau Syarat & Ketentuan ini secara berkala untuk mengetahui perubahan apa pun. Dengan tetap mengakses dan menggunakan layanan <b>Jakarta Satu</b>, maka Pengguna dianggap menyetujui perubahan-perubahan dalam Syarat & Ketentuan.
                                    </TxtIsi>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Larangan
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        Pengguna dapat menggunakan layanan <b>Jakarta Satu</b> hanya untuk tujuan yang sah. Pengguna tidak dapat menggunakan layanan <b>Jakarta Satu</b> dengan cara apa pun yang:
                                    </TxtIsi>
                                    <ol style={TxtOrderList}>
                                        <li>melanggar peraturan perundang-undangan yang berlaku di Negara Kesatuan Republik Indonesia;</li>
                                        <li>dengan cara apa pun, melanggar hukum atau melakukan penipuan, atau memiliki tujuan atau efek yang melanggar hukum atau menipu;</li>
                                        <li>merugikan atau berupaya untuk menyakiti individu atau entitas lain dengan cara apa pun;</li>
                                        <li>memperbanyak, menggandakan, menyalin, menjual, menjual kembali, atau mengeksploitasi bagian manapun dari layanan, penggunaan layanann, atau akses ke layanan tanpa izin tertulis dari <b>Jakarta Satu</b>;</li>
                                        <li>atau akan menyalahgunakan baik secara verbal, fisik, tertulis, atau penyalahgunaan lainnya (termasuk ancaman kekerasan atau retribusi) dari setiap pengguna, karyawan, anggota, atau petugas <b>Jakarta Satu</b>;</li>
                                    </ol>
                                    <TxtIsi variant='p'>
                                        dan hal-hal yang telah disebutkan di atas akan berakibat pada pemutusan akun secepatnya dan akan diproses ke ranah hukum.
                                    </TxtIsi>
                                    <TxtIsi variant='p'>
                                        Pengguna wajib menggunakan layanan <b>Jakarta Satu</b> dengan bijak dan baik yaitu dengan menghindari kata-kata seperti:
                                    </TxtIsi>
                                    <ol style={TxtOrderList}>
                                        <li>hinaan dan/atau kata kasar;</li>
                                        <li>mengandung SARA;</li>
                                        <li>bersifat pornografi; dan</li>
                                        <li>mengundang provokasi</li>
                                    </ol>
                                    <TxtIsi variant='p'>
                                        dan hal-hal yang telah disebutkan di atas akan berakibat pada penghapusan konten yang dipublikasikan di <b>Jakarta Satu</b>.
                                    </TxtIsi>
                                    <TxtIsi variant='p'>
                                        Pengguna menyatakan dan menjamin bahwa tidak akan menggunakan layanan untuk mengunggah, memasang <i>(posting)</i>, memberikan tautan, <i>email</i>, mengirimkan <i>(transmit)</i>, atau menyediakan bahan apa pun yang mengandung virus atau kode komputer lainnya, <i>file</i>, atau program yang dirancang untuk mengganggu, merusak, atau membatasi fungsi perangkat lunak komputer atau perangkat keras atau peralatan telekomunikasi lainnya. Pengguna juga tidak akan mengunggah atau mendistribusikan program komputer yang merusak, mengganggu, memotong, atau mengambil alih sistem, data, atau informasi pribadi. Pengguna juga menyatakan dan menjamin bahwa Pengguna tidak akan mengganggu fungsi situs dengan cara apa pun.
                                    </TxtIsi>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Privasi
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        Privasi Pengguna adalah hal yang sangat penting bagi kami. Pengguna layanan tunduk pada kebijakan privasi <b>Jakarta Satu</b>, yang menjelaskan bagaimana <b>Jakarta Satu</b> mengumpulkan dan menggunakan informasi pribadi Pengguna.
                                    </TxtIsi>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Retensi Data
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        <b>Jakarta Satu</b> akan menyimpan data Pengguna (data atau informasi yang Pengguna berikan kepada <b>Jakarta Satu</b> atau yang <b>Jakarta Satu</b> kumpulkan dari Pengguna, termasuk data pribadi Pengguna, baik pada saat Pengguna melakukan pendaftaran di aplikasi, mengakses aplikasi, maupun mempergunakan layanan-layanan pada aplikasi (selanjutnya disebut sebagai data)) di <i>server database</i> utama selama akun Pengguna saat ini dan aktif. <b>Jakarta Satu</b> tidak bertanggung jawab atas kerugian atau kerusakan dari <i>draft</i> data yang Pengguna simpan di perangkat komputasi Pengguna dan data yang disimpan di <i>server database</i> utama kami yang terjadi sebagai akibat dari penggunaan layanan kami yang tidak semestinya. Dan kami tidak akan mengakomodasi permintaan untuk memulihkan data dari sistem cadangan kami kecuali ada kehilangan data karena kegagalan sistem atau perangkat keras di pihak kami. Tidak ada pengecualian.
                                    </TxtIsi>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Penghentian Layanan
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        Pengguna setuju bahwa kami dapat, atas kebijakan kami sendiri, menangguhkan atau menghentikan akses Pengguna ke semua atau sebagian dari layanan dan sumber daya kami dengan atau tanpa pemberitahuan dan karena alasan apa pun, termasuk, tanpa batasan, pelanggaran Syarat & Ketentuan ini. Setiap aktivitas yang dicurigai ilegal, curang (penipuan), atau tidak wajar dapat menjadi alasan untuk mengakhiri hubungan Pengguna dan dapat dirujuk ke otoritas penegak hukum yang sesuai. Setelah penangguhan atau penghentian, hak Pengguna untuk menggunakan sumber daya yang kami sediakan akan segera berhenti, dan kami berhak untuk menghapus informasi apa pun yang Pengguna miliki di <i>file</i> kami, termasuk akun atau informasi saat <i>login</i>.
                                    </TxtIsi>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Kepemilikan Data
                                    </TxtJudul>
                                    <ul style={TxtOrderList}>
                                        <li>Pengguna sebagai pengguna layanan <b>Jakarta Satu</b> memiliki tanggung jawab untuk memastikan bahwa Pengguna memiliki hak atau izin yang diperlukan untuk konten Pengguna.</li>
                                        <li>Pengguna mempertahankan kepemilikan konten Pengguna. Kami tidak mengklaim hak kekayaan intelektual atas materi yang Pengguna berikan kepada layanan. Profil Pengguna, data, dan materi lain yang diunggah akan tetap menjadi milik Pengguna.</li>
                                        <li><b>Jakarta Satu</b> tidak menyaring atau memantau konten, tetapi <b>Jakarta Satu</b> dan yang ditunjuk memiliki hak (tetapi bukan kewajiban) atas kebijakannya sendiri untuk menolak atau menghapus konten apa pun yang tersedia melalui layanan.</li>
                                    </ul>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Modifikasi Layanan
                                    </TxtJudul>
                                    <ul style={TxtOrderList}>
                                        <li><b>Jakarta Satu</b> berhak setiap saat dan dari waktu ke waktu untuk memodifikasi atau menghentikan, sementara atau secara permanen, layanan (atau bagiannya) dengan atau tanpa pemberitahuan.</li>
                                        <li><b>Jakarta Satu</b> tidak akan bertanggung jawab kepada Pengguna atau kepada pihak ketiga untuk modifikasi apa pun, penangguhan, atau penghentian layanan.</li>
                                    </ul>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Penolakan Jaminan
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        Layanan <b>Jakarta Satu</b> dan semua elemennya disediakan atas dasar sebagaimana adanya tanpa jaminan apa pun, tersurat maupun tersirat. <b>Jakarta Satu</b> tidak membuat jaminan atau pernyataan mengenai keakuratan konten yang ada di layanan. <b>Jakarta Satu</b> tidak menjamin bahwa layanan akan beroperasi atau bekerja tanpa terganggu atau bebas dari kesalahan, atau bahwa <i>server</i> basis data utama atau <i>server host</i> akan bebas dari virus atau kode berbahaya atau kesalahan tak terduga lainnya. <b>Jakarta Satu</b> tidak membuat jaminan bahwa informasi yang disajikan pada layanan merupakan informasi terkini atau akurat.
                                    </TxtIsi>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Batasan Tanggung Jawab
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        Pengguna memahami dan menyetujui bahwa <b>Jakarta Satu</b> tidak akan bertanggung jawab atas kerusakan langsung, tidak langsung, insidental, khusus, konsekuensial termasuk tetapi tidak terbatas, pada kerusakan untuk kehilangan keuntungan, penggunaan, data, atau kerugian tidak berwujud lainnya (bahkan jika <b>Jakarta Satu</b> telah diberitahu tentang kemungkinan kerusakan tersebut), yang dihasilkan dari:
                                    </TxtIsi>
                                    <ol style={TxtOrderList}>
                                        <li>penggunaan atau ketidakmampuan untuk menggunakan layanan oleh Pengguna;</li>
                                        <li>akses tidak sah atau perubahan transmisi atau data Pengguna;</li>
                                        <li>kegagalan atau kesalahan layanan milik pihak ketiga;</li>
                                        <li>pernyataan atau perilaku pihak ketiga di layanan <b>Jakarta Satu</b>; dan</li>
                                        <li>atau hal lain yang berkaitan dengan layanan pihak ketiga.</li>
                                    </ol>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Pengakuan dan Persetujuan
                                    </TxtJudul>
                                    <ol style={TxtOrderList}>
                                        <li>Pengguna menyatakan informasi pribadi yang diserahkan kepada <b>Jakarta Satu</b> pada saat pendaftaran akun atau pembaharuan merupakan data yang akurat dan mutakhir;</li>
                                        <li>Dalam hal Pengguna berusia di bawah 18 tahun dan belum menikah, Pengguna menyatakan dan menjamin bahwa Pengguna telah memperoleh izin dari orang tua atau wali hukum. Dengan memberikan persetujuan, orang tua atau wali hukum Pengguna setuju untuk ikut tunduk pada Syarat & Ketentuan ini;</li>
                                        <li>Dalam hal Pengguna memberikan informasi pribadi yang berkaitan dengan individu lain (misalnya informasi pribadi anggota keluarga, pasangan, atau pihak lain) saat mengakses dan menggunakan <b>Jakarta Satu</b>, maka Pengguna menyatakan dan menjamin bahwa Pengguna telah memperoleh persetujuan dari individu tersebut dan dengan ini menyetujui atas nama individu tersebut untuk, pengumpulan, penggunaan, pengungkapan dan pengolahan informasi pribadi mereka oleh <b>Jakarta Satu</b>.</li>
                                    </ol>
                                </Stack>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
                                    <TxtJudul variant='p'>
                                        Kontak Informasi
                                    </TxtJudul>
                                    <TxtIsi variant='p'>
                                        Jika Pengguna memiliki pertanyaan, komentar atau masalah tentang Syarat & Ketentuan ini, silakan berkirim <i>email</i> ke <b><i>jakartasatu@jakarta.go.id</i></b>.
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

export default syaratKetentuan;