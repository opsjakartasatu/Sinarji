"use client"

import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
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

export default function Navbar(props) {
    const { halamanBeranda, halamanTentang, halamanPetaJakarta } = props;

    const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("1181"));
    const isMobile = useMediaQuery(theme.breakpoints.down("996"));

    const [halamanBeranda1, setHalamanBeranda] = useState(false);
    const [halamanTentang1, setHalamanTentang] = useState(false);
    const [halamanPetaJakarta1, setHalamanPetaJakarta] = useState(false);
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
            </Box>
            {isMobile ? (<Drawer halamanBeranda={halamanBeranda} halamanTentang={halamanTentang} halamanPetaJakarta={halamanPetaJakarta} />) : (
                <ul style={{
                    fontSize: "20px",
                    fontWeight: "450",
                    height: "inherit",
                    listStyleType: "none",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "80px",
                    margin: "0 20px 0 auto",
                    // margin: "0 40px 0 auto",
                }}>
                    <li>
                        <Link
                            id="btnNavbarToBeranda"
                            href="/"
                            style={{ color: 'var(--jakartasatu-biru)', textDecoration: "none" }}
                        >
                            <p onMouseEnter={(a) => a.currentTarget.style.color = 'var(--jakartasatu-orange)'}
                                onMouseLeave={(a) => a.currentTarget.style.color = 'var(--jakartasatu-biru)'}>Beranda</p>
                        </Link>
                    </li>
                    <li>
                        <Link
                            id="btnNavbarToPetaJakarta"
                            href="/peta/jakarta"
                            onClick={() => setHalamanPetaJakarta(true)}
                            style={{ color: props.halamanPetaJakarta ? 'var(--jakartasatu-orange)' : 'var(--jakartasatu-biru)', textDecoration: "none" }}
                        >
                            <p
                                onMouseEnter={(a) => !props.halamanPetaJakarta && (a.currentTarget.style.color = 'var(--jakartasatu-orange)')}
                                onMouseLeave={(a) => !props.halamanPetaJakarta && (a.currentTarget.style.color = 'var(--jakartasatu-biru)')}
                                style={{ display: "flex", alignItems: "center" }}>
                                Peta Jakarta <MapRoundedIcon style={{ marginLeft: "5px" }} />
                            </p>
                        </Link>
                    </li>
                    <li
                        onClick={handleOpenAI}
                        style={{ cursor: "pointer", color: 'var(--jakartasatu-biru)' }}
                    >
                        <p onMouseEnter={(a) => a.currentTarget.style.color = 'var(--jakartasatu-orange)'}
                            onMouseLeave={(a) => a.currentTarget.style.color = 'var(--jakartasatu-biru)'}>TanyaArah</p>
                    </li>
                    <li>
                        <Link
                            id="btnNavbarToTentang"
                            href="/tentang"
                            onClick={() => setHalamanTentang(true)}
                            style={{ color: props.halamanTentang ? 'var(--jakartasatu-orange)' : 'var(--jakartasatu-biru)' }}
                        >
                            <p
                                onMouseEnter={(a) => !props.halamanTentang && (a.currentTarget.style.color = 'var(--jakartasatu-orange)')}
                                onMouseLeave={(a) => !props.halamanTentang && (a.currentTarget.style.color = 'var(--jakartasatu-biru)')}
                            >
                                Tentang
                            </p>
                        </Link>
                    </li>
                </ul>
            )}
            {/* <Link href="https://jakartasatu.jakarta.go.id/web/internal/sign-in" target="_blank" style={{ display: "block" }}>
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
            </Link> */}
            <ChatBot openAI={openAI} setOpenAI={setOpenAI} />
        </>
    )
}
