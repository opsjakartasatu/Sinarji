"use client"

import { Box, useMediaQuery, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("./Map"), { ssr: false, webpack: false });

const page = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));

    return (
        <Box sx={{
            borderRadius: "20px",
            maxWwidth: "90vw",
            height: isMobile ? "500px" : "655px",
            padding: 0,
            backgroundColor: "white",
            boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
        }}>
            <Map isWidget={false} />
        </Box>
    )
}

export default page
