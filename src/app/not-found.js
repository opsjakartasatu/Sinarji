import CustomImage from "@/components/CustomImage";
import { Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link"

export default function NotFound() {

  return (
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
            src="/assets/not-found-new.png"
            alt="Gambar"
            draggable={false}
            width={0}
            height={0}
            style={{
              userDrag: "none",
              userSelect: "none",

              width: "100%",
              maxWidth: "449px",
              height: "auto",
            }}
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <Stack direction="column" justifyContent="center" alignItems="flex-start" gap={4}>
            <Typography variant="p"
              style={{
                textAlign: "left",
                color: 'var(--jakartasatu-biru)',
                fontSize: "40px",
                fontWeight: "600",
                lineHeight: "150%",
              }}>
              Oops, kami tidak bisa menemukan halaman ini
            </Typography>
            <Typography variant="p"
              style={{
                textAlign: "left",
                color: "rgba(0, 0, 0, 0.70)",
                fontSize: "22px",
                fontWeight: "500",
                lineHeight: "180%",
              }}>
              Maaf, halaman yang kamu cari tidak tersedia
            </Typography>
            <Link href="/"
              style={{
                width: "309px",
                height: "57px",
                fontWeight: "600",
                letterSpacing: "2px",
                color: "white",
                backgroundColor: 'var(--jakartasatu-orange)',
                fontSize: "22px",
                lineHeight: "150%",
                letterSpacing: "-0.418px",
                borderRadius: "30px",
                padding: "10px 20px 10px 20px",
                border: "none",
                textTransform: "none",
                boxShadow: "3px 3px 8px 1px rgba(0, 0, 0, 0.25)",
              }}>
              <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M6.62119 14.7037L0.264848 8.18562C0.168539 8.08686 0.10016 7.97987 0.0597109 7.86465C0.0199035 7.74943 0 7.62598 0 7.4943C0 7.36262 0.0199035 7.23918 0.0597109 7.12396C0.10016 7.00874 0.168539 6.90175 0.264848 6.80299L6.62119 0.284882C6.79775 0.103823 7.0183 0.00901494 7.28282 0.000455813C7.54799 -0.00744492 7.77689 0.0873635 7.9695 0.284882C8.16212 0.46594 8.2626 0.692099 8.27095 0.963358C8.27865 1.23527 8.1862 1.46999 7.99358 1.66751L3.27448 6.50671H14.0369C14.3098 6.50671 14.5387 6.60119 14.7236 6.79015C14.9079 6.97977 15 7.21449 15 7.4943C15 7.77412 14.9079 8.00851 14.7236 8.19747C14.5387 8.38708 14.3098 8.48189 14.0369 8.48189H3.27448L7.99358 13.3211C8.17015 13.5022 8.2626 13.7326 8.27095 14.0124C8.27865 14.2922 8.1862 14.5227 7.99358 14.7037C7.81701 14.9012 7.5923 15 7.31942 15C7.04655 15 6.8138 14.9012 6.62119 14.7037Z" fill="white" />
                </svg>
                Kembali ke Beranda
              </Stack>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}
