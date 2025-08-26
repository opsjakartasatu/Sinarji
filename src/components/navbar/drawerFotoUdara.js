import { useState } from 'react';
import { ListItemText, List, Drawer, ListItemButton, IconButton, Stack, Box, Typography } from '@mui/material';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { PlayArrowRounded, Pause, Compare, Flip } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CustomImage from '../CustomImage';

export default function DrawerFotoUdara({
    isPlaying,
    togglePlay,
    isSwipeMode,
    toggleSwipeMode,
    isCompareMode,
    toggleCompareMode
}) {
    // const isMobile = useMediaQuery("(max-height: 431px)");
    const [openDrawer, setOpenDrawer] = useState(false);

    const drawerVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: '-100%', opacity: 0 },
    };

    const listItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <IconButton
                edge="start"
                onClick={() => setOpenDrawer(!openDrawer)}
                sx={{
                    right: '0',
                    left: '0',
                    marginLeft: '14px',
                    // marginLeft: isMobile ? '50px' : '14px',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    color: 'white',
                    background: '#ED783E',
                    opacity: '90%',
                    backdropFilter: 'blur(10px)',
                    position: 'absolute',
                }}
                component={motion.div}
                whileTap={{ scale: 1 }}
                whileHover={{ scale: 1 }}
            >
                <DragHandleRoundedIcon />
            </IconButton>
            <Drawer
                elevation={0}
                anchor={"top"}
                transitionDuration={700}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                sx={{
                    textAlign: "center",
                    alignItems: "center",

                    "& .MuiDrawer-paper": {
                        height: "100%",
                        justifyContent: "center"
                    }
                }}>
                <IconButton
                    onClick={() => setOpenDrawer(false)}
                    sx={{
                        position: 'absolute',
                        top: 34,
                        left: 35,
                        color: 'white',
                        background: '#ED783E',
                        opacity: '90%',
                        backdropFilter: 'blur(10px)',
                        zIndex: 1201,
                    }}
                >
                    <CloseRoundedIcon />
                </IconButton>
                <Stack direction="column" justifyContent="center" alignItems="center">
                    <Typography
                        variant="p"
                        sx={{
                            color: "rgb(74, 71, 62)",
                            fontSize: "32px",
                            fontWeight: "700",
                            lineHeight: "150%",
                            mb: 10
                        }}
                    >
                        Histori Foto Udara<br />DKI Jakarta
                    </Typography>
                    <List
                        component={motion.div}
                        variants={{
                            visible: { transition: { staggerChildren: 0.3 } },
                        }}
                        initial="hidden"
                        animate="visible"
                        sx={{
                            overflow: 'hidden',
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "27px"
                        }}
                    >
                        <motion.div variants={listItemVariants}>
                            <Box
                                onClick={() => {
                                    togglePlay();
                                    setOpenDrawer(false);
                                }}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '32px',
                                        fontWeight: '600',
                                        color: isPlaying ? "var(--jakartasatu-orange)" : "rgb(74, 71, 62)",
                                    }}
                                >
                                    {isPlaying ? "Stop Play" : "Play"}
                                </Typography>
                                {isPlaying ? (
                                    <Pause
                                        sx={{
                                            fontSize: '50px',
                                            color: isPlaying ? "var(--jakartasatu-orange)" : "rgb(74, 71, 62)",
                                        }}
                                    />
                                ) : (
                                    <PlayArrowRounded
                                        sx={{
                                            fontSize: '50px',
                                            color: isPlaying ? "var(--jakartasatu-orange)" : "rgb(74, 71, 62)",
                                        }}
                                    />
                                )}
                            </Box>
                        </motion.div>
                        <motion.div variants={listItemVariants}>
                            <Box
                                onClick={() => {
                                    toggleCompareMode();
                                    setOpenDrawer(false);
                                }}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    cursor: "pointer",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '32px',
                                        fontWeight: '600',
                                        color: isCompareMode ? "var(--jakartasatu-orange)" : "rgb(74, 71, 62)",
                                    }}
                                >
                                    {isCompareMode ? "Stop Compare" : "Compare"}
                                </Typography>
                                <Compare
                                    sx={{
                                        fontSize: '35px',
                                        color: isCompareMode ? "var(--jakartasatu-orange)" : "rgb(74, 71, 62)",
                                    }}
                                />
                            </Box>
                        </motion.div>
                        <motion.div variants={listItemVariants}>
                            <Box
                                onClick={() => {
                                    toggleSwipeMode();
                                    setOpenDrawer(false);
                                }}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    cursor: "pointer",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '32px',
                                        fontWeight: '600',
                                        color: isSwipeMode ? "var(--jakartasatu-orange)" : "rgb(74, 71, 62)",
                                    }}
                                >
                                    {isSwipeMode ? "Stop Swipe" : "Swipe"}
                                </Typography>
                                <Flip
                                    sx={{
                                        fontSize: '35px',
                                        color: isSwipeMode ? "var(--jakartasatu-orange)" : "rgb(74, 71, 62)",
                                    }}
                                />
                            </Box>
                        </motion.div>
                        {/* <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                <ListItemText
                                    primary="Overview"
                                    disableTypography
                                    onClick={() => {
                                        togglePlay;
                                        setOpenDrawer(false);
                                    }}
                                    sx={{
                                        color: currentTab === 0 ? 'var(--jakartasatu-orange)' : 'rgb(74, 71, 62)',
                                        fontSize: '32px',
                                        fontWeight: '600'
                                    }}
                                />
                            </ListItemButton>
                        </motion.div>
                        <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                <ListItemText
                                    primary="Data Selection"
                                    disableTypography
                                    onClick={() => {
                                        setCurrentTab(1);
                                        setOpenDrawer(false);
                                    }}
                                    sx={{
                                        color: currentTab === 1 ? 'var(--jakartasatu-orange)' : 'rgb(74, 71, 62)',
                                        fontSize: '32px',
                                        fontWeight: '600'
                                    }}
                                />
                            </ListItemButton>
                        </motion.div>
                        <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                <ListItemText
                                    primary="Result"
                                    disableTypography
                                    onClick={() => {
                                        setCurrentTab(2);
                                        setOpenDrawer(false);
                                    }}
                                    sx={{
                                        color: currentTab === 2 ? 'var(--jakartasatu-orange)' : 'rgb(74, 71, 62)',
                                        fontSize: '32px',
                                        fontWeight: '600'
                                    }}
                                />
                            </ListItemButton>
                        </motion.div> */}
                    </List>
                </Stack>
            </Drawer >
        </>
    );
}
