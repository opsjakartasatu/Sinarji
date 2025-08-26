"use client"

import { motion } from 'framer-motion';

import styles from "../../../components/page.module.css";
import Navbar from '../../../components/navbar/navbar';
import "../../../components/navbar/style.css";
import Footer from '../../../components/footer/footer';
import ScrollTop from '../../../components/scrollTop';
import KritikSaran from '../../../components/kritikSaran';
import Breadcrumbs from '../../../components/breadcrumbs';

import {
    Box,
    Button,
    Divider,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import EastRoundedIcon from '@mui/icons-material/EastRounded';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function detailPeta() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    useEffect(() => {
        document.title = "Detail Katalog Peta | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Katalog Peta", href: "/katalog-peta" },
        { label: "Detail Peta" }
    ];

    const { slug } = useParams();

    const [halamanKatalogPeta, setHalamanKatalogPeta] = useState(true);

    const [katalogList, setKatalogList] = useState([]);

    useEffect(() => {
        const getKatalogList = async () => {
            const response = await axios.get(
                process.env.API_DEV + `/v4/katalog-peta?slug=${slug}`
            );
            const newsLatest = response.data.data[0];
            console.log(newsLatest);
            setKatalogList(newsLatest);
        };

        getKatalogList();
    }, [slug]);

    return (
        <>
            <main className={styles.main}>
                <motion.div
                    className="navbar"
                    variants={navbarVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Navbar halamanKatalogPeta={halamanKatalogPeta} />
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <div className={styles.container}
                        style={{
                            paddingTop: "20px",
                            textAlign: "center",
                        }}>
                        <section id="DetailPetaKatalogPeta" style={{ paddingTop: "60px", paddingBottom: isMobile ? "75px" : "90px", width: isMobile ? "95vw" : "100%", maxWidth: "1230px" }}>
                            <Box>
                                <Typography variant="p"
                                    sx={{
                                        color: 'var(--jakartasatu-biru)',
                                        fontSize: "36px",
                                        fontWeight: "800",
                                    }}>
                                    Detail Peta
                                </Typography>
                                <Divider
                                    style={{
                                        margin: '15px auto 50px auto',
                                        // marginTop: "15px",
                                        // marginBottom: "50px",
                                        backgroundColor: 'var(--jakartasatu-biru)',
                                        height: 5,
                                        width: '75px',
                                        borderRadius: '4px',
                                    }}
                                />
                            </Box>
                            {katalogList ? (
                                <>
                                    {katalogList.imgSrc ? (
                                        <img
                                            src={katalogList.imgSrc}
                                            alt="Gambar"
                                            draggable="false"
                                            style={{
                                                userDrag: "none",
                                                userSelect: "none",
                                                width: isMobile ? '95vw' : '820px',
                                                height: "auto",
                                                left: "0",
                                                top: "0"
                                            }} />
                                    ) : (
                                        <img
                                            src='/assets/Gambar-detail-peta-katalog-peta.png'
                                            alt="Gambar"
                                            draggable="false"
                                            style={{
                                                userDrag: "none",
                                                userSelect: "none",
                                                width: isMobile ? '95vw' : '820px',
                                                height: "auto",
                                                left: "0",
                                                top: "0"
                                            }} />
                                    )}
                                    <Link id="btnLinkDetailKatalogPeta" href={`${katalogList.link}`} target="_blank">
                                        <Button variant="contained" disableElevation disableRipple disableTouchRipple
                                            sx={{
                                                textTransform: "none",
                                                fontFamily: 'var(--font-family)',
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                marginTop: "20px",
                                                width: isMobile ? '90vw' : '820px',
                                                height: "auto",
                                                background: 'var(--jakartasatu-biru)',
                                                borderRadius: "10px",
                                                boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)"
                                            }}>
                                            Lihat Peta/Dashboard <EastRoundedIcon />
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Typography variant="p"
                                    sx={{
                                        color: 'var(--jakartasatu-biru)',
                                        fontSize: "20px",
                                        fontWeight: "600",
                                        lineHeight: "150%",
                                        letterSpacing: "-0.38px",
                                    }}>
                                    Loading...
                                </Typography>
                            )}
                        </section>
                        <section id="MetadataDetailKatalogPeta" style={{ width: "100%", maxWidth: isMobile ? "95vw" : "1230px" }}>
                            <Box sx={{ textAlign: "left", marginBottom: "70px" }}>
                                {katalogList ? (
                                    <>
                                        <Typography variant="p"
                                            sx={{
                                                color: 'var(--jakartasatu-biru)',
                                                fontSize: "20px",
                                                fontWeight: "600",
                                                lineHeight: "150%",
                                                letterSpacing: "-0.38px",
                                            }}>
                                            {katalogList.namaData}
                                            {katalogList.simpuljaringan ? (
                                                <>
                                                    <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                                                    <span style={{ color: 'var(--jakartasatu-orange)' }}>{katalogList.simpuljaringan}</span>
                                                </>
                                            ) : null}
                                        </Typography>
                                        <Typography variant="p" paragraph
                                            sx={{
                                                color: "rgba(0, 0, 0, 0.60)",
                                                fontSize: "16px",
                                                fontWeight: "500",
                                                lineHeight: "292%",
                                                letterSpacing: "-0.38px",
                                            }}>
                                            {katalogList.deskripsi}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="p"
                                        sx={{
                                            color: 'var(--jakartasatu-biru)',
                                            fontSize: "20px",
                                            fontWeight: "600",
                                            lineHeight: "150%",
                                            letterSpacing: "-0.38px",
                                        }}>
                                        Loading...
                                    </Typography>
                                )}
                            </Box>
                            <Grid container
                                spacing={isMobile ? 4 : 0}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="baseline">
                                <Grid xs={12} sm={6} md={6} lg={6} xl={7.5} sx={{ textAlign: "left" }}>
                                    <Typography variant="p"
                                        sx={{
                                            color: 'var(--jakartasatu-biru)',
                                            fontSize: "24px",
                                            fontWeight: "600",
                                            lineHeight: "150%",
                                            letterSpacing: "-0.456px",
                                        }}>
                                        Metadata
                                    </Typography>
                                    <ul style={{
                                        color: "rgba(0, 0, 0, 0.60)",
                                        fontSize: "20px",
                                        fontWeight: "500",
                                        lineHeight: "190%",
                                        letterSpacing: "-0.38px",

                                        marginLeft: "25px"
                                    }}>
                                        {katalogList.metadata && Array.isArray(katalogList.metadata) ? (
                                            katalogList.metadata.map((metadata, i) => (
                                                <li key={i}>{metadata}</li>
                                            ))
                                        ) : (
                                            <li>Tidak ada metadata yang tersedia</li>
                                        )}
                                    </ul>
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={6} xl={4.5} sx={{ textAlign: "left" }}>
                                    <Typography variant="p"
                                        sx={{
                                            color: 'var(--jakartasatu-biru)',
                                            fontSize: "24px",
                                            fontWeight: "600",
                                            lineHeight: "150%",
                                            letterSpacing: "-0.456px",
                                        }}>
                                        Komponen Layer
                                    </Typography>
                                    <ul style={{
                                        color: "rgba(0, 0, 0, 0.60)",
                                        fontSize: "20px",
                                        fontWeight: "500",
                                        lineHeight: "190%",
                                        letterSpacing: "-0.38px",

                                        marginLeft: "25px"
                                    }}>
                                        {katalogList.komponenlayer && Array.isArray(katalogList.komponenlayer) ? (
                                            katalogList.komponenlayer.map((komponenlayer, i) => (
                                                <li key={i}>{komponenlayer.name}</li>
                                            ))
                                        ) : (
                                            <li>Tidak ada komponen layer yang tersedia</li>
                                        )}
                                    </ul>
                                </Grid>
                            </Grid>
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

export default detailPeta;