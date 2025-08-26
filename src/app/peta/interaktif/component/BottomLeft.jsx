import Kordinat from "@/components/peta/interaktif/Kordinat";
import Skala from "@/components/peta/interaktif/Skala";
import { Box } from "@mui/material";
import React from "react";

const BottomLeft = ({ view }) => {
  return (
    <>
      <Box sx={{width: "300px", backgroundColor: "white", borderRadius: 2}}>
        <Kordinat view={view} />
      </Box>
      <Box>
        <Skala view={view} />
      </Box>
    </>
  );
};

export default BottomLeft;
