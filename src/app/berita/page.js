"use client"

import { motion } from 'framer-motion';

import styles from "../../components/page.module.css";
import Navbar from '../../components/navbar/navbar';
import "../../components/navbar/style.css";
import Footer from '../../components/footer/footer';
import ScrollTop from '../../components/scrollTop';
import KritikSaran from '../../components/kritikSaran';
import Breadcrumbs from '../../components/breadcrumbs';

import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Paper,
    Typography,
    Grid
} from "@mui/material";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import Link from "next/link";

function berita() {
    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Berita" }
    ];

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

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

    const [newsLatest, setnewsLatest] = useState([]);

    const [newsList, setNewsList] = useState([]);
    const getNewsList = async () => {
        const response = await axios.get(
            process.env.API_DEV + "/v4/news/"
        );

        const beritaTerbaru = response.data.data.items;

        setNewsList(beritaTerbaru);

        setnewsLatest(beritaTerbaru[beritaTerbaru.length - 1]);
    };

    useEffect(() => {
        document.title = "Berita | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        getNewsList();
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
                    style={{ width: "100%", }}
                >
                    <div style={{
                        width: "100%",
                    }}>
                        <Box
                            sx={{
                                width: "100%",
                            }}>
                            <CardContent sx={{ top: "20%", marginLeft: "8%", textAlign: "left", position: "absolute", zIndex: "10", color: "white" }}>
                                <CardActionArea id="btnBeritaLatestBerita" href={`/berita/${newsLatest.slug}`}
                                    sx={{
                                        margin: "-20px",
                                        padding: "20px",
                                        borderRadius: "18px",
                                    }}>
                                    <Typography variant="p" paragraph sx={{
                                        fontSize: "14px",
                                        lineHeight: "185.5%",
                                        letterSpacing: "0.056px",
                                        mb: 2
                                    }}>{newsLatest.created_at}</Typography>
                                    <Typography variant="p" paragraph sx={{
                                        fontSize: "25px",
                                        fontWeight: 500,
                                        lineHeight: "157.8%",
                                        mb: 2
                                    }}>{newsLatest.title}</Typography>
                                    <Typography variant="p" paragraph sx={{
                                        textAlign: "justify",
                                        fontSize: "16px",
                                        lineHeight: "195.3%",
                                        letterSpacing: "0.024px",
                                        mb: 2
                                    }}>{newsLatest.short_content}...&nbsp;
                                        <span
                                            style={{
                                                color: "#2F80ED",
                                                textDecorationLine: "underline",
                                            }}>
                                            baca selengkapnya
                                        </span>
                                    </Typography>
                                </CardActionArea>
                            </CardContent>
                            <img style={{
                                width: "100%",
                                height: "75vh",
                                objectFit: "cover",
                                filter: "brightness(0.4)",
                                backgroundColor: "grey",
                            }} src={newsLatest.source_image} alt='' />
                        </Box>
                    </div>
                    <div className={styles.container} style={{ margin: "0 auto" }}>
                        <Paper elevation={0}
                            sx={{
                                margin: "-43px auto 50px auto",
                                position: "relative",
                                display: 'grid',
                                alignItems: 'center',
                                width: 250,
                                height: 70,
                                borderRadius: "40px",
                                boxShadow: "0 1px 15px rgb(0 0 0 / 0.2)",
                            }}>
                            <Typography variant="p" paragraph
                                sx={{
                                    marginTop: "2%",
                                    lineHeight: 1.5,
                                    zIndex: "10",
                                    fontSize: "35px",
                                    fontWeight: "600",
                                    letterSpacing: "0.088px",
                                    textAlign: "center",
                                    marginBottom: "15px",
                                    color: 'var(--jakartasatu-biru)',
                                }}>
                                Highlight
                            </Typography>
                        </Paper>
                        <div style={{ marginTop: "-150px" }}>
                            <Breadcrumbs breadcrumbs={breadcrumbs} isNewsPage={true} />
                        </div>
                    </div>
                    <section style={{ width: "100%", maxWidth: "1625px", margin: "50px auto" }}>
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
                            {newsList.map((step, index) => (
                                <Grid key={index}
                                    container
                                    spacing={6}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="stretch"
                                    sx={{
                                        paddingLeft: "7%",
                                        paddingRight: "7%",
                                    }}>
                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            component="img"
                                            sx={{
                                                // borderRadius: "18px",
                                                width: '100%',
                                                backgroundColor: "grey",
                                                boxShadow: "2px 2px 20px 0px rgba(0, 0, 0, 0.15)"
                                            }}
                                            src={step.source_image} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                        <Link id="btnBeritaCarouselNews" href={`/berita/${step.slug}`}
                                            sx={{
                                                padding: "20px",
                                                borderRadius: "18px",
                                            }}>
                                            <CardContent
                                                sx={{
                                                    textAlign: "left",
                                                    marginLeft: "-14px",
                                                    marginRight: "-14px",
                                                    marginTop: "-17px",

                                                    '&:hover': {
                                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                                        borderRadius: "5px"
                                                    },
                                                }}>
                                                <Typography variant="p" paragraph sx={{
                                                    color: "rgba(0, 0, 0, 0.70)",
                                                    fontSize: "14px",
                                                    lineHeight: "185.5%",
                                                    letterSpacing: "0.056px",
                                                    mb: 1,
                                                }}>{step.created_at}</Typography>
                                                <Typography variant="p" paragraph sx={{
                                                    color: 'var(--jakartasatu-biru)',
                                                    fontSize: "26px",
                                                    fontWeight: 500,
                                                    lineHeight: "160%",
                                                    letterSpacing: "0.039px",
                                                    mb: 1,
                                                }}>{step.title}</Typography>
                                                <Typography variant="p" paragraph sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "195.3%",
                                                    letterSpacing: "0.024px",
                                                }}>{step.short_content}...&nbsp;
                                                    <span
                                                        style={{
                                                            color: "#2F80ED",
                                                            textDecorationLine: "underline",
                                                        }}>
                                                        baca selengkapnya
                                                    </span>
                                                </Typography>
                                            </CardContent>
                                        </Link>
                                    </Grid>
                                </Grid>
                            ))}
                        </Carousel>
                    </section>
                    <section className={styles.container} style={{ margin: "auto auto 100px auto", display: "flex", }}>
                        <Grid container
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="p" paragraph
                                    sx={{
                                        marginTop: "2%",
                                        lineHeight: 1.5,
                                        zIndex: "10",
                                        fontSize: "35px",
                                        fontWeight: "600",
                                        letterSpacing: "0.088px",
                                        textAlign: "center",
                                        marginBottom: "15px",
                                        color: 'var(--jakartasatu-biru)',
                                    }}>
                                    Semua
                                </Typography>
                                <Divider
                                    style={{
                                        backgroundColor: 'var(--jakartasatu-biru)',
                                        margin: "auto",
                                        width: "50px",
                                        height: "2px",
                                    }} />
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                alignItems: "start",
                                mt: 6,
                                display: 'grid',
                                gridTemplateColumns: { md: '50% 1fr 1fr' },

                                "& :first-of-type": {
                                    gridRow: "span 2",
                                }
                            }}>
                            {newsList.map((news, i) => (
                                <Card key={i} elevation={0} square={true} sx={{ background: "none" }}>
                                    <CardActionArea id="btnBeritaSemuaBerita" href={`/berita/${news.slug}`}
                                        sx={{
                                            padding: "20px",
                                            borderRadius: "36px",

                                        }}>
                                        <CardMedia component='div'>
                                            {news.source_image && (
                                                <img
                                                    style={{
                                                        // borderRadius: "18px",
                                                        width: "100%",
                                                        height: "auto",
                                                        objectFit: "cover",
                                                        backgroundColor: "grey"
                                                    }}
                                                    alt="" src={news.source_image} />
                                            )}
                                        </CardMedia>
                                        <CardContent
                                            sx={{
                                                textAlign: "left",
                                                marginLeft: "-14px",
                                                marginRight: "-14px",
                                            }}>
                                            <Typography variant="p" paragraph sx={{
                                                fontSize: i === 0 ? "21px" : "16px",
                                                fontWeight: 500,
                                                lineHeight: "171.3%",
                                                letterSpacing: "0.024px",
                                                mb: 1
                                            }}>{news.title}</Typography>
                                            <Typography variant="p" paragraph sx={{
                                                color: "rgba(0, 0, 0, 0.70)",
                                                fontSize: i === 0 ? "16px" : "12px",
                                                fontWeight: "400",
                                                mb: 1
                                            }}>{news.created_at}</Typography>
                                            <Typography variant="p" paragraph sx={{
                                                fontSize: i === 0 ? "16px" : "12px",
                                                textAlign: "justify",
                                                lineHeight: "185.5%",
                                                letterSpacing: "0.048px"
                                            }}>{news.short_content}...&nbsp;
                                                <span
                                                    style={{
                                                        color: "#2F80ED",
                                                        textDecorationLine: "underline",
                                                    }}>
                                                    baca selengkapnya
                                                </span>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Box>
                    </section>

                    <Footer />
                </motion.div>
            </main>
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default berita;