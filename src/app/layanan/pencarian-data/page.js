"use client"

import { motion } from 'framer-motion';

import styles from "../../../components/page.module.css";
import Navbar from '../../../components/navbar/navbar';
import "../../../components/navbar/style.css";
import Footer from '../../../components/footer/footer';
import ScrollTop from '../../../components/scrollTop';
import KritikSaran from '../../../components/kritikSaran';
import Breadcrumbs from '../../../components/breadcrumbs';

import {
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    OutlinedInput,
    Pagination,
    PaginationItem,
    Stack,
    Typography,
    styled,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: 5,
    marginRight: "10px",
    width: 23,
    height: 23,
    outline: '1px solid #003577',
}));

const BpCheckedIcon = styled(BpIcon)({
    borderRadius: 5,
    width: 23,
    height: 23,
    outline: '2px solid #003577',
    background: 'var(--jakartasatu-biru)',
    backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
});

function pencarianData() {
    const basePath = process.env.SERVER_PUBLIC_BASE_PATH ?? ''
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
        { label: "Layanan", href: "/layanan" },
        { label: "List Data" }
    ];

    const [layananList, setLayananList] = useState();
    const [searching, setSearching] = useState("");
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = "Cari Data Layanan | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const getLayananList = async () => {
            const response = await axios.get(
                process.env.API_DEV + "/v4/map/downloads/"
            );
            const newsLatest = response.data.data;
            // console.log(newsLatest);
            setLayananList(newsLatest);
        };

        getLayananList();
    }, []);

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSearchChange = (e) => {
        setSearching(e.target.value);
    };

    const filteredLayananList = layananList?.filter(layanan =>
        layanan.title.toLowerCase().includes(searching.toLowerCase()) ||
        layanan.description.toLowerCase().includes(searching.toLowerCase())
    )
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });

    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    const paginatedData = filteredLayananList?.slice(startIndex, endIndex);

    const totalPages = Math.ceil((filteredLayananList?.length || 0) / 9);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

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
                    <div className={styles.container} style={{ paddingTop: "20px", textAlign: "center" }}>
                        <section id="dataJakartaSatu" style={{ width: "90vw", maxWidth: "1260px", paddingTop: "50px" }}>
                            <img
                                src='/assets/Partikel-1.png'
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
                            <Typography variant="p"
                                style={{
                                    color: 'var(--jakartasatu-biru)',
                                    textAlign: "center",
                                    fontSize: "36px",
                                    fontWeight: "800",
                                }}>
                                Pencarian Data
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
                            <OutlinedInput
                                type="search"
                                placeholder="silahkan cari..."
                                value={searching}
                                onChange={handleSearchChange}
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
                                    maxWidth: "819px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                contoh : Bangunan, RTH, Jalan, dll
                            </Typography>
                        </section>
                        <section id="dataPencarian" style={{ width: "90vw", maxWidth: "1260px" }}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: isMobileMD ? "30px" : "-10px", marginBottom: "20px" }}>
                                <Button onClick={handleSort} variant="contained" disableElevation disableRipple disableTouchRipple startIcon={<UnfoldMoreRoundedIcon />}
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        fontSize: "18px",
                                        borderRadius: "30px",
                                        textTransform: "none",
                                        // width: "149px",
                                        height: "49px",
                                        color: "white",
                                        background: 'var(--jakartasatu-biru)',
                                        fontSize: "18px",
                                        fontWeight: "500",
                                    }}>
                                    Urutkan {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
                                </Button>
                            </Box>
                            {layananList ? (
                                <>
                                    {paginatedData?.length > 0 ? (
                                        <>
                                            <Grid container
                                                spacing={4}
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="stretch">
                                                {paginatedData?.map((layanan, i) => (
                                                    <Grid key={i} xs={12} sm={6} md={6} lg={4} xl={4}>
                                                        <Link href={`/layanan/${layanan.slug}`}>
                                                            <Box elevation={0}
                                                                sx={{
                                                                    height: "100%",
                                                                    background: "white",
                                                                    border: "1px solid #DFE6E9",
                                                                    borderRadius: "15px",
                                                                    padding: isMobile ? "15px" : "20px",
                                                                }}>
                                                                <Grid container
                                                                    columns={12}
                                                                    direction="row"
                                                                    justifyContent="space-between"
                                                                    alignItems="flex-start">
                                                                    <Grid xs={3.7} sm={3.7} md={3.7} lg={3.7} xl={3.7}>
                                                                        <Stack
                                                                            direction="column"
                                                                            alignItems="center"
                                                                            spacing={1}>
                                                                            <Typography variant='p'
                                                                                sx={{
                                                                                    background: 'var(--jakartasatu-orange)',
                                                                                    padding: "6px 12px",
                                                                                    borderRadius: "5px",

                                                                                    color: "white",
                                                                                    fontSize: "14px",
                                                                                    fontWeight: "600",
                                                                                }}>
                                                                                Kategori
                                                                            </Typography>
                                                                            <img
                                                                                src={layanan.icon}
                                                                                alt="Gambar"
                                                                                draggable="false"
                                                                                style={{
                                                                                    userDrag: "none",
                                                                                    userSelect: "none",

                                                                                    width: '100%',
                                                                                    maxWidth: '114px',
                                                                                    height: 'auto'
                                                                                }}
                                                                            />
                                                                        </Stack>
                                                                    </Grid>
                                                                    <Grid xs={7.8} sm={7.8} md={7.8} lg={7.8} xl={7.8}>
                                                                        <Stack
                                                                            direction="column"
                                                                            justifyContent="space-between"
                                                                            alignItems="flex-start"
                                                                            spacing={2}
                                                                            sx={{ height: "100%", minHeight: "157.38px" }}>
                                                                            <Typography variant="p" paragraph
                                                                                sx={{
                                                                                    textAlign: "start",
                                                                                    color: 'var(--jakartasatu-biru)',
                                                                                    fontSize: "20px",
                                                                                    fontWeight: "600",
                                                                                    lineHeight: "150%",
                                                                                    letterSpacing: "-0.38px",
                                                                                }}>
                                                                                {layanan.title}
                                                                            </Typography>
                                                                            <Typography variant="p"
                                                                                sx={{
                                                                                    textAlign: "left",
                                                                                    color: 'var(--jakartasatu-orange)',
                                                                                    fontSize: "16px",
                                                                                    fontWeight: "600",
                                                                                    lineHeight: "170%",
                                                                                    letterSpacing: "-0.304px",
                                                                                }}>
                                                                                {layanan.description}
                                                                            </Typography>
                                                                            <Box style={{ display: "flex", justifyContent: "row", alignItems: "center" }}>
                                                                                <Typography variant="p"
                                                                                    sx={{
                                                                                        background: "white",
                                                                                        padding: "10px 60px 10px 34px",
                                                                                        borderRadius: "20px",
                                                                                        border: "2px solid rgba(0, 53, 119, 0.40)",
                                                                                        color: 'var(--jakartasatu-biru)',
                                                                                        fontSize: "14px",
                                                                                        fontWeight: "600",
                                                                                        lineHeight: "normal",
                                                                                    }}>
                                                                                    Detail Info
                                                                                </Typography>
                                                                                <Box sx={{
                                                                                    marginLeft: "-40px",
                                                                                    background: 'var(--jakartasatu-biru)',
                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    padding: "8px",
                                                                                    borderRadius: "50px",

                                                                                    '&:hover': {
                                                                                        background: 'var(--jakartasatu-orange)',
                                                                                    },
                                                                                }}>
                                                                                    <KeyboardArrowRightRoundedIcon style={{ color: "white", }} />
                                                                                </Box>
                                                                            </Box>
                                                                        </Stack>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </Link>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Pagination
                                                count={totalPages}
                                                page={currentPage}
                                                onChange={handlePageChange}
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
                                        </>
                                    ) : (
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={2}
                                            sx={{ margin: "192px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="67" height="67" viewBox="0 0 67 67" fill="none">
                                                <path d="M56.8662 24.8737L54.0746 29.7033L20.2117 10.1616L23.0033 5.33203L31.49 10.2174L35.2867 9.18453L47.3746 16.1637L48.4075 19.9883L56.8662 24.8737ZM16.75 53.0416V19.5416H30.9037L50.25 30.7083V53.0416C50.25 54.5224 49.6618 55.9425 48.6147 56.9896C47.5676 58.0367 46.1475 58.6249 44.6667 58.6249H22.3333C20.8525 58.6249 19.4324 58.0367 18.3853 56.9896C17.3382 55.9425 16.75 54.5224 16.75 53.0416Z" fill="black" fillOpacity="0.6" />
                                            </svg>
                                            <Typography variant="p" paragraph
                                                sx={{
                                                    color: "rgba(0, 0, 0, 0.60)",
                                                    fontSize: "24px",
                                                    fontWeight: "500",
                                                    textAlign: "center",
                                                }}>
                                                Data tidak ditemukan
                                            </Typography>
                                        </Stack>
                                    )}
                                </>
                            ) : (
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{ margin: "192px" }}>
                                    <CircularProgress size={25} />
                                    <Typography variant="p" paragraph
                                        sx={{
                                            color: "rgba(0, 0, 0, 0.60)",
                                            fontSize: "24px",
                                            fontWeight: "500",
                                            textAlign: "center",
                                        }}>
                                        loading ...
                                    </Typography>
                                </Stack>
                            )}
                        </section>
                    </div >

                    <Footer />
                </motion.div>
            </main>
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default pencarianData;