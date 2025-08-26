'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Box, useMediaQuery, useTheme, Tooltip, Typography } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from 'next/link';

export default function BackToPortal() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileHeight = useMediaQuery("(max-height: 431px)");
    const isMobile768 = useMediaQuery("(max-width: 1024px)");
    const isMobileiPadAirLandscape = useMediaQuery("(width: 1180px) and (height: 820px)");
    const isMobileiPadAirPortrait = useMediaQuery("(height: 1180px) and (width: 820px)");
    const isMobileiPadProLandscape = useMediaQuery("(width: 1366px) and (height: 1024px)");
    const isMobileiPadProPortrait = useMediaQuery("(height: 1366px) and (width: 1024px)");
    const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));

    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                setClicked(false);
            }
        }

        // Tambahkan event listener saat tombol diklik
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {isMobile768 ||
                isMobileiPadAirLandscape ||
                isMobileiPadAirPortrait ||
                isMobileiPadProPortrait ||
                isMobileiPadProLandscape
                ? (
                    <Box ref={buttonRef}
                        sx={{
                            position: 'fixed',
                            bottom: "155px",
                            right: "0px",
                            boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)"
                        }}
                    >
                        <Button
                            disableElevation
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: "12px 0px 0px 12px",
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                height: "42px",
                                minWidth: "48px",
                                width: clicked ? "280px" : "48px",
                                padding: "6px 14px",
                                transition: 'width 0.3s ease, opacity 0.3s ease',
                                background: "var(--jakartasatu-biru)",
                                textTransform: "none",
                                fontSize: "14px",
                                fontWeight: "600",
                                lineHeight: "150%",
                                justifyContent: 'flex-start',
                                overflow: 'hidden',

                                '&:hover': {
                                    background: 'var(--jakartasatu-biru)',
                                },
                            }}
                        >
                            <HomeRoundedIcon
                                onClick={() => setClicked(prev => !prev)}
                                sx={{
                                    cursor: "pointer",
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                            {clicked && (
                                <Link href="https://jakartasatu.jakarta.go.id/portal/apps/sites/#/public">
                                    <Typography variant='p'
                                        sx={{
                                            transition: 'opacity 0.3s ease',
                                            opacity: 1,
                                            whiteSpace: 'nowrap',
                                            padding: "14px 10px",
                                            marginRight: "20px",

                                            // fontFamily: "var(--font-family)",
                                            color: "var(--jakartasatu-biru)",
                                            background: "white",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            lineHeight: "150%",
                                        }}
                                    >
                                        Kembali ke portal sebelumnya
                                    </Typography>
                                </Link>
                            )}
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: "200px",
                            right: "0px",
                            boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                        }}
                    >
                        <Link href="https://jakartasatu.jakarta.go.id/portal/apps/sites/#/public">
                            <Button
                                disableElevation
                                variant="contained"
                                color="primary"
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                sx={{
                                    borderRadius: "12px 0px 0px 12px",
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    height: "42px",
                                    minWidth: "48px",
                                    width: hovered ? "280px" : "48px",
                                    padding: "6px 14px",
                                    transition: 'width 0.3s ease, opacity 0.3s ease',
                                    background: "var(--jakartasatu-biru)",
                                    textTransform: "none",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "150%",
                                    justifyContent: 'flex-start',
                                    overflow: 'hidden',

                                    '&:hover': {
                                        background: 'var(--jakartasatu-biru)',
                                    },
                                }}
                            >
                                <HomeRoundedIcon
                                    sx={{
                                        transition: 'transform 0.3s ease',
                                        transform: hovered ? 'translateX(0)' : 'translateX(0)',
                                    }}
                                />
                                <Typography variant='p'
                                    sx={{
                                        transition: 'opacity 0.3s ease',
                                        opacity: 1,
                                        whiteSpace: 'nowrap',
                                        padding: "14px 10px",
                                        marginRight: "20px",

                                        // fontFamily: "var(--font-family)",
                                        color: "var(--jakartasatu-biru)",
                                        background: "white",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "150%",
                                    }}
                                >
                                    Kembali ke portal sebelumnya
                                </Typography>
                            </Button>
                        </Link>
                    </Box>
                )}
        </>
    );
}
