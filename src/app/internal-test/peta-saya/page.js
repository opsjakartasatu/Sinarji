"use client"

import { motion } from 'framer-motion';

import styles from "../../page.module.css";
import Footer from '@/components/footer/footer';
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

function petaSaya() {
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
                        <section style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
                                    Peta Saya
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
                        </section>
                    </div>

                    {/* <Footer /> */}
                </motion.div>
            </div>
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default petaSaya;