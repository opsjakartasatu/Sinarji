import { useState } from 'react';
import { ListItemText, List, Drawer, Divider, ListItemButton, IconButton, useMediaQuery, Button, Typography } from '@mui/material';
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { motion } from 'framer-motion';

import ChatBot from "../chatBot";

export default function DrawerNavbarRedesign(props) {
    // const isMobile = useMediaQuery("(max-height: 431px)");
    const [openDrawer, setOpenDrawer] = useState(false);

    const { halamanBeranda, halamanTentang, halamanPetaJakarta } = props;

    // Animation variants for the drawer
    const drawerVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: '-100%', opacity: 0 },
    };

    // Animation variants for the list items
    const listItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    const [openAI, setOpenAI] = useState(false);
    const handleOpenAI = () => {
        setOpenAI(true);
        setOpenDrawer(false);
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
                <List
                    component={motion.div}
                    variants={{
                        visible: { transition: { staggerChildren: 0.3 } },
                    }}
                    initial="hidden"
                    animate="visible"
                    sx={{ overflow: 'hidden', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                >
                    <Link href="/" onClick={() => props.setHalamanBeranda(true)}>
                        <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                {/* <HomeOutlinedIcon
                                    style={{ color: props.halamanBeranda ? '#F7941D' : '#003577', marginRight: '10px' }}
                                /> */}
                                <ListItemText
                                    primary="Beranda"
                                    disableTypography
                                    sx={{
                                        color: props.halamanBeranda ? '#F7941D' : 'rgb(74, 71, 62)',
                                        fontSize: '32px',
                                        fontWeight: '600'
                                    }}
                                />
                            </ListItemButton>
                        </motion.div>
                    </Link>
                    <Link href="/peta/jakarta">
                        <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                {/* <MapOutlinedIcon style={{ marginRight: '10px' }} /> */}
                                <ListItemText
                                    primary="Peta Jakarta"
                                    disableTypography
                                    sx={{
                                        color: props.halamanPetaJakarta ? '#F7941D' : 'rgb(74, 71, 62)',
                                        fontSize: '32px',
                                        fontWeight: '600'
                                    }}
                                />
                            </ListItemButton>
                        </motion.div>
                    </Link>
                    <motion.div variants={listItemVariants}>
                        <ListItemButton onClick={handleOpenAI}>
                            <ListItemText
                                primary="TanyaArah"
                                disableTypography
                                sx={{
                                    color: 'rgb(74, 71, 62)',
                                    fontSize: '32px',
                                    fontWeight: '600'
                                }}
                            />
                        </ListItemButton>
                    </motion.div>
                    <Link href="/tentang" onClick={() => props.setHalamanTentang(true)}>
                        <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                {/* <InfoOutlinedIcon
                                    style={{ color: props.halamanTentang ? '#F7941D' : '#003577', marginRight: '10px' }}
                                /> */}
                                <ListItemText
                                    primary="Tentang"
                                    disableTypography
                                    sx={{
                                        color: props.halamanTentang ? '#F7941D' : 'rgb(74, 71, 62)',
                                        fontSize: '32px',
                                        fontWeight: '600'
                                    }}
                                />
                            </ListItemButton>
                        </motion.div>
                    </Link>
                </List>
            </Drawer >
            <ChatBot openAI={openAI} setOpenAI={setOpenAI} />
        </>
    );
}
