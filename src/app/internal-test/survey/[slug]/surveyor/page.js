import React from "react";
import MainComponent from "./MainComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Box } from "@mui/material";

const page = ({ params }) => {
  const session = getServerSession(authOptions);
  const survey_id = params.slug;
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      <MainComponent session={session} survey_id={survey_id} />
    </Box>
  );
};

export default page;
