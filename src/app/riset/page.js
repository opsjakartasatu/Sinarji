"use client"

import { motion } from 'framer-motion';

import styles from "../../components/page.module.css";

import Navbar from '../../components/navbar/navbar';
import "../../components/navbar/style.css";
import Footer from '../../components/footer/footer';
import ScrollTop from '../../components/scrollTop';
import KritikSaran from '../../components/kritikSaran';
import Breadcrumbs from '../../components/breadcrumbs';

import PropTypes from 'prop-types';

import { useEffect, useState } from "react";
import { Box, Button, Card, Tab, Tabs, Typography, useMediaQuery, useTheme, Select, MenuItem, CircularProgress, OutlinedInput, IconButton, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import axios from "axios";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

function riset() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Riset" }
    ];

    const [risetList, setRisetList] = useState([]);

    useEffect(() => {
        const getRisetList = async () => {
            const response = await axios.get(
                "/api/riset"
            );

            const newsLatest = response.data;
            setRisetList(newsLatest);
        };

        getRisetList();
    }, []);

    const [showAll, setShowAll] = useState(false);
    const itemsToShow = showAll ? risetList : risetList.slice(0, 6);

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
                    <div className={styles.container} style={{ width: "100%" }}>
                        <section id="welcomeEvent" style={{ margin: isMobile ? "50px 0" : "100px 0", width: "90vw", maxWidth: "1260px" }}>
                            <img
                                src='assets/Partikel-1.png'
                                alt="Gambar"
                                draggable="false"
                                style={{
                                    userDrag: "none",
                                    userSelect: "none",

                                    width: isMobile ? '70vw' : '539px',
                                    height: isMobile ? '80vw' : '695px',
                                    opacity: "70%",
                                    position: "absolute",
                                    zIndex: "-99",
                                    left: "0",
                                    top: "0"
                                }} />
                            <Grid container
                                direction={isMobile ? "column" : "row"}
                                justifyContent="center"
                                alignItems="center">
                                <Grid xs={12} sm={12} md={12} lg={6} xl={5.5}>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <img src='assets/riset-welcome.png'
                                            alt="Gambar"
                                            draggable="false"
                                            style={{
                                                maxWidth: isMobile ? '350px' : '479px',
                                                height: 'auto',
                                                // marginTop: isMobile ? "0" : "-100px",

                                                userDrag: "none",
                                                userSelect: "none"
                                            }} />
                                    </div>
                                </Grid>
                                <Grid xs={12} sm={12} md={12} lg={6} xl={6.5}>
                                    <p
                                        style={{
                                            fontSize: "38px",
                                            padding: "0 0 50px 0",
                                            color: 'var(--jakartasatu-biru)',
                                            fontWeight: "600",
                                            letterSpacing: "0.057px",
                                        }}>
                                        ⁠Eksplorasi Hasil Riset Jakarta Satu
                                    </p>
                                    <Typography variant="p" paragraph
                                        sx={{
                                            color: "rgba(0, 0, 0, 0.70)",
                                            fontSize: "18px",
                                            fontWeight: "500",
                                            lineHeight: "190%",
                                            letterSpacing: "0.027px",
                                            maxWidth: isMobile ? "100%" : "90%",
                                        }}>
                                        Dapatkan informasi hasil riset secara detail yang dirancang untuk memberikan wawasan serta solusi terkait isu perkotaan yang ada di kota Jakarta
                                    </Typography>
                                </Grid>
                            </Grid>
                        </section>
                        <section id="risetPencarianData"
                            style={{
                                width: "90vw",
                                maxWidth: "1139px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                // alignItems: "center"
                            }}>
                            <Box sx={{ textAlign: "center", marginBottom: { xs: "40px", sm: "73px" } }}>
                                <OutlinedInput
                                    type="search"
                                    placeholder="silahkan cari..."
                                    endAdornment={
                                        <IconButton
                                            disableRipple
                                            aria-label="search"
                                            edge="end"
                                            sx={{
                                                ml: 1,
                                                mr: -2,
                                                background: 'var(--jakartasatu-biru)',
                                                border: "0",
                                                borderRadius: "0",
                                                borderTopRightRadius: "30px",
                                                borderBottomRightRadius: "30px",

                                                // paddingTop: "12px",
                                                paddingBottom: "5px",
                                                paddingRight: "15px",
                                                paddingLeft: "15px",
                                            }}
                                        >
                                            <SearchRoundedIcon sx={{ color: "white", fontSize: "34px" }} />
                                        </IconButton>
                                    }
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        width: isMobileMD ? '90vw' : '730px',
                                        margin: "0 auto",
                                        height: '49px',
                                        paddingLeft: '1%',
                                        borderRadius: '40px',
                                        background: 'white',
                                        border: "1px solid rgba(0, 69, 129, 0.30)",
                                        boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
                                    }}
                                />
                                <Typography variant="p" paragraph
                                    sx={{
                                        color: 'var(--jakartasatu-biru)',
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        margin: "18px 0 20px 0",
                                        maxWidth: "695px",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}>
                                    contoh : Bangunan, RTH, Jalan, dll
                                </Typography>
                            </Box>
                            <Grid container
                                spacing={{ xs: 2, sm: 5 }}
                                direction="row"
                                justifyContent={isMobile ? "center" : "space-between"}
                                alignItems="baseline">
                                {itemsToShow.map((event, i) => (
                                    <Grid key={i} xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <Card
                                            elevation={0}
                                            sx={{
                                                background: "white",
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                borderRadius: "10px",
                                                boxShadow: "2px 2px 20px 0px rgba(0, 0, 0, 0.15)"
                                            }}
                                        >
                                            <Grid container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="flex-start"
                                                sx={{ margin: { xs: "20px", sm: "32px 41px" }, height: "100%" }}>
                                                <Grid xs={3} sm={3} md={3} lg={3} xl={3}>
                                                    <img
                                                        alt=""
                                                        src="/assets/riset-icon-grid.png"
                                                        style={{
                                                            maxWidth: "100%",
                                                            height: "92px",
                                                            transition: 'transform 0.3s ease',
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid xs={9} sm={9} md={9} lg={9} xl={9}>
                                                    <Stack
                                                        direction="column"
                                                        justifyContent="space-between"
                                                        alignItems="flex-start"
                                                        spacing={1.5}>
                                                        <Typography variant="body1" gutterBottom
                                                            sx={{
                                                                color: 'var(--jakartasatu-biru)',
                                                                fontSize: "20px",
                                                                fontWeight: "500",
                                                                lineHeight: "155.523%",
                                                            }}>
                                                            {event.namaData}
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom
                                                            sx={{
                                                                color: "rgba(0, 0, 0, 0.70)",
                                                                fontSize: "14px",
                                                                fontWeight: "500",
                                                                lineHeight: "155.523%",
                                                            }}>
                                                            Penerbit : {event.penerbit}
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom
                                                            sx={{
                                                                color: "rgba(0, 0, 0, 0.70)",
                                                                fontSize: "14px",
                                                                fontWeight: "500",
                                                                lineHeight: "155.523%",
                                                            }}>
                                                            Terbit : {event.tanggalTerbit}
                                                        </Typography>
                                                        <Button id="btnLihatDataRiset" variant="contained"
                                                            sx={{
                                                                alignSelf: "self-end",
                                                                fontFamily: 'var(--font-family)',
                                                                width: "119px",
                                                                height: "43px",
                                                                borderRadius: "30px",
                                                                background: 'var(--jakartasatu-orange)',
                                                                boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                                textTransform: "none",
                                                                color: "white",
                                                                fontSize: "18px",
                                                                padding: "4px 35px",
                                                            }}>
                                                            Lihat
                                                        </Button>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            {risetList.length > 6 && (
                                <Link href="/riset/semua-riset" style={{ alignSelf: "center", }}>
                                    <Button variant="contained"
                                        sx={{
                                            width: "min(100%, 150px)",
                                            mt: 4,
                                            borderRadius: "40px",
                                            background: 'var(--jakartasatu-biru)',
                                            boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                            textTransform: "none",
                                            color: "white",
                                            fontFamily: 'var(--font-family)',
                                            fontSize: "16px",
                                            fontWeight: "400",
                                        }}
                                    >
                                        Lihat Semua
                                    </Button>
                                </Link>
                            )}
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

export default riset;