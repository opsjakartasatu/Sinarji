"use client"

import { motion } from 'framer-motion';

import styles from "../../../../components/page.module.css";
import Navbar from '../../../../components/navbar/navbar';
import "../../../../components/navbar/style.css";
import Footer from '../../../../components/footer/footer';
import ScrollTop from '../../../../components/scrollTop';
import KritikSaran from '../../../../components/kritikSaran';
import Breadcrumbs from '../../../../components/breadcrumbs';

import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';

import { useEffect } from "react";

const Map = dynamic(() => import("./Main"), { ssr: false, webpack: false });

const page = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    useEffect(() => {
        document.title = "Peta Smart RDTR | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
    }, []);

    const breadcrumbs = [
        { label: "Beranda", href: "/" },
        { label: "Smart RDTR", href: "/layanan/smart-rdtr" },
        { label: "Peta Smart RDTR" }
    ];

    return (
        <>
            <main className={styles.main}>
                <motion.div
                    className="navbar"
                    variants={navbarVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Navbar />
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <div className={styles.container} style={{ marginTop: "20px", width: "100%" }}>
                        <section style={{ marginTop: "50px", marginBottom: "-60px", width: "95vw", maxWidth: "1340px" }}>
                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <Typography variant="p"
                                    style={{
                                        color: 'var(--jakartasatu-biru)',
                                        textAlign: "center",
                                        fontSize: "36px",
                                        fontWeight: "800",
                                    }}>
                                    Smart RDTR
                                </Typography>
                                <Divider
                                    style={{
                                        margin: "15px auto 40px auto",
                                        backgroundColor: 'var(--jakartasatu-biru)',
                                        height: 5,
                                        width: '75px',
                                        borderRadius: '4px',
                                    }}
                                />
                            </Box>
                            <Map isWidget={false} />
                        </section>
                    </div>

                    <Footer />
                </motion.div>
            </main>
            <KritikSaran />
            <ScrollTop />
        </>
    )
}

export default page
