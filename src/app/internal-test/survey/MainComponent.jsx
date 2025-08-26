"use client";

import { Add, BarChart, Edit, Group, Layers } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardContent, Chip, Grid, IconButton, InputAdornment, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import KritikSaran from '@/components/kritikSaran';
import ScrollTop from "@/components/scrollTop";
import Link from 'next/link';

const MainComponent = ({ session }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
    const isMobile900 = useMediaQuery(theme.breakpoints.down("md"));

    const [surveys, setSurveys] = useState();

    useEffect(() => {
        document.title = "Survei | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const fetchData = async (urlPath) => {
            try {
                const headers = new Headers();
                headers.append("Authorization", `Bearer ${session?.user?.access_token}`);
                const response = await fetch(`${process.env.API_WEB}${urlPath}`, {
                    method: "POST",
                    headers,
                });
                const data = await response.json();
                setSurveys(data.data)
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        if (session) {
            fetchData("/survey/list");
        }

    }, [session]);

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };
    return (
        <>
            <div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Stack direction={"column"} spacing={2}>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start",
                                flexDirection: "column",
                                alignItems: "flex-start",
                            }}
                        >
                            <Typography
                                variant="p"
                                style={{
                                    color: "var(--jakartasatu-biru)",
                                    textAlign: "center",
                                    fontSize: "36px",
                                    fontWeight: "800",
                                }}
                            >
                                Survei
                            </Typography>
                        </Box>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            margin: "0px"
                        }}>
                            <OutlinedInput
                                sx={{
                                    fontFamily: "var(--font-family)",
                                    width: "800px",
                                    height: "49px",
                                    borderRadius: "40px",
                                    background: "white",
                                    border: "1px solid rgba(0, 69, 129, 0.30)",
                                    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.05)",
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="23"
                                            height="23"
                                            viewBox="0 0 23 23"
                                            fill="none"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M9.91582 0.351563C8.33451 0.351697 6.77617 0.729987 5.37079 1.45487C3.96541 2.17976 2.75376 3.23022 1.83693 4.51861C0.920099 5.807 0.324668 7.29597 0.100316 8.86128C-0.124036 10.4266 0.0291973 12.0229 0.547231 13.5169C1.06526 15.011 1.93308 16.3595 3.07827 17.4499C4.22346 18.5404 5.61281 19.3411 7.13042 19.7854C8.64803 20.2297 10.2499 20.3047 11.8023 20.004C13.3548 19.7033 14.8128 19.0357 16.0548 18.0569L20.3155 22.3176C20.5355 22.5301 20.8302 22.6477 21.1361 22.645C21.442 22.6424 21.7346 22.5197 21.9509 22.3034C22.1673 22.087 22.29 21.7944 22.2926 21.4885C22.2953 21.1826 22.1777 20.8879 21.9652 20.6679L17.7045 16.4072C18.8572 14.945 19.5748 13.1877 19.7754 11.3366C19.976 9.48545 19.6514 7.61525 18.8388 5.94C18.0261 4.26476 16.7582 2.85214 15.1802 1.86383C13.6022 0.87552 11.7778 0.351437 9.91582 0.351563ZM2.33249 10.2682C2.33249 8.257 3.13145 6.32815 4.5536 4.906C5.97575 3.48385 7.9046 2.6849 9.91582 2.6849C11.927 2.6849 13.8559 3.48385 15.2781 4.906C16.7002 6.32815 17.4992 8.257 17.4992 10.2682C17.4992 12.2795 16.7002 14.2083 15.2781 15.6305C13.8559 17.0526 11.927 17.8516 9.91582 17.8516C7.9046 17.8516 5.97575 17.0526 4.5536 15.6305C3.13145 14.2083 2.33249 12.2795 2.33249 10.2682Z"
                                                fill="var(--jakartasatu-biru)"
                                            />
                                        </svg>
                                    </InputAdornment>
                                }
                            />
                        </Box>
                        <Grid container spacing={2}>
                            <Grid sx={3} item>
                                <Box
                                    sx={{
                                        backgroundColor: "#003577",
                                        height: "250px",
                                        width: "300px",
                                        outlineColor: "gray",
                                        outlineStyle: "dashed",
                                        outlineWidth: "2px",
                                        borderRadius: "10px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: "white",
                                    }}
                                >
                                    <Link href={`/internal-test/survey/buat-survey`}>
                                        <Button startIcon={<Add />} sx={{ color: "white", textTransform: "capitalize" }}>
                                            Tambah Survei
                                        </Button>
                                    </Link>
                                </Box>
                            </Grid>
                            {surveys?.map((survey) =>
                            (<Grid sx={3} item>
                                <Card variant="outlined" sx={{
                                    height: "250px",
                                    width: "300px", position: 'relative', borderRadius: 2
                                }}>
                                    {/* Status Chip */}
                                    <Chip
                                        label={survey.status === "published" ? "Dipublikasikan" : "Belum Dipublikasikan"}
                                        color="success"
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            left: 8,
                                            zIndex: 1,
                                        }}
                                    />

                                    <CardContent sx={{ pt: 5 }}>
                                        {/* Icon Illustration */}
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                            <Avatar
                                                variant="square"
                                                src={`${process.env.BASE_URL}/survey.png`}
                                                sx={{ width: 120, height: 120 }}
                                            />
                                        </Box>

                                        {/* Title */}
                                        <Typography variant="subtitle1" fontWeight="bold" align="left" gutterBottom>
                                            {survey.title}
                                        </Typography>

                                        {/* Admin Text */}
                                        <Typography variant="body2" color="text.secondary" align="left">
                                            {survey.author.name}
                                        </Typography>
                                    </CardContent>

                                    {/* Action Buttons */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                        }}
                                    >
                                        <Link href={`/internal-test/survey/${survey.id}/edit`}>
                                            <IconButton size="small" sx={{ width: "25px", height: "25px", color: "white", backgroundColor: "#003577", borderRadius: "5px" }}>
                                                <Edit fontSize="small" />
                                            </IconButton>
                                        </Link>
                                        <Link href={`/internal-test/survey/${survey.id}/dashboard`}>
                                            <IconButton size="small" sx={{ width: "25px", height: "25px", color: "white", backgroundColor: "#003577", borderRadius: "5px" }}>
                                                <BarChart fontSize="small" />
                                            </IconButton>
                                        </Link>
                                        <Link href={`/internal-test/survey/${survey.id}/surveyor`}>
                                            <IconButton size="small" sx={{ width: "25px", height: "25px", color: "white", backgroundColor: "#003577", borderRadius: "5px" }}>
                                                <Group fontSize="small" />
                                            </IconButton>
                                        </Link>
                                        <Link href={`/internal-test/survey/${survey.id}/layers`}>
                                            <IconButton size="small" sx={{ width: "25px", height: "25px", color: "white", backgroundColor: "#003577", borderRadius: "5px" }}>
                                                <Layers fontSize="small" />
                                            </IconButton>
                                        </Link>
                                        {/* <IconButton
                                            size="small"
                                            sx={{ width: "25px", height: "25px", color: "white", backgroundColor: "#003577", borderRadius: "5px" }}
                                            onClick={() => router.push(`/internal-test/survey/${survey.id}`)}
                                        >
                                            <BarChart fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" sx={{ width: "25px", height: "25px", color: "white", backgroundColor: "#003577", borderRadius: "5px" }}>
                                            <Group fontSize="small" />
                                        </IconButton> */}
                                    </Box>
                                </Card>
                            </Grid>)
                            )}
                        </Grid>
                    </Stack>
                </motion.div>
            </div>
            <KritikSaran />
            <ScrollTop />
        </>
    )
}

export default MainComponent