import { Box, Button, Typography } from "@mui/material";

const Sentinel = ({ showDetailSentinel, setShowDetailSentinel }) => {
  const toggleSentinel = () => {
    setShowDetailSentinel(!showDetailSentinel);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Typography sx={{ fontSize: "14pt" }}>
        <strong>Sentinel-2</strong>
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: "12pt" }}>
          <strong>Spatial Resolution</strong> : 10 meter (Visible, NIR), 20
          meter (Red Edge, SWIR), 60 meter (Atmospheric Band)
        </Typography>
        <Typography sx={{ fontSize: "12pt" }}>
          <strong>Temporal Resolution</strong> : 5 days
        </Typography>
        <Typography sx={{ fontSize: "12pt" }}>
          <strong>Spectral Resolution</strong> : 13 spectral bands
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          disableElevation
          variant="contained"
          size="small"
          onClick={() => toggleSentinel()}
          sx={{
            textTransform: "none",
            borderRadius: "30px",
            height: "42px",
            padding: "0 20px",
          }}
        >
          Details
        </Button>
      </Box>
      <Box
        sx={{
          display: showDetailSentinel ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <Typography>
          <strong>Temporal Resolution Details</strong> : Sentinel 2 has 2
          identical satellites (Sentinel 2A and Sentinel 2B) with a temporal
          resolution of 10 days for each)
        </Typography>
        <Typography>
          <strong>Spectral Resolution Details</strong> :
        </Typography>
        <ul style={{ paddingLeft: "18px", fontSize: "12pt" }}>
          <li>B1 Ultra Blue (Coastal and Aerosol) 443 nm, resolusi 60 m</li>
          <li>B2 Blue 490 nm, resolusi 10 m</li>
          <li>B3 Green 560 nm, resolusi 10 m</li>
          <li>B4 Red 665 nm, resolusi 10 m</li>
          <li>B5 Visible and Near Infrared (VNIR) 705 nm, resolusi 20 m</li>
          <li>B6 Visible and Near Infrared (VNIR) 740 nm, resolusi 20 m</li>
          <li>B7 Visible and Near Infrared (VNIR) 783 nm, resolusi 20 m</li>
          <li>B8 Visible and Near Infrared (VNIR) 842 nm, resolusi 10 m</li>
          <li>B8a Visible and Near Infrared (VNIR) 865 nm, resolusi 20 m</li>
          <li>B9 Short Wave Infrared (SWIR) 940 nm, resolusi 60 m</li>
          <li>B10 Short Wave Infrared (SWIR) 1375 nm, resolusi 60 m</li>
          <li>B11 Short Wave Infrared (SWIR) 1610 nm, resolusi 20 m</li>
          <li>B12 Short Wave Infrared (SWIR) 2190 nm, resolusi 20 m</li>
        </ul>
      </Box>
    </Box>
  );
};

export default Sentinel;
