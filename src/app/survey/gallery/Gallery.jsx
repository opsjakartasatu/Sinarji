"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Skeleton,
    Button
} from "@mui/material";
import { useRouter } from "next/navigation";

const Gallery = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}/api/survey/survey/list`);
                if (!response.ok) throw new Error("Failed to load survey list");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: "#f5f5f5", minHeight: "100vh", p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                Survey Gallery
            </Typography>

            <Grid container spacing={3}>
                {(loading ? Array.from(new Array(6)) : data?.surveys)?.map((survey, index) => (
                    <Grid xs={12} sm={6} md={4} key={survey?.survey_id || index} spacing={2}>
                        {survey ? (
                            <Card
                                sx={{
                                    height: "100%",
                                    padding: "10px",
                                    backgroundColor: "skyblue",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={`${process.env.BASE_URL}${survey.thumbnail}` || "/placeholder.png"}
                                        alt={survey.name}
                                        sx={{ objectFit: "scale-down", borderRadius: "5px", height: "250px" }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" fontWeight={600}>
                                            {survey.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {survey.description || "No description provided."}
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => router.push(`${process.env.BASE_URL}/survey/editSurvey/${survey.survey_id}`)}
                                    >
                                        Edit Survey
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="secondary"
                                        onClick={() => router.push(`${process.env.BASE_URL}/survey/surveyForm/${survey.survey_id}`)}
                                    >
                                        Fill Survey
                                    </Button>
                                </Box>
                            </Card>
                        ) : (
                            <Skeleton variant="rectangular" height={260} animation="wave" />
                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Gallery;
