"use client"

import {
    Box,
    Button,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
    Drawer,
    Dialog,
    Grow,
    Divider
} from "@mui/material";
import {
    forwardRef,
    useEffect,
    useState
} from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CustomImage from "./CustomImage";

const Transition = forwardRef(function Transition(props, ref) {
    return <Grow direction="up" ref={ref} {...props} />;
});

function ChatBot({ openAI, setOpenAI }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));

    // const [showDialog, setShowDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenAI(true);
    };

    const handleCloseDialog = () => {
        setOpenAI(false);
    };

    return (
        <Dialog
            // disableScrollLock
            open={openAI}
            onClose={handleCloseDialog}
            TransitionComponent={Transition}
            keepMounted
            hideBackdrop={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{ sx: { borderRadius: "15px" } }}
            sx={{ backdropFilter: "blur(10px)" }}>
            <Button onClick={handleCloseDialog} sx={{ padding: 0 }}>
                <CloseRoundedIcon
                    sx={{
                        fontSize: "30px",
                        color: "var(--jakartasatu-biru)",
                        position: "absolute",
                        margin: { xs: "60px 15px 0 0", sm: "60px 15px 0 0", md: "80px 25px 0 0", lg: "80px 25px 0 0", xl: "80px 25px 0 0" },
                        right: "0",
                    }} />
            </Button>
            <DialogContent sx={{ padding: isMobile ? "20px" : "40px 50px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", mb: 3 }}>
                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                        <CustomImage
                            src="/assets/TanyaArahIconNew.png"
                            alt="Gambar"
                            draggable={false}
                            width={0}
                            height={0}
                            style={{
                                userDrag: "none",
                                userSelect: "none",

                                width: "70px",
                                height: "100%",
                            }}
                        />
                        <Typography variant="p"
                            sx={{
                                color: 'var(--jakartasatu-biru)',
                                textAlign: "center",
                                fontSize: { xs: "28px", sm: "28px", md: "80px 25px 0 0", lg: "80px 25px 0 0", xl: "36px" },
                                fontWeight: "800",
                            }}>
                            TanyaArah
                        </Typography>
                    </Stack>
                    {/* <Divider
                        sx={{
                            margin: '15px auto 25px auto',
                            backgroundColor: 'var(--jakartasatu-biru)',
                            height: 5,
                            width: '75px',
                            borderRadius: '4px',
                        }}
                    /> */}
                </Box>
                <Box sx={{
                    width: "100%",
                    minWidth: { xs: null, sm: "450px", md: "450px", lg: "450px", xl: "450px" },
                    maxWidth: "450px",
                    height: "400px",
                }}>
                    <iframe src="https://citata.bahasalab.com" width="100%" height="100%"
                        style={{
                            border: 'none',
                        }}></iframe>
                    {/* <iframe src="https://jakartasatu.bahasalab.com/ai" width="100%" height="100%" style={{ border: 'none' }}></iframe> */}
                </Box>
            </DialogContent>
        </Dialog >
    );

    // return (
    //     <>
    //         <Drawer
    //             anchor={isMobile ? "bottom" : "right"}
    //             open={openAI}
    //             hideBackdrop={false}
    //         >
    //             <DialogTitle style={{ background: 'var(--jakartasatu-orange)', padding: "10px 20px" }}>
    //                 <Stack
    //                     direction="row"
    //                     justifyContent="space-between"
    //                     alignItems="center">
    //                     <Box sx={{ display: "flex", alignItems: "center" }}>
    //                         <CustomImage
    //                             src="/assets/TanyaArahIconNew.png"
    //                             alt="Gambar"
    //                             draggable={false}
    //                             width={0}
    //                             height={0}
    //                             style={{
    //                                 userDrag: "none",
    //                                 userSelect: "none",

    //                                 width: "50px",
    //                                 height: "100%",
    //                             }}
    //                         />
    //                         <Typography variant="p" sx={{ fontSize: "22px", fontWeight: "500", color: "white", marginLeft: "10px" }}>TanyaArah</Typography>
    //                     </Box>
    //                     <Box sx={{ display: "flex", alignItems: "center" }}>
    //                         <CloseRoundedIcon onClick={handleCloseAI} sx={{ cursor: "pointer", color: "white", fontSize: "30px" }} />
    //                     </Box>
    //                 </Stack>
    //             </DialogTitle>
    //             <DialogContent sx={{ padding: "0", overflow: "hidden" }}>
    //                 <Box style={{ width: isMobile ? '100vw' : '80vw', maxWidth: "450px", height: isMobile ? "50vh" : "100vh" }}>
    //                     <iframe src="https://citata.bahasalab.com" width="100%" height="100%"
    //                         style={{
    //                             border: 'none',
    //                         }}></iframe>
    //                     {/* <iframe src="https://jakartasatu.bahasalab.com/ai" width="100%" height="100%" style={{ border: 'none' }}></iframe> */}
    //                 </Box>
    //             </DialogContent>
    //         </Drawer>
    //     </>
    // );
}

export default ChatBot;