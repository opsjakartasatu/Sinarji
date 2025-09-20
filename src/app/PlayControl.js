"use client";
import { useState, useEffect, useContext } from "react";
import { MapContext } from "./MapContext";
import { Stack, Box, Paper, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import ReplayIcon from "@mui/icons-material/Replay"; // untuk resume

export default function PlayControl() {
  const { activeSubMenu, isPlaying, startPlay, stopPlay, pausePlay, resumePlay, isPaused } = useContext(MapContext);
  const [toggleActive, setToggleActive] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!activeSubMenu);
    if (!activeSubMenu) setToggleActive(false);
  }, [activeSubMenu]);

  const handleToggle = () => {
    if (!disabled) setToggleActive(!toggleActive);
  };

  const typographyStyle = (enabled = true, active = false) => ({
    fontWeight: "500",
    fontFamily: "var(--font-family)",
    fontSize: "14px",
    color: enabled ? (active ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)") : "gray",
    textTransform: "capitalize",
  });

  return (
    <Box sx={{ position: "absolute", top: 90, left: 35, zIndex: 2, display: "flex", alignItems: "center", gap: 0.5 }}>
      {/* Toggle utama */}
      <IconButton
        onClick={handleToggle}
        disabled={disabled}
        sx={{
          bgcolor: "#0d47a1",
          color: "white",
          borderRadius: 1.5,
          p: 0.5,
          "&:hover": { bgcolor: "#0d47a1" },
          width: 40,
          height: 40,
        }}
      >
        {toggleActive ? <PlayArrowIcon sx={{ fontSize: 30, transform: "rotate(180deg)", color: "white" }} /> : <PlayArrowIcon sx={{ fontSize: 30 }} />}
      </IconButton>

      {/* Panel tombol muncul di samping kanan toggle */}
      {toggleActive && (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 2,
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
            boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
            p: 1,
            height: 40,
          }}
        >
          <Stack direction="row" spacing={1}>
            <IconButton onClick={startPlay} disabled={isPlaying && !isPaused}>
              <PlayArrowIcon />
              <Typography sx={typographyStyle(activeSubMenu, isPlaying && !isPaused)}>Play</Typography>
            </IconButton>
            <IconButton onClick={pausePlay} disabled={!isPlaying || isPaused}>
              <PauseIcon />
              <Typography sx={typographyStyle(activeSubMenu, isPaused)}>Pause</Typography>
            </IconButton>
            <IconButton onClick={resumePlay} disabled={!isPaused}>
              <ReplayIcon />
              <Typography sx={typographyStyle(activeSubMenu, isPaused)}>Resume</Typography>
            </IconButton>
            <IconButton onClick={stopPlay} disabled={!isPlaying && !isPaused}>
              <StopIcon />
              <Typography sx={typographyStyle(activeSubMenu, false)}>Stop</Typography>
            </IconButton>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
