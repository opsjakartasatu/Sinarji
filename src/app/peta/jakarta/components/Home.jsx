import HomeIcon from "@mui/icons-material/Home";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";

const Home = ({ view, center, zoom, buttonSize, tooltip}) => {
  const handleZoom = () => {
    view.goTo({ center: center, zoom: zoom });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        backgroundColor: "white",
        rowGap: 2,
        maxWidth: buttonSize,
      }}
    >
      <Tooltip title="Home" placement={tooltip}>
        <IconButton
          onClick={handleZoom}
          sx={{ height: buttonSize, width: buttonSize, padding: 0 }}
        >
          <HomeIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Home;
