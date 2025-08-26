"use client"

import { motion } from 'framer-motion';

import styles from "../../../../components/page.module.css";
import Navbar from '../../../../components/navbar/navbar';
import "../../../../components/navbar/style.css";
import Footer from '../../../../components/footer/footer';
import ScrollTop from '../../../../components/scrollTop';
import KritikSaran from '../../../../components/kritikSaran';
import Breadcrumbs from '../../../../components/breadcrumbs';

import {
    Box,
    Button,
    Divider,
    Stack,
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
import CustomImage from '@/components/CustomImage';

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

    const { slug } = useParams();

    const [halamanKatalogPeta, setHalamanKatalogPeta] = useState(true);

    const [katalogList, setKatalogList] = useState([]);

    useEffect(() => {
        const getKatalogList = async () => {
            const response = await axios.get(
                `${process.env.API_WEB}/katalog-peta/public2?slug=${slug}`
            );
            const newsLatest = response.data.data;
            // console.log(newsLatest);
            setKatalogList(newsLatest);
        };

        getKatalogList();
    }, [slug]);


    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Galeri Peta & Dashboard", href: "/layanan/galeri-peta-dan-dashboard" },
        { label: `${katalogList[0]?.namaPeta}` }
    ];

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
                        <section id="DetailPetaKatalogPeta" style={{ paddingTop: "60px", paddingBottom: isMobile ? "75px" : "90px", width: "95vw", maxWidth: "1230px" }}>
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
                                    {/* <iframe src={`${katalogList[0]?.link}`} width="100%" height="100%"
                                        style={{
                                            border: 'none',
                                            width: isMobile ? '95vw' : '820px',
                                            height: isMobile ? '50vh' : '500px',
                                        }}></iframe> */}
                                    <Link id="btnLinkDetailKatalogPeta" href={`${katalogList[0]?.link}`} target="_blank">
                                        <Button variant="contained" disableElevation disableRipple disableTouchRipple
                                            sx={{
                                                textTransform: "none",
                                                fontFamily: 'var(--font-family)',
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                marginTop: "20px",
                                                width: "100%",
                                                maxWidth: isMobile ? '90vw' : '820px',
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
                        <section id="MetadataDetailKatalogPeta" style={{ width: "95vw", maxWidth: "1230px" }}>
                            <Grid container
                                spacing={4}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start">
                                <Grid xs={12} sm={12} md={7.5} lg={7.5} xl={7.5} sx={{ textAlign: "left" }}>
                                    <Box sx={{ textAlign: "left", marginBottom: "70px" }}>
                                        {katalogList.length > 0 ? (
                                            <Stack direction="column" justifyContent="center" alignItems="flex-start" gap={2}>
                                                <Typography variant="p"
                                                    sx={{
                                                        color: 'var(--jakartasatu-biru)',
                                                        fontSize: "24px",
                                                        fontWeight: "600",
                                                        lineHeight: "150%",
                                                        letterSpacing: "-0.38px",
                                                    }}>
                                                    {katalogList[0]?.namaPeta}
                                                    {katalogList[0]?.simpuljaringan ? (
                                                        <>
                                                            <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                                                            <span style={{ color: 'var(--jakartasatu-orange)' }}>{katalogList[0]?.simpuljaringan}</span>
                                                        </>
                                                    ) : null}
                                                </Typography>
                                                <Typography variant="p" paragraph
                                                    sx={{
                                                        color: "rgba(0, 0, 0, 0.60)",
                                                        fontSize: "20px",
                                                        fontWeight: "500",
                                                        lineHeight: "150%",
                                                        letterSpacing: "-0.38px",
                                                    }}>
                                                    {katalogList[0]?.deskripsi}
                                                </Typography>
                                            </Stack>
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
                                    {/* <Typography variant="p"
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
                                        {katalogList[0]?.metadata && Array.isArray(katalogList[0]?.metadata) ? (
                                            katalogList[0]?.metadata.map((metadata, i) => (
                                                <li key={i}>
                                                    {metadata
                                                        .replace(/_/g, ' ')
                                                        .replace(/^./, (char) => char.toUpperCase())
                                                    }
                                                </li>
                                            ))
                                        ) : (
                                            <li>Tidak ada metadata yang tersedia</li>
                                        )}
                                    </ul> */}
                                </Grid>
                                <Grid xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} sx={{ textAlign: "left" }}>
                                    {/* <Link href={`https://jakartasatu.jakarta.go.id/web/internal/katalog_peta/${katalogList[0]?.id}?mapId=map3`} target='_blank'> */}
                                    {/* <Link href={`localhost:4200/peta_saya/${katalogList[0]?.id}?mapId=map3`} target='_blank'> */}
                                    <Box sx={{
                                        borderRadius: "10px",
                                        background: "#FFF",
                                        boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                        padding: { xs: "24px 37px", sm: "24px 37px", md: "24px 37px", lg: "48px 74px", xl: "48px 74px" },
                                    }}>
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
                                            {katalogList[0]?.komponenLayer && Array.isArray(katalogList[0]?.komponenLayer) ? (
                                                katalogList[0]?.komponenLayer.map((komponenLayer, i) => (
                                                    <li key={i}>{komponenLayer.name}</li>
                                                ))
                                            ) : (
                                                <li>Tidak ada komponen layer yang tersedia</li>
                                            )}
                                        </ul>
                                        {/* <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                                <Button variant='contained' disableElevation sx={{
                                                    width: "193px",
                                                    height: "56px",
                                                    borderRadius: "40px",
                                                    background: "#F7941D",
                                                    textTransform: "none",  
                                                    color: "white",
                                                    fontFamily: "inherit",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    // lineHeight: "150%",
                                                    // letterSpacing: "-0.342px",
                                                }}>
                                                    Akses Data
                                                </Button>
                                            </div> */}
                                    </Box>
                                    {/* </Link> */}
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