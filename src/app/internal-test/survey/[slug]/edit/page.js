import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import React from 'react'
import Edit from './Edit';

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Box><Edit session={session} /></Box>
  )
}

export default page