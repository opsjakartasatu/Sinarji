import CustomImage from "@/components/CustomImage";
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const APInotFound = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "100vh",
            transform: "translate(-50%, -50%)",
            background: "linear-gradient(170deg, rgba(137, 193, 250, 0.5) 0%,rgba(255, 255, 255, 1) 40%,rgba(255, 255, 255, 1) 50%,rgba(255, 255, 255, 1) 65%,rgba(0, 126, 255, 0.5) 100%)",
        }}>
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                width: "95vw",
                maxWidth: "1200px"
            }}>
                <Grid container
                    spacing={{ xs: 0, sm: 6 }}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                        <CustomImage
                            src='/assets/maintenance.png'
                            alt="Gambar"
                            draggable={false}
                            width={0}
                            height={0}
                            style={{
                                userDrag: "none",
                                userSelect: "none",

                                width: '100%',
                                maxWidth: '449px',
                                height: 'auto',
                            }}
                        />
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Stack direction="column" justifyContent="center" alignItems="flex-start" gap={4}>
                            <Stack direction="row" justifyContent="center" alignItems="center" gap={2} sx={{ marginTop: isMobile ? "50px" : "", }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M24.0002 7.00002C21.1898 6.99532 18.4224 7.69094 15.9482 9.02402C13.3417 10.4301 11.1452 12.4894 9.57425 15H17.0002V19H3.00025V5.00002H7.00025V11.668C8.85844 9.1103 11.2678 7.00302 14.0502 5.50202C17.1078 3.85489 20.5273 2.99502 24.0002 3.00002C35.5982 3.00002 45.0002 12.402 45.0002 24V26H41.0002V24C41.0002 19.4913 39.2092 15.1673 36.0211 11.9792C32.8329 8.79109 28.5089 7.00002 24.0002 7.00002ZM26.0002 12V23.172L29.3282 26.5L26.5002 29.328L22.0002 24.828V12H26.0002ZM6.88425 23.802L7.09225 25.792C7.53529 29.9673 9.50764 33.831 12.6294 36.6389C15.7512 39.4468 19.8015 41.0002 24.0002 41H26.0002V45H24.0002C13.1462 45 4.22025 36.77 3.11425 26.208L2.90625 24.22L6.88425 23.802ZM39.0002 28.01V30.29C40.0662 30.608 41.0262 31.17 41.8122 31.916L43.7902 30.776L45.7902 34.238L43.8102 35.382C44.0638 36.4492 44.0638 37.5609 43.8102 38.628L45.7902 39.77L43.7902 43.234L41.8062 42.09C41.0107 42.8423 40.0496 43.3972 39.0002 43.71V46H35.0002V43.71C33.9503 43.3975 32.9884 42.8425 32.1922 42.09L30.2082 43.234L28.2082 39.77L30.1882 38.626C29.9346 37.5596 29.9346 36.4485 30.1882 35.382L28.2082 34.24L30.2082 30.776L32.1882 31.916C32.985 31.1608 33.9483 30.6038 35.0002 30.29V28.01H39.0002ZM37.0002 34C36.2046 34 35.4415 34.3161 34.8789 34.8787C34.3163 35.4413 34.0002 36.2044 34.0002 37C34.0002 37.7957 34.3163 38.5587 34.8789 39.1213C35.4415 39.6839 36.2046 40 37.0002 40C37.7959 40 38.559 39.6839 39.1216 39.1213C39.6842 38.5587 40.0002 37.7957 40.0002 37C40.0002 36.2044 39.6842 35.4413 39.1216 34.8787C38.559 34.3161 37.7959 34 37.0002 34Z" fill='var(--jakartasatu-biru)' />
                                </svg>
                                <Typography variant="p"
                                    style={{
                                        textAlign: "left",
                                        color: 'var(--jakartasatu-biru)',
                                        fontSize: isMobile ? "30px" : "40px",
                                        fontWeight: "600",
                                    }}>
                                    Pemeliharaan Sistem
                                </Typography>
                            </Stack>
                            <Typography variant="p"
                                style={{
                                    textAlign: "left",
                                    color: "rgba(0, 0, 0, 0.70)",
                                    fontSize: isMobile ? "18px" : "22px",
                                    fontWeight: "600",
                                    lineHeight: "170%",
                                }}>
                                Halo sobat Jakarta Satu,
                            </Typography>
                            <Typography variant="p"
                                style={{
                                    textAlign: "left",
                                    color: "rgba(0, 0, 0, 0.70)",
                                    fontSize: isMobile ? "18px" : "22px",
                                    fontWeight: "500",
                                    lineHeight: "180%",
                                }}>
                                Mohon maaf saat ini kami sedang dalam perbaikan dan peningkatan sistem pada portal Jakarta Satu, sehingga untuk sementara ini belum dapat diakses.
                            </Typography>
                            <Button
                                onClick={handleReload}
                                style={{
                                    width: "234px",
                                    height: "57px",
                                    fontWeight: "600",
                                    letterSpacing: "2px",
                                    color: "white",
                                    backgroundColor: 'var(--jakartasatu-orange)',
                                    fontSize: "24px",
                                    borderRadius: "30px",
                                    padding: "10px 20px 10px 20px",
                                    border: "none",
                                    textTransform: "none",
                                    boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
                                }}>
                                Reload
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};

export default APInotFound;