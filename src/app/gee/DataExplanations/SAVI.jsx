import { Box, Typography } from "@mui/material";

const SAVI = ({ data }) => {
  return (
    <Box
      sx={{
        display: data === "SAVI" ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Typography variant="p">
        Soil-Adjusted Vegetation Index (SAVI) is a vegetation index designed to
        minimize the influence of soil brightness on plant measurements,
        particularly in regions with sparse vegetation. It refines the NDVI by
        incorporating a soil brightness correction factor. The SAVI's formula:
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
          <i>{"SAVI = (1 + L) x"}</i>
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
              height: "50px",
              paddingBottom: "3px",
            }}
          >
            <i>{"(NIR - Red)"}</i>
          </Box>
          <Box sx={{ paddingTop: "3px", borderTop: "1px solid black" }}>
          <i>{"(NIR + Red + L)"}</i>
          </Box>
        </Box>
      </Box>
      <Box>
        Details: <br /> • Green : reflectance in the green band of the satellite
        image <br /> • NIR : reflectance in the near-infrared band of the
        satellite image
      </Box>
    </Box>
  );
};

export default SAVI;
