// components/map/MapLegend.jsx
import { Box, Typography, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CONFIG } from "./config";

const MapLegend = ({
  showBuildings,
  showFloodAreaAll,
  showStreet,
  showDamGate,
  onClose,
}) => {
  return (
    <Paper
      elevation={6}
      sx={{
        position: "absolute",
        bottom: 210,
        right: 90,
        bgcolor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 3,
        p: 2,
        minWidth: 180,
        zIndex: 1000,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
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
            Legenda
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box>
        {CONFIG.LEGEND.map(({ key, label, color, shape }) => {
          const isVisible = {
            showBuildings,
            showFloodAreaAll,
            showStreet,
            showDamGate,
          }[key];

          return (
            isVisible && (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    width: shape === "line" ? 20 : 16,
                    height: shape === "line" ? 3 : 16,
                    bgcolor: color,
                    borderRadius: shape === "circle" ? "50%" : 1,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                  {label}
                </Typography>
              </Box>
            )
          );
        })}
      </Box>
    </Paper>
  );
};

export default MapLegend;
