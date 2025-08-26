import React from 'react'
import MapComponent from './MapComponent'
import { Box } from '@mui/material'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const survey_id = params.slug;
  return (
    <Box sx={{ height: "780px", width: "100%", backgroundColor: "white" }}>
      <MapComponent session={session} survey_id={survey_id}/>
    </Box>

  )
}

export default page