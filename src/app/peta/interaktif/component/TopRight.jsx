import React from "react";
import { Box } from "@mui/material";
import Search from "@/components/peta/interaktif/Search";
import Bahasa from "@/components/peta/interaktif/Bahasa";
import InfoMap from "@/components/peta/interaktif/InfoMap";
import FullScreen from "@/components/peta/interaktif/FullScreen";

const TopRight = ({ view, startTour }) => {
  return (
    <Box sx={{display: "flex", flexDirection: "row", columnGap: 2}}>
      <InfoMap view={view} startTour={startTour} buttonSize={"48px"}/>
      <Bahasa view={view} buttonSize={"48px"}/>
      <FullScreen buttonSize={"48px"}/>
    </Box>
  );
};

export default TopRight;
