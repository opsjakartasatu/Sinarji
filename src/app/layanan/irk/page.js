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
    Divider,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

import { useRouter } from 'next/navigation'
import Link from "next/link";
import { memo, useEffect, useMemo, useState } from "react";
import axios from "axios";
import CustomImage from '@/components/CustomImage';

function irk() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));
    const isMobileLG = useMediaQuery(theme.breakpoints.down("lg"));

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
        { label: "Informasi Rencana Kota" },
    ];

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
                    <div className={styles.container} style={{ paddingTop: "70px", textAlign: "center" }}>
                        <section id="IRK"
                            style={{
                                width: "90vw",
                                maxWidth: "1200px"
                            }}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none"
                                style={{
                                    display: isMobileMD ? "none" : "inline",
                                    userDrag: "none",
                                    userSelect: "none",

                                    position: "absolute",
                                    marginLeft: "-280px",
                                    zIndex: "-1"
                                }}>
                                <g opacity="0.5" clipPath="url(#clip0_20684_274)">
                                    <path d="M6.67827 19.7592L27.4853 11.7858C29.1536 11.146 30.692 12.6844 30.0531 14.3535L22.0796 35.1606C21.3579 37.045 18.7143 37.1069 18.1504 35.2512L15.7517 27.3579C15.5652 26.7443 15.0937 26.2728 14.4809 26.0871L6.58762 23.6885C4.73284 23.1237 4.79211 20.4809 6.67827 19.7592Z" fill='var(--jakartasatu-orange)' />
                                </g>
                                <defs>
                                    <clipPath id="clip0_20684_274">
                                        <rect width="29.5834" height="29.5834" fill="white" transform="translate(20.9186) rotate(45)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none"
                                style={{
                                    display: isMobileMD ? "none" : "inline",
                                    userDrag: "none",
                                    userSelect: "none",

                                    position: "absolute",
                                    marginLeft: "480px",
                                    marginTop: "20px",
                                    zIndex: "-1"
                                }}>
                                <g opacity="0.5" clipPath="url(#clip0_20684_276)">
                                    <path d="M34.0257 12.0085L19.2965 8.33744C19.0547 8.27739 18.8016 8.27971 18.561 8.3442C18.3203 8.40869 18.0999 8.53322 17.9205 8.70614L7.0476 19.1763C6.85879 19.3585 6.72212 19.5878 6.65173 19.8406C6.58134 20.0933 6.57981 20.3603 6.64728 20.6138C6.71475 20.8674 6.84877 21.0983 7.03547 21.2826C7.22217 21.4669 7.45475 21.598 7.70913 21.6622L22.4535 25.3902C22.6964 25.4515 22.951 25.4498 23.1932 25.3852C23.4353 25.3206 23.6569 25.1952 23.837 25.021L34.6947 14.494C34.8833 14.3113 35.0197 14.0814 35.0895 13.8282C35.1594 13.5751 35.1602 13.3079 35.092 13.0543C35.0237 12.8007 34.8888 12.57 34.7013 12.3861C34.5138 12.2022 34.2805 12.0718 34.0257 12.0085Z" fill='var(--jakartasatu-orange)' />
                                    <path d="M23.8698 28.0324L9.96425 24.552L9.24977 27.4066L23.9476 31.0861C24.1902 31.1468 24.4442 31.1447 24.6857 31.08C24.9272 31.0152 25.1482 30.8901 25.3279 30.7163L36.2169 20.1808L34.1708 18.0659L23.8698 28.0324Z" fill='var(--jakartasatu-biru)' />
                                    <path d="M25.3934 33.716L11.4878 30.2356L10.7733 33.0902L25.4712 36.7697C25.7137 36.8304 25.9677 36.8283 26.2092 36.7635C26.4507 36.6988 26.6717 36.5737 26.8514 36.3999L37.7404 25.8644L35.6944 23.7495L25.3934 33.716Z" fill='var(--jakartasatu-orange)' />
                                </g>
                                <defs>
                                    <clipPath id="clip0_20684_276">
                                        <rect width="35.3192" height="35.3192" fill="white" transform="translate(0.772583 10.0625) rotate(-15)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"
                                style={{
                                    display: isMobileMD ? "none" : "inline",
                                    userDrag: "none",
                                    userSelect: "none",

                                    position: "absolute",
                                    marginLeft: "-550px",
                                    marginTop: "220px",
                                    zIndex: "-1"
                                }}>
                                <g opacity="0.5" clipPath="url(#clip0_20684_270)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9927 23.5556C11.0224 23.4443 11.0777 23.3414 11.1542 23.2552C11.2306 23.1689 11.326 23.1017 11.433 23.0587L14.8768 21.6748C15.0595 21.6014 15.2638 21.6036 15.4449 21.6809C15.626 21.7581 15.7689 21.9042 15.8423 22.0868C15.9157 22.2695 15.9136 22.4739 15.8363 22.6549C15.759 22.836 15.613 22.979 15.4303 23.0524L12.3309 24.2978L10.8921 29.6759L28.8 22.4799L24.0399 19.5927L20.9405 20.8382C20.7578 20.9116 20.5535 20.9094 20.3724 20.8322C20.1913 20.7549 20.0483 20.6089 19.9749 20.4262C19.9015 20.2435 19.9037 20.0392 19.981 19.8581C20.0582 19.677 20.2043 19.5341 20.3869 19.4607L23.8308 18.0768C23.9377 18.0338 24.0532 18.0164 24.168 18.0258C24.2829 18.0351 24.394 18.0711 24.4925 18.1309L30.8393 21.9804C30.9571 22.0519 31.0528 22.1548 31.1154 22.2776C31.1781 22.4004 31.2054 22.5382 31.1941 22.6756C31.1829 22.813 31.1336 22.9445 31.0519 23.0555C30.9701 23.1665 30.859 23.2525 30.7311 23.3039L10.0681 31.607C9.94015 31.6584 9.80046 31.6732 9.66463 31.6496C9.52879 31.6261 9.4022 31.5652 9.29902 31.4738C9.19584 31.3824 9.12016 31.264 9.08046 31.132C9.04075 31 9.03859 30.8596 9.07422 30.7264L10.9927 23.5556Z" fill='var(--jakartasatu-biru)' />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.24692 13.1385C7.82092 12.0781 7.70995 10.9173 7.92732 9.79534C8.14469 8.6734 8.68118 7.63802 9.4724 6.81342C10.2636 5.98883 11.276 5.41005 12.388 5.14654C13.5 4.88303 14.6644 4.94598 15.7415 5.32783C16.8186 5.70969 17.7627 6.39423 18.4604 7.29932C19.1581 8.2044 19.5799 9.29159 19.675 10.4304C19.7702 11.5693 19.5347 12.7114 18.9969 13.7197C18.459 14.728 17.6416 15.5597 16.6428 16.115L19.7045 23.7342C19.7779 23.9168 19.7757 24.1212 19.6985 24.3023C19.6212 24.4833 19.4752 24.6263 19.2925 24.6997C19.1098 24.7731 18.9055 24.7709 18.7244 24.6937C18.5433 24.6164 18.4004 24.4704 18.3269 24.2877L15.2659 16.6699C13.8663 17.0374 12.3807 16.8812 11.0882 16.2307C9.79565 15.5802 8.78565 14.4815 8.24692 13.1385Z" fill='var(--jakartasatu-orange)' />
                                </g>
                                <defs>
                                    <clipPath id="clip0_20684_270">
                                        <rect width="23.7535" height="23.7535" fill="white" transform="translate(0.522614 9.84375) rotate(-21.892)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none"
                                style={{
                                    display: isMobileMD ? "none" : "inline",
                                    userDrag: "none",
                                    userSelect: "none",

                                    position: "absolute",
                                    marginLeft: isMobileLG ? "485px" : "650px",
                                    marginTop: "350px",
                                    zIndex: "-1"
                                }}>
                                <g opacity="0.5">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.1071 41.0416L19.1124 41.0508L19.116 41.057C19.3705 41.3847 19.7252 41.6201 20.126 41.7275C20.5267 41.8349 20.9516 41.8083 21.3359 41.6518L21.3421 41.6483L21.3513 41.6429L21.3864 41.6289C21.5755 41.5498 21.763 41.467 21.9487 41.3804C24.1735 40.3367 26.2955 39.0868 28.2869 37.6469C31.8552 35.0497 36.0433 31.0062 37.5141 25.5172C38.379 22.2894 37.9262 18.8501 36.2553 15.9561C34.5844 13.062 31.8323 10.9503 28.6045 10.0854C25.3766 9.22045 21.9373 9.67324 19.0433 11.3441C16.1492 13.015 14.0375 15.7671 13.1726 18.995C11.7018 24.484 13.307 30.0797 15.1011 34.1138C16.1058 36.3564 17.3186 38.4999 18.7234 40.5162L19.0837 41.0118L19.1071 41.0416ZM24.365 25.9073C24.8445 26.0358 25.3446 26.0686 25.8367 26.0038C26.3289 25.939 26.8034 25.7779 27.2333 25.5297C27.6632 25.2815 28.04 24.9511 28.3422 24.5572C28.6444 24.1634 28.8661 23.7139 28.9945 23.2344C29.123 22.755 29.1558 22.2549 29.091 21.7627C29.0262 21.2706 28.8651 20.796 28.6169 20.3661C28.3687 19.9362 28.0383 19.5594 27.6444 19.2572C27.2506 18.955 26.8011 18.7334 26.3217 18.6049C25.3533 18.3454 24.3215 18.4812 23.4533 18.9825C22.5851 19.4838 21.9516 20.3094 21.6921 21.2778C21.4326 22.2461 21.5685 23.2779 22.0697 24.1461C22.571 25.0143 23.3966 25.6479 24.365 25.9073Z" fill='var(--jakartasatu-biru)' />
                                </g>
                            </svg>

                            <Typography variant="p"
                                style={{
                                    color: "#003577",
                                    textAlign: "center",
                                    fontSize: "36px",
                                    fontWeight: "800",
                                }}>
                                IRK
                            </Typography>
                            <Divider
                                style={{
                                    margin: '15px auto 82px auto',
                                    backgroundColor: "#003577",
                                    height: 5,
                                    width: '75px',
                                    borderRadius: '4px',
                                }}
                            />
                            <Grid container
                                spacing={10}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start">
                                <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <CustomImage
                                        src="/assets/layanan-irk.png"
                                        alt="Gambar"
                                        priority={true}
                                        draggable={false}
                                        width={0}
                                        height={0}
                                        style={{
                                            userDrag: "none",
                                            userSelect: "none",

                                            mixBlendMode: "multiply",
                                            width: "100%",
                                            maxWidth: "517px",
                                            height: "auto",
                                        }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Stack
                                        direction="column"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        spacing={4}>
                                        <Typography variant="p"
                                            style={{
                                                width: "100%",
                                                maxWidth: "441px",
                                                textAlign: "start",
                                                color: "rgba(0, 0, 0, 0.70)",
                                                fontSize: "18px",
                                                fontWeight: "500",
                                                lineHeight: "190%",
                                                letterSpacing: "-0.342px",
                                            }}>
                                            Sistem informasi rencana kota yang berguna  dalam perizinan pemanfaatan ruang serta mendukung penerbitan izin berusaha
                                        </Typography>
                                        <Link id="btnIRK" href="https://jakartasatu.jakarta.go.id/irkv2" target="_blank">
                                            <Button variant="contained"
                                                sx={{
                                                    width: "193px",
                                                    height: "56px",
                                                    borderRadius: "40px",
                                                    background: "#F7941D",
                                                    boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                                    textTransform: "none",
                                                    color: "white",
                                                    fontFamily: "inherit",
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                    // lineHeight: "150%",
                                                    // letterSpacing: "-0.342px",
                                                }}>
                                                Akses Layanan
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Grid>
                            </Grid>
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

export default irk;