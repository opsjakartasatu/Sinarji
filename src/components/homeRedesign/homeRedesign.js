"use client"

import { motion, useAnimation, useCycle } from 'framer-motion';

import Navbar from '../navbar/navbarLandingPage';
import "../navbar/style.css";
import styles from "../page.module.css";
import CustomImage from '../CustomImage';

import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import Head from 'next/head';

function homeRedesign() {
    const basePath = process.env.BASE_PATH;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileHeight = useMediaQuery("(max-height: 431px)");
    const isMobile768 = useMediaQuery("(max-width: 1024px)");
    const isMobileiPadAirLandscape = useMediaQuery("(max-width: 1024px) and (min-width: 768px)");
    const isMobileiPadAirPortrait = useMediaQuery("(max-width: 1366px) and (min-width: 1025px)");
    const isMobileiPadProLandscape = useMediaQuery("(max-width: 1366px) and (min-width: 1025px)");
    const isMobileiPadProPortrait = useMediaQuery("(height: 1366px) and (width: 1024px)");
    const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));

    const [halamanBeranda, setHalamanBeranda] = useState(true);

    const controlsShake = useAnimation();
    const controlsShake2 = useAnimation();
    const controlsRotate = useAnimation();
    const controlsFlip = useAnimation();

    const [xValues, cycleXValues] = useCycle([0, 10, -10, 10, 0], [0, -10, 10, -10, 0]);
    const [xValues2, cycleXValues2] = useCycle([0, -10, 10, -10, 0], [0, 10, -10, 10, 0]);
    const [isLayananHovered, setIsLayananHovered] = useState(false);
    const [isKolaborasiHovered, setIsKolaborasiHovered] = useState(false);
    const [isInformasiHovered, setIsInformasiHovered] = useState(false);

    const [isLayananVisible, setIsLayananVisible] = useState(false);
    const [isKolaborasiVisible, setIsKolaborasiVisible] = useState(false);
    const [isInformasiVisible, setIsInformasiVisible] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            controlsShake.start({
                x: xValues,
                transition: { duration: 2 },
            });
        }, 8000);

        const intervalRotate = setInterval(() => {
            controlsRotate.start({
                rotate: [0, 5, -5, 5, 0],
                transition: { duration: 2 },
            });
        }, 8000);

        const intervalId2 = setInterval(() => {
            controlsShake2.start({
                y: xValues2,
                transition: { duration: 2 },
            });
        }, 8000);

        // const intervalFlip = setInterval(() => {
        //     controlsFlip.start({
        //         rotateY: [0, 180, 0],
        //         transition: { duration: 2 },
        //     });
        // }, 4000);

        return () => {
            clearInterval(intervalId);
            clearInterval(intervalId2);
            clearInterval(intervalRotate);
            // clearInterval(intervalFlip);
        };
    }, [controlsShake, controlsShake2, controlsRotate, xValues]);

    const containerVariants = {
        hidden: { opacity: 0, y: -200 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const boxLayanan = {
        hidden: { opacity: 0, y: -100, x: isMobile ? 0 : 300 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1 } }
    };

    const boxKolaborasi = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1 } }
    };

    const boxInformasi = {
        hidden: { opacity: 0, y: -100, x: isMobile ? 0 : -300 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1 } }
    };

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    useEffect(() => {
        setHalamanBeranda(true);
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <motion.div
                className="navbarLandingPage"
                variants={navbarVariants}
                initial="hidden"
                animate="visible"
            >
                <Navbar halamanBeranda={halamanBeranda} />
            </motion.div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onAnimationComplete={() => {
                    if (isMobile) {
                        setIsKolaborasiVisible(true);
                        setIsLayananVisible(true);
                        setIsInformasiVisible(true);
                    } else {
                        setIsLayananVisible(true);
                        setTimeout(() => setIsKolaborasiVisible(true), 500);
                        setTimeout(() => setIsInformasiVisible(true), 1000);
                    }
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: isMobileMD ? "flex-start" : "flex-start",
                    alignItems: "center",
                    width: isMobileMD ? "0" : "100vw",
                    height: isMobileMD ? "0" : "100vh",
                    maxWidth: "1440px",
                    // margin: isMobileMD ? "100px 0" : "0",
                    paddingTop: isMobileHeight ? "10vh" : "80px"
                }}
            >
                <Box id='iconElement' sx={{
                    zIndex: "-1",
                    position: "sticky",
                    width: "100%",
                    maxWidth: "1260px",
                    userDrag: "none",
                    userSelect: "none",
                    opacity: "50%",
                }}>
                    <div style={{
                        position: "absolute",
                        right: 0,

                        marginTop: "50px",
                        marginRight: "150px",
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                            <g opacity="0.5">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.103 41.0416L19.1084 41.0508L19.1119 41.057C19.3665 41.3847 19.7212 41.6201 20.1219 41.7275C20.5227 41.8349 20.9476 41.8083 21.3319 41.6518L21.3381 41.6483L21.3473 41.6429L21.3824 41.6289C21.5715 41.5498 21.7589 41.467 21.9447 41.3804C24.1694 40.3367 26.2915 39.0868 28.2829 37.6469C31.8512 35.0497 36.0393 31.0062 37.51 25.5172C38.3749 22.2894 37.9221 18.8501 36.2513 15.9561C34.5804 13.062 31.8283 10.9503 28.6004 10.0854C25.3725 9.22045 21.9333 9.67324 19.0392 11.3441C16.1452 13.015 14.0335 15.7671 13.1685 18.995C11.6978 24.484 13.303 30.0797 15.0971 34.1138C16.1018 36.3564 17.3145 38.4999 18.7194 40.5162L19.0797 41.0118L19.103 41.0416ZM24.3609 25.9073C24.8404 26.0358 25.3405 26.0686 25.8327 26.0038C26.3248 25.939 26.7994 25.7779 27.2293 25.5297C27.6592 25.2815 28.036 24.9511 28.3382 24.5572C28.6404 24.1634 28.862 23.7139 28.9905 23.2344C29.119 22.755 29.1518 22.2549 29.087 21.7627C29.0222 21.2706 28.8611 20.796 28.6129 20.3661C28.3647 19.9362 28.0342 19.5594 27.6404 19.2572C27.2466 18.955 26.7971 18.7334 26.3176 18.6049C25.3493 18.3454 24.3175 18.4812 23.4493 18.9825C22.5811 19.4838 21.9475 20.3094 21.6881 21.2778C21.4286 22.2461 21.5644 23.2779 22.0657 24.1461C22.567 25.0143 23.3926 25.6479 24.3609 25.9073Z" fill='var(--jakartasatu-biru)' />
                            </g>
                        </svg>
                    </div>
                    <div style={{
                        position: "absolute",
                        right: 0,

                        marginTop: "-50px",
                        marginRight: "150px",
                    }}>
                        <CustomImage
                            src="/assets/LandingPage/element2.png"
                            alt="Gambar"
                            draggable={false}
                            width={0}
                            height={0}
                            style={{
                                userDrag: "none",
                                userSelect: "none",

                                position: "absolute",
                                width: '100%',
                                maxWidth: '62px',
                                height: 'auto',
                                marginRight: "-1250px",
                                marginTop: "-150px"
                            }}
                        />
                    </div>
                    <div style={{
                        position: "absolute",
                        left: 0,

                        marginTop: "10px",
                        marginLeft: "350px",
                    }}>
                        <CustomImage
                            src="/assets/LandingPage/element1.png"
                            alt="Gambar"
                            draggable={false}
                            width={0}
                            height={0}
                            style={{
                                userDrag: "none",
                                userSelect: "none",
                                width: '100%',
                                maxWidth: '72px',
                                height: 'auto',
                            }}
                        />
                    </div>
                    <div style={{
                        position: "absolute",
                        left: 0,

                        marginTop: "150px",
                        marginRight: "150px",
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <path opacity="0.5" d="M17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0ZM12.7855 4.6074C13.4046 4.94071 14.1363 5.25603 14.9816 5.55362C15.8269 5.8512 16.6662 6.00038 17.4995 6.00038C18.1145 5.99919 18.728 5.84656 19.2499 5.46428C19.7552 5.16146 20.2443 4.91983 20.8926 4.98202C21.5588 5.05481 22.2604 5.28419 22.9638 5.32219C23.8448 5.79836 24.7022 6.39274 25.5356 7.10702C25.1308 7.13082 24.7015 7.17343 24.2492 7.23299C23.7968 7.29255 23.3569 7.38092 22.9283 7.49995C22.4997 7.61898 22.1067 7.77453 21.7495 7.96498C21.3924 8.15547 21.1304 8.39299 20.9637 8.6787C20.7018 9.10727 20.5175 9.4705 20.4104 9.76812C20.1899 10.3852 20.242 11.3697 19.7322 11.8221C19.6251 11.8935 19.5356 11.9766 19.4641 12.0718C19.3927 12.167 19.3629 12.2917 19.3748 12.4464C19.3867 12.6012 19.4645 12.8217 19.6073 13.1074C19.6787 13.2741 19.7373 13.4764 19.7849 13.7145C20.2373 13.7131 20.7064 13.645 21.1069 13.3571L23.4644 13.5714C24.073 12.8859 24.7821 12.8745 25.3924 13.5714C25.5829 13.7618 25.7853 14.0484 25.9995 14.4293L24.9995 15.1075C24.7614 15.0361 24.4759 14.8934 24.1426 14.6791C23.9763 14.5838 23.8091 14.4763 23.642 14.3572C22.6919 13.8961 20.8314 14.4331 19.7849 14.5004C19.6485 14.7733 19.5386 15.0405 19.2144 15.1076C19.1581 15.2842 19.2125 15.4736 19.1423 15.6437C18.6899 16.358 18.5354 17.1078 18.6783 17.8935C18.9402 19.1316 19.5825 19.7505 20.6063 19.7505H20.9992C21.4992 19.7505 21.8507 19.7739 22.0531 19.8215C22.2555 19.8691 22.3567 19.9054 22.3567 19.9292C22.2376 20.2149 22.1961 20.4407 22.2318 20.6074C22.3497 21.1422 22.7355 21.5468 22.6958 22.1252C22.6588 22.8609 22.4275 23.4953 22.6786 24.233C22.9648 24.9487 23.3245 25.7258 23.5893 26.4646C23.6964 26.6789 23.8573 26.8099 24.0715 26.8575C24.5001 26.929 25.0359 26.6435 25.6788 26.0007C26.155 25.4768 26.4287 24.9048 26.5001 24.2858C26.5944 23.7378 26.9806 23.2511 27.1073 22.6786V22.2146C27.2261 21.9765 27.3273 21.7443 27.4108 21.5181C27.53 21.1893 27.543 20.7704 27.5712 20.3932C27.9455 20.0189 28.3108 19.6847 28.5713 19.2144C28.738 18.9287 28.7859 18.6795 28.7145 18.4652C28.6916 18.4176 28.6319 18.3696 28.5358 18.322L27.9997 18.1078C28.0088 17.8084 28.5593 17.853 28.821 17.8935L30.1063 17.1077C30.0587 18.7267 29.7434 20.2925 29.1601 21.8045C28.5768 23.3163 27.714 24.6787 26.5711 25.893C25.0474 27.5597 23.2195 28.7505 21.0886 29.4648C18.9576 30.1791 16.7612 30.3218 14.4993 29.8932C14.8887 29.2053 15.1135 28.4301 15.5715 27.7499C15.5715 27.3928 15.6248 27.0892 15.7319 26.8392C16.1865 25.7876 16.9281 25.5139 17.7859 24.697C18.6514 23.7949 18.6432 22.7289 18.6783 21.4287C18.6665 20.6058 17.3507 20.1006 16.7492 19.6428C15.3552 18.7034 14.4699 17.3212 12.482 17.7321C11.7715 17.8045 11.5996 17.9426 11.0707 17.5006L10.8565 17.393L10.8748 17.3219L10.9641 17.1432C11.1774 16.92 10.8746 16.6395 10.5884 16.732C10.5289 16.7439 10.4639 16.7503 10.3925 16.7503C10.3272 16.4313 10.1132 16.1346 10.0706 15.7857C10.4039 16.0476 10.6904 16.2447 10.9286 16.3756C11.1666 16.5066 11.369 16.5961 11.5357 16.6437C11.7024 16.7151 11.8451 16.7386 11.9641 16.7148C12.2261 16.6671 12.3741 16.4051 12.4098 15.9289C12.4455 15.4527 12.4285 14.9052 12.3571 14.2862C12.4285 14.191 12.4754 14.0951 12.4992 13.9998C12.7508 12.6985 13.4172 12.9839 14.4283 12.6079C14.595 12.5127 14.6301 12.3934 14.5348 12.2505C14.5348 12.2267 14.5295 12.215 14.5176 12.215C14.5058 12.215 14.4993 12.2022 14.4993 12.1784C15.0489 11.9024 15.3727 11.3372 15.7136 10.822C15.4231 10.3617 14.9722 9.97736 14.4638 9.71431C14.1912 9.37805 13.1209 9.5842 12.8921 9.03609C12.7016 9.01227 12.5589 8.97606 12.4637 8.92846C11.4994 8.30357 11.0921 7.21083 10.0534 6.76793C9.63671 6.73223 9.22556 6.73863 8.82082 6.78623C10.0351 5.81006 11.3569 5.08362 12.7855 4.6074ZM4.10683 14.6791C4.32112 15.0362 4.58314 15.3579 4.89266 15.6436C6.49913 17.1194 8.00915 17.4321 10.0706 18.1788C10.1657 18.2502 10.2968 18.3695 10.4635 18.5361C10.6881 18.7066 10.8782 18.9108 11.1073 19.0722C11.1073 19.1913 11.0892 19.3574 11.0535 19.5718C11.0178 19.786 11.0113 20.1311 11.0352 20.6073C11.104 21.9324 12.1967 22.9813 12.4992 24.2502C12.2309 25.8946 12.2271 27.5109 12.0352 29.1429C10.4162 28.4762 8.99422 27.5239 7.76801 26.2859C6.54183 25.0478 5.5949 23.6077 4.92822 21.9648C4.45204 20.7743 4.14845 19.5653 4.0175 18.3391C3.88637 17.113 3.91623 15.8934 4.10683 14.6791Z" fill='var(--jakartasatu-biru)' />
                        </svg>
                    </div>
                    <div style={{
                        position: "absolute",
                        right: 0,

                        marginTop: "200px",
                        // marginRight: "350px",
                    }}>
                        <CustomImage
                            src="/assets/LandingPage/element2.png"
                            alt="Gambar"
                            draggable={false}
                            width={0}
                            height={0}
                            style={{
                                userDrag: "none",
                                userSelect: "none",
                                width: '100%',
                                maxWidth: '72px',
                                height: 'auto',
                            }}
                        />
                    </div>
                    <div style={{
                        position: "absolute",
                        right: 0,

                        marginTop: "270px",
                        marginRight: "27%",
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                            <g opacity="0.5" clipPath="url(#clip0_20905_136)">
                                <path d="M28.2451 9.41964L15.7343 6.30143C15.5289 6.25042 15.3139 6.2524 15.1095 6.30717C14.9051 6.36195 14.7179 6.46773 14.5655 6.6146L5.33011 15.5079C5.16973 15.6627 5.05364 15.8575 4.99386 16.0721C4.93407 16.2868 4.93276 16.5136 4.99007 16.7289C5.04738 16.9443 5.16122 17.1404 5.3198 17.297C5.47838 17.4536 5.67594 17.5649 5.89201 17.6195L18.4158 20.786C18.6222 20.8381 18.8384 20.8366 19.0441 20.7817C19.2497 20.7269 19.438 20.6204 19.5909 20.4724L28.8134 11.5307C28.9737 11.3756 29.0895 11.1803 29.1488 10.9653C29.2081 10.7503 29.2089 10.5233 29.1509 10.3079C29.0929 10.0925 28.9783 9.89651 28.8191 9.74032C28.6598 9.58413 28.4616 9.47341 28.2451 9.41964Z" fill='var(--jakartasatu-orange)' />
                                <path d="M19.6165 23.0288L7.8052 20.0726L7.19833 22.4973L19.6826 25.6226C19.8886 25.6741 20.1044 25.6723 20.3095 25.6174C20.5146 25.5624 20.7024 25.4561 20.855 25.3084L30.1041 16.3597L28.3661 14.5633L19.6165 23.0288Z" fill='var(--jakartasatu-biru)' />
                                <path d="M20.9134 27.8569L9.10208 24.9007L8.49521 27.3254L20.9795 30.4507C21.1855 30.5023 21.4013 30.5005 21.6064 30.4455C21.8115 30.3905 21.9992 30.2842 22.1519 30.1366L31.4009 21.1878L29.663 19.3914L20.9134 27.8569Z" fill='var(--jakartasatu-orange)' />
                            </g>
                            <defs>
                                <clipPath id="clip0_20905_136">
                                    <rect width="30" height="30" fill="white" transform="translate(0 7.76562) rotate(-15)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div style={{
                        position: "absolute",
                        left: 0,

                        marginTop: "270px",
                        marginLeft: "27%",
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="45" viewBox="0 0 46 45" fill="none">
                            <g opacity="0.5" clipPath="url(#clip0_20905_134)">
                                <path d="M7.44277 25.1859L27.3907 10.7102C28.99 9.54912 31.0741 10.7524 30.8693 12.7186L28.307 37.2319C28.0754 39.4518 25.2686 40.2748 24.1349 38.4536L19.3124 30.707C18.9374 30.1048 18.2986 29.7359 17.5908 29.713L8.47079 29.4099C6.32741 29.3375 5.63417 26.497 7.44277 25.1859Z" fill='var(--jakartasatu-orange)' />
                            </g>
                            <defs>
                                <clipPath id="clip0_20905_134">
                                    <rect width="32.7224" height="32.7224" fill="white" transform="translate(17) rotate(30)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </Box>
                <Box id="welcome" sx={{
                    width: "90vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    // paddingTop: isMobileHeight ? "60%" : "0",
                    margin: { xs: "50px 0", sm: "70px 0", md: "" }
                }}>
                    <CustomImage
                        src="/assets/logo-jktsatu-besar.png"
                        alt="Gambar"
                        draggable={false}
                        width={0}
                        height={0}
                        style={{
                            userDrag: "none",
                            userSelect: "none",

                            marginLeft: "20px",
                            width: '100%',
                            maxWidth: '270px',
                            // maxWidth: '307px',
                            height: 'auto',
                            alignSelf: "center"
                        }}
                    />
                    <Typography variant='p' sx={{
                        width: "100%",
                        maxWidth: { xs: "100vw", sm: "100vw", md: "40vw", lg: "40vw", xl: "40vw" },
                        marginTop: "20px",
                        textAlign: "center",
                        color: 'var(--jakartasatu-orange)',
                        fontFamily: 'var(--font-family)',
                        fontSize: "32px",
                        fontWeight: "700",
                        // letterSpacing: "1.92px",
                        // WebkitTextStroke: "1px #FFF",
                        // WebkitTextStrokeWidth: "1.5px",
                        // WebkitTextStrokeColor: "#FFF",
                        // textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        // WebkitFontSmoothing: "antialiased",
                        // textShadow: "#FFF 0px 0px 2px, #FFF 0px 0px 2px, #FFF 0px 0px 2px, #FFF 0px 0px 2px, #FFF 0px 0px 2px, #FFF 0px 0px 2px"
                    }}>
                        Satu Peta, Satu Data, Satu Kebijakan
                    </Typography>
                </Box>
                <section id="grid" style={{ width: "97vw", maxWidth: "1360px" }}>
                    <Grid container
                        spacing={{ xs: 0, sm: 10, md: 4 }}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start">
                        <Grid xs={12} sm={12} md={4} lg={4} xl={4}
                            sx={{
                                order: { xs: 2, sm: 1 },

                                backgroundImage: `url('${basePath}/assets/partikel-layanan.png')`,
                                backgroundPosition: 'center',
                                backgroundRepeat: "no-repeat",
                                width: '376px',
                                marginTop: { xs: "0", md: "-170px" },
                                height: { xs: '450px', sm: "" },
                            }}>
                            <motion.div
                                variants={boxLayanan}
                                animate={isLayananVisible ? { controlsShake } : "hidden"}
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.3 }
                                }}
                                onMouseEnter={() => setIsLayananHovered(true)}
                                onMouseLeave={() => setIsLayananHovered(false)}
                                style={{
                                    background: "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.89) 32.5%, rgba(255, 255, 255, 0.02) 100%)",

                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                <motion.div animate={controlsShake} style={{ height: "100%", minHeight: "290px" }}>
                                    {isMobile768 ||
                                        isMobileiPadAirLandscape ||
                                        isMobileiPadAirPortrait ||
                                        isMobileiPadProPortrait ||
                                        isMobileiPadProLandscape
                                        ? (
                                            <>
                                                <Stack direction="column" justifyContent="center" gap={1} sx={{ marginBottom: "15px" }}>
                                                    <Typography variant='p'
                                                        sx={{
                                                            textAlign: "center",
                                                            color: 'var(--jakartasatu-biru)',
                                                            // fontFamily: 'var(--font-family)',
                                                            fontSize: "32px",
                                                            fontWeight: "700",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.608px",
                                                        }}>
                                                        Layanan
                                                    </Typography>
                                                    <CustomImage
                                                        src="/assets/Gambar-layanan.png"
                                                        alt="Gambar"
                                                        draggable={false}
                                                        width={0}
                                                        height={0}
                                                        style={{
                                                            userDrag: "none",
                                                            userSelect: "none",

                                                            width: 'auto',
                                                            height: '120px',
                                                            alignSelf: "center"
                                                        }}
                                                    />
                                                    <Box sx={{ width: "100%", maxWidth: "320px", display: "flex", alignSelf: "center" }}>
                                                        <Typography variant='p'
                                                            sx={{
                                                                textAlign: "center",
                                                                color: "#000",
                                                                // fontFamily: 'var(--font-family)',
                                                                fontSize: "16px",
                                                                fontWeight: "400",
                                                                lineHeight: "180%",
                                                            }}>
                                                            Kamu bisa memanfaatkan data spasial Jakarta Satu dengan proses dan alur yang mudah
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                                <Stack direction="column" justifyContent="center" alignItems="center" gap={1}>
                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                        <Link href="/layanan/galeri-peta-dan-dashboard">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#5f6368"><path d="M320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Zm240 240q-17 0-28.5-11.5T520-600q0-17 11.5-28.5T560-640q17 0 28.5 11.5T600-600q0 17-11.5 28.5T560-560Zm0 200q81-69 120.5-127.5T720-596q0-75-48.5-119.5T560-760q-63 0-111.5 44.5T400-596q0 50 39.5 108.5T560-360Z" fill="#FFF" /></svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Galeri Peta & Dashboard
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                        <Link id="btnBerbagiPakai" href="https://jakartasatu.jakarta.go.id/web/internal/sign-in" target="_blank">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 29 29" fill="none">
                                                                    <path d="M13.2915 4.83594V12.0859C13.2915 13.4211 10.8567 14.5026 7.854 14.5026C4.8513 14.5026 2.4165 13.4211 2.4165 12.0859V4.83594" stroke="#FFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M13.2915 8.45964C13.2915 9.79484 10.8567 10.8763 7.854 10.8763C4.8513 10.8763 2.4165 9.79484 2.4165 8.45964M19.3332 3.6263H22.9582C23.5991 3.6263 24.2138 3.88091 24.667 4.33413C25.1202 4.78734 25.3748 5.40203 25.3748 6.04297V9.66797M9.6665 25.3763H6.0415C5.40056 25.3763 4.78588 25.1217 4.33266 24.6685C3.87945 24.2153 3.62484 23.6006 3.62484 22.9596V19.3346M13.2915 4.83464C13.2915 6.16984 10.8567 7.2513 7.854 7.2513C4.8513 7.2513 2.4165 6.16984 2.4165 4.83464C2.4165 3.49943 4.8513 2.41797 7.854 2.41797C10.8567 2.41797 13.2915 3.49943 13.2915 4.83464Z" stroke="#FFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M21.1458 20.5417C22.8142 20.5417 24.1667 19.1892 24.1667 17.5208C24.1667 15.8525 22.8142 14.5 21.1458 14.5C19.4775 14.5 18.125 15.8525 18.125 17.5208C18.125 19.1892 19.4775 20.5417 21.1458 20.5417Z" stroke="#FFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M26.583 26.5859H15.708C15.708 25.8719 15.8487 25.1648 16.1219 24.5051C16.3952 23.8454 16.7957 23.246 17.3006 22.741C17.8055 22.2361 18.405 21.8356 19.0647 21.5623C19.7244 21.2891 20.4314 21.1484 21.1455 21.1484C21.8596 21.1484 22.5666 21.2891 23.2264 21.5623C23.8861 21.8356 24.4855 22.2361 24.9904 22.741C25.4953 23.246 25.8958 23.8454 26.1691 24.5051C26.4424 25.1648 26.583 25.8719 26.583 26.5859Z" stroke="#FFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Berbagi Pakai
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                        <Link id="btnIRK" href="https://jakartasatu.jakarta.go.id/irkv2" target="_blank">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 26" fill="none">
                                                                    <path d="M9.7474 1.99609L16.3276 5.83543L23.8307 2.70893V11.9173H21.6641V5.95893L17.3307 7.76484V11.9173H15.1641V7.66409L10.8307 5.13668V18.3371L12.8544 19.5179L11.7624 21.3888L9.66723 20.1658L2.16406 23.2923V6.42043L9.7474 1.99609ZM8.66406 18.2363V5.13668L4.33073 7.66409V20.0423L8.66406 18.2363Z" fill="#FFF" />
                                                                    <path d="M20.5822 13.8125V15.3032C21.3567 15.5025 22.0468 15.9098 22.5907 16.4645L23.8831 15.7181L24.9664 17.5944L23.6751 18.3398C23.886 19.0989 23.886 19.9011 23.6751 20.6602L24.9664 21.4056L23.8831 23.2819L22.5907 22.5355C22.0392 23.098 21.3448 23.4995 20.5822 23.6968V25.1875H18.4155V23.6968C17.6529 23.4995 16.9585 23.098 16.407 22.5355L15.1146 23.2819L14.0312 21.4056L15.3226 20.6602C15.1116 19.9011 15.1116 19.0989 15.3226 18.3398L14.0312 17.5944L15.1146 15.7181L16.407 16.4634C16.9588 15.9017 17.6531 15.501 18.4155 15.3042V13.8125H20.5822ZM17.6019 18.4524C17.4245 18.7731 17.3313 19.1335 17.3311 19.5C17.3311 19.8792 17.4297 20.2367 17.6019 20.5476L17.6409 20.6158C17.8334 20.9367 18.1057 21.2022 18.4313 21.3865C18.7569 21.5709 19.1247 21.6678 19.4988 21.6678C19.873 21.6678 20.2408 21.5709 20.5664 21.3865C20.8919 21.2022 21.1643 20.9367 21.3567 20.6158L21.3957 20.5476C21.5728 20.2268 21.6656 19.8664 21.6655 19.5C21.6655 19.1208 21.568 18.7633 21.3957 18.4524L21.3567 18.3842C21.1643 18.0633 20.8919 17.7978 20.5664 17.6135C20.2408 17.4291 19.873 17.3322 19.4988 17.3322C19.1247 17.3322 18.7569 17.4291 18.4313 17.6135C18.1057 17.7978 17.8334 18.0633 17.6409 18.3842L17.6019 18.4524Z" fill="#FFF" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Informasi Rencana Kota
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                        <Link id="btnSmartRDTR" href="/layanan/smart-rdtr">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 28" fill="none">
                                                                    <path d="M13.5625 19.1424C13.6947 19.2179 13.8444 19.2577 13.9967 19.2577C14.149 19.2577 14.2987 19.2179 14.4309 19.1424C14.6989 18.9881 20.9934 15.3142 20.9934 8.7572C20.9385 6.93862 20.1776 5.2129 18.872 3.94572C17.5664 2.67853 15.8188 1.96946 13.9994 1.96875C12.18 1.96804 10.4318 2.67575 9.1252 3.94191C7.81865 5.20807 7.05641 6.93319 7 8.75173C7 15.3142 13.2978 18.9827 13.5625 19.1424ZM14 6.12673C14.5192 6.12673 15.0267 6.28068 15.4584 6.56912C15.8901 6.85756 16.2265 7.26753 16.4252 7.74718C16.6239 8.22684 16.6758 8.75464 16.5746 9.26384C16.4733 9.77304 16.2233 10.2408 15.8562 10.6079C15.489 10.975 15.0213 11.225 14.5121 11.3263C14.0029 11.4276 13.4751 11.3756 12.9955 11.1769C12.5158 10.9782 12.1058 10.6418 11.8174 10.2101C11.529 9.77842 11.375 9.2709 11.375 8.75173C11.375 8.05553 11.6516 7.38786 12.1438 6.89557C12.6361 6.40329 13.3038 6.12673 14 6.12673ZM26.25 20.1267C26.25 23.537 19.938 25.3767 14 25.3767C8.06203 25.3767 1.75 23.537 1.75 20.1267C1.75 18.5309 3.19594 17.1178 5.82203 16.1488C6.03739 16.0776 6.27196 16.0929 6.47629 16.1913C6.68062 16.2897 6.83874 16.4637 6.91732 16.6764C6.9959 16.8892 6.98879 17.1242 6.8975 17.3318C6.80621 17.5394 6.63787 17.7035 6.42797 17.7894C4.62219 18.4577 3.5 19.3524 3.5 20.1267C3.5 21.588 7.49438 23.6267 14 23.6267C20.5056 23.6267 24.5 21.588 24.5 20.1267C24.5 19.3524 23.3778 18.4577 21.572 17.7905C21.3621 17.7046 21.1938 17.5405 21.1025 17.3329C21.0112 17.1253 21.0041 16.8903 21.0827 16.6775C21.1613 16.4648 21.3194 16.2908 21.5237 16.1924C21.728 16.094 21.9626 16.0787 22.178 16.1499C24.8041 17.1178 26.25 18.5309 26.25 20.1267Z" fill="#FFF" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Smart RDTR
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                    </Stack>
                                                </Stack>
                                            </>
                                        ) : (
                                            <>
                                                {isLayananHovered ? (
                                                    <Stack direction="column" justifyContent="center" alignItems="center" gap={2}
                                                        sx={{
                                                            // margin: "25px",
                                                            // height: "100%",
                                                            width: "375px",
                                                            padding: "35px 0",
                                                            borderRadius: "8px",
                                                            // background: "white",
                                                            // boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                                        }}>
                                                        <Typography variant='p'
                                                            sx={{
                                                                textAlign: "center",
                                                                color: 'var(--jakartasatu-biru)',
                                                                // fontFamily: 'var(--font-family)',
                                                                fontSize: "32px",
                                                                fontWeight: "700",
                                                                lineHeight: "150%",
                                                                letterSpacing: "-0.608px",
                                                            }}>
                                                            Layanan
                                                        </Typography>
                                                        <Stack direction="column" justifyContent="center" alignItems="flex-start" gap={1}>
                                                            <Link href="/layanan/galeri-peta-dan-dashboard">
                                                                <Button variant="text" disableElevation
                                                                    sx={{
                                                                        borderRadius: "30px",
                                                                        height: "42px",
                                                                        padding: "0 20px",
                                                                        transition: 'background 0.3s ease, transform 0.3s ease',
                                                                        '&:hover': {
                                                                            background: 'var(--jakartasatu-biru)',
                                                                            padding: "0 20px",
                                                                            // transform: 'scale(1.05)',
                                                                            '& .svg-icon path': {
                                                                                fill: 'white',
                                                                            },
                                                                            '& .MuiTypography-root': {
                                                                                color: 'white',
                                                                            },
                                                                        },
                                                                    }}>
                                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26" fill="#5f6368"><path d="M320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Zm240 240q-17 0-28.5-11.5T520-600q0-17 11.5-28.5T560-640q17 0 28.5 11.5T600-600q0 17-11.5 28.5T560-560Zm0 200q81-69 120.5-127.5T720-596q0-75-48.5-119.5T560-760q-63 0-111.5 44.5T400-596q0 50 39.5 108.5T560-360Z" fill='var(--jakartasatu-orange)' /></svg>
                                                                        <Typography variant='p'
                                                                            sx={{
                                                                                color: 'var(--jakartasatu-biru)',
                                                                                // fontFamily: 'var(--font-family)',
                                                                                fontSize: "18px",
                                                                                fontWeight: "500",
                                                                                lineHeight: "150%",
                                                                                letterSpacing: "-0.342px",
                                                                                textTransform: "none",
                                                                                transition: 'color 0.3s ease',
                                                                            }}>
                                                                            Galeri Peta & Dashboard
                                                                        </Typography>
                                                                    </Stack>
                                                                </Button>
                                                            </Link>
                                                            <Link id="btnBerbagiPakai" href="/layanan/berbagi-pakai">
                                                                <Button variant="text" disableElevation
                                                                    sx={{
                                                                        borderRadius: "30px",
                                                                        height: "42px",
                                                                        padding: "0 20px",
                                                                        transition: 'background 0.3s ease, transform 0.3s ease',
                                                                        '&:hover': {
                                                                            background: 'var(--jakartasatu-biru)',
                                                                            padding: "0 20px",
                                                                            // transform: 'scale(1.05)',
                                                                            '& .svg-icon path': {
                                                                                stroke: 'white',
                                                                            },
                                                                            '& .MuiTypography-root': {
                                                                                color: 'white',
                                                                            },
                                                                        },
                                                                    }}>
                                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 29 29" fill="none">
                                                                            <path d="M13.2915 4.83594V12.0859C13.2915 13.4211 10.8567 14.5026 7.854 14.5026C4.8513 14.5026 2.4165 13.4211 2.4165 12.0859V4.83594" stroke='var(--jakartasatu-orange)' strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M13.2915 8.45964C13.2915 9.79484 10.8567 10.8763 7.854 10.8763C4.8513 10.8763 2.4165 9.79484 2.4165 8.45964M19.3332 3.6263H22.9582C23.5991 3.6263 24.2138 3.88091 24.667 4.33413C25.1202 4.78734 25.3748 5.40203 25.3748 6.04297V9.66797M9.6665 25.3763H6.0415C5.40056 25.3763 4.78588 25.1217 4.33266 24.6685C3.87945 24.2153 3.62484 23.6006 3.62484 22.9596V19.3346M13.2915 4.83464C13.2915 6.16984 10.8567 7.2513 7.854 7.2513C4.8513 7.2513 2.4165 6.16984 2.4165 4.83464C2.4165 3.49943 4.8513 2.41797 7.854 2.41797C10.8567 2.41797 13.2915 3.49943 13.2915 4.83464Z" stroke='var(--jakartasatu-orange)' strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M21.1458 20.5417C22.8142 20.5417 24.1667 19.1892 24.1667 17.5208C24.1667 15.8525 22.8142 14.5 21.1458 14.5C19.4775 14.5 18.125 15.8525 18.125 17.5208C18.125 19.1892 19.4775 20.5417 21.1458 20.5417Z" stroke='var(--jakartasatu-orange)' strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M26.583 26.5859H15.708C15.708 25.8719 15.8487 25.1648 16.1219 24.5051C16.3952 23.8454 16.7957 23.246 17.3006 22.741C17.8055 22.2361 18.405 21.8356 19.0647 21.5623C19.7244 21.2891 20.4314 21.1484 21.1455 21.1484C21.8596 21.1484 22.5666 21.2891 23.2264 21.5623C23.8861 21.8356 24.4855 22.2361 24.9904 22.741C25.4953 23.246 25.8958 23.8454 26.1691 24.5051C26.4424 25.1648 26.583 25.8719 26.583 26.5859Z" stroke='var(--jakartasatu-orange)' strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        <Typography variant='p'
                                                                            sx={{
                                                                                color: 'var(--jakartasatu-biru)',
                                                                                // fontFamily: 'var(--font-family)',
                                                                                fontSize: "18px",
                                                                                fontWeight: "500",
                                                                                lineHeight: "150%",
                                                                                letterSpacing: "-0.342px",
                                                                                textTransform: "none",
                                                                                transition: 'color 0.3s ease',
                                                                            }}>
                                                                            Berbagi Pakai
                                                                        </Typography>
                                                                    </Stack>
                                                                </Button>
                                                            </Link>
                                                            <Link id="btnIRK" href="/layanan/irk">
                                                                <Button variant="text" disableElevation
                                                                    sx={{
                                                                        borderRadius: "30px",
                                                                        height: "42px",
                                                                        padding: "0 20px",
                                                                        transition: 'background 0.3s ease, transform 0.3s ease',
                                                                        '&:hover': {
                                                                            background: 'var(--jakartasatu-biru)',
                                                                            padding: "0 20px",
                                                                            // transform: 'scale(1.05)',
                                                                            '& .svg-icon path': {
                                                                                fill: 'white',
                                                                            },
                                                                            '& .MuiTypography-root': {
                                                                                color: 'white',
                                                                            },
                                                                        },
                                                                    }}>
                                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                            <path d="M9.7474 1.99609L16.3276 5.83543L23.8307 2.70893V11.9173H21.6641V5.95893L17.3307 7.76484V11.9173H15.1641V7.66409L10.8307 5.13668V18.3371L12.8544 19.5179L11.7624 21.3888L9.66723 20.1658L2.16406 23.2923V6.42043L9.7474 1.99609ZM8.66406 18.2363V5.13668L4.33073 7.66409V20.0423L8.66406 18.2363Z" fill='var(--jakartasatu-orange)' />
                                                                            <path d="M20.5822 13.8125V15.3032C21.3567 15.5025 22.0468 15.9098 22.5907 16.4645L23.8831 15.7181L24.9664 17.5944L23.6751 18.3398C23.886 19.0989 23.886 19.9011 23.6751 20.6602L24.9664 21.4056L23.8831 23.2819L22.5907 22.5355C22.0392 23.098 21.3448 23.4995 20.5822 23.6968V25.1875H18.4155V23.6968C17.6529 23.4995 16.9585 23.098 16.407 22.5355L15.1146 23.2819L14.0312 21.4056L15.3226 20.6602C15.1116 19.9011 15.1116 19.0989 15.3226 18.3398L14.0312 17.5944L15.1146 15.7181L16.407 16.4634C16.9588 15.9017 17.6531 15.501 18.4155 15.3042V13.8125H20.5822ZM17.6019 18.4524C17.4245 18.7731 17.3313 19.1335 17.3311 19.5C17.3311 19.8792 17.4297 20.2367 17.6019 20.5476L17.6409 20.6158C17.8334 20.9367 18.1057 21.2022 18.4313 21.3865C18.7569 21.5709 19.1247 21.6678 19.4988 21.6678C19.873 21.6678 20.2408 21.5709 20.5664 21.3865C20.8919 21.2022 21.1643 20.9367 21.3567 20.6158L21.3957 20.5476C21.5728 20.2268 21.6656 19.8664 21.6655 19.5C21.6655 19.1208 21.568 18.7633 21.3957 18.4524L21.3567 18.3842C21.1643 18.0633 20.8919 17.7978 20.5664 17.6135C20.2408 17.4291 19.873 17.3322 19.4988 17.3322C19.1247 17.3322 18.7569 17.4291 18.4313 17.6135C18.1057 17.7978 17.8334 18.0633 17.6409 18.3842L17.6019 18.4524Z" fill='var(--jakartasatu-orange)' />
                                                                        </svg>
                                                                        <Typography variant='p'
                                                                            sx={{
                                                                                color: 'var(--jakartasatu-biru)',
                                                                                // fontFamily: 'var(--font-family)',
                                                                                fontSize: "18px",
                                                                                fontWeight: "500",
                                                                                lineHeight: "150%",
                                                                                letterSpacing: "-0.342px",
                                                                                textTransform: "none",
                                                                                transition: 'color 0.3s ease',
                                                                            }}>
                                                                            Informasi Rencana Kota
                                                                        </Typography>
                                                                    </Stack>
                                                                </Button>
                                                            </Link>
                                                            <Link id="btnSmartRDTR" href="/layanan/smart-rdtr">
                                                                <Button variant="text" disableElevation
                                                                    sx={{
                                                                        borderRadius: "30px",
                                                                        height: "42px",
                                                                        padding: "0 20px",
                                                                        transition: 'background 0.3s ease, transform 0.3s ease',
                                                                        '&:hover': {
                                                                            background: 'var(--jakartasatu-biru)',
                                                                            padding: "0 20px",
                                                                            // transform: 'scale(1.05)',
                                                                            '& .svg-icon path': {
                                                                                fill: 'white',
                                                                            },
                                                                            '& .MuiTypography-root': {
                                                                                color: 'white',
                                                                            },
                                                                        },
                                                                    }}>
                                                                    <Stack className="svg-icon" direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 28 28" fill="none">
                                                                            <path d="M13.5625 19.1424C13.6947 19.2179 13.8444 19.2577 13.9967 19.2577C14.149 19.2577 14.2987 19.2179 14.4309 19.1424C14.6989 18.9881 20.9934 15.3142 20.9934 8.7572C20.9385 6.93862 20.1776 5.2129 18.872 3.94572C17.5664 2.67853 15.8188 1.96946 13.9994 1.96875C12.18 1.96804 10.4318 2.67575 9.1252 3.94191C7.81865 5.20807 7.05641 6.93319 7 8.75173C7 15.3142 13.2978 18.9827 13.5625 19.1424ZM14 6.12673C14.5192 6.12673 15.0267 6.28068 15.4584 6.56912C15.8901 6.85756 16.2265 7.26753 16.4252 7.74718C16.6239 8.22684 16.6758 8.75464 16.5746 9.26384C16.4733 9.77304 16.2233 10.2408 15.8562 10.6079C15.489 10.975 15.0213 11.225 14.5121 11.3263C14.0029 11.4276 13.4751 11.3756 12.9955 11.1769C12.5158 10.9782 12.1058 10.6418 11.8174 10.2101C11.529 9.77842 11.375 9.2709 11.375 8.75173C11.375 8.05553 11.6516 7.38786 12.1438 6.89557C12.6361 6.40329 13.3038 6.12673 14 6.12673ZM26.25 20.1267C26.25 23.537 19.938 25.3767 14 25.3767C8.06203 25.3767 1.75 23.537 1.75 20.1267C1.75 18.5309 3.19594 17.1178 5.82203 16.1488C6.03739 16.0776 6.27196 16.0929 6.47629 16.1913C6.68062 16.2897 6.83874 16.4637 6.91732 16.6764C6.9959 16.8892 6.98879 17.1242 6.8975 17.3318C6.80621 17.5394 6.63787 17.7035 6.42797 17.7894C4.62219 18.4577 3.5 19.3524 3.5 20.1267C3.5 21.588 7.49438 23.6267 14 23.6267C20.5056 23.6267 24.5 21.588 24.5 20.1267C24.5 19.3524 23.3778 18.4577 21.572 17.7905C21.3621 17.7046 21.1938 17.5405 21.1025 17.3329C21.0112 17.1253 21.0041 16.8903 21.0827 16.6775C21.1613 16.4648 21.3194 16.2908 21.5237 16.1924C21.728 16.094 21.9626 16.0787 22.178 16.1499C24.8041 17.1178 26.25 18.5309 26.25 20.1267Z" fill='var(--jakartasatu-orange)' />
                                                                        </svg>
                                                                        <Typography variant='p'
                                                                            sx={{
                                                                                color: 'var(--jakartasatu-biru)',
                                                                                // fontFamily: 'var(--font-family)',
                                                                                fontSize: "18px",
                                                                                fontWeight: "500",
                                                                                lineHeight: "150%",
                                                                                letterSpacing: "-0.342px",
                                                                                textTransform: "none",
                                                                                transition: 'color 0.3s ease',
                                                                            }}>
                                                                            Smart RDTR
                                                                        </Typography>
                                                                    </Stack>
                                                                </Button>
                                                            </Link>
                                                        </Stack>
                                                    </Stack>
                                                ) : (
                                                    <Box>
                                                        <Stack direction="column" justifyContent="center" gap={1}>
                                                            <Typography variant='p'
                                                                sx={{
                                                                    textAlign: "center",
                                                                    color: 'var(--jakartasatu-biru)',
                                                                    // fontFamily: 'var(--font-family)',
                                                                    fontSize: "32px",
                                                                    fontWeight: "700",
                                                                    lineHeight: "150%",
                                                                    letterSpacing: "-0.608px",
                                                                }}>
                                                                Layanan
                                                            </Typography>
                                                            <CustomImage
                                                                src="/assets/Gambar-layanan.png"
                                                                alt="Gambar"
                                                                draggable={false}
                                                                width={0}
                                                                height={0}
                                                                style={{
                                                                    userDrag: "none",
                                                                    userSelect: "none",

                                                                    width: 'auto',
                                                                    height: '120px',
                                                                    alignSelf: "center"
                                                                }}
                                                            />
                                                            <Box sx={{ width: "100%", maxWidth: "320px", display: "flex", alignSelf: "center" }}>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        textAlign: "center",
                                                                        color: "#000",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "16px",
                                                                        fontWeight: "400",
                                                                        lineHeight: "180%",
                                                                    }}>
                                                                    Kamu bisa memanfaatkan data spasial Jakarta Satu dengan proses dan alur yang mudah
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                )}
                                            </>
                                        )}
                                </motion.div>
                            </motion.div>
                        </Grid>

                        <Box id='iconElement' sx={{
                            zIndex: "-1",
                            position: "sticky",
                            width: "100%",
                            maxWidth: "1260px",
                            userDrag: "none",
                            userSelect: "none",
                            opacity: "50%",
                        }}>
                            <div style={{
                                position: "absolute",
                                left: 0,

                                marginTop: "200px",
                                marginLeft: "50px",
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                                    <g opacity="0.5" clipPath="url(#clip0_20905_130)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M17.3259 37.1896C17.3748 37.0068 17.4656 36.838 17.5911 36.6964C17.7166 36.5547 17.8733 36.4443 18.0489 36.3737L23.7032 34.1016C24.0031 33.9811 24.3386 33.9847 24.6359 34.1115C24.9332 34.2384 25.1679 34.4781 25.2885 34.7781C25.409 35.078 25.4054 35.4135 25.2786 35.7108C25.1517 36.0081 24.9119 36.2428 24.612 36.3634L19.5231 38.4083L17.1608 47.2383L46.5632 35.4234L38.7478 30.6831L33.6589 32.728C33.359 32.8485 33.0235 32.8449 32.7262 32.7181C32.4289 32.5912 32.1942 32.3515 32.0736 32.0515C31.9531 31.7516 31.9567 31.4161 32.0835 31.1188C32.2104 30.8215 32.4502 30.5868 32.7501 30.4663L38.4044 28.1942C38.58 28.1236 38.7695 28.0949 38.9581 28.1103C39.1467 28.1257 39.3291 28.1848 39.4909 28.283L49.9114 34.6033C50.1049 34.7207 50.262 34.8897 50.3649 35.0913C50.4678 35.2928 50.5125 35.5191 50.4941 35.7447C50.4756 35.9703 50.3948 36.1863 50.2605 36.3685C50.1262 36.5507 49.9438 36.6919 49.7338 36.7763L15.8079 50.4089C15.5979 50.4933 15.3685 50.5175 15.1455 50.4789C14.9225 50.4403 14.7146 50.3403 14.5452 50.1902C14.3758 50.0401 14.2516 49.8458 14.1864 49.6291C14.1212 49.4123 14.1176 49.1817 14.1761 48.9631L17.3259 37.1896Z" fill='var(--jakartasatu-biru)' />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.8147 20.0851C12.1153 18.344 11.9331 16.4381 12.29 14.5961C12.6469 12.754 13.5277 11.054 14.8268 9.70015C16.1259 8.34627 17.788 7.396 19.6138 6.96335C21.4395 6.53069 23.3514 6.63405 25.1198 7.261C26.8883 7.88796 28.4383 9.01189 29.5839 10.4979C30.7294 11.984 31.4219 13.769 31.5781 15.6388C31.7343 17.5086 31.3477 19.3838 30.4647 21.0393C29.5816 22.6948 28.2396 24.0604 26.5997 24.9721L31.6265 37.4818C31.747 37.7817 31.7435 38.1172 31.6166 38.4145C31.4897 38.7118 31.25 38.9465 30.9501 39.067C30.6501 39.1876 30.3146 39.184 30.0173 39.0571C29.72 38.9303 29.4853 38.6905 29.3648 38.3906L24.3389 25.8832C22.041 26.4866 19.6019 26.2301 17.4797 25.1621C15.3575 24.094 13.6992 22.2901 12.8147 20.0851Z" fill='var(--jakartasatu-orange)' />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_20905_130">
                                            <rect width="39" height="39" fill="white" transform="translate(0.132812 14.6758) rotate(-21.892)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div style={{
                                position: "absolute",
                                right: 0,

                                marginTop: "200px",
                                marginRight: "150px",
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                    <path opacity="0.5" d="M17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0ZM12.7855 4.6074C13.4046 4.94071 14.1363 5.25603 14.9816 5.55362C15.8269 5.8512 16.6662 6.00038 17.4995 6.00038C18.1145 5.99919 18.728 5.84656 19.2499 5.46428C19.7552 5.16146 20.2443 4.91983 20.8926 4.98202C21.5588 5.05481 22.2604 5.28419 22.9638 5.32219C23.8448 5.79836 24.7022 6.39274 25.5356 7.10702C25.1308 7.13082 24.7015 7.17343 24.2492 7.23299C23.7968 7.29255 23.3569 7.38092 22.9283 7.49995C22.4997 7.61898 22.1067 7.77453 21.7495 7.96498C21.3924 8.15547 21.1304 8.39299 20.9637 8.6787C20.7018 9.10727 20.5175 9.4705 20.4104 9.76812C20.1899 10.3852 20.242 11.3697 19.7322 11.8221C19.6251 11.8935 19.5356 11.9766 19.4641 12.0718C19.3927 12.167 19.3629 12.2917 19.3748 12.4464C19.3867 12.6012 19.4645 12.8217 19.6073 13.1074C19.6787 13.2741 19.7373 13.4764 19.7849 13.7145C20.2373 13.7131 20.7064 13.645 21.1069 13.3571L23.4644 13.5714C24.073 12.8859 24.7821 12.8745 25.3924 13.5714C25.5829 13.7618 25.7853 14.0484 25.9995 14.4293L24.9995 15.1075C24.7614 15.0361 24.4759 14.8934 24.1426 14.6791C23.9763 14.5838 23.8091 14.4763 23.642 14.3572C22.6919 13.8961 20.8314 14.4331 19.7849 14.5004C19.6485 14.7733 19.5386 15.0405 19.2144 15.1076C19.1581 15.2842 19.2125 15.4736 19.1423 15.6437C18.6899 16.358 18.5354 17.1078 18.6783 17.8935C18.9402 19.1316 19.5825 19.7505 20.6063 19.7505H20.9992C21.4992 19.7505 21.8507 19.7739 22.0531 19.8215C22.2555 19.8691 22.3567 19.9054 22.3567 19.9292C22.2376 20.2149 22.1961 20.4407 22.2318 20.6074C22.3497 21.1422 22.7355 21.5468 22.6958 22.1252C22.6588 22.8609 22.4275 23.4953 22.6786 24.233C22.9648 24.9487 23.3245 25.7258 23.5893 26.4646C23.6964 26.6789 23.8573 26.8099 24.0715 26.8575C24.5001 26.929 25.0359 26.6435 25.6788 26.0007C26.155 25.4768 26.4287 24.9048 26.5001 24.2858C26.5944 23.7378 26.9806 23.2511 27.1073 22.6786V22.2146C27.2261 21.9765 27.3273 21.7443 27.4108 21.5181C27.53 21.1893 27.543 20.7704 27.5712 20.3932C27.9455 20.0189 28.3108 19.6847 28.5713 19.2144C28.738 18.9287 28.7859 18.6795 28.7145 18.4652C28.6916 18.4176 28.6319 18.3696 28.5358 18.322L27.9997 18.1078C28.0088 17.8084 28.5593 17.853 28.821 17.8935L30.1063 17.1077C30.0587 18.7267 29.7434 20.2925 29.1601 21.8045C28.5768 23.3163 27.714 24.6787 26.5711 25.893C25.0474 27.5597 23.2195 28.7505 21.0886 29.4648C18.9576 30.1791 16.7612 30.3218 14.4993 29.8932C14.8887 29.2053 15.1135 28.4301 15.5715 27.7499C15.5715 27.3928 15.6248 27.0892 15.7319 26.8392C16.1865 25.7876 16.9281 25.5139 17.7859 24.697C18.6514 23.7949 18.6432 22.7289 18.6783 21.4287C18.6665 20.6058 17.3507 20.1006 16.7492 19.6428C15.3552 18.7034 14.4699 17.3212 12.482 17.7321C11.7715 17.8045 11.5996 17.9426 11.0707 17.5006L10.8565 17.393L10.8748 17.3219L10.9641 17.1432C11.1774 16.92 10.8746 16.6395 10.5884 16.732C10.5289 16.7439 10.4639 16.7503 10.3925 16.7503C10.3272 16.4313 10.1132 16.1346 10.0706 15.7857C10.4039 16.0476 10.6904 16.2447 10.9286 16.3756C11.1666 16.5066 11.369 16.5961 11.5357 16.6437C11.7024 16.7151 11.8451 16.7386 11.9641 16.7148C12.2261 16.6671 12.3741 16.4051 12.4098 15.9289C12.4455 15.4527 12.4285 14.9052 12.3571 14.2862C12.4285 14.191 12.4754 14.0951 12.4992 13.9998C12.7508 12.6985 13.4172 12.9839 14.4283 12.6079C14.595 12.5127 14.6301 12.3934 14.5348 12.2505C14.5348 12.2267 14.5295 12.215 14.5176 12.215C14.5058 12.215 14.4993 12.2022 14.4993 12.1784C15.0489 11.9024 15.3727 11.3372 15.7136 10.822C15.4231 10.3617 14.9722 9.97736 14.4638 9.71431C14.1912 9.37805 13.1209 9.5842 12.8921 9.03609C12.7016 9.01227 12.5589 8.97606 12.4637 8.92846C11.4994 8.30357 11.0921 7.21083 10.0534 6.76793C9.63671 6.73223 9.22556 6.73863 8.82082 6.78623C10.0351 5.81006 11.3569 5.08362 12.7855 4.6074ZM4.10683 14.6791C4.32112 15.0362 4.58314 15.3579 4.89266 15.6436C6.49913 17.1194 8.00915 17.4321 10.0706 18.1788C10.1657 18.2502 10.2968 18.3695 10.4635 18.5361C10.6881 18.7066 10.8782 18.9108 11.1073 19.0722C11.1073 19.1913 11.0892 19.3574 11.0535 19.5718C11.0178 19.786 11.0113 20.1311 11.0352 20.6073C11.104 21.9324 12.1967 22.9813 12.4992 24.2502C12.2309 25.8946 12.2271 27.5109 12.0352 29.1429C10.4162 28.4762 8.99422 27.5239 7.76801 26.2859C6.54183 25.0478 5.5949 23.6077 4.92822 21.9648C4.45204 20.7743 4.14845 19.5653 4.0175 18.3391C3.88637 17.113 3.91623 15.8934 4.10683 14.6791Z" fill='var(--jakartasatu-biru)' />
                                </svg>
                            </div>
                        </Box>

                        <Grid xs={12} sm={12} md={4} lg={4} xl={4}
                            sx={{
                                order: 1,

                                backgroundImage: `url('${basePath}/assets/partikel-kolaborasi.png')`,
                                backgroundRepeat: "no-repeat",
                                width: '376px',
                                height: { xs: '480px', sm: "" },
                            }}>
                            <motion.div
                                variants={boxKolaborasi}
                                animate={isKolaborasiVisible ? { controlsRotate } : "hidden"}
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.3 }
                                }}
                                onMouseEnter={() => setIsKolaborasiHovered(true)}
                                onMouseLeave={() => setIsKolaborasiHovered(false)}
                                style={{
                                    background: "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.89) 32.5%, rgba(255, 255, 255, 0.02) 100%)",

                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                <motion.div animate={controlsRotate} style={{ height: "100%", minHeight: "290px" }}>
                                    {isMobile768 ||
                                        isMobileiPadAirLandscape ||
                                        isMobileiPadAirPortrait ||
                                        isMobileiPadProPortrait ||
                                        isMobileiPadProLandscape
                                        ? (
                                            <Box>
                                                <Stack direction="column" justifyContent="center" gap={1}>
                                                    <Typography variant='p'
                                                        sx={{
                                                            textAlign: "center",
                                                            color: 'var(--jakartasatu-biru)',
                                                            // fontFamily: 'var(--font-family)',
                                                            fontSize: "32px",
                                                            fontWeight: "700",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.608px",
                                                        }}>
                                                        Kolaborasi
                                                    </Typography>
                                                    <CustomImage
                                                        src="/assets/Gambar-skpd.png"
                                                        alt="Gambar"
                                                        draggable={false}
                                                        width={0}
                                                        height={0}
                                                        style={{
                                                            userDrag: "none",
                                                            userSelect: "none",

                                                            width: "100%",
                                                            maxWidth: '161.645px',
                                                            height: 'auto',
                                                            alignSelf: "center"
                                                        }}
                                                    />
                                                    <Box sx={{ width: "100%", maxWidth: "360px", display: "flex", alignSelf: "center" }}>
                                                        <Typography variant='p'
                                                            sx={{
                                                                textAlign: "center",
                                                                color: "#000",
                                                                // fontFamily: 'var(--font-family)',
                                                                fontSize: "16px",
                                                                fontWeight: "400",
                                                                lineHeight: "180%",
                                                            }}>
                                                            Mau lihat SKPD dan aplikasi yang terhubung dengan Jakarta Satu? yuk lihat disini
                                                        </Typography>
                                                    </Box>
                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                        <Link href="/kolaborasi/simpul-jaringan">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 2 32 32" fill="none">
                                                                    <path d="M12.0026 8C12.0026 9.06087 12.424 10.0783 13.1742 10.8284C13.9243 11.5786 14.9417 12 16.0026 12C17.0635 12 18.0809 11.5786 18.831 10.8284C19.5812 10.0783 20.0026 9.06087 20.0026 8C20.0026 6.93913 19.5812 5.92172 18.831 5.17157C18.0809 4.42143 17.0635 4 16.0026 4C14.9417 4 13.9243 4.42143 13.1742 5.17157C12.424 5.92172 12.0026 6.93913 12.0026 8ZM3.33594 24C3.33594 24.5253 3.4394 25.0454 3.64042 25.5307C3.84144 26.016 4.13608 26.457 4.50751 26.8284C4.87894 27.1999 5.3199 27.4945 5.8052 27.6955C6.29051 27.8965 6.81065 28 7.33594 28C7.86122 28 8.38137 27.8965 8.86667 27.6955C9.35197 27.4945 9.79293 27.1999 10.1644 26.8284C10.5358 26.457 10.8304 26.016 11.0315 25.5307C11.2325 25.0454 11.3359 24.5253 11.3359 24C11.3359 22.9391 10.9145 21.9217 10.1644 21.1716C9.41422 20.4214 8.3968 20 7.33594 20C6.27507 20 5.25766 20.4214 4.50751 21.1716C3.75736 21.9217 3.33594 22.9391 3.33594 24ZM24.6693 28C23.6084 28 22.591 27.5786 21.8408 26.8284C21.0907 26.0783 20.6693 25.0609 20.6693 24C20.6693 22.9391 21.0907 21.9217 21.8408 21.1716C22.591 20.4214 23.6084 20 24.6693 20C25.7301 20 26.7476 20.4214 27.4977 21.1716C28.2478 21.9217 28.6693 22.9391 28.6693 24C28.6693 25.0609 28.2478 26.0783 27.4977 26.8284C26.7476 27.5786 25.7301 28 24.6693 28ZM9.60927 10.0827C9.80315 9.90578 9.91973 9.65977 9.93384 9.3977C9.94796 9.13563 9.85848 8.87852 9.68472 8.68183C9.51096 8.48515 9.26684 8.36466 9.00503 8.34635C8.74322 8.32805 8.48471 8.4134 8.28527 8.584C7.04271 9.6777 6.04771 11.0238 5.36668 12.5326C4.68565 14.0413 4.33425 15.678 4.33594 17.3333C4.33594 17.5985 4.44129 17.8529 4.62883 18.0404C4.81637 18.228 5.07072 18.3333 5.33594 18.3333C5.60115 18.3333 5.85551 18.228 6.04304 18.0404C6.23058 17.8529 6.33594 17.5985 6.33594 17.3333C6.3342 15.9614 6.6253 14.605 7.18979 13.3546C7.75428 12.1042 8.57915 10.9887 9.60927 10.0827ZM23.7199 8.584C23.5205 8.4134 23.262 8.32805 23.0002 8.34635C22.7384 8.36466 22.4942 8.48515 22.3205 8.68183C22.1467 8.87852 22.0572 9.13563 22.0714 9.3977C22.0855 9.65977 22.2021 9.90578 22.3959 10.0827C23.4261 10.9887 24.2509 12.1042 24.8154 13.3546C25.3799 14.605 25.671 15.9614 25.6693 17.3333C25.6693 17.5985 25.7746 17.8529 25.9622 18.0404C26.1497 18.228 26.4041 18.3333 26.6693 18.3333C26.9345 18.3333 27.1888 18.228 27.3764 18.0404C27.5639 17.8529 27.6693 17.5985 27.6693 17.3333C27.671 15.678 27.3196 14.0413 26.6385 12.5326C25.9575 11.0238 24.9625 9.6777 23.7199 8.584ZM13.5853 26.696C13.4568 26.659 13.3222 26.6481 13.1894 26.664C13.0566 26.6799 12.9284 26.7223 12.8123 26.7886C12.6962 26.855 12.5946 26.9439 12.5135 27.0502C12.4323 27.1565 12.3734 27.278 12.34 27.4075C12.3067 27.537 12.2996 27.6718 12.3193 27.8041C12.339 27.9363 12.385 28.0633 12.4546 28.1775C12.5242 28.2916 12.616 28.3907 12.7245 28.4688C12.8331 28.5468 12.9562 28.6023 13.0866 28.632C14.9996 29.1228 17.0056 29.1228 18.9186 28.632C19.049 28.6023 19.1721 28.5468 19.2807 28.4688C19.3892 28.3907 19.481 28.2916 19.5506 28.1775C19.6202 28.0633 19.6662 27.9363 19.6859 27.8041C19.7056 27.6718 19.6986 27.537 19.6652 27.4075C19.6318 27.278 19.5729 27.1565 19.4917 27.0502C19.4106 26.9439 19.309 26.855 19.1929 26.7886C19.0768 26.7223 18.9486 26.6799 18.8158 26.664C18.683 26.6481 18.5484 26.659 18.4199 26.696C17.6301 26.8982 16.8179 27.0003 16.0026 27C15.1873 27.0003 14.3751 26.8982 13.5853 26.696Z" fill="#FFF" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Simpul Jaringan
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                        <Link href="/kolaborasi/aplikasi">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                    <path d="M7.2 0H0.9C0.36 0 0 0.36 0 0.9V7.2C0 7.74 0.36 8.1 0.9 8.1H7.2C7.74 8.1 8.1 7.74 8.1 7.2V0.9C8.1 0.36 7.74 0 7.2 0ZM7.2 9.9H0.9C0.36 9.9 0 10.26 0 10.8V17.1C0 17.64 0.36 18 0.9 18H7.2C7.74 18 8.1 17.64 8.1 17.1V10.8C8.1 10.26 7.74 9.9 7.2 9.9ZM17.1 0H10.8C10.26 0 9.9 0.36 9.9 0.9V7.2C9.9 7.74 10.26 8.1 10.8 8.1H17.1C17.64 8.1 18 7.74 18 7.2V0.9C18 0.36 17.64 0 17.1 0ZM17.1 9.9H10.8C10.26 9.9 9.9 10.26 9.9 10.8V17.1C9.9 17.64 10.26 18 10.8 18H17.1C17.64 18 18 17.64 18 17.1V10.8C18 10.26 17.64 9.9 17.1 9.9Z" fill="#FFF" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Aplikasi
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                        <Link href="/kolaborasi/urun-data">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                    <path d="M22 5.5V19C22 20.657 17.523 22 12 22C6.477 22 2 20.657 2 19V5.5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M22 14.5C22 16.157 17.523 17.5 12 17.5C6.477 17.5 2 16.157 2 14.5M22 10C22 11.657 17.523 13 12 13C6.477 13 2 11.657 2 10" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M12 8C17.5228 8 22 6.65685 22 5C22 3.34315 17.5228 2 12 2C6.47715 2 2 3.34315 2 5C2 6.65685 6.47715 8 12 8Z" fill="#FFF" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Urun Data
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        ) : (
                                            <>
                                                {isKolaborasiHovered ? (
                                                    <Stack direction="column" justifyContent="center" alignItems="center" gap={2}
                                                        sx={{
                                                            // margin: "25px",
                                                            // height: "100%",
                                                            width: "375px",
                                                            padding: "35px 0",
                                                            borderRadius: "8px",
                                                            // background: "white",
                                                            // boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                                        }}>
                                                        <Typography variant='p'
                                                            sx={{
                                                                textAlign: "center",
                                                                color: 'var(--jakartasatu-biru)',
                                                                // fontFamily: 'var(--font-family)',
                                                                fontSize: "32px",
                                                                fontWeight: "700",
                                                                lineHeight: "150%",
                                                                letterSpacing: "-0.608px",
                                                            }}>
                                                            Kolaborasi
                                                        </Typography>
                                                        <Stack direction="column" justifyContent="center" alignItems="flex-start" gap={1}>
                                                            <Link href="/kolaborasi/simpul-jaringan">
                                                                <Button variant="text" disableElevation
                                                                    sx={{
                                                                        borderRadius: "30px",
                                                                        height: "42px",
                                                                        padding: "0 20px",
                                                                        transition: 'background 0.3s ease, transform 0.3s ease',
                                                                        '&:hover': {
                                                                            background: 'var(--jakartasatu-biru)',
                                                                            padding: "0 20px",
                                                                            // transform: 'scale(1.05)',
                                                                            '& .svg-icon path': {
                                                                                fill: 'white',
                                                                            },
                                                                            '& .MuiTypography-root': {
                                                                                color: 'white',
                                                                            },
                                                                        },
                                                                    }}>
                                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 2 32 32" fill="none">
                                                                            <path d="M12.0026 8C12.0026 9.06087 12.424 10.0783 13.1742 10.8284C13.9243 11.5786 14.9417 12 16.0026 12C17.0635 12 18.0809 11.5786 18.831 10.8284C19.5812 10.0783 20.0026 9.06087 20.0026 8C20.0026 6.93913 19.5812 5.92172 18.831 5.17157C18.0809 4.42143 17.0635 4 16.0026 4C14.9417 4 13.9243 4.42143 13.1742 5.17157C12.424 5.92172 12.0026 6.93913 12.0026 8ZM3.33594 24C3.33594 24.5253 3.4394 25.0454 3.64042 25.5307C3.84144 26.016 4.13608 26.457 4.50751 26.8284C4.87894 27.1999 5.3199 27.4945 5.8052 27.6955C6.29051 27.8965 6.81065 28 7.33594 28C7.86122 28 8.38137 27.8965 8.86667 27.6955C9.35197 27.4945 9.79293 27.1999 10.1644 26.8284C10.5358 26.457 10.8304 26.016 11.0315 25.5307C11.2325 25.0454 11.3359 24.5253 11.3359 24C11.3359 22.9391 10.9145 21.9217 10.1644 21.1716C9.41422 20.4214 8.3968 20 7.33594 20C6.27507 20 5.25766 20.4214 4.50751 21.1716C3.75736 21.9217 3.33594 22.9391 3.33594 24ZM24.6693 28C23.6084 28 22.591 27.5786 21.8408 26.8284C21.0907 26.0783 20.6693 25.0609 20.6693 24C20.6693 22.9391 21.0907 21.9217 21.8408 21.1716C22.591 20.4214 23.6084 20 24.6693 20C25.7301 20 26.7476 20.4214 27.4977 21.1716C28.2478 21.9217 28.6693 22.9391 28.6693 24C28.6693 25.0609 28.2478 26.0783 27.4977 26.8284C26.7476 27.5786 25.7301 28 24.6693 28ZM9.60927 10.0827C9.80315 9.90578 9.91973 9.65977 9.93384 9.3977C9.94796 9.13563 9.85848 8.87852 9.68472 8.68183C9.51096 8.48515 9.26684 8.36466 9.00503 8.34635C8.74322 8.32805 8.48471 8.4134 8.28527 8.584C7.04271 9.6777 6.04771 11.0238 5.36668 12.5326C4.68565 14.0413 4.33425 15.678 4.33594 17.3333C4.33594 17.5985 4.44129 17.8529 4.62883 18.0404C4.81637 18.228 5.07072 18.3333 5.33594 18.3333C5.60115 18.3333 5.85551 18.228 6.04304 18.0404C6.23058 17.8529 6.33594 17.5985 6.33594 17.3333C6.3342 15.9614 6.6253 14.605 7.18979 13.3546C7.75428 12.1042 8.57915 10.9887 9.60927 10.0827ZM23.7199 8.584C23.5205 8.4134 23.262 8.32805 23.0002 8.34635C22.7384 8.36466 22.4942 8.48515 22.3205 8.68183C22.1467 8.87852 22.0572 9.13563 22.0714 9.3977C22.0855 9.65977 22.2021 9.90578 22.3959 10.0827C23.4261 10.9887 24.2509 12.1042 24.8154 13.3546C25.3799 14.605 25.671 15.9614 25.6693 17.3333C25.6693 17.5985 25.7746 17.8529 25.9622 18.0404C26.1497 18.228 26.4041 18.3333 26.6693 18.3333C26.9345 18.3333 27.1888 18.228 27.3764 18.0404C27.5639 17.8529 27.6693 17.5985 27.6693 17.3333C27.671 15.678 27.3196 14.0413 26.6385 12.5326C25.9575 11.0238 24.9625 9.6777 23.7199 8.584ZM13.5853 26.696C13.4568 26.659 13.3222 26.6481 13.1894 26.664C13.0566 26.6799 12.9284 26.7223 12.8123 26.7886C12.6962 26.855 12.5946 26.9439 12.5135 27.0502C12.4323 27.1565 12.3734 27.278 12.34 27.4075C12.3067 27.537 12.2996 27.6718 12.3193 27.8041C12.339 27.9363 12.385 28.0633 12.4546 28.1775C12.5242 28.2916 12.616 28.3907 12.7245 28.4688C12.8331 28.5468 12.9562 28.6023 13.0866 28.632C14.9996 29.1228 17.0056 29.1228 18.9186 28.632C19.049 28.6023 19.1721 28.5468 19.2807 28.4688C19.3892 28.3907 19.481 28.2916 19.5506 28.1775C19.6202 28.0633 19.6662 27.9363 19.6859 27.8041C19.7056 27.6718 19.6986 27.537 19.6652 27.4075C19.6318 27.278 19.5729 27.1565 19.4917 27.0502C19.4106 26.9439 19.309 26.855 19.1929 26.7886C19.0768 26.7223 18.9486 26.6799 18.8158 26.664C18.683 26.6481 18.5484 26.659 18.4199 26.696C17.6301 26.8982 16.8179 27.0003 16.0026 27C15.1873 27.0003 14.3751 26.8982 13.5853 26.696Z" fill='var(--jakartasatu-orange)' />
                                                                        </svg>
                                                                        <Typography variant='p'
                                                                            sx={{
                                                                                color: 'var(--jakartasatu-biru)',
                                                                                // fontFamily: 'var(--font-family)',
                                                                                fontSize: "18px",
                                                                                fontWeight: "500",
                                                                                lineHeight: "150%",
                                                                                letterSpacing: "-0.342px",
                                                                                textTransform: "none",
                                                                                transition: 'color 0.3s ease',
                                                                            }}>
                                                                            Simpul Jaringan
                                                                        </Typography>
                                                                    </Stack>
                                                                </Button>
                                                            </Link>
                                                            <Link href="/kolaborasi/aplikasi">
                                                                <Button variant="text" disableElevation
                                                                    sx={{
                                                                        borderRadius: "30px",
                                                                        height: "42px",
                                                                        padding: "0 20px",
                                                                        transition: 'background 0.3s ease, transform 0.3s ease',
                                                                        '&:hover': {
                                                                            background: 'var(--jakartasatu-biru)',
                                                                            padding: "0 20px",
                                                                            // transform: 'scale(1.05)',
                                                                            '& .svg-icon path': {
                                                                                fill: 'white',
                                                                            },
                                                                            '& .MuiTypography-root': {
                                                                                color: 'white',
                                                                            },
                                                                        },
                                                                    }}>
                                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-3 -2 24 24" fill="none">
                                                                            <path d="M7.2 0H0.9C0.36 0 0 0.36 0 0.9V7.2C0 7.74 0.36 8.1 0.9 8.1H7.2C7.74 8.1 8.1 7.74 8.1 7.2V0.9C8.1 0.36 7.74 0 7.2 0ZM7.2 9.9H0.9C0.36 9.9 0 10.26 0 10.8V17.1C0 17.64 0.36 18 0.9 18H7.2C7.74 18 8.1 17.64 8.1 17.1V10.8C8.1 10.26 7.74 9.9 7.2 9.9ZM17.1 0H10.8C10.26 0 9.9 0.36 9.9 0.9V7.2C9.9 7.74 10.26 8.1 10.8 8.1H17.1C17.64 8.1 18 7.74 18 7.2V0.9C18 0.36 17.64 0 17.1 0ZM17.1 9.9H10.8C10.26 9.9 9.9 10.26 9.9 10.8V17.1C9.9 17.64 10.26 18 10.8 18H17.1C17.64 18 18 17.64 18 17.1V10.8C18 10.26 17.64 9.9 17.1 9.9Z" fill='var(--jakartasatu-orange)' />
                                                                        </svg>
                                                                        <Typography variant='p'
                                                                            sx={{
                                                                                color: 'var(--jakartasatu-biru)',
                                                                                // fontFamily: 'var(--font-family)',
                                                                                fontSize: "18px",
                                                                                fontWeight: "500",
                                                                                lineHeight: "150%",
                                                                                letterSpacing: "-0.342px",
                                                                                textTransform: "none",
                                                                                transition: 'color 0.3s ease',
                                                                            }}>
                                                                            Aplikasi
                                                                        </Typography>
                                                                    </Stack>
                                                                </Button>
                                                            </Link>
                                                            <Link href="/kolaborasi/urun-data">
                                                                <Button variant="text" disableElevation
                                                                    sx={{
                                                                        borderRadius: "30px",
                                                                        height: "42px",
                                                                        padding: "0 20px",
                                                                        transition: 'background 0.3s ease, transform 0.3s ease',
                                                                        '&:hover': {
                                                                            background: 'var(--jakartasatu-biru)',
                                                                            padding: "0 20px",
                                                                            // transform: 'scale(1.05)',
                                                                            '& .svg-icon path': {
                                                                                fill: 'var(--jakartasatu-biru)',
                                                                                stroke: 'white',
                                                                            },
                                                                            '& .MuiTypography-root': {
                                                                                color: 'white',
                                                                            },
                                                                        },
                                                                    }}>
                                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                        <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                                                            <path d="M22 5.5V19C22 20.657 17.523 22 12 22C6.477 22 2 20.657 2 19V5.5" stroke="var(--jakartasatu-orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M22 14.5C22 16.157 17.523 17.5 12 17.5C6.477 17.5 2 16.157 2 14.5M22 10C22 11.657 17.523 13 12 13C6.477 13 2 11.657 2 10" stroke="var(--jakartasatu-orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M12 8C17.5228 8 22 6.65685 22 5C22 3.34315 17.5228 2 12 2C6.47715 2 2 3.34315 2 5C2 6.65685 6.47715 8 12 8Z" fill="var(--jakartasatu-orange)" stroke="var(--jakartasatu-orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        <Typography variant='p'
                                                                            sx={{
                                                                                color: 'var(--jakartasatu-biru)',
                                                                                // fontFamily: 'var(--font-family)',
                                                                                fontSize: "18px",
                                                                                fontWeight: "500",
                                                                                lineHeight: "150%",
                                                                                letterSpacing: "-0.342px",
                                                                                textTransform: "none",
                                                                                transition: 'color 0.3s ease',
                                                                            }}>
                                                                            Urun Data
                                                                        </Typography>
                                                                    </Stack>
                                                                </Button>
                                                            </Link>
                                                        </Stack>
                                                    </Stack>
                                                ) : (
                                                    <Box>
                                                        <Stack direction="column" justifyContent="center" gap={1}>
                                                            <Typography variant='p'
                                                                sx={{
                                                                    textAlign: "center",
                                                                    color: 'var(--jakartasatu-biru)',
                                                                    // fontFamily: 'var(--font-family)',
                                                                    fontSize: "32px",
                                                                    fontWeight: "700",
                                                                    lineHeight: "150%",
                                                                    letterSpacing: "-0.608px",
                                                                }}>
                                                                Kolaborasi
                                                            </Typography>
                                                            <CustomImage
                                                                src="/assets/Gambar-skpd.png"
                                                                alt="Gambar"
                                                                draggable={false}
                                                                width={0}
                                                                height={0}
                                                                style={{
                                                                    userDrag: "none",
                                                                    userSelect: "none",

                                                                    width: "100%",
                                                                    maxWidth: '161.645px',
                                                                    height: 'auto',
                                                                    alignSelf: "center"
                                                                }}
                                                            />
                                                            <Box sx={{ width: "100%", maxWidth: "360px", display: "flex", alignSelf: "center" }}>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        textAlign: "center",
                                                                        color: "#000",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "16px",
                                                                        fontWeight: "400",
                                                                        lineHeight: "180%",
                                                                    }}>
                                                                    Mau lihat SKPD dan aplikasi yang terhubung dengan Jakarta Satu? yuk lihat disini
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                )}
                                            </>
                                        )}
                                </motion.div>
                            </motion.div>
                        </Grid>
                        <Grid xs={12} sm={12} md={4} lg={4} xl={4}
                            sx={{
                                order: { xs: 3, sm: 3 },

                                backgroundImage: `url('${basePath}/assets/partikel-informasi.png')`,
                                backgroundPosition: 'center',
                                backgroundRepeat: "no-repeat",
                                width: '376px',
                                marginTop: { xs: "0", md: "-170px" },
                                height: { xs: '400px', sm: "" },
                            }}>
                            <motion.div
                                variants={boxInformasi}
                                animate={isInformasiVisible ? { controlsShake2 } : "hidden"}
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.3 }
                                }}
                                onMouseEnter={() => setIsInformasiHovered(true)}
                                onMouseLeave={() => setIsInformasiHovered(false)}
                                style={{
                                    background: "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.89) 32.5%, rgba(255, 255, 255, 0.02) 100%)",

                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                <motion.div animate={controlsShake2} style={{ height: "100%", minHeight: "290px" }}>
                                    {isMobile768 ||
                                        isMobileiPadAirLandscape ||
                                        isMobileiPadAirPortrait ||
                                        isMobileiPadProPortrait ||
                                        isMobileiPadProLandscape
                                        ? (
                                            <>
                                                <Stack direction="column" justifyContent="center" gap={1}>
                                                    <Typography variant='p'
                                                        sx={{
                                                            textAlign: "center",
                                                            color: 'var(--jakartasatu-biru)',
                                                            // fontFamily: 'var(--font-family)',
                                                            fontSize: "32px",
                                                            fontWeight: "700",
                                                            lineHeight: "150%",
                                                            letterSpacing: "-0.608px",
                                                        }}>
                                                        Informasi
                                                    </Typography>
                                                    <CustomImage
                                                        src="/assets/Gambar-news.png"
                                                        alt="Gambar"
                                                        draggable={false}
                                                        width={0}
                                                        height={0}
                                                        style={{
                                                            userDrag: "none",
                                                            userSelect: "none",

                                                            margin: "10px 0",
                                                            width: '100%',
                                                            maxWidth: "113px",
                                                            height: 'auto',
                                                            alignSelf: "center"
                                                        }}
                                                    />
                                                    <Box sx={{ width: "100%", maxWidth: "320px", display: "flex", alignSelf: "center" }}>
                                                        <Typography variant='p'
                                                            sx={{
                                                                textAlign: "center",
                                                                color: "#000",
                                                                // fontFamily: 'var(--font-family)',
                                                                fontSize: "16px",
                                                                fontWeight: "400",
                                                                lineHeight: "180%",
                                                            }}>
                                                            Berita dan informasi terkait data spasial di Jakarta
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                                <Stack direction="column" justifyContent="center" alignItems="center" gap={1}>
                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                        <Link href="/informasi/berita">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 1 25 25" fill="none">
                                                                    <path d="M2.875 24.875C2.11875 24.875 1.47158 24.606 0.9335 24.0679C0.395417 23.5298 0.125917 22.8822 0.125 22.125V2.875C0.125 2.11875 0.3945 1.47158 0.9335 0.9335C1.4725 0.395417 2.11967 0.125917 2.875 0.125H18L24.875 7V22.125C24.875 22.8813 24.606 23.5289 24.0679 24.0679C23.5298 24.6069 22.8822 24.8759 22.125 24.875H2.875ZM2.875 22.125H22.125V8.375H16.625V2.875H2.875V22.125ZM5.625 19.375H19.375V16.625H5.625V19.375ZM5.625 8.375H12.5V5.625H5.625V8.375ZM5.625 13.875H19.375V11.125H5.625V13.875Z" fill="#FFF" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Berita
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                        {/* <Link href="/informasi/event">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-5 0 32 32" fill="none">
                                                                    <path d="M18 15.875H13.875C13.1187 15.875 12.5 16.4937 12.5 17.25V21.375C12.5 22.1312 13.1187 22.75 13.875 22.75H18C18.7563 22.75 19.375 22.1312 19.375 21.375V17.25C19.375 16.4937 18.7563 15.875 18 15.875ZM18 2.125V3.5H7V2.125C7 1.36875 6.38125 0.75 5.625 0.75C4.86875 0.75 4.25 1.36875 4.25 2.125V3.5H2.875C1.34875 3.5 0.13875 4.7375 0.13875 6.25L0.125 25.5C0.125 26.2293 0.414731 26.9288 0.930456 27.4445C1.44618 27.9603 2.14565 28.25 2.875 28.25H22.125C23.6375 28.25 24.875 27.0125 24.875 25.5V6.25C24.875 4.7375 23.6375 3.5 22.125 3.5H20.75V2.125C20.75 1.36875 20.1313 0.75 19.375 0.75C18.6187 0.75 18 1.36875 18 2.125ZM20.75 25.5H4.25C3.49375 25.5 2.875 24.8812 2.875 24.125V10.375H22.125V24.125C22.125 24.8812 21.5063 25.5 20.75 25.5Z" fill="#FFF" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Event
                                                                </Typography>
                                                            </Stack>
                                                        </Link> */}
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                        <Link href="/informasi/infografis">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-4 -2 32 32" fill="none">
                                                                    <path d="M25 4.33333C25 3.18406 24.5435 2.08186 23.7308 1.2692C22.9182 0.456546 21.816 0 20.6667 0H5.33337C4.1841 0 3.0819 0.456546 2.26924 1.2692C1.45659 2.08186 1.00004 3.18406 1.00004 4.33333V20.7107C1.00004 22.448 3.09337 23.3267 4.33337 22.108L9.70671 16.828L9.73337 16.8L12.3 14.2867L12.4107 14.192C12.6018 14.0528 12.836 13.9858 13.0718 14.0029C13.3076 14.02 13.5297 14.12 13.6987 14.2853L16.472 17.0013L17.8854 15.588L15.0987 12.8573L14.9267 12.7027C14.3561 12.224 13.6278 11.9747 12.8835 12.0033C12.1393 12.0319 11.4323 12.3363 10.9 12.8573L4.96404 18.6707H4.97737L3.00004 20.6133V4.33333C3.00004 3.04533 4.04537 2 5.33337 2H20.6667C21.956 2 23 3.04533 23 4.33333V10.976C23.64 10.7227 24.3254 10.6253 25 10.6827V4.33333ZM20.3387 7.66933C20.3387 6.8728 20.0223 6.10889 19.459 5.54566C18.8958 4.98242 18.1319 4.666 17.3354 4.666C16.5388 4.666 15.7749 4.98242 15.2117 5.54566C14.6485 6.10889 14.332 6.8728 14.332 7.66933C14.332 8.46587 14.6485 9.22978 15.2117 9.79301C15.7749 10.3562 16.5388 10.6727 17.3354 10.6727C18.1319 10.6727 18.8958 10.3562 19.459 9.79301C20.0223 9.22978 20.3387 8.46587 20.3387 7.66933ZM16.332 7.66933C16.332 7.40323 16.4377 7.14803 16.6259 6.95987C16.8141 6.77171 17.0693 6.666 17.3354 6.666C17.6015 6.666 17.8567 6.77171 18.0448 6.95987C18.233 7.14803 18.3387 7.40323 18.3387 7.66933C18.3387 7.93543 18.233 8.19064 18.0448 8.3788C17.8567 8.56696 17.6015 8.67267 17.3354 8.67267C17.0693 8.67267 16.8141 8.56696 16.6259 8.3788C16.4377 8.19064 16.332 7.93543 16.332 7.66933ZM14.596 20.7627L22.4654 12.8933C22.7483 12.6103 23.0843 12.3858 23.454 12.2325C23.8237 12.0793 24.22 12.0004 24.6202 12.0004C25.0205 12.0003 25.4168 12.0791 25.7865 12.2322C26.1563 12.3853 26.4923 12.6097 26.7754 12.8927C27.0584 13.1756 27.283 13.5116 27.4362 13.8813C27.5894 14.251 27.6683 14.6473 27.6683 15.0475C27.6684 15.4477 27.5896 15.8441 27.4365 16.2138C27.2834 16.5836 27.059 16.9196 26.776 17.2027L18.9054 25.072C18.4462 25.5303 17.8717 25.856 17.2427 26.0147L14.8027 26.624C14.736 26.6418 14.6694 26.6538 14.6027 26.66C13.816 26.932 10.6307 27.4253 9.50004 26.5427C8.73471 25.9453 8.8867 24.764 9.20937 24.1187C9.2627 24.0147 9.18271 23.8787 9.06937 23.8973C8.18937 24.0347 7.41204 24.4973 6.63337 24.9627C5.58937 25.5867 4.54004 26.2107 3.23471 26.0493C1.92937 25.888 1.27737 25.0813 0.954706 24.376C0.822706 24.088 1.19471 23.8413 1.47204 23.9933C2.09737 24.3333 2.94671 24.6547 3.64671 24.5C4.14671 24.388 4.85204 23.8893 5.64137 23.3307C7.06271 22.3267 8.75737 21.1267 10.0307 21.64C11.1507 22.0893 11.9774 23.1733 11.404 24.4573C11.3347 24.6147 11.404 24.8093 11.5734 24.848C12.1374 24.9773 12.6107 24.936 13.084 24.708L13.6547 22.4253C13.812 21.796 14.1374 21.2213 14.596 20.7627Z" fill="#FFF" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Infografis
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                        <Link href="/informasi/panduan-teknis">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-2 0 26 26" fill="none">
                                                                    <path d="M20.122 12.2784V21.5673H4.43312V5.87843H13.8809H13.9223L13.9516 5.84914L15.396 4.4047L15.5668 4.23398H15.3253H4.33312C3.9235 4.23398 3.53067 4.3967 3.24103 4.68634C2.95139 4.97598 2.78867 5.36882 2.78867 5.77843V21.6673C2.78867 22.0769 2.95139 22.4698 3.24103 22.7594C3.53067 23.049 3.9235 23.2118 4.33312 23.2118H20.222C20.6316 23.2118 21.0245 23.049 21.3141 22.7594C21.6037 22.4698 21.7664 22.0769 21.7664 21.6673V10.834V10.5926L21.5957 10.7633L20.1513 12.2077L20.122 12.237V12.2784Z" fill="#FFF" stroke="#FFF" strokeWidth="0.2" />
                                                                    <path d="M20.0295 1.67718L20.0293 1.67735L10.1277 11.6368L10.0975 11.6671L10.0879 11.7088L9.28622 15.1827L9.28617 15.1827L9.28537 15.1866C9.24682 15.3767 9.25087 15.573 9.29724 15.7614C9.34362 15.9498 9.43116 16.1255 9.55358 16.276C9.67599 16.4265 9.83023 16.548 10.0052 16.6317C10.1778 16.7143 10.3664 16.7582 10.5577 16.7603C10.6548 16.7703 10.7527 16.7701 10.8498 16.7594L10.8579 16.7586L10.8658 16.7568L14.3686 15.984L14.4117 15.9745L14.4428 15.9431L24.3222 5.96987C24.3223 5.96976 24.3224 5.96966 24.3225 5.96956C24.4446 5.84767 24.5416 5.7029 24.6077 5.54353C24.6739 5.38402 24.708 5.21302 24.708 5.04032C24.708 4.86763 24.6739 4.69662 24.6077 4.53712C24.5415 4.37761 24.4445 4.23273 24.3222 4.11078L21.8886 1.67718C21.7666 1.5549 21.6218 1.45788 21.4623 1.39168C21.3027 1.32548 21.1317 1.29141 20.959 1.29141C20.7863 1.29141 20.6153 1.32548 20.4558 1.39168C20.2963 1.45788 20.1515 1.5549 20.0295 1.67718ZM20.8339 6.99785L13.5098 14.3645L11.1422 14.8885L11.6921 12.5403L19.0094 5.17337L20.8339 6.99785ZM22.7832 5.05443L21.8622 5.96964L20.0363 4.14376L20.9456 3.21681L22.7832 5.05443Z" fill="#FFF" stroke="#FFF" strokeWidth="0.3" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Panduan Teknis
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                    </Stack>
                                                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                        <Link href="/informasi/publikasi">
                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}
                                                                sx={{
                                                                    background: 'var(--jakartasatu-orange)',
                                                                    borderRadius: "30px",
                                                                    padding: "0 20px",
                                                                    height: "42px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-3 0 27 27" fill="none">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.4062 11.8135C19.4062 12.8107 19.2098 13.7981 18.8282 14.7195C18.4466 15.6408 17.8872 16.4779 17.1821 17.183C16.4769 17.8882 15.6398 18.4475 14.7185 18.8292C13.7972 19.2108 12.8097 19.4072 11.8125 19.4072C10.8153 19.4072 9.82779 19.2108 8.90648 18.8292C7.98516 18.4475 7.14803 17.8882 6.44289 17.183C5.73774 16.4779 5.17839 15.6408 4.79677 14.7195C4.41515 13.7981 4.21873 12.8107 4.21873 11.8135C4.21873 9.79947 5.01878 7.86797 6.44289 6.44386C7.86699 5.01976 9.79849 4.21971 11.8125 4.21971C13.8265 4.21971 15.758 5.01976 17.1821 6.44386C18.6062 7.86797 19.4062 9.79947 19.4062 11.8135ZM18.0225 19.8122C15.988 21.3917 13.428 22.1364 10.8638 21.8948C8.2995 21.6532 5.92369 20.4435 4.21999 18.5118C2.5163 16.5802 1.61281 14.0718 1.69344 11.4975C1.77408 8.92311 2.83278 6.47624 4.65403 4.655C6.47527 2.83376 8.92213 1.77506 11.4965 1.69442C14.0709 1.61379 16.5792 2.51728 18.5108 4.22097C20.4425 5.92466 21.6523 8.30047 21.8938 10.8647C22.1354 13.429 21.3907 15.989 19.8112 18.0235L24.5194 22.7316C24.6437 22.8475 24.7434 22.9872 24.8126 23.1424C24.8818 23.2977 24.919 23.4653 24.922 23.6352C24.925 23.8051 24.8937 23.9739 24.8301 24.1315C24.7664 24.2891 24.6717 24.4323 24.5515 24.5525C24.4313 24.6726 24.2881 24.7674 24.1306 24.831C23.973 24.8947 23.8042 24.926 23.6342 24.923C23.4643 24.92 23.2967 24.8828 23.1414 24.8136C22.9862 24.7444 22.8465 24.6447 22.7306 24.5203L18.0225 19.8122Z" fill="#FFF" />
                                                                </svg>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        color: "#FFF",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "80%",
                                                                        fontWeight: "500",
                                                                        lineHeight: "150%",
                                                                        letterSpacing: "-0.342px",
                                                                    }}>
                                                                    Riset & Publikasi
                                                                </Typography>
                                                            </Stack>
                                                        </Link>
                                                    </Stack>
                                                </Stack>
                                            </>
                                        ) : (
                                            <>
                                                {isInformasiHovered ? (
                                                    <Stack direction="column" justifyContent="center" alignItems="center" gap={2}
                                                        sx={{
                                                            // margin: "25px",
                                                            // height: "100%",
                                                            width: "375px",
                                                            padding: "35px 0",
                                                            // margin: "35px 0",
                                                            borderRadius: "8px",
                                                            // background: "white",
                                                            // boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                                                        }}>
                                                        <Typography variant='p'
                                                            sx={{
                                                                textAlign: "center",
                                                                color: 'var(--jakartasatu-biru)',
                                                                // fontFamily: 'var(--font-family)',
                                                                fontSize: "32px",
                                                                fontWeight: "700",
                                                                lineHeight: "150%",
                                                                letterSpacing: "-0.608px",
                                                            }}>
                                                            Informasi
                                                        </Typography>
                                                        <Stack direction="row" justifyContent="center" alignItems="flex-start" gap={1}>
                                                            <Stack direction="column" justifyContent="center" alignItems="flex-start" gap={1}>
                                                                <Link href="/informasi/berita">
                                                                    <Button variant="text" disableElevation
                                                                        sx={{
                                                                            borderRadius: "30px",
                                                                            height: "42px",
                                                                            padding: "0 20px",
                                                                            transition: 'background 0.3s ease, transform 0.3s ease',
                                                                            '&:hover': {
                                                                                background: 'var(--jakartasatu-biru)',
                                                                                padding: "0 20px",
                                                                                // transform: 'scale(1.05)',
                                                                                '& .svg-icon path': {
                                                                                    fill: 'white',
                                                                                },
                                                                                '& .MuiTypography-root': {
                                                                                    color: 'white',
                                                                                },
                                                                            },
                                                                        }}>
                                                                        <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                            <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-4 -3 32 32" fill="none">
                                                                                <path d="M2.875 24.875C2.11875 24.875 1.47158 24.606 0.9335 24.0679C0.395417 23.5298 0.125917 22.8822 0.125 22.125V2.875C0.125 2.11875 0.3945 1.47158 0.9335 0.9335C1.4725 0.395417 2.11967 0.125917 2.875 0.125H18L24.875 7V22.125C24.875 22.8813 24.606 23.5289 24.0679 24.0679C23.5298 24.6069 22.8822 24.8759 22.125 24.875H2.875ZM2.875 22.125H22.125V8.375H16.625V2.875H2.875V22.125ZM5.625 19.375H19.375V16.625H5.625V19.375ZM5.625 8.375H12.5V5.625H5.625V8.375ZM5.625 13.875H19.375V11.125H5.625V13.875Z" fill='var(--jakartasatu-orange)' />
                                                                            </svg>
                                                                            <Typography variant='p'
                                                                                sx={{
                                                                                    color: 'var(--jakartasatu-biru)',
                                                                                    // fontFamily: 'var(--font-family)',
                                                                                    fontSize: "18px",
                                                                                    fontWeight: "500",
                                                                                    lineHeight: "150%",
                                                                                    letterSpacing: "-0.342px",
                                                                                    textTransform: "none",
                                                                                    transition: 'color 0.3s ease',
                                                                                }}>
                                                                                Berita
                                                                            </Typography>
                                                                        </Stack>
                                                                    </Button>
                                                                </Link>
                                                                {/* <Link href="/informasi/event">
                                                                    <Button variant="text" disableElevation
                                                                        sx={{
                                                                            borderRadius: "30px",
                                                                            height: "42px",
                                                                            padding: "0 20px",
                                                                            transition: 'background 0.3s ease, transform 0.3s ease',
                                                                            '&:hover': {
                                                                                background: 'var(--jakartasatu-biru)',
                                                                                padding: "0 20px",
                                                                                // transform: 'scale(1.05)',
                                                                                '& .svg-icon path': {
                                                                                    fill: 'white',
                                                                                },
                                                                                '& .MuiTypography-root': {
                                                                                    color: 'white',
                                                                                },
                                                                            },
                                                                        }}>
                                                                        <div style={{ margin: "23px 0" }}>
                                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                                <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-5 0 32 32" fill="none">
                                                                                    <path d="M18 15.875H13.875C13.1187 15.875 12.5 16.4937 12.5 17.25V21.375C12.5 22.1312 13.1187 22.75 13.875 22.75H18C18.7563 22.75 19.375 22.1312 19.375 21.375V17.25C19.375 16.4937 18.7563 15.875 18 15.875ZM18 2.125V3.5H7V2.125C7 1.36875 6.38125 0.75 5.625 0.75C4.86875 0.75 4.25 1.36875 4.25 2.125V3.5H2.875C1.34875 3.5 0.13875 4.7375 0.13875 6.25L0.125 25.5C0.125 26.2293 0.414731 26.9288 0.930456 27.4445C1.44618 27.9603 2.14565 28.25 2.875 28.25H22.125C23.6375 28.25 24.875 27.0125 24.875 25.5V6.25C24.875 4.7375 23.6375 3.5 22.125 3.5H20.75V2.125C20.75 1.36875 20.1313 0.75 19.375 0.75C18.6187 0.75 18 1.36875 18 2.125ZM20.75 25.5H4.25C3.49375 25.5 2.875 24.8812 2.875 24.125V10.375H22.125V24.125C22.125 24.8812 21.5063 25.5 20.75 25.5Z" fill="var(--jakartasatu-orange)" />
                                                                                </svg>
                                                                                <Typography variant='p'
                                                                                    sx={{
                                                                                        color: 'var(--jakartasatu-biru)',
                                                                                        // fontFamily: 'var(--font-family)',
                                                                                        fontSize: "18px",
                                                                                        fontWeight: "500",
                                                                                        lineHeight: "150%",
                                                                                        letterSpacing: "-0.342px",
                                                                                        textTransform: "none",
                                                                                        transition: 'color 0.3s ease',
                                                                                    }}>
                                                                                    Event
                                                                                </Typography>
                                                                            </Stack>
                                                                        </div>
                                                                    </Button>
                                                                </Link> */}
                                                                <Link href="/informasi/infografis">
                                                                    <Button variant="text" disableElevation
                                                                        sx={{
                                                                            borderRadius: "30px",
                                                                            height: "42px",
                                                                            padding: "0 20px",
                                                                            transition: 'background 0.3s ease, transform 0.3s ease',
                                                                            '&:hover': {
                                                                                background: 'var(--jakartasatu-biru)',
                                                                                padding: "0 20px",
                                                                                // transform: 'scale(1.05)',
                                                                                '& .svg-icon path': {
                                                                                    fill: 'white',
                                                                                },
                                                                                '& .MuiTypography-root': {
                                                                                    color: 'white',
                                                                                },
                                                                            },
                                                                        }}>
                                                                        <div style={{ margin: "23px 0" }}>
                                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                                <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-4 -1 32 32" fill="none">
                                                                                    <path d="M25 4.33333C25 3.18406 24.5435 2.08186 23.7308 1.2692C22.9182 0.456546 21.816 0 20.6667 0H5.33337C4.1841 0 3.0819 0.456546 2.26924 1.2692C1.45659 2.08186 1.00004 3.18406 1.00004 4.33333V20.7107C1.00004 22.448 3.09337 23.3267 4.33337 22.108L9.70671 16.828L9.73337 16.8L12.3 14.2867L12.4107 14.192C12.6018 14.0528 12.836 13.9858 13.0718 14.0029C13.3076 14.02 13.5297 14.12 13.6987 14.2853L16.472 17.0013L17.8854 15.588L15.0987 12.8573L14.9267 12.7027C14.3561 12.224 13.6278 11.9747 12.8835 12.0033C12.1393 12.0319 11.4323 12.3363 10.9 12.8573L4.96404 18.6707H4.97737L3.00004 20.6133V4.33333C3.00004 3.04533 4.04537 2 5.33337 2H20.6667C21.956 2 23 3.04533 23 4.33333V10.976C23.64 10.7227 24.3254 10.6253 25 10.6827V4.33333ZM20.3387 7.66933C20.3387 6.8728 20.0223 6.10889 19.459 5.54566C18.8958 4.98242 18.1319 4.666 17.3354 4.666C16.5388 4.666 15.7749 4.98242 15.2117 5.54566C14.6485 6.10889 14.332 6.8728 14.332 7.66933C14.332 8.46587 14.6485 9.22978 15.2117 9.79301C15.7749 10.3562 16.5388 10.6727 17.3354 10.6727C18.1319 10.6727 18.8958 10.3562 19.459 9.79301C20.0223 9.22978 20.3387 8.46587 20.3387 7.66933ZM16.332 7.66933C16.332 7.40323 16.4377 7.14803 16.6259 6.95987C16.8141 6.77171 17.0693 6.666 17.3354 6.666C17.6015 6.666 17.8567 6.77171 18.0448 6.95987C18.233 7.14803 18.3387 7.40323 18.3387 7.66933C18.3387 7.93543 18.233 8.19064 18.0448 8.3788C17.8567 8.56696 17.6015 8.67267 17.3354 8.67267C17.0693 8.67267 16.8141 8.56696 16.6259 8.3788C16.4377 8.19064 16.332 7.93543 16.332 7.66933ZM14.596 20.7627L22.4654 12.8933C22.7483 12.6103 23.0843 12.3858 23.454 12.2325C23.8237 12.0793 24.22 12.0004 24.6202 12.0004C25.0205 12.0003 25.4168 12.0791 25.7865 12.2322C26.1563 12.3853 26.4923 12.6097 26.7754 12.8927C27.0584 13.1756 27.283 13.5116 27.4362 13.8813C27.5894 14.251 27.6683 14.6473 27.6683 15.0475C27.6684 15.4477 27.5896 15.8441 27.4365 16.2138C27.2834 16.5836 27.059 16.9196 26.776 17.2027L18.9054 25.072C18.4462 25.5303 17.8717 25.856 17.2427 26.0147L14.8027 26.624C14.736 26.6418 14.6694 26.6538 14.6027 26.66C13.816 26.932 10.6307 27.4253 9.50004 26.5427C8.73471 25.9453 8.8867 24.764 9.20937 24.1187C9.2627 24.0147 9.18271 23.8787 9.06937 23.8973C8.18937 24.0347 7.41204 24.4973 6.63337 24.9627C5.58937 25.5867 4.54004 26.2107 3.23471 26.0493C1.92937 25.888 1.27737 25.0813 0.954706 24.376C0.822706 24.088 1.19471 23.8413 1.47204 23.9933C2.09737 24.3333 2.94671 24.6547 3.64671 24.5C4.14671 24.388 4.85204 23.8893 5.64137 23.3307C7.06271 22.3267 8.75737 21.1267 10.0307 21.64C11.1507 22.0893 11.9774 23.1733 11.404 24.4573C11.3347 24.6147 11.404 24.8093 11.5734 24.848C12.1374 24.9773 12.6107 24.936 13.084 24.708L13.6547 22.4253C13.812 21.796 14.1374 21.2213 14.596 20.7627Z" fill="var(--jakartasatu-orange)" />
                                                                                </svg>
                                                                                <Typography variant='p'
                                                                                    sx={{
                                                                                        color: 'var(--jakartasatu-biru)',
                                                                                        // fontFamily: 'var(--font-family)',
                                                                                        fontSize: "18px",
                                                                                        fontWeight: "500",
                                                                                        lineHeight: "150%",
                                                                                        letterSpacing: "-0.342px",
                                                                                        textTransform: "none",
                                                                                        transition: 'color 0.3s ease',
                                                                                    }}>
                                                                                    Infografis
                                                                                </Typography>
                                                                            </Stack>
                                                                        </div>
                                                                    </Button>
                                                                </Link>
                                                                <Link href="/informasi/panduan-teknis">
                                                                    <Button variant="text" disableElevation
                                                                        sx={{
                                                                            borderRadius: "30px",
                                                                            height: "42px",
                                                                            padding: "0 20px",
                                                                            transition: 'background 0.3s ease, transform 0.3s ease',
                                                                            '&:hover': {
                                                                                background: 'var(--jakartasatu-biru)',
                                                                                padding: "0 20px",
                                                                                // transform: 'scale(1.05)',
                                                                                '& .svg-icon path': {
                                                                                    fill: 'white',
                                                                                },
                                                                                '& .MuiTypography-root': {
                                                                                    color: 'white',
                                                                                },
                                                                            },
                                                                        }}>
                                                                        <div style={{ margin: "23px 0" }}>
                                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                                <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-2 0 26 26" fill="none">
                                                                                    <path d="M20.122 12.2784V21.5673H4.43312V5.87843H13.8809H13.9223L13.9516 5.84914L15.396 4.4047L15.5668 4.23398H15.3253H4.33312C3.9235 4.23398 3.53067 4.3967 3.24103 4.68634C2.95139 4.97598 2.78867 5.36882 2.78867 5.77843V21.6673C2.78867 22.0769 2.95139 22.4698 3.24103 22.7594C3.53067 23.049 3.9235 23.2118 4.33312 23.2118H20.222C20.6316 23.2118 21.0245 23.049 21.3141 22.7594C21.6037 22.4698 21.7664 22.0769 21.7664 21.6673V10.834V10.5926L21.5957 10.7633L20.1513 12.2077L20.122 12.237V12.2784Z" fill="var(--jakartasatu-orange)" stroke="var(--jakartasatu-orange)" strokeWidth="0.2" />
                                                                                    <path d="M20.0295 1.67718L20.0293 1.67735L10.1277 11.6368L10.0975 11.6671L10.0879 11.7088L9.28622 15.1827L9.28617 15.1827L9.28537 15.1866C9.24682 15.3767 9.25087 15.573 9.29724 15.7614C9.34362 15.9498 9.43116 16.1255 9.55358 16.276C9.67599 16.4265 9.83023 16.548 10.0052 16.6317C10.1778 16.7143 10.3664 16.7582 10.5577 16.7603C10.6548 16.7703 10.7527 16.7701 10.8498 16.7594L10.8579 16.7586L10.8658 16.7568L14.3686 15.984L14.4117 15.9745L14.4428 15.9431L24.3222 5.96987C24.3223 5.96976 24.3224 5.96966 24.3225 5.96956C24.4446 5.84767 24.5416 5.7029 24.6077 5.54353C24.6739 5.38402 24.708 5.21302 24.708 5.04032C24.708 4.86763 24.6739 4.69662 24.6077 4.53712C24.5415 4.37761 24.4445 4.23273 24.3222 4.11078L21.8886 1.67718C21.7666 1.5549 21.6218 1.45788 21.4623 1.39168C21.3027 1.32548 21.1317 1.29141 20.959 1.29141C20.7863 1.29141 20.6153 1.32548 20.4558 1.39168C20.2963 1.45788 20.1515 1.5549 20.0295 1.67718ZM20.8339 6.99785L13.5098 14.3645L11.1422 14.8885L11.6921 12.5403L19.0094 5.17337L20.8339 6.99785ZM22.7832 5.05443L21.8622 5.96964L20.0363 4.14376L20.9456 3.21681L22.7832 5.05443Z" fill="var(--jakartasatu-orange)" stroke="var(--jakartasatu-orange)" strokeWidth="0.3" />
                                                                                </svg>
                                                                                <Typography variant='p'
                                                                                    sx={{
                                                                                        color: 'var(--jakartasatu-biru)',
                                                                                        // fontFamily: 'var(--font-family)',
                                                                                        fontSize: "18px",
                                                                                        fontWeight: "500",
                                                                                        lineHeight: "150%",
                                                                                        letterSpacing: "-0.342px",
                                                                                        textTransform: "none",
                                                                                        transition: 'color 0.3s ease',
                                                                                    }}>
                                                                                    Panduan Teknis
                                                                                </Typography>
                                                                            </Stack>
                                                                        </div>
                                                                    </Button>
                                                                </Link>
                                                                <Link href="/informasi/publikasi">
                                                                    <Button variant="text" disableElevation
                                                                        sx={{
                                                                            borderRadius: "30px",
                                                                            height: "42px",
                                                                            padding: "0 20px",
                                                                            transition: 'background 0.3s ease, transform 0.3s ease',
                                                                            '&:hover': {
                                                                                background: 'var(--jakartasatu-biru)',
                                                                                padding: "0 20px",
                                                                                // transform: 'scale(1.05)',
                                                                                '& .svg-icon path': {
                                                                                    fill: 'white',
                                                                                },
                                                                                '& .MuiTypography-root': {
                                                                                    color: 'white',
                                                                                },
                                                                            },
                                                                        }}>
                                                                        <div style={{ margin: "23px 0" }}>
                                                                            <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                                                                                <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-3 0 27 27" fill="none">
                                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.4062 11.8135C19.4062 12.8107 19.2098 13.7981 18.8282 14.7195C18.4466 15.6408 17.8872 16.4779 17.1821 17.183C16.4769 17.8882 15.6398 18.4475 14.7185 18.8292C13.7972 19.2108 12.8097 19.4072 11.8125 19.4072C10.8153 19.4072 9.82779 19.2108 8.90648 18.8292C7.98516 18.4475 7.14803 17.8882 6.44289 17.183C5.73774 16.4779 5.17839 15.6408 4.79677 14.7195C4.41515 13.7981 4.21873 12.8107 4.21873 11.8135C4.21873 9.79947 5.01878 7.86797 6.44289 6.44386C7.86699 5.01976 9.79849 4.21971 11.8125 4.21971C13.8265 4.21971 15.758 5.01976 17.1821 6.44386C18.6062 7.86797 19.4062 9.79947 19.4062 11.8135ZM18.0225 19.8122C15.988 21.3917 13.428 22.1364 10.8638 21.8948C8.2995 21.6532 5.92369 20.4435 4.21999 18.5118C2.5163 16.5802 1.61281 14.0718 1.69344 11.4975C1.77408 8.92311 2.83278 6.47624 4.65403 4.655C6.47527 2.83376 8.92213 1.77506 11.4965 1.69442C14.0709 1.61379 16.5792 2.51728 18.5108 4.22097C20.4425 5.92466 21.6523 8.30047 21.8938 10.8647C22.1354 13.429 21.3907 15.989 19.8112 18.0235L24.5194 22.7316C24.6437 22.8475 24.7434 22.9872 24.8126 23.1424C24.8818 23.2977 24.919 23.4653 24.922 23.6352C24.925 23.8051 24.8937 23.9739 24.8301 24.1315C24.7664 24.2891 24.6717 24.4323 24.5515 24.5525C24.4313 24.6726 24.2881 24.7674 24.1306 24.831C23.973 24.8947 23.8042 24.926 23.6342 24.923C23.4643 24.92 23.2967 24.8828 23.1414 24.8136C22.9862 24.7444 22.8465 24.6447 22.7306 24.5203L18.0225 19.8122Z" fill="var(--jakartasatu-orange)" />
                                                                                </svg>
                                                                                <Typography variant='p'
                                                                                    sx={{
                                                                                        color: 'var(--jakartasatu-biru)',
                                                                                        // fontFamily: 'var(--font-family)',
                                                                                        fontSize: "18px",
                                                                                        fontWeight: "500",
                                                                                        lineHeight: "150%",
                                                                                        letterSpacing: "-0.342px",
                                                                                        textTransform: "none",
                                                                                        transition: 'color 0.3s ease',
                                                                                    }}>
                                                                                    Riset & Publikasi
                                                                                </Typography>
                                                                            </Stack>
                                                                        </div>
                                                                    </Button>
                                                                </Link>
                                                            </Stack>
                                                        </Stack>
                                                    </Stack>
                                                ) : (
                                                    <Box>
                                                        <Stack direction="column" justifyContent="center" gap={1}>
                                                            <Typography variant='p'
                                                                sx={{
                                                                    textAlign: "center",
                                                                    color: 'var(--jakartasatu-biru)',
                                                                    // fontFamily: 'var(--font-family)',
                                                                    fontSize: "32px",
                                                                    fontWeight: "700",
                                                                    lineHeight: "150%",
                                                                    letterSpacing: "-0.608px",
                                                                }}>
                                                                Informasi
                                                            </Typography>
                                                            <CustomImage
                                                                src="/assets/Gambar-news.png"
                                                                alt="Gambar"
                                                                draggable={false}
                                                                width={0}
                                                                height={0}
                                                                style={{
                                                                    userDrag: "none",
                                                                    userSelect: "none",

                                                                    margin: "10px 0",
                                                                    width: '100%',
                                                                    maxWidth: "113px",
                                                                    height: 'auto',
                                                                    alignSelf: "center"
                                                                }}
                                                            />
                                                            <Box sx={{ width: "100%", maxWidth: "320px", display: "flex", alignSelf: "center" }}>
                                                                <Typography variant='p'
                                                                    sx={{
                                                                        textAlign: "center",
                                                                        color: "#000",
                                                                        // fontFamily: 'var(--font-family)',
                                                                        fontSize: "16px",
                                                                        fontWeight: "400",
                                                                        lineHeight: "180%",
                                                                    }}>
                                                                    Berita dan informasi terkait data spasial di Jakarta
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                )}
                                            </>
                                        )}
                                </motion.div>
                            </motion.div>
                        </Grid>
                    </Grid>
                </section>
            </motion.div >
        </>
    );
}

export default homeRedesign;