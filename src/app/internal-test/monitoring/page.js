"use client";

import { motion } from "framer-motion";

import styles from "../../page.module.css";
import Footer from "@/components/footer/footer";
import KritikSaran from "@/components/kritikSaran";
import ScrollTop from "@/components/scrollTop";

import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from "@/components/CustomImage";
import Dashboard from "./Dashboard";

function monitoring() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("431"));
  const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
  const isMobile900 = useMediaQuery(theme.breakpoints.down("md"));

  const breadcrumbs = [
    // { label: "Beranda", href: "/" },
    // { label: "Tentang" }
  ];

  useEffect(() => {
    document.title =
      "Monitoring | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
  }, []);

  return (
    <>
      <>
        <Dashboard />
      </>
      <KritikSaran />
      <ScrollTop />
    </>
  );
}

export default monitoring;
