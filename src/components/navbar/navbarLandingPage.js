"use client"

import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

// import Drawer from "./drawerNavbar";
import Drawer from "./drawerNavbarRedesign";
import { useState } from "react";

import ChatBot from "../chatBot";

import './style.css'

import MapRoundedIcon from '@mui/icons-material/MapRounded';
import { useRouter } from "next/navigation";
import CustomImage from "../CustomImage";
// import { signIn, signOut, useSession } from "next-auth/react";

export default function NavbarLandingPage(props) {
    const { halamanBeranda, halamanTentang, halamanKatalogPeta } = props;

    const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("954"));
    // const isMobile = useMediaQuery(theme.breakpoints.down("815"));
    const isMobile = useMediaQuery(theme.breakpoints.down("646"));
    const isMobileHeight = useMediaQuery("(max-height: 431px)");

    const [halamanBeranda1, setHalamanBeranda] = useState(false);
    const [halamanTentang1, setHalamanTentang] = useState(false);
    const [halamanKatalogPeta1, setHalamanKatalogPeta] = useState(false);
    const basePath = process.env.SERVER_PUBLIC_BASE_PATH ?? ''

    const [openAI, setOpenAI] = useState(false);

    const handleClickOpenAI = () => {
        setOpenAI(true);
    };

    const handleOpenAI = () => {
        setOpenAI(true);
    };

    return (
        <>
            <Box sx={{
                alignItems: "center",
                display: "flex",
                marginLeft: isMobile ? "auto" : "0",
                marginRight: "0",
            }}>
                <div style={{ display: isMobile ? "block" : "none" }}>
                    <Link href="/">
                        <CustomImage
                            src="/assets/logo-jakartasatu-orange.png"
                            alt="Gambar"
                            priority={true}
                            draggable={false}
                            width={0}
                            height={0}
                            style={{
                                userDrag: "none",
                                userSelect: "none",

                                width: isMobile ? "40vw" : "180px",
                                maxWidth: "180px",
                                height: "auto",
                                alignItems: "center",
                                display: "flex",
                            }}
                        />
                    </Link>
                </div>
                {isMobile ? (<Drawer halamanBeranda={halamanBeranda} halamanTentang={halamanTentang} halamanKatalogPeta={halamanKatalogPeta} />) : (
                    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={{ xs: 4, sm: 6, md: 9, lg: 10, xl: 10 }}
                        sx={{
                            fontSize: "20px",
                            fontWeight: "450",
                            height: "inherit",
                        }}>
                        <Link
                            id="btnNavbarToBeranda"
                            href="/"
                            onClick={() => setHalamanBeranda(true)}
                            style={{ color: 'var(--jakartasatu-biru)' }}
                        >
                            <p style={{ color: props.halamanBeranda ? '#F7941D' : '#003577' }}>Beranda</p>
                        </Link>
                        <Link
                            id="btnNavbarToPetaJakarta"
                            href="/peta/jakarta"
                            style={{ color: 'var(--jakartasatu-biru)', textDecoration: "none" }}
                            onMouseEnter={(a) => a.currentTarget.style.color = 'var(--jakartasatu-orange)'}
                            onMouseLeave={(a) => a.currentTarget.style.color = 'var(--jakartasatu-biru)'}
                        >
                            <p style={{ display: "flex", alignItems: "center" }}>
                                Peta Jakarta <MapRoundedIcon style={{ marginLeft: "5px" }} />
                            </p>
                        </Link>
                        <div
                            onClick={handleOpenAI}
                            onMouseEnter={(a) => a.currentTarget.style.color = 'var(--jakartasatu-orange)'}
                            onMouseLeave={(a) => a.currentTarget.style.color = 'var(--jakartasatu-biru)'}
                            style={{ cursor: "pointer", color: 'var(--jakartasatu-biru)' }}
                        >
                            TanyaArah
                        </div>
                        <Link
                            id="btnNavbarToTentang"
                            href="/tentang"
                            onClick={() => setHalamanTentang(true)}
                            style={{ color: 'var(--jakartasatu-biru)' }}
                        >
                            <p onMouseEnter={(a) => a.currentTarget.style.color = 'var(--jakartasatu-orange)'}
                                onMouseLeave={(a) => a.currentTarget.style.color = 'var(--jakartasatu-biru)'}>Tentang</p>
                        </Link>
                    </Stack>
                )}
                {/* <Box sx={{ display: "block", marginLeft: { xs: "55px", sm: "55px", md: "75px", lg: "80px", xl: "80px" } }}>
                    <Link href="https://jakartasatu.jakarta.go.id/web/internal/sign-in" target="_blank">
                        <Button id="btnHomeToLogin" variant="contained"
                            sx={{
                                fontFamily: 'var(--font-family)',
                                width: isMobile ? "20vw" : "112px",
                                maxWidth: "112px",
                                height: "41px",
                                borderRadius: "40px",
                                background: 'var(--jakartasatu-orange)',
                                boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                                textTransform: "none",
                                color: "white",
                                fontSize: "20px",
                                padding: "4px 25px",
                            }}>
                            Login
                        </Button>
                    </Link>
                </Box> */}
            </Box>
            <ChatBot openAI={openAI} setOpenAI={setOpenAI} />
        </>
    )
}
