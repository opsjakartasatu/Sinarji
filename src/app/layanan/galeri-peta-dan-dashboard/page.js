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
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Checkbox,
    Collapse,
    Divider,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Pagination,
    PaginationItem,
    Stack,
    Tooltip,
    Typography,
    Zoom,
    styled,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import CustomImage from '@/components/CustomImage';
import APInotFound from '@/app/api-not-found';

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
        " fillRule='evenodd' clipRule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
});

function katalogPeta() {
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
        { label: "Galeri Peta & Dashboard" },
    ];

    const [halamanKatalogPeta, setHalamanKatalogPeta] = useState(true);

    const [katalogList, setKatalogList] = useState([]);
    // const [dashboardCount, setDashboardCount] = useState(0);
    // const [petaCount, setPetaCount] = useState(0);
    const [simpulJaringanList, setSimpulJaringanList] = useState([]);
    const [searching, setSearching] = useState("");
    const [selectedTipePeta, setSelectedTipePeta] = useState([]);
    const [selectedSimpulJaringan, setSelectedSimpulJaringan] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTipePeta, setSearchTipePeta] = useState("");
    const [searchSimpulJaringan, setSearchSimpulJaringan] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const [isMinimizedKategori, setIsMinimizedKategori] = useState(false);
    const [isMinimizedProdusenData, setIsMinimizedProdusenData] = useState(false);

    const [error, setError] = useState(null);

    const [webMappingCount, setWebMappingCount] = useState(0);
    const [dashboardMappingCount, setDashboardMappingCount] = useState(0);
    const [lastPageBeforeSearch, setLastPageBeforeSearch] = useState(1);

    useEffect(() => {
        document.title = "Katalog Peta | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const getKatalogList = async () => {
            try {
                const response = await axios.get(`${process.env.API_WEB}/katalog-peta/public2`);
                const { data, dashboard, peta } = response.data;

                setKatalogList(data);

                // setDashboardCount(dashboard);
                // setPetaCount(peta);

                countTipePeta(data);
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

        const getSimpulJaringanList = async () => {
            try {
                const response = await axios.get(`${process.env.API_WEB}/simpul-jaringan/?limit=1000`);
                setSimpulJaringanList(response.data.items);
            } catch (error) {
                console.error("Error fetching simpul jaringan data:", error);
            }
        };

        getKatalogList();
        getSimpulJaringanList();
    }, []);

    const countTipePeta = (data) => {
        const webMappingTotal = data.filter(katalog => katalog.tipe_peta === "Web Mapping Application").length;
        const dashboardTotal = data.filter(katalog => katalog.tipe_peta === "Dashboard").length;

        setWebMappingCount(webMappingTotal);
        setDashboardMappingCount(dashboardTotal);
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearching(searchTerm);

        if (searchTerm === "") {
            setCurrentPage(1);
            setSelectedSimpulJaringan([]);
        }

        setCurrentPage(1);
    };

    const handleTipePetaChange = (event) => {
        const selectedJudul = event.target.value;
        let updatedSelectedTipePeta;
        if (event.target.checked) {
            updatedSelectedTipePeta = [...selectedTipePeta, selectedJudul];
        } else {
            updatedSelectedTipePeta = selectedTipePeta.filter(tipe_peta => tipe_peta !== selectedJudul);
        }
        setSelectedTipePeta(updatedSelectedTipePeta);
    };

    const filteredTipePeta = katalogList
        ? [...new Set(katalogList.map(tipePeta => tipePeta.tipe_peta))]
            .filter(tipePeta => tipePeta.toLowerCase().includes(searchTipePeta.toLowerCase()))
        : [];

    const handleSimpulJaringanChange = (event) => {
        const selectedJudul = event.target.value;
        let updatedSelectedSimpulJaringan;
        if (event.target.checked) {
            updatedSelectedSimpulJaringan = [...selectedSimpulJaringan, selectedJudul];
        } else {
            updatedSelectedSimpulJaringan = selectedSimpulJaringan.filter(id => id !== selectedJudul);
        }
        setSelectedSimpulJaringan(updatedSelectedSimpulJaringan);
    };

    const filteredSimpulJaringanList = simpulJaringanList.filter(simpulJaringan => {
        return katalogList.some(katalog =>
            katalog.simpuljaringan_id === simpulJaringan.id
        );
    });

    const filteredSimpulJaringan = filteredSimpulJaringanList
        ? filteredSimpulJaringanList.filter(simpulJaringan =>
            simpulJaringan.judul.toLowerCase().includes(searchSimpulJaringan.toLowerCase())
        )
        : [];

    const handleResetCheckbox = () => {
        setSelectedSimpulJaringan([]);
        setSearchSimpulJaringan("");

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };

    const handleSearchSimpulJaringan = (event) => {
        const searchTerm = event.target.value;
        setSearchSimpulJaringan(searchTerm);
    };

    const handleSort = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
    };

    const filteredKatalogData = katalogList
        ? katalogList.filter(katalog =>
            (katalog.namaPeta.toLowerCase().includes(searching)) &&
            (selectedTipePeta.length === 0 || selectedTipePeta.includes(katalog.tipe_peta)) &&
            (selectedSimpulJaringan.length === 0 || selectedSimpulJaringan.includes(katalog.simpuljaringan_id))
        ).sort((a, b) => {
            if (sortOrder === "asc") {
                return a.namaPeta.localeCompare(b.namaPeta);
            } else {
                return b.namaPeta.localeCompare(a.namaPeta);
            }
        })
        : [];

    const handlePageChange = (event, value) => {
        setCurrentPage(value); // Update current page
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentKatalogData = filteredKatalogData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredKatalogData.length / itemsPerPage);

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
                            <Navbar halamanKatalogPeta={halamanKatalogPeta} />
                        </motion.div>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Breadcrumbs breadcrumbs={breadcrumbs} />
                            <div className={styles.container}
                                style={{
                                    paddingTop: "20px",
                                    textAlign: "center",
                                }}>
                                <section id="KatalogGeospasial" style={{ width: "90vw", maxWidth: "1260px", paddingTop: "50px" }}>
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
                                    <Typography variant="p"
                                        style={{
                                            color: 'var(--jakartasatu-biru)',
                                            textAlign: "center",
                                            fontSize: "36px",
                                            fontWeight: "800",
                                        }}>
                                        Galeri Peta & Dashboard
                                    </Typography>
                                    <Divider
                                        style={{
                                            margin: '15px auto 15px auto',
                                            backgroundColor: 'var(--jakartasatu-biru)',
                                            height: 5,
                                            width: '75px',
                                            borderRadius: '4px',
                                        }}
                                    />
                                    <div style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
                                        <Grid container
                                            spacing={{ xs: 0, sm: 3, md: 6, lg: 6, xl: 6 }}
                                            direction={{ xs: "column", sm: "row", md: "row", lg: "row", xl: "row" }}
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{
                                                margin: { xs: "30px 0", sm: "30px 0", md: "30px 0", lg: "30px 0", xl: "30px 0" },
                                                rowGap: { xs: "20px", sm: "", md: "", lg: "", xl: "" },
                                            }}>
                                            <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
                                                <Stack direction="row"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    sx={{
                                                        width: "100%",
                                                        height: "150px",
                                                        borderRadius: "15px",
                                                        border: "1px solid #DFE6E9",
                                                        background: 'var(--jakartasatu-orange)',
                                                        boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                                        position: "relative"
                                                    }}>
                                                    <Box sx={{ width: "40%" }}>
                                                        <CustomImage
                                                            src="/assets/gambar-katalog-peta-atas-peta.png"
                                                            alt="Gambar"
                                                            draggable={false}
                                                            width={0}
                                                            height={0}
                                                            style={{
                                                                userDrag: "none",
                                                                userSelect: "none",

                                                                width: '110px',
                                                                height: '75px',
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ width: "40%" }}>
                                                        <Stack direction="row"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            sx={{ marginTop: "-10px" }}>
                                                            <Stack direction="column" alignItems="center">
                                                                <Typography variant="p"
                                                                    sx={{
                                                                        color: "white",
                                                                        textAlign: "center",
                                                                        fontSize: "50px",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.95px",
                                                                    }}>
                                                                    {webMappingCount}
                                                                </Typography>
                                                                <Typography variant="p"
                                                                    sx={{
                                                                        color: "white",
                                                                        textAlign: "center",
                                                                        fontSize: "22px",
                                                                        fontWeight: "600",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.418px",
                                                                    }}>
                                                                    Peta
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                        <Tooltip
                                                            title="Visualisasi data spasial"
                                                            placement="top-end"
                                                            arrow
                                                            slots={{
                                                                transition: Zoom,
                                                            }}
                                                            enterTouchDelay={0}
                                                            leaveTouchDelay={3000}
                                                            sx={{
                                                                position: "absolute",
                                                                top: 8,
                                                                right: 8,
                                                                color: "white",
                                                            }}>
                                                            <HelpOutlineRoundedIcon />
                                                        </Tooltip>
                                                    </Box>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
                                                <Stack direction="row"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    sx={{
                                                        width: "100%",
                                                        height: "150px",
                                                        borderRadius: "15px",
                                                        border: "1px solid #DFE6E9",
                                                        background: 'var(--jakartasatu-biru)',
                                                        boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                                        position: "relative"
                                                    }}>
                                                    <Box sx={{ width: "40%" }}>
                                                        <CustomImage
                                                            src="/assets/gambar-katalog-peta-atas-dashboard.png"
                                                            alt="Gambar"
                                                            draggable={false}
                                                            width={0}
                                                            height={0}
                                                            style={{
                                                                userDrag: "none",
                                                                userSelect: "none",

                                                                width: '97px',
                                                                height: '67px',
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box sx={{ width: "40%" }}>
                                                        <Stack direction="row"
                                                            justifyContent="center"
                                                            alignItems="center"
                                                            gap={3} sx={{ marginTop: "-10px" }}>
                                                            <Stack direction="column" alignItems="center">
                                                                <Typography variant="p"
                                                                    sx={{
                                                                        color: "white",
                                                                        textAlign: "center",
                                                                        fontSize: "50px",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.95px",
                                                                    }}>
                                                                    {dashboardMappingCount}
                                                                </Typography>
                                                                <Typography variant="p"
                                                                    sx={{
                                                                        color: "white",
                                                                        textAlign: "center",
                                                                        fontSize: "22px",
                                                                        fontWeight: "600",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.418px",
                                                                    }}>
                                                                    Dashboard
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                        <Tooltip
                                                            title="Statistik data spasial"
                                                            placement="top-end"
                                                            arrow
                                                            enterTouchDelay={0}
                                                            leaveTouchDelay={3000}
                                                            slots={{
                                                                transition: Zoom,
                                                            }}
                                                            sx={{
                                                                position: "absolute",
                                                                top: 8,
                                                                right: 8,
                                                                color: "white",
                                                            }}>
                                                            <HelpOutlineRoundedIcon />
                                                        </Tooltip>
                                                    </Box>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        width: "100%",
                                        maxWidth: isMobileMD ? '90vw' : '730px',
                                        margin: "0 auto"
                                    }}>
                                        <OutlinedInput
                                            type="search"
                                            placeholder="Silahkan cari peta atau dashboard, seperti Bangunan, RTH, Jalan, dll..."
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
                                                height: '49px',
                                                // paddingLeft: '4%',
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
                                                paddingLeft: { xs: "", sm: "45px" },
                                                display: "flex",
                                                justifyContent: "flex-start",
                                            }}>
                                            peta dan dashboard yang tampil di laman ini bersifat publik
                                        </Typography>
                                    </div>
                                </section>
                                <section id="KatalogGeospasialUnduhList" style={{ width: "90vw", maxWidth: "1260px" }}>
                                    <Box sx={{ display: isMobileMD ? "none" : "flex", justifyContent: "flex-end", marginTop: "-10px", marginBottom: "30px" }}>
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
                                    <Grid container
                                        spacing={4}
                                        direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid xs={12} sm={12} md={4.5} lg={3.5} xl={3.5}>
                                            <Stack direction="column"
                                                gap={4}
                                                justifyContent="center"
                                                alignItems="center">
                                                <Box sx={{
                                                    width: "100%",
                                                    borderRadius: "15px",
                                                    background: "white",
                                                    border: "1px solid #DFE6E9",
                                                }}>
                                                    <Box sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        textAlign: "start",
                                                        borderRadius: isMinimizedKategori ? "15px" : "15px 15px 0px 0px",
                                                        background: 'var(--jakartasatu-biru)',
                                                        padding: "10px 12px 10px 28px",
                                                        transition: "border-radius 0.5s ease, opacity 0.5s ease",
                                                    }}>
                                                        <Typography variant="p"
                                                            sx={{
                                                                // marginLeft: "28px",
                                                                color: "white",
                                                                fontSize: "20px",
                                                                fontWeight: "600",
                                                                lineHeight: "150%",
                                                                letterSpacing: "-0.38px",
                                                            }}>Kategori</Typography>
                                                        {isMobileMD && (
                                                            <IconButton onClick={() => setIsMinimizedKategori(!isMinimizedKategori)} sx={{ color: "white" }}>
                                                                {isMinimizedKategori ? <ExpandMore /> : <ExpandLess />}
                                                            </IconButton>
                                                        )}
                                                    </Box>
                                                    <Collapse in={!isMobileMD || !isMinimizedKategori}>
                                                        <Box sx={{ background: "white", borderRadius: "0 0 15px 15px", maxHeight: "380px", overflow: "auto", margin: "20px 0" }}>
                                                            {filteredTipePeta
                                                                .sort((a, b) => {
                                                                    if (a === "Web Mapping Application") return -1;
                                                                    if (b === "Web Mapping Application") return 1;
                                                                    if (a === "Dashboard") return -1;
                                                                    if (b === "Dashboard") return 1;
                                                                    return 0;
                                                                })
                                                                .map((tipeData, i) => {
                                                                    let count = 0;

                                                                    if (tipeData === "Web Mapping Application") {
                                                                        count = filteredKatalogData.filter(item => item.tipe_peta === 'Web Mapping Application').length;
                                                                    } else if (tipeData === "Dashboard") {
                                                                        count = filteredKatalogData.filter(item => item.tipe_peta === 'Dashboard').length;
                                                                    }

                                                                    const displayLabel = tipeData === "Web Mapping Application" ? "Peta" : tipeData;

                                                                    const getIcon = (type) => {
                                                                        if (type === "Web Mapping Application") {
                                                                            return (
                                                                                <div style={{
                                                                                    width: "30px",
                                                                                    height: "30px",
                                                                                    background: "var(--jakartasatu-orange)",
                                                                                    borderRadius: "50%",

                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center"
                                                                                }}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 2 28 28" fill="none">
                                                                                        <path d="M9.33301 3.50126V20.4179M17.4997 7.58459V23.9179M6.12817 4.89659L4.69667 5.72726C3.54284 6.39576 2.96651 6.73059 2.65034 7.28709C2.33301 7.84359 2.33301 8.52025 2.33301 9.87592V19.4006C2.33301 21.1809 2.33301 22.0723 2.73201 22.5669C2.99801 22.8959 3.37017 23.1176 3.78201 23.1911C4.40034 23.3019 5.15867 22.8621 6.67301 21.9836C7.70201 21.3874 8.69134 20.7668 9.92217 20.9359C10.4822 21.0118 11.0153 21.2778 12.084 21.8086L16.5325 24.0206C17.495 24.4989 17.5043 24.5013 18.5742 24.5013H20.9997C23.2 24.5013 24.299 24.5013 24.9827 23.8024C25.6663 23.1048 25.6663 21.9801 25.6663 19.7308V11.8674C25.6663 9.61925 25.6663 8.49576 24.9827 7.79576C24.299 7.09809 23.2 7.09809 20.9997 7.09809H18.5742C17.5043 7.09809 17.495 7.09576 16.5325 6.61742L12.6463 4.68542C11.0235 3.87809 10.2115 3.47442 9.34701 3.50126C8.48251 3.52809 7.69967 3.98542 6.12817 4.89659Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                    </svg>
                                                                                </div>
                                                                            );
                                                                        }
                                                                        if (type === "Dashboard") {
                                                                            return (
                                                                                <div style={{
                                                                                    width: "30px",
                                                                                    height: "30px",
                                                                                    background: "var(--jakartasatu-biru)",
                                                                                    borderRadius: "50%",

                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center"
                                                                                }}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="-1 0 26 26" fill="none">
                                                                                        <path d="M22.7497 17.3346V4.33464H3.24967V17.3346H22.7497ZM22.7497 2.16797C23.3243 2.16797 23.8754 2.39624 24.2817 2.80257C24.6881 3.2089 24.9163 3.76 24.9163 4.33464V17.3346C24.9163 17.9093 24.6881 18.4604 24.2817 18.8667C23.8754 19.273 23.3243 19.5013 22.7497 19.5013H15.1663V21.668H17.333V23.8346H8.66634V21.668H10.833V19.5013H3.24967C2.67504 19.5013 2.12394 19.273 1.71761 18.8667C1.31128 18.4604 1.08301 17.9093 1.08301 17.3346V4.33464C1.08301 3.13214 2.04717 2.16797 3.24967 2.16797H22.7497ZM5.41634 6.5013H15.1663V11.918H5.41634V6.5013ZM16.2497 6.5013H20.583V8.66797H16.2497V6.5013ZM20.583 9.7513V15.168H16.2497V9.7513H20.583ZM5.41634 13.0013H9.74967V15.168H5.41634V13.0013ZM10.833 13.0013H15.1663V15.168H10.833V13.0013Z" fill="white" />
                                                                                    </svg>
                                                                                </div>
                                                                            );
                                                                        }
                                                                        return null;
                                                                    };

                                                                    return (
                                                                        <FormGroup key={i} sx={{ padding: "12px 30px" }}>
                                                                            <FormControlLabel
                                                                                disableTypography
                                                                                control={
                                                                                    <Checkbox
                                                                                        disableRipple
                                                                                        color="default"
                                                                                        value={tipeData}
                                                                                        onChange={handleTipePetaChange}
                                                                                        checked={selectedTipePeta.includes(tipeData)}
                                                                                        icon={<BpIcon />}
                                                                                        checkedIcon={<BpCheckedIcon />}
                                                                                    />}
                                                                                label={
                                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
                                                                                        {getIcon(tipeData)}
                                                                                        <span>{displayLabel}</span>
                                                                                        <Typography variant="p"
                                                                                            sx={{
                                                                                                fontWeight: "700",
                                                                                                // marginLeft: '8px',
                                                                                                fontSize: '16px',
                                                                                                color: 'var(--jakartasatu-orange)'
                                                                                            }}>
                                                                                            {tipeData === "Web Mapping Application" ? `(${count})` : ""}
                                                                                            {tipeData === "Dashboard" ? `(${count})` : ""}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                }
                                                                                value={tipeData}
                                                                                sx={{ color: "rgba(0, 0, 0, 0.70)", fontSize: "16px", fontWeight: "400" }}
                                                                            />
                                                                        </FormGroup>
                                                                    );
                                                                })}
                                                        </Box>
                                                    </Collapse>
                                                </Box>
                                                <Box sx={{
                                                    width: "100%",
                                                    borderRadius: "15px",
                                                    background: "white",
                                                    border: "1px solid #DFE6E9",
                                                }}>
                                                    <Box sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        textAlign: "start",
                                                        borderRadius: isMinimizedProdusenData ? "15px" : "15px 15px 0px 0px",
                                                        background: 'var(--jakartasatu-biru)',
                                                        padding: "10px 12px 10px 28px",
                                                        transition: "border-radius 0.5s ease, opacity 0.5s ease",
                                                    }}>
                                                        <Typography variant="p"
                                                            sx={{
                                                                // marginLeft: "28px",
                                                                color: "white",
                                                                fontSize: "20px",
                                                                fontWeight: "600",
                                                                lineHeight: "150%",
                                                                letterSpacing: "-0.38px",
                                                            }}>Produsen Data</Typography>
                                                        {isMobileMD && (
                                                            <IconButton onClick={() => setIsMinimizedProdusenData(!isMinimizedProdusenData)} sx={{ color: "white" }}>
                                                                {isMinimizedProdusenData ? <ExpandMore /> : <ExpandLess />}
                                                            </IconButton>
                                                        )}
                                                    </Box>
                                                    <Collapse in={!isMobileMD || !isMinimizedProdusenData}>
                                                        <Box sx={{ padding: "20px 0 10px 0" }}>
                                                            <OutlinedInput
                                                                type="search"
                                                                placeholder="Cari simpul jaringan"
                                                                onChange={handleSearchSimpulJaringan}
                                                                value={searchSimpulJaringan}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                            <g clipPath="url(#clip0_16720_21)">
                                                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.74972 1.66797C7.62022 1.66806 6.50711 1.93827 5.50327 2.45605C4.49943 2.97382 3.63397 3.72415 2.97909 4.64443C2.32421 5.56471 1.8989 6.62826 1.73865 7.74634C1.5784 8.86442 1.68785 10.0046 2.05787 11.0718C2.4279 12.139 3.04776 13.1022 3.86575 13.8811C4.68375 14.66 5.67614 15.2319 6.76015 15.5493C7.84416 15.8667 8.98834 15.9202 10.0972 15.7054C11.2061 15.4906 12.2476 15.0138 13.1347 14.3146L16.1781 17.358C16.3352 17.5098 16.5457 17.5938 16.7642 17.5919C16.9827 17.59 17.1917 17.5023 17.3462 17.3478C17.5007 17.1933 17.5884 16.9843 17.5903 16.7658C17.5922 16.5473 17.5082 16.3368 17.3564 16.1796L14.3131 13.1363C15.1364 12.0918 15.649 10.8366 15.7923 9.51441C15.9356 8.19218 15.7037 6.85632 15.1232 5.65971C14.5428 4.46311 13.6371 3.4541 12.51 2.74816C11.3828 2.04222 10.0797 1.66788 8.74972 1.66797ZM3.33306 8.7513C3.33306 7.31471 3.90374 5.93696 4.91956 4.92114C5.93538 3.90532 7.31313 3.33464 8.74972 3.33464C10.1863 3.33464 11.5641 3.90532 12.5799 4.92114C13.5957 5.93696 14.1664 7.31471 14.1664 8.7513C14.1664 10.1879 13.5957 11.5656 12.5799 12.5815C11.5641 13.5973 10.1863 14.168 8.74972 14.168C7.31313 14.168 5.93538 13.5973 4.91956 12.5815C3.90374 11.5656 3.33306 10.1879 3.33306 8.7513Z" fill="#003577" fillOpacity="0.3" />
                                                                            </g>
                                                                            <defs>
                                                                                <clipPath id="clip0_16720_21">
                                                                                    <rect width="20" height="20" fill="white" />
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg>
                                                                    </InputAdornment>
                                                                }
                                                                sx={{
                                                                    fontFamily: 'var(--font-family)',
                                                                    fontSize: "0.9em",
                                                                    width: "90%",
                                                                    maxWidth: '900px',
                                                                    height: '39px',
                                                                    paddingLeft: '1%',
                                                                    borderRadius: '40px',
                                                                    background: 'white',
                                                                    border: "1px solid rgba(0, 69, 129, 0.30)",
                                                                    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
                                                                }}
                                                            />
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                background: "white",
                                                                borderRadius: "0 0 15px 15px",
                                                                maxHeight: "380px",
                                                                overflow: "auto",
                                                                marginRight: "20px",

                                                                '::-webkit-scrollbar': {
                                                                    width: '8px',
                                                                },
                                                                '::-webkit-scrollbar-track': {
                                                                    borderRadius: '4px',
                                                                    border: "1px solid #DFE6E9",
                                                                    margin: "20px"
                                                                },
                                                                '::-webkit-scrollbar-thumb': {
                                                                    background: '#003577',
                                                                    borderRadius: '5px',
                                                                },
                                                                '::-webkit-scrollbar-thumb:hover': {
                                                                    background: '#002b5e',
                                                                },
                                                            }}>
                                                            {filteredSimpulJaringan?.map((simpulJaringan, i) => (
                                                                <FormGroup key={i} sx={{ padding: "12px 30px" }}>
                                                                    <FormControlLabel disableTypography
                                                                        control={
                                                                            <Checkbox
                                                                                disableRipple
                                                                                color="default"
                                                                                value={simpulJaringan.id}
                                                                                onChange={handleSimpulJaringanChange}
                                                                                checked={selectedSimpulJaringan.includes(simpulJaringan.id)}
                                                                                icon={<BpIcon />}
                                                                                checkedIcon={<BpCheckedIcon />}
                                                                            />}
                                                                        label={simpulJaringan.judul}
                                                                        value={simpulJaringan.judul}
                                                                        sx={{
                                                                            color: "rgba(0, 0, 0, 0.70)",
                                                                            textAlign: "left",
                                                                            fontSize: "16px",
                                                                            fontWeight: "400",
                                                                            lineHeight: "170%",
                                                                        }} />
                                                                </FormGroup>
                                                            ))}
                                                        </Box>
                                                        <Box sx={{ padding: "20px 0 30px 0", }}>
                                                            <Button variant="contained" disableElevation onClick={handleResetCheckbox}
                                                                sx={{
                                                                    width: "115px",
                                                                    height: "36px",
                                                                    borderRadius: "20px",
                                                                    background: "#F32013",

                                                                    textTransform: "none",
                                                                    fontFamily: 'var(--font-family)',
                                                                    fontSize: "18px",
                                                                    fontWeight: "600"
                                                                }}>
                                                                Reset
                                                            </Button>
                                                        </Box>
                                                    </Collapse>
                                                </Box>
                                            </Stack>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={7.5} lg={8.5} xl={8.5} sx={{ marginTop: isMobile ? "" : "-29px" }}>
                                            <div>
                                                <Box sx={{ display: isMobileMD ? "flex" : "none", justifyContent: "flex-end", marginTop: "20px", marginBottom: "-10px" }}>
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
                                                {currentKatalogData.length > 0 ? (
                                                    currentKatalogData.map((unduh, i) => (
                                                        <Link key={i} href={`/layanan/galeri-peta-dan-dashboard/${unduh.slug}`}>
                                                            <Box elevation={0}
                                                                sx={{
                                                                    background: "white",
                                                                    border: "1px solid #DFE6E9",
                                                                    borderRadius: "15px",
                                                                    padding: isMobile ? "10px" : "20px 20px 40px 40px",
                                                                    margin: isMobile ? "20px 0" : "30px 0"
                                                                }}>
                                                                <Grid container
                                                                    columns={12}
                                                                    direction="row"
                                                                    justifyContent="center"
                                                                    alignItems="baseline">
                                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} sx={{ textAlign: "start", position: "relative" }}>
                                                                        <Box sx={{ width: "calc(100% - 55px)" }}>
                                                                            <Typography variant="p"
                                                                                sx={{
                                                                                    color: 'var(--jakartasatu-biru)',
                                                                                    fontSize: "20px",
                                                                                    fontWeight: "600",
                                                                                    lineHeight: "150%",
                                                                                    letterSpacing: "-0.38px",
                                                                                }}>
                                                                                {unduh.namaPeta}
                                                                                {unduh.simpuljaringan_nama ? (
                                                                                    <>
                                                                                        <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                                                                                        <span style={{ color: 'var(--jakartasatu-orange)' }}>{unduh.simpuljaringan_nama}</span>
                                                                                    </>
                                                                                ) : (
                                                                                    null
                                                                                )}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Typography variant="p" paragraph
                                                                            sx={{
                                                                                textAlign: "justify",
                                                                                color: "rgba(0, 0, 0, 0.60)",
                                                                                fontSize: "16px",
                                                                                fontWeight: "500",
                                                                                // lineHeight: "292%",
                                                                                letterSpacing: "-0.38px",
                                                                                margin: "20px 0",
                                                                                display: "-webkit-box",
                                                                                WebkitLineClamp: { xs: 6, sm: 6, md: 3, lg: 3, xl: 3 },
                                                                                WebkitBoxOrient: "vertical",
                                                                                overflow: "hidden",
                                                                                textOverflow: "ellipsis",
                                                                            }}>
                                                                            {unduh.deskripsi}
                                                                        </Typography>
                                                                        <Button disableElevation variant="contained" sx={{
                                                                            textTransform: "none",
                                                                            width: "138px",
                                                                            height: "36px",
                                                                            borderRadius: "10px",
                                                                            color: "white",
                                                                            fontFamily: 'var(--font-family)',
                                                                            background: 'var(--jakartasatu-hijau)',

                                                                            fontSize: "18px",
                                                                            fontWeight: "600"
                                                                        }}>
                                                                            Detail Info
                                                                        </Button>
                                                                        <Box sx={{ position: "absolute", top: isMobileMD ? "0" : "-10px", right: isMobileMD ? "0" : "-10px", }}>
                                                                            {unduh.tipe_peta === 'Web Mapping Application' && (
                                                                                <div style={{
                                                                                    width: "47px",
                                                                                    height: "47px",
                                                                                    background: "var(--jakartasatu-orange)",
                                                                                    borderRadius: "50%",

                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center"
                                                                                }}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 2 28 28" fill="none">
                                                                                        <path d="M9.33301 3.50126V20.4179M17.4997 7.58459V23.9179M6.12817 4.89659L4.69667 5.72726C3.54284 6.39576 2.96651 6.73059 2.65034 7.28709C2.33301 7.84359 2.33301 8.52025 2.33301 9.87592V19.4006C2.33301 21.1809 2.33301 22.0723 2.73201 22.5669C2.99801 22.8959 3.37017 23.1176 3.78201 23.1911C4.40034 23.3019 5.15867 22.8621 6.67301 21.9836C7.70201 21.3874 8.69134 20.7668 9.92217 20.9359C10.4822 21.0118 11.0153 21.2778 12.084 21.8086L16.5325 24.0206C17.495 24.4989 17.5043 24.5013 18.5742 24.5013H20.9997C23.2 24.5013 24.299 24.5013 24.9827 23.8024C25.6663 23.1048 25.6663 21.9801 25.6663 19.7308V11.8674C25.6663 9.61925 25.6663 8.49576 24.9827 7.79576C24.299 7.09809 23.2 7.09809 20.9997 7.09809H18.5742C17.5043 7.09809 17.495 7.09576 16.5325 6.61742L12.6463 4.68542C11.0235 3.87809 10.2115 3.47442 9.34701 3.50126C8.48251 3.52809 7.69967 3.98542 6.12817 4.89659Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                    </svg>
                                                                                </div>
                                                                            )}
                                                                            {unduh.tipe_peta === 'Dashboard' && (
                                                                                <div style={{
                                                                                    width: "47px",
                                                                                    height: "47px",
                                                                                    background: "var(--jakartasatu-biru)",
                                                                                    borderRadius: "50%",

                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center"
                                                                                }}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                                        <path d="M22.7497 17.3346V4.33464H3.24967V17.3346H22.7497ZM22.7497 2.16797C23.3243 2.16797 23.8754 2.39624 24.2817 2.80257C24.6881 3.2089 24.9163 3.76 24.9163 4.33464V17.3346C24.9163 17.9093 24.6881 18.4604 24.2817 18.8667C23.8754 19.273 23.3243 19.5013 22.7497 19.5013H15.1663V21.668H17.333V23.8346H8.66634V21.668H10.833V19.5013H3.24967C2.67504 19.5013 2.12394 19.273 1.71761 18.8667C1.31128 18.4604 1.08301 17.9093 1.08301 17.3346V4.33464C1.08301 3.13214 2.04717 2.16797 3.24967 2.16797H22.7497ZM5.41634 6.5013H15.1663V11.918H5.41634V6.5013ZM16.2497 6.5013H20.583V8.66797H16.2497V6.5013ZM20.583 9.7513V15.168H16.2497V9.7513H20.583ZM5.41634 13.0013H9.74967V15.168H5.41634V13.0013ZM10.833 13.0013H15.1663V15.168H10.833V13.0013Z" fill="white" />
                                                                                    </svg>
                                                                                </div>
                                                                            )}
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </Link>
                                                    ))
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
                                                <Pagination
                                                    count={totalPages}
                                                    page={currentPage}
                                                    onChange={handlePageChange}
                                                    shape="rounded"
                                                    variant="text"
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        marginTop: "30px"
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
                                            </div>
                                        </Grid>
                                    </Grid>
                                </section>
                            </div>

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

export default katalogPeta;