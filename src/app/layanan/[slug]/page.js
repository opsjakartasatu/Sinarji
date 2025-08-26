"use client"

import { motion } from 'framer-motion';

import styles from "../../../components/page.module.css";
import Navbar from '../../../components/navbar/navbar';
import "../../../components/navbar/style.css";
import Footer from '../../../components/footer/footer';
import ScrollTop from '../../../components/scrollTop';
import KritikSaran from '../../../components/kritikSaran';
import Breadcrumbs from '../../../components/breadcrumbs';

import APInotFound from "@/app/api-not-found";

import {
    Box,
    Button,
    Divider,
    Stack,
    Tab,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Grid from "@mui/material/Unstable_Grid2";

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import PropTypes from 'prop-types';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function detailData() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const { slug } = useParams();

    const [data, setData] = useState({ layananList: null, tabList: null, itemsList: null });
    const [value, setValue] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = "Detail Data Layanan | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Layanan", href: "/layanan" },
        { label: "List Data", href: "/layanan/pencarian-data" },
        { label: "Detail Data" }
    ];

    const fetchData = async () => {
        try {
            const response = await axios.get(
                process.env.API_DEV + `/v4/map/downloads/${slug}`
            );
            const { parent, groups, items } = response.data.data;
            // console.log(parent);
            setData({ layananList: parent, tabList: groups, itemsList: items });
            setError(null);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setError("API sedang tidak dapat diakses");
            } else {
                setError("Terjadi kesalahan saat mengambil data");
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [slug]);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
    }, []);

    const { layananList, tabList, itemsList } = data;

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
                        >
                            <Breadcrumbs breadcrumbs={breadcrumbs} />
                            <div className={styles.container}
                                style={{
                                    paddingTop: "20px",
                                    textAlign: "center",
                                }}>
                                <section id="detailDataLayanan" style={{ width: "90vw", maxWidth: "1238px", paddingTop: "50px" }}>
                                    <Box>
                                        <Typography variant="p"
                                            style={{
                                                color: 'var(--jakartasatu-biru)',
                                                textAlign: "center",
                                                fontSize: "36px",
                                                fontWeight: "800",
                                            }}>
                                            Detail Data
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
                                    </Box>
                                    <Grid container
                                        spacing={6}
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start">
                                        <Grid xs={12} sm={12} md={12} lg={4} xl={5.5}>
                                            {layananList ? (
                                                <img
                                                    src={layananList.source_image}
                                                    alt="Gambar"
                                                    draggable="false"
                                                    style={{
                                                        userDrag: "none",
                                                        userSelect: "none",

                                                        width: "100%",
                                                        maxWidth: '600px',
                                                        height: 'auto'
                                                    }}
                                                />
                                            ) : (
                                                <Typography variant="p"
                                                    sx={{
                                                        color: 'var(--jakartasatu-biru)',
                                                        fontSize: "20px",
                                                        fontWeight: "600",
                                                        lineHeight: "150%",
                                                        letterSpacing: "-0.38px",
                                                    }}>
                                                    Loading...
                                                </Typography>
                                            )}
                                        </Grid>
                                        <Grid xs={12} sm={12} md={12} lg={8} xl={6.5}>
                                            <Stack
                                                direction="column"
                                                justifyContent="space-between"
                                                alignItems="flex-start">
                                                {layananList ? (
                                                    <>
                                                        <Box sx={{ textAlign: "start", marginBottom: "40px" }}>
                                                            <Typography variant="p"
                                                                sx={{
                                                                    color: 'var(--jakartasatu-biru)',
                                                                    fontSize: "26px",
                                                                    fontWeight: "600",
                                                                    lineHeight: "150%",
                                                                    letterSpacing: "-0.494px",
                                                                }}>
                                                                {layananList.title}
                                                            </Typography>
                                                            <Typography variant="p" paragraph
                                                                sx={{
                                                                    margin: "20px 0",
                                                                    textAlign: "justify",
                                                                    color: "rgba(0, 0, 0, 0.60)",
                                                                    fontSize: "18px",
                                                                    fontWeight: "400",
                                                                    lineHeight: "170%",
                                                                    letterSpacing: "-0.342px",
                                                                }}>
                                                                {layananList.description}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Grid container
                                                                columns={12}
                                                                spacing={isMobile ? 4 : 0}
                                                                direction="row"
                                                                justifyContent="space-between"
                                                                alignItems="baseline">
                                                                <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ textAlign: "left" }}>
                                                                    <Typography variant="p"
                                                                        sx={{
                                                                            color: 'var(--jakartasatu-biru)',
                                                                            fontSize: "26px",
                                                                            fontWeight: "600",
                                                                            lineHeight: "150%",
                                                                            letterSpacing: "-0.494px",
                                                                        }}>
                                                                        Metadata
                                                                    </Typography>
                                                                    <ul style={{
                                                                        color: "rgba(0, 0, 0, 0.60)",
                                                                        fontSize: "18px",
                                                                        fontWeight: "500",
                                                                        lineHeight: "200%",
                                                                        letterSpacing: "-0.342px",

                                                                        marginLeft: "25px"
                                                                    }}>
                                                                        {layananList.metadata && Array.isArray(layananList.metadata) ? (
                                                                            layananList.metadata.map((metadata, i) => (
                                                                                <li key={i}>{metadata}</li>
                                                                            ))
                                                                        ) : (
                                                                            <li>Tidak ada metadata yang tersedia</li>
                                                                        )}
                                                                    </ul>
                                                                </Grid>
                                                                <Grid xs={12} sm={6} md={6} lg={6} xl={6} sx={{ textAlign: "left" }}>
                                                                    <Typography variant="p"
                                                                        sx={{
                                                                            color: 'var(--jakartasatu-biru)',
                                                                            fontSize: "26px",
                                                                            fontWeight: "600",
                                                                            lineHeight: "150%",
                                                                            letterSpacing: "-0.494px",
                                                                        }}>
                                                                        Map Service
                                                                    </Typography>
                                                                    <Link href={layananList.url_data}>
                                                                        <Typography variant="p" paragraph
                                                                            sx={{
                                                                                textDecoration: "underline",
                                                                                color: "blue",
                                                                                fontSize: "18px",
                                                                                fontWeight: "500",
                                                                                lineHeight: "200%",
                                                                                letterSpacing: "-0.342px",
                                                                                overflowWrap: "break-word",
                                                                                wordBreak: "break-word",
                                                                                whiteSpace: "normal"
                                                                            }}>
                                                                            {layananList.url_data}
                                                                        </Typography>
                                                                    </Link>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </>
                                                ) : (
                                                    <Typography variant="p"
                                                        sx={{
                                                            color: 'var(--jakartasatu-biru)',
                                                            fontSize: "20px",
                                                            fontWeight: "600",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.38px",
                                                        }}>
                                                        Loading...
                                                    </Typography>
                                                )}
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </section>
                                <section id="detailDataLayananUnduh" style={{ width: "90vw", maxWidth: "1238px", paddingTop: "42px" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                        <Typography variant="p"
                                            sx={{
                                                color: 'var(--jakartasatu-biru)',
                                                fontSize: "24px",
                                                fontWeight: "700",
                                                lineHeight: "150%",
                                                letterSpacing: "-0.418px",

                                                marginBottom: "19px"
                                            }}>
                                            Unduh File Se-Jakarta
                                        </Typography>
                                        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                            {layananList ? (
                                                <>
                                                    <Link id="btnUnduhFileCSVSeJakarta" href={`${layananList.source_url_shp}`} target="_blank">
                                                        <Button variant="contained" startIcon={<FileDownloadOutlinedIcon sx={{ marginLeft: "8px" }} />}
                                                            sx={{
                                                                height: "50px",
                                                                borderRadius: "30px",
                                                                background: 'var(--jakartasatu-biru)',
                                                                boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                                textTransform: "none",
                                                                color: "white",
                                                                fontSize: isMobile ? "0.7rem" : "18px",
                                                                fontWeight: "500",
                                                                padding: "4px 20px",

                                                                // marginRight: "30px"
                                                            }}>
                                                            Data Tabular (.csv)
                                                        </Button>
                                                    </Link>
                                                    <Link id="btnUnduhFileSHPSeJakarta" href={`${layananList.source_url_excel}`} target="_blank">
                                                        <Button variant="contained" startIcon={<FileDownloadOutlinedIcon sx={{ marginLeft: "8px" }} />}
                                                            sx={{
                                                                height: "50px",
                                                                borderRadius: "30px",
                                                                background: 'var(--jakartasatu-orange)',
                                                                boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                                textTransform: "none",
                                                                color: "white",
                                                                fontSize: isMobile ? "0.7rem" : "18px",
                                                                fontWeight: "500",
                                                                padding: "4px 20px",
                                                            }}>
                                                            Data Spasial (.shp)
                                                        </Button>
                                                    </Link>
                                                </>
                                            ) : (
                                                null
                                            )}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "81px" }}>
                                        <Typography variant="p"
                                            sx={{
                                                marginRight: "auto",
                                                color: 'var(--jakartasatu-biru)',
                                                fontSize: "24px",
                                                fontWeight: "700",
                                                lineHeight: "150%",
                                                letterSpacing: "-0.418px",
                                            }}>
                                            Unduh File Administrasi :
                                        </Typography>
                                        <Box sx={{ maxWidth: { xs: 490, sm: "95vw" } }}>
                                            <Tabs
                                                value={value}
                                                onChange={handleChange}
                                                variant="scrollable"
                                                scrollButtons
                                                allowScrollButtonsMobile
                                                aria-label="scrollable force tabs example"
                                                TabIndicatorProps={{
                                                    sx: {
                                                        backgroundColor: 'var(--jakartasatu-biru)',
                                                        borderRadius: "8px",
                                                        height: "5px"
                                                    }
                                                }}
                                                sx={{
                                                    // borderBottom: "5px solid rgba(0, 53, 119, 0.30)",
                                                    margin: "15px 0",
                                                    width: isMobile ? "98vw" : null,

                                                    "& .MuiTabs-flexContainer": {
                                                        gap: "13px"
                                                    }
                                                }}>
                                                {tabList?.map((group, i) => (
                                                    <Tab
                                                        key={group.id}
                                                        label={group.title}
                                                        {...a11yProps(i)}
                                                        sx={{
                                                            color: "rgba(0, 53, 119, 0.40)",
                                                            fontSize: "22px",
                                                            fontWeight: "600",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.418px",

                                                            textTransform: "none",
                                                            fontFamily: 'var(--font-family)',

                                                            "&.Mui-selected": {
                                                                color: 'var(--jakartasatu-biru)',
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </Tabs>
                                        </Box>
                                        {tabList?.map((group, tabIndex) => (
                                            <CustomTabPanel key={group.id} value={value} index={tabIndex}>
                                                <Box sx={{ margin: "20px 0", textAlign: "start" }}>
                                                    <Typography variant="p"
                                                        sx={{
                                                            color: "rgba(0, 0, 0, 0.70)",
                                                            fontSize: "20px",
                                                            fontWeight: "500",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.38px",
                                                        }}>
                                                        Unduh File {group.title} :
                                                    </Typography>
                                                    <Link id="btnUnduhFileExcelSeKabupaten" href={`${layananList.source_url_excel}`} target="_blank">
                                                        <Button variant="text"
                                                            startIcon={
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                                    <path d="M18.3577 14.3906L7.98047 12.5625V26.0709C7.98035 26.2178 8.0092 26.3632 8.06539 26.4988C8.12158 26.6345 8.20398 26.7577 8.30789 26.8614C8.4118 26.9651 8.53515 27.0473 8.67089 27.1033C8.80663 27.1593 8.95209 27.1879 9.09891 27.1875H27.0052C27.1521 27.1881 27.2978 27.1597 27.4337 27.1038C27.5697 27.048 27.6933 26.9658 27.7974 26.8621C27.9015 26.7583 27.9841 26.635 28.0404 26.4992C28.0967 26.3635 28.1256 26.2179 28.1255 26.0709V21.0937L18.3577 14.3906Z" fill="#185C37" />
                                                                    <path d="M18.3577 2.8125H9.09891C8.95209 2.81213 8.80663 2.84075 8.67089 2.89671C8.53515 2.95266 8.4118 3.03487 8.30789 3.1386C8.20398 3.24233 8.12158 3.36555 8.06539 3.5012C8.0092 3.63684 7.98035 3.78224 7.98047 3.92907V8.90625L18.3577 15L23.8523 16.8281L28.1255 15V8.90625L18.3577 2.8125Z" fill="#21A366" />
                                                                    <path d="M7.98047 8.90625H18.3577V15H7.98047V8.90625Z" fill="#107C41" />
                                                                    <path opacity="0.1" d="M15.4073 7.6875H7.98047V22.9219H15.4073C15.7033 22.9204 15.9867 22.8024 16.1962 22.5934C16.4058 22.3844 16.5245 22.1012 16.5267 21.8053V8.80406C16.5245 8.50813 16.4058 8.22499 16.1962 8.01599C15.9867 7.80699 15.7033 7.68897 15.4073 7.6875Z" fill="black" />
                                                                    <path opacity="0.2" d="M14.797 8.29688H7.98047V23.5312H14.797C15.093 23.5298 15.3764 23.4118 15.5859 23.2028C15.7955 22.9938 15.9142 22.7106 15.9164 22.4147V9.41344C15.9142 9.11751 15.7955 8.83436 15.5859 8.62537C15.3764 8.41637 15.093 8.29835 14.797 8.29688Z" fill="black" />
                                                                    <path opacity="0.2" d="M14.797 8.29688H7.98047V22.3125H14.797C15.093 22.311 15.3764 22.193 15.5859 21.984C15.7955 21.775 15.9142 21.4919 15.9164 21.1959V9.41344C15.9142 9.11751 15.7955 8.83436 15.5859 8.62537C15.3764 8.41637 15.093 8.29835 14.797 8.29688Z" fill="black" />
                                                                    <path opacity="0.2" d="M14.1867 8.29688H7.98047V22.3125H14.1867C14.4827 22.311 14.7661 22.193 14.9756 21.984C15.1851 21.775 15.3039 21.4919 15.3061 21.1959V9.41344C15.3039 9.11751 15.1851 8.83436 14.9756 8.62537C14.7661 8.41637 14.4827 8.29835 14.1867 8.29688Z" fill="black" />
                                                                    <path d="M2.99438 8.29688H14.1862C14.4827 8.29663 14.7672 8.4141 14.977 8.62347C15.1869 8.83284 15.3051 9.11698 15.3056 9.41344V20.5866C15.3051 20.883 15.1869 21.1672 14.977 21.3765C14.7672 21.5859 14.4827 21.7034 14.1862 21.7031H2.99438C2.84748 21.7036 2.70192 21.6751 2.56608 21.6192C2.43023 21.5633 2.30676 21.4811 2.20275 21.3774C2.09875 21.2736 2.01625 21.1504 1.96001 21.0147C1.90377 20.8789 1.87488 20.7335 1.875 20.5866V9.41344C1.87488 9.26654 1.90377 9.12106 1.96001 8.98536C2.01625 8.84965 2.09875 8.72639 2.20275 8.62264C2.30676 8.5189 2.43023 8.43672 2.56608 8.38081C2.70192 8.32491 2.84748 8.29639 2.99438 8.29688Z" fill="url(#paint0_linear_18636_1223)" />
                                                                    <path d="M5.34375 18.6309L7.69781 14.9896L5.54156 11.369H7.27313L8.44969 13.6875C8.55844 13.9068 8.63719 14.07 8.67281 14.1787H8.68875C8.76562 14.0031 8.84687 13.8325 8.9325 13.6668L10.1906 11.3728H11.7844L9.57281 14.9728L11.8406 18.6337H10.1447L8.78531 16.0921C8.72237 15.9828 8.66875 15.8683 8.625 15.75H8.6025C8.56277 15.8653 8.50992 15.9757 8.445 16.079L7.04531 18.6309H5.34375Z" fill="white" />
                                                                    <path d="M27.0059 2.81251H18.3574V8.90626H28.1252V3.92907C28.1254 3.78217 28.0965 3.63669 28.0402 3.50098C27.984 3.36527 27.9015 3.24201 27.7975 3.13827C27.6935 3.03452 27.57 2.95234 27.4342 2.89644C27.2983 2.84054 27.1528 2.81201 27.0059 2.81251Z" fill="#33C481" />
                                                                    <path d="M18.3574 15H28.1252V21.0938H18.3574V15Z" fill="#107C41" />
                                                                    <defs>
                                                                        <linearGradient id="paint0_linear_18636_1223" x1="4.21312" y1="7.41938" x2="12.9675" y2="22.5806" gradientUnits="userSpaceOnUse">
                                                                            <stop stopColor="#18884F" />
                                                                            <stop offset="0.5" stopColor="#117E43" />
                                                                            <stop offset="1" stopColor="#0B6631" />
                                                                        </linearGradient>
                                                                    </defs>
                                                                </svg>
                                                            }
                                                            sx={{
                                                                margin: isMobile ? "0" : "0 10px",
                                                                color: 'var(--jakartasatu-biru)',
                                                                fontSize: "20px",
                                                                fontWeight: "600",
                                                                lineHeight: "150%",
                                                                letterSpacing: "-0.38px",
                                                                textTransform: "none",
                                                                textDecorationLine: "underline",
                                                            }}>
                                                            Data Tabular (.csv)
                                                        </Button>
                                                    </Link>
                                                    <Link id="btnUnduhFileSHPSeKabupaten" href={`${layananList.source_url_shp}`} target="_blank">
                                                        <Button variant="text"
                                                            startIcon={
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                                    <g clipPath="url(#clip0_18617_626)">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M16 0C13.3605 0.00827703 10.811 0.96027 8.812 2.684C7.28 4.004 6.17 5.724 5.884 7.45C2.532 8.19 0 11.11 0 14.636C0 18.732 3.416 22 7.562 22H15V11C15 10.7348 15.1054 10.4804 15.2929 10.2929C15.4804 10.1054 15.7348 10 16 10C16.2652 10 16.5196 10.1054 16.7071 10.2929C16.8946 10.4804 17 10.7348 17 11V22H25.376C29.004 22 32 19.14 32 15.546C32 12.274 29.516 9.608 26.332 9.158C25.846 3.998 21.38 0 16 0ZM15.292 31.708C15.3849 31.8011 15.4952 31.875 15.6167 31.9254C15.7382 31.9758 15.8685 32.0018 16 32.0018C16.1315 32.0018 16.2618 31.9758 16.3833 31.9254C16.5048 31.875 16.6151 31.8011 16.708 31.708L22.708 25.708C22.8958 25.5202 23.0013 25.2656 23.0013 25C23.0013 24.7344 22.8958 24.4798 22.708 24.292C22.5202 24.1042 22.2656 23.9987 22 23.9987C21.7344 23.9987 21.4798 24.1042 21.292 24.292L17 28.586V22H15V28.586L10.708 24.292C10.5202 24.1042 10.2656 23.9987 10 23.9987C9.73445 23.9987 9.47977 24.1042 9.292 24.292C9.10423 24.4798 8.99874 24.7344 8.99874 25C8.99874 25.2656 9.10423 25.5202 9.292 25.708L15.292 31.708Z" fill='var(--jakartasatu-biru)' />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_18617_626">
                                                                            <rect width="32" height="32" fill="white" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            }
                                                            sx={{
                                                                margin: isMobile ? "0" : "0 10px",
                                                                color: 'var(--jakartasatu-biru)',
                                                                fontSize: "20px",
                                                                fontWeight: "600",
                                                                lineHeight: "150%",
                                                                letterSpacing: "-0.38px",
                                                                textTransform: "none",
                                                                textDecorationLine: "underline",
                                                            }}>
                                                            Data Spasial (.shp)
                                                        </Button>
                                                    </Link>
                                                </Box>
                                                <TableContainer
                                                    sx={{
                                                        margin: "0 auto",
                                                        width: "90vw",
                                                        maxWidth: "753px",
                                                        borderRadius: "15px",
                                                        border: "1px solid #DFE6E9",
                                                        background: "#FFF",
                                                    }}>
                                                    <Table aria-label="simple table" sx={{
                                                        [`& .${tableCellClasses.root}`]: {
                                                            borderBottom: "none",
                                                        }
                                                    }}>
                                                        <TableHead>
                                                            <TableRow sx={{ background: 'var(--jakartasatu-biru)' }}>
                                                                <TableCell align="left" sx={{
                                                                    paddingLeft: isMobile ? "" : "40px",
                                                                    color: "white",
                                                                    fontSize: "22px",
                                                                    fontWeight: "600",
                                                                    lineHeight: "150%",
                                                                    letterSpacing: "-0.418px",
                                                                }}>Kecamatan</TableCell>
                                                                <TableCell align="center" sx={{
                                                                    color: "white",
                                                                    fontSize: "22px",
                                                                    fontWeight: "600",
                                                                    lineHeight: "150%",
                                                                    letterSpacing: "-0.418px",
                                                                }}>Tabular</TableCell>
                                                                <TableCell align="center" sx={{
                                                                    color: "white",
                                                                    fontSize: "22px",
                                                                    fontWeight: "600",
                                                                    lineHeight: "150%",
                                                                    letterSpacing: "-0.418px",
                                                                }}>Spasial</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {itemsList
                                                                ?.filter((items) => items.group_id === group.id)
                                                                .map((items, i) => (
                                                                    <TableRow key={i}>
                                                                        <TableCell align="left" sx={{
                                                                            paddingLeft: isMobile ? "" : "40px",
                                                                            color: 'var(--jakartasatu-biru)',
                                                                            fontSize: "22px",
                                                                            fontWeight: "600",
                                                                            lineHeight: "150%",
                                                                            letterSpacing: "-0.418px",
                                                                        }}>{items.download_title}</TableCell>
                                                                        <TableCell align="center">
                                                                            {items.source_url_excel ? (
                                                                                <Link id="btnUnduhFileExcelKecamatan" href={`${items.source_url_excel}`} target="_blank">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                                                                        <path d="M22.0288 17.2687L9.57617 15.075V31.2851C9.57602 31.4613 9.61065 31.6357 9.67808 31.7985C9.7455 31.9613 9.84439 32.1092 9.96908 32.2336C10.0938 32.3581 10.2418 32.4568 10.4047 32.5239C10.5676 32.5911 10.7421 32.6254 10.9183 32.625H32.4058C32.5822 32.6257 32.757 32.5916 32.9201 32.5246C33.0833 32.4575 33.2315 32.3589 33.3565 32.2344C33.4814 32.1099 33.5805 31.962 33.6481 31.799C33.7156 31.6361 33.7503 31.4615 33.7502 31.2851V25.3125L22.0288 17.2687Z" fill="#185C37" />
                                                                                        <path d="M22.0288 3.375H10.9183C10.7421 3.37456 10.5676 3.4089 10.4047 3.47605C10.2418 3.5432 10.0938 3.64184 9.96908 3.76632C9.84439 3.89079 9.7455 4.03866 9.67808 4.20144C9.61065 4.36421 9.57602 4.53869 9.57617 4.71488V10.6875L22.0288 18L28.6224 20.1938L33.7502 18V10.6875L22.0288 3.375Z" fill="#21A366" />
                                                                                        <path d="M9.57617 10.6875H22.0288V18H9.57617V10.6875Z" fill="#107C41" />
                                                                                        <path opacity="0.1" d="M18.4884 9.22498H9.57617V27.5062H18.4884C18.8435 27.5045 19.1837 27.3628 19.4351 27.112C19.6865 26.8612 19.829 26.5215 19.8317 26.1664V10.5649C19.829 10.2097 19.6865 9.86996 19.4351 9.61916C19.1837 9.36837 18.8435 9.22674 18.4884 9.22498Z" fill="black" />
                                                                                        <path opacity="0.2" d="M17.756 9.9563H9.57617V28.2375H17.756C18.1112 28.2358 18.4513 28.0942 18.7027 27.8434C18.9542 27.5926 19.0966 27.2528 19.0993 26.8977V11.2962C19.0966 10.9411 18.9542 10.6013 18.7027 10.3505C18.4513 10.0997 18.1112 9.95806 17.756 9.9563Z" fill="black" />
                                                                                        <path opacity="0.2" d="M17.756 9.9563H9.57617V26.775H17.756C18.1112 26.7733 18.4513 26.6317 18.7027 26.3809C18.9542 26.1301 19.0966 25.7903 19.0993 25.4352V11.2962C19.0966 10.9411 18.9542 10.6013 18.7027 10.3505C18.4513 10.0997 18.1112 9.95806 17.756 9.9563Z" fill="black" />
                                                                                        <path opacity="0.2" d="M17.0237 9.9563H9.57617V26.775H17.0237C17.3788 26.7733 17.7189 26.6317 17.9704 26.3809C18.2218 26.1301 18.3643 25.7903 18.3669 25.4352V11.2962C18.3643 10.9411 18.2218 10.6013 17.9704 10.3505C17.7189 10.0997 17.3788 9.95806 17.0237 9.9563Z" fill="black" />
                                                                                        <path d="M3.59325 9.95631H17.0235C17.3793 9.95601 17.7206 10.097 17.9725 10.3482C18.2243 10.5995 18.3662 10.9404 18.3667 11.2962V24.7039C18.3662 25.0597 18.2243 25.4007 17.9725 25.6519C17.7206 25.9031 17.3793 26.0441 17.0235 26.0438H3.59325C3.41697 26.0444 3.24231 26.0102 3.07929 25.9431C2.91627 25.876 2.76811 25.7774 2.6433 25.6529C2.5185 25.5284 2.41951 25.3805 2.35201 25.2176C2.28452 25.0548 2.24985 24.8802 2.25 24.7039V11.2962C2.24985 11.1199 2.28452 10.9453 2.35201 10.7825C2.41951 10.6196 2.5185 10.4717 2.6433 10.3472C2.76811 10.2227 2.91627 10.1241 3.07929 10.057C3.24231 9.98994 3.41697 9.95571 3.59325 9.95631Z" fill="url(#paint0_linear_18617_628)" />
                                                                                        <path d="M6.41211 22.3571L9.23699 17.9876L6.64948 13.6428H8.72736L10.1392 16.4249C10.2697 16.6882 10.3642 16.8839 10.407 17.0144H10.4261C10.5184 16.8037 10.6159 16.5989 10.7186 16.4002L12.2284 13.6473H14.1409L11.487 17.9673L14.2084 22.3604H12.1732L10.542 19.3106C10.4665 19.1793 10.4021 19.042 10.3496 18.8999H10.3226C10.2749 19.0384 10.2115 19.1709 10.1336 19.2948L8.45398 22.3571H6.41211Z" fill="white" />
                                                                                        <path d="M32.4074 3.37501H22.0293V10.6875H33.7507V4.71488C33.7508 4.5386 33.7162 4.36403 33.6487 4.20118C33.5812 4.03833 33.4822 3.89041 33.3574 3.76592C33.2326 3.64143 33.0844 3.54281 32.9214 3.47573C32.7584 3.40864 32.5837 3.37441 32.4074 3.37501Z" fill="#33C481" />
                                                                                        <path d="M22.0293 18H33.7507V25.3125H22.0293V18Z" fill="#107C41" />
                                                                                        <defs>
                                                                                            <linearGradient id="paint0_linear_18617_628" x1="5.05575" y1="8.90331" x2="15.561" y2="27.0968" gradientUnits="userSpaceOnUse">
                                                                                                <stop stopColor="#18884F" />
                                                                                                <stop offset="0.5" stopColor="#117E43" />
                                                                                                <stop offset="1" stopColor="#0B6631" />
                                                                                            </linearGradient>
                                                                                        </defs>
                                                                                    </svg>
                                                                                </Link>
                                                                            ) : (
                                                                                <CloseRoundedIcon sx={{ color: "#F32013" }} />
                                                                            )}
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            {items.source_url_shp ? (
                                                                                <Link id="btnUnduhFileShpKecamatan" href={`${items.source_url_shp}`} target="_blank">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                                                        <g clipPath="url(#clip0_18617_626)">
                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M16 0C13.3605 0.00827703 10.811 0.96027 8.812 2.684C7.28 4.004 6.17 5.724 5.884 7.45C2.532 8.19 0 11.11 0 14.636C0 18.732 3.416 22 7.562 22H15V11C15 10.7348 15.1054 10.4804 15.2929 10.2929C15.4804 10.1054 15.7348 10 16 10C16.2652 10 16.5196 10.1054 16.7071 10.2929C16.8946 10.4804 17 10.7348 17 11V22H25.376C29.004 22 32 19.14 32 15.546C32 12.274 29.516 9.608 26.332 9.158C25.846 3.998 21.38 0 16 0ZM15.292 31.708C15.3849 31.8011 15.4952 31.875 15.6167 31.9254C15.7382 31.9758 15.8685 32.0018 16 32.0018C16.1315 32.0018 16.2618 31.9758 16.3833 31.9254C16.5048 31.875 16.6151 31.8011 16.708 31.708L22.708 25.708C22.8958 25.5202 23.0013 25.2656 23.0013 25C23.0013 24.7344 22.8958 24.4798 22.708 24.292C22.5202 24.1042 22.2656 23.9987 22 23.9987C21.7344 23.9987 21.4798 24.1042 21.292 24.292L17 28.586V22H15V28.586L10.708 24.292C10.5202 24.1042 10.2656 23.9987 10 23.9987C9.73445 23.9987 9.47977 24.1042 9.292 24.292C9.10423 24.4798 8.99874 24.7344 8.99874 25C8.99874 25.2656 9.10423 25.5202 9.292 25.708L15.292 31.708Z" fill='var(--jakartasatu-biru)' />
                                                                                        </g>
                                                                                        <defs>
                                                                                            <clipPath id="clip0_18617_626">
                                                                                                <rect width="32" height="32" fill="white" />
                                                                                            </clipPath>
                                                                                        </defs>
                                                                                    </svg>
                                                                                </Link>
                                                                            ) : (
                                                                                <CloseRoundedIcon sx={{ color: "#F32013" }} />
                                                                            )}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CustomTabPanel>
                                        ))}
                                    </Box>
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

export default detailData;