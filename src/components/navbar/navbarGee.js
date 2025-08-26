"use client"

import { Box, Button, Menu, MenuItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import "./style.css";

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { signOut } from "next-auth/react";
import DrawerGee from "./drawerGee";
import CustomImage from "../CustomImage";

const MenuItemStyle = {
    textTransform: "none",
    color: "black",
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.60)",
    fontWeight: "500",
    lineHeight: "165%",
    letterSpacing: "0.03px",
}

export default function Navbar({ session, currentTab, setCurrentTab }) {
    const basePath = process.env.BASE_PATH;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("856"));

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="navbarGee">
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        marginLeft: isMobile ? "auto" : "0",
                        marginRight: "0",
                    }}>
                    <Link href="/" style={{ display: isMobile ? "none" : "flex" }}>
                        <CustomImage
                            src="/assets/logo-jakartasatu-orange.png"
                            alt="Logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority
                            style={{
                                width: isMobile ? "40vw" : "180px",
                                maxWidth: "180px",
                                height: "auto",
                                alignItems: "center",
                                display: "flex",
                            }}
                        />
                    </Link>
                </Box>
                {isMobile ? (<DrawerGee session={session} currentTab={currentTab} setCurrentTab={setCurrentTab} />) : (
                    <Stack direction="column" justifyContent="center" gap={{ xs: 4, sm: 4, md: 6, lg: 10, xl: 10 }}
                        sx={{
                            fontSize: "20px",
                            fontWeight: "450",
                            height: "inherit",
                            listStyleType: "none",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="p"
                            onClick={() => setCurrentTab(0)}
                            sx={{ cursor: "pointer", color: currentTab === 0 ? 'var(--jakartasatu-orange)' : 'var(--jakartasatu-biru)' }}
                        >
                            Overview
                        </Typography>
                        <Typography variant="p"
                            onClick={() => setCurrentTab(1)}
                            sx={{ cursor: "pointer", color: currentTab === 1 ? 'var(--jakartasatu-orange)' : 'var(--jakartasatu-biru)' }}
                        >
                            Data Selection
                        </Typography>
                        <Typography variant="p"
                            onClick={() => setCurrentTab(2)}
                            sx={{ cursor: "pointer", color: currentTab === 2 ? 'var(--jakartasatu-orange)' : 'var(--jakartasatu-biru)' }}
                        >
                            Result
                        </Typography>
                    </Stack>
                )}
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: { xs: "none", sm: "100%", md: "100%", lg: "100%", xl: "100%" },
                    maxWidth: { xs: "none", sm: "180px", md: "180px", lg: "180px", xl: "180px" }
                }}>
                    <Stack onClick={handleClick} direction="row" justifyContent="center" alignItems="center" gap={1} sx={{ cursor: "pointer" }}>
                        <Typography variant="p" style={{ color: "var(--jakartasatu-biru)", fontSize: "20px", fontWeight: "450" }}>
                            {session.user.name}
                        </Typography>
                        <KeyboardArrowDownRoundedIcon />
                    </Stack>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        sx={{
                            "& .MuiPaper-root": {
                                minWidth: "200px",
                                borderRadius: "10px",
                                boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                            }
                        }}
                    >
                        <MenuItem onClick={() => signOut({ callbackUrl: `${basePath}` })} disableRipple sx={MenuItemStyle}>
                            <LogoutRoundedIcon sx={{ mr: 1.5 }} />
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </div>
        </>
    )
}
