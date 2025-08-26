"use client"

import React from 'react';
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import "./style.css";
import { PlayArrowRounded, Pause, Compare, Flip } from '@mui/icons-material';
import DrawerFotoUdara from "./drawerFotoUdara";
import CustomImage from "../CustomImage";

export default function Navbar({
    isPlaying,
    togglePlay,
    isSwipeMode,
    toggleSwipeMode,
    isCompareMode,
    toggleCompareMode
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("640"));
    const isMobile900 = useMediaQuery(theme.breakpoints.down("900"));
    const isMobile1010 = useMediaQuery(theme.breakpoints.down("1010"));

    return (
        <>
            <div className="navbarFotoUdara" style={{ width: isMobile ? "90vw" : "97vw" }}>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        marginLeft: isMobile ? "auto" : "0",
                        marginRight: "0",
                        width: isMobile900 ? null : "100%"
                    }}
                >
                    <Link href="/">
                        <CustomImage
                            src="/assets/logo-jakartasatu-orange.png"
                            alt="Logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority
                            style={{
                                width: isMobile ? "40vw" : "180px",
                                maxWidth: "180px",
                                height: "auto",
                                alignItems: "center",
                                display: "flex",
                            }}
                        />
                    </Link>
                </Box>
                <Typography
                    variant="p"
                    sx={{
                        display: isMobile1010 ? "none" : "block",
                        color: "var(--jakartasatu-biru)",
                        fontSize: "20px",
                        fontWeight: "700",
                        lineHeight: "150%",
                        // padding: "6px 25px",
                        textAlign: "center",
                        width: "100%",
                        minWidth: "382px"
                    }}
                >
                    Histori Foto Udara DKI Jakarta
                </Typography>
                {isMobile ? (
                    <DrawerFotoUdara
                        isPlaying={isPlaying}
                        togglePlay={togglePlay}
                        isSwipeMode={isSwipeMode}
                        toggleSwipeMode={toggleSwipeMode}
                        isCompareMode={isCompareMode}
                        toggleCompareMode={toggleCompareMode}
                    />
                ) : (
                    <>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            gap={6}
                            sx={{
                                fontSize: "20px",
                                fontWeight: "450",
                                height: "inherit",
                                listStyleType: "none",
                                width: "100%",
                            }}
                        >
                            {/* Tombol Play/Pause */}
                            <Box
                                onClick={togglePlay}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontFamily: "var(--font-family)",
                                        fontSize: "18px",
                                        color: isPlaying ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)",
                                    }}
                                >
                                    {isPlaying ? "Stop Play" : "Play"}
                                </Typography>
                                {isPlaying ? (
                                    <Pause
                                        sx={{
                                            fontSize: "34.2px",
                                            color: isPlaying ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)",
                                        }}
                                    />
                                ) : (
                                    <PlayArrowRounded
                                        sx={{
                                            fontSize: "34.2px",
                                            color: isPlaying ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)",
                                        }}
                                    />
                                )}
                            </Box>

                            <Box
                                onClick={toggleCompareMode}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    cursor: "pointer",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontFamily: "var(--font-family)",
                                        fontSize: "18px",
                                        color: isCompareMode ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)",
                                    }}
                                >
                                    {isCompareMode ? "Stop Compare" : "Compare"}
                                </Typography>
                                <Compare
                                    sx={{
                                        color: isCompareMode ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)",
                                    }}
                                />
                            </Box>

                            {/* Tombol Swipe */}
                            <Box
                                onClick={toggleSwipeMode}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    cursor: "pointer",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontFamily: "var(--font-family)",
                                        fontSize: "18px",
                                        color: isSwipeMode ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)",
                                    }}
                                >
                                    {isSwipeMode ? "Stop Swipe" : "Swipe"}
                                </Typography>
                                <Flip
                                    sx={{
                                        color: isSwipeMode ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)",
                                    }}
                                />
                            </Box>
                        </Stack>
                    </>
                )}
            </div>
        </>
    );
}
