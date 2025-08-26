"use client"

import React from 'react';
import { Breadcrumbs, Link, Typography, Stack, Box, Button } from '@mui/material';
import { ArrowBackRounded as ArrowBackRoundedIcon, KeyboardArrowRightRounded as KeyboardArrowRightRoundedIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const breadcrumbs = ({ breadcrumbs, isNewsPage }) => {
    const basePath = process.env.BASE_PATH;

    const router = useRouter();
    const maxWidth = isNewsPage ? "1400px" : "1300px";

    const truncateText = (text, charLimit = 100) => {
        if (!text) return '';

        if (text.length <= charLimit) {
            return text;
        }

        return text.slice(0, charLimit) + '...';
    };

    return (
        <>
            <Stack
                gap={{ xs: 2, sm: 3 }}
                direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
                alignItems={{ xs: "flex-start", sm: "flex-start", md: "flex-start", lg: "center" }}
                justifyContent={{ xs: "space-between", md: "flex-start" }}
                sx={{
                    width: `min(90vw, ${maxWidth})`,
                    margin: "150px auto 0 auto"
                }}>
                <Button id="btnRouteBack" onClick={() => router.back()}
                    sx={{
                        minWidth: "0",
                        padding: "0",
                        justifyContent: "flex-start"
                    }}>
                    <ArrowBackRoundedIcon style={{ color: "black" }} />
                </Button>
                <Box role="presentation"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: { xs: "", sm: "", md: "", lg: "-48px" }
                    }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<KeyboardArrowRightRoundedIcon fontSize="small" />}>
                        {breadcrumbs.map((breadcrumb, index) => {
                            // Menambahkan basePath pada href jika ada
                            const fullHref = breadcrumb.href ? `${basePath}${breadcrumb.href}` : undefined;

                            return breadcrumb.href ? (
                                <Link
                                    key={index}
                                    underline="hover"
                                    color="inherit"
                                    href={fullHref}
                                    style={{
                                        fontFamily: 'var(--font-family)',
                                        color: "rgba(0, 0, 0, 0.35)",
                                        fontSize: "18px",
                                        fontWeight: "500",
                                        lineHeight: "150%",
                                        letterSpacing: "-0.342px",
                                    }}
                                >
                                    {breadcrumb.label}
                                </Link>
                            ) : (
                                <Typography
                                    key={index}
                                    variant="p"
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        color: 'var(--jakartasatu-biru)',
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        lineHeight: "150%",
                                        letterSpacing: "-0.342px",
                                    }}
                                >
                                    {truncateText(breadcrumb.label, 50)}
                                </Typography>
                            );
                        })}
                    </Breadcrumbs>
                </Box>
            </Stack>
        </>
    );
};

export default breadcrumbs;