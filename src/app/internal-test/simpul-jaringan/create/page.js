"use client"

import { motion } from 'framer-motion';

import styles from "../../../page.module.css";
import KritikSaran from '@/components/kritikSaran';
import ScrollTop from '@/components/scrollTop';

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import {
    Button,
    OutlinedInput,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from '@/components/CustomImage';

function createSimpulJaringan() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
    const isMobile900 = useMediaQuery(theme.breakpoints.down("md"));

    const breadcrumbs = [
        // { label: "Beranda", href: "/" },
        // { label: "Tentang" }
    ];

    const arrowStyles = {
        position: 'absolute',
        background: '#F7941D',
        borderRadius: "50px",
        color: 'white',
        border: 'none',
        zIndex: 2,
        top: 'calc(43% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer',
    };

    const indicatorStyles = {
        background: '#D9D9D9',
        borderRadius: 30,
        width: 15,
        height: 15,
        display: 'inline-block',
        margin: isMobile ? '9vw 8px' : '0 6px',
        cursor: 'pointer',
    };

    useEffect(() => {
        document.title = "Tentang | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    return (
        <>
            <div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
                            <Typography variant="p"
                                style={{
                                    color: 'var(--jakartasatu-biru)',
                                    textAlign: "center",
                                    fontSize: "32px",
                                    fontWeight: "600",
                                }}>
                                Create Simpul Jaringan
                            </Typography>
                            <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} sx={{ width: "100%" }}>
                                <OutlinedInput
                                    type="search"
                                    placeholder="Cari..."
                                    // value={search}
                                    // onChange={handleSearchChange}
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        width: '100%',
                                        height: '40px',
                                        borderRadius: '40px',
                                        background: 'white',
                                        border: "2px solid rgba(0, 69, 129, 0.30)",
                                        boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
                                    }}
                                />
                                <Button variant="contained" disableElevation disableRipple disableTouchRipple startIcon={<AddRoundedIcon />}
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        textTransform: "none",
                                        padding: "0 30px",
                                        height: "40px",
                                        color: "white",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        lineHeight: "100%",

                                        background: 'var(--jakartasatu-biru)',
                                        borderRadius: "30px",
                                    }}>
                                    Tambah
                                </Button>
                            </Stack>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Dessert (100g serving)</TableCell>
                                            <TableCell align="right">Calories</TableCell>
                                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </div>

                </motion.div>
            </div>
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default createSimpulJaringan;