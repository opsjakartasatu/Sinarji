"use client"

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Stack,
    Tooltip,
    Typography,
    Paper,
    useMediaQuery,
    useTheme,
    TextField,
    Grow,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    IconButton
} from "@mui/material";
import {
    forwardRef,
    useEffect,
    useState
} from "react";

import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from "axios";

const Transition = forwardRef(function Transition(props, ref) {
    return <Grow direction="up" ref={ref} {...props} />;
});

function KritikSaran({ open: propOpen, onClose: propOnClose }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("431"));

    const [scrollPosition, setScrollPosition] = useState(0);
    const [showForm, setShowForm] = useState(false);

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [kritikSaran, setKritikSaran] = useState("");
    const [kategori, setKategori] = useState("");

    // Gunakan prop open jika tersedia, jika tidak gunakan state internal
    const isOpen = propOpen !== undefined ? propOpen : showForm;

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleOpenForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        if (propOnClose) {
            propOnClose(); // Gunakan prop onClose jika tersedia
        } else {
            setShowForm(false); // Jika tidak, gunakan state internal
        }
    };

    const handleChangeNama = (event) => {
        setNama(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangeKritikSaran = (event) => {
        setKritikSaran(event.target.value);
    };

    const handleChangeKategori = (event) => {
        setKategori(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                process.env.API_DEV + "/v4/kritik-saran",
                { nama, email, kritik_saran: kritikSaran, kategori });
            console.log('Response:', response.data);

            // Reset form
            setNama("");
            setEmail("");
            setKritikSaran("");
            setKategori("");

            handleCloseForm();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            {/* Hanya tampilkan FAB jika tidak dipanggil dari parent component */}
            {propOpen === undefined && (
                <Box sx={{
                    position: 'fixed',
                    bottom: scrollPosition >= 403 ? 75 : 25,
                    transition: "bottom 0.2s ease-in-out",
                    right: 26,
                }}>
                    <Tooltip placement="left" title="Kritik dan saran">
                        <Fab id="btnScrollTop"
                            onClick={handleOpenForm}
                            disableRipple
                            size="small"
                            color="info"
                            sx={{
                                width: "45px",
                                height: "45px",
                                backgroundColor: '#F7941D',
                                boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
                            }}>
                            <RateReviewRoundedIcon style={{ color: "white" }} />
                        </Fab>
                    </Tooltip>
                </Box>
            )}

            <Dialog
                open={isOpen}
                onClose={handleCloseForm}
                maxWidth="sm"
                TransitionComponent={Transition}
                keepMounted
                hideBackdrop={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ sx: { borderRadius: "15px" } }}
                sx={{ backdropFilter: "blur(10px)" }}>
                <Button onClick={handleCloseForm} sx={{ padding: 0 }}>
                    <CloseRoundedIcon
                        sx={{
                            position: "absolute",
                            margin: "45px 15px 0 0",
                            right: "0",
                        }} />
                </Button>
                <DialogContent sx={{ padding: isMobile ? "20px" : "50px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: { xs: '20px', sm: '0' } }}>
                        <Typography variant="p"
                            style={{
                                color: 'var(--jakartasatu-biru)',
                                textAlign: "center",
                                fontSize: "36px",
                                fontWeight: "800",
                            }}>
                            Kritik dan Saran
                        </Typography>
                        <Divider
                            style={{
                                margin: '15px auto 25px auto',
                                backgroundColor: 'var(--jakartasatu-biru)',
                                height: 5,
                                width: '75px',
                                borderRadius: '4px',
                            }}
                        />
                    </Box>
                    <Typography variant="p" paragraph
                        sx={{
                            color: "rgba(0, 0, 0, 0.70)",
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: "500",
                            lineHeight: "180%",
                        }}>
                        Kami senang atas kontribusimu membangun Jakarta Satu
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Nama"
                            value={nama}
                            onChange={handleChangeNama}
                            variant="outlined"
                            InputProps={{ style: { fontFamily: 'var(--font-family)' } }}
                            InputLabelProps={{ style: { fontFamily: 'var(--font-family)' } }}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            value={email}
                            onChange={handleChangeEmail}
                            variant="outlined"
                            InputProps={{ style: { fontFamily: 'var(--font-family)' } }}
                            InputLabelProps={{ style: { fontFamily: 'var(--font-family)' } }}
                            sx={{ mb: 3 }}
                        />
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel sx={{ fontFamily: 'var(--font-family)' }}>Kategori</InputLabel>
                            <Select
                                value={kategori}
                                onChange={handleChangeKategori}
                                label="Kategori"
                                sx={{ fontFamily: 'var(--font-family)' }}
                            >
                                <MenuItem value="Berita" sx={{ fontFamily: 'var(--font-family)' }}>Berita</MenuItem>
                                <MenuItem value="Data" sx={{ fontFamily: 'var(--font-family)' }}>Data</MenuItem>
                                <MenuItem value="Peta" sx={{ fontFamily: 'var(--font-family)' }}>Peta</MenuItem>
                                <MenuItem value="Lainnya" sx={{ fontFamily: 'var(--font-family)' }}>Lainnya</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Kritik dan saran"
                            value={kritikSaran}
                            onChange={handleChangeKritikSaran}
                            variant="outlined"
                            multiline
                            rows={4}
                            InputProps={{ style: { fontFamily: 'var(--font-family)' } }}
                            InputLabelProps={{ style: { fontFamily: 'var(--font-family)' } }}
                            sx={{ mb: 3 }}
                        />
                        <Box sx={{ textAlign: "center" }}>
                            <Button id="submitKritikSaran" type="submit" variant="contained" color="primary"
                                sx={{
                                    mr: 1,
                                    fontFamily: 'var(--font-family)',
                                    fontSize: isMobile ? "15px" : "18px",
                                    padding: "4px 35px",
                                    textTransform: "none",
                                    borderRadius: "30px",
                                    color: "white",
                                    background: 'var(--jakartasatu-biru)'
                                }}>
                                Kirim
                            </Button>
                            <Button id="closeDialogKritikSaran" onClick={handleCloseForm} variant="contained" color="primary"
                                sx={{
                                    mr: 1,
                                    fontFamily: 'var(--font-family)',
                                    fontSize: isMobile ? "15px" : "18px",
                                    padding: "4px 35px",
                                    textTransform: "none",
                                    borderRadius: "30px",
                                    color: "white",
                                    background: 'var(--jakartasatu-biru)'
                                }}>
                                Batal
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default KritikSaran;