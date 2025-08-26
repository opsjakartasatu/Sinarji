"use client"

import { motion } from 'framer-motion';

import styles from "../../../components/page.module.css";

import Navbar from '../../../components/navbar/navbar';
import "../../../components/navbar/style.css";
import Footer from '../../../components/footer/footer';
import ScrollTop from '../../../components/scrollTop';
import KritikSaran from '../../../components/kritikSaran';
import Breadcrumbs from '../../../components/breadcrumbs';

import { useEffect, useState } from "react";
import { Box, Button, Card, Typography, useMediaQuery, useTheme, Stack, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";

function semuaRiset() {
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
        { label: "Riset", href: "/riset" },
        { label: "Semua Riset" }
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
                    <div className={styles.container} style={{ paddingTop: "20px" }}>
                        <section id="risetPencarianData"
                            style={{
                                width: "90vw",
                                maxWidth: "1248px",
                                paddingTop: "50px"
                            }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "110px" }}>
                                <Typography variant="p"
                                    style={{
                                        color: 'var(--jakartasatu-biru)',
                                        fontSize: "36px",
                                        fontWeight: "800",
                                    }}>
                                    Riset
                                </Typography>
                                <Divider
                                    style={{
                                        margin: '15px auto 0 auto',
                                        backgroundColor: 'var(--jakartasatu-biru)',
                                        height: 5,
                                        width: '75px',
                                        borderRadius: '4px',
                                    }}
                                />
                            </Box>
                            <Grid container
                                spacing={{ xs: 2, sm: 5 }}
                                direction="column"
                                justifyContent={isMobile ? "center" : "space-between"}
                                alignItems="baseline">
                                {risetList.map((event, i) => (
                                    <Grid key={i} xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Grid container
                                            columns={12}
                                            spacing={{ xs: 2, sm: 6 }}
                                            direction={i % 2 === 0 ? "row" : "row-reverse"}
                                            justifyContent="center"
                                            alignItems="flex-start">
                                            <Grid xs={12} sm={5} md={5} lg={5} xl={5}>
                                                <img
                                                    alt=""
                                                    src={event.imgSrc}
                                                    style={{
                                                        maxWidth: "475px",
                                                        width: "100%",
                                                        height: "auto",
                                                        transition: 'transform 0.3s ease',
                                                    }}
                                                />
                                            </Grid>
                                            <Grid xs={12} sm={7} md={7} lg={7} xl={7}>
                                                <Stack
                                                    direction="column"
                                                    justifyContent="space-between"
                                                    alignItems="flex-start"
                                                    spacing={4}>
                                                    <Typography variant="body1" gutterBottom
                                                        sx={{
                                                            color: 'var(--jakartasatu-biru)',
                                                            fontFamily: 'var(--font-family)',
                                                            fontSize: "26px",
                                                            fontWeight: "600",
                                                            lineHeight: "170%",
                                                        }}>
                                                        {event.namaData}
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom
                                                        sx={{
                                                            color: "rgba(0, 0, 0, 0.60)",
                                                            fontSize: "20px",
                                                            fontWeight: "500",
                                                            lineHeight: "170%",
                                                        }}>
                                                        Penerbit : {event.penerbit}
                                                    </Typography>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="flex-start"
                                                        spacing={2}>
                                                        <Button id="btnPaperDetailRiset" variant="contained"
                                                            startIcon={
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                    <path d="M3.3335 2.49935C3.3335 2.27834 3.42129 2.06637 3.57757 1.91009C3.73385 1.75381 3.94582 1.66602 4.16683 1.66602H12.5002L16.6668 5.83268V17.4993C16.6668 17.7204 16.579 17.9323 16.4228 18.0886C16.2665 18.2449 16.0545 18.3327 15.8335 18.3327H4.16683C3.94582 18.3327 3.73385 18.2449 3.57757 18.0886C3.42129 17.9323 3.3335 17.7204 3.3335 17.4993V2.49935Z" stroke="white" stroke-width="1.66667" stroke-linejoin="round" />
                                                                    <path d="M6.66699 8.33203H13.3337M6.66699 11.6654H13.3337" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            }
                                                            sx={{
                                                                fontFamily: 'var(--font-family)',
                                                                width: "126px",
                                                                height: "50px",
                                                                borderRadius: "30px",
                                                                background: 'var(--jakartasatu-biru)',
                                                                boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                                textTransform: "none",
                                                                color: "white",
                                                                fontSize: "18px",
                                                                fontWeight: "600",
                                                                padding: "12px 35px",
                                                            }}>
                                                            Paper
                                                        </Button>
                                                        <Button id="btnPetaDetailRiset" variant="contained"
                                                            startIcon={
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M8 2.99912V17.4991M15 6.49912V20.4991M5.253 4.19512L4.026 4.90712C3.037 5.48012 2.543 5.76712 2.272 6.24412C2 6.72112 2 7.30112 2 8.46312V16.6271C2 18.1531 2 18.9171 2.342 19.3411C2.57 19.6231 2.889 19.8131 3.242 19.8761C3.772 19.9711 4.422 19.5941 5.72 18.8411C6.602 18.3301 7.45 17.7981 8.505 17.9431C8.985 18.0081 9.442 18.2361 10.358 18.6911L14.171 20.5871C14.996 20.9971 15.004 20.9991 15.921 20.9991H18C19.886 20.9991 20.828 20.9991 21.414 20.4001C22 19.8021 22 18.8381 22 16.9101V10.1701C22 8.24312 22 7.28012 21.414 6.68012C20.828 6.08212 19.886 6.08212 18 6.08212H15.921C15.004 6.08212 14.996 6.08012 14.171 5.67012L10.84 4.01412C9.449 3.32212 8.753 2.97612 8.012 2.99912C7.271 3.02212 6.6 3.41412 5.253 4.19512Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            }
                                                            sx={{
                                                                fontFamily: 'var(--font-family)',
                                                                width: "126px",
                                                                height: "50px",
                                                                borderRadius: "30px",
                                                                background: 'var(--jakartasatu-orange)',
                                                                boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                                textTransform: "none",
                                                                color: "white",
                                                                fontSize: "18px",
                                                                fontWeight: "600",
                                                                padding: "12px 35px",
                                                            }}>
                                                            Peta
                                                        </Button>
                                                    </Stack>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ margin: "88px 0", borderBottomWidth: 2 }} />
                                    </Grid>
                                ))}
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

export default semuaRiset;