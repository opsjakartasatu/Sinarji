"use client";

import { motion } from "framer-motion";

import styles from "../../components/page.module.css";

import Navbar from "../../components/navbar/navbar";
import "../../components/navbar/style.css";
import Footer from "../../components/footer/footer";
import ScrollTop from "../../components/scrollTop";
import KritikSaran from "../../components/kritikSaran";
import Breadcrumbs from "../../components/breadcrumbs";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
    Accordion,
    AccordionActions,
    AccordionSummary,
    AccordionDetails,
    Button,
    Divider,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
    styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import { useEffect, useState } from "react";

const MiuAccordion = styled((props) => (
    <Accordion disableGutters elevation={0} square {...props} sx={{ margin: "10px 0" }} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "15px",
    '&::before': {
        display: 'none',
    },
}));

const MiuAccordionSummary = styled((props) => (
    <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    padding: "0 37px",
    textAlign: "start",
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },

    [theme.breakpoints.down('431')]: {
        padding: "0 10px",
    },
}));

const MiuAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "start",
    padding: "0 45px 20px 45px",

    [theme.breakpoints.down('431')]: {
        padding: "0 18px 20px 18px",
    },
}));

function faq() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));
    const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
    const isMobile900 = useMediaQuery(theme.breakpoints.down("md"));

    const breadcrumbs = [
        // { label: "Beranda", href: "/" },
        // { label: "Tentang" }
    ];

    const [faqList, setFaqList] = useState([]);

    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const handleAccordionChange = (panelId) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panelId : false);
    };

    useEffect(() => {
        document.title =
            "FAQ | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";

        // Ambil data FAQ dari API
        fetch(
            "https://jakartasatu.jakarta.go.id/apimobile/internal/backend/tanyajawab"
        )
            .then((res) => res.json())
            .then((response) => {
                console.log("RESPON API:", response);
                if (response.status === "success") {
                    setFaqList(response.data);
                } else {
                    console.error("API status not success");
                }
            })
            .catch((err) => {
                console.error("Gagal fetch data FAQ:", err);
            });
    }, []);

    const navbarVariants = {
        hidden: { opacity: 0, y: -25 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

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
                    <div className={styles.container}>
                        <section
                            style={{
                                width: "90vw",
                                maxWidth: "1260px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={1}
                            >
                                <Typography
                                    variant="p"
                                    style={{
                                        color: "var(--jakartasatu-biru)",
                                        textAlign: "center",
                                        fontSize: "36px",
                                        fontWeight: "800",
                                    }}
                                >
                                    Pertanyaan yang Sering Diajukan
                                </Typography>
                            </Stack>
                            <Divider
                                style={{
                                    margin: "15px auto 10px auto",
                                    backgroundColor: "var(--jakartasatu-biru)",
                                    height: 5,
                                    width: "75px",
                                    borderRadius: "4px",
                                }}
                            />
                            <Stack
                                direction={{ xs: "column", sm: "column", md: "row" }}
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            ></Stack>
                        </section>

                        <section style={{ width: "90vw", maxWidth: "1260px", paddingTop: "50px" }} >
                            {faqList.length > 0 ? (
                                faqList.map((item) => (
                                    <MiuAccordion
                                        key={item.id}
                                        expanded={expandedAccordion === item.id}
                                        onChange={handleAccordionChange(item.id)}>
                                        <MiuAccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="p" sx={{
                                                color: "var(--jakartasatu-biru)",
                                                fontSize: "20px",
                                                fontWeight: 600,
                                                lineHeight: "150%",
                                                letterSpacing: "-0.38px",
                                            }}>
                                                {item.pertanyaan}
                                            </Typography>
                                        </MiuAccordionSummary>
                                        <MiuAccordionDetails>
                                            <Typography variant="p" sx={{
                                                color: "rgba(0, 0, 0, 0.60)",
                                                textAlign: "justify",
                                                fontSize: "16px",
                                                fontWeight: 600,
                                                lineHeight: "30px",
                                                letterSpacing: "-0.304px",
                                            }}>
                                                {item.jawaban}
                                            </Typography>
                                        </MiuAccordionDetails>
                                    </MiuAccordion>
                                ))
                            ) : (
                                <Typography>Memuat pertanyaan...</Typography>
                            )}
                        </section>
                    </div>

                    <Footer />
                </motion.div>
            </main>
            <KritikSaran />
            <ScrollTop />
        </>
    );
}

export default faq;
