import React from "react";
import { Box, Typography } from "@mui/material";
import WaterIcon from "@mui/icons-material/Water";
import HomeIcon from "@mui/icons-material/Home";
import WarningIcon from "@mui/icons-material/Warning";

const StatistikCard = ({ icon, title, children }) => (
  <Box
    sx={{
      maxWidth: { xs: "80%", sm: 600 },
      minHeight: 140,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderRadius: 2,
      overflow: "hidden",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      flex: { xs: "1 1 auto", sm: "0 0 auto" },
    }}
  >
    <Box
      sx={{
        backgroundColor: "rgba(13, 42, 90, 0.8)",
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: { xs: 1.5, sm: 2 },
        py: { xs: 0.75, sm: 1 },
        justifyContent: "Center",
      }}
    >
      {icon}
      <Typography
        variant="subtitle1"
        sx={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: { xs: "0.8rem", sm: "0.95rem" },
        }}
      >
        {title}
      </Typography>
    </Box>
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      {children}
    </Box>
  </Box>
);

const Statistik = ({
  totalLuasGenangan,
  jumlahBangunanTerdampak,
  jumlah_kk,
  luas_bangunan,
  luasJalanTergenang,
  ruas_jalan,
}) => {
  // Format to 3 decimal places (assuming input is already in km²)
  const formatArea = (value) =>
    value !== undefined && value !== null ? value.toFixed(5) : "0.00000";

  const formatNumber = (value) =>
    value !== undefined && value !== null ? value.toLocaleString("id-ID") : "0";

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1, sm: 2 },
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: { xs: "nowrap", sm: "nowrap" },
        justifyContent: { xs: "flex-start", sm: "flex-end" },
        alignItems: { xs: "stretch", sm: "flex-end" },
        backgroundColor: "rgba(13, 42, 90, 0.00)",
        padding: { xs: 1.5, sm: 2 },
        borderRadius: 3,
        width: { xs: "95%", sm: "auto" },
        maxWidth: { xs: "100%", sm: "none" },
      }}
    >
      <StatistikCard
        title="Area Banjir"
        icon={
          <WaterIcon
            sx={{ color: "#fff", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          />
        }
      >
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          Luas Genangan
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="primary"
          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          {formatArea(totalLuasGenangan)} KM²
        </Typography>
      </StatistikCard>

      <StatistikCard
        title="Rumah Terdampak"
        icon={
          <HomeIcon
            sx={{ color: "#fff", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          />
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: { xs: 0.5, sm: 2 },
            width: "100%",
            textAlign: "center",
          }}
        >
          <Box flex={1}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Jumlah Rumah
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              {formatNumber(jumlahBangunanTerdampak)}
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              KK (Kepala Keluarga)
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              {formatNumber(jumlah_kk)}
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}
            >
              Luas Bangunan
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              {formatArea(luas_bangunan)} KM²
            </Typography>
          </Box>
        </Box>
      </StatistikCard>

      <StatistikCard
        title="Jalan Tergenang"
        icon={
          <WarningIcon
            sx={{ color: "#fff", fontSize: { xs: "1rem", sm: "1.25rem" } }}
          />
        }
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: { xs: 0.5, sm: 2 },
            width: "100%",
            textAlign: "center",
          }}
        >
          <Box flex={1}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Jumlah Jalan
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              {formatNumber(ruas_jalan)}
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              Luas Jalan
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              {formatArea(luasJalanTergenang)} KM²
            </Typography>
          </Box>
        </Box>
      </StatistikCard>
    </Box>
  );
};

export default Statistik;
