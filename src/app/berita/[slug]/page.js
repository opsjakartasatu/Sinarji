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
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Typography,
    useMediaQuery
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { useEffect, useState } from "react";

import { useParams, useRouter } from 'next/navigation';

function detailBerita() {
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 899px)");

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
        { label: "Berita", href: "/berita" },
        { label: "Detail Berita" }
    ];

    const { slug } = useParams();

    const [newsLatest, setnewsLatest] = useState([]);
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        document.title = "Detail Berita | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const getLatestList = async () => {
            const response = await axios.get(
                process.env.API_DEV + `/v4/news/${slug}`
            );
            // console.log(response)
            const newsLatest = response.data.data;
            setnewsLatest(newsLatest);
        };
        getLatestList();
    }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getNewsList = async () => {
            // Ambil data berita terbaru untuk mendapatkan category_slug
            const latestResponse = await axios.get(
                process.env.API_DEV + `/v4/news/${slug}`
            );
            const latestNews = latestResponse.data.data;
            const categorySlug = latestNews.category.slug;

            // Ambil daftar berita dengan category_slug yang sama
            const response = await axios.get(
                process.env.API_DEV + "/v4/news/"
            );
            const beritaTerbaru = response.data.data.items;

            // Filter berita yang tidak ada di berita terbaru yang sedang ditampilkan
            const filteredNews = beritaTerbaru.filter(news => news.category.slug === categorySlug && news.slug !== latestNews.slug);
            const beritaTerbaruBaru = filteredNews.slice(0, 4);

            setNewsList(beritaTerbaruBaru);
        };
        getNewsList();
    }, [slug, newsLatest]);

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
                    <div className={styles.container}
                        style={{
                            marginTop: "80px",
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center"
                        }}>
                        <section style={{ width: "90vw", maxWidth: "1260px" }}>
                            <Grid container
                                spacing={isMobile ? 5 : 1}
                                justifyContent="space-between"
                                sx={{ maxWidth: "1500px" }}>
                                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                                    <CardMedia>
                                        <img
                                            style={{
                                                width: "100%",
                                                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                                backgroundColor: "grey",
                                            }} src={newsLatest.source_image} alt='' />
                                    </CardMedia>
                                    <Box sx={{ textAlign: "left", marginTop: "30px" }}>
                                        <Typography variant="p" paragraph sx={{
                                            fontSize: "14px",
                                            color: "rgba(0, 0, 0, 0.40)",
                                            mb: 2,
                                        }}>{newsLatest.created_at}</Typography>
                                        <Typography variant="p" paragraph sx={{
                                            fontSize: "26px",
                                            fontWeight: 500,
                                            color: 'var(--jakartasatu-biru)',
                                        }}>{newsLatest.title}</Typography>
                                    </Box>
                                    <Typography variant="p" paragraph
                                        sx={{
                                            fontSize: "16px",
                                            color: "rgba(0, 0, 0, 0.80)",
                                            textAlign: "justify",
                                            lineHeight: "195.3%",
                                        }}
                                        dangerouslySetInnerHTML={{ __html: newsLatest.content }}></Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                                    <Divider orientation={isMobile ? "horizontal" : "vertical"} variant="middle"
                                        sx={{
                                            display: "inline-block",
                                            justifyContent: "center",
                                        }} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                    <Box>
                                        <div style={{ margin: "0 -10px" }}>
                                            <Typography variant="p"
                                                style={{
                                                    color: "black",
                                                    fontSize: "24px",
                                                    fontWeight: "500",
                                                    lineHeight: "171.3%",
                                                    letterSpacing: "0.036px",
                                                }}>
                                                Berita Terkait
                                            </Typography>
                                        </div>
                                        <Divider
                                            style={{
                                                margin: '15px auto 35px auto',
                                                backgroundColor: 'var(--jakartasatu-biru)',
                                                height: 3,
                                                width: '138px',
                                                borderRadius: '5px',
                                            }}
                                        />
                                        <Grid container
                                            direction={{ xs: "row", sm: "row", md: "column" }}
                                            spacing={isMobile ? 2 : 4}
                                            justifyContent="space-between">
                                            {newsList.map((news) => (
                                                <Grid item key={news.slug} xs={6} sm={6} md={2} lg={2} xl={2}>
                                                    <Card elevation={0} square={true} sx={{ background: "none" }}>
                                                        <CardActionArea id="btnDetailBeritaOtherNews" href={`/berita/${news.slug}`} disableRipple>
                                                            <CardMedia sx={{ mb: -1 }}>
                                                                {news.source_image && (
                                                                    <img
                                                                        style={{
                                                                            maxWidth: "100%",
                                                                            height: "auto",
                                                                            backgroundColor: "grey"
                                                                        }}
                                                                        alt="" src={news.source_image} />
                                                                )}
                                                            </CardMedia>
                                                            <CardContent
                                                                sx={{
                                                                    textAlign: "left",
                                                                    marginLeft: "-14px",
                                                                    marginRight: "-14px"
                                                                }}>
                                                                <Typography variant="p" paragraph sx={{
                                                                    fontSize: isMobile ? "12px" : "14px",
                                                                    lineHeight: "185.5%",
                                                                    fontWeight: 500,
                                                                    mb: 1,
                                                                    display: "-webkit-box",
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    WebkitLineClamp: 2
                                                                }}>{news.title}</Typography>
                                                                <Typography variant="p" paragraph sx={{
                                                                    fontSize: isMobile ? "10px" : "12px",
                                                                    textAlign: "justify",
                                                                    hyphens: "auto",
                                                                    webkitHyphens: "auto",
                                                                    lineHeight: "195.3%",
                                                                    display: "-webkit-box",
                                                                    WebkitBoxOrient: "vertical",
                                                                    overflow: "hidden",
                                                                    WebkitLineClamp: 4
                                                                }}>{news.short_content}</Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </section>
                    </div>

                    <Footer />
                </motion.div >
            </main >
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default detailBerita;