"use client"

import styles from '../page.module.css';

import { Box, Typography, Grid, Skeleton, Divider, Stack, useMediaQuery, Button, useTheme } from '@mui/material'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CustomImage from '../CustomImage';

const TxtStyle = {
    color: "rgba(0, 0, 0, 0.70)",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "30px",

    '&:hover': {
        color: "var(--jakartasatu-biru)",
        fontWeight: 600
    }
}

const TxtStyleMobile = {
    color: "rgba(0, 0, 0, 0.70)",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "30px",
}

export default function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobile600 = useMediaQuery(theme.breakpoints.down("600"));
    const isMobileLG = useMediaQuery(theme.breakpoints.down("lg"));

    const today = new Date();
    const year = today.getFullYear();

    return (
        <main style={{
            margin: "150px auto 0 auto",
            maxWidth: "90vw",
            maxWidth: "1260px",
            color: "rgba(0, 0, 0, 0.7)",
            lineHeight: "2",
        }}>
            <div style={{ width: "90vw", maxWidth: "1260px", margin: "0 auto", }}>
                <Grid container
                    spacing={isMobile ? 2 : 8}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start">
                    <Grid item xs={12} sm={7.5} md={8} lg={7} xl={7}>
                        <CustomImage
                            src="/assets/logo-jakartasatu-orange.png"
                            alt="Logo"
                            draggable={false}
                            width={0}
                            height={0}
                            style={{
                                userDrag: "none",
                                userSelect: "none",

                                width: "267px",
                                height: "auto"
                            }}
                        />
                        <Typography variant='p' paragraph className={styles.FooterTitleDecription}>Situs ini merupakan sarana komunikasi dan visualisasi peta dan data dari program Jakarta Satu baik untuk Pemerintah Provinsi DKI Jakarta ataupun untuk masyarakat.</Typography>
                        {isMobile600 ? null : (
                            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                <Link href="/syarat-ketentuan">
                                    <Typography variant='p' sx={TxtStyle}>
                                        Syarat Ketentuan
                                    </Typography>
                                </Link>
                                <Divider orientation="vertical"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        borderRightWidth: 1,
                                        height: "20px",
                                        borderColor: "rgba(0, 0, 0, 0.40)"
                                    }} />
                                <Link href="/kebijakan-privasi">
                                    <Typography variant='p' sx={TxtStyle}>
                                        Kebijakan Privasi
                                    </Typography>
                                </Link>
                            </Stack>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={4.5} md={4} lg={5} xl={5}>
                        <div style={{ width: "100%", maxWidth: "520px", marginTop: "24px", marginBottom: "26px" }}>
                            <Typography variant='p' sx={{
                                color: "#000",
                                fontSize: "20px",
                                fontWeight: "500",
                                lineHeight: "204.182%",
                                letterSpacing: "-0.3px",
                            }}>
                                Informasi Kontak
                            </Typography>
                        </div>
                        <Box
                            sx={{
                                alignItems: "start",
                                display: 'grid',
                                gap: "8px",
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: '1fr',
                                    md: '1fr',
                                    lg: '1fr 1fr',
                                    xl: '1fr 1fr'
                                },
                            }}>
                            <Box
                                sx={{
                                    alignItems: "center",
                                    width: "fit-content"
                                }}>
                                <Link id="btnFooterLinkEmail" href="mailto:jakartasatu@jakarta.go.id"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        textDecoration: "none",
                                        color: "black",
                                        width: "100%",
                                        maxWidth: "150px"
                                    }}>
                                    <EmailRoundedIcon />
                                    <Typography variant="p"
                                        sx={{
                                            marginLeft: "10px",
                                            fontSize: "14px",
                                            fontWeight: "400",

                                            '&:hover': {
                                                color: "var(--jakartasatu-biru)",
                                                fontWeight: 600
                                            }
                                        }}>
                                        jakartasatu@jakarta.go.id
                                    </Typography>
                                </Link>
                            </Box>
                            <Box
                                sx={{
                                    alignItems: "center",
                                    width: "fit-content"
                                }}>
                                <Link id="btnFooterLinkTwitter" href="https://www.twitter.com/jakartasatudki/" target="_blank"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        textDecoration: "none",
                                        color: "black",
                                        width: "100%",
                                        maxWidth: "150px"
                                    }}>
                                    <XIcon sx={{ fontSize: "20px", marginLeft: isMobileLG ? "2px" : "" }} />
                                    <Typography variant="p"
                                        sx={{
                                            marginLeft: "10px",
                                            fontSize: "14px",
                                            fontWeight: "400",

                                            '&:hover': {
                                                color: "var(--jakartasatu-biru)",
                                                fontWeight: 600
                                            }
                                        }}>
                                        Jakarta Satu
                                    </Typography>
                                </Link>
                            </Box>
                            <Box
                                sx={{
                                    alignItems: "center",
                                    width: "fit-content"
                                }}>
                                <Link id="btnFooterLinkYoutube" href="https://www.youtube.com/@JakartaSatuDKI/" target="_blank"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        textDecoration: "none",
                                        color: "black",
                                        width: "100%",
                                        maxWidth: "150px"
                                    }}>
                                    {isMobileLG ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="-1.5 0 22 18" fill="none">
                                            <g clipPath="url(#clip0_25268_230)">
                                                <path d="M19.4736 2.18361C19.3594 1.76155 19.1366 1.37678 18.8275 1.0676C18.5183 0.75842 18.1335 0.535625 17.7115 0.4214C16.1664 0 9.94772 0 9.94772 0C9.94772 0 3.72876 0.0127555 2.18363 0.434156C1.76157 0.548388 1.3768 0.771195 1.06763 1.08039C0.758463 1.38958 0.53569 1.77437 0.421495 2.19644C-0.0458712 4.94184 -0.227171 9.1252 0.434329 11.7608C0.548536 12.1828 0.771314 12.5676 1.08048 12.8768C1.38964 13.186 1.77441 13.4088 2.19646 13.523C3.7416 13.9444 9.9604 13.9444 9.9604 13.9444C9.9604 13.9444 16.1791 13.9444 17.7242 13.523C18.1462 13.4088 18.531 13.186 18.8402 12.8768C19.1494 12.5676 19.3722 12.1828 19.4864 11.7608C19.9793 9.01149 20.1312 4.8307 19.4736 2.18361Z" fill="#FF0000" />
                                                <path d="M7.96802 9.96051L13.1269 6.97244L7.96802 3.98438V9.96051Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_25268_230">
                                                    <rect width="19.915" height="18" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="-2 0 22 18" fill="none">
                                            <g clipPath="url(#clip0_25268_230)">
                                                <path d="M19.4736 2.18361C19.3594 1.76155 19.1366 1.37678 18.8275 1.0676C18.5183 0.75842 18.1335 0.535625 17.7115 0.4214C16.1664 0 9.94772 0 9.94772 0C9.94772 0 3.72876 0.0127555 2.18363 0.434156C1.76157 0.548388 1.3768 0.771195 1.06763 1.08039C0.758463 1.38958 0.53569 1.77437 0.421495 2.19644C-0.0458712 4.94184 -0.227171 9.1252 0.434329 11.7608C0.548536 12.1828 0.771314 12.5676 1.08048 12.8768C1.38964 13.186 1.77441 13.4088 2.19646 13.523C3.7416 13.9444 9.9604 13.9444 9.9604 13.9444C9.9604 13.9444 16.1791 13.9444 17.7242 13.523C18.1462 13.4088 18.531 13.186 18.8402 12.8768C19.1494 12.5676 19.3722 12.1828 19.4864 11.7608C19.9793 9.01149 20.1312 4.8307 19.4736 2.18361Z" fill="#FF0000" />
                                                <path d="M7.96802 9.96051L13.1269 6.97244L7.96802 3.98438V9.96051Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_25268_230">
                                                    <rect width="19.915" height="18" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    )}
                                    <Typography variant="p"
                                        sx={{
                                            marginLeft: "10px",
                                            fontSize: "14px",
                                            fontWeight: "400",

                                            '&:hover': {
                                                color: "var(--jakartasatu-biru)",
                                                fontWeight: 600
                                            }
                                        }}>
                                        Jakarta Satu DKI
                                    </Typography>
                                </Link>
                            </Box>
                            <Box
                                sx={{
                                    alignItems: "center",
                                    width: "fit-content"
                                }}>
                                <Link id="btnFooterLinkInstagram" href="https://www.instagram.com/jakartasatudki/" target="_blank"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        textDecoration: "none",
                                        color: "black",
                                        width: "100%",
                                        maxWidth: "150px"
                                    }}>
                                    {isMobileLG ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="-1.5 0 20 20" fill="none">
                                            <g clipPath="url(#clip0_25268_240)">
                                                <path d="M13.7812 0H4.21875C1.8888 0 0 1.8888 0 4.21875V13.7812C0 16.1112 1.8888 18 4.21875 18H13.7812C16.1112 18 18 16.1112 18 13.7812V4.21875C18 1.8888 16.1112 0 13.7812 0Z" fill="url(#paint0_radial_25268_240)" />
                                                <path d="M13.7812 0H4.21875C1.8888 0 0 1.8888 0 4.21875V13.7812C0 16.1112 1.8888 18 4.21875 18H13.7812C16.1112 18 18 16.1112 18 13.7812V4.21875C18 1.8888 16.1112 0 13.7812 0Z" fill="url(#paint1_radial_25268_240)" />
                                                <path d="M9.00063 1.96875C7.09109 1.96875 6.85139 1.97712 6.10144 2.01122C5.35289 2.04553 4.84193 2.16401 4.39488 2.33789C3.93237 2.51747 3.54009 2.75773 3.1493 3.14866C2.75815 3.53953 2.51789 3.9318 2.33775 4.39411C2.16338 4.8413 2.04476 5.35247 2.01108 6.10066C1.97754 6.85069 1.96875 7.09045 1.96875 9.00007C1.96875 10.9097 1.97719 11.1486 2.01122 11.8986C2.04567 12.6471 2.16415 13.1581 2.33789 13.6051C2.51761 14.0676 2.75787 14.4599 3.1488 14.8507C3.53953 15.2419 3.9318 15.4827 4.39397 15.6622C4.84137 15.8361 5.3524 15.9546 6.1008 15.9889C6.85083 16.023 7.09031 16.0314 8.99979 16.0314C10.9095 16.0314 11.1485 16.023 11.8984 15.9889C12.647 15.9546 13.1585 15.8361 13.6059 15.6622C14.0682 15.4827 14.4599 15.2419 14.8506 14.8507C15.2417 14.4599 15.4819 14.0676 15.6621 13.6053C15.8349 13.1581 15.9536 12.647 15.9888 11.8987C16.0225 11.1487 16.0312 10.9097 16.0312 9.00007C16.0312 7.09045 16.0225 6.85083 15.9888 6.1008C15.9536 5.35226 15.8349 4.84137 15.6621 4.39432C15.4819 3.9318 15.2417 3.53953 14.8506 3.14866C14.4595 2.75759 14.0683 2.51733 13.6055 2.33796C13.1572 2.16401 12.646 2.04546 11.8974 2.01122C11.1474 1.97712 10.9086 1.96875 8.99845 1.96875H9.00063ZM8.36986 3.23585C8.5571 3.23557 8.766 3.23585 9.00063 3.23585C10.878 3.23585 11.1005 3.2426 11.8419 3.27628C12.5274 3.30764 12.8995 3.42218 13.1474 3.51844C13.4755 3.64584 13.7095 3.79821 13.9554 4.04438C14.2015 4.29047 14.3538 4.52482 14.4816 4.85297C14.5778 5.10047 14.6925 5.47256 14.7237 6.15811C14.7574 6.89934 14.7647 7.12195 14.7647 8.99845C14.7647 10.875 14.7574 11.0976 14.7237 11.8388C14.6924 12.5243 14.5778 12.8964 14.4816 13.144C14.3542 13.4722 14.2015 13.7058 13.9554 13.9518C13.7093 14.1979 13.4757 14.3501 13.1474 14.4776C12.8998 14.5743 12.5274 14.6886 11.8419 14.7199C11.1007 14.7536 10.878 14.7609 9.00063 14.7609C7.12315 14.7609 6.90061 14.7536 6.15945 14.7199C5.4739 14.6883 5.1018 14.5737 4.85374 14.4775C4.52566 14.35 4.29124 14.1977 4.04515 13.9516C3.79905 13.7055 3.64676 13.4717 3.519 13.1434C3.42274 12.8959 3.30806 12.5238 3.27684 11.8382C3.24316 11.097 3.23641 10.8744 3.23641 8.9967C3.23641 7.119 3.24316 6.89759 3.27684 6.15635C3.3082 5.4708 3.42274 5.09871 3.519 4.85086C3.64648 4.52271 3.79905 4.28836 4.04522 4.04227C4.29138 3.79617 4.52566 3.6438 4.85381 3.51612C5.10166 3.41944 5.4739 3.30518 6.15945 3.27368C6.80808 3.24436 7.05945 3.23557 8.36986 3.23409V3.23585ZM12.7539 4.40332C12.2881 4.40332 11.9102 4.7809 11.9102 5.24679C11.9102 5.71261 12.2881 6.09054 12.7539 6.09054C13.2197 6.09054 13.5977 5.71261 13.5977 5.24679C13.5977 4.78097 13.2197 4.40304 12.7539 4.40304V4.40332ZM9.00063 5.38917C7.00657 5.38917 5.3898 7.00594 5.3898 9.00007C5.3898 10.9942 7.00657 12.6102 9.00063 12.6102C10.9948 12.6102 12.611 10.9942 12.611 9.00007C12.611 7.00601 10.9946 5.38917 9.00049 5.38917H9.00063ZM9.00063 6.65627C10.295 6.65627 11.3444 7.70555 11.3444 9.00007C11.3444 10.2945 10.295 11.3439 9.00063 11.3439C7.70625 11.3439 6.65691 10.2945 6.65691 9.00007C6.65691 7.70555 7.70618 6.65627 9.00063 6.65627Z" fill="white" />
                                            </g>
                                            <defs>
                                                <radialGradient id="paint0_radial_25268_240" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.78125 19.3864) rotate(-90) scale(17.8393 16.592)">
                                                    <stop stopColor="#FFDD55" />
                                                    <stop offset="0.1" stopColor="#FFDD55" />
                                                    <stop offset="0.5" stopColor="#FF543E" />
                                                    <stop offset="1" stopColor="#C837AB" />
                                                </radialGradient>
                                                <radialGradient id="paint1_radial_25268_240" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-3.01507 1.29663) rotate(78.681) scale(7.97428 32.8702)">
                                                    <stop stopColor="#3771C8" />
                                                    <stop offset="0.128" stopColor="#3771C8" />
                                                    <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
                                                </radialGradient>
                                                <clipPath id="clip0_25268_240">
                                                    <rect width="18" height="18" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18" fill="none">
                                            <g clipPath="url(#clip0_25268_240)">
                                                <path d="M13.7812 0H4.21875C1.8888 0 0 1.8888 0 4.21875V13.7812C0 16.1112 1.8888 18 4.21875 18H13.7812C16.1112 18 18 16.1112 18 13.7812V4.21875C18 1.8888 16.1112 0 13.7812 0Z" fill="url(#paint0_radial_25268_240)" />
                                                <path d="M13.7812 0H4.21875C1.8888 0 0 1.8888 0 4.21875V13.7812C0 16.1112 1.8888 18 4.21875 18H13.7812C16.1112 18 18 16.1112 18 13.7812V4.21875C18 1.8888 16.1112 0 13.7812 0Z" fill="url(#paint1_radial_25268_240)" />
                                                <path d="M9.00063 1.96875C7.09109 1.96875 6.85139 1.97712 6.10144 2.01122C5.35289 2.04553 4.84193 2.16401 4.39488 2.33789C3.93237 2.51747 3.54009 2.75773 3.1493 3.14866C2.75815 3.53953 2.51789 3.9318 2.33775 4.39411C2.16338 4.8413 2.04476 5.35247 2.01108 6.10066C1.97754 6.85069 1.96875 7.09045 1.96875 9.00007C1.96875 10.9097 1.97719 11.1486 2.01122 11.8986C2.04567 12.6471 2.16415 13.1581 2.33789 13.6051C2.51761 14.0676 2.75787 14.4599 3.1488 14.8507C3.53953 15.2419 3.9318 15.4827 4.39397 15.6622C4.84137 15.8361 5.3524 15.9546 6.1008 15.9889C6.85083 16.023 7.09031 16.0314 8.99979 16.0314C10.9095 16.0314 11.1485 16.023 11.8984 15.9889C12.647 15.9546 13.1585 15.8361 13.6059 15.6622C14.0682 15.4827 14.4599 15.2419 14.8506 14.8507C15.2417 14.4599 15.4819 14.0676 15.6621 13.6053C15.8349 13.1581 15.9536 12.647 15.9888 11.8987C16.0225 11.1487 16.0312 10.9097 16.0312 9.00007C16.0312 7.09045 16.0225 6.85083 15.9888 6.1008C15.9536 5.35226 15.8349 4.84137 15.6621 4.39432C15.4819 3.9318 15.2417 3.53953 14.8506 3.14866C14.4595 2.75759 14.0683 2.51733 13.6055 2.33796C13.1572 2.16401 12.646 2.04546 11.8974 2.01122C11.1474 1.97712 10.9086 1.96875 8.99845 1.96875H9.00063ZM8.36986 3.23585C8.5571 3.23557 8.766 3.23585 9.00063 3.23585C10.878 3.23585 11.1005 3.2426 11.8419 3.27628C12.5274 3.30764 12.8995 3.42218 13.1474 3.51844C13.4755 3.64584 13.7095 3.79821 13.9554 4.04438C14.2015 4.29047 14.3538 4.52482 14.4816 4.85297C14.5778 5.10047 14.6925 5.47256 14.7237 6.15811C14.7574 6.89934 14.7647 7.12195 14.7647 8.99845C14.7647 10.875 14.7574 11.0976 14.7237 11.8388C14.6924 12.5243 14.5778 12.8964 14.4816 13.144C14.3542 13.4722 14.2015 13.7058 13.9554 13.9518C13.7093 14.1979 13.4757 14.3501 13.1474 14.4776C12.8998 14.5743 12.5274 14.6886 11.8419 14.7199C11.1007 14.7536 10.878 14.7609 9.00063 14.7609C7.12315 14.7609 6.90061 14.7536 6.15945 14.7199C5.4739 14.6883 5.1018 14.5737 4.85374 14.4775C4.52566 14.35 4.29124 14.1977 4.04515 13.9516C3.79905 13.7055 3.64676 13.4717 3.519 13.1434C3.42274 12.8959 3.30806 12.5238 3.27684 11.8382C3.24316 11.097 3.23641 10.8744 3.23641 8.9967C3.23641 7.119 3.24316 6.89759 3.27684 6.15635C3.3082 5.4708 3.42274 5.09871 3.519 4.85086C3.64648 4.52271 3.79905 4.28836 4.04522 4.04227C4.29138 3.79617 4.52566 3.6438 4.85381 3.51612C5.10166 3.41944 5.4739 3.30518 6.15945 3.27368C6.80808 3.24436 7.05945 3.23557 8.36986 3.23409V3.23585ZM12.7539 4.40332C12.2881 4.40332 11.9102 4.7809 11.9102 5.24679C11.9102 5.71261 12.2881 6.09054 12.7539 6.09054C13.2197 6.09054 13.5977 5.71261 13.5977 5.24679C13.5977 4.78097 13.2197 4.40304 12.7539 4.40304V4.40332ZM9.00063 5.38917C7.00657 5.38917 5.3898 7.00594 5.3898 9.00007C5.3898 10.9942 7.00657 12.6102 9.00063 12.6102C10.9948 12.6102 12.611 10.9942 12.611 9.00007C12.611 7.00601 10.9946 5.38917 9.00049 5.38917H9.00063ZM9.00063 6.65627C10.295 6.65627 11.3444 7.70555 11.3444 9.00007C11.3444 10.2945 10.295 11.3439 9.00063 11.3439C7.70625 11.3439 6.65691 10.2945 6.65691 9.00007C6.65691 7.70555 7.70618 6.65627 9.00063 6.65627Z" fill="white" />
                                            </g>
                                            <defs>
                                                <radialGradient id="paint0_radial_25268_240" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.78125 19.3864) rotate(-90) scale(17.8393 16.592)">
                                                    <stop stopColor="#FFDD55" />
                                                    <stop offset="0.1" stopColor="#FFDD55" />
                                                    <stop offset="0.5" stopColor="#FF543E" />
                                                    <stop offset="1" stopColor="#C837AB" />
                                                </radialGradient>
                                                <radialGradient id="paint1_radial_25268_240" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-3.01507 1.29663) rotate(78.681) scale(7.97428 32.8702)">
                                                    <stop stopColor="#3771C8" />
                                                    <stop offset="0.128" stopColor="#3771C8" />
                                                    <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
                                                </radialGradient>
                                                <clipPath id="clip0_25268_240">
                                                    <rect width="18" height="18" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    )}
                                    <Typography variant="p"
                                        sx={{
                                            marginLeft: "10px",
                                            fontSize: "14px",
                                            fontWeight: "400",

                                            '&:hover': {
                                                color: "var(--jakartasatu-biru)",
                                                fontWeight: 600
                                            }
                                        }}>
                                        jakartasatudki
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                        {isMobile600 ? (
                            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ marginTop: "30px" }}>
                                <Link href="/syarat-ketentuan">
                                    <Typography variant='p' sx={TxtStyleMobile}>
                                        Syarat Ketentuan
                                    </Typography>
                                </Link>
                                <Divider orientation="vertical"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        borderRightWidth: 1,
                                        height: "20px",
                                        borderColor: "rgba(0, 0, 0, 0.40)"
                                    }} />
                                <Link href="/kebijakan-privasi">
                                    <Typography variant='p' sx={TxtStyleMobile}>
                                        Kebijakan Privasi
                                    </Typography>
                                </Link>
                            </Stack>
                        ) : null}
                    </Grid>
                </Grid>
            </div>
            <div style={{
                width: "90vw",
                maxWidth: "1260px",
                margin: "1.5% auto 1% auto",
            }}>
                <Divider
                    sx={{
                        display: isMobile600 ? "block" : "none",
                        padding: "5px 0",
                        mb: 3,
                        borderBottomWidth: 1,
                        borderColor: "rgba(0, 0, 0, 0.40)"
                    }} />
                <Box sx={{
                    display: isMobile600 ? "block" : "none",
                    width: "100%",
                    maxWidth: "600px",
                    textAlign: "center",
                }}>
                    <Typography variant='p'
                        sx={{
                            color: "rgba(0, 0, 0, 0.70)",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "204.182%",
                            letterSpacing: "-0.3px",
                        }}>
                        © Hak Cipta {year}. Pemerintah Provinsi Daerah Khusus Ibu Kota Jakarta.
                    </Typography>
                </Box>
                <Divider className={styles.FooterTitleDecription}
                    sx={{
                        display: isMobile600 ? "none" : "flex",
                        fontSize: "14px",
                        color: "rgba(0, 0, 0, 0.70)",

                        "&::before, &::after": {
                            borderTopColor: "rgba(0, 0, 0, 0.40)",
                        },
                    }}>
                    © Hak Cipta {year}. Pemerintah Provinsi Daerah Khusus Ibu Kota Jakarta.
                </Divider>
            </div>
        </main>
    )
}
