"use client"

import { motion } from 'framer-motion';

import styles from "../../../components/page.module.css";

import Navbar from '../../../components/navbar/navbar';
import "../../../components/navbar/style.css";
import Footer from '../../../components/footer/footer';
import ScrollTop from '../../../components/scrollTop';
import KritikSaran from '../../../components/kritikSaran';
import Breadcrumbs from '../../../components/breadcrumbs';
import CustomImage from '@/components/CustomImage';

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useEffect, useState } from "react";
import { Box, Button, Card, Tab, Tabs, Typography, useMediaQuery, useTheme, Select, MenuItem, CircularProgress, Divider, CardMedia, Stack, CardContent, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import axios from "axios";

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { Red_Rose } from 'next/font/google';

function infografis() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileHeight = useMediaQuery("(max-height: 431px)");
    const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));
    const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));

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
        { label: "Infografis" }
    ];

    const arrowStyles = {
        position: 'absolute',
        background: 'transparent',
        color: 'black',
        border: 'none',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer',
    };

    const indicatorStyles = {
        background: '#D3D3D3',
        borderRadius: 30,
        width: 10,
        height: 10,
        display: 'inline-block',
        margin: '6vw 8px',
        cursor: 'pointer',
    };

    const [infografisList, setInfografisList] = useState([]);

    useEffect(() => {
        document.title = "Infografis | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const getInfografisList = async () => {
            const response = await axios.get(
                "../api/infografis"
            );
            const newsLatest = response.data.data;
            setInfografisList(newsLatest);
        };

        getInfografisList();
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
                    <div className={styles.container} style={{ paddingTop: "70px" }}>
                        <section id="berbagiPakai"
                            style={{
                                width: "90vw",
                                maxWidth: "1200px"
                            }}>
                            <div style={{ textAlign: "center" }}>
                                <Typography variant="p"
                                    style={{
                                        color: 'var(--jakartasatu-biru)',
                                        textAlign: "center",
                                        fontSize: "36px",
                                        fontWeight: "800",
                                    }}>
                                    Infografis
                                </Typography>
                                <Divider
                                    style={{
                                        margin: '15px auto 82px auto',
                                        backgroundColor: 'var(--jakartasatu-biru)',
                                        height: 5,
                                        width: '75px',
                                        borderRadius: '4px',
                                    }}
                                />
                            </div>
                            <Stack direction="column" justifyContent="space-between" alignItems="center" gap={{ xs: 3, sm: 3, md: 5, lg: 7, xl: 9 }}>
                                <Grid container
                                    spacing={{ xs: 3, sm: 4, md: 6, lg: 8, xl: 10 }}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
                                        {infografisList?.length > 0 ? (
                                            infografisList?.map((info, i) => {
                                                if (i === 0) {
                                                    return (
                                                        <Link key={i} href={info.link} target='_blank'>
                                                            <Card sx={{
                                                                width: "100%",
                                                                height: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "395px" },
                                                                borderRadius: "25px",
                                                                background: "#FFF",
                                                                boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)"
                                                            }}>
                                                                <CustomImage
                                                                    src={Array.isArray(info.gambar) ? info.gambar[0] : info.gambar}
                                                                    alt="Gambar"
                                                                    draggable={false}
                                                                    width={0}
                                                                    height={0}
                                                                    style={{
                                                                        userDrag: "none",
                                                                        userSelect: "none",

                                                                        width: '100%',
                                                                        height: '245px',
                                                                    }}
                                                                />
                                                                <CardContent sx={{ padding: "27px" }}>
                                                                    <Typography variant="p" sx={{
                                                                        color: "rgba(0, 0, 0, 0.70)",
                                                                        fontSize: "18px",
                                                                        fontWeight: "500",
                                                                        lineHeight: "180%",
                                                                        whiteSpace: "pre-line",
                                                                        verticaAlign: "bottom",
                                                                    }}
                                                                        dangerouslySetInnerHTML={{ __html: info.deskripsi }}></Typography>
                                                                </CardContent>
                                                            </Card>
                                                        </Link>
                                                    );
                                                }
                                                return null;
                                            })
                                        ) : (
                                            <Skeleton variant="rounded" width="346px" height="395px" animation="wave" sx={{ borderRadius: "25px", }} />
                                        )}
                                    </Grid>
                                    <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
                                        {infografisList?.length > 0 ? (
                                            infografisList?.map((info, i) => {
                                                if (i === 1) {
                                                    return (
                                                        <Box sx={{
                                                            width: "100%",
                                                            height: { xs: "100%", sm: "100%", md: "100%", lg: "395px", xl: "395px" },
                                                            padding: "30px 0",
                                                            borderRadius: "25px",
                                                            background: "#FFF",
                                                            boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)"
                                                        }}>
                                                            <Stack key={i} direction="column" justifyContent="space-between" alignItems="space-between">
                                                                <Carousel
                                                                    autoPlay={true}
                                                                    showIndicators={false}
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
                                                                >
                                                                    {Array.isArray(info.gambar) &&
                                                                        Array.from({ length: Math.ceil(info.gambar.length / (window.innerWidth < 431 ? 1 : 3)) }).map((_, groupIndex) => {
                                                                            const groupImages = info.gambar.slice(groupIndex * (window.innerWidth < 431 ? 1 : 3), groupIndex * (window.innerWidth < 768 ? 1 : 3) + (window.innerWidth < 768 ? 1 : 3));
                                                                            return (
                                                                                <Link key={groupIndex} href={info.link} target='_blank'>
                                                                                    <div style={{
                                                                                        display: 'flex',
                                                                                        flexDirection: "row",
                                                                                        justifyContent: 'center'
                                                                                    }}>
                                                                                        {groupImages.map((gambar, i) => (
                                                                                            <CustomImage
                                                                                                key={i}
                                                                                                src={gambar}
                                                                                                alt="Gambar"
                                                                                                draggable={false}
                                                                                                width={0}
                                                                                                height={0}
                                                                                                style={{
                                                                                                    userDrag: "none",
                                                                                                    userSelect: "none",

                                                                                                    width: '100%',
                                                                                                    maxWidth: "184px",
                                                                                                    height: '230px',
                                                                                                    margin: "0 5px"
                                                                                                }}
                                                                                            />
                                                                                        ))}
                                                                                    </div>
                                                                                </Link>
                                                                            );
                                                                        })}
                                                                </Carousel>
                                                                <Link key={i} href={info.link} target='_blank'>
                                                                    <CardContent sx={{ padding: { xs: "27px", sm: "19px 62px" } }}>
                                                                        <Typography variant="p" sx={{
                                                                            color: "rgba(0, 0, 0, 0.70)",
                                                                            fontSize: "18px",
                                                                            fontWeight: "500",
                                                                            lineHeight: "180%",
                                                                            whiteSpace: "pre-line",
                                                                            verticaAlign: "bottom",
                                                                        }}
                                                                            dangerouslySetInnerHTML={{ __html: info.deskripsi }}></Typography>
                                                                    </CardContent>
                                                                </Link>
                                                            </Stack>
                                                        </Box>

                                                        // <Card key={i} sx={{
                                                        //     width: "100%",
                                                        //     height: "395px",
                                                        //     borderRadius: "25px",
                                                        //     background: "#FFF",
                                                        //     boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)"
                                                        // }}>
                                                        //     <CardMedia
                                                        //         component="img"
                                                        //         sx={{ width: "100%" }}
                                                        //         image={Array.isArray(info.gambar) ? info.gambar[0] : info.gambar} // Pilih gambar pertama
                                                        //     />
                                                        //     <CardContent sx={{ padding: "27px" }}>
                                                        //         <Typography variant="p" sx={{
                                                        //             color: "rgba(0, 0, 0, 0.70)",
                                                        //             fontSize: "18px",
                                                        //             fontWeight: "500",
                                                        //             lineHeight: "180%",
                                                        //             whiteSpace: "pre-line",
                                                        //             verticaAlign: "bottom",
                                                        //         }}
                                                        //             dangerouslySetInnerHTML={{ __html: info.deskripsi }}></Typography>
                                                        //     </CardContent>
                                                        // </Card>
                                                    );
                                                }
                                                return null;
                                            })
                                        ) : (
                                            <Skeleton variant="rounded" width="773px" height="395px" animation="wave" sx={{ borderRadius: "25px" }} />
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container
                                    spacing={{ xs: 3, sm: 4, md: 6, lg: 8, xl: 10 }}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start">
                                    <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
                                        <Stack direction="column" justifyContent="space-between" alignItems="center" gap={{ xs: 3, sm: 3, md: 5, lg: 7, xl: 9 }} sx={{ height: { sx: "100%", sm: "759px" } }}>
                                            {infografisList?.length > 0 ? (
                                                infografisList?.map((info, i) => {
                                                    if (i === 2) {
                                                        return (
                                                            <Box sx={{
                                                                width: "100%",
                                                                height: "100%",
                                                                borderRadius: "25px",
                                                                background: "#FFF",
                                                                boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)"
                                                            }}>
                                                                <Link key={i} href={info.link} target='_blank'>
                                                                    <Card elevation={0} sx={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        borderRadius: "25px",
                                                                    }}>
                                                                        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" alignItems="center" gap={1}>
                                                                            <CustomImage
                                                                                src={info.gambar}
                                                                                alt="Gambar"
                                                                                draggable={false}
                                                                                width={0}
                                                                                height={0}
                                                                                style={{
                                                                                    userDrag: "none",
                                                                                    userSelect: "none",

                                                                                    width: "100%",
                                                                                    height: "100%",
                                                                                    maxHeight: "292px"
                                                                                }}
                                                                            />
                                                                            <CardContent sx={{ padding: "27px" }}>
                                                                                <Typography variant="p" sx={{
                                                                                    color: "rgba(0, 0, 0, 0.70)",
                                                                                    fontSize: "18px",
                                                                                    fontWeight: "500",
                                                                                    lineHeight: "180%",
                                                                                    whiteSpace: "pre-line",
                                                                                    verticaAlign: "bottom",
                                                                                }}
                                                                                    dangerouslySetInnerHTML={{ __html: info.deskripsi }}></Typography>
                                                                            </CardContent>
                                                                        </Stack>
                                                                    </Card>
                                                                </Link>
                                                            </Box>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            ) : (
                                                <Skeleton variant="rounded" width="773px" height="292px" animation="wave" sx={{ borderRadius: "25px" }} />
                                            )}
                                            {infografisList?.length > 0 ? (
                                                infografisList?.map((info, i) => {
                                                    if (i === 3) {
                                                        return (
                                                            <Box sx={{
                                                                width: "100%",
                                                                height: { xs: "100%", sm: "100%", md: "100%", lg: "395px", xl: "395px" },
                                                                padding: "30px 0",
                                                                borderRadius: "25px",
                                                                background: "#FFF",
                                                                boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)"
                                                            }}>
                                                                <Stack key={i} direction="column" justifyContent="space-between" alignItems="space-between">
                                                                    <Carousel
                                                                        autoPlay={true}
                                                                        showIndicators={false}
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
                                                                    >
                                                                        {Array.isArray(info.gambar) &&
                                                                            Array.from({ length: Math.ceil(info.gambar.length / (window.innerWidth < 431 ? 1 : 3)) }).map((_, groupIndex) => {
                                                                                const groupImages = info.gambar.slice(groupIndex * (window.innerWidth < 431 ? 1 : 3), groupIndex * (window.innerWidth < 768 ? 1 : 3) + (window.innerWidth < 768 ? 1 : 3));
                                                                                return (
                                                                                    <Link key={groupIndex} href={info.link} target='_blank'>
                                                                                        <div style={{
                                                                                            display: 'flex',
                                                                                            flexDirection: "row",
                                                                                            justifyContent: 'center'
                                                                                        }}>
                                                                                            {groupImages.map((gambar, i) => (
                                                                                                <CustomImage
                                                                                                    key={i}
                                                                                                    src={gambar}
                                                                                                    alt="Gambar"
                                                                                                    draggable={false}
                                                                                                    width={0}
                                                                                                    height={0}
                                                                                                    style={{
                                                                                                        userDrag: "none",
                                                                                                        userSelect: "none",

                                                                                                        width: '100%',
                                                                                                        maxWidth: "184px",
                                                                                                        height: '230px',
                                                                                                        margin: "0 5px"
                                                                                                    }}
                                                                                                />
                                                                                            ))}
                                                                                        </div>
                                                                                    </Link>
                                                                                );
                                                                            })}
                                                                    </Carousel>
                                                                    <Link href={info.link} target='_blank'>
                                                                        <CardContent sx={{ padding: { xs: "27px", sm: "19px 62px" } }}>
                                                                            <Typography variant="p" sx={{
                                                                                color: "rgba(0, 0, 0, 0.70)",
                                                                                fontSize: "18px",
                                                                                fontWeight: "500",
                                                                                lineHeight: "180%",
                                                                                whiteSpace: "pre-line",
                                                                                verticaAlign: "bottom",
                                                                            }}
                                                                                dangerouslySetInnerHTML={{ __html: info.deskripsi }}></Typography>
                                                                        </CardContent>
                                                                    </Link>
                                                                </Stack>
                                                            </Box>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            ) : (
                                                <Skeleton variant="rounded" width="773px" height="395px" animation="wave" sx={{ borderRadius: "25px" }} />
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
                                        {infografisList?.length > 0 ? (
                                            infografisList?.map((info, i) => {
                                                if (i === 4) {
                                                    return (
                                                        <Link key={i} href={info.link} target='_blank'>
                                                            <Card sx={{
                                                                width: "100%",
                                                                height: { lg: "100%", xl: "759px" },
                                                                borderRadius: "25px",
                                                                background: "#FFF",
                                                                boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)"
                                                            }}>
                                                                <CustomImage
                                                                    src={Array.isArray(info.gambar) ? info.gambar[0] : info.gambar}
                                                                    alt="Gambar"
                                                                    draggable={false}
                                                                    width={0}
                                                                    height={0}
                                                                    style={{
                                                                        userDrag: "none",
                                                                        userSelect: "none",

                                                                        width: "100%",
                                                                        height: "384px"
                                                                    }}
                                                                />
                                                                <CardContent sx={{ padding: "27px" }}>
                                                                    <Typography variant="p" sx={{
                                                                        color: "rgba(0, 0, 0, 0.70)",
                                                                        fontSize: "18px",
                                                                        fontWeight: "500",
                                                                        lineHeight: "180%",
                                                                        whiteSpace: "pre-line",
                                                                        verticaAlign: "bottom",
                                                                    }}
                                                                        dangerouslySetInnerHTML={{ __html: info.deskripsi }}></Typography>
                                                                </CardContent>
                                                            </Card>
                                                        </Link>
                                                    );
                                                }
                                                return null;
                                            })
                                        ) : (
                                            <Skeleton variant="rounded" width="346px" height="759px" animation="wave" sx={{ borderRadius: "25px" }} />
                                        )}
                                    </Grid>
                                </Grid>
                            </Stack>
                        </section>
                    </div>
                    <Footer />
                </motion.div>
            </main >
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default infografis;