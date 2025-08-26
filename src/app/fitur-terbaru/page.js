"use client"

import { motion } from 'framer-motion';

import styles from "../../components/page.module.css";

import Navbar from '../../components/navbar/navbar';
import "../../components/navbar/style.css";
import Footer from '../../components/footer/footer';
import ScrollTop from '../../components/scrollTop';
import KritikSaran from '../../components/kritikSaran';
import Breadcrumbs from '../../components/breadcrumbs';

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import WebAssetRoundedIcon from '@mui/icons-material/WebAssetRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import { Box, Button, Card, CardContent, CardMedia, Divider, Menu, MenuItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from '@/components/CustomImage';
import axios from 'axios';

function FiturTerbaru() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobile600 = useMediaQuery(theme.breakpoints.down("600"));
    const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
    const isMobile900 = useMediaQuery(theme.breakpoints.down("md"));

    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Fitur Terbaru" }
    ];

    const [whatsNewList, setWhatsNewList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState('Terbaru');

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
        margin: '10px 6px',
        cursor: 'pointer',
        boxShadow: "0px 8px 25px 0px rgba(0, 0, 0, 0.15)",
    };

    useEffect(() => {
        document.title = "Whats New | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const getWhatsNewList = async () => {
            const response = await axios.get(
                // "./api/whats_new"
                process.env.API_WEB + "/whats-new"
            );
            const newsLatest = response.data.data;

            setWhatsNewList(newsLatest);
        };

        getWhatsNewList();
    }, []);

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const filteredList = selectedCategory === "All"
        ? whatsNewList
        : whatsNewList.filter(item => item.kategori.toLowerCase() === selectedCategory.toLowerCase());

    const sortByDate = (list, order) => {
        return [...list].sort((a, b) => {
            const dateA = new Date(a.tanggal);
            const dateB = new Date(b.tanggal);
            return order === 'Terbaru' ? dateB - dateA : dateA - dateB;
        });
    };

    const toggleSortOrder = () => {
        setSortOrder(prev => (prev === 'Terlama' ? 'Terbaru' : 'Terlama'));
    };

    const [currentIndex, setCurrentIndex] = useState(0);

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
                    <div className={styles.container}>
                        <section style={{ width: "90vw", maxWidth: "1200px", paddingTop: "50px" }}>
                            <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={1}>
                                <Typography variant="p"
                                    style={{
                                        color: 'var(--jakartasatu-biru)',
                                        textAlign: "center",
                                        fontSize: "36px",
                                        fontWeight: "800",
                                    }}>
                                    Fitur Terbaru
                                </Typography>
                            </Stack>
                            <Divider
                                style={{
                                    margin: '15px auto 10px auto',
                                    backgroundColor: 'var(--jakartasatu-biru)',
                                    height: 5,
                                    width: '75px',
                                    borderRadius: '4px',
                                }}
                            />
                            <Stack
                                direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
                                justifyContent="space-between"
                                alignItems="flex-start"
                                spacing={2}
                                sx={{ marginTop: "100px" }}>
                                <Box sx={{ width: "100%", maxWidth: "670px" }}>
                                    <Typography variant="p" paragraph
                                        style={{
                                            color: "rgba(0, 0, 0, 0.70)",
                                            textAlign: "justify",
                                            fontSize: isMobile ? "14px" : "16px",
                                            fontWeight: "500",
                                            lineHeight: "35px"
                                        }}>
                                        Temukan pembaruan dan peningkatan terbaru pada platform Jakarta Satu. Mulai dari fitur baru, penyempurnaan antarmuka, hingga perbaikan performa untuk pengalaman yang lebih cepat dan mudah.
                                    </Typography>
                                </Box>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}>
                                    <Button
                                        id="demo-customized-button"
                                        aria-controls={open ? 'demo-customized-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        variant="contained"
                                        onClick={handleClick}
                                        endIcon={
                                            open ? (
                                                <KeyboardArrowUpRoundedIcon sx={{ fontSize: "20px" }} />
                                            ) : (
                                                <KeyboardArrowDownRoundedIcon sx={{ fontSize: "20px" }} />
                                            )
                                        }
                                        sx={{
                                            height: "43px",
                                            minWidth: "130px",
                                            borderRadius: "30px",
                                            backgroundColor: "var(--jakartasatu-biru)",

                                            fontFamily: "inherit",
                                            textTransform: "none",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            letterSpacing: "-0.304px",
                                        }}
                                    >
                                        {selectedCategory === "All" ? "Kategori" : selectedCategory}
                                    </Button>
                                    <Button onClick={toggleSortOrder} variant="contained" disableElevation disableRipple disableTouchRipple startIcon={<UnfoldMoreRoundedIcon />}
                                        sx={{
                                            height: "43px",
                                            minWidth: "185px",
                                            borderRadius: "30px",
                                            backgroundColor: "var(--jakartasatu-biru)",

                                            fontFamily: "inherit",
                                            textTransform: "none",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            letterSpacing: "-0.304px",
                                        }}>
                                        Urutkan: {sortOrder === 'Terbaru' ? 'Terbaru' : 'Terlama'}
                                    </Button>
                                </Stack>
                                <Menu
                                    elevation={0}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    sx={{
                                        '& .MuiPaper-root': {
                                            borderRadius: "20px",
                                            marginTop: theme.spacing(1),
                                            minWidth: 170,
                                            color: 'rgb(55, 65, 81)',
                                            boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.25)',

                                            '& .MuiMenu-list': {
                                                padding: '10px',
                                            },
                                            '& .MuiMenuItem-root': {
                                                gap: "10px",
                                                color: "rgba(0, 0, 0, 0.70)",
                                                fontFamily: "inherit",
                                                fontSize: "16px",
                                                fontWeight: "500",

                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 20,
                                                    marginRight: 1.5,
                                                },
                                            },
                                        }
                                    }}>
                                    <MenuItem onClick={() => { setSelectedCategory("All"); handleClose(); }}
                                        disableRipple
                                        selected={selectedCategory === "All"}
                                        sx={{
                                            borderRadius: "10px",
                                            height: "43px",
                                            transition: 'background 0.3s ease, transform 0.3s ease',

                                            "&.Mui-selected": {
                                                background: selectedCategory === "All" ? 'var(--jakartasatu-orange)' : '',

                                                '& .svg-icon path': {
                                                    fill: 'white',
                                                    stroke: 'white',
                                                },
                                                '& .MuiTypography-root': {
                                                    color: 'white',
                                                },

                                                '&:hover': {
                                                    background: 'var(--jakartasatu-orange)',
                                                    '& .svg-icon path': {
                                                        fill: 'white',
                                                        stroke: 'white',
                                                    },
                                                    '& .MuiTypography-root': {
                                                        color: 'white',
                                                    },
                                                },
                                            },

                                            '&:hover': {
                                                background: 'var(--jakartasatu-orange)',
                                                // transform: 'scale(1.05)',
                                                '& .svg-icon path': {
                                                    fill: 'white',
                                                    stroke: 'white',
                                                },
                                                '& .MuiTypography-root': {
                                                    color: selectedCategory === "All" ? 'white' : 'white',
                                                },
                                            },
                                        }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            gap={1.5}>
                                            <svg className="svg-icon" fill="#003577" width="19" height="19" viewBox="1 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#003577" strokeWidth="0.96"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>border-all</title> <path d="M29 1.75h-26c-0.69 0-1.25 0.56-1.25 1.25v0 26c0 0.69 0.56 1.25 1.25 1.25h26c0.69-0.001 1.249-0.56 1.25-1.25v-26c-0-0.69-0.56-1.25-1.25-1.25h-0zM27.75 14.75h-10.5v-10.5h10.5zM14.75 4.25v10.5h-10.5v-10.5zM4.25 17.25h10.5v10.5h-10.5zM17.25 27.75v-10.5h10.5v10.5z"></path> </g></svg>
                                            <Typography variant='p'>
                                                Semua
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem onClick={() => { setSelectedCategory("Website"); handleClose(); }}
                                        disableRipple
                                        selected={selectedCategory === "Website"}
                                        sx={{
                                            borderRadius: "10px",
                                            height: "43px",
                                            transition: 'background 0.3s ease, transform 0.3s ease',

                                            "&.Mui-selected": {
                                                background: selectedCategory === "Website" ? 'var(--jakartasatu-orange)' : '',

                                                '& .svg-icon path': {
                                                    fill: 'var(--jakartasatu-orange)',
                                                    stroke: 'white',
                                                },
                                                '& .MuiTypography-root': {
                                                    color: 'white'
                                                },

                                                '&:hover': {
                                                    background: 'var(--jakartasatu-orange)',
                                                    '& .svg-icon path': {
                                                        fill: 'var(--jakartasatu-orange)',
                                                        stroke: 'white',
                                                    },
                                                    '& .MuiTypography-root': {
                                                        color: 'white'
                                                    },
                                                },
                                            },

                                            '&:hover': {
                                                background: 'var(--jakartasatu-orange)',
                                                // transform: 'scale(1.05)',
                                                '& .svg-icon path': {
                                                    fill: 'var(--jakartasatu-orange)',
                                                    stroke: 'white',
                                                },
                                                '& .MuiTypography-root': {
                                                    color: 'white'
                                                },
                                            },
                                        }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            gap={1.5}>
                                            <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                                <path d="M17 6.83301V16.6108C17 16.8465 16.9064 17.0726 16.7397 17.2393C16.573 17.406 16.3469 17.4997 16.1111 17.4997H1.88889C1.65314 17.4997 1.42705 17.406 1.26035 17.2393C1.09365 17.0726 1 16.8465 1 16.6108V6.83301" stroke="#003577" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M1 2.38889C1 2.15314 1.09365 1.92705 1.26035 1.76035C1.42705 1.59365 1.65314 1.5 1.88889 1.5H16.1111C16.3469 1.5 16.573 1.59365 16.7397 1.76035C16.9064 1.92705 17 2.15314 17 2.38889V6.83333H1V2.38889Z" stroke="#003577" strokeWidth="2" strokeLinejoin="round" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.66623 5.0561C3.90198 5.0561 4.12807 4.96245 4.29477 4.79575C4.46147 4.62905 4.55512 4.40296 4.55512 4.16721C4.55512 3.93146 4.46147 3.70537 4.29477 3.53867C4.12807 3.37197 3.90198 3.27832 3.66623 3.27832C3.43048 3.27832 3.20439 3.37197 3.03769 3.53867C2.87099 3.70537 2.77734 3.93146 2.77734 4.16721C2.77734 4.40296 2.87099 4.62905 3.03769 4.79575C3.20439 4.96245 3.43048 5.0561 3.66623 5.0561ZM6.3329 5.0561C6.56865 5.0561 6.79474 4.96245 6.96144 4.79575C7.12814 4.62905 7.22179 4.40296 7.22179 4.16721C7.22179 3.93146 7.12814 3.70537 6.96144 3.53867C6.79474 3.37197 6.56865 3.27832 6.3329 3.27832C6.09715 3.27832 5.87106 3.37197 5.70436 3.53867C5.53766 3.70537 5.44401 3.93146 5.44401 4.16721C5.44401 4.40296 5.53766 4.62905 5.70436 4.79575C5.87106 4.96245 6.09715 5.0561 6.3329 5.0561ZM8.99957 5.0561C9.23531 5.0561 9.46141 4.96245 9.62811 4.79575C9.7948 4.62905 9.88845 4.40296 9.88845 4.16721C9.88845 3.93146 9.7948 3.70537 9.62811 3.53867C9.46141 3.37197 9.23531 3.27832 8.99957 3.27832C8.76382 3.27832 8.53773 3.37197 8.37103 3.53867C8.20433 3.70537 8.11068 3.93146 8.11068 4.16721C8.11068 4.40296 8.20433 4.62905 8.37103 4.79575C8.53773 4.96245 8.76382 5.0561 8.99957 5.0561Z" fill="#003577" />
                                            </svg>
                                            <Typography variant='p'>
                                                Website
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem onClick={() => { setSelectedCategory("Mobile"); handleClose(); }}
                                        disableRipple
                                        selected={selectedCategory === "Mobile"}
                                        sx={{
                                            borderRadius: "10px",
                                            height: "43px",
                                            transition: 'background 0.3s ease, transform 0.3s ease',

                                            "&.Mui-selected": {
                                                background: selectedCategory === "Mobile" ? 'var(--jakartasatu-orange)' : '',

                                                '& .svg-icon path': {
                                                    fill: 'var(--jakartasatu-orange)',
                                                    stroke: 'white',
                                                },
                                                '& .MuiTypography-root': {
                                                    color: 'white'
                                                },

                                                '&:hover': {
                                                    background: 'var(--jakartasatu-orange)',
                                                    '& .svg-icon path': {
                                                        fill: 'var(--jakartasatu-orange)',
                                                        stroke: 'white',
                                                    },
                                                    '& .MuiTypography-root': {
                                                        color: 'white'
                                                    },
                                                },
                                            },

                                            '&:hover': {
                                                background: 'var(--jakartasatu-orange)',
                                                // transform: 'scale(1.05)',
                                                '& .svg-icon path': {
                                                    fill: 'var(--jakartasatu-orange)',
                                                    stroke: 'white',
                                                },
                                                '& .MuiTypography-root': {
                                                    color: 'white'
                                                },
                                            },
                                        }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            gap={1.5}>
                                            <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 14 19" fill="none">
                                                <path d="M10.6362 1.5H3.36346C2.15847 1.5 1.18164 2.47683 1.18164 3.68182V15.3182C1.18164 16.5232 2.15847 17.5 3.36346 17.5H10.6362C11.8412 17.5 12.818 16.5232 12.818 15.3182V3.68182C12.818 2.47683 11.8412 1.5 10.6362 1.5Z" stroke="#003577" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M5.54492 14.5908H8.45401" stroke="#003577" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <Typography variant='p'>
                                                Mobile
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                </Menu>
                            </Stack>
                        </section>
                        <section style={{ width: "90vw", maxWidth: "1200px", paddingTop: "50px" }}>
                            {sortByDate(filteredList, sortOrder).map((whatsNew, i) => (
                                <div key={i}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="flex-start"
                                        spacing={{ xs: 2, sm: 4, md: 10, lg: 12, xl: 10 }}>
                                        <Grid xs={12} sm={12} md={3.7} lg={3.7} xl={3.6}>
                                            <Stack
                                                direction="column"
                                                justifyContent="space-between"
                                                alignItems="space-between"
                                                gap={4}>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    gap={1.5}>
                                                    <Typography variant='p' sx={{
                                                        color: "rgba(0, 0, 0, 0.70)",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                    }}>
                                                        {whatsNew.tanggal}
                                                    </Typography>
                                                    <Typography variant='p' sx={{
                                                        backgroundColor: whatsNew.kategori.toLowerCase() === "website" ? "rgba(0, 53, 119, 0.20)" : "rgba(247, 148, 29, 0.20)",
                                                        color: whatsNew.kategori.toLowerCase() === "website" ? "var(--jakartasatu-biru)" : "var(--jakartasatu-orange)",
                                                        padding: "5px 15px",
                                                        borderRadius: "10px",

                                                        textAlign: "center",
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        letterSpacing: "-0.266px",
                                                    }}>
                                                        {whatsNew.kategori.charAt(0).toUpperCase() + whatsNew.kategori.slice(1)}
                                                    </Typography>
                                                </Stack>
                                                <Typography variant='p' sx={{
                                                    color: "var(--jakartasatu-biru)",
                                                    fontSize: "32px",
                                                    fontWeight: "700",
                                                    lineHeight: "50px",
                                                }}>
                                                    {whatsNew.judul}
                                                </Typography>
                                                {isMobile900 ? null : (
                                                    <>
                                                        {whatsNew.kategori.toLowerCase() === "website" && whatsNew.kategori && (
                                                            <Link href={whatsNew.link} target='_blank'>
                                                                <Button sx={{
                                                                    width: "179px",
                                                                    height: "44px",
                                                                    borderRadius: "40px",
                                                                    background: "var(--jakartasatu-orange)",
                                                                    textTransform: "none",
                                                                    color: "white",
                                                                    fontSize: "18px",
                                                                    fontWeight: 700,
                                                                    lineHeight: "150%",
                                                                    letterSpacing: "-0.342px",
                                                                    '&:hover': {
                                                                        background: 'var(--jakartasatu-orange)',
                                                                    },
                                                                }}>
                                                                    Lihat Detail
                                                                </Button>
                                                            </Link>
                                                        )}
                                                    </>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={8.3} lg={8.3} xl={8.4}>
                                            <Box sx={{
                                                display: whatsNew.kategori.toLowerCase() === "mobile" ? (isMobile600 ? "flex" : "") : "flex",
                                                flexDirection: whatsNew.kategori.toLowerCase() === "mobile" ? (isMobile600 ? "column" : "") : "column"
                                            }}>
                                                {whatsNew.deskripsi.map((descItem, idx) => (
                                                    <>
                                                        <img
                                                            key={idx}
                                                            src={descItem.gambar}
                                                            alt={`Gambar ${idx + 1}`}
                                                            style={{
                                                                float: "left",
                                                                userDrag: "none",
                                                                userSelect: "none",

                                                                // padding: "10px",
                                                                borderRadius: "10px",
                                                                width: 'auto',
                                                                maxWidth: whatsNew.kategori.toLowerCase() === "mobile" ? (isMobile600 ? "250px" : "350px") : "100%",
                                                                height: '100%',
                                                                alignSelf: "center",
                                                                margin: whatsNew.kategori.toLowerCase() === "mobile" ? (isMobile600 ? "0 0 10px 0" : "0 50px 50px 0") : " 0 0 20px 0",
                                                                // marginBottom: "20px",
                                                                filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.15))"
                                                                // boxShadow: "0px 8px 25px 0px rgba(0, 0, 0, 0.15)",
                                                            }}
                                                        />
                                                        {/* <CustomImage
                                                            key={idx}
                                                            src={descItem.gambar}
                                                            alt={`Gambar ${idx + 1}`}
                                                            draggable={false}
                                                            width={0}
                                                            height={0}
                                                            style={{
                                                                float: "left",
                                                                userDrag: "none",
                                                                userSelect: "none",

                                                                // padding: "10px",
                                                                width: 'auto',
                                                                maxWidth: whatsNew.kategori.toLowerCase() === "mobile" ? (isMobile600 ? "250px" : "350px") : "100%",
                                                                height: '100%',
                                                                alignSelf: "center",
                                                                margin: whatsNew.kategori.toLowerCase() === "mobile" ? (isMobile600 ? "0 0 10px 0" : "0 50px 50px 0") : " 0 0 20px 0",
                                                                // marginBottom: "20px",
                                                                filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.15))"
                                                                // boxShadow: "0px 8px 25px 0px rgba(0, 0, 0, 0.15)",
                                                            }}
                                                        /> */}
                                                        {descItem.contents.map((content, contentIdx) => (
                                                            <Box key={contentIdx}>
                                                                {content.subJudul && (
                                                                    // <ul style={{
                                                                    //     fontSize: "16px",
                                                                    //     fontWeight: "800",
                                                                    //     color: "rgba(0, 0, 0, 0.70)",
                                                                    //     marginLeft: content.subJudul.trim() ? "20px" : "",
                                                                    // }}>
                                                                    //     <li>{content.subJudul}</li>
                                                                    // </ul>
                                                                    <Typography variant='p'
                                                                        sx={{
                                                                            fontSize: "16px",
                                                                            fontWeight: "800",
                                                                            color: "rgba(0, 0, 0, 0.70)",
                                                                            textAlign: "justify",
                                                                            lineHeight: "35px",
                                                                        }}
                                                                    >
                                                                        {content.subJudul}
                                                                    </Typography>

                                                                )}
                                                                <Typography variant="p" paragraph sx={{
                                                                    fontSize: "14px",
                                                                    color: "rgba(0, 0, 0, 0.70)",
                                                                    textAlign: "justify",
                                                                    lineHeight: "35px",
                                                                    // marginLeft: content.subJudul.trim() ? "20px" : "",
                                                                }}>
                                                                    {content.subDeskripsi}
                                                                </Typography>
                                                            </Box>
                                                        ))}
                                                    </>
                                                ))}
                                            </Box>
                                            {isMobile900 ? (
                                                <>
                                                    {whatsNew.kategori.toLowerCase() === "website" && whatsNew.kategori && (
                                                        <Link href={whatsNew.link} target='_blank'>
                                                            <Button sx={{
                                                                width: "179px",
                                                                height: "44px",
                                                                borderRadius: "40px",
                                                                background: "var(--jakartasatu-orange)",
                                                                textTransform: "none",
                                                                color: "white",
                                                                fontSize: "18px",
                                                                fontWeight: 700,
                                                                lineHeight: "150%",
                                                                letterSpacing: "-0.342px",
                                                                '&:hover': {
                                                                    background: 'var(--jakartasatu-orange)',
                                                                },
                                                            }}>
                                                                Lihat Detail
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                    {i !== filteredList.length - 1 && (
                                        <Divider sx={{
                                            borderBottomWidth: "2px",
                                            borderColor: "rgba(0, 0, 0, 0.30)",
                                            margin: "100px auto",
                                            width: "100%",
                                            maxWidth: "700px"
                                        }} />
                                    )}
                                </div>
                            ))}
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

export default FiturTerbaru;