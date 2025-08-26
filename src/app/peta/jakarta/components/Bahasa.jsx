import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";

const Bahasa = ({ buttonSize, tooltip, bahasa, setBahasa }) => {
  const handleSwitchBahasa = (bahasa) => {
    if (bahasa === "ID") {
      setBahasa("EN");
    } else {
      setBahasa("ID");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", borderRadius: 2, backgroundColor: "white", rowGap: 2, width: buttonSize, height: buttonSize }}>
      <Tooltip title="EN" placement={tooltip}>
        <IconButton onClick={() => handleSwitchBahasa(bahasa)} sx={{ height: buttonSize, width: buttonSize, padding: 0, fontSize: "1rem" }}>
          {bahasa === "ID" ? "ID" : "EN"}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Bahasa;
