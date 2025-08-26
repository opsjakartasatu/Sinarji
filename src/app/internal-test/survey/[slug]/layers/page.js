import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import React from 'react'
import MainComponent from './MainComponent';

const page = async () => {
    const session = await getServerSession(authOptions);
    return (
        <Box><MainComponent session={session} /></Box>
    )
}

export default page