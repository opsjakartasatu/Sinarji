"use client"

import { Box } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const MainComponent = ({ session }) => {
    const { slug } = useParams();
    const [surveyLayers, setSurveyLayers] = useState();
    useEffect(() => {
        const fetchData = async (urlPath) => {
            try {
                const headers = new Headers();
                headers.append("Authorization", `Bearer ${session?.user?.access_token}`);
                const body = new FormData();
                body.append("survey_id", slug);
                const response = await fetch(`${process.env.API_WEB}${urlPath}`, {
                    method: "POST",
                    headers,
                    body
                });
                const data = await response.json();
                setSurveys(data.data)
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        if (session) {
            fetchData("/survey/detail");
        }
    }, [session]);

    return (
        <Box>
            {/* {surveyLayers?.questions.map((layer) => (
                <Box>{layer.question}</Box>
            ))} */}
        </Box>
    )
}

export default MainComponent