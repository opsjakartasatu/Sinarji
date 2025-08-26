"use client"

import { motion } from 'framer-motion';

import styles from "../../page.module.css";
import KritikSaran from '@/components/kritikSaran';
import ScrollTop from '@/components/scrollTop';

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import { Button, Card, CardContent, CardMedia, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from '@/components/CustomImage';
import Footer from '../sidebarDashboard/Footer';

function dashboard() {
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

    useEffect(() => {
        document.title = "Tentang | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
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
            <div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >  
                    <div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
                                    Dashboard
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
                        </div>
                        
                        <div style={{ paddingTop: "50px" }}>
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
                        </div>
                        
                        <div style={{ paddingTop: "50px" }}>
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
                        </div>
                    </div>

                    {/* <Footer /> */}
                </motion.div>
            </div>
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default dashboard;