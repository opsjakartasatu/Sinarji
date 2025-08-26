"use client"

import PetaHome from '../../app/peta/interaktif/page2';
import styles from '../page.module.css';

import { motion, useAnimation, useCycle } from 'framer-motion';

import Navbar from '../navbar/navbar';
import "../navbar/style.css";

import { forwardRef, useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogContent, Divider, Fab, Grow, IconButton, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';

function HomeRedesignOpsiEmpat() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));

    const [simpulJaringanList, setSimpulJaringanList] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const getSimpulJaringanList = async () => {
            const response = await axios.get('https://jakartasatu.jakarta.go.id/apimobile/app/web/simpul-jaringan');
            const allList = response.data.data;
            // Gandakan data untuk memastikan carousel tidak berhenti
            setSimpulJaringanList([...allList, ...allList]);
        };

        getSimpulJaringanList();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };

    const carouselVariants = {
        animate: {
            x: ['0%', '-50%'],
            transition: {
                duration: isHovered ? 0 : 40,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop'
            }
        }
    };

    return (
        <>
            <div className="navbar">
                <Navbar />
            </div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: isMobileMD ? "flex-start" : "center",
                    alignItems: "center",
                    width: isMobileMD ? "" : "100vw",
                    height: isMobileMD ? "" : "100vh",
                    maxWidth: "1440px",
                    margin: isMobileMD ? "150px 0" : "0"
                }}
            >
                <section id="grid" style={{ width: "90vw", maxWidth: "1220px" }}>
                    <Grid container
                        spacing={4}
                        direction="row"
                        justifyContent="space-between">
                        <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
                            <Stack
                                spacing={4}
                                direction="column">
                                <Box sx={{
                                    padding: isMobileMD ? "23px" : "53px 59px",
                                    width: "auto",
                                    height: isMobileMD ? "700px" : "558px",
                                    borderRadius: "45px",
                                    backgroundColor: 'var(--jakartasatu-biru)',
                                    boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)"
                                }}>
                                    <Stack
                                        direction="column"
                                        justifyContent="space-between"
                                        alignItems="flex-end"
                                        sx={{ height: "100%" }}>
                                        <Box>
                                            <Typography variant="p" paragraph sx={{
                                                color: "#FFF",
                                                fontSize: "40px",
                                                fontWeight: "700",
                                                lineHeight: "150%",
                                                letterSpacing: "-0.76px",
                                            }}>
                                                Temukan Data Spasial Jakarta
                                            </Typography>
                                            <div style={{ margin: "30px 0" }}>
                                                <Typography variant="p" sx={{
                                                    width: "100%",
                                                    maxWidth: "512px",
                                                    textAlign: "justify",
                                                    color: "#FFF",
                                                    fontSize: "20px",
                                                    fontWeight: "400",
                                                    lineHeight: "180%",
                                                }}>
                                                    Temukan data spasial Jakarta untuk kebutuhan penelitian dan pengambilan kebijakan.
                                                </Typography>
                                            </div>
                                            <OutlinedInput
                                                type="search"
                                                placeholder="Pencarian data"
                                                endAdornment={
                                                    <IconButton
                                                        disableRipple
                                                        aria-label="search"
                                                        edge="end"
                                                    >
                                                        <SearchRoundedIcon sx={{ color: "#00357799", fontSize: "34px" }} />
                                                    </IconButton>
                                                }
                                                sx={{
                                                    width: '100%',
                                                    height: '63px',
                                                    paddingLeft: '1%',
                                                    borderRadius: '40px',
                                                    background: 'white',
                                                    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
                                                }}
                                            />
                                        </Box>
                                        <Link id="btnHomeToLayanan" href="#" target="_blank">
                                            <Button variant="contained"
                                                sx={{
                                                    height: "50px",
                                                    borderRadius: "30px",
                                                    background: 'var(--jakartasatu-orange)',
                                                    textTransform: "none",
                                                    color: "white",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    lineHeight: "150%",
                                                    letterSpacing: "-0.342px",
                                                    padding: "4px 20px",
                                                }}>
                                                Lihat Katalog Data
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Box>
                                <Box sx={{ width: "100%" }}>
                                    <Stack
                                        spacing={4}
                                        direction={{ xs: "column", sm: "row" }}
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <img
                                            src="/assets/logo-jakartasatu-orange.png"
                                            alt="Gambar"
                                            draggable="false"
                                            style={{
                                                userDrag: "none",
                                                userSelect: "none",

                                                width: '297px',
                                                height: 'auto',
                                            }}
                                        />
                                        <Typography variant="p" sx={{
                                            color: "rgba(0, 0, 0, 0.70)",
                                            textAlign: "justify",
                                            fontSize: "18px",
                                            fontWeight: "500",
                                            lineHeight: "180%",
                                        }}>
                                            Website berbasis Geoportal yang menyediakan berbagai informasi dan data spasial hasil integrasi dari berbagai SKPD yang ada di Kota Jakarta.
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Stack
                                spacing={4}
                                direction="column"
                                justifyContent="center"
                                alignItems="center">
                                <Box sx={{
                                    width: "100%",
                                    height: "394px",
                                    borderRadius: "45px",
                                    backgroundColor: 'var(--jakartasatu-orange)',
                                    overflow: 'hidden',
                                    boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)"
                                }}>
                                    <Stack
                                        direction="column"
                                        justifyContent="space-evenly"
                                        alignItems="center"
                                        sx={{ height: "100%" }}>
                                        <div>
                                            <Typography variant="p" paragraph sx={{
                                                textAlign: "center",
                                                marginBottom: "40px",
                                                color: "#FFF",
                                                fontSize: "26px",
                                                fontWeight: "700",
                                                lineHeight: "150%",
                                                letterSpacing: "-0.494px",
                                            }}>
                                                Simpul Jaringan
                                            </Typography>
                                            <motion.div
                                                style={{ marginTop: "22px", display: 'flex' }}
                                                variants={carouselVariants}
                                                animate="animate"
                                            >
                                                {simpulJaringanList.map((simpulJaringan, i) => (
                                                    <Card key={i} elevation={0} sx={{
                                                        background: "none",
                                                        height: "100%",
                                                        minWidth: '200px',
                                                        display: 'flex',
                                                        flexDirection: "column",
                                                        alignItems: 'center',
                                                        justifyContent: 'center',

                                                        "&.MuiCard-root": {
                                                            minWidth: "140px",
                                                        }
                                                    }}>
                                                        <Link id="btnsimpulJaringanDetailSimpulJaringan" href={simpulJaringan.link} target='_blank'>
                                                            <CardMedia component='div' sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="179" height="152" viewBox="0 0 179 152" fill="none"
                                                                    style={{ position: "absolute", zIndex: "-1" }}>
                                                                    <g filter="url(#filter0_f_20544_146)">
                                                                        <ellipse cx="89.5391" cy="76.0005" rx="61.5391" ry="48.0005" fill="white" fillOpacity="0.62" />
                                                                    </g>
                                                                    <defs>
                                                                        <filter id="filter0_f_20544_146" x="0.4" y="0.4" width="178.278" height="151.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                                                            <feGaussianBlur stdDeviation="13.8" result="effect1_foregroundBlur_20544_146" />
                                                                        </filter>
                                                                    </defs>
                                                                </svg>
                                                                <img
                                                                    alt=""
                                                                    src={simpulJaringan.icon}
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        maxHeight: '71px',
                                                                        alignSelf: 'center',
                                                                    }}
                                                                />
                                                            </CardMedia>
                                                            {/* <CardContent
                                                    sx={{
                                                        textAlign: "center",
                                                        alignItems: 'center',
                                                    }}>
                                                    <Typography variant="p" paragraph sx={{
                                                        color: "rgba(0, 0, 0, 0.90)",
                                                        fontSize: isMobile ? "14px" : "16px",
                                                        fontWeight: 400,
                                                        letterSpacing: "0.027px",
                                                        mb: 1,
                                                    }}>
                                                        {simpulJaringan.judul}
                                                    </Typography>
                                                </CardContent> */}
                                                        </Link>
                                                    </Card>
                                                ))}
                                            </motion.div>
                                        </div>
                                        <div>
                                            <Typography variant="p" paragraph sx={{
                                                textAlign: "center",
                                                margin: "28px 0",
                                                color: "#FFF",
                                                fontSize: "26px",
                                                fontWeight: "700",
                                                lineHeight: "150%",
                                                letterSpacing: "-0.494px",
                                            }}>
                                                Smart RDTR
                                            </Typography>
                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="179" height="152" viewBox="0 0 179 152" fill="none"
                                                    style={{ position: "absolute" }}>
                                                    <g filter="url(#filter0_f_20544_146)">
                                                        <ellipse cx="89.5391" cy="76.0005" rx="61.5391" ry="48.0005" fill="white" fillOpacity="0.62" />
                                                    </g>
                                                    <defs>
                                                        <filter id="filter0_f_20544_146" x="0.4" y="0.4" width="178.278" height="151.2" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                                            <feGaussianBlur stdDeviation="13.8" result="effect1_foregroundBlur_20544_146" />
                                                        </filter>
                                                    </defs>
                                                </svg>
                                                <img
                                                    alt=""
                                                    src="/assets/Petadashboard-smartrdtr.png"
                                                    style={{
                                                        maxWidth: "100%",
                                                        maxHeight: '71px',
                                                        alignSelf: 'center',
                                                        zIndex: "2"
                                                    }}
                                                />
                                            </Box>
                                        </div>
                                    </Stack>
                                </Box>
                                <Box sx={{
                                    padding: "27px 30px 27px 50px",
                                    width: "100%",
                                    height: "236px",
                                    borderRadius: "45px",
                                    backgroundColor: "white",
                                    boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)"
                                }}>
                                    <Stack
                                        spacing={2}
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="stretch">
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography variant="p" sx={{
                                                color: 'var(--jakartasatu-biru)',
                                                fontSize: "26px",
                                                fontWeight: "700",
                                                lineHeight: "150%",
                                                letterSpacing: "-0.494px",
                                            }}>
                                                Informasi
                                            </Typography>
                                            <Box sx={{ marginRight: "-5px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", width: "43px", height: "43px", backgroundColor: 'var(--jakartasatu-orange)' }}>
                                                <NorthEastRoundedIcon sx={{ color: "white" }} />
                                            </Box>
                                        </Stack>
                                        <Stack spacing={4} direction="row" justifyContent="space-between" alignItems="center">
                                            <img
                                                src="/assets/Gambar-news.png"
                                                alt="Logo"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: "auto",
                                                    maxHeight: "97px",
                                                    height: "100%"
                                                }}
                                            />
                                            <Typography variant="p" sx={{
                                                color: "rgba(0, 0, 0, 0.70)",
                                                fontSize: "20px",
                                                fontWeight: "500",
                                                lineHeight: "180%",
                                            }}>
                                                Yuk baca penelitian spasial di jakarta
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </section>
            </motion.div>
        </>
    );
}

export default HomeRedesignOpsiEmpat;