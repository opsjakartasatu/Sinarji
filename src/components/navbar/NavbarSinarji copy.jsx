"use client";

import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme, Menu, MenuItem, Collapse } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Compare from "@mui/icons-material/Compare";
import CustomImage from "../CustomImage";
import "./style.css";
import { useMapContext } from "@/app/sinarji/MapContext";

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("640"));
  const isMobile900 = useMediaQuery(theme.breakpoints.down("900"));
  const isMobile1010 = useMediaQuery(theme.breakpoints.down("1010"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { isCompareMode, setIsCompareMode } = useMapContext();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenSubMenu(null);
  };

  // ambil state dari Context
  const { handleSelectMenuLayers, activeSubMenu, isPlaying, startPlay, stopPlay } = useMapContext();

  const handleSelectMenu = (label) => {
    setSelectedMenu(label);
    handleSelectMenuLayers(label);
    handleClose();
  };

  const menuItems = [
    { label: "Elevasi", children: [{ label: "Referensi High Tide" }, { label: "Referensi MSL" }] },
    { label: "Penurunan Tanah", children: [{ label: "Laju" }, { label: "Magnitude" }] },
    { label: "Water Table", children: [{ label: "WT-Akuifer Tertekan 1" }, { label: "WT-Akuifer Tertekan 2" }] },
    { label: "Akuifer", children: [{ label: "Akuifer Tertekan 1" }, { label: "Akuifer Tertekan 2" }] },
    { label: "Zonasi", children: [{ label: "Zona Tertekan 1" }, { label: "Zona Tertekan 2" }] },
    { label: "Intrusi", children: [{ label: "Air Laut" }] },
    { label: "Banjir Fluvia", children: [{ label: "Skenario Banjir Q5" }, { label: "Skenario Banjir Q25" }, { label: "Skenario Banjir Q50" }] },
    { label: "Banjir ROB", children: [{ label: "Skenario Tanpa Tanggul" }, { label: "Skenario Dengan Tanggul" }] },
  ];

  return (
    <div
      className="navbarSinarji"
      style={{
        width: "90vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo Jakarta Satu */}
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <CustomImage
          src="/assets/logo-jakartasatu-orange.png"
          alt="Logo Jakarta Satu"
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{
            width: isMobile ? "40vw" : "180px",
            maxWidth: "180px",
            height: "auto",
          }}
        />
      </Box>

      {/* Logo DSDA */}
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
        }}
      >
        <CustomImage
          src="/logodsda.png"
          alt="Logo DSDA"
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{
            width: isMobile ? "40vw" : "100px",
            maxWidth: "100px",
            height: "auto",
          }}
        />
      </Box>

      {/* Judul Tengah */}
      <Typography
        variant="p"
        sx={{
          display: isMobile1010 ? "none" : "block",
          color: "var(--jakartasatu-biru)",
          fontSize: "18px",
          fontWeight: "700",
          lineHeight: "150%",
          textAlign: "center",
          width: "300%",
          minWidth: "382px",
        }}
      >
        Sistem Informasi Pengendalian Banjir Rob Pesisir Jakarta Indonesia
      </Typography>

      {/* Compare */}
      <Box sx={{ minWidth: "120px", textAlign: "center" }}>
        <Box
          onClick={() => setIsCompareMode((prev) => !prev)}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              fontFamily: "var(--font-family)",
              fontSize: "16px",
              color: "var(--jakartasatu-biru)",
            }}
          >
            {isCompareMode ? "Stop Compare" : "Compare"}
          </Typography>
          <Compare
            sx={{
              color: isCompareMode ? "var(--jakartasatu-biru)" : "var(--jakartasatu-biru)",
            }}
          />
        </Box>
      </Box>

      {/* Dropdown */}
      <Box sx={{ minWidth: "160px", textAlign: "right" }}>
        <Box
          onClick={handleClick}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              fontFamily: "var(--font-family)",
              fontSize: "16px",
              color: "var(--jakartasatu-biru)",
            }}
          >
            Katergori Peta
          </Typography>
          {open ? <ArrowDropUpIcon sx={{ fontSize: "28px", color: "var(--jakartasatu-biru)" }} /> : <ArrowDropDownIcon sx={{ fontSize: "28px", color: "var(--jakartasatu-biru)" }} />}
        </Box>

        {/* Menu utama */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            autoFocusItem: false,
            disablePadding: true,
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            elevation: 4,
            sx: {
              borderRadius: "12px",
              mt: 2,
              ml: 2,
              py: 1,
              width: 220,
            },
          }}
        >
          {menuItems.map((item, idx) => (
            <Box key={idx}>
              <MenuItem
                onClick={() => {
                  if (item.children) {
                    setOpenSubMenu(openSubMenu === idx ? null : idx);
                  } else {
                    handleSelectMenu(item.label);
                  }
                }}
                selected={selectedMenu === item.label}
                autoFocus={false}
                disableRipple
                sx={{
                  p: 0,
                  "&:hover": { backgroundColor: "transparent" },
                  "&.Mui-selected": { backgroundColor: "transparent" },
                  "&:hover .hoverArea": { backgroundColor: "rgba(0,0,0,0.08)" },
                  "&.Mui-selected .hoverArea": {
                    backgroundColor: "rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Box
                  className="hoverArea"
                  sx={{
                    width: "90%",
                    mx: "auto",
                    px: "14px",
                    py: "8px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: selectedMenu === item.label ? 600 : 500,
                      fontSize: "16px",
                      fontFamily: "var(--font-family)",
                      color: "var(--jakartasatu-biru)",
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item.children && (openSubMenu === idx ? <ArrowDropUpIcon sx={{ fontSize: "22px", color: "var(--jakartasatu-biru)" }} /> : <ArrowDropDownIcon sx={{ fontSize: "22px", color: "var(--jakartasatu-biru)" }} />)}
                </Box>
              </MenuItem>

              {/* Children */}
              {item.children && (
                <Collapse in={openSubMenu === idx} timeout="auto" unmountOnExit>
                  <Box
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.08)",
                      borderRadius: "10px",
                      mx: "auto",
                      mt: 1,
                      width: "92%",
                      overflow: "hidden",
                    }}
                  >
                    {item.children.map((child, cIdx) => (
                      <MenuItem
                        key={cIdx}
                        onClick={() => {
                          if (isCompareMode) {
                            // update map kiri dan kanan sekaligus
                            handleSelectMenuLayers(item.label, child.label, "left");
                            handleSelectMenuLayers(item.label, child.label, "right");
                          } else {
                            // normal mode
                            handleSelectMenuLayers(item.label, child.label, "main");
                          }
                          handleClose();
                        }}
                        sx={{
                          px: 3,
                          py: 1,
                          color: "navy",
                          "&:hover": { backgroundColor: "rgba(255,255,255,0.6)" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            fontFamily: "var(--font-family)",
                            color: "var(--jakartasatu-biru)",
                          }}
                        >
                          {child.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Box>
                </Collapse>
              )}
            </Box>
          ))}
        </Menu>
      </Box>
    </div>
  );
}
