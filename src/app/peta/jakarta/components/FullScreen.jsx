import React, { useEffect, useState } from "react";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

const FullScreen = ({ buttonSize, tooltip }) => {
  const [isFullScreen, setIsFullScreen] = useState(
    document.fullscreenElement !== null
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
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
        maxHeight: buttonSize,
      }}
    >
      <Tooltip title="Fullscreen" placement={tooltip}>
        <IconButton
          sx={{ height: buttonSize, width: buttonSize, padding: 0 }}
          onClick={toggleFullScreen}
        >
          {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FullScreen;
