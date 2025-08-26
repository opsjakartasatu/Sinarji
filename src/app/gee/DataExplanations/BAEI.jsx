import { Box, Typography } from "@mui/material";
import React from "react";

const BAEI = ({ data }) => {
  return (
    <Box
      sx={{
        display: data === "BAEI" ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Typography variant="p">
        Built-up Area Extraction Index (BAEI) is a spectral index to identify
        and locate urban or built-up areas within an image. It highlights the
        differences between built-up areas and other land types like vegetation
        or bare ground. The BAEI's formula:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", paddingRight: "10px" }}
        >
          <i>BAEI =</i>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              borderBottom: "1px solid black",
              height: "50px",
              paddingBottom: "3px",
            }}
          >
            <i>{"(SWIR1 x Red - NIR x Red + NIR + SWIR1)"}</i>
          </Box>
          <Box sx={{ paddingTop: "3px" }}><i>{"(SWIR1 x Red)"}</i></Box>
        </Box>
      </Box>
      <Box>
        Details: <br /> • SWIR1 : Shortwave Infrared band 1 <br /> • Red : Red
        band <br /> • NIR : Near Infrared band
      </Box>
    </Box>
  );
};

export default BAEI;
