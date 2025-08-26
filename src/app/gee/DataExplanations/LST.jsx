import { Box, Typography } from "@mui/material";

const LST = ({ data }) => {
  return (
    <Box
      sx={{
        display: data === "LST" ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Typography variant="p">
        Land Surface Temperature (LST) represents the temperature of the Earth's
        surface as recorded from a satellite sensor. It is essential for
        advancing research in global climate change, understanding urban
        environments, and refining geophysical and biophysical models of
        climate, hydrology, and ecology. The LST's formula:
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
          <i>LST =</i>
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
              height: "50px",
              paddingBottom: "3px",
            }}
          >
            <i>{"BT"}</i>
          </Box>
          <Box sx={{ paddingTop: "3px", borderTop: "1px solid black" }}>
          <i>{"(1 + (0.00115 x BT / 1.4388) x Ln(E))"}</i>
          </Box>
        </Box>
      </Box>
      <Box>
        Details: <br /> • LST : Land Surface Temperature <br /> • BT : Top of
        atmosphere brightness temperature <br /> • E : Land surface emissivity
      </Box>
    </Box>
  );
};

export default LST;
