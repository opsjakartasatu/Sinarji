"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Link,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 900px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const callbackUrl = new URLSearchParams(window.location.search).get(
      "callbackUrl"
    );
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau password salah!");
        console.error("Login error:", res.error);
        return;
      }

      if (!callbackUrl) {
        router.push("/");
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.body.style = "margin: 0px";
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#F2F5F9",
        padding: isMobile ? "20px" : "0",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "100%" : "1150px",
          height: isSmallScreen ? "auto" : "680px",
          boxShadow: isSmallScreen ? "none" : 2, // ✅ Remove white box for small screens
          borderRadius: isSmallScreen ? "0" : "20px",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isSmallScreen ? "transparent" : "white",
          padding: isMobile ? "30px" : "0",
          position: "relative",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            position: isSmallScreen ? "static" : "absolute",
            top: isSmallScreen ? "0" : "40px",
            left: isSmallScreen ? "0" : "40px",
            textAlign: isSmallScreen ? "center" : "left",
            width: "100%",
            paddingTop: isSmallScreen ? "30px" : "0",
            marginBottom: isSmallScreen ? "50px" : "80px", // 🔥 Increased spacing
          }}
        >
          <Image
            src="./assets/logo-jakartasatu-orange.png"
            width={isSmallScreen ? 200 : 270}
            height={isSmallScreen ? 50 : 75}
            alt="Logo JakartaSatu"
          />
        </Box>

        {/* Form Section */}
        <Box
          sx={{
            width: isMobile ? "100%" : "38%",
            padding: isMobile ? "20px" : "0 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: isMobile ? "80px" : "80px", // ✅ Push form lower on small screens
          }}
        >
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <InputLabel
                sx={{ fontSize: "14px", fontWeight: "500", color: "black" }}
              >
                Email
              </InputLabel>
              <TextField
                required
                fullWidth
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />

              <InputLabel
                sx={{ fontSize: "14px", fontWeight: "500", color: "black" }}
              >
                Password
              </InputLabel>
              <TextField
                required
                fullWidth
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box>{error && <Typography>{error}</Typography>}</Box>
              <FormGroup>
                <FormControlLabel
                  sx={{
                    marginTop: "40px",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                  control={<Checkbox required />}
                  label={
                    <span style={{ fontSize: "14px" }}>
                      Dengan masuk ke aplikasi Jakartasatu, kamu menyetujui
                      segala
                      <Link href="https://jakartasatu.jakarta.go.id/portal/apps/sites/#/terms-of-use">
                        {" "}
                        Syarat dan Ketentuan{" "}
                      </Link>
                      dan
                      <Link href="https://jakartasatu.jakarta.go.id/portal/apps/sites/#/privacy-policy">
                        {" "}
                        Kebijakan Privasi{" "}
                      </Link>
                      Jakartasatu.
                    </span>
                  }
                  labelPlacement="end"
                />
              </FormGroup>

              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "30px",
                  background: "#4E46DC",
                  color: "white",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Login
              </Button>

              <Typography
                variant="body2"
                sx={{
                  marginTop: "5px",
                  color: "#1E293B",
                  fontWeight: "500",
                  textAlign: "left",
                }}
              >
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  sx={{ color: "#6366F1", fontWeight: "500" }}
                >
                  Daftar
                </Link>
              </Typography>
            </Stack>
          </form>
        </Box>

        {/* Hide Monas image on mobile */}
        {!isMobile && (
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Image
              src="./assets/monas.png"
              layout="fill"
              objectFit="cover"
              alt="Monas Image"
            />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default LoginForm;
