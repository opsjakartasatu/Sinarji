import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import MainComponent from "./MainComponent";

const page = () => {
  const basePath = process.env.BASE_PATH;
  return (
    <Box>
      <MainComponent basePath={basePath} />
    </Box>
  );
};

export default page;
