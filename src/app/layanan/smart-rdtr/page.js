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
    Dialog,
    DialogContent,
    Divider,
    Grow,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useRouter } from 'next/navigation';
import { forwardRef, useEffect, useState } from "react";
import Link from "next/link";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineSeparator } from "@mui/lab";
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import CustomImage from '@/components/CustomImage';

const Transition = forwardRef(function Transition(props, ref) {
    return <Grow direction="up" ref={ref} {...props} />;
});

function dataJakartaSatu() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));
    const isMobileLG = useMediaQuery(theme.breakpoints.down("lg"));
    const isMobile900 = useMediaQuery(theme.breakpoints.down("900"));

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    useEffect(() => {
        document.title = "Smart RDTR | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Smart RDTR" }
    ];

    const router = useRouter();

    const [openDialogPeta, setOpenDialogPeta] = useState(false);

    const handleOpenDialogPeta = () => {
        setOpenDialogPeta(true);
    };

    const handleCloseDialogPeta = () => {
        setOpenDialogPeta(false);
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
                        <section id="smartRDTR"
                            style={{
                                marginTop: "50px",
                                width: "90vw",
                                maxWidth: "1200px"
                            }}>

                            <div id='svgElement' style={{ marginLeft: "-215px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none"
                                    style={{
                                        display: isMobileMD ? "none" : "inline",
                                        userDrag: "none",
                                        userSelect: "none",

                                        position: "absolute",
                                        marginLeft: "-240px",
                                        marginTop: "20px",
                                        zIndex: "-1"
                                    }}>
                                    <g opacity="0.5" clipPath="url(#clip0_20684_263)">
                                        <path d="M39.9969 13.3345L22.2807 8.91887C21.9898 8.84664 21.6854 8.84944 21.3959 8.92701C21.1064 9.00457 20.8414 9.15436 20.6256 9.36235L7.54763 21.9559C7.32053 22.175 7.15614 22.4509 7.07148 22.7549C6.98682 23.0589 6.98497 23.38 7.06612 23.6849C7.14727 23.9899 7.30848 24.2676 7.53304 24.4893C7.7576 24.711 8.03735 24.8687 8.34332 24.946L26.0778 29.4299C26.3701 29.5037 26.6763 29.5017 26.9675 29.4239C27.2587 29.3462 27.5253 29.1954 27.7419 28.9859L40.8016 16.3239C41.0285 16.1042 41.1925 15.8277 41.2765 15.5232C41.3605 15.2187 41.3615 14.8973 41.2794 14.5923C41.1973 14.2872 41.0351 14.0097 40.8096 13.7886C40.584 13.5674 40.3034 13.4106 39.9969 13.3345Z" fill='var(--jakartasatu-orange)' />
                                        <path d="M27.7813 32.6076L11.0557 28.4214L10.1963 31.8549L27.8749 36.2806C28.1666 36.3535 28.4721 36.351 28.7626 36.2732C29.0531 36.1953 29.3189 36.0448 29.5351 35.8357L42.6324 23.1637L40.1714 20.6198L27.7813 32.6076Z" fill='var(--jakartasatu-biru)' />
                                        <path d="M29.6139 39.4465L12.8882 35.2602L12.0288 38.6938L29.7074 43.1194C29.9992 43.1924 30.3047 43.1899 30.5951 43.112C30.8856 43.0342 31.1515 42.8836 31.3676 42.6746L44.4649 30.0025L42.0039 27.4587L29.6139 39.4465Z" fill='var(--jakartasatu-orange)' />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_20684_263">
                                            <rect width="42.482" height="42.482" fill="white" transform="translate(0 10.9951) rotate(-15)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none"
                                    style={{
                                        display: isMobileMD ? "none" : "inline",
                                        userDrag: "none",
                                        userSelect: "none",

                                        position: "absolute",
                                        marginLeft: "300px",
                                        marginTop: "60px",
                                        zIndex: "-1"
                                    }}>
                                    <g opacity="0.5" clipPath="url(#clip0_20684_259)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M17.1904 37.0549C17.2393 36.8721 17.3301 36.7032 17.4556 36.5616C17.5811 36.42 17.7378 36.3095 17.9134 36.239L23.5677 33.9669C23.8676 33.8463 24.2031 33.8499 24.5004 33.9768C24.7977 34.1036 25.0324 34.3434 25.153 34.6433C25.2735 34.9432 25.2699 35.2787 25.1431 35.576C25.0162 35.8733 24.7764 36.1081 24.4765 36.2286L19.3876 38.2735L17.0253 47.1036L46.4277 35.2886L38.6123 30.5483L33.5234 32.5932C33.2235 32.7137 32.888 32.7102 32.5907 32.5833C32.2934 32.4565 32.0587 32.2167 31.9381 31.9168C31.8176 31.6169 31.8212 31.2813 31.948 30.984C32.0749 30.6867 32.3147 30.452 32.6146 30.3315L38.2689 28.0594C38.4445 27.9888 38.634 27.9601 38.8226 27.9756C39.0112 27.991 39.1936 28.0501 39.3554 28.1482L49.7759 34.4686C49.9694 34.586 50.1265 34.7549 50.2294 34.9565C50.3323 35.1581 50.377 35.3843 50.3586 35.6099C50.3401 35.8355 50.2593 36.0515 50.125 36.2337C49.9907 36.4159 49.8083 36.5571 49.5983 36.6415L15.6724 50.2741C15.4624 50.3585 15.233 50.3828 15.01 50.3441C14.787 50.3055 14.5791 50.2056 14.4097 50.0555C14.2403 49.9054 14.1161 49.711 14.0509 49.4943C13.9857 49.2776 13.9821 49.0469 14.0406 48.8283L17.1904 37.0549Z" fill='var(--jakartasatu-biru)' />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.6823 19.9523C11.9828 18.2112 11.8006 16.3053 12.1575 14.4632C12.5144 12.6212 13.3953 10.9212 14.6943 9.56733C15.9934 8.21346 17.6556 7.26318 19.4813 6.83053C21.3071 6.39788 23.2189 6.50124 24.9874 7.12819C26.7559 7.75515 28.3059 8.87907 29.4514 10.3651C30.597 11.8511 31.2894 13.6362 31.4457 15.506C31.6019 17.3758 31.2153 19.2509 30.3322 20.9065C29.4492 22.562 28.1072 23.9276 26.4672 24.8393L31.4941 37.3489C31.6146 37.6489 31.611 37.9844 31.4842 38.2817C31.3573 38.579 31.1175 38.8137 30.8176 38.9342C30.5177 39.0547 30.1822 39.0512 29.8849 38.9243C29.5876 38.7975 29.3528 38.5577 29.2323 38.2578L24.2064 25.7504C21.9085 26.3538 19.4694 26.0973 17.3472 25.0293C15.2251 23.9612 13.5668 22.1573 12.6823 19.9523Z" fill='var(--jakartasatu-orange)' />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_20684_259">
                                            <rect width="39" height="39" fill="white" transform="translate(0 14.541) rotate(-21.892)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none"
                                    style={{
                                        display: isMobileMD ? "none" : "inline",
                                        userDrag: "none",
                                        userSelect: "none",

                                        position: "absolute",
                                        marginLeft: "-380px",
                                        marginTop: "530px",
                                        zIndex: "-1"
                                    }}>
                                    <path opacity="0.5" d="M17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0ZM12.7855 4.6074C13.4046 4.94071 14.1363 5.25603 14.9816 5.55362C15.8269 5.8512 16.6662 6.00038 17.4995 6.00038C18.1145 5.99919 18.728 5.84656 19.2499 5.46428C19.7552 5.16146 20.2443 4.91983 20.8926 4.98202C21.5588 5.05481 22.2604 5.28419 22.9638 5.32219C23.8448 5.79836 24.7022 6.39274 25.5356 7.10702C25.1308 7.13082 24.7015 7.17343 24.2492 7.23299C23.7968 7.29255 23.3569 7.38092 22.9283 7.49995C22.4997 7.61898 22.1067 7.77453 21.7495 7.96498C21.3924 8.15547 21.1304 8.39299 20.9637 8.6787C20.7018 9.10727 20.5175 9.4705 20.4104 9.76812C20.1899 10.3852 20.242 11.3697 19.7322 11.8221C19.6251 11.8935 19.5356 11.9766 19.4641 12.0718C19.3927 12.167 19.3629 12.2917 19.3748 12.4464C19.3867 12.6012 19.4645 12.8217 19.6073 13.1074C19.6787 13.2741 19.7373 13.4764 19.7849 13.7145C20.2373 13.7131 20.7064 13.645 21.1069 13.3571L23.4644 13.5714C24.073 12.8859 24.7821 12.8745 25.3924 13.5714C25.5829 13.7618 25.7853 14.0484 25.9995 14.4293L24.9995 15.1075C24.7614 15.0361 24.4759 14.8934 24.1426 14.6791C23.9763 14.5838 23.8091 14.4763 23.642 14.3572C22.6919 13.8961 20.8314 14.4331 19.7849 14.5004C19.6485 14.7733 19.5386 15.0405 19.2144 15.1076C19.1581 15.2842 19.2125 15.4736 19.1423 15.6437C18.6899 16.358 18.5354 17.1078 18.6783 17.8935C18.9402 19.1316 19.5825 19.7505 20.6063 19.7505H20.9992C21.4992 19.7505 21.8507 19.7739 22.0531 19.8215C22.2555 19.8691 22.3567 19.9054 22.3567 19.9292C22.2376 20.2149 22.1961 20.4407 22.2318 20.6074C22.3497 21.1422 22.7355 21.5468 22.6958 22.1252C22.6588 22.8609 22.4275 23.4953 22.6786 24.233C22.9648 24.9487 23.3245 25.7258 23.5893 26.4646C23.6964 26.6789 23.8573 26.8099 24.0715 26.8575C24.5001 26.929 25.0359 26.6435 25.6788 26.0007C26.155 25.4768 26.4287 24.9048 26.5001 24.2858C26.5944 23.7378 26.9806 23.2511 27.1073 22.6786V22.2146C27.2261 21.9765 27.3273 21.7443 27.4108 21.5181C27.53 21.1893 27.543 20.7704 27.5712 20.3932C27.9455 20.0189 28.3108 19.6847 28.5713 19.2144C28.738 18.9287 28.7859 18.6795 28.7145 18.4652C28.6916 18.4176 28.6319 18.3696 28.5358 18.322L27.9997 18.1078C28.0088 17.8084 28.5593 17.853 28.821 17.8935L30.1063 17.1077C30.0587 18.7267 29.7434 20.2925 29.1601 21.8045C28.5768 23.3163 27.714 24.6787 26.5711 25.893C25.0474 27.5597 23.2195 28.7505 21.0886 29.4648C18.9576 30.1791 16.7612 30.3218 14.4993 29.8932C14.8887 29.2053 15.1135 28.4301 15.5715 27.7499C15.5715 27.3928 15.6248 27.0892 15.7319 26.8392C16.1865 25.7876 16.9281 25.5139 17.7859 24.697C18.6514 23.7949 18.6432 22.7289 18.6783 21.4287C18.6665 20.6058 17.3507 20.1006 16.7492 19.6428C15.3552 18.7034 14.4699 17.3212 12.482 17.7321C11.7715 17.8045 11.5996 17.9426 11.0707 17.5006L10.8565 17.393L10.8748 17.3219L10.9641 17.1432C11.1774 16.92 10.8746 16.6395 10.5884 16.732C10.5289 16.7439 10.4639 16.7503 10.3925 16.7503C10.3272 16.4313 10.1132 16.1346 10.0706 15.7857C10.4039 16.0476 10.6904 16.2447 10.9286 16.3756C11.1666 16.5066 11.369 16.5961 11.5357 16.6437C11.7024 16.7151 11.8451 16.7386 11.9641 16.7148C12.2261 16.6671 12.3741 16.4051 12.4098 15.9289C12.4455 15.4527 12.4285 14.9052 12.3571 14.2862C12.4285 14.191 12.4754 14.0951 12.4992 13.9998C12.7508 12.6985 13.4172 12.9839 14.4283 12.6079C14.595 12.5127 14.6301 12.3934 14.5348 12.2505C14.5348 12.2267 14.5295 12.215 14.5176 12.215C14.5058 12.215 14.4993 12.2022 14.4993 12.1784C15.0489 11.9024 15.3727 11.3372 15.7136 10.822C15.4231 10.3617 14.9722 9.97736 14.4638 9.71431C14.1912 9.37805 13.1209 9.5842 12.8921 9.03609C12.7016 9.01227 12.5589 8.97606 12.4637 8.92846C11.4994 8.30357 11.0921 7.21083 10.0534 6.76793C9.63671 6.73223 9.22556 6.73863 8.82082 6.78623C10.0351 5.81006 11.3569 5.08362 12.7855 4.6074ZM4.10683 14.6791C4.32112 15.0362 4.58314 15.3579 4.89266 15.6436C6.49913 17.1194 8.00915 17.4321 10.0706 18.1788C10.1657 18.2502 10.2968 18.3695 10.4635 18.5361C10.6881 18.7066 10.8782 18.9108 11.1073 19.0722C11.1073 19.1913 11.0892 19.3574 11.0535 19.5718C11.0178 19.786 11.0113 20.1311 11.0352 20.6073C11.104 21.9324 12.1967 22.9813 12.4992 24.2502C12.2309 25.8946 12.2271 27.5109 12.0352 29.1429C10.4162 28.4762 8.99422 27.5239 7.76801 26.2859C6.54183 25.0478 5.5949 23.6077 4.92822 21.9648C4.45204 20.7743 4.14845 19.5653 4.0175 18.3391C3.88637 17.113 3.91623 15.8934 4.10683 14.6791Z" fill='var(--jakartasatu-biru)' />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none"
                                    style={{
                                        display: isMobileMD ? "none" : "inline",
                                        userDrag: "none",
                                        userSelect: "none",

                                        position: "absolute",
                                        marginLeft: isMobileLG ? "500px" : "700px",
                                        marginTop: "580px",
                                        zIndex: "-1"
                                    }}>
                                    <g opacity="0.5" clipPath="url(#clip0_20684_245)">
                                        <path d="M40.7663 14.0474L23.0501 9.63177C22.7592 9.55953 22.4548 9.56233 22.1653 9.6399C21.8758 9.71746 21.6108 9.86725 21.395 10.0752L8.31704 22.6688C8.08994 22.8879 7.92555 23.1638 7.84089 23.4678C7.75623 23.7718 7.75438 24.0929 7.83553 24.3978C7.91668 24.7028 8.07789 24.9805 8.30245 25.2022C8.52701 25.4239 8.80676 25.5816 9.11273 25.6588L26.8472 30.1428C27.1395 30.2166 27.4457 30.2145 27.7369 30.1368C28.0281 30.0591 28.2947 29.9083 28.5113 29.6988L41.571 17.0368C41.7979 16.8171 41.9619 16.5406 42.0459 16.2361C42.1299 15.9316 42.1309 15.6102 42.0488 15.3052C41.9667 15.0001 41.8045 14.7226 41.579 14.5015C41.3534 14.2803 41.0728 14.1235 40.7663 14.0474Z" fill='var(--jakartasatu-orange)' />
                                        <path d="M28.5508 33.3205L11.8251 29.1343L10.9657 32.5678L28.6443 36.9934C28.936 37.0664 29.2416 37.0639 29.532 36.986C29.8225 36.9082 30.0883 36.7577 30.3045 36.5486L43.4018 23.8766L40.9408 21.3327L28.5508 33.3205Z" fill='var(--jakartasatu-biru)' />
                                        <path d="M30.3833 40.1593L13.6576 35.9731L12.7983 39.4066L30.4768 43.8323C30.7686 43.9053 31.0741 43.9027 31.3645 43.8249C31.655 43.7471 31.9209 43.5965 32.137 43.3875L45.2343 30.7154L42.7733 28.1716L30.3833 40.1593Z" fill='var(--jakartasatu-orange)' />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_20684_245">
                                            <rect width="42.482" height="42.482" fill="white" transform="translate(0.769409 11.708) rotate(-15)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <Typography variant="p"
                                style={{
                                    color: 'var(--jakartasatu-biru)',
                                    textAlign: "center",
                                    fontSize: "36px",
                                    fontWeight: "800",
                                }}>
                                Smart RDTR
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
                            <Grid container
                                direction={isMobile900 ? "column-reverse" : "row"}
                                justifyContent="space-evenly"
                                alignItems="center">
                                <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Stack
                                        direction="column"
                                        justifyContent="flex-start"
                                        alignItems={{ xs: 'center', sm: 'flex-start' }}
                                        spacing={4}>
                                        <Typography variant="p"
                                            style={{
                                                textAlign: "start",
                                                color: 'var(--jakartasatu-biru)',
                                                fontSize: "38px",
                                                fontWeight: "600",
                                                letterSpacing: "0.057px",
                                            }}>
                                            Rencana Detail Tata Ruang 2022
                                        </Typography>
                                        <Typography variant="p"
                                            style={{
                                                marginRight: "80px",
                                                textAlign: "start",
                                                color: "rgba(0, 0, 0, 0.70)",
                                                fontSize: "18px",
                                                fontWeight: "500",
                                                lineHeight: "190%",
                                                letterSpacing: "0.027px",
                                            }}>
                                            Eksplorasi Data Spasial DKI Jakarta dalam berbagai tampilan serta menyajikan Peta Dasar DKI Jakarta dalam beragam Visualisasi
                                        </Typography>
                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                            alignItems="flex-start"
                                            spacing={2}>
                                            <Link id="btnSmartRDTRPeta" href="/layanan/smart-rdtr/peta">
                                                <Button variant="contained"
                                                    startIcon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M8 2.99912V17.4991M15 6.49912V20.4991M5.253 4.19512L4.026 4.90712C3.037 5.48012 2.543 5.76712 2.272 6.24412C2 6.72112 2 7.30112 2 8.46312V16.6271C2 18.1531 2 18.9171 2.342 19.3411C2.57 19.6231 2.889 19.8131 3.242 19.8761C3.772 19.9711 4.422 19.5941 5.72 18.8411C6.602 18.3301 7.45 17.7981 8.505 17.9431C8.985 18.0081 9.442 18.2361 10.358 18.6911L14.171 20.5871C14.996 20.9971 15.004 20.9991 15.921 20.9991H18C19.886 20.9991 20.828 20.9991 21.414 20.4001C22 19.8021 22 18.8381 22 16.9101V10.1701C22 8.24312 22 7.28012 21.414 6.68012C20.828 6.08212 19.886 6.08212 18 6.08212H15.921C15.004 6.08212 14.996 6.08012 14.171 5.67012L10.84 4.01412C9.449 3.32212 8.753 2.97612 8.012 2.99912C7.271 3.02212 6.6 3.41412 5.253 4.19512Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    }
                                                    sx={{
                                                        width: "193px",
                                                        height: "56px",
                                                        borderRadius: "40px",
                                                        background: 'var(--jakartasatu-orange)',
                                                        boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                        textTransform: "none",
                                                        color: "white",
                                                        fontFamily: 'var(--font-family)',
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                    }}>
                                                    Peta
                                                </Button>
                                            </Link>
                                            <Link id="btnSmartRDTRNaskah" href="/layanan/smart-rdtr/naskah">
                                                <Button variant="contained"
                                                    startIcon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                            <path d="M3.33301 2.49935C3.33301 2.27834 3.42081 2.06637 3.57709 1.91009C3.73337 1.75381 3.94533 1.66602 4.16634 1.66602H12.4997L16.6663 5.83268V17.4993C16.6663 17.7204 16.5785 17.9323 16.4223 18.0886C16.266 18.2449 16.054 18.3327 15.833 18.3327H4.16634C3.94533 18.3327 3.73337 18.2449 3.57709 18.0886C3.42081 17.9323 3.33301 17.7204 3.33301 17.4993V2.49935Z" stroke="white" strokeWidth="1.66667" strokeLinejoin="round" />
                                                            <path d="M6.66602 8.33203H13.3327M6.66602 11.6654H13.3327" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    }
                                                    sx={{
                                                        width: "193px",
                                                        height: "56px",
                                                        borderRadius: "40px",
                                                        background: 'var(--jakartasatu-biru)',
                                                        boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                        textTransform: "none",
                                                        color: "white",
                                                        fontFamily: 'var(--font-family)',
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                    }}>
                                                    Naskah RDTR
                                                </Button>
                                            </Link>
                                            <Link id="btnSmartRDTRLampiran" href="/layanan/smart-rdtr/lampiran">
                                                <Button variant="contained"
                                                    startIcon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <g clipPath="url(#clip0_17446_209)">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M18.7098 17.5643C19.5067 16.7673 19.9544 15.6864 19.9544 14.5593C19.9544 13.4323 19.5067 12.3514 18.7098 11.5543L12.1698 5.01434C11.9821 4.82684 11.8767 4.57247 11.8766 4.3072C11.8765 4.04193 11.9818 3.78748 12.1693 3.59984C12.3568 3.4122 12.6111 3.30673 12.8764 3.30664C13.1417 3.30655 13.3961 3.41184 13.5838 3.59934L20.1238 10.1393C21.296 11.3113 21.9547 12.901 21.9549 14.5586C21.9551 16.2163 21.2968 17.8061 20.1248 18.9783C18.9528 20.1506 17.3631 20.8093 15.7055 20.8095C14.0478 20.8096 12.458 20.1513 11.2858 18.9793L3.33176 11.0243C2.48771 10.1802 2.01358 9.03525 2.01367 7.84149C2.01377 6.64773 2.48808 5.50289 3.33226 4.65884C4.17644 3.81479 5.32135 3.34066 6.51511 3.34076C7.70888 3.34085 8.85371 3.81516 9.69776 4.65934L17.6508 12.6123C18.1543 13.131 18.4336 13.827 18.4282 14.5499C18.4229 15.2728 18.1333 15.9645 17.622 16.4756C17.1108 16.9867 16.419 17.2761 15.6961 17.2813C14.9732 17.2865 14.2773 17.0071 13.7588 16.5033L6.51276 9.25634C6.32512 9.06884 6.21965 8.81447 6.21956 8.5492C6.21946 8.28393 6.32475 8.02948 6.51226 7.84184C6.69977 7.6542 6.95414 7.54873 7.21941 7.54864C7.48468 7.54855 7.73912 7.65384 7.92676 7.84134L15.1738 15.0883C15.3146 15.2293 15.5056 15.3086 15.7049 15.3086C15.9042 15.3087 16.0953 15.2297 16.2363 15.0888C16.3772 14.948 16.4565 14.757 16.4566 14.5577C16.4567 14.3584 16.3776 14.1673 16.2368 14.0263L8.28376 6.07334C8.05158 5.84103 7.77592 5.65673 7.47252 5.53096C7.16911 5.40518 6.84391 5.3404 6.51547 5.34031C6.18703 5.34021 5.86178 5.40481 5.55831 5.53042C5.25483 5.65602 4.97907 5.84017 4.74676 6.07234C4.27759 6.54125 4.01391 7.17732 4.01372 7.84064C4.01354 8.50395 4.27686 9.14017 4.74576 9.60934L12.6998 17.5633C13.4968 18.3602 14.5777 18.8079 15.7048 18.8079C16.8318 18.8079 17.9127 18.3602 18.7098 17.5633V17.5643Z" fill="white" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_17446_209">
                                                                    <rect width="24" height="24" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    }
                                                    sx={{
                                                        width: "193px",
                                                        height: "56px",
                                                        borderRadius: "40px",
                                                        background: "#0073FF",
                                                        boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                        textTransform: "none",
                                                        color: "white",
                                                        fontFamily: 'var(--font-family)',
                                                        fontSize: "16px",
                                                        fontWeight: "500",
                                                    }}>
                                                    Lampiran
                                                </Button>
                                            </Link>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
                                    <CustomImage
                                        src="/assets/petadashboard-smartrdtr.png"
                                        alt="Gambar"
                                        priority={true}
                                        draggable={false}
                                        width={0}
                                        height={0}
                                        style={{
                                            userDrag: "none",
                                            userSelect: "none",

                                            width: "100%",
                                            maxWidth: "438px",
                                            height: "auto",
                                        }}
                                    />
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

export default dataJakartaSatu;