import { Box, Typography } from "@mui/material";

const EVI = ({ data }) => {
  return (
    <Box
      sx={{
        display: data === "EVI" ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Typography variant="p">
        Enhanced Vegetation Index (EVI) is a vegetation index to enhance the
        vegetation signal by filtering out atmospheric and background noise. EVI
        is better at detecting areas with high biomass and dense vegetation. The
        EVI'S formula:
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
          <i>EVI = G x</i>
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
            <i>{"(NIR - R)"}</i>
          </Box>
          <Box sx={{ paddingTop: "3px", borderTop: "1px solid black" }}>
          <i>{"(NIR + C1 x R – C2 x B + L)"}</i>
          </Box>
        </Box>
      </Box>
      <Box>
        Details: <br /> • EVI: Enhanced Vegetation Index <br /> • NIR:
        Near-infrared reflectance <br /> • R: Red reflectance <br /> • B: Blue
        reflectance <br /> • G: Gain factor <br /> • C1: Coefficient for red
        band <br /> • C2: Coefficient for blue band <br /> • L: Soil background
        adjustment
      </Box>
    </Box>
  );
};

export default EVI;
