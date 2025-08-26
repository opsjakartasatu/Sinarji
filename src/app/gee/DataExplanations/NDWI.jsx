import { Box, Typography } from "@mui/material";

const NDWI = ({ data }) => {
  return (
    <Box
      sx={{
        display: data === "NDWI" ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Typography variant="p">
        Normalized Difference Water Index (NDWI) tracks changes related to water
        content in water bodies. It leverages the contrast between how water and
        other surfaces reflect green and near-infrared light to distinguish
        water areas. The NDWI's formula:
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
          <i>NDWI =</i>
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
            <i>{"(Green - NIR)"}</i>
          </Box>
          <Box sx={{ paddingTop: "3px", borderTop: "1px solid black" }}>
          <i>{"(Green + NIR)"}</i>
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

export default NDWI;
