import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";

const Zoom = ({ view, buttonSize }) => {
  const zoomIn = () => {
    view.goTo({ zoom: view.zoom + 1 });
  };

  const zoomOut = () => {
    view.goTo({ zoom: view.zoom - 1 });
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", borderRadius: 2, backgroundColor: "white", width: buttonSize, rowGap: "7px"}}>
      <Tooltip title="Zoom In" placement="left">
        <IconButton
          onClick={zoomIn}
          sx={{ height: buttonSize, width: buttonSize, padding: 0 }}
        >
          <Add />
        </IconButton>
      </Tooltip>
      <Tooltip title="Zoom Out" placement="left">
        <IconButton
          onClick={zoomOut}
          sx={{ height: buttonSize, width: buttonSize, padding: 0 }}
        >
          <Remove />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Zoom;
