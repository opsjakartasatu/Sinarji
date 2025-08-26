import { useState } from 'react';
import { ListItemText, List, Drawer, ListItemButton, IconButton, Stack } from '@mui/material';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CustomImage from '../CustomImage';

export default function DrawerGee({ currentTab, setCurrentTab }) {
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
                    <Link href="/">
                        <CustomImage
                            src="/assets/logo-jakartasatu-orange.png"
                            alt="Logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority
                            style={{
                                width: "70vw",
                                maxWidth: "300px",
                                height: "auto",
                            }}
                        />
                    </Link>
                    <List
                        component={motion.div}
                        variants={{
                            visible: { transition: { staggerChildren: 0.3 } },
                        }}
                        initial="hidden"
                        animate="visible"
                        sx={{ overflow: 'hidden', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                    >
                        <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                <ListItemText
                                    primary="Overview"
                                    disableTypography
                                    onClick={() => {
                                        setCurrentTab(0);
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
                        </motion.div>
                    </List>
                </Stack>
            </Drawer>
        </>
    );
}
