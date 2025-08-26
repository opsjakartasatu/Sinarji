import { Divider, Stack, Typography } from "@mui/material";
import styles from "./page.module.css"
import CustomImage from "@/components/CustomImage";

export default function Loading() {
  return (
    <div className={styles.slideLight} style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      width: "95vw",
      maxWidth: "1200px"
    }}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" alignItems="center" gap={4}>
        <CustomImage
          src="/assets/logo-jakartasatu-orange.png"
          alt="Gambar"
          draggable={false}
          width={0}
          height={0}
          style={{
            userDrag: "none",
            userSelect: "none",

            width: "100%",
            maxWidth: "300px",
            height: "auto",
          }}
        />
        <Divider orientation="vertical" variant="middle" flexItem
          sx={{ display: { xs: "none", sm: "block" } }} />
        <Typography variant="p"
          style={{
            textAlign: "left",
            color: 'var(--jakartasatu-biru)',
            fontSize: "20px",
            fontWeight: "600",
          }}>
          Waiting...
        </Typography>
      </Stack>
    </div>
  );
}
