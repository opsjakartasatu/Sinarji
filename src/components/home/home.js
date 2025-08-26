"use client"

import PetaHome from '../../app/peta/interaktif/page2';
import styles from '../page.module.css';

import Navbar from '../navbar/navbar';
import "../navbar/style.css";

import { forwardRef, useState } from "react";
import { Box, Button, Dialog, DialogContent, Divider, Fab, Grow, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Link from "next/link";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Transition = forwardRef(function Transition(props, ref) {
    return <Grow direction="up" ref={ref} {...props} />;
});

function home() {
    const basePath = process.env.SERVER_PUBLIC_BASE_PATH ?? ''
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="navbar">
                <Navbar />
            </div>
            <div className={styles.container} style={{ paddingTop: "100px", width: "100%" }}>
                <section id="welcome" style={{ margin: isMobile ? "50px 0 100px 0" : "160px 0", width: isMobile ? "90vw" : "", maxWidth: "1440px" }}>
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
                        alignItems="center"
                        sx={{ maxWidth: "90vw" }}>
                        <Grid xs={12} sm={12} md={12} lg={5.5} xl={5.5}>
                            <img
                                src='assets/Ellipse-2.png'
                                alt="Gambar"
                                draggable="false"
                                style={{
                                    userDrag: "none",
                                    userSelect: "none",

                                    width: isMobile ? '500px' : '60vw',
                                    maxWidth: isMobile ? '500px' : '974px',
                                    height: isMobile ? '200px' : '408px',
                                    opacity: "90%",
                                    top: isMobile ? '100px' : "180px",
                                    marginLeft: "-150px",
                                    position: "absolute",
                                    zIndex: "-99",
                                }}
                            />
                            <p
                                style={{
                                    fontSize: "40px",
                                    padding: "0 0 50px 0",
                                    color: 'var(--jakartasatu-biru)',
                                    fontWeight: "600",
                                }}>
                                Selamat Datang di Jakarta Satu
                            </p>
                            <Typography variant="p" paragraph
                                sx={{
                                    color: "rgba(0, 0, 0, 0.70)",
                                    fontSize: "24px",
                                    fontWeight: "400",
                                    maxWidth: isMobile ? "100%" : "90%",
                                }}>
                                Aplikasi berbasis Geoportal yang menyediakan berbagai informasi dan data spasial hasil integrasi dari berbagai SKPD yang ada di Kota Jakarta.
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} lg={5} xl={5}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <img src='assets/Gambar-atas.png'
                                    alt="Gambar"
                                    draggable="false"
                                    style={{
                                        maxWidth: isMobile ? '350px' : '606.75px',
                                        height: 'auto',
                                        maxHeight: isMobile ? 'auto' : '357.326px',
                                        // marginTop: isMobile ? "0" : "-100px",

                                        userDrag: "none",
                                        userSelect: "none"
                                    }} />
                            </div>
                        </Grid>
                    </Grid>
                </section>
                <section id="petadandashboard" style={{ width: isMobile ? "90vw" : "90vw", maxWidth: isMobile ? "90vw" : "1000px", margin: "0 auto" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="119" height="119" viewBox="0 0 119 119" fill="none"
                        style={{
                            userDrag: "none",
                            userSelect: "none",

                            position: "absolute",
                            marginLeft: "-170px",
                            marginTop: "120px",
                        }}>
                        <g opacity="0.5">
                            <path d="M68.4476 25.6727L93.1432 68.4468L50.3691 93.1424L25.6735 50.3683L68.4476 25.6727ZM86.946 66.7862L66.7871 31.8699L31.8707 52.0288L52.0297 86.9452L86.946 66.7862Z" fill="url(#paint0_linear_13886_14)" />
                            <path d="M64.5289 40.2977L78.5185 64.5285L54.2878 78.5181L40.2981 54.2874L64.5289 40.2977ZM72.3338 62.8713L62.8717 46.4825L46.4829 55.9446L55.945 72.3334L72.3338 62.8713Z" fill="url(#paint1_linear_13886_14)" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_13886_14" x1="93.1307" y1="68.4434" x2="25.686" y2="50.3716" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#0057FF" stopOpacity="0.53" />
                                <stop offset="1" stopColor="#5272E1" stopOpacity="0.17" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_13886_14" x1="40.0421" y1="54.2189" x2="81.8983" y2="65.4342" gradientUnits="userSpaceOnUse">
                                <stop stopColor='var(--jakartasatu-orange)' stopOpacity="0.84" />
                                <stop offset="0.868896" stopColor='var(--jakartasatu-orange)' stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <Stack
                        spacing={isMobile ? 3 : 4}
                        direction={isMobile ? "column" : "row"}
                        alignItems="center"
                        useFlexGap
                        flexWrap="wrap">
                        <section id="layanan"
                            style={{
                                width: isMobile ? "90vw" : "",
                                height: isMobile ? null : "290px",
                                padding: "20px",
                                border: "1px solid #DFE6E9",
                                borderRadius: "15px",
                                background: "white",
                                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                flexGrow: "1",
                                display: "grid"
                            }}>
                            <Grid container
                                spacing={{ xs: 0, sm: 2 }}
                                direction="row"
                                justifyContent="center"
                                alignItems={{ xs: "flex-start", sm: "center" }}>
                                <Grid xs={6} sm={5} md={5} lg={5} xl={5}>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="194" height="480" viewBox="0 0 194 480" fill="none"
                                        style={{
                                            userDrag: "none",
                                            userSelect: "none",

                                            position: "absolute",
                                            left: "0",
                                            marginTop: "-50px",
                                            zIndex: "-1"
                                        }}>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M109.253 187.113C131.652 240.117 205.741 279.091 192.407 332.508C178.982 386.288 100.321 358.124 59.5633 386.171C27.2214 408.427 19.3957 466.694 -17.7599 477.134C-55.6758 487.787 -97.8218 465.538 -133.234 440.343C-167.054 416.28 -186.033 374.51 -211.78 339.088C-242.564 296.736 -304.28 264.058 -299.306 211.866C-294.08 157.019 -226.391 152.34 -190.784 118.755C-167.379 96.6798 -150.653 68.856 -126.088 48.4865C-94.7813 22.5264 -119.967 -1.87185 -79.8428 0.463907C-39.2978 2.82415 51.3013 21.4684 77.3847 60.3312C101.632 96.4584 92.009 146.309 109.253 187.113Z" fill="#5EA6FF" fillOpacity="0.08" />
                                    </svg>

                                    <Box sx={{ marginBottom: "30px" }}>
                                        <Typography variant='p'
                                            sx={{
                                                color: 'var(--jakartasatu-biru)',
                                                fontSize: "32px",
                                                fontWeight: "700",
                                                lineHeight: { xs: "100%", sm: "150%" },
                                                letterSpacing: "-0.608px",
                                            }}>Layanan</Typography>
                                    </Box>

                                    <Stack
                                        gap={1}
                                        direction="column">
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            gap={{ xs: 1, sm: 2 }}>
                                            <img
                                                src='assets/Element-4.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: isMobile ? "20px" : '40px',
                                                    height: 'auto'
                                                }}
                                            />
                                            <p style={{ fontSize: "18px", fontWeight: 500, color: 'var(--jakartasatu-biru)', margin: isMobile ? "0 5px" : "" }}>Open Data</p>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            gap={{ xs: 1, sm: 2 }}>
                                            <img
                                                src='assets/Element-4.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: isMobile ? "20px" : '40px',
                                                    height: 'auto'
                                                }}
                                            />
                                            <p style={{ fontSize: "18px", fontWeight: 500, color: 'var(--jakartasatu-biru)', margin: isMobile ? "0 5px" : "" }}>Map Service</p>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            gap={{ xs: 1, sm: 2 }}>
                                            <img
                                                src='assets/Element-4.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: isMobile ? "20px" : '40px',
                                                    height: 'auto'
                                                }}
                                            />
                                            <p style={{ fontSize: "18px", fontWeight: 500, color: 'var(--jakartasatu-biru)', margin: isMobile ? "0 5px" : "" }}>Metadata</p>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid xs={6} sm={5} md={5} lg={5} xl={5} sx={{ textAlign: "center" }}>
                                    <img
                                        src='assets/Gambar-layanan.png'
                                        alt="Gambar"
                                        draggable="false"
                                        style={{
                                            userDrag: "none",
                                            userSelect: "none",

                                            marginBottom: "25px",
                                            width: isMobile ? "26vw" : '120px',
                                            height: 'auto',
                                        }}
                                    />
                                    <div>
                                        <Link id="btnHomeToLayanan" href="/layanan">
                                            <Button variant="contained"
                                                sx={{
                                                    fontFamily: 'var(--font-family)',
                                                    width: isMobile ? "100px" : "145px",
                                                    height: isMobile ? "30px" : "44px",
                                                    borderRadius: "40px",
                                                    background: 'var(--jakartasatu-orange)',
                                                    boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                                    textTransform: "none",
                                                    color: "white",
                                                    fontSize: isMobile ? "15px" : "18px",
                                                    padding: "4px 35px",
                                                }}>
                                                Lihat
                                            </Button>
                                        </Link>
                                    </div>
                                </Grid>
                            </Grid>
                        </section>
                        <section id="informasi"
                            style={{
                                width: isMobile ? "90vw" : "",
                                padding: "20px",
                                border: "1px solid #DFE6E9",
                                borderRadius: "15px",
                                height: isMobile ? null : "290px",
                                background: "white",
                                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                flexGrow: "1",
                                display: "grid"
                            }}>
                            <Grid container
                                spacing={{ xs: 0, sm: 2 }}
                                direction="row"
                                justifyContent="center"
                                alignItems={{ xs: "flex-start", sm: "center" }}>
                                <Grid xs={6} sm={5} md={5} lg={5} xl={5}>
                                    <Box sx={{ marginBottom: "30px" }}>
                                        <Typography variant='p'
                                            sx={{
                                                color: 'var(--jakartasatu-biru)',
                                                fontSize: "32px",
                                                fontWeight: "700",
                                                lineHeight: { xs: "100%", sm: "150%" },
                                                letterSpacing: "-0.608px",
                                            }}>Informasi</Typography>
                                    </Box>
                                    <Stack gap={1} direction="column">
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            gap={{ xs: 1, sm: 2 }}>
                                            <img
                                                src='assets/Element-4.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: isMobile ? "20px" : '40px',
                                                    height: 'auto'
                                                }}
                                            />
                                            <p style={{ fontSize: "18px", fontWeight: 500, color: 'var(--jakartasatu-biru)', margin: isMobile ? "0 5px" : "" }}>Berita</p>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            gap={{ xs: 1, sm: 2 }}>
                                            <img
                                                src='assets/Element-4.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: isMobile ? "20px" : '40px',
                                                    height: 'auto'
                                                }}
                                            />
                                            <p style={{ fontSize: "18px", fontWeight: 500, color: 'var(--jakartasatu-biru)', margin: isMobile ? "0 5px" : "" }}>Riset</p>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            gap={{ xs: 1, sm: 2 }}>
                                            <img
                                                src='assets/Element-4.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: isMobile ? "20px" : '40px',
                                                    height: 'auto'
                                                }}
                                            />
                                            <p style={{ fontSize: "18px", fontWeight: 500, color: 'var(--jakartasatu-biru)', margin: isMobile ? "0 5px" : "" }}>Event</p>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid xs={6} sm={5} md={5} lg={5} xl={5} sx={{ textAlign: "center" }}>
                                    <Box sx={{ marginBottom: "30px", marginLeft: "10px" }}>
                                        <img
                                            src='assets/Gambar-news.png'
                                            alt="Gambar"
                                            draggable="false"
                                            style={{
                                                userDrag: "none",
                                                userSelect: "none",

                                                width: 'auto',
                                                height: isMobile ? "32vw" : '128px',
                                                padding: "0",
                                            }}
                                        />
                                    </Box>
                                    <Button id="btnHomeLihatModal" variant="contained"
                                        onClick={handleClickOpen}
                                        onMouseEnter={handleClickOpen}
                                        sx={{
                                            fontFamily: 'var(--font-family)',
                                            width: isMobile ? "100px" : "145px",
                                            height: isMobile ? "30px" : "44px",
                                            borderRadius: "40px",
                                            background: 'var(--jakartasatu-orange)',
                                            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                            textTransform: "none",
                                            color: "white",
                                            fontSize: isMobile ? "15px" : "18px",
                                            padding: "4px 35px",
                                        }}>
                                        Lihat
                                    </Button>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="133" height="133" viewBox="0 0 133 133" fill="none"
                                        style={{
                                            userDrag: "none",
                                            userSelect: "none",

                                            position: "absolute",
                                            marginLeft: isMobile? "-100px" : "100px",
                                            marginTop: "-50px",
                                            zIndex: "-1"
                                        }}>
                                        <g opacity="0.5">
                                            <path d="M96.5075 48.798L83.7241 96.5063L36.0158 83.7229L48.7992 36.0146L96.5075 48.798ZM80.5162 90.95L90.9513 52.0059L52.0071 41.5708L41.5721 80.515L80.5162 90.95Z" fill="url(#paint0_linear_13886_18)" />
                                            <path d="M83.3953 56.3671L76.1537 83.393L49.1279 76.1514L56.3694 49.1256L83.3953 56.3671ZM72.9523 77.8479L77.8502 59.5686L59.5709 54.6706L54.6729 72.95L72.9523 77.8479Z" fill="url(#paint1_linear_13886_18)" />
                                        </g>
                                        <defs>
                                            <linearGradient id="paint0_linear_13886_18" x1="83.7177" y1="96.4951" x2="48.8057" y2="36.0258" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#0057FF" stopOpacity="0.53" />
                                                <stop offset="1" stopColor="#5272E1" stopOpacity="0.17" />
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_13886_18" x1="56.2368" y1="48.896" x2="77.9032" y2="86.4233" gradientUnits="userSpaceOnUse">
                                                <stop stopColor='var(--jakartasatu-orange)' stopOpacity="0.84" />
                                                <stop offset="0.868896" stopColor='var(--jakartasatu-orange)' stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="168" height="492" viewBox="0 0 168 492" fill="none"
                                        style={{
                                            userDrag: "none",
                                            userSelect: "none",

                                            position: "absolute",
                                            right: "0",
                                            marginTop: "-300px",
                                            zIndex: "-1"
                                        }}>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M50.6386 238.294C42.517 296.773 -20.5419 355.073 6.85031 404.471C34.429 454.206 104.888 405.405 152.716 422.378C190.668 435.847 213.891 491.515 253.475 491.995C293.87 492.484 329.721 459.242 358.118 424.868C385.238 392.038 392.953 345.602 409.059 303.659C428.316 253.511 480.787 204.735 462.004 154.331C442.265 101.362 373.958 114.7 329.762 90.8705C300.713 75.2077 276.754 52.0743 247.008 38.41C209.098 20.9956 227.574 -9.87297 188.44 3.09715C148.895 16.2033 64.0807 58.7399 48.555 104.182C34.1222 146.426 56.8909 193.275 50.6386 238.294Z" fill="#5EA6FF" fillOpacity="0.08" />
                                    </svg>
                                </Grid>
                            </Grid>
                        </section>
                        <section id="kolaborasi"
                            style={{
                                padding: "20px",
                                border: "1px solid #DFE6E9",
                                borderRadius: "15px",
                                width: isMobile ? "90vw" : "1000px",
                                height: isMobile ? null : "290px",
                                background: "white",
                                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                display: "grid"
                            }}>
                            <Grid container
                                columns={12}
                                spacing="0"
                                direction="row"
                                justifyContent="center"
                                alignItems={{ xs: "flex-start", sm: "center" }}>
                                <Grid xs={6} sm={5} md={8} lg={8} xl={8}>
                                    <Box sx={{ marginBottom: "30px" }}>
                                        <Typography variant='p'
                                            sx={{
                                                color: 'var(--jakartasatu-biru)',
                                                fontSize: "32px",
                                                fontWeight: "700",
                                                lineHeight: isMobile ? "100%" : "150%",
                                                letterSpacing: "-0.608px",
                                            }}>Kolaborasi</Typography>
                                    </Box>
                                    <Stack direction="column" gap={3}>
                                        <Box
                                            sx={{
                                                columnGap: "10px",
                                                display: 'grid',
                                                justifyItems: isMobileMD ? "none" : "center",
                                                gridTemplateColumns: {
                                                    sm: '1fr 1fr',
                                                    md: '1fr 1fr 1fr'
                                                },
                                            }}>
                                            <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 2 }}>
                                                <img
                                                    src='assets/Element-4.png'
                                                    alt="Gambar"
                                                    draggable="false"
                                                    style={{
                                                        userDrag: "none",
                                                        userSelect: "none",

                                                        width: isMobile ? "20px" : '40px',
                                                        height: 'auto'
                                                    }}
                                                />
                                                <p style={{ fontSize: isMobile ? "17px" : "18px", fontWeight: 500, color: 'var(--jakartasatu-biru)', margin: isMobile ? "5px" : "15px 0" }}>Simpul Jaringan</p>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 2 }}>
                                                <img
                                                    src='assets/Element-4.png'
                                                    alt="Gambar"
                                                    draggable="false"
                                                    style={{
                                                        userDrag: "none",
                                                        userSelect: "none",

                                                        width: isMobile ? "20px" : '40px',
                                                        height: 'auto'
                                                    }}
                                                />
                                                <p style={{ fontSize: isMobile ? "17px" : "18px", fontWeight: 500, color: 'var(--jakartasatu-biru)', margin: isMobile ? "5px" : "15px 0" }}>Aplikasi</p>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 2 }}>
                                                <img
                                                    src='assets/Element-4.png'
                                                    alt="Gambar"
                                                    draggable="false"
                                                    style={{
                                                        userDrag: "none",
                                                        userSelect: "none",

                                                        width: isMobile ? "20px" : '40px',
                                                        height: 'auto'
                                                    }}
                                                />
                                                <p style={{ fontSize: isMobile ? "17px" : "18px", fontWeight: 500, color: 'var(--jakartasatu-biru)', margin: isMobile ? "5px" : "15px 0" }}>SMART RDTR</p>
                                            </Stack>
                                        </Box>
                                        <div style={{ display: "flex", textAlign: "center", flexDirection: "column" }}>
                                            <Link id="btnHomeToKolaborasi" href="/kolaborasi" style={{ display: isMobileMD ? "none" : "block" }}>
                                                <Button variant="contained"
                                                    sx={{
                                                        fontFamily: 'var(--font-family)',
                                                        width: isMobile ? "100px" : "145px",
                                                        height: isMobile ? "30px" : "44px",
                                                        borderRadius: "40px",
                                                        background: 'var(--jakartasatu-orange)',
                                                        boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                                        textTransform: "none",
                                                        color: "white",
                                                        fontSize: isMobile ? "15px" : "18px",
                                                        padding: "4px 35px",
                                                    }}>
                                                    Lihat
                                                </Button>
                                            </Link>
                                        </div>
                                    </Stack>
                                </Grid>
                                <Grid xs={6} sm={5} md={3} lg={3} xl={3} sx={{ textAlign: "center" }}>
                                    <Box sx={{ marginBottom: "30px" }}>
                                        <img src='assets/Gambar-skpd.png'
                                            alt="Gambar"
                                            draggable="false"
                                            style={{
                                                width: "auto",
                                                height: isMobile ? "30vw" : "161px",

                                                userDrag: "none",
                                                userSelect: "none"
                                            }} />
                                    </Box>
                                    <Link id="btnHomeToPetaDashboard" href="/petadashboard" style={{ display: isMobileMD ? "block" : "none" }}>
                                        <Button variant="contained"
                                            sx={{
                                                fontFamily: 'var(--font-family)',
                                                width: isMobile ? "100px" : "145px",
                                                height: isMobile ? "30px" : "44px",
                                                borderRadius: "40px",
                                                background: 'var(--jakartasatu-orange)',
                                                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                                textTransform: "none",
                                                color: "white",
                                                fontSize: isMobile ? "15px" : "18px",
                                                padding: "4px 35px",
                                            }}>
                                            Lihat
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </section>
                    </Stack>

                    <svg xmlns="http://www.w3.org/2000/svg" width="133" height="133" viewBox="0 0 133 133" fill="none"
                        style={{
                            userDrag: "none",
                            userSelect: "none",

                            position: "absolute",
                            display: "none",
                            marginLeft: isMobile ? "0" : "1040px",
                            marginTop: "-350px",
                            zIndex: "-1"
                        }}>
                        <g opacity="0.5">
                            <path d="M96.5073 48.7999L83.7239 96.5082L36.0156 83.7248L48.799 36.0165L96.5073 48.7999ZM80.516 90.952L90.951 52.0078L52.0069 41.5728L41.5718 80.5169L80.516 90.952Z" fill="url(#paint0_linear_13886_18)" />
                            <path d="M83.3953 56.371L76.1537 83.3969L49.1279 76.1553L56.3694 49.1295L83.3953 56.371ZM72.9523 77.8518L77.8502 59.5725L59.5709 54.6745L54.6729 72.9539L72.9523 77.8518Z" fill="url(#paint1_linear_13886_18)" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_13886_18" x1="83.7174" y1="96.497" x2="48.8054" y2="36.0277" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#0057FF" stopOpacity="0.53" />
                                <stop offset="1" stopColor="#5272E1" stopOpacity="0.17" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_13886_18" x1="56.2368" y1="48.9" x2="77.9032" y2="86.4272" gradientUnits="userSpaceOnUse">
                                <stop stopColor='var(--jakartasatu-orange)' stopOpacity="0.84" />
                                <stop offset="0.868896" stopColor='var(--jakartasatu-orange)' stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </section >
                <section id="petajakartasatu"
                    style={{
                        marginTop: "-40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}>
                    <Typography variant="p" paragraph
                        style={{
                            marginTop: "120px",
                            fontSize: "36px",
                            fontWeight: "800",
                            paddingBottom: "15px",
                            color: 'var(--jakartasatu-biru)',
                        }}>
                        Peta Jakarta
                    </Typography>
                    <Divider
                        style={{
                            margin: '-7px auto 30px auto',
                            backgroundColor: 'var(--jakartasatu-biru)',
                            height: 5,
                            width: '75px',
                            borderRadius: '4px',
                        }}
                    />

                    <Box
                        sx={{
                            borderRadius: "20px",
                            width: isMobile ? "90vw" : "90vw",
                            maxWidth: isMobile ? "90vw" : "1261px",
                            height: isMobile ? "500px" : "655px",
                            padding: 0,
                            backgroundColor: "white",
                            boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                        }}>
                        <PetaHome />
                    </Box>
                    <img
                        src='assets/Partikel-1.png'
                        alt="Gambar"
                        draggable="false"
                        style={{
                            userDrag: "none",
                            userSelect: "none",

                            width: isMobile ? '70vw' : '539px',
                            height: isMobile ? '80vw' : '695px',
                            marginTop: "500px",
                            position: "absolute",
                            zIndex: "-99",
                            right: "0",
                            transform: "scaleX(-1)",
                        }}
                    />
                </section>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="lg"
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{ sx: { borderRadius: "15px" }, padding: { xs: "50px", sm: "60px" } }}
                    sx={{ backdropFilter: "blur(10px)" }}>
                    <div onClick={handleClose}>
                        <CloseRoundedIcon
                            sx={{
                                position: "absolute",
                                margin: "15px",
                                right: "0",
                                cursor: "pointer"
                            }} />
                    </div>
                    <DialogContent sx={{ padding: { xs: "20px", sm: "60px" } }}>
                        <Grid container
                            spacing={{ xs: 0, sm: 4 }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            sx={{ gap: { xs: "50px", sm: "0" } }}>
                            <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Stack direction="column" justifyContent="center" alignItems="center" gap={{ xs: 4, sm: 8 }}>
                                    <img
                                        src="/assets/news.png"
                                        alt="Logo"
                                        draggable="false"
                                        style={{
                                            userDrag: "none",
                                            userSelect: "none",

                                            width: "100%",
                                            maxWidth: "126px",
                                            height: "auto"
                                        }}
                                    />
                                    <div style={{ height: "100%", minHeight: "136.78px", display: "flex", flexDirection: "column", gap: "20px" }}>
                                        <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 2 }}>
                                            <img
                                                src='assets/Element-4.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: isMobile ? "20px" : '40px',
                                                    height: 'auto'
                                                }}
                                            />
                                            <Typography style={{ color: 'var(--jakartasatu-biru)', fontFamily: 'var(--font-family)', fontSize: "26px", fontWeight: "500" }}>
                                                Berita
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            style={{
                                                textAlign: "left",
                                                fontFamily: 'var(--font-family)',
                                                fontSize: "16px",
                                                color: "black",
                                                fontWeight: "400",
                                                lineHeight: "160%",
                                            }}>
                                            Temukan berbagai informasi terkini mengenai Jakarta Satu
                                        </Typography>
                                    </div>
                                    <Link href="/berita">
                                        <Button id="btnHomeToBerita" variant="contained"
                                            sx={{
                                                fontFamily: 'var(--font-family)',
                                                borderRadius: "40px",
                                                background: 'var(--jakartasatu-orange)',
                                                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                                textTransform: "none",
                                                color: "white",
                                                fontSize: "18px",
                                                padding: "4px 45px",
                                            }}>
                                            Lihat
                                        </Button>
                                    </Link>
                                </Stack>
                            </Grid>
                            <Divider style={{ display: isMobileMD ? "block" : "none", borderRadius: "10px", borderBottomWidth: "3px", width: "100%" }} />
                            <Grid xs={12} sm={12} md={4} lg={4} xl={4} sx={{ textAlign: "center" }}>
                                <Stack direction="column" justifyContent="center" alignItems="center" gap={{ xs: 4, sm: 8 }}>
                                    <img
                                        src="/assets/projects.png"
                                        alt="Logo"
                                        draggable="false"
                                        style={{
                                            userDrag: "none",
                                            userSelect: "none",

                                            width: "100%",
                                            maxWidth: "126px",
                                            height: "auto"
                                        }}
                                    />
                                    <div style={{ height: "100%", minHeight: "136.78px", display: "flex", flexDirection: "column", gap: "20px" }}>
                                        <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 2 }}>
                                            <img
                                                src='assets/Element-4.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: isMobile ? "20px" : '40px',
                                                    height: 'auto'
                                                }}
                                            />
                                            <Typography style={{ color: 'var(--jakartasatu-biru)', fontFamily: 'var(--font-family)', fontSize: "26px", fontWeight: "500" }}>
                                                Riset
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            style={{
                                                textAlign: "left",
                                                fontFamily: 'var(--font-family)',
                                                fontSize: "16px",
                                                color: "black",
                                                fontWeight: "400",
                                                lineHeight: "160%",
                                            }}>
                                            Eksplorasi hasil riset kami untuk perkuat pengetahuan Anda terhadap Kota Jakarta!
                                        </Typography>
                                    </div>
                                    <Link href="/riset">
                                        <Button id="btnHomeToRiset" variant="contained"
                                            sx={{
                                                fontFamily: 'var(--font-family)',
                                                borderRadius: "40px",
                                                background: 'var(--jakartasatu-orange)',
                                                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                                textTransform: "none",
                                                color: "white",
                                                fontSize: "18px",
                                                padding: "4px 45px",
                                            }}>
                                            Lihat
                                        </Button>
                                    </Link>
                                </Stack>
                            </Grid>
                            <Divider style={{ display: isMobileMD ? "block" : "none", borderRadius: "10px", borderBottomWidth: "3px", width: "100%" }} />
                            <Grid xs={12} sm={12} md={4} lg={4} xl={4} sx={{ textAlign: "center" }}>
                                <Stack direction="column" justifyContent="center" alignItems="center" gap={{ xs: 4, sm: 8 }}>
                                    <img
                                        src="/assets/events.png"
                                        alt="Logo"
                                        draggable="false"
                                        style={{
                                            userDrag: "none",
                                            userSelect: "none",

                                            width: "100%",
                                            maxWidth: "126px",
                                            height: "auto"
                                        }}
                                    />
                                    <div style={{ height: "100%", minHeight: "136.78px", display: "flex", flexDirection: "column", gap: "20px" }}>
                                        <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 2 }}>
                                            <img
                                                src='assets/Element-4.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: isMobile ? "20px" : '40px',
                                                    height: 'auto'
                                                }}
                                            />
                                            <Typography style={{ color: 'var(--jakartasatu-biru)', fontFamily: 'var(--font-family)', fontSize: "26px", fontWeight: "500" }}>
                                                Events
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            style={{
                                                textAlign: "left",
                                                fontFamily: 'var(--font-family)',
                                                fontSize: "16px",
                                                color: "black",
                                                fontWeight: "400",
                                                lineHeight: "160%",
                                            }}>
                                            Temukan berbagai event menarik yang diselenggarakan oleh Pemprov DKI Jakarta
                                        </Typography>
                                    </div>
                                    <Link href="/event">
                                        <Button id="btnHomeToEvent" variant="contained"
                                            sx={{
                                                fontFamily: 'var(--font-family)',
                                                borderRadius: "40px",
                                                background: 'var(--jakartasatu-orange)',
                                                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                                textTransform: "none",
                                                color: "white",
                                                fontSize: "18px",
                                                padding: "4px 45px",
                                            }}>
                                            Lihat
                                        </Button>
                                    </Link>
                                </Stack>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div >
        </>
    );
}

export default home;