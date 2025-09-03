"use client";

import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme, Menu, MenuItem, Collapse } from "@mui/material";
import Link from "next/link";
import { PlayArrowRounded, Pause } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CustomImage from "../CustomImage";
import "./style.css";
import { useMapContext } from "@/app/sinarji/MapContext";
import { url as highTideUrl, hightideLayers } from "@/app/sinarji/ReferensiHighTide";

export default function Navbar({ isPlaying, togglePlay }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("640"));
  const isMobile900 = useMediaQuery(theme.breakpoints.down("900"));
  const isMobile1010 = useMediaQuery(theme.breakpoints.down("1010"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [openSubMenu, setOpenSubMenu] = useState(null); // simpan menu anak yang terbuka
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenSubMenu(null);
  };

  const { handleSelectMenuLayers } = useMapContext();

  const handleSelectMenu = (label) => {
    setSelectedMenu(label);
    handleSelectMenuLayers(label);
    handleClose();
  };

  const menuItems = [
    {
      label: "Elevasi",
      href: "#",
      children: [
        { label: "Referensi High Tide", href: "#" },
        { label: "Referensi MSL", href: "#" },
      ],
    },
    {
      label: "Penurunan Tanah",
      href: "#",
      children: [
        { label: "Laju", href: "#" },
        { label: "Magnitude", href: "#" },
      ],
    },
    {
      label: "Water Table",
      href: "#",
      children: [
        { label: "WT-Akuifer Tertekan 1", href: "#" },
        { label: "WT-Akuifer Tertekan 2", href: "#" },
      ],
    },
    {
      label: "Akuifer",
      href: "#",
      children: [
        { label: "Akuifer Tertekan 1", href: "#" },
        { label: "Akuifer Tertekan 2", href: "#" },
      ],
    },
    {
      label: "Zonasi",
      href: "#",
      children: [
        { label: "Zona Tertekan 1", href: "#" },
        { label: "Zona Tertekan 2", href: "#" },
      ],
    },
    { label: "Intrusi", href: "#", children: [{ label: "Air Laut", href: "#" }] },
    {
      label: "Banjir Fluvia",
      href: "#",
      children: [
        { label: "Skenario Banjir Q5", href: "#" },
        { label: "Skenario Banjir Q25", href: "#" },
        { label: "Skenario Banjir Q50", href: "#" },
      ],
    },
    {
      label: "Banjir ROB",
      href: "#",
      children: [
        { label: "Skenario Tanpa Tanggul", href: "#" },
        { label: "Skenario Dengan Tanggul", href: "#" },
      ],
    },
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
      {/* Logo */}
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          marginLeft: isMobile ? "auto" : "0",
          width: isMobile900 ? null : "100%",
        }}
      >
        <Link href="/">
          <CustomImage
            src="/assets/logo-jakartasatu-orange.png"
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{
              width: isMobile ? "40vw" : "180px",
              maxWidth: "180px",
              height: "auto",
              display: "flex",
              alignItems: "center",
            }}
          />
        </Link>
      </Box>

      {/* Judul Tengah */}
      <Typography
        variant="p"
        sx={{
          display: isMobile1010 ? "none" : "block",
          color: "var(--jakartasatu-biru)",
          fontSize: "20px",
          fontWeight: "700",
          lineHeight: "150%",
          textAlign: "center",
          width: "300%",
          minWidth: "382px",
        }}
      >
        Sistem Informasi Pengendalian Banjir Rob Pesisir Jakarta Indonesia
      </Typography>

      {/* Play/Pause */}
      <Box
        onClick={togglePlay}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontWeight: "500",
            fontFamily: "var(--font-family)",
            fontSize: "18px",
            color: isPlaying ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)",
          }}
        >
          {isPlaying ? "Stop Play" : "Play"}
        </Typography>
        {isPlaying ? (
          <Pause
            sx={{
              fontSize: "34.2px",
              color: isPlaying ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)",
            }}
          />
        ) : (
          <PlayArrowRounded
            sx={{
              fontSize: "34.2px",
              color: isPlaying ? "var(--jakartasatu-orange)" : "var(--jakartasatu-biru)",
            }}
          />
        )}
      </Box>

      {/* Dropdown */}
      <Box sx={{ minWidth: "200px", textAlign: "right" }}>
        {/* Trigger */}
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
              fontSize: "18px",
              color: "var(--jakartasatu-biru)",
            }}
          >
            Peta SINARJI
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
                      fontSize: "0.95rem",
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
                      backgroundColor: "rgba(0,0,0,0.08)", // blok merah
                      borderRadius: "10px", // radius biar melengkung
                      mx: "auto",
                      mt: 1,
                      width: "92%", // biar lebih rapih dari parent
                      overflow: "hidden", // biar radius terpotong rapi
                    }}
                  >
                    {item.children.map((child, cIdx) => (
                      <MenuItem
                        key={cIdx}
                        onClick={() => handleSelectMenuLayers(item.label, child.label, child.url, child.layers)} // kirim dua argumen
                        sx={{
                          px: 3,
                          py: 1,
                          color: "navy",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.6)", // efek hover putih transparan
                          },
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
