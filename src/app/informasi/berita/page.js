"use client"

import { motion } from 'framer-motion';

import styles from "../../../components/page.module.css";
import Navbar from '../../../components/navbar/navbar';
import "../../../components/navbar/style.css";
import Footer from '../../../components/footer/footer';
import ScrollTop from '../../../components/scrollTop';
import KritikSaran from '../../../components/kritikSaran';
import Breadcrumbs from '../../../components/breadcrumbs';

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
    Grid,
    useMediaQuery,
    useTheme,
    Pagination,
    PaginationItem
} from "@mui/material";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import Link from "next/link";
import APInotFound from '@/app/api-not-found';

function berita() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileHeight = useMediaQuery("(max-height: 431px)");
    const isMobile900 = useMediaQuery(theme.breakpoints.down("md"));

    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Berita" },
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
        width: 15,
        height: 15,
        display: 'inline-block',
        margin: '6vw 8px',
        cursor: 'pointer',
    };

    const [prestasiList, setPrestasiList] = useState([]);

    useEffect(() => {
        const getPrestasiList = async () => {
            const response = await axios.get(
                process.env.API_WEB + "/prestasi"
            );
            const newsLatest = response.data.data;

            setPrestasiList(newsLatest);
        };

        getPrestasiList();
    }, []);

    const [newsLatest, setnewsLatest] = useState([]);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [newsList, setNewsList] = useState([]);
    const getNewsList = async () => {
        try {
            const response = await axios.get(
                process.env.API_WEB + "/news/"
            );

            const beritaTerbaru = response.data.data.items;

            setNewsList(beritaTerbaru);

            setnewsLatest(beritaTerbaru[0]);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 500) {
                    setError("API sedang tidak dapat diakses");
                } else if (error.response.status === 502) {
                    setError("API mengalami masalah jaringan (Bad Gateway)");
                } else {
                    setError("Terjadi kesalahan saat mengambil data");
                }
            } else {
                setError("Terjadi kesalahan saat mengambil data");
            }
        }
    };

    useEffect(() => {
        document.title = "Berita | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        getNewsList();
    }, []);

    const chunkArray = (array, size) => {
        return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
            array.slice(index * size, index * size + size)
        );
    };

    const chunkedData = chunkArray(prestasiList, 3);

    const totalPages = Math.ceil(newsList.length / itemsPerPage);
    const displayedItems = newsList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle pagination change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <main className={styles.main}>
                {error ? (
                    <APInotFound />
                ) : (
                    <>
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
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
                                <img style={{
                                    width: "100%",
                                    height: isMobile || isMobileHeight ? "100vh" : "100vh",
                                    maxHeight: "670px",
                                    objectFit: "cover",
                                    filter: "brightness(0.4)",
                                    backgroundColor: "grey",
                                }} src={newsLatest.source_image} alt='' />
                                <CardContent sx={{
                                    // top: isMobile ? "" : isMobileHeight ? "30%" : "20%",
                                    bottom: "0",
                                    marginLeft: { xs: "", sm: "", md: "8%", lg: "8%", xl: "8%" },
                                    textAlign: "left",
                                    position: "absolute",
                                    zIndex: "10",
                                    color: "white",
                                    width: "100%",
                                    maxWidth: { xs: "100vw", sm: "100vw", md: isMobileHeight ? "90vw" : "60vw", lg: "60vw", xl: "60vw" }
                                }}>
                                    <Link id="btnBeritaLatestBerita" href={`/informasi/berita/${newsLatest.slug}`}>
                                        <CardActionArea
                                            sx={{
                                                margin: { xs: "", sm: "", md: "-20px", lg: "-20px", xl: "-20px" },
                                                padding: { xs: "", sm: "", md: "20px", lg: "20px", xl: "20px" },
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
                                                mb: 2,

                                                display: "-webkit-box",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: isMobileHeight ? 2 : null,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}>{newsLatest.title}</Typography>
                                            <Typography variant="p" sx={{
                                                textAlign: "justify",
                                                fontSize: "16px",
                                                lineHeight: "195.3%",
                                                letterSpacing: "0.024px",
                                                mb: { xs: null, sm: null, md: 2, lg: 2, xl: 2 },

                                                display: "-webkit-box",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: isMobileHeight ? 2 : null,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
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
                                    </Link>
                                </CardContent>
                            </Box>
                            <div className={styles.container} style={{ margin: "0 auto" }}>
                                <div style={{ margin: "-100px 0 50px 0" }}>
                                    <Breadcrumbs breadcrumbs={breadcrumbs} isNewsPage={true} />
                                </div>
                            </div>
                            <section id='tentangPrestasi' style={{ width: "100%", maxWidth: "1330px", margin: "0 auto" }}>
                                <div style={{ textAlign: "center" }}>
                                    <Typography variant="p"
                                        style={{
                                            color: 'var(--jakartasatu-biru)',
                                            textAlign: "center",
                                            fontSize: "36px",
                                            fontWeight: "800",
                                        }}>
                                        Prestasi
                                    </Typography>
                                    <Divider
                                        style={{
                                            margin: '15px auto 50px auto',
                                            backgroundColor: 'var(--jakartasatu-biru)',
                                            height: 5,
                                            width: '75px',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </div>
                                {isMobile900 ? (
                                    <Carousel
                                        autoPlay={true}
                                        showIndicators={true}
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
                                                    style={{ ...arrowStyles, left: "0", top: "37%" }}
                                                />
                                            )
                                        }
                                        renderArrowNext={(onClickHandler, hasNext, label) =>
                                            hasNext && (
                                                <KeyboardArrowRightRoundedIcon
                                                    type="button"
                                                    onClick={onClickHandler}
                                                    title={label}
                                                    style={{ ...arrowStyles, right: "0", top: "37%" }}
                                                />
                                            )
                                        }
                                        renderIndicator={(onClickHandler, isSelected, index, label) => {
                                            if (isSelected) {
                                                return (
                                                    <li
                                                        style={{ ...indicatorStyles, background: '#003577' }}
                                                        aria-label={`Selected: ${label} ${index + 1}`}
                                                        title={`Selected: ${label} ${index + 1}`}
                                                    />
                                                );
                                            }
                                            return (
                                                <li
                                                    style={indicatorStyles}
                                                    onClick={onClickHandler}
                                                    onKeyDown={onClickHandler}
                                                    value={index}
                                                    key={index}
                                                    role="button"
                                                    tabIndex={0}
                                                    title={`${label} ${index + 1}`}
                                                    aria-label={`${label} ${index + 1}`}
                                                />
                                            );
                                        }}>
                                        {prestasiList.map((item, idx) => (
                                            <div key={idx} style={{ display: "flex", justifyContent: "center", height: "550px", }}>
                                                <Card elevation={0}
                                                    sx={{
                                                        margin: "0 28px",
                                                        // padding: "18px 20px",
                                                        padding: "0 10px 5px 10px",
                                                        // width: "330px",
                                                        height: "442px",
                                                        borderRadius: "20px",
                                                        boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                                                    }}>
                                                    <CardContent sx={{ textAlign: "left" }}>
                                                        <Typography variant="p"
                                                            sx={{
                                                                color: 'var(--jakartasatu-biru)',
                                                                fontSize: "18px",
                                                                fontWeight: "600",
                                                                lineHeight: "160%",
                                                            }}>
                                                            {item.judul}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardMedia sx={{ padding: "10px 0", }}>
                                                        {item.gambar && (
                                                            <img
                                                                style={{
                                                                    maxWidth: "265px",
                                                                    maxHeight: "122px",
                                                                    backgroundPosition: "center",
                                                                    objectFit: "cover",
                                                                    objectPosition: "right",
                                                                    aspectRatio: "1/1",
                                                                    boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                                }}
                                                                alt="" src={item.gambar} />
                                                        )}
                                                    </CardMedia>
                                                    <CardContent sx={{ textAlign: "left" }}>
                                                        <Typography variant="p"
                                                            sx={{
                                                                color: "rgba(0, 0, 0, 0.80)",
                                                                textAlign: "left",
                                                                fontSize: "14px",
                                                                fontWeight: "400",
                                                                lineHeight: "180%",
                                                                letterSpacing: "-0.266px",

                                                                display: "-webkit-box",
                                                                WebkitBoxOrient: "vertical",
                                                                WebkitLineClamp: 6,
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                            dangerouslySetInnerHTML={{ __html: item.deskripsi }} >
                                                        </Typography>
                                                        {/* <Typography variant="p"
                                                            sx={{
                                                                color: "rgba(0, 0, 0, 0.80)",
                                                                textAlign: "left",
                                                                fontSize: "14px",
                                                                fontWeight: "400",
                                                                lineHeight: "180%",
                                                                letterSpacing: "-0.266px",
                                                            }}
                                                            dangerouslySetInnerHTML={{ __html: item.desc.slice(0, 200) + (item.desc.length > 200 ? "... " : "") }} >
                                                        </Typography> */}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <Carousel
                                        autoPlay={true}
                                        showIndicators={true}
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
                                                    style={{ ...arrowStyles, left: "0", top: "35%" }}
                                                />
                                            )
                                        }
                                        renderArrowNext={(onClickHandler, hasNext, label) =>
                                            hasNext && (
                                                <KeyboardArrowRightRoundedIcon
                                                    type="button"
                                                    onClick={onClickHandler}
                                                    title={label}
                                                    style={{ ...arrowStyles, right: "0", top: "35%" }}
                                                />
                                            )
                                        }
                                        renderIndicator={(onClickHandler, isSelected, index, label) => {
                                            if (isSelected) {
                                                return (
                                                    <li
                                                        style={{ ...indicatorStyles, background: '#003577' }}
                                                        aria-label={`Selected: ${label} ${index + 1}`}
                                                        title={`Selected: ${label} ${index + 1}`}
                                                    />
                                                );
                                            }
                                            return (
                                                <li
                                                    style={indicatorStyles}
                                                    onClick={onClickHandler}
                                                    onKeyDown={onClickHandler}
                                                    value={index}
                                                    key={index}
                                                    role="button"
                                                    tabIndex={0}
                                                    title={`${label} ${index + 1}`}
                                                    aria-label={`${label} ${index + 1}`}
                                                />
                                            );
                                        }}>
                                        {chunkedData.map((chunk, idx) => (
                                            <div key={idx} style={{ display: "flex", justifyContent: "center", height: "633px", paddingLeft: "4%", paddingRight: "4%", }}>
                                                {chunk.map((item, idxInGroup) => (
                                                    <Card key={idxInGroup} elevation={0}
                                                        sx={{
                                                            margin: "0 40px",
                                                            padding: "18px 20px",
                                                            width: "330px",
                                                            height: "465px",
                                                            width: "calc(33% - 30px)",
                                                            borderRadius: "20px",
                                                            boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.10)",
                                                        }}>
                                                        <CardContent sx={{ textAlign: "left" }}>
                                                            <Typography variant="p"
                                                                sx={{
                                                                    color: 'var(--jakartasatu-biru)',
                                                                    fontSize: "18px",
                                                                    fontWeight: "600",
                                                                    lineHeight: "160%",
                                                                }}>
                                                                {item.judul}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardMedia sx={{ padding: "10px 0", }}>
                                                            {item.gambar && (
                                                                <img
                                                                    style={{
                                                                        maxWidth: "265px",
                                                                        maxHeight: "122px",
                                                                        backgroundPosition: "center",
                                                                        objectFit: "cover",
                                                                        objectPosition: "right",
                                                                        aspectRatio: "1/1",
                                                                        boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                                    }}
                                                                    alt="" src={item.gambar} />
                                                            )}
                                                        </CardMedia>
                                                        <CardContent sx={{ textAlign: "left" }}>
                                                            <Typography variant="p"
                                                                sx={{
                                                                    color: "rgba(0, 0, 0, 0.80)",
                                                                    textAlign: "left",
                                                                    fontSize: "14px",
                                                                    fontWeight: "400",
                                                                    lineHeight: "180%",
                                                                    letterSpacing: "-0.266px",
                                                                }}
                                                                dangerouslySetInnerHTML={{ __html: item.deskripsi }} >
                                                            </Typography>
                                                            {/* <Typography variant="p"
                                                                sx={{
                                                                    color: "rgba(0, 0, 0, 0.80)",
                                                                    textAlign: "left",
                                                                    fontSize: "14px",
                                                                    fontWeight: "400",
                                                                    lineHeight: "180%",
                                                                    letterSpacing: "-0.266px",
                                                                }}
                                                                dangerouslySetInnerHTML={{ __html: item.desc.slice(0, 150) + (item.desc.length > 150 ? "... " : "") }} >
                                                            </Typography> */}
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        ))}
                                    </Carousel>
                                )}
                            </section>
                            <section style={{ width: "100%", maxWidth: "1330px", margin: "0 auto" }}>
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
                                <Divider
                                    style={{
                                        margin: '15px auto 50px auto',
                                        backgroundColor: 'var(--jakartasatu-biru)',
                                        height: 5,
                                        width: '75px',
                                        borderRadius: '4px',
                                    }}
                                />
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
                                                style={{ ...arrowStyles, left: "0" }}
                                            />
                                        )
                                    }
                                    renderArrowNext={(onClickHandler, hasNext, label) =>
                                        hasNext && (
                                            <KeyboardArrowRightRoundedIcon
                                                type="button"
                                                onClick={onClickHandler}
                                                title={label}
                                                style={{ ...arrowStyles, right: "0" }}
                                            />
                                        )
                                    }
                                >
                                    {newsList.map((step, index) => (
                                        <Grid key={index}
                                            container
                                            spacing={{ xs: 3, sm: 6 }}
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="stretch"
                                            sx={{
                                                paddingLeft: "7%",
                                                paddingRight: "7%",
                                            }}>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                <CardMedia component='div' sx={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                                                    <img
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            backgroundColor: "grey",
                                                        }}
                                                        alt="" src={step.source_image} />
                                                </CardMedia>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                                <Link id="btnBeritaCarouselNews" href={`/informasi/berita/${step.slug}`}
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
                                                            fontSize: isMobile ? "22px" : "26px",
                                                            fontWeight: 500,
                                                            lineHeight: "160%",
                                                            letterSpacing: "0.039px",
                                                            mb: 1,

                                                            display: "-webkit-box",
                                                            WebkitBoxOrient: "vertical",
                                                            WebkitLineClamp: isMobileHeight ? 2 : 4,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}>{step.title}</Typography>
                                                        <Typography variant="p" paragraph sx={{
                                                            fontSize: isMobile ? "14px" : "16px",
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
                            <section className={styles.container} style={{ maxWidth: "1187px", margin: "0 auto", display: "flex", }}>
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
                                                margin: '15px auto 0 auto',
                                                backgroundColor: 'var(--jakartasatu-biru)',
                                                height: 5,
                                                width: '75px',
                                                borderRadius: '4px',
                                            }}
                                        />
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
                                    {displayedItems.map((news, i) => (
                                        <Card key={i} elevation={0} square={true} sx={{ background: "none" }}>
                                            <Link id="btnBeritaSemuaBerita" href={`/informasi/berita/${news.slug}`}
                                                sx={{
                                                    padding: "20px",
                                                    borderRadius: "36px",

                                                }}>
                                                <CardActionArea
                                                    sx={{
                                                        padding: "20px",
                                                        borderRadius: "36px",

                                                    }}>
                                                    <CardMedia component='div' sx={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                                                        {news.source_image && (
                                                            <img
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit: "cover",
                                                                    position: "absolute",
                                                                    top: 0,
                                                                    left: 0,
                                                                    backgroundColor: "grey",
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
                                                            fontSize: i === 0 ? isMobile900 ? "16px" : "21px" : "16px",
                                                            fontWeight: 500,
                                                            lineHeight: "171.3%",
                                                            letterSpacing: "0.024px",
                                                            mb: 1
                                                        }}>{news.title}</Typography>
                                                        <Typography variant="p" paragraph sx={{
                                                            color: "rgba(0, 0, 0, 0.70)",
                                                            fontSize: i === 0 ? isMobile900 ? "12px" : "16px" : "12px",
                                                            fontWeight: "400",
                                                            mb: 1
                                                        }}>{news.created_at}</Typography>
                                                        <Typography variant="p" paragraph sx={{
                                                            fontSize: i === 0 ? isMobile900 ? "12px" : "16px" : "12px",
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
                                            </Link>
                                        </Card>
                                    ))}
                                </Box>
                                {totalPages > 1 && (
                                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                                        <Pagination
                                            count={totalPages}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            color="primary"
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                // marginTop: "30px"
                                            }}
                                            renderItem={(item) => (
                                                <PaginationItem
                                                    slots={{ previous: KeyboardArrowLeftRoundedIcon, next: KeyboardArrowRightRoundedIcon }}
                                                    {...item}
                                                    sx={{
                                                        margin: "0 10px",
                                                        fontFamily: 'var(--font-family)',
                                                        color: "rgba(0, 0, 0, 0.70)",
                                                        fontSize: "19px",
                                                        fontWeight: "400",
                                                        lineHeight: "165%",
                                                        letterSpacing: "0.029px",
                                                        borderRadius: "10px",

                                                        "&.Mui-selected": {
                                                            background: "#565656",
                                                            color: "white",
                                                            borderRadius: "10px"
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </Box>
                                )}
                            </section>

                            <Footer />
                        </motion.div>
                    </>
                )}
            </main>
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default berita;