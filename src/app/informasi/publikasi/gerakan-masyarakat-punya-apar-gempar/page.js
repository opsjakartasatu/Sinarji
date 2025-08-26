"use client"

import { motion } from 'framer-motion';

import styles from "../../../../components/page.module.css";

import Navbar from '../../../../components/navbar/navbar';
import "../../../../components/navbar/style.css";
import Footer from '../../../../components/footer/footer';
import ScrollTop from '../../../../components/scrollTop';
import KritikSaran from '../../../../components/kritikSaran';
import Breadcrumbs from '../../../../components/breadcrumbs';

import Gempar from "./gempar";

import PropTypes from 'prop-types';

import { useEffect, useState } from "react";
import { Box, Button, Card, Tab, Tabs, Typography, useMediaQuery, useTheme, Select, MenuItem, CircularProgress, OutlinedInput, IconButton, Stack, InputAdornment, Pagination, PaginationItem } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import axios from "axios";
import CustomImage from '@/components/CustomImage';
import { useParams } from 'next/navigation';

function risetDetailPublikasi() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Riset & Publikasi" }
    ];

    const [risetList, setRisetList] = useState([]);

    useEffect(() => {
        document.title = "Riset | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className={styles.container} style={{ width: "100%" }}>
                    <section id="welcomeEvent" style={{ margin: "0 auto", width: "100%", maxWidth: "1440px" }}>
                        <Gempar />
                    </section>
                </div>

            </motion.div>
        </>
    );
}

export default risetDetailPublikasi;