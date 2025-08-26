"use client"

import KritikSaran from '@/components/kritikSaran'
import ScrollTop from "@/components/scrollTop";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography, Tabs, Tab } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Edit = ({ session }) => {
    const { slug } = useParams();
    const [surveyDetail, setSurveyDetail] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    const [formInfo, setFormInfo] = useState({
        title: "",
        description: "",
        thumbnail: "",
    });

    useEffect(() => {
        const fetchData = async (urlPath) => {
            try {
                const headers = new Headers();
                headers.append(
                    "Authorization",
                    `Bearer ${session?.user?.access_token}`
                );
                const body = new FormData();
                body.append("survey_id", slug);
                const response = await fetch(`${process.env.API_WEB}${urlPath}`, {
                    method: "POST",
                    headers,
                    body,
                });
                const { data } = await response.json();
                setSurveyDetail(data);
                setFormInfo({
                    title: data.title || "",
                    description: data.short_content || "",
                    thumbnail: data.content || "", // ganti jadi data.thumbnail kalau API sudah diperbaiki
                });
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        if (session) {
            fetchData("/survey/detail");
        }
    }, [session]);

    const handleChange = (e) => {
        setFormInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    if (!surveyDetail) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
                <Typography variant="h5" fontWeight="bold" mb={1}>
                    Edit Survei
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Halaman untuk mengedit survei
                </Typography>

                {/* Tabs */}
                <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
                    <Tab label="Info Survei" />
                    <Tab label="Pertanyaan" />
                </Tabs>

                {/* Step 1: Judul dan Deskripsi */}
                {activeTab === 0 && (
                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextField
                            label="Judul Pertanyaan"
                            name="title"
                            value={formInfo.title}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Deskripsi Survei"
                            name="description"
                            value={formInfo.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="Thumbnail URL"
                            name="thumbnail"
                            value={formInfo.thumbnail}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Box textAlign="right">
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#219653",
                                    borderRadius: "20px",
                                    px: 4,
                                    py: 1,
                                    "&:hover": {
                                        backgroundColor: "#1e8749",
                                    },
                                }}
                                onClick={() => {
                                    console.log("Save metadata:", formInfo);
                                    // TODO: Save metadata to API
                                }}
                            >
                                Simpan Info
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* Step 2: Pertanyaan (Placeholder) */}
                {activeTab === 1 && (
                    <Box display="flex" flexDirection="column" gap={3}>
                        <Typography variant="h6" fontWeight="bold">
                            List Pertanyaan
                        </Typography>

                        {surveyDetail.question.map((q, index) => (
                            <Box key={q.question_id} sx={{ backgroundColor: "#f6f7fb", borderRadius: 2, p: 2, border: "1px solid #e0e0e0" }}>
                                <Typography variant="subtitle1" fontWeight="medium" mb={1}>
                                    Pertanyaan {index + 1}
                                </Typography>
                                <TextField value={q.name} disabled fullWidth />
                                <Typography variant="body2" color="text.secondary" mb={1}>
                                    {q.description}
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={q.selected || ""}
                                        onChange={(e) => {
                                            const newQuestions = [...surveyDetail.question];
                                            newQuestions[index].selected = e.target.value;
                                            setSurveyDetail((prev) => ({
                                                ...prev,
                                                question: newQuestions,
                                            }));
                                        }}
                                        displayEmpty
                                        sx={{ backgroundColor: "#fff" }}
                                    >
                                        <MenuItem value="" disabled>Pilih jawaban</MenuItem>
                                        {q.option.map((opt) => (
                                            <MenuItem key={opt.option_id} value={opt.content}>
                                                {opt.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        ))}

                        <Box textAlign="right">
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#219653",
                                    borderRadius: "20px",
                                    px: 4,
                                    py: 1,
                                    "&:hover": {
                                        backgroundColor: "#1e8749",
                                    },
                                }}
                                onClick={() => {
                                    console.log("Jawaban dipilih:", surveyDetail.question);
                                    // TODO: Save answers to API
                                }}
                            >
                                Simpan Jawaban
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
            <KritikSaran />
            <ScrollTop />
        </>
    )
}

export default Edit