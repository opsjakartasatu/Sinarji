import { Box, Typography } from "@mui/material";

const NDVI = ({ data }) => {
  return (
    <Box
      sx={{
        display: data === "NDVI" ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Typography variant="p">
        Normalized Difference Vegetation Index (NDVI) is a widely used for
        estimating vegetation greenness and biomass. It is utilized for
        monitoring vegetation health, assessing crop conditions, mapping
        vegetation cover, tracking deforestation and land use change, and
        estimating biomass and primary productivity. The NDVI's formula:
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
          <i>NDVI =</i>
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
            <i>{"(NIR - R)"}</i>
          </Box>
          <Box sx={{ paddingTop: "3px", borderTop: "1px solid black" }}>
          <i>{"(NIR + R)"}</i>
          </Box>
        </Box>
      </Box>
      <Box>
        Details: <br /> • NDVI: Normalized Difference Vegetation Index <br /> •
        NIR : reflectance in the near-infrared band <br /> • R : reflectance in
        the red band
      </Box>
    </Box>
  );
};

export default NDVI;
