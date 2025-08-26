import { Box, Typography } from "@mui/material";

const DBI = ({ data }) => {
  return (
    <Box
      sx={{
        display: data === "DBI" ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Typography variant="p">
        Dry Built-up Index is a spectral index which focuses on identifying
        built-up areas in dry climates. Dry Built-up Index can be use for Urban
        expansion monitoring, Land cover classification, and Urban heat island
        studies. The DBI's formula:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", paddingRight: "10px" }}
        >
          <i>DBI =</i>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              borderBottom: "1px solid black",
              height: "50px",
              paddingBottom: "3px",
            }}
          >
            <i>{"(SWIR1 - Green)"}</i>
          </Box>
          <Box sx={{ paddingTop: "3px" }}><i>{"(SWIR1 + Green)"}</i></Box>
        </Box>
      </Box>
      <Box>
        Details: <br /> • SWIR1 : Shortwave Infrared band 1 <br /> • Green :
        Green band
      </Box>
    </Box>
  );
};

export default DBI;
