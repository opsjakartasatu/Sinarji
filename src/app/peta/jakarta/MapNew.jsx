"use client"

import { useMediaQuery, createTheme, ThemeProvider, Box } from '@mui/material';
import dynamic from 'next/dynamic';

const Desktop = dynamic(() => import("./desktop/Desktop.jsx"), { ssr: false, webpack: false })
const TabletLandscape = dynamic(() => import("./tablet-landscape/TabletLandscape.jsx"), { ssr: false, webpack: false })
const TabletPortrait = dynamic(() => import("./tablet-portrait/TabletPortrait.jsx"), { ssr: false, webpack: false })
const MobilePortrait = dynamic(() => import("./mobile-portrait/MobilePortrait.jsx"), { ssr: false, webpack: false })
const MobileLandscape = dynamic(() => import("./mobile-landscape/MobileLandscape.jsx"), { ssr: false, webpack: false })

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const MapNew = () => {
  const isMobilePortrait = useMediaQuery('(max-width:600px) and (orientation: portrait)');
  const isMobileLandscape = useMediaQuery('(max-width:960px) and (orientation: landscape)');

  const isTabletPortrait = useMediaQuery('(min-width:600px) and (max-width:1366px) and (orientation: portrait)');
  const isTabletLandscape = useMediaQuery('(min-width:600px) and (max-width:1366px) and (orientation: landscape)');

  const isDesktop = useMediaQuery('(min-width:1366px)');

  let screenType = 'unknown';
  if (isMobilePortrait) {
    screenType = 'Mobile Portrait';
  } else if (isMobileLandscape) {
    screenType = 'Mobile Landscape';
  } else if (isTabletPortrait) {
    screenType = 'Tablet Portrait';
  } else if (isTabletLandscape) {
    screenType = 'Tablet Landscape';
  } else if (isDesktop) {
    screenType = 'Desktop';
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {screenType === "Desktop" ? (
          <Desktop />
        ) : screenType === "Tablet Portrait" ? (
          <TabletPortrait />
        ) : screenType === "Tablet Landscape" ? (
          <TabletLandscape />
        ) : screenType === "Mobile Portrait" ? (
          <MobilePortrait />
        ) : (
          <MobileLandscape />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default MapNew;
