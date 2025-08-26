import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";

const LayerInfo = ({ layer, setInfoLayerOpen }) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "10%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{layer.title}</Typography>
        <IconButton
          onClick={() => setInfoLayerOpen(false)}
          sx={{ width: "36px", height: "36px" }}
          id={`layer-info-content-close-${layer.id}`}
        >
          <Close />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          sx={{
            color: "var(--jakartasatu-biru)",
            fontSize: "22px",
            fontWeight: "400",
            lineHeight: "150%",
            letterSpacing: "-0.456px",
          }}
        >
          Metadata
        </Typography>
        <ul
          style={{
            color: "rgba(0, 0, 0, 0.60)",
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "190%",
            letterSpacing: "-0.38px",

            marginLeft: "25px",
          }}
        >
          <li>
            {layer.customDescription.nama_data && (
              <Typography>{`Nama Data : ${layer.customDescription.nama_data}`}</Typography>
            )}
          </li>
          <li>
            {layer.customDescription.nama_kugi && (
              <Typography>{`Nama Kugi : ${layer.customDescription.nama_kugi}`}</Typography>
            )}
          </li>
          <li>
            {layer.customDescription.deskripsi_data && (
              <Typography>{`Deskripsi : ${layer.customDescription.deskripsi_data}`}</Typography>
            )}
          </li>
          {layer.customDescription.simpul_jaringan && (
            <li>
              <Typography>{`Simpul Jaringan : ${layer.customDescription.simpul_jaringan}`}</Typography>
            </li>
          )}
        </ul>
      </Box>
    </Box>
  );
};

export default LayerInfo;
