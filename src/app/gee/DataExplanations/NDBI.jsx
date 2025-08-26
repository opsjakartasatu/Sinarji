import { Box, Typography } from "@mui/material";

const NDBI = ({ data }) => {
  return (
    <Box
      sx={{
        display: data === "NDBI" ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Typography variant="p">
        Normalized Difference Built-up Index (NDBI) is an index used to identify
        and measure urban areas within images. It effectively highlights cities
        and towns while minimizing the impact of atmospheric conditions and
        varying sunlight. This tool is valuable for tracking the growth of urban
        areas over time. The NDBI's formula:
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
          <i>NDBI =</i>
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
            <i>{"(SWIR - NIR)"}</i>
          </Box>
          <Box sx={{ paddingTop: "3px", borderTop: "1px solid black" }}>
          <i>{"(SWIR + NIR)"}</i>
          </Box>
        </Box>
      </Box>
      <Box>
        Details: <br /> • NDBI: Normalized Difference Built-up Index <br /> •
        SWIR: Shortwave Infrared band <br /> • NIR: Near-Infrared band
      </Box>
    </Box>
  );
};

export default NDBI;
