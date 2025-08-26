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

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Collapse,
    Divider,
    Fab,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    MenuItem,
    Modal,
    Select,
    Stack,
    Tab,
    Tabs,
    Typography,
    styled,
    useMediaQuery,
    useTheme
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from 'axios';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const TabStyle = {
    borderRadius: "8px",
    // background: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',

    color: 'var(--jakartasatu-biru)',
    fontFamily: 'var(--font-family)',
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "150%",
    letterSpacing: "-0.38px",
    textTransform: "none",

    "&.Mui-selected": {
        background: "rgba(0, 53, 119, 0.08)",
        fontWeight: "700",
    }
}

const TxtDetailBab = {
    color: 'var(--jakartasatu-biru)',
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "800"
}

const LampiranIMG = {
    userDrag: "none",
    userSelect: "none",
    width: '100%',
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
                <Box sx={{ padding: "0 10px" }}>
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

function lampiranRdtr() {
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

    useEffect(() => {
        document.title = "Lampiran RDTR | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Smart RDTR", href: "/layanan/smart-rdtr" },
        { label: "Lampiran RDTR" }
    ];

    const [openTab, setOpenTab] = useState(0);

    const handleChange = (event, newValue) => {
        setOpenTab(newValue);
    };

    const [lampiranList, setLampiranList] = useState([]);

    useEffect(() => {
        const getLampiranList = async () => {
            const response = await axios.get(
                "../../api/smartrdtr/lampiran"
            );

            const newsLatest = response.data.data;
            setLampiranList(newsLatest);
        };

        getLampiranList();
    }, []);

    const [selectedMasterIndex, setSelectedMasterIndex] = useState(0);
    const [openCollapse, setOpenCollapse] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openZoom, setOpenZoom] = useState(false);
    const [zoomImage, setZoomImage] = useState("");

    // const handleClickCollapse = (index) => {
    //     // setOpenCollapse(!openCollapse);
    //     setOpenCollapse(openCollapse === index ? null : index);
    //     // setSelectedIndex(openCollapse === index ? null : index);
    // };

    const handleOpenZoom = (imageSrc) => {
        setZoomImage(imageSrc);
        setOpenZoom(true);
    };

    const handleCloseZoom = () => {
        setOpenZoom(false);
        setZoomImage("");
    };

    const handleClickCollapse = (index) => {
        if (openCollapse === index) {
            setOpenCollapse(index); // Tetap gunakan index yang sama
        } else {
            setOpenCollapse(index);
            setSelectedIndex(0);
        }
        setSelectedMasterIndex(index);
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
                        <section id="dataJakartaSatu" style={{ width: "97vw", maxWidth: "1260px", paddingTop: "50px" }}>
                            {/* <img
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
                                }} /> */}
                            <Typography variant="p"
                                style={{
                                    color: 'var(--jakartasatu-biru)',
                                    textAlign: "center",
                                    fontSize: "36px",
                                    fontWeight: "800",
                                }}>
                                Lampiran RDTR
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
                            {isMobileMD ? (
                                <Box>
                                    <Tabs
                                        variant="scrollable"
                                        scrollButtons
                                        allowScrollButtonsMobile
                                        value={openTab}
                                        onChange={handleChange}
                                        aria-label="Vertical tabs example"
                                        indicatorColor="none"
                                        sx={{
                                            "& .MuiTabs-flexContainer": {
                                                gap: "6px"
                                            }
                                        }}>
                                        <Tab label="Lampiran I" {...a11yProps(0)} sx={TabStyle} />
                                        <Tab label="Lampiran II" {...a11yProps(1)} sx={TabStyle} />
                                        <Tab label="Lampiran III" {...a11yProps(2)} sx={TabStyle} />
                                        <Tab label="Lampiran IV" {...a11yProps(3)} sx={TabStyle} />
                                        <Tab label="Lampiran V" {...a11yProps(4)} sx={TabStyle} />
                                        <Tab label="Lampiran VI" {...a11yProps(5)} sx={TabStyle} />
                                        <Tab label="Lampiran VII" {...a11yProps(6)} sx={TabStyle} />
                                        <Tab label="Lampiran VIII" {...a11yProps(7)} sx={TabStyle} />
                                        <Tab label="Lampiran IX" {...a11yProps(8)} sx={TabStyle} />
                                        <Tab label="Lampiran X" {...a11yProps(9)} sx={TabStyle} />
                                        <Tab label="Lampiran XI" {...a11yProps(10)} sx={TabStyle} />
                                        <Tab label="Lampiran XII" {...a11yProps(11)} sx={TabStyle} />
                                        <Tab label="Lampiran XIII" {...a11yProps(12)} sx={TabStyle} />
                                        <Tab label="Lampiran XIV" {...a11yProps(13)} sx={TabStyle} />
                                        <Tab label="Lampiran XV" {...a11yProps(14)} sx={TabStyle} />
                                        <Tab label="Lampiran XVI" {...a11yProps(15)} sx={TabStyle} />
                                        <Tab label="Lampiran XVII" {...a11yProps(16)} sx={TabStyle} />
                                        <Tab label="Lampiran XVIII" {...a11yProps(17)} sx={TabStyle} />
                                        <Tab label="Lampiran XIX" {...a11yProps(18)} sx={TabStyle} />
                                        <Tab label="Lampiran XX" {...a11yProps(19)} sx={TabStyle} />
                                    </Tabs>
                                    <TabPanel value={openTab} index={0}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Peta Batas Wilayah Administrasi Darat</Typography>
                                        </Box>
                                        <img
                                            src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/e11643efccda467d8b0a4a39ee6520be/data' alt="Gambar" draggable="false" style={LampiranIMG} />
                                    </TabPanel>
                                    <TabPanel value={openTab} index={1}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Select
                                                variant="outlined"
                                                value={selectedItem}
                                                onChange={handleChangeSelect}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                IconComponent={props => (
                                                    <div style={{ marginRight: '10px' }}>
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
                                                    marginTop: "-18px",
                                                    fontFamily: 'var(--font-family)',
                                                    backgroundColor: "white",
                                                    borderRadius: "20px",
                                                    color: 'var(--jakartasatu-biru)',
                                                    textAlign: "center",
                                                    fontSize: "26px",
                                                    fontWeight: "800",
                                                    '& fieldset': {
                                                        border: 'none',
                                                    },
                                                    "& .MuiSelect-select": {
                                                        textAlign: "start",
                                                        whiteSpace: "pre-wrap",
                                                        padding: "10px 20px"
                                                    },
                                                    '& .MuiSelect-icon': {
                                                        color: 'var(--jakartasatu-biru)',
                                                        fontSize: '30px',
                                                    }
                                                }}
                                            >
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item1">Peta Rencana Pengembangan Pusat Pelayanan</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item2">Peta Rencana Jaringan Transportasi</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item3">Peta Rencana Jaringan Energi</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item4">Peta Rencana Jaringan Telekomunikasi</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item5">Peta Rencana Prasarana Sumber Daya Air</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item6">Peta Rencana Jaringan Air Minum</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item7">Peta Rencana Jaringan Drainase</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item8">Peta Rencana Jaringan Air Limbah dan Limbah Bahan Berbahaya dan Beracun (B3)</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item9">Peta Rencana Prasarana Persampahan</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item10">Peta Rencana Jaringan Prasarana Lainnya</MenuItem>
                                            </Select>
                                        </Box>

                                        {selectedItem === 'item1' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/8b15cc44cf354dda8a5c042ea49a8610/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItem === 'item2' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/2eb23d1dc5ce4326a094e73b6239824b/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItem === 'item3' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/c84b6462294d41f384528324b4b28cf1/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItem === 'item4' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/20f8da8b8d044448be3567b293ee4c7f/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItem === 'item5' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/9d0a17d49a8d4af9abedba7f9c3d2433/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItem === 'item6' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/070ba9bac84e4a68be3466dfac68a784/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItem === 'item7' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/0b0f5fc1e8cc41e382051c127bae22ae/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItem === 'item8' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/2efa4fb7fa364197a18545400ffdbbc1/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItem === 'item9' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/5246abcb56624dc5997d2a1557932303/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItem === 'item10' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/a2c66dfafa214921b034670f2230debb/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}

                                    </TabPanel>
                                    <TabPanel value={openTab} index={2}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Peta Koridor Pembatasan Lalu Lintas</Typography>
                                        </Box>
                                        <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/81dc8a87f4a34899b799f05af56c7e23/data' alt="Gambar" draggable="false" style={LampiranIMG} />
                                    </TabPanel>
                                    <TabPanel value={openTab} index={3}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Peta Daerah Layanan Polder</Typography>
                                        </Box>
                                        <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/b54ea2dbd1844817b81e42a8e1f2d159/data' alt="Gambar" draggable="false" style={LampiranIMG} />
                                    </TabPanel>
                                    <TabPanel value={openTab} index={4}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Peta Daerah Pelarangan Penggunaan Air Tanah</Typography>
                                        </Box>
                                        <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/b8d9384169e34c9aa728b0c9720c366f/data' alt="Gambar" draggable="false" style={LampiranIMG} />
                                    </TabPanel>
                                    <TabPanel value={openTab} index={5}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Peta Daerah Layanan IPAL</Typography>
                                        </Box>
                                        <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/00b27645d66a4812999aa13a391740b5/data' alt="Gambar" draggable="false" style={LampiranIMG} />
                                    </TabPanel>
                                    <TabPanel value={openTab} index={6}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Klasifikasi dan Kriteria Zona dan Sub Zona</Typography>
                                        </Box>
                                        <iframe src="https://drive.google.com/file/d/1H2KhhYlU55izqU-sssoKJgIbowG6n5RW/preview" width="100%"
                                            height="650" style={{ border: "none" }}></iframe>
                                    </TabPanel>
                                    <TabPanel value={openTab} index={7}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Peta Rencana Pola Ruang</Typography>
                                        </Box>
                                        <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/2c66d9ba791645d9958cdcd7018c7c36/data' alt="Gambar" draggable="false" style={LampiranIMG} />
                                    </TabPanel>
                                    <TabPanel value={openTab} index={8}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Indikasi Program Pemanfaatan Ruang</Typography>
                                        </Box>
                                        <iframe src="https://drive.google.com/file/d/1obF-RirftS2SNIwH9Y8buMDlkl5lSxSJ/preview" width="100%"
                                            height="650" style={{ border: "none" }}></iframe>
                                    </TabPanel>
                                    <TabPanel value={openTab} index={9}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Ketentuan Kegiatan dan Penggunaan Lahan dalam Zona/Sub Zona untuk Fungsi Bangunan</Typography>
                                        </Box>
                                        <iframe src="https://drive.google.com/file/d/1yNv4YV-U7qbKyDr6TVb-nLqyCJZswQHh/preview" width="100%"
                                            height="650" style={{ border: "none" }}></iframe>
                                    </TabPanel>
                                    <TabPanel value={openTab} index={10}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Intensitas Pemanfaatan Ruang</Typography>
                                        </Box>
                                        <iframe src="https://drive.google.com/file/d/1OoIAXX8A35qGJHpu1pFxLZIlb7kqDdQR/preview" width="100%"
                                            height="650" style={{ border: "none" }}></iframe>
                                    </TabPanel>
                                    <TabPanel value={openTab} index={11}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Peta Intensitas Pemanfaatan Ruang Sub Zona K-1, K-2, dan K-3</Typography>
                                        </Box>
                                        <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/e6372c0bfaf44a359433ed0511684e5f/data' alt="Gambar" draggable="false" style={LampiranIMG} />
                                    </TabPanel>
                                    <TabPanel value={openTab} index={12}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Select
                                                variant="outlined"
                                                value={selectedItemXIII}
                                                onChange={handleChangeSelectXIII}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                IconComponent={props => (
                                                    <div style={{ marginRight: '10px' }}>
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
                                                    marginTop: "-18px",
                                                    fontFamily: 'var(--font-family)',
                                                    backgroundColor: "white",
                                                    borderRadius: "20px",
                                                    color: 'var(--jakartasatu-biru)',
                                                    textAlign: "center",
                                                    fontSize: "26px",
                                                    fontWeight: "800",
                                                    '& fieldset': {
                                                        border: 'none',
                                                    },
                                                    "& .MuiSelect-select": {
                                                        textAlign: "start",
                                                        whiteSpace: "pre-wrap",
                                                        padding: "10px 20px"
                                                    },
                                                    '& .MuiSelect-icon': {
                                                        color: 'var(--jakartasatu-biru)',
                                                        fontSize: '30px',
                                                    }
                                                }}
                                            >
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item1XIII">Peta Kawasan Keselamatan Operasional Penerbangan (KKOP)</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item2XIII">Peta Bangunan Cagar Budaya</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item3XIII">Peta Kawasan Rawan Bencana</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item4XIII">Peta Kawasan Rawan Banjir</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item5XIII">Peta Kawasan Rawan Penurunan Muka Tanah</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item6XIII">Peta Kawasan Sempadan</MenuItem>
                                            </Select>
                                        </Box>

                                        {selectedItemXIII === 'item1XIII' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/42d1cfb1f9904efebd2645322310f635/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIII === 'item2XIII' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/44179a59a84f49da813b1884f73546df/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIII === 'item3XIII' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/7e45d654943843849532ace31ba556f2/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIII === 'item4XIII' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/a20a4f22fc684d0da7c603e57e896644/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIII === 'item5XIII' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/ce95c54e8c674a84912ad5a38e2e2050/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIII === 'item6XIII' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/89c3c7abacdc483ab145691a1a4fcd07/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                    </TabPanel>
                                    <TabPanel value={openTab} index={13}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Daftar Bangunan Cagar Budaya dan Golongan</Typography>
                                        </Box>
                                        <iframe src="https://drive.google.com/file/d/1TGUfr-e3Z2M6_DY92lnbe-dn4Svjex0B/preview" width="100%"
                                            height="650" style={{ border: "none" }}></iframe>
                                    </TabPanel>
                                    <TabPanel value={openTab} index={14}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Kegiatan Hunian</Typography>
                                        </Box>
                                        <iframe src="https://drive.google.com/file/d/1Iz5UCAmFRXX-Ut3eeRjRfQ7IU7q7YL6f/preview" width="100%"
                                            height="650" style={{ border: "none" }}></iframe>
                                    </TabPanel>
                                    <TabPanel value={openTab} index={15}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Koridor GSB Nol</Typography>
                                        </Box>
                                        <iframe src="https://drive.google.com/file/d/1bRG8xYo0xj6xfGB4BQ5y3IwvZ4Bji5Nf/preview" width="100%"
                                            height="650" style={{ border: "none" }}></iframe>
                                    </TabPanel>
                                    <TabPanel value={openTab} index={16}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Peta Koridor GSB Nol</Typography>
                                        </Box>
                                        <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/83f0a86c5ef0489e8d1b766483e6ed12/data' alt="Gambar" draggable="false" style={LampiranIMG} />
                                    </TabPanel>
                                    <TabPanel value={openTab} index={17}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Peta Potensi Ruang Terbuka Hijau dan Ruang Terbuka Biru</Typography>
                                        </Box>
                                        <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/b3da3a03ec8d48ffa40b620af8e3d67e/data' alt="Gambar" draggable="false" style={LampiranIMG} />
                                    </TabPanel>
                                    <TabPanel value={openTab} index={18}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Select
                                                variant="outlined"
                                                value={selectedItemXIX}
                                                onChange={handleChangeSelectXIX}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                IconComponent={props => (
                                                    <div style={{ marginRight: '10px' }}>
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
                                                    marginTop: "-18px",
                                                    fontFamily: 'var(--font-family)',
                                                    backgroundColor: "white",
                                                    borderRadius: "20px",
                                                    color: 'var(--jakartasatu-biru)',
                                                    textAlign: "center",
                                                    fontSize: "26px",
                                                    fontWeight: "800",
                                                    '& fieldset': {
                                                        border: 'none',
                                                    },
                                                    "& .MuiSelect-select": {
                                                        textAlign: "start",
                                                        whiteSpace: "pre-wrap",
                                                        padding: "10px 20px"
                                                    },
                                                    '& .MuiSelect-icon': {
                                                        color: 'var(--jakartasatu-biru)',
                                                        fontSize: '30px',
                                                    }
                                                }}
                                            >
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item1XIX">Zona Bonus (Kode b)</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item2XIX">Zona Performa (Kode d)</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item3XIX">Zona Ambang (Kode h)</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item4XIX">Zona Khusus (Kode j)</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item5XIX">Pengendalian Pertumbuhan (Kode K1)</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item6XIX">Pengendalian Pertumbuhan (Kode K2)</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item7XIX">Pelestarian Cagar Budaya (Kode L)</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item8XIX">Zona Intensitas Sangat Tinggi (Kode m1)</MenuItem>
                                                <MenuItem sx={{ fontFamily: 'var(--font-family)', whiteSpace: "pre-wrap" }} value="item9XIX">Zona Intensitas Sangat Tinggi (Kode m2)</MenuItem>
                                            </Select>
                                        </Box>

                                        {selectedItemXIX === 'item1XIX' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/acbc5ad7816049a0b87496e75f82b723/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIX === 'item2XIX' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/79d8401680c2457b8a284e10e0ae32fd/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIX === 'item3XIX' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/50d0efd965c74e06b96529e41ef85936/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIX === 'item4XIX' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/7333d0871ec74afe94b0b9b77071d0a4/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIX === 'item5XIX' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/a065bfd1ab064a369b9cecd1fb92b2f9/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIX === 'item6XIX' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/7a89d089b50144369e4827d28687015f/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIX === 'item7XIX' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/baa9d9d5b6ad428c9eaa3773455764da/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIX === 'item8XIX' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/fc1e630b585f4791a915b2bfd7618dd6/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                        {selectedItemXIX === 'item9XIX' && (
                                            <Box>
                                                <img src='https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/4a7b8b293b174f3594cfe7f3bef7c843/data'
                                                    alt="Gambar" draggable="false" style={LampiranIMG} />
                                            </Box>
                                        )}
                                    </TabPanel>
                                    <TabPanel value={openTab} index={19}>
                                        <Box sx={{ margin: "50px 0 10px 0", textAlign: "start" }}>
                                            <Typography variant="p" sx={TxtDetailBab}>Peta Indeks Pengendali</Typography>
                                        </Box>
                                        <iframe src="https://drive.google.com/file/d/1R3WFcMadHllZekpxxLFdSwM3V3K5IjOP/preview" width="100%"
                                            height="650" style={{ border: "none" }}></iframe>
                                    </TabPanel>
                                </Box>
                            ) : (
                                <>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "flex-start",
                                            justifyContent: "center",
                                            gap: "50px",
                                        }}
                                    >
                                        {/* Sidebar List */}
                                        <Box
                                            sx={{
                                                width: "100%",
                                                maxWidth: "484px",
                                                background: "white",
                                                border: "1px solid #DFE6E9",
                                                borderRadius: "10px",
                                                padding: "26px 36px 26px 46px",
                                            }}
                                        >
                                            <Box sx={{
                                                height: "100%",
                                                // minHeight: "626px",
                                                maxHeight: "570px",
                                                overflow: "auto",
                                                paddingRight: "20px",
                                                '::-webkit-scrollbar': { width: '10px' },
                                                '::-webkit-scrollbar-track': { borderRadius: '5px', border: "1px solid #DFE6E9", margin: "20px" },
                                                '::-webkit-scrollbar-thumb': { background: '#003577', borderRadius: '5px' },
                                                '::-webkit-scrollbar-thumb:hover': { background: '#002b5e' },
                                            }}>
                                                {lampiranList?.map((lampiran, i) => (
                                                    <List key={i}>
                                                        <ListItemButton
                                                            selected={selectedMasterIndex === i}
                                                            onClick={() => handleClickCollapse(i)}
                                                            sx={{ borderRadius: "8px" }}
                                                        >
                                                            <ListItemText
                                                                disableTypography
                                                                primary={`${lampiran.judul1} ${lampiran.judul2}`}
                                                                sx={{
                                                                    color: "#003577",
                                                                    fontSize: "20px",
                                                                    fontWeight: selectedMasterIndex === i ? "700" : "500",
                                                                    lineHeight: "170%",
                                                                    letterSpacing: "-0.38px",
                                                                }}
                                                            />
                                                            {lampiran.akordion && (
                                                                <ExpandMore
                                                                    style={{
                                                                        transform: openCollapse === i ? "rotate(180deg)" : "rotate(0deg)",
                                                                        transition: "transform 0.3s",
                                                                    }}
                                                                />
                                                            )}
                                                        </ListItemButton>

                                                        {lampiran.akordion && (
                                                            <Collapse in={openCollapse === i} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding sx={{ pl: 4 }}>
                                                                    {lampiran.akordion.map((item, j) => (
                                                                        <ListItemButton
                                                                            key={j}
                                                                            selected={selectedIndex === j}
                                                                            onClick={() => setSelectedIndex(j)}
                                                                            sx={{ borderRadius: "8px" }}
                                                                        >
                                                                            <ListItem disablePadding>
                                                                                <ListItemText
                                                                                    disableTypography
                                                                                    primary={`${item.judul1} ${item.judul2}`}
                                                                                    sx={{
                                                                                        pl: 2,
                                                                                        color: "#003577",
                                                                                        fontSize: "20px",
                                                                                        fontWeight: selectedIndex === j ? "700" : "500",
                                                                                        lineHeight: "170%",
                                                                                        letterSpacing: "-0.38px",
                                                                                    }}
                                                                                />
                                                                            </ListItem>
                                                                        </ListItemButton>
                                                                    ))}
                                                                </List>
                                                            </Collapse>
                                                        )}
                                                    </List>
                                                ))}
                                            </Box>
                                        </Box>

                                        {/* Detail View */}
                                        <Box sx={{ width: "100%" }}>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    maxWidth: "1000px",
                                                    height: "100%",
                                                    minHeight: "626px",
                                                    maxHeight: "626px",
                                                    background: "white",
                                                    border: "1px solid #DFE6E9",
                                                    borderRadius: "10px",
                                                }}
                                            >
                                                {selectedIndex !== null && openCollapse !== null && (
                                                    <>
                                                        <Box
                                                            sx={{
                                                                textAlign: "center",
                                                                borderRadius: "10px 10px 0px 0px",
                                                                background: 'var(--jakartasatu-biru)',
                                                                padding: "13px 0",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="p"
                                                                sx={{
                                                                    textAlign: "center",
                                                                    color: "white",
                                                                    fontSize: "20px",
                                                                    fontWeight: "600",
                                                                    lineHeight: "150%",
                                                                    letterSpacing: "-0.38px",
                                                                }}
                                                            >
                                                                {lampiranList[openCollapse]?.akordion?.[selectedIndex]?.judul1 || lampiranList[openCollapse]?.judul1}{" "}
                                                                {lampiranList[openCollapse]?.akordion?.[selectedIndex]?.judul2 || lampiranList[openCollapse]?.judul2}
                                                            </Typography>
                                                        </Box>

                                                        <Box sx={{ padding: "48px" }}>
                                                            {lampiranList?.[openCollapse]?.akordion?.[selectedIndex]?.gambar ? (
                                                                <>
                                                                    <img
                                                                        src={lampiranList[openCollapse]?.akordion[selectedIndex]?.gambar}
                                                                        alt="Gambar Akordion"
                                                                        draggable="false"
                                                                        onClick={() => handleOpenZoom(lampiranList[openCollapse]?.akordion[selectedIndex]?.gambar)}
                                                                        style={{
                                                                            userDrag: "none",
                                                                            userSelect: "none",
                                                                            width: '100%',
                                                                            height: 'auto',
                                                                            cursor: "pointer",
                                                                        }}
                                                                    />
                                                                    <Typography variant='p' sx={{
                                                                        color: "#222",
                                                                        fontSize: "12px",
                                                                        fontStyle: "italic",
                                                                        fontWeight: "300",
                                                                        lineHeight: "100%",
                                                                        display: "flex",
                                                                        justifyContent: "flex-end",
                                                                    }}>
                                                                        *klik gambar untuk memperbesar
                                                                    </Typography>
                                                                </>
                                                            ) : (
                                                                lampiranList[openCollapse]?.gambar && (
                                                                    <>
                                                                        <img
                                                                            src={lampiranList[openCollapse]?.gambar}
                                                                            alt="Gambar Utama"
                                                                            draggable="false"
                                                                            onClick={() => handleOpenZoom(lampiranList[openCollapse]?.gambar)}
                                                                            style={{
                                                                                userDrag: "none",
                                                                                userSelect: "none",
                                                                                width: '100%',
                                                                                height: 'auto',
                                                                                cursor: "pointer",
                                                                            }}
                                                                        />
                                                                        <Typography variant='p' sx={{
                                                                            color: "#222",
                                                                            fontSize: "12px",
                                                                            fontStyle: "italic",
                                                                            fontWeight: "300",
                                                                            lineHeight: "100%",
                                                                            display: "flex",
                                                                            justifyContent: "flex-end",
                                                                        }}>
                                                                            *klik gambar untuk memperbesar
                                                                        </Typography>
                                                                    </>
                                                                )
                                                            )}

                                                            {lampiranList[openCollapse]?.iframe && (
                                                                <iframe
                                                                    src={lampiranList[openCollapse]?.iframe}
                                                                    width="100%"
                                                                    height="460"
                                                                    style={{ border: "none" }}
                                                                ></iframe>
                                                            )}
                                                        </Box>
                                                    </>
                                                )}
                                            </Box>
                                        </Box>

                                        {/* Modal Zoom Gambar */}
                                        <Modal open={openZoom}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                    bgcolor: "background.paper",
                                                    boxShadow: 24,
                                                    p: 2,
                                                    borderRadius: "10px",
                                                    maxWidth: "90%",
                                                    maxHeight: "90%",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <Fab size='medium' onClick={handleCloseZoom} sx={{
                                                    position: "absolute",
                                                    top: 10,
                                                    right: 10,
                                                    background: "#f44336",
                                                    color: "white",
                                                    '&:hover': { background: "#d32f2f" }
                                                }}>
                                                    <CloseRoundedIcon />
                                                </Fab>
                                                <img src={zoomImage} alt="Gambar Zoom" style={{ width: "auto", maxHeight: "90vh" }} />
                                            </Box>
                                        </Modal>
                                    </Box>
                                </>
                            )}
                        </section >
                    </div>

                    <Footer />
                </motion.div>
            </main>
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default lampiranRdtr;