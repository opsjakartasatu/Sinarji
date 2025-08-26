// components/map/MapOption.jsx
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MapOption = ({
  onClose,
  onLayerChange,
  showBuildings,
  showDamGate,
  showFloodAreaAll,
  showStreet,
}) => {
  const handleBuildingsChange = (event) => {
    if (typeof onLayerChange === "function") {
      onLayerChange("buildings", event.target.checked);
    }
  };

  const handleDamGateChange = (event) => {
    if (typeof onLayerChange === "function") {
      onLayerChange("damGate", event.target.checked);
    }
  };

  const handleGenanganAllChange = (event) => {
    if (typeof onLayerChange === "function") {
      onLayerChange("genanganAll", event.target.checked);
    }
  };

  const handleStreetChange = (event) => {
    if (typeof onLayerChange === "function") {
      onLayerChange("street", event.target.checked);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        position: "absolute",
        bottom: 190,
        right: 90,
        bgcolor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 3,
        p: 2,
        minWidth: 240,
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">
            Layer Option
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <FormGroup sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showBuildings}
              onChange={handleBuildingsChange}
              name="buildings"
              sx={{
                color: "#555",
                "&.Mui-checked": { color: "primary.main" },
              }}
              aria-label="Toggle buildings layer"
            />
          }
          label={
            <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
              Bangunan
            </Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showFloodAreaAll}
              onChange={handleGenanganAllChange}
              name="genanganAll"
              sx={{
                color: "#555",
                "&.Mui-checked": { color: "primary.main" },
              }}
              aria-label="Toggle flood area layer"
            />
          }
          label={
            <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
              Genangan Banjir
            </Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showDamGate}
              onChange={handleDamGateChange}
              name="damGate"
              sx={{
                color: "#555",
                "&.Mui-checked": { color: "primary.main" },
              }}
              aria-label="Toggle dam gate layer"
            />
          }
          label={
            <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
              Titik Pintu Air
            </Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showStreet}
              onChange={handleStreetChange}
              name="street"
              sx={{
                color: "#555",
                "&.Mui-checked": { color: "primary.main" },
              }}
              aria-label="Toggle street layer"
            />
          }
          label={
            <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
              Jalan
            </Typography>
          }
        />
      </FormGroup>
    </Paper>
  );
};

export default MapOption;
