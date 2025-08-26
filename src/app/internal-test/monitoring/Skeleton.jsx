import { Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const DashboardSkeleton = () => {

    return (
        <Stack direction="column" spacing={4}>
            <Stack direction="column">
                <Skeleton variant="text" sx={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                    maxWidth: "565px",
                    height: "39px",
                }} />
                <Skeleton variant="text" sx={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                    maxWidth: "627px",
                    height: "29px",
                }} />
            </Stack>
            <Stack
                direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                <Skeleton variant="rounded" sx={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                    maxWidth: "549px",
                    height: "183px",
                }} />
                <Skeleton variant="rounded" sx={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                    maxWidth: "549px",
                    height: "183px",
                }} />
            </Stack>
            <Stack
                direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
                justifyContent="space-around"
                alignItems="center"
                spacing={4}>
                <Skeleton variant="circular" sx={{
                    width: "100%",
                    maxWidth: "341px",
                    height: "341px",
                }} />
                <Skeleton variant="circular" sx={{
                    width: "100%",
                    maxWidth: "341px",
                    height: "341px",
                }} />
            </Stack>
            <Grid container
                alignItems="stretch"
                justifyContent="center"
                columnSpacing={4}
                rowSpacing={{ xs: 4, sm: 0, md: 0, lg: 0, xl: 0 }}>
                <Grid xs={12} sm={12} md={7} lg={7} xl={7}>
                    <Skeleton variant="rounded" sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "100%",
                        maxWidth: "1000px",
                        height: "183px",
                    }} />
                </Grid>
                <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
                    <Skeleton variant="rounded" sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "100%",
                        maxWidth: "1000px",
                        height: "183px",
                    }} />
                </Grid>
            </Grid>
            <Grid container
                alignItems="stretch"
                justifyContent="center"
                columnSpacing={4}
                rowSpacing={{ xs: 4, sm: 0, md: 0, lg: 0, xl: 0 }}>
                <Grid xs={12} sm={12} md={7} lg={7} xl={7}>
                    <Skeleton variant="rounded" sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "100%",
                        maxWidth: "1000px",
                        height: "183px",
                    }} />
                </Grid>
                <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
                    <Skeleton variant="rounded" sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "100%",
                        maxWidth: "1000px",
                        height: "183px",
                    }} />
                </Grid>
            </Grid>
            <Grid container
                alignItems="stretch"
                justifyContent="center"
                columnSpacing={4}
                rowSpacing={{ xs: 4, sm: 0, md: 0, lg: 0, xl: 0 }}>
                <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Skeleton variant="rounded" sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "100%",
                        maxWidth: "1000px",
                        height: "183px",
                    }} />
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Skeleton variant="rounded" sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "100%",
                        maxWidth: "1000px",
                        height: "183px",
                    }} />
                </Grid>
            </Grid>
        </Stack>
    );

};

export default DashboardSkeleton;