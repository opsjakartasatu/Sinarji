"use client";

import {
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
} from "@mui/material";
import { Box, IconButton, Popover } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({
  onLayerChange,
  showBuildings,
  showDamGate,
  showFloodAreaAll,
  showStreet,
  basemap,
  onBasemapChange,
}) => {
  const [layerAnchorEl, setLayerAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setLayerAnchorEl(event.currentTarget);
  };

  const handleLayerMenuClose = () => {
    setLayerAnchorEl(null);
  };

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
    <Box
      sx={{
        width: "95%",
        maxWidth: "95%",
        height: { xs: 60, sm: 72 },
        position: "absolute",
        top: { xs: 10, sm: 20 },
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 4 },
        bgcolor: "rgba(255, 255, 255, 0.95)",
        borderRadius: { xs: "30px", sm: "36px" },
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          gap: { xs: "0.1rem", sm: "0.2rem", md: "0.3rem" },
        }}
      >
        <Image
          src="/geoportal/assets/jaya-raya.png"
          alt="Jakarta Smart City Logo"
          width={100}
          height={30}
          style={{
            objectFit: "contain",
            width: "auto",
            height: "auto",
            maxWidth: "100px",
            maxHeight: "40px",
          }}
        />
        <Image
          src="/geoportal/assets/citata.png"
          alt="Jakarta Smart City Logo"
          width={100}
          height={30}
          style={{
            objectFit: "contain",
            width: "auto",
            height: "auto",
            maxWidth: "100px",
            maxHeight: "40px",
          }}
        />
        <Image
          src="/geoportal/assets/dsda2.png"
          alt="Jakarta Smart City Logo"
          width={100}
          height={30}
          style={{
            objectFit: "contain",
            width: "auto",
            height: "auto",
            maxWidth: "100px",
            maxHeight: "40px",
          }}
        />
        <Image
          src="/geoportal/assets/jakartasatu.png"
          alt="Jakarta Smart City Logo"
          width={100}
          height={30}
          style={{
            objectFit: "contain",
            width: "auto",
            height: "auto",
            maxWidth: "100px",
            maxHeight: "40px",
          }}
        />
      </Box>

      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)", // bener-bener center
          color: "#21366e",
          fontSize: { xs: "0.7rem", sm: "1rem", md: "1.2rem" },
          whiteSpace: "normal",
          textAlign: "center",
        }}
      >
        PETA SIMULASI BANJIR JAKARTA - REALTIME
      </Typography>
    </Box>
  );
};

export default Header;
