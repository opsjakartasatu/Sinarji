"use client"

import { motion } from 'framer-motion';

import styles from "../../../../components/page.module.css";
import Navbar from '../../../../components/navbar/navbar';
import "../../../../components/navbar/style.css";
import Footer from '../../../../components/footer/footer';
import ScrollTop from '../../../../components/scrollTop';
import KritikSaran from '../../../../components/kritikSaran';
import Breadcrumbs from '../../../../components/breadcrumbs';

import axios from "axios";

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    InputAdornment,
    OutlinedInput,
    Stack,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
    List,
    ListItem,
    ListItemText,
    Chip,
    FormControl,
    Select,
    MenuItem,
    InputLabel
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import DatasetIcon from '@mui/icons-material/Dataset';
import MapIcon from '@mui/icons-material/Map';
import LaunchIcon from '@mui/icons-material/Launch';
import SortIcon from '@mui/icons-material/Sort';

import { useEffect, useState } from "react";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import PropTypes from 'prop-types';
import CustomImage from '@/components/CustomImage';

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
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
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

function detailSimpulJaringan() {
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

    const { id } = useParams();

    const [simpulJaringanDetail, setSimpulJaringanDetail] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' untuk A-Z, 'desc' untuk Z-A

    useEffect(() => {
        const getSimpulJaringanDetail = async () => {
            const response = await axios.get(
                process.env.API_WEB + `/simpul-jaringan/${id}`
            );
            // console.log(response)
            const newsLatest = response.data.data;
            setSimpulJaringanDetail(newsLatest);
        };
        getSimpulJaringanDetail();
    }, [id]);

    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Simpul Jaringan", href: "/kolaborasi/simpul-jaringan" },
        { label: `${simpulJaringanDetail?.judul}` }
    ];

    // Fungsi untuk mengurutkan data berdasarkan nama
    const sortData = (data, order) => {
        return data.sort((a, b) => {
            const nameA = a.nama.toLowerCase();
            const nameB = b.nama.toLowerCase();

            if (order === 'asc') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });
    };

    // Filter dan sort data berdasarkan search dan sort order
    const filteredKatalogData = sortData(
        simpulJaringanDetail?.katalog_data?.filter((item) =>
            item.nama.toLowerCase().includes(search.toLowerCase())
        ) || [],
        sortOrder
    );

    const filteredKatalogPeta = sortData(
        simpulJaringanDetail?.katalog_peta?.filter((item) =>
            item.nama.toLowerCase().includes(search.toLowerCase())
        ) || [],
        sortOrder
    );

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSortChange = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
    };

    const [valueTab, setValueTab] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
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
                    <div className={styles.container}
                        style={{
                            marginTop: "80px",
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center"
                        }}>
                        <section style={{ width: "90vw", maxWidth: "1260px" }}>

                            <Box id='iconElement' sx={{
                                zIndex: "-1",
                                position: "sticky",
                                width: "100%",
                                maxWidth: "1260px",
                                userDrag: "none",
                                userSelect: "none",
                                opacity: "50%",
                                display: {
                                    xs: "none",
                                    sm: "none",
                                    md: "block"
                                },
                            }}>
                                <div style={{
                                    position: "absolute",
                                    right: 0,

                                    marginTop: "-50px",
                                    marginRight: "150px",
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                                        <g opacity="0.5" clipPath="url(#clip0_23286_307)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M17.1907 37.0568C17.2396 36.874 17.3304 36.7052 17.4558 36.5635C17.5813 36.4219 17.738 36.3115 17.9136 36.2409L23.5679 33.9688C23.8678 33.8483 24.2034 33.8519 24.5007 33.9787C24.798 34.1056 25.0327 34.3453 25.1532 34.6453C25.2737 34.9452 25.2702 35.2807 25.1433 35.578C25.0165 35.8753 24.7767 36.11 24.4768 36.2305L19.3879 38.2754L17.0255 47.1055L46.428 35.2906L38.6126 30.5503L33.5237 32.5952C33.2238 32.7157 32.8882 32.7121 32.5909 32.5853C32.2936 32.4584 32.0589 32.2187 31.9384 31.9187C31.8179 31.6188 31.8214 31.2833 31.9483 30.986C32.0751 30.6887 32.3149 30.454 32.6148 30.3334L38.2692 28.0613C38.4447 27.9908 38.6343 27.9621 38.8229 27.9775C39.0114 27.9929 39.1938 28.052 39.3556 28.1501L49.7762 34.4705C49.9697 34.5879 50.1267 34.7569 50.2296 34.9584C50.3325 35.16 50.3773 35.3863 50.3588 35.6119C50.3404 35.8375 50.2595 36.0535 50.1252 36.2357C49.9909 36.4179 49.8086 36.5591 49.5985 36.6435L15.6726 50.2761C15.4626 50.3605 15.2333 50.3847 15.0102 50.3461C14.7872 50.3075 14.5794 50.2075 14.41 50.0574C14.2406 49.9073 14.1163 49.713 14.0511 49.4963C13.9859 49.2795 13.9824 49.0489 14.0409 48.8302L17.1907 37.0568Z" fill="#003577" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.6824 19.9523C11.983 18.2112 11.8008 16.3053 12.1577 14.4632C12.5145 12.6212 13.3954 10.9212 14.6945 9.56733C15.9935 8.21346 17.6557 7.26318 19.4815 6.83053C21.3072 6.39788 23.219 6.50124 24.9875 7.12819C26.756 7.75515 28.306 8.87907 29.4516 10.3651C30.5971 11.8511 31.2896 13.6362 31.4458 15.506C31.602 17.3758 31.2154 19.2509 30.3323 20.9065C29.4493 22.562 28.1073 23.9276 26.4674 24.8393L31.4942 37.3489C31.6147 37.6489 31.6111 37.9844 31.4843 38.2817C31.3574 38.579 31.1177 38.8137 30.8177 38.9342C30.5178 39.0547 30.1823 39.0512 29.885 38.9243C29.5877 38.7975 29.353 38.5577 29.2325 38.2578L24.2066 25.7504C21.9087 26.3538 19.4695 26.0973 17.3474 25.0293C15.2252 23.9612 13.5669 22.1573 12.6824 19.9523Z" fill="#F7941D" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_23286_307">
                                                <rect width="39" height="39" fill="white" transform="translate(0 14.543) rotate(-21.892)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div style={{
                                    position: "absolute",
                                    left: 0,

                                    // marginTop: "-50px",
                                    marginLeft: "100px",
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                                        <g opacity="0.5">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.1069 41.0416L19.1123 41.0508L19.1158 41.057C19.3704 41.3847 19.7251 41.6201 20.1259 41.7275C20.5266 41.8349 20.9515 41.8083 21.3358 41.6518L21.342 41.6483L21.3512 41.6429L21.3863 41.6289C21.5754 41.5498 21.7629 41.467 21.9486 41.3804C24.1734 40.3367 26.2954 39.0868 28.2868 37.6469C31.8551 35.0497 36.0432 31.0062 37.5139 25.5172C38.3788 22.2894 37.9261 18.8501 36.2552 15.9561C34.5843 13.062 31.8322 10.9503 28.6043 10.0854C25.3765 9.22045 21.9372 9.67324 19.0432 11.3441C16.1491 13.015 14.0374 15.7671 13.1725 18.995C11.7017 24.484 13.3069 30.0797 15.101 34.1138C16.1057 36.3564 17.3184 38.4999 18.7233 40.5162L19.0836 41.0118L19.1069 41.0416ZM24.3649 25.9073C24.8443 26.0358 25.3444 26.0686 25.8366 26.0038C26.3287 25.939 26.8033 25.7779 27.2332 25.5297C27.6631 25.2815 28.0399 24.9511 28.3421 24.5572C28.6443 24.1634 28.8659 23.7139 28.9944 23.2344C29.1229 22.755 29.1557 22.2549 29.0909 21.7627C29.0261 21.2706 28.865 20.796 28.6168 20.3661C28.3686 19.9362 28.0381 19.5594 27.6443 19.2572C27.2505 18.955 26.801 18.7334 26.3215 18.6049C25.3532 18.3454 24.3214 18.4812 23.4532 18.9825C22.585 19.4838 21.9514 20.3094 21.692 21.2778C21.4325 22.2461 21.5683 23.2779 22.0696 24.1461C22.5709 25.0143 23.3965 25.6479 24.3649 25.9073Z" fill="#003577" />
                                        </g>
                                    </svg>
                                </div>
                            </Box>

                            <Stack
                                direction="column"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={4}>
                                <Typography variant='p' sx={{
                                    color: "var(--jakartasatu-biru)",
                                    textAlign: "center",

                                    fontSize: { xs: "32px", sm: "36px" },
                                    fontWeight: 800,
                                }}>
                                    {simpulJaringanDetail?.judul}
                                </Typography>
                                <Box sx={{
                                    // width: "100%",
                                    maxWidth: "500px",
                                    height: "100%",
                                    maxHeight: "500px"
                                }}>
                                    <img
                                        alt=""
                                        src={simpulJaringanDetail?.icon}
                                        style={{
                                            width: "100%",
                                            // maxWidth: "400px",
                                            height: "100%",
                                            // minHeight: "270.189px",
                                            maxHeight: "300px",
                                        }}
                                    />
                                </Box>
                                <Button
                                    variant="contained"
                                    href={simpulJaringanDetail?.link}
                                    target='_blank'
                                    disableElevation
                                    disableRipple
                                    disableTouchRipple
                                    sx={{
                                        borderRadius: "30px",
                                        textTransform: "none",
                                        boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                        width: "100%",
                                        maxWidth: "233px",
                                        height: "52.449px",

                                        color: "white",
                                        fontFamily: "var(--font-family)",
                                        background: 'var(--jakartasatu-orange)',
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        letterSpacing: "-0.342px",
                                    }}>
                                    Kunjungi Website
                                </Button>
                                <Typography variant='p' sx={{
                                    color: "rgba(0, 0, 0, 0.60)",
                                    textAlign: "center",

                                    fontSize: { xs: "16px", sm: "20px" },
                                    fontWeight: 400,
                                    lineHeight: "36px",
                                    letterSpacing: "0.03px",
                                }}>
                                    {simpulJaringanDetail.judul} DKI Jakarta sebagai bagian dari program Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan) mempunyai tugas melakukan pengintegrasian dan pemanfaatan sistem peta dan data sesuai dengan ruang lingkup tugas pokok dan fungsinya dalam Program Jakarta Satu.
                                </Typography>
                            </Stack>

                            <Box id='iconElement' sx={{
                                zIndex: "-1",
                                position: "sticky",
                                width: "100%",
                                maxWidth: "1440px",
                                userDrag: "none",
                                userSelect: "none",
                                opacity: "50%",
                                display: {
                                    xs: "none",
                                    sm: "none",
                                    md: "block"
                                },
                            }}>
                                <div style={{
                                    position: "absolute",
                                    left: 0,

                                    marginTop: "-300px",
                                    marginLeft: "200px",
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
                                        <g opacity="0.5" clipPath="url(#clip0_23286_311)">
                                            <path d="M39.9967 13.3364L22.2805 8.92083C21.9897 8.8486 21.6853 8.85139 21.3958 8.92896C21.1063 9.00652 20.8413 9.15632 20.6255 9.3643L7.54751 21.9579C7.32041 22.177 7.15602 22.4528 7.07136 22.7568C6.98669 23.0608 6.98484 23.3819 7.066 23.6869C7.14715 23.9918 7.30835 24.2696 7.53292 24.4913C7.75748 24.713 8.03723 24.8707 8.34319 24.9479L26.0777 29.4319C26.37 29.5057 26.6762 29.5036 26.9674 29.4259C27.2586 29.3482 27.5252 29.1974 27.7418 28.9878L40.8014 16.3259C41.0284 16.1061 41.1923 15.8297 41.2764 15.5252C41.3604 15.2207 41.3614 14.8992 41.2793 14.5942C41.1972 14.2892 41.035 14.0117 40.8094 13.7905C40.5839 13.5694 40.3033 13.4126 39.9967 13.3364Z" fill="#F7941D" />
                                            <path d="M27.7813 32.6086L11.0557 28.4223L10.1963 31.8559L27.8749 36.2815C28.1666 36.3545 28.4721 36.352 28.7626 36.2741C29.0531 36.1963 29.3189 36.0458 29.5351 35.8367L42.6324 23.1647L40.1714 20.6208L27.7813 32.6086Z" fill="#003577" />
                                            <path d="M29.6139 39.4484L12.8882 35.2622L12.0288 38.6957L29.7074 43.1214C29.9992 43.1944 30.3047 43.1918 30.5951 43.114C30.8856 43.0361 31.1515 42.8856 31.3676 42.6765L44.4649 30.0045L42.0039 27.4607L29.6139 39.4484Z" fill="#F7941D" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_23286_311">
                                                <rect width="42.482" height="42.482" fill="white" transform="translate(0 10.9961) rotate(-15)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div style={{
                                    position: "absolute",
                                    right: 0,

                                    marginTop: "-220px",
                                    marginRight: "50px",
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                        <path opacity="0.5" d="M17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0ZM12.7855 4.6074C13.4046 4.94071 14.1363 5.25603 14.9816 5.55362C15.8269 5.8512 16.6662 6.00038 17.4995 6.00038C18.1145 5.99919 18.728 5.84656 19.2499 5.46428C19.7552 5.16146 20.2443 4.91983 20.8926 4.98202C21.5588 5.05481 22.2604 5.28419 22.9638 5.32219C23.8448 5.79836 24.7022 6.39274 25.5356 7.10702C25.1308 7.13082 24.7015 7.17343 24.2492 7.23299C23.7968 7.29255 23.3569 7.38092 22.9283 7.49995C22.4997 7.61898 22.1067 7.77453 21.7495 7.96498C21.3924 8.15547 21.1304 8.39299 20.9637 8.6787C20.7018 9.10727 20.5175 9.4705 20.4104 9.76812C20.1899 10.3852 20.242 11.3697 19.7322 11.8221C19.6251 11.8935 19.5356 11.9766 19.4641 12.0718C19.3927 12.167 19.3629 12.2917 19.3748 12.4464C19.3867 12.6012 19.4645 12.8217 19.6073 13.1074C19.6787 13.2741 19.7373 13.4764 19.7849 13.7145C20.2373 13.7131 20.7064 13.645 21.1069 13.3571L23.4644 13.5714C24.073 12.8859 24.7821 12.8745 25.3924 13.5714C25.5829 13.7618 25.7853 14.0484 25.9995 14.4293L24.9995 15.1075C24.7614 15.0361 24.4759 14.8934 24.1426 14.6791C23.9763 14.5838 23.8091 14.4763 23.642 14.3572C22.6919 13.8961 20.8314 14.4331 19.7849 14.5004C19.6485 14.7733 19.5386 15.0405 19.2144 15.1076C19.1581 15.2842 19.2125 15.4736 19.1423 15.6437C18.6899 16.358 18.5354 17.1078 18.6783 17.8935C18.9402 19.1316 19.5825 19.7505 20.6063 19.7505H20.9992C21.4992 19.7505 21.8507 19.7739 22.0531 19.8215C22.2555 19.8691 22.3567 19.9054 22.3567 19.9292C22.2376 20.2149 22.1961 20.4407 22.2318 20.6074C22.3497 21.1422 22.7355 21.5468 22.6958 22.1252C22.6588 22.8609 22.4275 23.4953 22.6786 24.233C22.9648 24.9487 23.3245 25.7258 23.5893 26.4646C23.6964 26.6789 23.8573 26.8099 24.0715 26.8575C24.5001 26.929 25.0359 26.6435 25.6788 26.0007C26.155 25.4768 26.4287 24.9048 26.5001 24.2858C26.5944 23.7378 26.9806 23.2511 27.1073 22.6786V22.2146C27.2261 21.9765 27.3273 21.7443 27.4108 21.5181C27.53 21.1893 27.543 20.7704 27.5712 20.3932C27.9455 20.0189 28.3108 19.6847 28.5713 19.2144C28.738 18.9287 28.7859 18.6795 28.7145 18.4652C28.6916 18.4176 28.6319 18.3696 28.5358 18.322L27.9997 18.1078C28.0088 17.8084 28.5593 17.853 28.821 17.8935L30.1063 17.1077C30.0587 18.7267 29.7434 20.2925 29.1601 21.8045C28.5768 23.3163 27.714 24.6787 26.5711 25.893C25.0474 27.5597 23.2195 28.7505 21.0886 29.4648C18.9576 30.1791 16.7612 30.3218 14.4993 29.8932C14.8887 29.2053 15.1135 28.4301 15.5715 27.7499C15.5715 27.3928 15.6248 27.0892 15.7319 26.8392C16.1865 25.7876 16.9281 25.5139 17.7859 24.697C18.6514 23.7949 18.6432 22.7289 18.6783 21.4287C18.6665 20.6058 17.3507 20.1006 16.7492 19.6428C15.3552 18.7034 14.4699 17.3212 12.482 17.7321C11.7715 17.8045 11.5996 17.9426 11.0707 17.5006L10.8565 17.393L10.8748 17.3219L10.9641 17.1432C11.1774 16.92 10.8746 16.6395 10.5884 16.732C10.5289 16.7439 10.4639 16.7503 10.3925 16.7503C10.3272 16.4313 10.1132 16.1346 10.0706 15.7857C10.4039 16.0476 10.6904 16.2447 10.9286 16.3756C11.1666 16.5066 11.369 16.5961 11.5357 16.6437C11.7024 16.7151 11.8451 16.7386 11.9641 16.7148C12.2261 16.6671 12.3741 16.4051 12.4098 15.9289C12.4455 15.4527 12.4285 14.9052 12.3571 14.2862C12.4285 14.191 12.4754 14.0951 12.4992 13.9998C12.7508 12.6985 13.4172 12.9839 14.4283 12.6079C14.595 12.5127 14.6301 12.3934 14.5348 12.2505C14.5348 12.2267 14.5295 12.215 14.5176 12.215C14.5058 12.215 14.4993 12.2022 14.4993 12.1784C15.0489 11.9024 15.3727 11.3372 15.7136 10.822C15.4231 10.3617 14.9722 9.97736 14.4638 9.71431C14.1912 9.37805 13.1209 9.5842 12.8921 9.03609C12.7016 9.01227 12.5589 8.97606 12.4637 8.92846C11.4994 8.30357 11.0921 7.21083 10.0534 6.76793C9.63671 6.73223 9.22556 6.73863 8.82082 6.78623C10.0351 5.81006 11.3569 5.08362 12.7855 4.6074ZM4.10683 14.6791C4.32112 15.0362 4.58314 15.3579 4.89266 15.6436C6.49913 17.1194 8.00915 17.4321 10.0706 18.1788C10.1657 18.2502 10.2968 18.3695 10.4635 18.5361C10.6881 18.7066 10.8782 18.9108 11.1073 19.0722C11.1073 19.1913 11.0892 19.3574 11.0535 19.5718C11.0178 19.786 11.0113 20.1311 11.0352 20.6073C11.104 21.9324 12.1967 22.9813 12.4992 24.2502C12.2309 25.8946 12.2271 27.5109 12.0352 29.1429C10.4162 28.4762 8.99422 27.5239 7.76801 26.2859C6.54183 25.0478 5.5949 23.6077 4.92822 21.9648C4.45204 20.7743 4.14845 19.5653 4.0175 18.3391C3.88637 17.113 3.91623 15.8934 4.10683 14.6791Z" fill="#003577" />
                                    </svg>
                                </div>
                                <div style={{
                                    position: "absolute",
                                    right: 0,

                                    marginTop: "-20px",
                                    marginRight: "250px",
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="26" viewBox="0 0 31 26" fill="none">
                                        <path d="M3.06092 3.12728L27.5742 0.56495C29.5398 0.35901 30.743 2.44307 29.5826 4.04349L15.1069 23.9915C13.7963 25.7982 10.9541 25.1075 10.8829 22.9635L10.5798 13.8434C10.5562 13.1344 10.1874 12.4956 9.58586 12.1219L1.83921 7.29937C0.019221 6.16494 0.839106 3.35838 3.06092 3.12728Z" fill="#F7941D" />
                                    </svg>
                                </div>
                                <div style={{
                                    position: "absolute",
                                    left: 0,

                                    // marginTop: "-20px",
                                    // marginLeft: "100px",
                                }}>
                                    <CustomImage
                                        src="/assets/LandingPage/element1.png"
                                        alt="Gambar"
                                        draggable={false}
                                        width={0}
                                        height={0}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </div>
                            </Box>

                        </section>
                        <section style={{ width: "90vw", maxWidth: "1260px" }}>
                            {/* Search dan Sort Controls */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                alignItems: 'center',
                                margin: "80px auto 40px auto",
                                maxWidth: '730px'
                            }}>
                                <OutlinedInput
                                    type="search"
                                    placeholder="Silahkan cari..."
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
                                        width: "100%",
                                        height: '49px',
                                        paddingLeft: '1%',
                                        borderRadius: '40px',
                                        background: 'white',
                                        border: "1px solid rgba(0, 69, 129, 0.30)",
                                        boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
                                        flex: 1
                                    }}
                                />
                                <Button onClick={handleSortChange} variant="contained" disableElevation disableRipple disableTouchRipple startIcon={<UnfoldMoreRoundedIcon />}
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

                            <Box sx={{ maxWidth: { xs: 490, sm: "95vw" } }}>
                                <Tabs
                                    value={valueTab}
                                    onChange={handleChangeTab}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    // centered
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
                                        width: isMobile ? "90vw" : null,

                                        "& .MuiTabs-flexContainer": {
                                            gap: "13px",
                                            justifyContent: "center"
                                        }
                                    }}>
                                    <Tab
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <span>Katalog Data</span>
                                                <Chip
                                                    label={filteredKatalogData.length}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: valueTab === 0 ? 'var(--jakartasatu-biru)' : 'var(--jakartasatu-biru-40)',
                                                        color: 'white',
                                                        fontFamily: 'var(--font-family)',
                                                        fontWeight: 600,
                                                        fontSize: '12px',
                                                        height: '20px',
                                                        minWidth: '20px',
                                                        '& .MuiChip-label': {
                                                            px: 1
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        }
                                        {...a11yProps(0)}
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
                                    <Tab
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <span>Katalog Peta</span>
                                                <Chip
                                                    label={filteredKatalogPeta.length}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: valueTab === 1 ? 'var(--jakartasatu-biru)' : 'var(--jakartasatu-biru-40)',
                                                        color: 'white',
                                                        fontFamily: 'var(--font-family)',
                                                        fontWeight: 600,
                                                        fontSize: '12px',
                                                        height: '20px',
                                                        minWidth: '20px',
                                                        '& .MuiChip-label': {
                                                            px: 1
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        }
                                        {...a11yProps(1)}
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
                                </Tabs>
                            </Box>

                            <Box id='iconElement' sx={{
                                zIndex: "-1",
                                position: "sticky",
                                width: "100%",
                                maxWidth: "1440px",
                                userDrag: "none",
                                userSelect: "none",
                                opacity: "50%",
                                display: {
                                    xs: "none",
                                    sm: "none",
                                    md: "block"
                                },
                            }}>
                                <div style={{
                                    position: "absolute",
                                    left: "-150px",

                                    marginTop: "100px",
                                    // marginLeft: "200px",
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
                                        <g opacity="0.5" clipPath="url(#clip0_23286_302)">
                                            <path d="M39.9967 13.3364L22.2805 8.92083C21.9897 8.8486 21.6853 8.85139 21.3958 8.92896C21.1063 9.00652 20.8413 9.15632 20.6255 9.3643L7.54751 21.9579C7.32041 22.177 7.15602 22.4528 7.07136 22.7568C6.98669 23.0608 6.98484 23.3819 7.066 23.6869C7.14715 23.9918 7.30835 24.2696 7.53292 24.4913C7.75748 24.713 8.03723 24.8707 8.34319 24.9479L26.0777 29.4319C26.37 29.5057 26.6762 29.5036 26.9674 29.4259C27.2586 29.3482 27.5252 29.1974 27.7418 28.9878L40.8014 16.3259C41.0284 16.1061 41.1923 15.8297 41.2764 15.5252C41.3604 15.2207 41.3614 14.8992 41.2793 14.5942C41.1972 14.2892 41.035 14.0117 40.8094 13.7905C40.5839 13.5694 40.3033 13.4126 39.9967 13.3364Z" fill="#F7941D" />
                                            <path d="M27.7813 32.6086L11.0557 28.4223L10.1963 31.8559L27.8749 36.2815C28.1666 36.3545 28.4721 36.352 28.7626 36.2741C29.0531 36.1963 29.3189 36.0458 29.5351 35.8367L42.6324 23.1647L40.1714 20.6208L27.7813 32.6086Z" fill="#003577" />
                                            <path d="M29.6139 39.4484L12.8882 35.2622L12.0288 38.6957L29.7074 43.1214C29.9992 43.1944 30.3047 43.1918 30.5951 43.114C30.8856 43.0361 31.1515 42.8856 31.3676 42.6765L44.4649 30.0045L42.0039 27.4607L29.6139 39.4484Z" fill="#F7941D" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_23286_302">
                                                <rect width="42.482" height="42.482" fill="white" transform="translate(0 10.9961) rotate(-15)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div style={{
                                    position: "absolute",
                                    right: "-150px",

                                    marginTop: "150px",
                                    // marginLeft: "100px",
                                }}>
                                    <CustomImage
                                        src="/assets/LandingPage/element2.png"
                                        alt="Gambar"
                                        draggable={false}
                                        width={0}
                                        height={0}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </div>
                                <div style={{
                                    position: "absolute",
                                    left: "-100px",

                                    marginTop: "300px",
                                    // marginLeft: "100px",
                                }}>
                                    <CustomImage
                                        src="/assets/LandingPage/element1.png"
                                        alt="Gambar"
                                        draggable={false}
                                        width={0}
                                        height={0}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </div>
                                <div style={{
                                    position: "absolute",
                                    right: "-150px",

                                    marginTop: "400px",
                                    // marginLeft: "100px",
                                }}>
                                    <CustomImage
                                        src="/assets/LandingPage/element2.png"
                                        alt="Gambar"
                                        draggable={false}
                                        width={0}
                                        height={0}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </div>
                            </Box>

                            {/* Tab Panel untuk Katalog Data */}
                            <CustomTabPanel value={valueTab} index={0}>
                                <Box sx={{ textAlign: 'left' }}>
                                    {filteredKatalogData.length === 0 ? (
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                textAlign: 'center',
                                                color: 'rgba(0, 0, 0, 0.6)',
                                                fontFamily: 'var(--font-family)',
                                                py: 4
                                            }}
                                        >
                                            {search ? 'Tidak ada data yang sesuai dengan pencarian' : 'Katalog data tidak tersedia'}
                                        </Typography>
                                    ) : (
                                        <Grid container
                                            alignItems="stretch"
                                            justifyContent="center"
                                            spacing={3}>
                                            {filteredKatalogData.map((item, index) => (
                                                <Grid xs={12} sm={6} md={4} key={item.id}>
                                                    <Card
                                                        sx={{
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                                            borderRadius: '12px',
                                                            transition: 'transform 0.2s ease-in-out',
                                                            '&:hover': {
                                                                transform: 'translateY(-4px)',
                                                                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
                                                                cursor: "default"
                                                            }
                                                        }}
                                                    >
                                                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                                                <DatasetIcon
                                                                    sx={{
                                                                        color: 'var(--jakartasatu-biru)',
                                                                        mr: 1.5,
                                                                        fontSize: '24px'
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        fontFamily: 'var(--font-family)',
                                                                        fontWeight: 600,
                                                                        color: 'var(--jakartasatu-biru)',
                                                                        lineHeight: 1.3,
                                                                        fontSize: '18px'
                                                                    }}
                                                                >
                                                                    {item.nama}
                                                                </Typography>
                                                            </Box>
                                                            {/* <Chip
                                                                label={`ID: ${item.id}`}
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor: 'rgba(0, 69, 129, 0.1)',
                                                                    color: 'var(--jakartasatu-biru)',
                                                                    fontFamily: 'var(--font-family)',
                                                                    fontWeight: 500
                                                                }}
                                                            /> */}
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                </Box>
                            </CustomTabPanel>

                            {/* Tab Panel untuk Katalog Peta */}
                            <CustomTabPanel value={valueTab} index={1}>
                                <Box sx={{ textAlign: 'left' }}>
                                    {filteredKatalogPeta.length === 0 ? (
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                textAlign: 'center',
                                                color: 'rgba(0, 0, 0, 0.6)',
                                                fontFamily: 'var(--font-family)',
                                                py: 4
                                            }}
                                        >
                                            {search ? 'Tidak ada peta yang sesuai dengan pencarian' : 'Katalog peta tidak tersedia'}
                                        </Typography>
                                    ) : (
                                        <Grid container
                                            alignItems="stretch"
                                            justifyContent="center"
                                            spacing={3}>
                                            {filteredKatalogPeta.map((item, index) => (
                                                <Grid xs={12} sm={6} md={6} key={item.id}>
                                                    <Card
                                                        sx={{
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                                            borderRadius: '12px',
                                                            transition: 'transform 0.2s ease-in-out',
                                                            '&:hover': {
                                                                transform: 'translateY(-4px)',
                                                                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)'
                                                            }
                                                        }}
                                                    >
                                                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                                            <Box sx={{ display: 'flex', justifyContent: "flex-start", alignItems: 'center' }}>
                                                                <MapIcon
                                                                    sx={{
                                                                        color: 'var(--jakartasatu-orange)',
                                                                        mr: 1.5,
                                                                        fontSize: '24px'
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        fontFamily: 'var(--font-family)',
                                                                        fontWeight: 600,
                                                                        color: 'var(--jakartasatu-biru)',
                                                                        lineHeight: 1.3,
                                                                        fontSize: '18px',
                                                                    }}
                                                                >
                                                                    {item.nama}
                                                                </Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                                                {/* <Chip
                                                                    label={`ID: ${item.id}`}
                                                                    size="small"
                                                                    sx={{
                                                                        backgroundColor: 'rgba(255, 136, 0, 0.1)',
                                                                        color: 'var(--jakartasatu-orange)',
                                                                        fontFamily: 'var(--font-family)',
                                                                        fontWeight: 500
                                                                    }}
                                                                /> */}
                                                                {item.url_peta && (
                                                                    <Button
                                                                        variant="outlined"
                                                                        size="small"
                                                                        href={item.url_peta}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        endIcon={<LaunchIcon sx={{ fontSize: '16px' }} />}
                                                                        sx={{
                                                                            borderColor: 'var(--jakartasatu-orange)',
                                                                            color: 'var(--jakartasatu-orange)',
                                                                            fontFamily: 'var(--font-family)',
                                                                            textTransform: 'none',
                                                                            fontWeight: 600,
                                                                            borderRadius: '20px',
                                                                            px: 2,
                                                                            '&:hover': {
                                                                                borderColor: 'var(--jakartasatu-orange)',
                                                                                backgroundColor: 'var(--jakartasatu-orange)',
                                                                                color: 'white'
                                                                            }
                                                                        }}
                                                                    >
                                                                        Buka Peta
                                                                    </Button>
                                                                )}
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                </Box>
                            </CustomTabPanel>
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

export default detailSimpulJaringan;