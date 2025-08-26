import { useState } from 'react';
import { ListItemText, List, Drawer, Divider, ListItemButton, IconButton } from '@mui/material';
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { motion } from 'framer-motion';

export default function DrawerNavbar(props) {
    const [openDrawer, setOpenDrawer] = useState(false);

    const { halamanBeranda, halamanTentang, halamanKatalogPeta } = props;

    // Animation variants for the drawer
    const drawerVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: '-100%', opacity: 0 },
    };

    // Animation variants for the list items
    const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
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
                anchor={"left"}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                sx={{
                    textAlign: "center",
                    // width: "320px",
                    height: "100%",
                }}>
                <Link href="/">
                    <img
                        src={`${basePath}/assets/logo-jakartasatu-orange.png`}
                        alt="Logo"
                        style={{ width: '280px', height: 'auto', padding: '0 10px' }}
                    />
                </Link>
                <Divider
                    sx={{
                        bgcolor: 'rgb(229, 234, 242)',
                        height: '1px',
                    }}
                />
                <List
                    component={motion.div}
                    variants={{
                        visible: { transition: { staggerChildren: 0.3 } },
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    <Link href="/" onClick={() => props.setHalamanBeranda(true)}>
                        <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                <HomeOutlinedIcon
                                    style={{ color: props.halamanBeranda ? '#F7941D' : '#003577', marginRight: '10px' }}
                                />
                                <ListItemText
                                    primary="Beranda"
                                    disableTypography
                                    sx={{
                                        color: props.halamanBeranda ? '#F7941D' : '#00012A',
                                        fontSize: '1.2em',
                                        fontWeight: '600'
                                    }}
                                />
                            </ListItemButton>
                        </motion.div>
                    </Link>
                    <Link href="/peta/jakarta">
                        <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                <MapOutlinedIcon style={{ marginRight: '10px' }} />
                                <ListItemText
                                    primary="Peta Jakarta"
                                    disableTypography
                                    sx={{
                                        color: '#00012A',
                                        fontSize: '1.2em',
                                        fontWeight: '600'
                                    }}
                                />
                            </ListItemButton>
                        </motion.div>
                    </Link>
                    <Link href="/katalog-peta" onClick={() => props.setHalamanKatalogPeta(true)}>
                        <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                <MapRoundedIcon
                                    style={{ color: props.halamanKatalogPeta ? '#F7941D' : '#003577', marginRight: '10px' }}
                                />
                                <ListItemText
                                    primary="Katalog Peta"
                                    disableTypography
                                    sx={{
                                        color: props.halamanKatalogPeta ? '#F7941D' : '#00012A',
                                        fontSize: '1.2em',
                                        fontWeight: '600'
                                    }}
                                />
                            </ListItemButton>
                        </motion.div>
                    </Link>
                    <Link href="/tentang" onClick={() => props.setHalamanTentang(true)}>
                        <motion.div variants={listItemVariants}>
                            <ListItemButton>
                                <InfoOutlinedIcon
                                    style={{ color: props.halamanTentang ? '#F7941D' : '#003577', marginRight: '10px' }}
                                />
                                <ListItemText
                                    primary="Tentang"
                                    disableTypography
                                    sx={{
                                        color: props.halamanTentang ? '#F7941D' : '#00012A',
                                        fontSize: '1.2em',
                                        fontWeight: '600'
                                    }}
                                />
                            </ListItemButton>
                        </motion.div>
                    </Link>
                </List>
            </Drawer>
        </>
    );
}
