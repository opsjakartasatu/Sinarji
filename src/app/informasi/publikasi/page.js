"use client"

import { motion } from 'framer-motion';

import styles from "../../../components/page.module.css";

import Navbar from '../../../components/navbar/navbar';
import "../../../components/navbar/style.css";
import Footer from '../../../components/footer/footer';
import ScrollTop from '../../../components/scrollTop';
import KritikSaran from '../../../components/kritikSaran';
import Breadcrumbs from '../../../components/breadcrumbs';

import PropTypes from 'prop-types';

import { useEffect, useState } from "react";
import { Box, Button, Card, Tab, Tabs, Typography, useMediaQuery, useTheme, Select, MenuItem, CircularProgress, OutlinedInput, IconButton, Stack, InputAdornment, Pagination, PaginationItem } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import axios from "axios";
import CustomImage from '@/components/CustomImage';

function risetPublikasi() {
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
        { label: "Riset & Publikasi" }
    ];

    const [risetList, setRisetList] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        document.title = "Riset | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

    useEffect(() => {
        const getRisetList = async () => {
            const response = await axios.get("../api/riset");
            let newsLatest = response.data;

            newsLatest = newsLatest.sort((a, b) => (b.Gubernur100Hari === true) - (a.Gubernur100Hari === true));

            setRisetList(newsLatest);
        };

        getRisetList();
    }, []);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const filteredRisetList = risetList.filter((event) =>
        event.namaData.toLowerCase().includes(search.toLowerCase())
    );

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const paginatedRisetList = filteredRisetList.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
                            <CustomImage
                                src="/assets/Partikel-1.png"
                                alt="Gambar"
                                draggable={false}
                                width={0}
                                height={0}
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
                                }}
                            />
                            <Grid container
                                spacing={4}
                                direction={isMobile ? "column" : "row"}
                                justifyContent="center"
                                alignItems="flex-start">
                                <Grid xs={12} sm={12} md={6} lg={6} xl={5.5}>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <CustomImage
                                            src='/assets/riset-welcome.png'
                                            priority={true}
                                            alt="Gambar"
                                            draggable={false}
                                            width={0}
                                            height={0}
                                            style={{
                                                userDrag: "none",
                                                userSelect: "none",

                                                width: "100%",
                                                maxWidth: isMobile ? '350px' : '479px',
                                                height: 'auto',
                                            }}
                                        />
                                    </div>
                                </Grid>
                                <Grid xs={12} sm={12} md={6} lg={6} xl={6.5}>
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
                                    value={search}
                                    onChange={handleSearchChange}
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ margin: "0 10px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M9.91582 0.351563C8.33451 0.351697 6.77617 0.729987 5.37079 1.45487C3.96541 2.17976 2.75376 3.23022 1.83693 4.51861C0.920099 5.807 0.324668 7.29597 0.100316 8.86128C-0.124036 10.4266 0.0291973 12.0229 0.547231 13.5169C1.06526 15.011 1.93308 16.3595 3.07827 17.4499C4.22346 18.5404 5.61281 19.3411 7.13042 19.7854C8.64803 20.2297 10.2499 20.3047 11.8023 20.004C13.3548 19.7033 14.8128 19.0357 16.0548 18.0569L20.3155 22.3176C20.5355 22.5301 20.8302 22.6477 21.1361 22.645C21.442 22.6424 21.7346 22.5197 21.9509 22.3034C22.1673 22.087 22.29 21.7944 22.2926 21.4885C22.2953 21.1826 22.1777 20.8879 21.9652 20.6679L17.7045 16.4072C18.8572 14.945 19.5748 13.1877 19.7754 11.3366C19.976 9.48545 19.6514 7.61525 18.8388 5.94C18.0261 4.26476 16.7582 2.85214 15.1802 1.86383C13.6022 0.87552 11.7778 0.351437 9.91582 0.351563ZM2.33249 10.2682C2.33249 8.257 3.13145 6.32815 4.5536 4.906C5.97575 3.48385 7.9046 2.6849 9.91582 2.6849C11.927 2.6849 13.8559 3.48385 15.2781 4.906C16.7002 6.32815 17.4992 8.257 17.4992 10.2682C17.4992 12.2795 16.7002 14.2083 15.2781 15.6305C13.8559 17.0526 11.927 17.8516 9.91582 17.8516C7.9046 17.8516 5.97575 17.0526 4.5536 15.6305C3.13145 14.2083 2.33249 12.2795 2.33249 10.2682Z" fill="var(--jakartasatu-biru)" />
                                            </svg>
                                        </InputAdornment>
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
                                spacing={{ xs: 2.5, sm: 5 }}
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch">
                                {paginatedRisetList.map((event, i) => (
                                    <Grid key={i} xs={12} sm={12} md={6} lg={6} xl={6} sx={{ position: "relative", display: "flex" }}>
                                        <Link href={event.link} target='_blank' style={{ width: "100%", display: "flex", flexGrow: 1 }}>
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    position: "relative",
                                                    background: "white",
                                                    display: 'flex',
                                                    width: "100%",
                                                    height: "100%",
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    borderRadius: "10px",
                                                    boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                                    padding: { xs: "8px 20px", sm: "8px 20px", md: "8px 20px", lg: "8px 30px", xl: "8px 30px" },
                                                    transition: 'transform 0.2s ease-in-out',

                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
                                                    }
                                                }}
                                            >
                                                {event.Gubernur100Hari === true && (
                                                    <Typography variant='p' sx={{
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 0,
                                                        margin: 0,
                                                        padding: "5px 12px",
                                                        borderRadius: { xs: "0px 10px 0px 0px", sm: "0px 10px", md: "0px 10px", lg: "0px 10px", xl: "0px 10px" },
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",

                                                        width: "100%",
                                                        maxWidth: { xs: "100%", sm: "120px", md: "120px", lg: "120px", xl: "120px" },
                                                        height: "50px",
                                                        background: "#00AEEF",
                                                        color: "white",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                        fontWeight: "700",
                                                        lineHeight: "15px",
                                                        zIndex: 10,

                                                    }}>
                                                        Program 100 Hari Gubernur
                                                    </Typography>
                                                )}
                                                <Grid container
                                                    spacing={{ xs: 2, sm: 2 }}
                                                    direction="row"
                                                    justifyContent="center"
                                                    alignItems="flex-start"
                                                    sx={{ width: "100%", height: "100%", margin: "auto" }}>
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Stack
                                                            direction="row"
                                                            justifyContent="flex-start"
                                                            alignItems="center"
                                                            spacing={3}
                                                            sx={{ paddingTop: event.Gubernur100Hari === true ? { xs: "50px", sm: 0, md: 0 } : "" }}>
                                                            <CustomImage
                                                                src="/assets/riset-icon-grid.png"
                                                                priority={true}
                                                                alt="Gambar"
                                                                draggable={false}
                                                                width={0}
                                                                height={0}
                                                                style={{
                                                                    userDrag: "none",
                                                                    userSelect: "none",

                                                                    width: "auto",
                                                                    maxWidth: "100%",
                                                                    height: "100%",
                                                                    maxHeight: "70px",
                                                                }}
                                                            />
                                                            <Stack
                                                                direction="column"
                                                                spacing={1}
                                                                justifyContent="space-between"
                                                                alignItems="flex-start"
                                                                sx={{ width: "100%" }}>
                                                                <Box sx={{ width: event.Gubernur100Hari ? { xs: "100%", sm: "calc(100% - 100px)", md: "calc(100% - 10   0px)" } : "100%" }}>
                                                                    <Typography variant="p" gutterBottom
                                                                        sx={{
                                                                            color: 'var(--jakartasatu-biru)',
                                                                            fontSize: { xs: "18px", sm: "18px" },
                                                                            fontWeight: "700",
                                                                            lineHeight: "34px",
                                                                            // marginRight: event.Gubernur100Hari === true ? "-6vw" : null
                                                                        }}>
                                                                        {event.namaData}
                                                                    </Typography>
                                                                </Box>
                                                                <Stack
                                                                    direction={{ xs: "column", sm: "row", md: "column", lg: "row", xl: "row" }}
                                                                    justifyContent="space-between"
                                                                    alignItems="flex-start"
                                                                    sx={{ width: "100%" }}>
                                                                    <Typography variant="p"
                                                                        sx={{
                                                                            color: 'var(--jakartasatu-biru)',
                                                                            fontSize: { xs: "14px", sm: "14px" },
                                                                            fontWeight: "500",
                                                                            lineHeight: "30px",
                                                                        }}>
                                                                        Penerbit: {event.penerbit}
                                                                    </Typography>
                                                                    {event.tanggalTerbit && (
                                                                        <Stack
                                                                            direction="row"
                                                                            spacing={1}
                                                                            justifyContent="space-between"
                                                                            alignItems="center">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 1 25 24" fill="none">
                                                                                <path d="M19.5 6H5.5C4.39543 6 3.5 6.89543 3.5 8V19C3.5 20.1046 4.39543 21 5.5 21H19.5C20.6046 21 21.5 20.1046 21.5 19V8C21.5 6.89543 20.6046 6 19.5 6Z" stroke="#F7941D" strokeWidth="2" />
                                                                                <path d="M3.5 10C3.5 8.114 3.5 7.172 4.086 6.586C4.672 6 5.614 6 7.5 6H17.5C19.386 6 20.328 6 20.914 6.586C21.5 7.172 21.5 8.114 21.5 10H3.5Z" fill="#F7941D" />
                                                                                <path d="M7.5 3V6M17.5 3V6" stroke="#F7941D" strokeWidth="2" strokeLinecap="round" />
                                                                            </svg>
                                                                            <Typography variant="p"
                                                                                sx={{
                                                                                    color: 'var(--jakartasatu-orange)',
                                                                                    fontSize: { xs: "14px", sm: "14px" },
                                                                                    fontWeight: "700",
                                                                                    lineHeight: "30px",
                                                                                }}>
                                                                                {event.tanggalTerbit}
                                                                            </Typography>
                                                                        </Stack>
                                                                    )}
                                                                </Stack>
                                                            </Stack>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Stack
                                                            direction="column"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                            spacing={1.5}>
                                                            <Typography variant="p" gutterBottom
                                                                sx={{
                                                                    color: 'rgba(0, 0, 0, 0.70)',
                                                                    fontSize: { xs: "14px", sm: "14px" },
                                                                    fontWeight: "500",
                                                                    lineHeight: "185.023%",
                                                                    textAlign: "justify"
                                                                }}>
                                                                {event.deskripsi}
                                                            </Typography>

                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                            <Pagination
                                count={Math.ceil(filteredRisetList.length / itemsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                shape="rounded"
                                variant="text"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "50px"
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

export default risetPublikasi;