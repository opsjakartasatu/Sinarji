// components/map/MapBasemap.jsx
import {
  Box,
  Typography,
  IconButton,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MapBasemap = ({ basemap, onBasemapChange, onClose }) => {
  return (
    <Paper
      elevation={6}
      sx={{
        position: "absolute",
        bottom: 380,
        right: 90,
        bgcolor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 3,
        p: 2,
        minWidth: 200,
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Pilih Basemap
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Select Basemap */}
      <Select
        value={basemap}
        onChange={(e) => {
          if (typeof onBasemapChange === "function") {
            onBasemapChange(e.target.value);
          }
        }}
        size="small"
        fullWidth
        sx={{
          mt: 1,
          bgcolor: "#f9f9f9",
          borderRadius: 1,
          fontSize: { xs: "0.8rem", sm: "0.9rem" },
        }}
        aria-label="Select basemap"
      >
        <MenuItem value="google">Google Maps</MenuItem>
        <MenuItem value="osm">OpenStreetMap</MenuItem>
        <MenuItem value="opentopo">OpenTopoMap</MenuItem>
        <MenuItem value="cartodb_positron">CartoDB Positron</MenuItem>
      </Select>
    </Paper>
  );
};

export default MapBasemap;
