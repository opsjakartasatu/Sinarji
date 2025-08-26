import React from 'react';
import {
    useTheme,
    useMediaQuery,
    Box,
    AppBar,
    Toolbar,
    styled,
    Stack,
    IconButton,
    Badge,
    Button,
    Typography,
} from '@mui/material';
import Link from 'next/link';
// components
import Profile from './Profile';
// import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';

const Footer = () => {
    const theme = useTheme();
    // const isDesktop = useMediaQuery(theme.breakpoints.up("xl"));

    const today = new Date();
    const year = today.getFullYear();

    return (
        <Box sx={{
            bottom: "0",
            marginTop: "100px",
            zIndex: "-1",
            width: "100%",
            boxShadow: "2px 4px 12px 0px rgba(0, 0, 0, 0.10)",
            background: theme.palette.background.paper,
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            minHeight: '70px',

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography variant='p' sx={{ m: 1, textAlign: "center" }}>
                © Hak Cipta {year}. Pemerintah Provinsi Daerah Khusus Ibu Kota Jakarta.
            </Typography>
        </Box>
    );
};

export default Footer;
