import { Box, Typography } from "@mui/material";

const BUI = ({ data }) => {
  return (
    <Box
      sx={{
        display: data === "BUI" ? "flex" : "none",
        flexDirection: "column",
        rowGap: "10px"
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
          justifyContent: "center",
          paddingRight: "10px",
        }}
      >
        <i>BUI = NDBI - NDVI</i>
      </Box>
      <Typography variant="p">
        Details: <br /> • BUI : Built-Up Index <br /> • NDBI : Normalized
        Difference Built-up Index <br /> • NDVI : Normalized Difference
        Vegetation Index
      </Typography>
    </Box>
  );
};

export default BUI;
