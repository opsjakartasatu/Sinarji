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

import { Button, Card, CardContent, CardMedia, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from '@/components/CustomImage';

function tentang() {
    const basePath = process.env.SERVER_PUBLIC_BASE_PATH ?? ''
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
    const isMobile900 = useMediaQuery(theme.breakpoints.down("md"));

    const breadcrumbs = [
        // { label: "Beranda", href: "/" },
        // { label: "Tentang" }
    ];

    const arrowStyles = {
        position: 'absolute',
        background: '#F7941D',
        borderRadius: "50px",
        color: 'white',
        border: 'none',
        zIndex: 2,
        top: 'calc(43% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer',
    };

    const indicatorStyles = {
        background: '#D9D9D9',
        borderRadius: 30,
        width: 15,
        height: 15,
        display: 'inline-block',
        margin: isMobile ? '9vw 8px' : '0 6px',
        cursor: 'pointer',
    };

    const prestasiList = [
        {
            imageSrc: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/c8da6e5126fe488b8ab608594634ddee/resources/8%20(1).jpg?v=1690523853370',
            title: 'Inovasi Pemanfaatan Geospasial Bhumandala Award (2021)',
            desc: "Pemerintah Provinsi DKI Jakarta melalui aplikasi Informasi Rencana Kota (IRK) meraih Inovasi Terbaik (Piala Emas) terbaik dalam inovasi pemanfaatan informasi geospasial pada ajang Bhumandala Award 2021. Aplikasi Informasi Rencana Kota (IRK) merupakan salah satu inovasi pemanfaatan informasi geospasial yang dikembangkan pada portal Jakarta Satu sebagai salah satu upaya peningkatan pelayanan publik berbasis geospasial yang memuat peta dan informasi rencana kota.",
            link: ''
        },
        {
            imageSrc: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/c8da6e5126fe488b8ab608594634ddee/resources/uc%20esri@4x-100%20(1)%20(1).jpg?v=1690523853375',
            title: "1st Place - 3D Map Category (2021)",
            desc: "Jakarta 3D Urban Regeneration - Kemayoran meraih posisi pertama dalam kategori Peta 3D dari Esri User Conference Map Gallery Tahun 2021 berdasarkan penilaian tim Esri UC. <br><br>Jakarta 3D Urban Regeneration - Kemayoran<br><br>Peta 3D Urban Kemayoran Jakarta menunjukkan Urban Design Guideline (UDGL) Kemayoran yang berlokasi di DKI Jakarta. Peta ini memvisualisasikan: Bangunan 3D Eksisting, Perencanaan Bangunan 3D, Peta Dasar 3D, Keteduhan Pohon, Walkability dan Populasi Penduduk.",
            link: ''
        },
        {
            imageSrc: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/c8da6e5126fe488b8ab608594634ddee/resources/anis_bumandala.jpg?v=1690523853381',
            title: "Bhumandala Kanaka Award (2020)",
            desc: "Merupakan penghargaan terhadap upaya membangun simpul jaringan informasi geospasial kepada Kementerian/ Lembaga dan Pemerintah Daerah yang dinilai terbaik dalam upayanya mempersiapkan diri dan membangun simpul jaringan. <br>Pemerintah Provinsi DKI Jakarta berhasil meraih 2 (dua) penghargaan yaitu Bhumandala Kanaka Simpul Terbaik dan Bhumandala Kencana Geoportal terbaik kategori Provinsi.",
            link: ''
        },
        {
            imageSrc: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/c8da6e5126fe488b8ab608594634ddee/resources/hub-image-card-crop-ig2tpxepe.png?v=1690523853386',
            title: "Geo Innovation Award (2019)",
            desc: "Merupakan penghargaan untuk mendukung industri 4.0 Geospasial atas inovasi dalam implementasi GIS (Geographic Information System) untuk mendukung kebijakan Satu Peta Indonesia, yang diselenggarakan oleh Esri Indonesia.",
            link: ''
        },
        {
            imageSrc: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/c8da6e5126fe488b8ab608594634ddee/resources/hub-image-card-crop-i2lguttta.png?v=1690523853389',
            title: "Bhumandala Kanaka Award (2018)",
            desc: "Merupakan penghargaan tingkat Provinsi se-Indonesia dari Badan Informasi Geospasial. Penghargaan dianugerahkan kepada DKI Jakarta karena telah berhasil membangun simpul jaringan dengan baik dan aktif, serta mengikuti sistem referensi geospasial nasional.",
            link: ''
        },
    ];

    const [halamanTentang, setHalamanTentang] = useState(true);

    useEffect(() => {
        document.title = "Tentang | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
        setHalamanTentang(true);
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
                    <Navbar halamanTentang={halamanTentang} />
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <div className={styles.container}>
                        <section style={{ width: "90vw", maxWidth: "1260px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={1}>
                                <CustomImage
                                    src='/assets/Logojak1.png'
                                    alt="Gambar"
                                    draggable={false}
                                    width={0}
                                    height={0}
                                    style={{
                                        userDrag: "none",
                                        userSelect: "none",

                                        width: "53px",
                                        height: "53px",
                                        // alignSelf: "end"
                                    }}
                                />
                                <Typography variant="p"
                                    style={{
                                        color: 'var(--jakartasatu-biru)',
                                        textAlign: "center",
                                        fontSize: "36px",
                                        fontWeight: "800",
                                    }}>
                                    Jakarta Satu
                                </Typography>
                            </Stack>
                            <Divider
                                style={{
                                    margin: '15px auto 10px auto',
                                    backgroundColor: 'var(--jakartasatu-biru)',
                                    height: 5,
                                    width: '75px',
                                    borderRadius: '4px',
                                }}
                            />
                            <Stack direction={{ xs: "column", sm: "column", md: "row" }} justifyContent="center" alignItems="center" spacing={1}>
                                <CustomImage
                                    src='/assets/ilustrasi-tentang.png'
                                    priority={true}
                                    alt="Gambar"
                                    draggable={false}
                                    width={0}
                                    height={0}
                                    style={{
                                        userDrag: "none",
                                        userSelect: "none",

                                        width: '100%',
                                        maxWidth: "417px",
                                        height: 'auto',
                                    }}
                                />
                                <Typography variant="p" paragraph
                                    style={{
                                        color: "rgba(0, 0, 0, 0.70)",
                                        textAlign: "justify",
                                        fontSize: isMobile ? "16px" : "18px",
                                        fontWeight: "400",
                                        lineHeight: "216%"
                                    }}>
                                    Jakarta Satu merupakan portal yang menyediakan informasi data spasial di wilayah DKI Jakarta berdasarkan hasil integrasi data dari kumpulan perangkat daerah atau unit kerja di lingkungan Provinsi DKI Jakarta. Hasil visualisasi data merupakan bentuk peta berbasis objek lokasi (spasial) menggunakan peta dasar tunggal Provinsi DKI Jakarta. Informasi yang tersedia pada portal Jakarta Satu dapat diakses secara publik sehingga diperbaharui secara berkala dan dapat dijadikan acuan dalam mengambil kebijakan.
                                </Typography>
                            </Stack>
                            {/* <Link id="btnUnduhFileIntegrasiSistem" href="https://drive.google.com/file/d/1AU04yFobQdspwEL7Ordx62cxxr173GLj/preview?pli=1" target="_blank">
                                <Button variant="contained" endIcon={<FileDownloadOutlinedIcon sx={{ marginLeft: "8px" }} />}
                                    sx={{
                                        height: "50px",
                                        borderRadius: "30px",
                                        background: 'var(--jakartasatu-biru)',
                                        boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                        textTransform: "none",
                                        color: "white",
                                        fontSize: isMobile ? "0.7rem" : "18px",
                                        fontWeight: "500",
                                        padding: "4px 20px",
                                    }}>
                                    Dokumen Petunjuk Pelaksanaan Integrasi Sistem
                                </Button>
                            </Link> */}
                        </section>
                        {/* <section style={{ width: "100vw", maxWidth: "1260px", margin: "50px 0" }}>
                            <div style={{ width: "90vw", margin: "0 auto" }}>
                                <Typography variant="p"
                                    style={{
                                        color: 'var(--jakartasatu-biru)',
                                        textAlign: "center",
                                        fontSize: "36px",
                                        fontWeight: "800",
                                    }}>
                                    Prestasi
                                </Typography>
                                <Divider
                                    style={{
                                        margin: '15px 0 50px 0',
                                        backgroundColor: 'var(--jakartasatu-biru)',
                                        height: 5,
                                        width: '75px',
                                        borderRadius: '4px',
                                    }}
                                />
                            </div>
                            <Carousel
                                autoPlay={true}
                                showIndicators={true}
                                interval={5000}
                                infiniteLoop
                                preventMovementUntilSwipeScrollTolerance={true}
                                swipeScrollTolerance={50}
                                stopOnHover={false}
                                showStatus={false}
                                showThumbs={false}
                                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                    hasPrev && (
                                        <KeyboardArrowLeftRoundedIcon
                                            type="button"
                                            onClick={onClickHandler}
                                            title={label}
                                            style={{ ...arrowStyles, left: "2%" }}
                                        />
                                    )
                                }
                                renderArrowNext={(onClickHandler, hasNext, label) =>
                                    hasNext && (
                                        <KeyboardArrowRightRoundedIcon
                                            type="button"
                                            onClick={onClickHandler}
                                            title={label}
                                            style={{ ...arrowStyles, right: "2%" }}
                                        />
                                    )
                                }
                                renderIndicator={(onClickHandler, isSelected, index, label) => {
                                    if (isSelected) {
                                        return (
                                            <li
                                                style={{ ...indicatorStyles, background: '#003577' }}
                                                aria-label={`Selected: ${label} ${index + 1}`}
                                                title={`Selected: ${label} ${index + 1}`}
                                            />
                                        );
                                    }
                                    return (
                                        <li
                                            style={indicatorStyles}
                                            onClick={onClickHandler}
                                            onKeyDown={onClickHandler}
                                            value={index}
                                            key={index}
                                            role="button"
                                            tabIndex={0}
                                            title={`${label} ${index + 1}`}
                                            aria-label={`${label} ${index + 1}`}
                                        />
                                    );
                                }}>
                                {[...Array(Math.ceil(prestasiList.length / (isMobile900 ? 1 : 3)))].map((_, slideIndex) => (
                                    <Grid key={slideIndex}
                                        container
                                        spacing={8}
                                        direction="row"
                                        justifyContent="center"
                                        sx={{
                                            padding: isMobile ? "0 12% 5% 12%" : "0 5%",
                                        }}>
                                        {prestasiList.slice(slideIndex * (isMobile900 ? 1 : 3), slideIndex * (isMobile900 ? 1 : 3) + (isMobile900 ? 1 : 3)).map((item, idx) => (
                                            <Grid key={idx} xs={12} sm={10} md={4} lg={4} xl={4} sx={{ height: "600px" }}>
                                                <Card elevation={0}
                                                    sx={{
                                                        height: "460px",
                                                        borderRadius: "20px",
                                                        padding: "10px",
                                                        boxShadow: isMobile ? "0px 10px 20px rgba(0, 0, 0, 0.10)" : "0px 15px 50px rgba(0, 0, 0, 0.10)",
                                                    }}>
                                                    <CardContent sx={{ textAlign: "left" }}>
                                                        <Typography variant="p"
                                                            sx={{
                                                                color: 'var(--jakartasatu-biru)',
                                                                fontSize: "18px",
                                                                fontWeight: "600",
                                                                lineHeight: "160%",
                                                            }}>{item.title}</Typography>
                                                    </CardContent>
                                                    <CardMedia sx={{ padding: "10px 0", }}>
                                                        {item.imageSrc && (
                                                            <>
                                                                <img
                                                                    style={{
                                                                        maxWidth: "265px",
                                                                        maxHeight: "122px",
                                                                        backgroundPosition: "center",
                                                                        objectFit: "cover",
                                                                        objectPosition: "right",
                                                                        aspectRatio: "1/1",
                                                                        boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                                    }}
                                                                    alt="" src={item.imageSrc} />
                                                            </>
                                                        )}
                                                    </CardMedia>
                                                    <CardContent sx={{ textAlign: "left" }}>
                                                        <Typography variant="p"
                                                            sx={{
                                                                color: "rgba(0, 0, 0, 0.80)",
                                                                textAlign: "left",
                                                                fontSize: "14px",
                                                                fontWeight: "400",
                                                                lineHeight: "180%",
                                                                letterSpacing: "-0.266px",
                                                            }}
                                                            dangerouslySetInnerHTML={{ __html: item.desc.slice(0, 200) + (item.desc.length > 200 ? "... " : "") }}>
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ))}
                            </Carousel>
                        </section> */}
                        <section style={{ width: "90vw", maxWidth: "1260px", paddingTop: "50px" }}>
                            <Typography variant="p"
                                style={{
                                    color: 'var(--jakartasatu-biru)',
                                    // textAlign: "center",
                                    fontSize: "36px",
                                    fontWeight: "800",
                                }}>
                                Landasan Hukum
                            </Typography>
                            <Divider
                                style={{
                                    margin: '15px 0 50px 0',
                                    backgroundColor: 'var(--jakartasatu-biru)',
                                    height: 5,
                                    width: '75px',
                                    borderRadius: '4px',
                                }}
                            />
                            <ul style={{
                                columns: isMobile900 ? "1" : "2",
                                columnGap: isMobile900 ? "" : "100px",
                                marginLeft: "20px",
                                color: "rgba(0, 0, 0, 0.70)",
                                fontSize: isMobile ? "16px" : "18px",
                                lineHeight: "190%"
                            }}>
                                <li>PERPU No. 2 Tahun 2022 Tentang Cipta Kerja</li>
                                <li>PP No. 45/2021 Tentang Penyelenggaraan Informasi Geospasial</li>
                                <li>Perpres No. 27/2014 Tentang Jaringan Informasi Geospasial Nasional (JIGN)</li>
                                <li>Peraturan Presiden No. 23 Tahun 2021 tentang Perubahaan atas Peraturan Presiden No. 9 Tahun 2016 tentang Percepatan Pelaksanaan Kebijakan Satu Peta pada Tingkat Ketelitian Peta Skala 1:50.000</li>
                                <li>Perpres No. 95/2018 Tentang Sistem Pemerintahan Berbasis Elektronik</li>
                                <li>Perpres No. 39/2019 Tentang Satu Data Indonesia (SDI)</li>
                                <li>Peraturan Gubernur DKI Jakarta Nomor 37 Tahun 2022 Tentang Satu Data Indonesia Tingkat Provinsi</li>
                                <li>Peraturan Gubernur DKI Jakarta Nomor 57 Tahun 2022 Tentang Organisasi dan Tata Kerja Perangkat Daerah</li>
                                <li>Instruksi Gubernur Provinsi DKI Jakarta Nomor 34 Tahun 2018 Tentang Sistem Peta dan Data Dalam Program Jakarta Satu</li>
                                <li>Instruksi Gubernur Provinsi DKI Jakarta Nomor 107 Tahun 2018 Tentang Pemanfaatan Peta Dasar Tunggal Provinsi DKI Jakarta</li>
                                <li>Keputusan Kepala Dinas Cipta Karya, Tata Ruang dan Pertanahan Provinsi DKI Jakarta Nomor 19 Tahun 2022 Tentang Petunjuk Pelaksanaan Pemukthiran dan Pengintegrasian Sistem Peta dan Data dalam Sistem Informasi Geospasial Jakarta Satu</li>
                            </ul>
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

export default tentang;