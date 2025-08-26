import {
  Box,
  Button,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Delete, ModeEdit } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";

const Intensitas = ({klb, setKLB, kdb, setKDB, kdh, setKDH, ldb, setLDB, llb, setLLB, jlb, setJLB, lh, setLH}) => {
  const [luas, setLuas] = useState(0);

  const calculateIntensitas = (luas, kdb, klb, kdh) => {
    let totalLDB = luas * (kdb / 100);
    totalLDB = totalLDB.toFixed(2);
    if (isNaN(totalLDB)) {
      const zero = 0;
      setLDB(zero.toFixed(2));
    } else {
      setLDB(totalLDB);
    }

    let totalLLB = luas * klb;
    totalLLB = totalLLB.toFixed(2);
    if (isNaN(totalLLB)) {
      const zero = 0;
      setLLB(zero.toFixed(2));
    } else {
      setLLB(totalLLB);
    }

    let lantaibangunan = totalLLB / totalLDB;
    lantaibangunan = Math.floor(lantaibangunan);
    if (isNaN(lantaibangunan)) {
      const zero = 0;
      setJLB(zero.toFixed(2));
    } else {
      setJLB(lantaibangunan);
    }

    let totalLH = luas * (kdh / 100);
    totalLH = totalLH.toFixed(2);
    if (isNaN(totalLH)) {
      const zero = 0;
      setLH(zero.toFixed(2));
    } else {
      setLH(totalLH);
    }
  };

  const clearIntensitas = () => {
    setLuas(0);
    setKLB(0);
    setKDB(0);
    setKDH(0);
    setLDB();
    setLLB();
    setJLB();
    setLH();
    document.getElementById("input-klb").value = 0;
    document.getElementById("input-kdb").value = 0;
    document.getElementById("input-kdh").value = 0;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "5%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "60%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "30%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Box sx={{ height: "25%", display: "flex", alignItems: "center" }}>
              <Typography
                variant="p"
                sx={{
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 500,
                  color: "var(--jakartasatu-biru)",
                }}
              >
                Luas Lahan
              </Typography>
            </Box>
            <Box sx={{ height: "25%", display: "flex", alignItems: "center" }}>
              <Typography
                variant="p"
                sx={{
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 500,
                  color: "var(--jakartasatu-biru)",
                }}
              >
                KLB
              </Typography>
            </Box>
            <Box sx={{ height: "25%", display: "flex", alignItems: "center" }}>
              <Typography
                variant="p"
                sx={{
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 500,
                  color: "var(--jakartasatu-biru)",
                }}
              >
                KDB
              </Typography>
            </Box>
            <Box sx={{ height: "25%", display: "flex", alignItems: "center" }}>
              <Typography
                variant="p"
                sx={{
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 500,
                  color: "var(--jakartasatu-biru)",
                }}
              >
                KDH
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "50%", height: "100%" }}>
            <Box sx={{ height: "25%", display: "flex", alignItems: "center" }}>
              <OutlinedInput
                type="text"
                value={luas}
                onChange={(e) => setLuas(e.target.value)}
                sx={{
                  fontFamily: "__Inter_c128ca",
                  fontSize: "0.9em",
                  width: "100%",
                  maxWidth: "900px",
                  height: "30px",
                  paddingLeft: "1%",
                  borderRadius: "8px",
                  background: "white",
                  border: "1px solid rgba(0, 53, 119, 0.30)",
                }}
              />
              {/* <TextField variant='outlined' size='small' value={luas} inputMode='numeric' disabled /> */}
            </Box>
            <Box sx={{ height: "25%", display: "flex", alignItems: "center" }}>
              <OutlinedInput
                type="text"
                value={klb}
                id="input-klb"
                onChange={(e) => setKLB(e.target.value)}
                sx={{
                  fontFamily: "__Inter_c128ca",
                  fontSize: "0.9em",
                  width: "100%",
                  maxWidth: "900px",
                  height: "30px",
                  paddingLeft: "1%",
                  borderRadius: "8px",
                  background: "white",
                  border: "1px solid rgba(0, 53, 119, 0.30)",
                }}
              />
              {/* <TextField variant='outlined' size='small' value={klb} onChange={(e) => setKLB(e.target.value)} id='input-klb' sx={{ fontFamily: 'var(--font-family)' }} /> */}
            </Box>
            <Box sx={{ height: "25%", display: "flex", alignItems: "center" }}>
              <OutlinedInput
                type="text"
                value={kdb}
                id="input-kdb"
                onChange={(e) => setKDB(e.target.value)}
                sx={{
                  fontFamily: "__Inter_c128ca",
                  fontSize: "0.9em",
                  width: "100%",
                  maxWidth: "900px",
                  height: "30px",
                  paddingLeft: "1%",
                  borderRadius: "8px",
                  background: "white",
                  border: "1px solid rgba(0, 53, 119, 0.30)",
                }}
              />
              {/* <TextField variant='outlined' size='small' value={kdb} onChange={(e) => setKDB(e.target.value)} id='input-kdb' sx={{ fontFamily: 'var(--font-family)' }} /> */}
            </Box>
            <Box sx={{ height: "25%", display: "flex", alignItems: "center" }}>
              <OutlinedInput
                type="text"
                value={kdh}
                id="input-kdh"
                onChange={(e) => setKDH(e.target.value)}
                sx={{
                  fontFamily: "__Inter_c128ca",
                  fontSize: "0.9em",
                  width: "100%",
                  maxWidth: "900px",
                  height: "30px",
                  paddingLeft: "1%",
                  borderRadius: "8px",
                  background: "white",
                  border: "1px solid rgba(0, 53, 119, 0.30)",
                }}
              />
              {/* <TextField variant='outlined' size='small' value={kdh} onChange={(e) => setKDH(e.target.value)} id='input-kdh' sx={{ fontFamily: 'var(--font-family)' }} /> */}
            </Box>
          </Box>
          <Box sx={{ width: "20%", height: "100%" }}>
            <Box
              sx={{
                height: "25%",
                display: "flex",
                alignItems: "center",
                padding: 1,
              }}
            >
              <Typography sx={{ fontFamily: "var(--font-family)", }}>
                m<sup>2</sup>
              </Typography>
            </Box>

          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "15%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: "114px",
              height: "36px",
              borderRadius: "30px",
              backgroundColor: "#07975C",
              textTransform: "none",
              fontSamily: "inherit",
              fontSize: "16px",
              fontWeight: "600",

              "&:hover": {
                backgroundColor: "#07975C",
              },
            }}
            onClick={() => calculateIntensitas(luas, kdb, klb, kdh)}
          >
            Hitung
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "40%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              rowGap: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                columnGap: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M12.5 21.5L3.5 12.5L12.5 3.5L21.5 12.5L12.5 21.5ZM5.15333 12.5L12.5 19.8467L19.8467 12.5L12.5 5.15333L5.15333 12.5Z"
                  fill="url(#paint0_linear_16876_49)"
                />
                <path
                  d="M12.5007 17.599L7.40234 12.5007L12.5007 7.40234L17.599 12.5007L12.5007 17.599ZM9.05234 12.5007L12.5007 15.949L15.949 12.5007L12.5007 9.05234L9.05234 12.5007Z"
                  fill="url(#paint1_linear_16876_49)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_16876_49"
                    x1="3.50333"
                    y1="12.5"
                    x2="21.4967"
                    y2="12.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFE900" />
                    <stop offset="1" stop-color="#FF5A13" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_16876_49"
                    x1="7.40234"
                    y1="0.000677641"
                    x2="17.599"
                    y2="0.000677641"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFE900" />
                    <stop offset="1" stop-color="#FF5A13" />
                  </linearGradient>
                </defs>
              </svg>
              <Typography
                variant="p"
                sx={{
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 600,
                  color: "black",
                }}
              >
                Luas Dasar Bangunan (m2) :
              </Typography>
              <Tooltip
                title={
                  "Luas Dasar Bangunan = Luas Lahan * (Koefisien Dasar Bangunan / 100)"
                }
                enterTouchDelay={0}
                leaveTouchDelay={3000}
                placement="top-end"
              >
                <InfoIcon sx={{ color: "darkgray" }} />
              </Tooltip>
            </Box>
            <Box
              sx={{
                margin: "10px",
                width: "fit-content",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  left: "26px",
                  position: "absolute",
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 600,
                  background: ldb ? "var(--jakartasatu-biru)" : "transparent",
                  padding: "3px 10px",
                  borderRadius: "8px",
                }}
              >
                {ldb}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                columnGap: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M12.5 21.5L3.5 12.5L12.5 3.5L21.5 12.5L12.5 21.5ZM5.15333 12.5L12.5 19.8467L19.8467 12.5L12.5 5.15333L5.15333 12.5Z"
                  fill="url(#paint0_linear_16876_49)"
                />
                <path
                  d="M12.5007 17.599L7.40234 12.5007L12.5007 7.40234L17.599 12.5007L12.5007 17.599ZM9.05234 12.5007L12.5007 15.949L15.949 12.5007L12.5007 9.05234L9.05234 12.5007Z"
                  fill="url(#paint1_linear_16876_49)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_16876_49"
                    x1="3.50333"
                    y1="12.5"
                    x2="21.4967"
                    y2="12.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFE900" />
                    <stop offset="1" stop-color="#FF5A13" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_16876_49"
                    x1="7.40234"
                    y1="0.000677641"
                    x2="17.599"
                    y2="0.000677641"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFE900" />
                    <stop offset="1" stop-color="#FF5A13" />
                  </linearGradient>
                </defs>
              </svg>
              <Typography
                variant="p"
                sx={{
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 600,
                  color: "black",
                }}
              >
                Luas Lantai Bangunan (m2) :
              </Typography>
              <Tooltip
                title={
                  "Luas Lantai Bangunan = Luas Lahan * Koefisien Luas Bangunan"
                }
                enterTouchDelay={0}
                leaveTouchDelay={3000}
                placement="top-end"
              >
                <InfoIcon sx={{ color: "darkgray" }} />
              </Tooltip>
            </Box>
            <Box
              sx={{
                margin: "10px",
                width: "fit-content",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="p"
                sx={{
                  left: "26px",
                  position: "absolute",
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 600,
                  background: llb ? "var(--jakartasatu-biru)" : "transparent",
                  padding: "3px 10px",
                  borderRadius: "8px",
                }}
              >
                {llb}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                columnGap: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M12.5 21.5L3.5 12.5L12.5 3.5L21.5 12.5L12.5 21.5ZM5.15333 12.5L12.5 19.8467L19.8467 12.5L12.5 5.15333L5.15333 12.5Z"
                  fill="url(#paint0_linear_16876_49)"
                />
                <path
                  d="M12.5007 17.599L7.40234 12.5007L12.5007 7.40234L17.599 12.5007L12.5007 17.599ZM9.05234 12.5007L12.5007 15.949L15.949 12.5007L12.5007 9.05234L9.05234 12.5007Z"
                  fill="url(#paint1_linear_16876_49)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_16876_49"
                    x1="3.50333"
                    y1="12.5"
                    x2="21.4967"
                    y2="12.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFE900" />
                    <stop offset="1" stop-color="#FF5A13" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_16876_49"
                    x1="7.40234"
                    y1="0.000677641"
                    x2="17.599"
                    y2="0.000677641"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFE900" />
                    <stop offset="1" stop-color="#FF5A13" />
                  </linearGradient>
                </defs>
              </svg>
              <Typography
                variant="p"
                sx={{
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 600,
                  color: "black",
                }}
              >
                Jumlah Lantai Bangunan :
              </Typography>
              <Tooltip
                title={
                  "Lantai Bangunan = Luas Lantai Bangunan / Luas Dasar Bangunan"
                }
                enterTouchDelay={0}
                leaveTouchDelay={3000}
                placement="top-end"
              >
                <InfoIcon sx={{ color: "darkgray" }} />
              </Tooltip>
            </Box>
            <Box
              sx={{
                margin: "10px",
                width: "fit-content",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="p"
                sx={{
                  left: "26px",
                  position: "absolute",
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 600,
                  background: jlb ? "var(--jakartasatu-biru)" : "transparent",
                  padding: "3px 10px",
                  borderRadius: "8px",
                }}
              >
                {jlb}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                columnGap: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M12.5 21.5L3.5 12.5L12.5 3.5L21.5 12.5L12.5 21.5ZM5.15333 12.5L12.5 19.8467L19.8467 12.5L12.5 5.15333L5.15333 12.5Z"
                  fill="url(#paint0_linear_16876_49)"
                />
                <path
                  d="M12.5007 17.599L7.40234 12.5007L12.5007 7.40234L17.599 12.5007L12.5007 17.599ZM9.05234 12.5007L12.5007 15.949L15.949 12.5007L12.5007 9.05234L9.05234 12.5007Z"
                  fill="url(#paint1_linear_16876_49)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_16876_49"
                    x1="3.50333"
                    y1="12.5"
                    x2="21.4967"
                    y2="12.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFE900" />
                    <stop offset="1" stop-color="#FF5A13" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_16876_49"
                    x1="7.40234"
                    y1="0.000677641"
                    x2="17.599"
                    y2="0.000677641"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFE900" />
                    <stop offset="1" stop-color="#FF5A13" />
                  </linearGradient>
                </defs>
              </svg>
              <Typography
                variant="p"
                sx={{
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 600,
                  color: "black",
                }}
              >
                Lahan Hijau :
              </Typography>
              <Tooltip
                title={
                  "Lahan Hijau = Luas Lahan * (Koefisien Dasar Hijau / 100)"
                }
                enterTouchDelay={0}
                leaveTouchDelay={3000}
                placement="top-end"
              >
                <InfoIcon sx={{ color: "darkgray" }} />
              </Tooltip>
            </Box>
            <Box
              sx={{
                margin: "10px",
                width: "fit-content",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="p"
                sx={{
                  left: "26px",
                  position: "absolute",
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "var(--font-family)",
                  fontWeight: 600,
                  background: lh ? "var(--jakartasatu-biru)" : "transparent",
                  padding: "3px 10px",
                  borderRadius: "8px",
                }}
              >
                {lh}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "70px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: "114px",
              height: "36px",
              borderRadius: "30px",
              backgroundColor: "#F32013",
              textTransform: "none",
              fontSamily: "inherit",
              fontSize: "16px",
              fontWeight: "600",

              "&:hover": {
                backgroundColor: "#F32013",
              },
            }}
            onClick={clearIntensitas}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Intensitas;
