"use client"

import { motion } from 'framer-motion';

import styles from "../../../../components/page.module.css";

import Navbar from '../../../../components/navbar/navbar';
import "../../../../components/navbar/style.css";
import Footer from '../../../../components/footer/footer';
import ScrollTop from '../../../../components/scrollTop';
import KritikSaran from '../../../../components/kritikSaran';
import Breadcrumbs from '../../../../components/breadcrumbs';

import PropTypes from 'prop-types';

import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import axios from "axios";
import CustomImage from '@/components/CustomImage';

const TabStyle = {
    borderRadius: "8px",
    // background: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',

    color: 'var(--jakartasatu-biru)',
    fontFamily: 'var(--font-family)',
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "160%",
    letterSpacing: "-0.38px",
    textTransform: "none",

    "&.Mui-selected": {
        background: 'var(--jakartasatu-biru)',
        color: "white",
        borderRadius: "40px",
        fontWeight: "700",
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function detailEvent() {
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
        { label: "Event", href: "/informasi/event" },
        { label: "Detail Event" }
    ];

    const [eventList, setEventList] = useState([]);
    const [open, setOpen] = useState(0);

    useEffect(() => {
        const getEventList = async () => {
            const response = await axios.get(
                "../../api/event"
            );

            const newsLatest = response.data;
            setEventList(newsLatest);
        };

        getEventList();
    }, []);

    const handleChange = (event, newValue) => {
        setOpen(newValue);
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
                    <div className={styles.container} style={{ paddingTop: "20px", width: "100%" }}>
                        <section id="detailEvent" style={{ margin: "50px 0 0 0", width: "90vw", maxWidth: "1260px" }}>
                            {eventList.slice(0, 1).map((event, i) => (
                                <Grid key={i} container
                                    spacing={8}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start">
                                    <Grid xs={12} sm={12} md={12} lg={4} xl={5.5}>
                                        <CustomImage
                                            src={event.imgSrc}
                                            alt="Gambar"
                                            draggable={false}
                                            width={0}
                                            height={0}
                                            style={{
                                                userDrag: "none",
                                                userSelect: "none",

                                                width: "100%",
                                                // maxWidth: '469px',
                                                height: 'auto',
                                                borderRadius: "10px",
                                                boxShadow: "7px 7px 13px rgba(0, 0, 0, 0.35)",
                                            }}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={12} md={12} lg={8} xl={5.5}>
                                        <Stack
                                            spacing={2}
                                            direction="column"
                                            justifyContent="space-between"
                                            alignItems="flex-start">
                                            <Typography variant="p"
                                                sx={{
                                                    fontFamily: 'var(--font-family)',
                                                    color: 'var(--jakartasatu-biru)',
                                                    fontSize: "26px",
                                                    fontWeight: "600",
                                                    lineHeight: "150%",
                                                    letterSpacing: "-0.494px",
                                                }}>
                                                {event.namaData}
                                            </Typography>
                                            <svg id="11" xmlns="http://www.w3.org/2000/svg" width="225" height="28" viewBox="0 0 225 27" fill="none" style={{ margin: "15px 0" }}>
                                                <rect x="19" width="191" height="27" fill='var(--jakartasatu-orange)' />
                                                <path d="M0 27L8.36979 13.5L0 0H19.0223C20.1809 0 21.132 0.578572 21.841 1.65857L29.398 13.5L21.841 25.3414C21.132 26.4214 20.1809 27 19.0223 27H0Z" fill='var(--jakartasatu-orange)' />
                                                <path d="M224.398 3.8147e-06L216.029 13.5L224.398 27L205.376 27C204.218 27 203.266 26.4214 202.557 25.3414L195 13.5L202.557 1.65857C203.266 0.578575 204.218 1.75243e-06 205.376 1.87083e-06L224.398 3.8147e-06Z" fill='var(--jakartasatu-orange)' />
                                                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14px" fontWeight="bold">
                                                    {event.kategori}
                                                </text>
                                            </svg>
                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "15px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M17.917 3.33398H16.1115V4.4451H17.7781V16.6673H2.22258V4.4451H3.88925V3.33398H2.08369C1.95382 3.33615 1.82566 3.36389 1.70651 3.4156C1.58736 3.46731 1.47957 3.54199 1.38928 3.63537C1.299 3.72875 1.228 3.839 1.18033 3.95982C1.13266 4.08064 1.10926 4.20967 1.11147 4.33954V16.7729C1.10926 16.9027 1.13266 17.0318 1.18033 17.1526C1.228 17.2734 1.299 17.3837 1.38928 17.477C1.47957 17.5704 1.58736 17.6451 1.70651 17.6968C1.82566 17.7485 1.95382 17.7763 2.08369 17.7784H17.917C18.0469 17.7763 18.1751 17.7485 18.2942 17.6968C18.4134 17.6451 18.5212 17.5704 18.6114 17.477C18.7017 17.3837 18.7727 17.2734 18.8204 17.1526C18.8681 17.0318 18.8915 16.9027 18.8892 16.7729V4.33954C18.8915 4.20967 18.8681 4.08064 18.8204 3.95982C18.7727 3.839 18.7017 3.72875 18.6114 3.63537C18.5212 3.54199 18.4134 3.46731 18.2942 3.4156C18.1751 3.36389 18.0469 3.33615 17.917 3.33398Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M4.44531 7.77734H5.55642V8.88845H4.44531V7.77734Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M7.77832 7.77734H8.88943V8.88845H7.77832V7.77734Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M11.1113 7.77734H12.2224V8.88845H11.1113V7.77734Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M14.4453 7.77734H15.5564V8.88845H14.4453V7.77734Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M4.44531 10.5547H5.55642V11.6658H4.44531V10.5547Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M7.77832 10.5547H8.88943V11.6658H7.77832V10.5547Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M11.1113 10.5547H12.2224V11.6658H11.1113V10.5547Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M14.4453 10.5547H15.5564V11.6658H14.4453V10.5547Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M4.44531 13.334H5.55642V14.4451H4.44531V13.334Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M7.77832 13.334H8.88943V14.4451H7.77832V13.334Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M11.1113 13.334H12.2224V14.4451H11.1113V13.334Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M14.4453 13.334H15.5564V14.4451H14.4453V13.334Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M5.55556 5.55577C5.7029 5.55577 5.84421 5.49724 5.94839 5.39305C6.05258 5.28887 6.11111 5.14756 6.11111 5.00022V1.66688C6.11111 1.51954 6.05258 1.37823 5.94839 1.27405C5.84421 1.16986 5.7029 1.11133 5.55556 1.11133C5.40821 1.11133 5.26691 1.16986 5.16272 1.27405C5.05853 1.37823 5 1.51954 5 1.66688V5.00022C5 5.14756 5.05853 5.28887 5.16272 5.39305C5.26691 5.49724 5.40821 5.55577 5.55556 5.55577Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M14.4452 5.55577C14.5925 5.55577 14.7339 5.49724 14.838 5.39305C14.9422 5.28887 15.0008 5.14756 15.0008 5.00022V1.66688C15.0008 1.51954 14.9422 1.37823 14.838 1.27405C14.7339 1.16986 14.5925 1.11133 14.4452 1.11133C14.2979 1.11133 14.1566 1.16986 14.0524 1.27405C13.9482 1.37823 13.8896 1.51954 13.8896 1.66688V5.00022C13.8896 5.14756 13.9482 5.28887 14.0524 5.39305C14.1566 5.49724 14.2979 5.55577 14.4452 5.55577Z" fill="black" fillOpacity="0.6" />
                                                    <path d="M7.22266 3.33398H12.7782V4.4451H7.22266V3.33398Z" fill="black" fillOpacity="0.6" />
                                                </svg>
                                                <Typography variant="p"
                                                    sx={{
                                                        fontFamily: 'var(--font-family)',
                                                        color: "rgba(0, 0, 0, 0.60)",
                                                        fontSize: "18px",
                                                        fontWeight: "600",
                                                        lineHeight: "160%",
                                                    }}>
                                                    {event.tanggal}
                                                </Typography>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "15px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M10.0003 16.666C11.7684 16.666 13.4641 15.9636 14.7144 14.7134C15.9646 13.4632 16.667 11.7675 16.667 9.99935C16.667 8.23124 15.9646 6.53555 14.7144 5.2853C13.4641 4.03506 11.7684 3.33268 10.0003 3.33268C8.23222 3.33268 6.53652 4.03506 5.28628 5.2853C4.03604 6.53555 3.33366 8.23124 3.33366 9.99935C3.33366 11.7675 4.03604 13.4632 5.28628 14.7134C6.53652 15.9636 8.23222 16.666 10.0003 16.666ZM10.0003 1.66602C11.0947 1.66602 12.1783 1.88156 13.1894 2.30035C14.2004 2.71914 15.1191 3.33297 15.8929 4.10679C16.6667 4.88061 17.2805 5.79927 17.6993 6.81032C18.1181 7.82137 18.3337 8.905 18.3337 9.99935C18.3337 12.2095 17.4557 14.3291 15.8929 15.8919C14.3301 17.4547 12.2105 18.3327 10.0003 18.3327C5.39199 18.3327 1.66699 14.5827 1.66699 9.99935C1.66699 7.78921 2.54497 5.6696 4.10777 4.10679C5.67057 2.54399 7.79019 1.66602 10.0003 1.66602ZM10.417 5.83268V10.2077L14.167 12.4327L13.542 13.4577L9.16699 10.8327V5.83268H10.417Z" fill="black" fillOpacity="0.6" />
                                                </svg>
                                                <Typography variant="p"
                                                    sx={{
                                                        fontFamily: 'var(--font-family)',
                                                        color: "rgba(0, 0, 0, 0.60)",
                                                        fontSize: "18px",
                                                        fontWeight: "600",
                                                        lineHeight: "160%",
                                                    }}>
                                                    {event.pukul}
                                                </Typography>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "15px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M10 5C9.38193 5 8.77775 5.18328 8.26384 5.52666C7.74994 5.87004 7.3494 6.3581 7.11288 6.92911C6.87635 7.50013 6.81447 8.12847 6.93505 8.73466C7.05562 9.34085 7.35325 9.89767 7.79029 10.3347C8.22733 10.7717 8.78415 11.0694 9.39034 11.19C9.99653 11.3105 10.6249 11.2486 11.1959 11.0121C11.7669 10.7756 12.255 10.3751 12.5983 9.86116C12.9417 9.34725 13.125 8.74307 13.125 8.125C13.125 7.2962 12.7958 6.50134 12.2097 5.91529C11.6237 5.32924 10.8288 5 10 5ZM10 10C9.62916 10 9.26665 9.89003 8.95831 9.68401C8.64996 9.47798 8.40964 9.18514 8.26773 8.84253C8.12581 8.49992 8.08868 8.12292 8.16103 7.75921C8.23337 7.39549 8.41195 7.0614 8.67417 6.79917C8.9364 6.53695 9.27049 6.35837 9.63421 6.28603C9.99792 6.21368 10.3749 6.25081 10.7175 6.39273C11.0601 6.53464 11.353 6.77496 11.559 7.08331C11.765 7.39165 11.875 7.75416 11.875 8.125C11.875 8.62228 11.6775 9.09919 11.3258 9.45083C10.9742 9.80246 10.4973 10 10 10ZM10 1.25C8.17727 1.25207 6.42979 1.97706 5.14092 3.26592C3.85206 4.55479 3.12707 6.30227 3.125 8.125C3.125 10.5781 4.25859 13.1781 6.40625 15.6445C7.37127 16.759 8.45739 17.7626 9.64453 18.6367C9.74962 18.7103 9.87482 18.7498 10.0031 18.7498C10.1314 18.7498 10.2566 18.7103 10.3617 18.6367C11.5467 17.7623 12.6307 16.7587 13.5938 15.6445C15.7383 13.1781 16.875 10.5781 16.875 8.125C16.8729 6.30227 16.1479 4.55479 14.8591 3.26592C13.5702 1.97706 11.8227 1.25207 10 1.25ZM10 17.3438C8.70859 16.3281 4.375 12.5977 4.375 8.125C4.375 6.63316 4.96763 5.20242 6.02252 4.14752C7.07742 3.09263 8.50816 2.5 10 2.5C11.4918 2.5 12.9226 3.09263 13.9775 4.14752C15.0324 5.20242 15.625 6.63316 15.625 8.125C15.625 12.5961 11.2914 16.3281 10 17.3438Z" fill="black" fillOpacity="0.6" />
                                                </svg>
                                                <Typography variant="p"
                                                    sx={{
                                                        fontFamily: 'var(--font-family)',
                                                        color: "rgba(0, 0, 0, 0.60)",
                                                        fontSize: "18px",
                                                        fontWeight: "600",
                                                        lineHeight: "160%",
                                                    }}>
                                                    {event.lokasi}
                                                </Typography>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "15px" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
                                                    <path d="M15 0H12C11.45 0 11 0.45 11 1C11 1.55 11.45 2 12 2H15C16.65 2 18 3.35 18 5C18 6.65 16.65 8 15 8H12C11.45 8 11 8.45 11 9C11 9.55 11.45 10 12 10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0ZM6 5C6 5.55 6.45 6 7 6H13C13.55 6 14 5.55 14 5C14 4.45 13.55 4 13 4H7C6.45 4 6 4.45 6 5ZM8 8H5C3.35 8 2 6.65 2 5C2 3.35 3.35 2 5 2H8C8.55 2 9 1.55 9 1C9 0.45 8.55 0 8 0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H8C8.55 10 9 9.55 9 9C9 8.45 8.55 8 8 8Z" fill="black" fillOpacity="0.6" />
                                                </svg>
                                                <Link href={event.linkWeb} target="_blank">
                                                    <Typography variant="p"
                                                        sx={{
                                                            textDecoration: "underline",
                                                            fontFamily: 'var(--font-family)',
                                                            color: "rgba(0, 0, 0, 0.60)",
                                                            fontSize: "18px",
                                                            fontWeight: "600",
                                                            lineHeight: "160%",
                                                            overflowWrap: "break-word",
                                                            wordBreak: "break-word",
                                                            whiteSpace: "normal"
                                                        }}>
                                                        {event.linkWeb}
                                                    </Typography>
                                                </Link>
                                            </div>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            ))}
                        </section>
                        <section id="tabDetailEvent" style={{ margin: isMobile ? "50px 0 100px 0" : "100px 0", width: "90vw", maxWidth: "1260px" }}>
                            <Tabs
                                // variant="fullWidth"
                                value={open}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                indicatorColor="none"
                                sx={{
                                    marginBottom: { xs: "20px", sm: "0" },

                                    "& .MuiTabs-flexContainer": {
                                        gap: "6px",
                                        justifyContent: "center"
                                    }
                                }}>
                                <Tab label="Deskripsi" {...a11yProps(0)} sx={TabStyle} />
                                <Tab label="Lokasi" {...a11yProps(1)} sx={TabStyle} />
                            </Tabs>
                            <Box>
                                <TabPanel value={open} index={0}>
                                    <ul style={{
                                        color: "rgba(0, 0, 0, 0.60)",
                                        fontSize: "20px",
                                        fontWeight: "500",
                                        lineHeight: "190%",
                                        letterSpacing: "-0.38px",

                                        marginLeft: "25px"
                                    }}>
                                        {eventList.deskripsi && Array.isArray(eventList.deskripsi) ? (
                                            eventList.deskripsi.map((deskripsi, i) => (
                                                <li key={i}>{deskripsi}</li>
                                            ))
                                        ) : (
                                            <li>Tidak ada deskripsi yang tersedia</li>
                                        )}
                                    </ul>
                                </TabPanel>
                                <TabPanel value={open} index={1}>
                                    Item Two
                                </TabPanel>
                            </Box>
                        </section>
                    </div>

                    <Footer />
                </motion.div>
            </main>
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default detailEvent;