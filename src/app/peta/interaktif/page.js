"use client"

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("./Map"), { ssr: false, webpack: false });

const page = () => {
    return (
        <Box sx={{ width: "100vw", height: "100vh", margin: 0, padding: 0, backgroundColor: "white" }}>
            <Map isWidget={true} />
        </Box>
    )
}

export default page
