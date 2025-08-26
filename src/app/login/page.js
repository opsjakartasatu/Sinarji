import { Box } from "@mui/material";
import React from "react";
import LoginForm from "./LoginForm";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        padding: "0px",
        margin: "0px",
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default page;
