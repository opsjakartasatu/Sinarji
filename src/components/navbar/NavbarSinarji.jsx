"use client";

import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import "./style.css";
import { PlayArrowRounded, Pause, Compare, Flip } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DrawerFotoUdara from "./drawerFotoUdara";
import CustomImage from "../CustomImage";

export default function Navbar({ isPlaying, togglePlay, isSwipeMode, toggleSwipeMode, isCompareMode, toggleCompareMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("640"));
  const isMobile900 = useMediaQuery(theme.breakpoints.down("900"));
  const isMobile1010 = useMediaQuery(theme.breakpoints.down("1010"));

  // 👉 Dropdown State
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menu) => {
    setSelectedMenu(menu);
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className="navbarSinarji"
        style={{
          width: isMobile ? "90vw" : "90vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* 👉 Kiri: Logo */}
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            marginLeft: isMobile ? "auto" : "0",
            marginRight: "0",
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
                alignItems: "center",
                display: "flex",
              }}
            />
          </Link>
        </Box>

        {/* 👉 Tengah: Judul */}
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
          Sistem Informasi Pengendalian Banjir
        </Typography>

        {/* Tombol Play/Pause */}
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

        {/* Dropdown Menu */}
        <Box sx={{ minWidth: "200px", textAlign: "right" }}>
          {/* Trigger Dropdown */}
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
                color: open ? "var(--jakartasatu-biru)" : "var(--jakartasatu-biru)",
              }}
            >
              {selectedMenu || "Peta SINARJI"}
            </Typography>
            {open ? (
              <ArrowDropUpIcon
                sx={{
                  fontSize: "28px",
                  color: "var(--jakartasatu-biru)",
                }}
              />
            ) : (
              <ArrowDropDownIcon
                sx={{
                  fontSize: "28px",
                  color: "var(--jakartasatu-biru)",
                }}
              />
            )}
          </Box>

          {/* Dropdown Content */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose("")}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              elevation: 4,
              sx: {
                borderRadius: "12px",
                mt: 2,
                ml: 2,
                width: 200,
                overflow: "hidden", // biar hover rapih
              },
            }}
          >
            {[
              { label: "Elevasi", href: "#" },
              { label: "Penurunan Tanah", href: "#" },
              { label: "Water Table", href: "#" },
              { label: "Akuifer", href: "#" },
              { label: "Zonasi", href: "#" },
              { label: "Intrusi", href: "#" },
              { label: "Banjir Fluvia", href: "#" },
              { label: "Banjir ROB", href: "#" },
            ].map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleClose(item.label)}
                sx={{
                  padding: 0, // hapus padding default
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.05)",
                  },
                }}
              >
                <Link
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    width: "100%", // isi full lebar menu
                    display: "flex", // biar flex rapih
                    alignItems: "center", // sejajar vertikal
                    padding: "8px 14px", // kasih padding kiri
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontFamily: "var(--font-family)",
                      fontSize: "0.95rem",
                      color: selectedMenu === item.label ? "var(--jakartasatu-biru)" : "var(--jakartasatu-biru)",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
    </>
  );
}
