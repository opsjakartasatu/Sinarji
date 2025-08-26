"use client";

import "../globals.css";

import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./sidebarDashboard/Header";
import Sidebar from "./sidebarDashboard/Sidebar";
import Footer from "./sidebarDashboard/Footer";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  // width: "100%",
  background: "#F7F6FF",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
  overflowX: "hidden",
}));

export default function RootLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <MainWrapper>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper>
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container
          maxWidth="lg"
          disableGutters
          sx={{ width: "100%" }}
          id="containerLayout"
        >
          <Box
            sx={{
              minHeight: "calc(100vh - 270px)",
              margin: {
                xs: "100px 20px 0 20px",
                sm: "100px 20px 0 20px",
                md: "100px 40px 0 40px",
                lg: "100px 40px 0 40px",
                xl: "100px 40px 0 40px",
              },
            }}
          >
            {children}
          </Box>
        </Container>
        <Footer />
      </PageWrapper>
    </MainWrapper>
  );
}
