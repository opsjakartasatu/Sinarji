import { Box, Button, Typography } from "@mui/material";

const Landsat = ({ showDetailLandsat, setShowDetailLandsat }) => {
  const toggleLandsat = () => {
    setShowDetailLandsat(!showDetailLandsat);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Typography variant="p" sx={{ fontSize: "14pt" }}>
        <strong>Landsat</strong>
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="p" sx={{ fontSize: "12pt" }}>
          <strong>Spatial Resolution</strong> : 30 meter (visible, NIR, SWIR),
          100 meter (thermal), dan 15 meter (Panchromatic)
        </Typography>
        <Typography variant="p" sx={{ fontSize: "12pt" }}>
          <strong>Temporal Resolution</strong> : 16 Days
        </Typography>
        <Typography variant="p" sx={{ fontSize: "12pt" }}>
          <strong>Spectral Resolution</strong> : Nine spectral bands
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
          onClick={() => toggleLandsat()}
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
          display: showDetailLandsat ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <Typography variant="p">
          <strong>Spectral Resolution Details</strong> :
        </Typography>
        <ul style={{ paddingLeft: "18px", fontSize: "12pt" }}>
          <li>Band 1 Coastal/Aerosol, (0.435 – 0.451 µm), resolusi 30 m</li>
          <li>Band 2 Blue (0.452 – 0.512 µm), resolusi 30 m</li>
          <li>Band 3 Green (0.533 – 0.590 µm), resolusi 30 m</li>
          <li>Band 4 Red (0.636 – 0.673 µm), resolusi 30 m</li>
          <li>Band 5 Near-Infrared (0.851 – 0.879 µm) resolusi 30 m</li>
          <li>
            Band 6 Short Wave Infrared-1 (1.566 – 1.651 µm), resolusi 30 m
          </li>
          <li>
            Band 7 Short Wave Infrared-2 (2.107 – 2.294 µm), resolusi 30 m
          </li>
          <li>Band Pankromatik, (0.503 – 0.676 µm), resolusi 15 m</li>
          <li>Band Cirrus, (1.363 – 1.384 µm), resolusi 30 m</li>
        </ul>
      </Box>
    </Box>
  );
};

export default Landsat;
