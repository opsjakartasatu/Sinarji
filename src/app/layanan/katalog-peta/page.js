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
    Divider,
    FormControlLabel,
    FormGroup,
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
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

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
        { label: "Katalog Peta" },
    ];

    const [halamanKatalogPeta, setHalamanKatalogPeta] = useState(true);

    const router = useRouter();

    const datas = [
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/RTH.png?v=1689646656896',
            title: 'Dashboard Ruang Terbuka Hijau',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=aa91a84fab5b4f0caa554398793d1ab4',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/Informasi%20Luas%20RDTR%202014.JPG?v=1689646656898',
            title: 'Dashboard Luas Zona RDTR 2014',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/e3739aa48ffa4d3cbd8ec89e6a1e5eab',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/-.JPG?v=1689646656899',
            title: 'Dashboard Penggunaan Lahan Wilayah',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/4ca614e10b3a4493951e50b739849147',
        },
    ];

    const [katalogList, setKatalogList] = useState([]);
    const [dashboardCount, setDashboardCount] = useState(0);
    const [petaCount, setPetaCount] = useState(0);
    const [simpulJaringanList, setSimpulJaringanList] = useState([]);
    const [searching, setSearching] = useState("");
    const [selectedTipePeta, setSelectedTipePeta] = useState([]);
    const [selectedSimpulJaringan, setSelectedSimpulJaringan] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTipePeta, setSearchTipePeta] = useState('');
    const [searchSimpulJaringan, setSearchSimpulJaringan] = useState('');
    const itemsPerPage = 5;

    useEffect(() => {
        document.title = "Katalog Peta | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const getKatalogList = async () => {
            const response = await axios.get(
                // process.env.API_DEV + "/v4/katalog-peta/"
                "../api/katalogPeta"
            );
            const newsLatest = response.data.data;
            setKatalogList(newsLatest);

            const dashboardTotal = newsLatest.filter(item => item.tipe_peta === 'Dashboard').length;
            const petaTotal = newsLatest.filter(item => item.tipe_peta === 'Web Mapping Application').length;

            setDashboardCount(dashboardTotal);
            setPetaCount(petaTotal);
        };

        const getSimpulJaringanList = async () => {
            const response = await axios.get(
                process.env.API_DEV + "/web/simpul-jaringan/"
            );
            const newsLatest = response.data.data;
            setSimpulJaringanList(newsLatest);
        };

        getKatalogList();
        getSimpulJaringanList();
    }, []);

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearching(searchTerm);

        if (searchTerm === "") {
            setCurrentPage(1);
            setSelectedSimpulJaringan([]);
        }
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
            katalog.type === 'public' && katalog.simpuljaringan_id === simpulJaringan.id
        );
    });

    const filteredSimpulJaringan = filteredSimpulJaringanList
        ? filteredSimpulJaringanList.filter(simpulJaringan =>
            simpulJaringan.judul.toLowerCase().includes(searchSimpulJaringan.toLowerCase())
        )
        : [];

    const handleResetCheckbox = () => {
        setSelectedSimpulJaringan([]);
        setSearchSimpulJaringan('');

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
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };

    const filteredKatalogData = katalogList
        ? katalogList.filter(katalog =>
            (katalog.namaData.toLowerCase().includes(searching) && katalog.type === 'public') &&
            (selectedTipePeta.length === 0 || selectedTipePeta.includes(katalog.tipe_peta)) &&
            (selectedSimpulJaringan.length === 0 || selectedSimpulJaringan.includes(katalog.simpuljaringan_id))
        ).sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.namaData.localeCompare(b.namaData);
            } else {
                return b.namaData.localeCompare(a.namaData);
            }
        })
        : [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredKatalogData.slice(startIndex, endIndex);

    const totalPages = Math.ceil((filteredKatalogData.length || 0) / itemsPerPage);

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
                                Katalog Peta & Dashboard
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
                                    spacing={6}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ margin: "30px 0" }}>
                                    <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <Stack direction="row"
                                            justifyContent="space-evenly"
                                            alignItems="center"
                                            sx={{
                                                width: "100%",
                                                height: "150px",
                                                borderRadius: "15px",
                                                border: "1px solid #DFE6E9",
                                                background: 'var(--jakartasatu-orange)',
                                                boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                            }}>
                                            <img
                                                src='/assets/gambar-katalog-peta-atas-peta.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: '110px',
                                                    height: '75px',
                                                }} />
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
                                                        {petaCount}
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
                                        </Stack>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <Stack direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            gap={3}
                                            sx={{
                                                width: "100%",
                                                height: "150px",
                                                borderRadius: "15px",
                                                border: "1px solid #DFE6E9",
                                                background: 'var(--jakartasatu-biru)',
                                                boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                            }}>
                                            <img
                                                src='/assets/gambar-katalog-peta-atas-dashboard.png'
                                                alt="Gambar"
                                                draggable="false"
                                                style={{
                                                    userDrag: "none",
                                                    userSelect: "none",

                                                    width: '97px',
                                                    height: '67px',
                                                }} />
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
                                                        {dashboardCount}
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
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </div>
                            <OutlinedInput
                                type="search"
                                placeholder="silahkan cari peta atau dashboard"
                                onChange={handleSearchChange}
                                endAdornment={
                                    <IconButton
                                        disableRipple
                                        aria-label="search"
                                        edge="end"
                                        onChange={handleSearchChange}
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
                                direction={{ xs: "column-reverse", sm: "column-reverse", md: "row", lg: "row", xl: "row" }}
                                justifyContent="center"
                                alignItems="flex-start">
                                <Grid xs={12} sm={12} md={3.5} lg={3.5} xl={3.5}>
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
                                                borderRadius: "15px 15px 0px 0px",
                                                background: 'var(--jakartasatu-biru)',
                                                padding: "10px 0",
                                            }}>
                                                <Typography variant="p"
                                                    sx={{
                                                        color: "white",
                                                        fontSize: "20px",
                                                        fontWeight: "600",
                                                        lineHeight: "150%",
                                                        letterSpacing: "-0.38px",
                                                    }}>Kategori Data</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    background: "white",
                                                    borderRadius: "0 0 15px 15px",
                                                    maxHeight: "380px",
                                                    overflow: "auto",
                                                    margin: "20px 20px 20px 0"
                                                }}>
                                                {filteredTipePeta?.map((tipeData, i) => (
                                                    <FormGroup key={i} sx={{ padding: "12px 30px" }}>
                                                        <FormControlLabel disableTypography
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
                                                            label={tipeData}
                                                            value={tipeData}
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
                                        </Box>
                                        <Box sx={{
                                            width: "100%",
                                            borderRadius: "15px",
                                            background: "white",
                                            border: "1px solid #DFE6E9",
                                        }}>
                                            <Box sx={{
                                                borderRadius: "15px 15px 0px 0px",
                                                background: 'var(--jakartasatu-biru)',
                                                padding: "10px 0",
                                            }}>
                                                <Typography variant="p"
                                                    sx={{
                                                        color: "white",
                                                        fontSize: "20px",
                                                        fontWeight: "600",
                                                        lineHeight: "150%",
                                                        letterSpacing: "-0.38px",
                                                    }}>Produsen Data</Typography>
                                            </Box>
                                            <Box sx={{ padding: "20px 0 10px 0" }}>
                                                <OutlinedInput
                                                    type="search"
                                                    placeholder="Cari simpul jaringan"
                                                    onChange={handleSearchSimpulJaringan}
                                                    value={searchSimpulJaringan}
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
                                                        width: '10px',
                                                    },
                                                    '::-webkit-scrollbar-track': {
                                                        borderRadius: '5px',
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
                                        </Box>
                                    </Stack>
                                </Grid>
                                <Grid xs={12} sm={12} md={8.5} lg={8.5} xl={8.5} sx={{ marginTop: isMobile ? "" : "-29px" }}>
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
                                        {paginatedData?.length > 0 ? (
                                            <>
                                                {paginatedData?.map((unduh, i) => (
                                                    <Link key={i} href={`/layanan/katalog-peta/${unduh.slug}`}>
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
                                                                <Grid xs={10} sm={10} md={11} lg={11} xl={11} sx={{ textAlign: "start" }}>
                                                                    <Typography variant="p"
                                                                        sx={{
                                                                            color: 'var(--jakartasatu-biru)',
                                                                            fontSize: "20px",
                                                                            fontWeight: "600",
                                                                            lineHeight: "150%",
                                                                            letterSpacing: "-0.38px",
                                                                        }}>
                                                                        {unduh.namaData}
                                                                        {unduh.simpuljaringan_nama ? (
                                                                            <>
                                                                                <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                                                                                <span style={{ color: 'var(--jakartasatu-orange)' }}>{unduh.simpuljaringan_nama}</span>
                                                                            </>
                                                                        ) : (
                                                                            null
                                                                        )}
                                                                    </Typography>
                                                                    <Typography variant="p" paragraph
                                                                        sx={{
                                                                            color: "rgba(0, 0, 0, 0.60)",
                                                                            fontSize: "16px",
                                                                            fontWeight: "500",
                                                                            // lineHeight: "292%",
                                                                            letterSpacing: "-0.38px",
                                                                            margin: "20px 0"
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
                                                                        background: unduh.tipe_peta === 'Dashboard' ? 'var(--jakartasatu-biru)' : 'var(--jakartasatu-orange)',

                                                                        fontSize: "18px",
                                                                        fontWeight: "600"
                                                                    }}>
                                                                        Detail Info
                                                                    </Button>
                                                                </Grid>
                                                                <Grid xs={2} sm={2} md={1} lg={1} xl={1} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
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
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Link>
                                                ))}
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
            </main >
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default katalogPeta;