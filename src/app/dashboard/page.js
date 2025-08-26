"use client"

import styles from "../../components/page.module.css";
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ScrollTop from '../../components/scrollTop';

import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Divider, Grid, OutlinedInput, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import axios from "axios";

function dashboard() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));

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
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/dashboard%20banjir.JPG?v=1689646656901',
            title: 'Dashboard Informasi Banjir',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/fe8904525a9643899dd11f7d6d466205',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/ASET.png?v=1689646656902',
            title: 'Dashboard Aset',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=4dd993e2fbd04e61833f9959076cae67',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/JAKWIFI.png?v=1689646656904',
            title: 'Dashboard Persebaran Lokasi JakWifi',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=86d4cba95ba84a039a97e06147ec2bd0',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/HALTE.png?v=1689646656906',
            title: 'Dashboard Persebaran Lokasi Halte',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=9fb4c02f04fb4a99b5d58643bde8e0dd',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/SEKOLAH.png?v=1689646656908',
            title: 'Dashborad Lokasi Sekolah',
            link: 'https://experience.arcgis.com/experience/adb1a489b43944b58cef51f08b012177',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/UTILITAS.png?v=1689646656909',
            title: 'Dashboard Persebaran Utilitas',
            link: 'https://tataruang.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=451c316b69994bdaa7094a9884f673f4',
        },
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
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/dashboard%20banjir.JPG?v=1689646656901',
            title: 'Dashboard Informasi Banjir',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/fe8904525a9643899dd11f7d6d466205',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/ASET.png?v=1689646656902',
            title: 'Dashboard Aset',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=4dd993e2fbd04e61833f9959076cae67',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/JAKWIFI.png?v=1689646656904',
            title: 'Dashboard Persebaran Lokasi JakWifi',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=86d4cba95ba84a039a97e06147ec2bd0',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/HALTE.png?v=1689646656906',
            title: 'Dashboard Persebaran Lokasi Halte',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=9fb4c02f04fb4a99b5d58643bde8e0dd',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/SEKOLAH.png?v=1689646656908',
            title: 'Dashborad Lokasi Sekolah',
            link: 'https://experience.arcgis.com/experience/adb1a489b43944b58cef51f08b012177',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/UTILITAS.png?v=1689646656909',
            title: 'Dashboard Persebaran Utilitas',
            link: 'https://tataruang.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=451c316b69994bdaa7094a9884f673f4',
        },
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
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/dashboard%20banjir.JPG?v=1689646656901',
            title: 'Dashboard Informasi Banjir',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/fe8904525a9643899dd11f7d6d466205',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/ASET.png?v=1689646656902',
            title: 'Dashboard Aset',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=4dd993e2fbd04e61833f9959076cae67',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/JAKWIFI.png?v=1689646656904',
            title: 'Dashboard Persebaran Lokasi JakWifi',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=86d4cba95ba84a039a97e06147ec2bd0',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/HALTE.png?v=1689646656906',
            title: 'Dashboard Persebaran Lokasi Halte',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=9fb4c02f04fb4a99b5d58643bde8e0dd',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/SEKOLAH.png?v=1689646656908',
            title: 'Dashborad Lokasi Sekolah',
            link: 'https://experience.arcgis.com/experience/adb1a489b43944b58cef51f08b012177',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/UTILITAS.png?v=1689646656909',
            title: 'Dashboard Persebaran Utilitas',
            link: 'https://tataruang.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=451c316b69994bdaa7094a9884f673f4',
        },
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
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/dashboard%20banjir.JPG?v=1689646656901',
            title: 'Dashboard Informasi Banjir',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/opsdashboard/index.html#/fe8904525a9643899dd11f7d6d466205',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/ASET.png?v=1689646656902',
            title: 'Dashboard Aset',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=4dd993e2fbd04e61833f9959076cae67',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/JAKWIFI.png?v=1689646656904',
            title: 'Dashboard Persebaran Lokasi JakWifi',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=86d4cba95ba84a039a97e06147ec2bd0',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/HALTE.png?v=1689646656906',
            title: 'Dashboard Persebaran Lokasi Halte',
            link: 'https://jakartasatu.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=9fb4c02f04fb4a99b5d58643bde8e0dd',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/SEKOLAH.png?v=1689646656908',
            title: 'Dashborad Lokasi Sekolah',
            link: 'https://experience.arcgis.com/experience/adb1a489b43944b58cef51f08b012177',
        },
        {
            image: 'https://jakartasatu.jakarta.go.id/portal//sharing/rest/content/items/b66e4854a5014fc3833c9dafc8ff306c/resources/UTILITAS.png?v=1689646656909',
            title: 'Dashboard Persebaran Utilitas',
            link: 'https://tataruang.jakarta.go.id/portal/apps/experiencebuilder/experience/?id=451c316b69994bdaa7094a9884f673f4',
        },
    ];

    useEffect(() => {
        document.title = "Dashboard | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

    return (
        <>
            <main className={styles.main}>
                <Navbar />
                <div className={styles.container}
                    style={{
                        paddingTop: "100px",
                        textAlign: "center",
                    }}>
                    <Button id="btnRouteBackSKPD" onClick={() => router.back()}
                        sx={{ position: "absolute", marginTop: "50px", marginLeft: "-1300px" }}>
                        <ArrowBackRoundedIcon style={{ color: "black" }} />
                    </Button>
                    <section id="top5skpd" style={{ paddingTop: "50px", paddingBottom: isMobile ? "75px" : "150px", margin: "auto" }}>
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
                            Top 3 Dashboard
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
                        <Box
                            sx={{
                                alignItems: "baseline",
                                maxWidth: isMobile ? "99vw" : "1300px",
                                // columnGap: "25px",
                                mt: 6,
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    md: '1fr 1fr 1fr'
                                },
                            }}>
                            {datas.slice(0, 3).map((dashboard, i) => (
                                <Card key={i} elevation={0}
                                    sx={{
                                        background: "none",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                    <CardActionArea id="btnDashboardTop3" href={dashboard.link} target='_blank' disableRipple
                                        sx={{
                                            padding: "10px",
                                            borderRadius: "25px",
                                            height: "100%",

                                            "&:hover": {
                                                // border: "1px solid #DFE6E9",
                                                // backgroundColor: "white",
                                            },
                                        }}>
                                        <CardMedia component='div' sx={{ textAlign: 'center' }}>
                                            <img
                                                alt=""
                                                src={dashboard.image}
                                                style={{
                                                    width: "auto",
                                                    maxWidth: "100%",
                                                    maxHeight: isMobile ? "120px" : '161px',
                                                    alignSelf: 'center'
                                                }}
                                            />
                                        </CardMedia>
                                        <CardContent
                                            sx={{
                                                // maxWidth: "100%",
                                                // display: "flex",
                                                textAlign: "center",
                                                alignItems: 'center',
                                            }}>
                                            <Typography variant="p" paragraph sx={{
                                                color: "rgba(0, 0, 0, 0.90)",
                                                fontSize: isMobile ? "14px" : "18px",
                                                fontWeight: 500,
                                                lineHeight: "171.3%",
                                                letterSpacing: "0.027px",
                                                mb: 1,
                                            }}>{dashboard.title}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Box>
                    </section>
                    <section id="allDashboard" style={{ maxWidth: isMobile ? "97vw" : "1230px" }}>
                        <Stack
                            direction={isMobile ? "column" : "row"}
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={isMobile ? 3 : 6}
                            sx={{ width: isMobile ? "97vw" : "1230px", maxWidth: "1230px", marginBottom: isMobile ? "20px" : "80px" }}>
                            <div>
                                <Typography variant="p"
                                    style={{
                                        color: 'var(--jakartasatu-biru)',
                                        textAlign: "center",
                                        fontSize: "36px",
                                        fontWeight: "800",
                                    }}>
                                    Semua Peta & Dashboard
                                </Typography>
                                <Divider
                                    style={{
                                        backgroundColor: 'var(--jakartasatu-biru)',
                                        height: 5,
                                        width: '113px',
                                        borderRadius: '4px',
                                        margin: isMobile ? "15px auto" : "18px 0 0 0"
                                    }}
                                />
                            </div>
                            <OutlinedInput
                                type="search"
                                placeholder="Cari..."
                                sx={{
                                    fontFamily: 'var(--font-family)',
                                    width: isMobile ? '90vw' : '342px',
                                    height: '49px',
                                    paddingLeft: '1%',
                                    borderRadius: '40px',
                                    background: 'white',
                                    border: "2px solid rgba(0, 69, 129, 0.30)",
                                    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
                                }}
                            />
                        </Stack>
                        <Grid container
                            justifyContent="center"
                            alignItems="flex-start">
                            {datas.map((dashboard, i) => (
                                <Grid key={i} item xs={4} sm={3} md={3} lg={3} xl={3}>
                                    <Card key={i} elevation={0} sx={{ background: "none", height: "100%" }}>
                                        <CardActionArea id="btnDashboardDetailDashboard" href={dashboard.link} target='_blank' disableRipple
                                            sx={{
                                                padding: isMobile ? "0" : "10px",
                                                borderRadius: "25px",
                                                height: "100%",

                                                "&:hover": {
                                                    // border: "1px solid #DFE6E9",
                                                    // backgroundColor: "white",
                                                },
                                            }}>
                                            <CardMedia component='div' sx={{ textAlign: 'center' }}>
                                                <img
                                                    alt=""
                                                    src={dashboard.image}
                                                    style={{
                                                        maxWidth: "100%",
                                                        maxHeight: isMobile ? "14vw" : '127px',
                                                        alignSelf: 'center'
                                                    }}
                                                />
                                            </CardMedia>
                                            <CardContent
                                                sx={{
                                                    // maxWidth: "100%",
                                                    // display: "flex",
                                                    textAlign: "center",
                                                    alignItems: 'center',
                                                }}>
                                                <Typography variant="p" paragraph sx={{
                                                    color: "rgba(0, 0, 0, 0.90)",
                                                    fontSize: isMobile ? "14px" : "16px",
                                                    fontWeight: 400,
                                                    // lineHeight: "171.3%",
                                                    letterSpacing: "0.027px",
                                                    mb: 1,
                                                }}>{dashboard.title}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        {/* <Button id="btnDasboardLihatLebihBanyakDashboard" variant="contained" onClick={handleLoadMoreClick}
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
                                display: showLoadMoreButton ? "" : "none",
                            }}>
                            Load more (?)
                        </Button>

                        {loading && (
                            <Typography variant="p" paragraph sx={{
                                color: "rgba(0, 0, 0, 0.90)",
                                fontSize: "16px",
                                fontWeight: 400,
                                mt: 2,
                            }}> <CircularProgress size={15} /> Lihat lainnya</Typography>
                        )} */}
                        <img
                            src='/assets/Partikel-1.png'
                            alt="Gambar"
                            draggable="false"
                            style={{
                                userDrag: "none",
                                userSelect: "none",

                                width: isMobile ? '70vw' : '539px',
                                height: isMobile ? '80vw' : '695px',
                                marginTop: "-550px",
                                position: "absolute",
                                zIndex: "-99",
                                right: "0",
                                transform: "scaleX(-1)",
                            }}
                        />
                    </section>
                </div >

                <Footer />
            </main>
            <ScrollTop />
        </>
    );
}

export default dashboard;