import { Box } from "@mui/material";

const IndexLandsat = () => {
  return (
    <Box sx={{ fontSize: "12pt", padding: "25px" }}>
      <ol>
        <li>NDVI (Normalized Difference Vegetation Index)</li>
        <li>NDBI (Normalized Difference Built-up Index)</li>
        <li>NDWI (Normalized Difference Water Index)</li>
        <li>EVI (Enhanced Vegetation Index)</li>
        <li>LST (Land Surface Temperature)</li>
        <li>SAVI (Soil-Adjusted Vegetation Index)</li>
        <li>BAEI (Built-up Area Extraction Index)</li>
        <li>BUI (Built-up Index)</li>
        <li>DBI (Dry Built-up Index)</li>
      </ol>
    </Box>
  );
};

export default IndexLandsat;
