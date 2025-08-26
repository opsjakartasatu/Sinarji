"use client"

import { motion } from 'framer-motion';

import styles from "../../../page.module.css";
import KritikSaran from '@/components/kritikSaran';
import ScrollTop from '@/components/scrollTop';

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import {
    Box,
    Button,
    OutlinedInput,
    Paper,
    Stack,
    styled,
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
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function editSimpulJaringan() {
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

    const nameLabel = {
        color: "var(--jakartasatu-biru)",
        fontSize: "16px",
        fontWeight: 600,
    }

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const { data: session } = useSession();
    const [simpulJaringanList, setSimpulJaringanList] = useState({
        judul: '',
    });

    const handleInputChange = (fieldName) => (event) => {
        setSimpulJaringanList(prev => ({
            ...prev,
            [fieldName]: event.target.value
        }));
    };

    useEffect(() => {
        document.title = "Edit Simpul Jaringan | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        const getSimpulJaringanList = async () => {
            const simpulJaringanId = session?.user?.simpul_jaringan?.[0]?.id;

            if (simpulJaringanId) {
                const response = await axios.get(
                    process.env.API_WEB + `/simpul-jaringan/${simpulJaringanId}`
                );
                const newsLatest = response.data.data;

                setSimpulJaringanList(newsLatest);
            }
        };

        getSimpulJaringanList();
    }, []);

    const [fileName, setFileName] = useState('');
    const [zipFile, setZipFile] = useState(null);
    const [status, setStatus] = useState("upload");

    const submitHandle = async (e) => {
        e.preventDefault();
        if (!zipFile) return;

        setStatus("pending");

        try {
            const data = new FormData();
            data.set("zipFile", zipFile);
            data.set("name", modelName);
            data.set("longitude", coordinate.longitude);
            data.set("latitude", coordinate.latitude);
            data.set("altitude", coordinate.altitude);
            data.set("heading", heading);
            data.set("scale", scale);
            data.set("is_public", isPublic.toString());
            data.set("owner", session.user.name);

            const res = await fetch("", {
                method: "POST",
                body: data,
            });

            if (!res.ok) throw new Error(await res.text());

            setStatus("berhasil");
            getData();
            handleClose();

            Swal.fire({
                title: 'Upload Data Berhasil',
                imageUrl: "",
                imageWidth: 192,
                imageHeight: 192,
                confirmButtonText: 'OK',
                allowOutsideClick: false,
            });

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", rowGap: "30px", }}>
                        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
                            <Typography variant="p"
                                style={{
                                    color: 'var(--jakartasatu-biru)',
                                    textAlign: "center",
                                    fontSize: "32px",
                                    fontWeight: "600",
                                }}>
                                Edit Simpul Jaringan
                            </Typography>
                            <Typography variant='p'
                                sx={{
                                    color: "rgba(0, 0, 0, 0.70)",
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "180%",
                                }}>
                                Halaman untuk mengubah atau memperbarui data dari profil simpul jaringan SKPD (Satuan Kerja Perangkat Daerah)
                            </Typography>
                        </Stack>

                        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={3} sx={{
                            padding: "30px",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            boxShadow: "0px 15px 50px 0px rgba(0, 0, 0, 0.10)",
                        }}>
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1} sx={{ width: "100%", }}>
                                <Typography variant='p'
                                    sx={nameLabel}>
                                    Judul
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    placeholder="Judul"
                                    value={simpulJaringanList.judul}
                                    onChange={handleInputChange('judul')}
                                    // value={search}
                                    // onChange={handleSearchChange}
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        height: '48px',
                                        borderRadius: '10px',
                                        background: 'white',
                                        // border: '2px solid rgba(0, 69, 129, 0.30)',
                                    }}
                                />
                            </Stack>
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1} sx={{ width: "100%", }}>
                                <Typography variant='p'
                                    sx={nameLabel}>
                                    Deskripsi
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    placeholder="Masukkan deskripsi"
                                    // value={search}
                                    // onChange={handleSearchChange}
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        height: '48px',
                                        borderRadius: '10px',
                                        background: 'white',
                                        // border: '2px solid rgba(0, 69, 129, 0.30)',
                                    }}
                                />
                            </Stack>
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1} sx={{ width: "100%", }}>
                                <Typography variant='p'
                                    sx={nameLabel}>
                                    Alamat URL Website
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    placeholder="Masukkan URL"
                                    // value={search}
                                    // onChange={handleSearchChange}
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        height: '48px',
                                        borderRadius: '10px',
                                        background: 'white',
                                        // border: '2px solid rgba(0, 69, 129, 0.30)',
                                    }}
                                />
                            </Stack>
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1} sx={{ width: "100%", }}>
                                <Typography variant='p'
                                    sx={nameLabel}>
                                    Alamat Kantor
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    placeholder="Masukkan alamat kantor"
                                    // value={search}
                                    // onChange={handleSearchChange}
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        height: '48px',
                                        borderRadius: '10px',
                                        background: 'white',
                                        // border: '2px solid rgba(0, 69, 129, 0.30)',
                                    }}
                                />
                            </Stack>
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1} sx={{ width: "100%", }}>
                                <Typography variant='p'
                                    sx={nameLabel}>
                                    Narahubung
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    placeholder="Masukkan narahubung"
                                    // value={search}
                                    // onChange={handleSearchChange}
                                    sx={{
                                        fontFamily: 'var(--font-family)',
                                        height: '48px',
                                        borderRadius: '10px',
                                        background: 'white',
                                        // border: '2px solid rgba(0, 69, 129, 0.30)',
                                    }}
                                />
                            </Stack>
                            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1} sx={{ width: "100%", }}>
                                <Typography variant='p'
                                    sx={nameLabel}>
                                    Logo
                                </Typography>
                                <Typography variant='p'
                                    sx={{
                                        color: "rgba(0, 0, 0, 0.70)",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                    }}>
                                    Hanya mendukung file dengan jenis JPG, JPEG, dan PNG
                                </Typography>
                                <Stack direction={{ xs: "col", sm: "row", md: "row", lg: "row", xl: "row" }}
                                    alignItems={{ xs: "flex-start", sm: "center", md: "center", lg: "center", xl: "center" }}
                                    justifyContent="flex-start" gap={1} sx={{ width: "100%", }}>
                                    <Button
                                        disableElevation
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        accept=".zip"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setZipFile(file);
                                                setFileName(file.name);
                                            } else {
                                                setFileName('');
                                            }
                                        }}
                                        required
                                        tabIndex={-1}
                                        startIcon={<CloudUploadOutlinedIcon />}
                                        sx={{
                                            background: "var(--jakartasatu-biru)",
                                            borderRadius: "10px",
                                            padding: "10px 20px",

                                            fontSize: "16px",
                                            fontWeight: "500",
                                            textTransform: "none",
                                        }}
                                    >
                                        Unggah Logo
                                        <VisuallyHiddenInput type="file" />
                                    </Button>
                                    <Box sx={{
                                        background: "#B3C7D9",
                                        borderRadius: "5px",
                                        display: "flex",
                                        width: "100%",
                                        maxWidth: "300px",
                                        height: "32px",
                                        padding: "0px 12px",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}>
                                        <Typography variant="p" sx={{
                                            color: "#0B0B0B",
                                            fontSize: "12px",
                                            fontWeight: 400,
                                            overflowWrap: "break-word",
                                            wordBreak: "break-word",
                                        }}>
                                            {fileName ? `${fileName}` : "Tidak ada file yang dipilih"}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={3} sx={{ width: "100%", justifyContent: "flex-end" }}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        border: "none",
                                        backgroundColor: 'transparent',
                                        textTransform: "none",
                                        color: "var(--jakartasatu-biru)",
                                        fontSize: "18px",
                                        fontWeight: 600,
                                        lineHeight: "150%",
                                        letterSpacing: "-0.342px",

                                        '&:hover': {
                                            border: "none",
                                            backgroundColor: 'transparent',
                                            opacity: 0.9,
                                        }
                                    }}
                                >
                                    Batal
                                </Button>
                                <Button
                                    disableElevation
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#07975C',
                                        borderRadius: "40px",
                                        height: "50px",
                                        padding: "0px 30px",

                                        textTransform: "none",
                                        color: "white",
                                        fontSize: "18px",
                                        fontWeight: 600,
                                        lineHeight: "150%",
                                        letterSpacing: "-0.342px",

                                        '&:hover': {
                                            backgroundColor: '#07975C',
                                            opacity: 0.9,
                                        }
                                    }}
                                >
                                    Simpan
                                </Button>
                            </Stack>
                        </Stack>
                    </div>

                </motion.div >
            </div >
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default editSimpulJaringan;