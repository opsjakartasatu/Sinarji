"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const GaleriRtlh = ({ slug }) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [folderName, setFolderName] = useState("");
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 601px) and (max-width: 900px)"
  );
  
  useEffect(() => {
    if (!slug || !Array.isArray(slug)) {
      console.error("Invalid slug:", slug);
      setLoading(false);
      return;
    }
    
    const fetchedFolder = async () => {
      try {
        const folder = slug[0];
        setFolderName(folder);
        
        const apiUrl = `${process.env.BASE_URL}/api/minio/${folder}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        setImages(data.images);
        console.log(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchedFolder();
  }, [slug]);
  
  return (
    <Box
    sx={{
      textAlign: "center",
      fontFamily: "Inter",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #D3E8FD, white)",
    }}
    >
    <Typography
    variant="h4"
    sx={{ color: "#013577", fontWeight: "800", margin: "30px auto" }}
    >
    📂 Galeri Gambar
    </Typography>
    
    {loading ? (
      <CircularProgress sx={{ color: "#1E293B", margin: "20px auto" }} />
    ) : images.length === 0 ? (
      <Typography variant="body1" gutterBottom sx={{ color: "red" }}>
      🚫 Tidak ada gambar dalam folder ini.
      </Typography>
    ) : (
      <ImageList
      sx={{
        width: "100%",
        maxWidth: "100%",
        padding: "10px",
        display: "grid",
        gap: 10,
        justifyContent: "center",
      }}
      cols={isSmallScreen ? 1 : isMediumScreen ? 3 : 4}
      rowHeight="auto"
      >
      {images.map((image, index) => (
        <ImageListItem
        key={index}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
        <img
        src={`${process.env.BASE_URL}/api/minio/${folderName}?imageName=${image}`}
        alt={`Gambar ${index}`}
        loading="lazy"
        style={{
          width: "100%",
          maxWidth: "320px",
          height: "400px",
          borderRadius: "5px",
          objectFit: "cover",
          // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        />
        </ImageListItem>
      ))}
      </ImageList>
    )}
    </Box>
  );
};

export default GaleriRtlh;