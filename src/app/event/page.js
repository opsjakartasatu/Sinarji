"use client"

import { motion } from 'framer-motion';

import styles from "../../components/page.module.css";

import Navbar from '../../components/navbar/navbar';
import "../../components/navbar/style.css";
import Footer from '../../components/footer/footer';
import ScrollTop from '../../components/scrollTop';
import KritikSaran from '../../components/kritikSaran';
import Breadcrumbs from '../../components/breadcrumbs';

import PropTypes from 'prop-types';

import { useEffect, useState } from "react";
import { Box, Button, Card, Tab, Tabs, Typography, useMediaQuery, useTheme, Select, MenuItem, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import axios from "axios";

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const TabStyle = {
    borderRadius: "8px",
    // background: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',

    color: 'var(--jakartasatu-biru)',
    fontFamily: 'var(--font-family)',
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

function event() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileHeight = useMediaQuery("(max-height: 431px)");
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
        { label: "Event" }
    ];

    const [eventList, setEventList] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [hoveredIndexTab, setHoveredIndexTab] = useState(-1);
    const [open, setOpen] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [visibleEventsCount, setVisibleEventsCount] = useState(9);
    const [loading, setLoading] = useState(false);
    const [loadMoreEnabled, setLoadMoreEnabled] = useState(false);
    const [allEventsLoaded, setAllEventsLoaded] = useState(false);

    useEffect(() => {
        const getEventList = async () => {
            const response = await axios.get(
                "/api/event"
            );

            const newsLatest = response.data;
            const kategori = [...new Set(newsLatest.map(event => event.kategori))];
            setUniqueCategories(["Semua", ...kategori]);
            setEventList(newsLatest);
        };

        getEventList();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (loadMoreEnabled && window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && !loading) {
                loadMoreEvents();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, loadMoreEnabled]);

    const handleChange = (event, newValue) => {
        setOpen(newValue);
    };

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    const loadMoreEvents = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleEventsCount((prevCount) => {
                const newCount = prevCount + 6;
                if (newCount >= eventList.length) {
                    setAllEventsLoaded(true);
                }
                return newCount;
            });
            setLoading(false);
        }, 1000);
    };

    const handleLoadMoreClick = () => {
        setLoadMoreEnabled(true);
        loadMoreEvents();
    };

    useEffect(() => {
        setVisibleEventsCount(isMobileMD ? 6 : 9);
    }, [isMobileMD]);

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
                        <section id="welcomeEvent" style={{ margin: isMobile ? "50px 0 100px 0" : "160px 0", width: "90vw", maxWidth: "1260px" }}>
                            <img
                                src='assets/Partikel-1.png'
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
                            <Grid container
                                direction={isMobile ? "column" : "row"}
                                justifyContent="center"
                                alignItems="center">
                                <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <p
                                        style={{
                                            fontSize: "34px",
                                            padding: "0 0 50px 0",
                                            color: 'var(--jakartasatu-biru)',
                                            fontWeight: "600",
                                        }}>
                                        Temukan Beragam Acara Menarik di Jakarta
                                    </p>
                                    <Typography variant="p" paragraph
                                        sx={{
                                            color: "rgba(0, 0, 0, 0.70)",
                                            fontSize: "22px",
                                            fontWeight: "500",
                                            maxWidth: isMobile ? "100%" : "90%",
                                        }}>
                                        Cari acara yang  seru dan menarik di Jakarta? Temukan di sini!
                                    </Typography>
                                </Grid>
                                <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <img src='assets/event-welcome.png'
                                            alt="Gambar"
                                            draggable="false"
                                            style={{
                                                maxWidth: isMobile ? '350px' : '559px',
                                                height: 'auto',
                                                // marginTop: isMobile ? "0" : "-100px",

                                                userDrag: "none",
                                                userSelect: "none"
                                            }} />
                                    </div>
                                </Grid>
                            </Grid>
                        </section>
                        <section id="eventAkanDatang" style={{ width: "90vw", maxWidth: "1260px" }}>
                            <Typography variant="body1" gutterBottom
                                sx={{
                                    fontFamily: 'var(--font-family)',
                                    color: 'var(--jakartasatu-biru)',
                                    fontSize: "28px",
                                    fontWeight: "500",
                                    letterSpacing: "0.07px",
                                    marginBottom: "40px"
                                }}>
                                Event yang akan datang
                            </Typography>
                            <Grid container
                                spacing={{ xs: 2, sm: 8 }}
                                direction="row"
                                justifyContent={isMobile ? "center" : "space-between"}
                                alignItems="baseline">
                                {eventList.slice(0, 3).map((event, i) => (
                                    <Grid key={i} xs={12} sm={6} md={4} lg={4} xl={4}>
                                        <Link href={`/event/${event.slug}`}>
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    background: "none",
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    borderRadius: "20px",
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)"
                                                    },
                                                    '&:hover img': {
                                                        transform: 'scale(1.1)',
                                                    }
                                                }}
                                                onMouseEnter={() => setHoveredIndex(i)}
                                                onMouseLeave={() => setHoveredIndex(-1)}
                                            >
                                                <img
                                                    alt=""
                                                    src={event.imgSrc}
                                                    style={{
                                                        height: "100%",
                                                        maxHeight: "257px",
                                                        transition: 'transform 0.3s ease',
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        width: "100%",
                                                        height: "100%",
                                                        pointerEvents: "none",
                                                        display: "flex",
                                                        justifyContent: "flex-end",
                                                        padding: "20px"
                                                    }}
                                                >
                                                    <svg id="11" xmlns="http://www.w3.org/2000/svg" width="225" height="28" viewBox="0 0 225 27" fill="none">
                                                        <rect x="19" width="191" height="28" fill='var(--jakartasatu-orange)' />
                                                        <path d="M0 27L8.36979 13.5L0 0H19.0223C20.1809 0 21.132 0.578572 21.841 1.65857L29.398 13.5L21.841 25.3414C21.132 26.4214 20.1809 27 19.0223 27H0Z" fill='var(--jakartasatu-orange)' />
                                                        <path d="M224.398 3.8147e-06L216.029 13.5L224.398 27L205.376 27C204.218 27 203.266 26.4214 202.557 25.3414L195 13.5L202.557 1.65857C203.266 0.578575 204.218 1.75243e-06 205.376 1.87083e-06L224.398 3.8147e-06Z" fill='var(--jakartasatu-orange)' />
                                                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14px" fontWeight="bold">
                                                            {event.kategori}
                                                        </text>
                                                    </svg>
                                                </div>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        padding: '10px 40px',
                                                        background: 'rgba(0, 0, 0, 0.6)',
                                                        color: 'white',
                                                        transform: isMobile || isMobileHeight ? 'translateY(0)' : (hoveredIndex === i ? 'translateY(0)' : 'translateY(100%)'),
                                                        // transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(100%)',
                                                        transition: 'transform 0.3s ease',
                                                    }}
                                                >
                                                    <Typography variant="body1" gutterBottom
                                                        sx={{
                                                            color: "white",
                                                            fontFamily: 'var(--font-family)',
                                                            fontSize: "20px",
                                                            fontWeight: "700",
                                                        }}>
                                                        {event.namaData}
                                                    </Typography>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
                                                            <path d="M4.5 6.175C4.07376 6.175 3.66498 6.0038 3.36358 5.69905C3.06218 5.3943 2.89286 4.98098 2.89286 4.55C2.89286 4.11902 3.06218 3.7057 3.36358 3.40095C3.66498 3.0962 4.07376 2.925 4.5 2.925C4.92624 2.925 5.33502 3.0962 5.63642 3.40095C5.93782 3.7057 6.10714 4.11902 6.10714 4.55C6.10714 4.7634 6.06557 4.97471 5.98481 5.17186C5.90404 5.36901 5.78566 5.54815 5.63642 5.69905C5.48718 5.84994 5.31001 5.96964 5.11503 6.0513C4.92004 6.13297 4.71105 6.175 4.5 6.175ZM4.5 0C3.30653 0 2.16193 0.479374 1.31802 1.33266C0.474106 2.18595 0 3.34326 0 4.55C0 7.9625 4.5 13 4.5 13C4.5 13 9 7.9625 9 4.55C9 3.34326 8.52589 2.18595 7.68198 1.33266C6.83807 0.479374 5.69347 0 4.5 0Z" fill="white" />
                                                        </svg>
                                                        <Typography variant="body1"
                                                            sx={{
                                                                color: "white",
                                                                fontFamily: 'var(--font-family)',
                                                                fontSize: "14px",
                                                                fontWeight: "700",
                                                                alignItems: "center"
                                                            }}>
                                                            {event.lokasi}
                                                        </Typography>
                                                    </div>
                                                </Box>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        </section>
                        <section id="semuaEvent" style={{ margin: isMobile ? "50px 0 100px 0" : "100px 0 0 0", width: "90vw", maxWidth: "1260px" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column-reverse", sm: "row" },
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "70px",
                                }}>
                                <Select
                                    value={selectedRegion}
                                    onChange={handleRegionChange}
                                    displayEmpty
                                    IconComponent={props => (
                                        <div style={{ marginRight: '5px' }}>
                                            <KeyboardArrowDownRoundedIcon {...props} />
                                        </div>
                                    )}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                bgcolor: 'white',
                                                borderRadius: "20px",
                                                whiteSpace: "pre-wrap",
                                            },
                                        },
                                    }}
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        backgroundColor: "#DFE6E9",
                                        borderRadius: "20px",
                                        color: 'var(--jakartasatu-biru)',
                                        textAlign: "center",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        lineHeight: "160%",

                                        '& fieldset': {
                                            border: 'none',
                                        },
                                        "& .MuiSelect-select": {
                                            textAlign: "start",
                                            whiteSpace: "pre-wrap",
                                            // padding: "10px"
                                        },
                                        '& .MuiSelect-icon': {
                                            color: 'var(--jakartasatu-biru)',
                                            fontSize: '21px',
                                        }
                                    }}
                                >
                                    <MenuItem value="">Semua Wilayah</MenuItem>
                                    {[...new Set(eventList.map(event => event.wilayah))].map((wilayah, index) => (
                                        <MenuItem key={index} value={wilayah}>{wilayah}</MenuItem>
                                    ))}
                                </Select>
                                <Tabs
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    value={open}
                                    onChange={handleChange}
                                    aria-label="Vertical tabs example"
                                    indicatorColor="none"
                                    sx={{
                                        width: { xs: "98vw", sm: "100%" },
                                        marginBottom: { xs: "20px", sm: "0" },

                                        "& .MuiTabs-flexContainer": {
                                            gap: "6px"
                                        }
                                    }}>
                                    {uniqueCategories.map((kategori, index) => (
                                        <Tab key={index} label={kategori} {...a11yProps(index)} sx={TabStyle} />
                                    ))}
                                </Tabs>
                            </Box>
                            <Box>
                                {uniqueCategories.map((kategori, index) => (
                                    <TabPanel key={index} value={open} index={index}>
                                        <Grid container
                                            spacing={{ xs: 2, sm: 8 }}
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="baseline">
                                            {eventList.filter(event =>
                                                (kategori === "Semua" || event.kategori === kategori) &&
                                                (selectedRegion === "" || event.wilayah === selectedRegion)
                                            ).slice(0, visibleEventsCount).map((event, indexTab) => (
                                                <Grid key={indexTab} xs={6} sm={6} md={4} lg={4} xl={4}>
                                                    <Link href={`/event/${event.slug}`}>
                                                        <Card
                                                            elevation={0}
                                                            sx={{
                                                                background: "none",
                                                                height: "100%",
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                borderRadius: "20px",
                                                                position: 'relative',
                                                                overflow: 'hidden',
                                                                cursor: 'pointer',
                                                                '&:hover': {
                                                                    boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)"
                                                                },
                                                                '&:hover img': {
                                                                    transform: 'scale(1.1)',
                                                                }
                                                            }}
                                                            onMouseEnter={() => setHoveredIndexTab(indexTab)}
                                                            onMouseLeave={() => setHoveredIndexTab(-1)}
                                                        >
                                                            <img
                                                                alt=""
                                                                src={event.imgSrc}
                                                                style={{
                                                                    // maxWidth: "100%",
                                                                    height: "100%",
                                                                    maxHeight: "257px",
                                                                    transition: 'transform 0.3s ease',
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    position: "absolute",
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    pointerEvents: "none",
                                                                    display: "flex",
                                                                    justifyContent: "flex-end",
                                                                    padding: isMobile ? "10px" : "20px"
                                                                }}
                                                            >
                                                                <svg id="11" xmlns="http://www.w3.org/2000/svg" width="225" height="28" viewBox="0 0 225 27" fill="none">
                                                                    <rect x="19" width="191" height="28" fill='var(--jakartasatu-orange)' />
                                                                    <path d="M0 27L8.36979 13.5L0 0H19.0223C20.1809 0 21.132 0.578572 21.841 1.65857L29.398 13.5L21.841 25.3414C21.132 26.4214 20.1809 27 19.0223 27H0Z" fill='var(--jakartasatu-orange)' />
                                                                    <path d="M224.398 3.8147e-06L216.029 13.5L224.398 27L205.376 27C204.218 27 203.266 26.4214 202.557 25.3414L195 13.5L202.557 1.65857C203.266 0.578575 204.218 1.75243e-06 205.376 1.87083e-06L224.398 3.8147e-06Z" fill='var(--jakartasatu-orange)' />
                                                                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14px" fontWeight="bold">
                                                                        {event.kategori}
                                                                    </text>
                                                                </svg>
                                                            </div>
                                                            <Box
                                                                sx={{
                                                                    position: 'absolute',
                                                                    bottom: 0,
                                                                    left: 0,
                                                                    width: '100%',
                                                                    padding: isMobile ? "10px" : '10px 40px',
                                                                    background: 'rgba(0, 0, 0, 0.6)',
                                                                    color: 'white',
                                                                    transform: isMobile || isMobileHeight ? 'translateY(0)' : (hoveredIndexTab === indexTab ? 'translateY(0)' : 'translateY(100%)'),
                                                                    // transform: hoveredIndexTab === indexTab ? 'translateY(0)' : 'translateY(100%)',
                                                                    transition: 'transform 0.3s ease',
                                                                }}
                                                            >
                                                                <Typography variant="body1" gutterBottom
                                                                    sx={{
                                                                        whiteSpace: 'nowrap',
                                                                        textOverflow: 'ellipsis',
                                                                        overflow: 'hidden',
                                                                        color: 'white',
                                                                        fontFamily: 'inherit',
                                                                        fontSize: isMobile ? "12px" : '20px',
                                                                        fontWeight: isMobile ? "600" : '700',
                                                                    }}>
                                                                    {event.namaData}
                                                                </Typography>
                                                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "6" : "9"} height={isMobile ? "10" : "13"} viewBox="0 0 9 13" fill="none">
                                                                        <path d="M4.5 6.175C4.07376 6.175 3.66498 6.0038 3.36358 5.69905C3.06218 5.3943 2.89286 4.98098 2.89286 4.55C2.89286 4.11902 3.06218 3.7057 3.36358 3.40095C3.66498 3.0962 4.07376 2.925 4.5 2.925C4.92624 2.925 5.33502 3.0962 5.63642 3.40095C5.93782 3.7057 6.10714 4.11902 6.10714 4.55C6.10714 4.7634 6.06557 4.97471 5.98481 5.17186C5.90404 5.36901 5.78566 5.54815 5.63642 5.69905C5.48718 5.84994 5.31001 5.96964 5.11503 6.0513C4.92004 6.13297 4.71105 6.175 4.5 6.175ZM4.5 0C3.30653 0 2.16193 0.479374 1.31802 1.33266C0.474106 2.18595 0 3.34326 0 4.55C0 7.9625 4.5 13 4.5 13C4.5 13 9 7.9625 9 4.55C9 3.34326 8.52589 2.18595 7.68198 1.33266C6.83807 0.479374 5.69347 0 4.5 0Z" fill="white" />
                                                                    </svg>
                                                                    <Typography variant="body1"
                                                                        sx={{
                                                                            color: "white",
                                                                            fontFamily: 'var(--font-family)',
                                                                            fontSize: isMobile ? "10px" : '14px',
                                                                            fontWeight: isMobile ? "600" : '700',
                                                                            alignItems: "center",
                                                                        }}>
                                                                        {event.lokasi}
                                                                    </Typography>
                                                                </div>
                                                            </Box>
                                                        </Card>
                                                    </Link>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        {loading && !allEventsLoaded && (
                                            <Typography variant="p" paragraph sx={{
                                                color: "rgba(0, 0, 0, 0.90)",
                                                fontSize: "16px",
                                                fontWeight: 400,
                                                textAlign: "center",
                                                mt: 2,
                                            }}> <CircularProgress size={15} /> Lihat lainnya</Typography>
                                        )}
                                    </TabPanel>
                                ))}
                            </Box>
                            {!loadMoreEnabled && !allEventsLoaded && (
                                <Box textAlign="center" mt={4}>
                                    <Button onClick={handleLoadMoreClick} variant="contained" color="primary"
                                        sx={{
                                            mt: 4,
                                            borderRadius: "40px",
                                            background: 'var(--jakartasatu-biru)',
                                            boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                            textTransform: "none",
                                            color: "white",
                                            fontFamily: 'var(--font-family)',
                                            fontSize: "16px",
                                            fontWeight: "400",
                                        }}>
                                        Lihat lainnya
                                    </Button>
                                </Box>
                            )}
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

export default event;