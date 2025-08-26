"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isASN, setisASN] = useState("");
  const [instansi, setInstansi] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [nrk, setNrk] = useState("");
  const [isValid, setIsValid] = useState(null);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isSmallMobile = useMediaQuery("(max-width: 480px)");

  const getTermsHeightByState = () => {
    const baseFormHeight = {
      initial: 600,
      asn_ya: 780,
      asn_tidak: 870,
    };

    if (isASN === "") {
      return baseFormHeight.initial;
    } else if (isASN === "ya") {
      return baseFormHeight.asn_ya;
    } else if (isASN === "tidak") {
      return baseFormHeight.asn_tidak;
    }

    return baseFormHeight.initial;
  };

  useEffect(() => {
    if (selectRef.current) {
      const updateHeight = () => {};

      setTimeout(updateHeight, 100);
    }
  }, [isASN]);

  const instansiOptions = [
    "Sekretariat Daerah",
    "Dinas Kebudayaan Provinsi DKI Jakarta",
    "Dinas Sumber Daya Air",
  ];

  const handleCheckNRK = () => {
    if (/^\d{6}$/.test(nrk)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // const calculateTermsHeight = () => {
  //   const baseHeight = 570;
  //   const passwordSectionHeight = 120;
  //   const asnSectionHeight = isASN === "ya" ? 160 : isASN === "tidak" ? 80 : 0;
  //   const checkboxHeight = 40;
  //   const buttonHeight = 60;

  //   return (
  //     baseHeight +
  //     passwordSectionHeight +
  //     asnSectionHeight +
  //     checkboxHeight +
  //     buttonHeight
  //   );
  // };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [selectWidth, setSelectWidth] = useState(0);
  const selectRef = useRef(null);

  useEffect(() => {
    const updateSelectWidth = () => {
      if (selectRef.current) {
        const width = selectRef.current.getBoundingClientRect().width;
        setSelectWidth(width);
      }
    };

    updateSelectWidth();

    window.addEventListener("resize", updateSelectWidth);

    const timer = setTimeout(updateSelectWidth, 50);

    return () => {
      window.removeEventListener("resize", updateSelectWidth);
      clearTimeout(timer);
    };
  }, [isMobile, isASN]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const callbackUrl = new URLSearchParams(window.location.search).get(
      "callbackUrl"
    );
    setError("");

    try {
      const res = await signUp("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau password salah!");
        console.error("Register gagal:", res.error);
        return;
      }

      if (!callbackUrl) {
        router.push("/");
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TermsAndConditions = ({ isMobileVersion = false }) => {
    const calculatedHeight = getTermsHeightByState();
    return (
      <Box
        sx={{
          backgroundColor: "#F7F6FF",
          width: "100%",
          maxWidth: isMobileVersion ? "100%" : "540px",
          height: isMobileVersion ? "400px" : `${calculatedHeight}px`,
          borderRadius: "8px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "height 0.3s ease-in-out",
          mt: isMobileVersion ? 3 : 0,
          boxShadow: isMobileVersion ? 2 : 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#003577",
            borderRadius: "8px 8px 0 0",
            height: "42px",
            color: "white",
            fontSize: "17px",
            fontWeight: "600",
            flexShrink: 0,
          }}
        >
          Syarat dan Ketentuan
        </Box>

        <Box
          sx={{
            padding: "20px",
            flex: 1,
            overflowY: "auto",
            fontSize: "12px",
            lineHeight: "1.5",
            borderRadius: "0 0 8px 8px",
            "::-webkit-scrollbar": {
              width: "8px",
            },
            "::-webkit-scrollbar-track": {
              borderRadius: "4px",
              margin: "10px",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#003577",
              borderRadius: "5px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#002b5e",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "15px",
              fontWeight: "600",
              mb: 2,
              color: "#133473",
            }}
          >
            Selamat Datang di Jakarta Satu
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontSize: "14px", mb: 2, textAlign: "justify" }}
          >
            Syarat & ketentuan yang ditetapkan di bawah ini mengatur Pengguna
            layanan yang yang disediakan oleh <strong>Jakarta Satu</strong>,
            baik berupa informasi, teks, grafik, atau data lain, unduhan,
            unggahan, atau menggunakan layanan (secara garis besar disebut
            sebagai data atau konten). Pengguna disarankan membaca dengan
            seksama karena dapat berdampak kepada hak dan kewajiban Pengguna di
            bawah hukum.
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontSize: "14px", mb: 2, textAlign: "justify" }}
          >
            Dengan mendaftar dan/atau menggunakan aplikasi{" "}
            <strong>Jakarta Satu</strong>, maka Pengguna dianggap telah membaca,
            mengerti, memahami, dan menyetujui semua isi dalam Syarat &
            Ketentuan. Syarat & Ketentuan ini merupakan bentuk kesepakatan yang
            dituangkan dalam sebuah perjanjian yang sah antara Pengguna dengan
            aplikasi
            <strong> Jakarta Satu</strong>. Jika Pengguna tidak menyetujui salah
            satu, sebagian, atau seluruh isi Syarat & Ketentuan, maka Pengguna
            tidak diperkenankan menggunakan layanan di aplikasi{" "}
            <strong>Jakarta Satu</strong>.
          </Typography>

          <Typography variant="body2" sx={{ fontSize: "14px", mb: 2 }}>
            Perjanjian ini berlaku sejak tanggal <u>27 September 2022</u>.
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontSize: "14px", mb: 2, textAlign: "justify" }}
          >
            Kami berhak untuk mengubah Syarat & Ketentuan ini dari waktu ke
            waktu tanpa pemberitahuan. Pengguna mengakui dan menyetujui bahwa
            merupakan tanggung jawab Pengguna untuk meninjau Syarat & Ketentuan
            ini secara berkala untuk mengetahui perubahan apa pun. Dengan tetap
            mengakses dan menggunakan layanan <strong>Jakarta Satu</strong>,
            maka Pengguna dianggap menyetujui perubahan-perubahan dalam Syarat &
            Ketentuan.
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}
          >
            Larangan
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontSize: "14px", mb: 2, textAlign: "justify" }}
          >
            Pengguna dapat menggunakan layanan <strong>Jakarta Satu</strong>{" "}
            hanya untuk tujuan yang sah. Pengguna tidak dapat menggunakan
            layanan
            <strong> Jakarta Satu</strong> dengan cara apa pun yang:
          </Typography>

          <Box component="ol" sx={{ pl: 2, fontSize: "14px" }}>
            <Box component="li" sx={{ mb: 1 }}>
              melanggar peraturan perundang-undangan yang berlaku di Negara
              Kesatuan Republik Indonesia;
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              dengan cara apa pun, melanggar hukum atau melakukan perbuatan atau
              memiliki tujuan atau efek yang melanggar hukum
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              merugikan atau berupaya untuk menyakiti individu atau entitas lain
              dengan cara apa pun;
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              memperbanyak, menggandakan, menyalin, menjual, menjual kembali,
              atau mengeksploitasi bagian manapun dari layanan, penggunaan
              layanann, atau akses ke layanan tanpa izin tertulis dari{" "}
              <strong>Jakarta Satu</strong>;
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              dengan cara apa pun, melanggar hukum atau melakukan perbuatan atau
              memiliki tujuan atau efek yang melanggar hukum
            </Box>
            <Typography variant="body2" sx={{ fontSize: "14px", mb: 2 }}>
              dan hal-hal yang telah disebutkan di atas akan berakibat pada
              pemutusan akun secepatnya dan akan diproses ke ranah hukum.{" "}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "14px", mb: 2, textAlign: "justify" }}
            >
              Pengguna wajib menggunakan layanan <strong>Jakarta Satu</strong>{" "}
              dengan bijak dan baik yaitu dengan menghindari kata-kata seperti:
            </Typography>

            <Box component="ol" sx={{ pl: 2, fontSize: "14px" }}>
              <Box component="li" sx={{ mb: 1 }}>
                hinaan dan/atau kata kasar;
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                mengandung SARA;
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                bersifat pornografi; dan
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                mengundang provokasi
              </Box>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ fontSize: "14px", mb: 2 }}>
            dan hal-hal yang telah disebutkan di atas akan berakibat pada
            penghapusan konten yang dipublikasikan di{" "}
            <strong>Jakarta Satu.</strong>{" "}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px", mb: 2 }}>
            Pengguna menyatakan dan menjamin bahwa tidak akan menggunakan
            layanan untuk mengunggah, memasang (posting), memberikan tautan,
            email, mengirimkan (transmit), atau menyediakan bahan apa pun yang
            mengandung virus atau kode komputer lainnya, file, atau program yang
            dirancang untuk mengganggu, merusak, atau membatasi fungsi perangkat
            lunak komputer atau perangkat keras atau peralatan telekomunikasi
            lainnya. Pengguna juga tidak akan mengunggah atau mendistribusikan
            program komputer yang merusak, mengganggu, memotong, atau mengambil
            alih sistem, data, atau informasi pribadi. Pengguna juga menyatakan
            dan menjamin bahwa Pengguna tidak akan mengganggu fungsi situs
            dengan cara apa pun.{" "}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}
          >
            Privasi
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px", mb: 2 }}>
            Privasi Pengguna adalah hal yang sangat penting bagi kami. Pengguna
            layanan tunduk pada kebijakan privasi <strong>Jakarta Satu</strong>,
            yang menjelaskan bagaimana <strong>Jakarta Satu</strong>{" "}
            mengumpulkan dan menggunakan informasi pribadi Pengguna.{" "}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}
          >
            Retensi Data
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px", mb: 2 }}>
            <strong>Jakarta Satu</strong> akan menyimpan data Pengguna (data
            atau informasi yang Pengguna berikan kepada{" "}
            <strong>Jakarta Satu</strong> atau yang{" "}
            <strong>Jakarta Satu</strong> kumpulkan dari Pengguna, termasuk data
            pribadi Pengguna, baik pada saat Pengguna melakukan pendaftaran di
            aplikasi, mengakses aplikasi, maupun mempergunakan layanan-layanan
            pada aplikasi (selanjutnya disebut sebagai data)) di server database
            utama selama akun Pengguna saat ini dan aktif.
            <strong> Jakarta Satu</strong> tidak bertanggung jawab atas kerugian
            atau kerusakan dari draft data yang Pengguna simpan di perangkat
            komputasi Pengguna dan data yang disimpan di server database utama
            kami yang terjadi sebagai akibat dari penggunaan layanan kami yang
            tidak semestinya. Dan kami tidak akan mengakomodasi permintaan untuk
            memulihkan data dari sistem cadangan kami kecuali ada kehilangan
            data karena kegagalan sistem atau perangkat keras di pihak kami.
            Tidak ada pengecualian.{" "}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}
          >
            Penghentian Layanan
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px", mb: 2 }}>
            Pengguna setuju bahwa kami dapat, atas kebijakan kami sendiri,
            menangguhkan atau menghentikan akses Pengguna ke semua atau sebagian
            dari layanan dan sumber daya kami dengan atau tanpa pemberitahuan
            dan karena alasan apa pun, termasuk, tanpa batasan, pelanggaran
            Syarat & Ketentuan ini. Setiap aktivitas yang dicurigai ilegal,
            curang (penipuan), atau tidak wajar dapat menjadi alasan untuk
            mengakhiri hubungan Pengguna dan dapat dirujuk ke otoritas penegak
            hukum yang sesuai. Setelah penangguhan atau penghentian, hak
            Pengguna untuk menggunakan sumber daya yang kami sediakan akan
            segera berhenti, dan kami berhak untuk menghapus informasi apa pun
            yang Pengguna miliki di file kami, termasuk akun atau informasi saat
            login.{" "}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}
          >
            Kepemilikan Data
          </Typography>
          <Box component="ul" sx={{ pl: 2, fontSize: "14px" }}>
            <Box component="li" sx={{ mb: 1 }}>
              Pengguna sebagai pengguna layanan <strong>Jakarta Satu</strong>{" "}
              memiliki tanggung jawab untuk memastikan bahwa Pengguna memiliki
              hak atau izin yang diperlukan untuk konten Pengguna.
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              Pengguna mempertahankan kepemilikan konten Pengguna. Kami tidak
              mengklaim hak kekayaan intelektual atas materi yang Pengguna
              berikan kepada layanan. Profil Pengguna, data, dan materi lain
              yang diunggah akan tetap menjadi milik Pengguna.
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              <strong>Jakarta Satu</strong> tidak menyaring atau memantau
              konten, tetapi 
              <strong> Jakarta Satu</strong> dan yang ditunjuk memiliki hak
              (tetapi bukan kewajiban) atas kebijakannya sendiri untuk menolak
              atau menghapus konten apa pun yang tersedia melalui layanan.
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}
          >
            Modifikasi Layanan
          </Typography>
          <Box component="ul" sx={{ pl: 2, fontSize: "14px" }}>
            <Box component="li" sx={{ mb: 1 }}>
              <strong>Jakarta Satu</strong> berhak setiap saat dan dari waktu ke
              waktu untuk memodifikasi atau menghentikan, sementara atau secara
              permanen, layanan (atau bagiannya) dengan atau tanpa
              pemberitahuan.
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              <strong>Jakarta Satu</strong> tidak akan bertanggung jawab kepada
              Pengguna atau kepada pihak ketiga untuk modifikasi apa pun,
              penangguhan, atau penghentian layanan.
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}
          >
            Penolakan Jaminan
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px", mb: 2 }}>
            Layanan <strong>Jakarta Satu</strong> dan semua elemennya disediakan
            atas dasar sebagaimana adanya tanpa jaminan apa pun, tersurat maupun
            tersirat. <strong>Jakarta Satu</strong> tidak membuat jaminan atau
            pernyataan mengenai keakuratan konten yang ada di layanan.{" "}
            <strong>Jakarta Satu </strong>
            tidak menjamin bahwa layanan akan beroperasi atau bekerja tanpa
            terganggu atau bebas dari kesalahan, atau bahwa server basis data
            utama atau <i>server host</i> akan bebas dari virus atau kode
            berbahaya atau kesalahan tak terduga lainnya.{" "}
            <strong>Jakarta Satu</strong> tidak membuat jaminan bahwa informasi
            yang disajikan pada layanan merupakan informasi terkini atau akurat.{" "}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}
          >
            Batasan Tanggung Jawab
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px", mb: 2 }}>
            Pengguna memahami dan menyetujui bahwa Jakarta Satu tidak akan
            bertanggung jawab atas kerusakan langsung, tidak langsung,
            insidental, khusus, konsekuensial termasuk tetapi tidak terbatas,
            pada kerusakan untuk kehilangan keuntungan, penggunaan, data, atau
            kerugian tidak berwujud lainnya (bahkan jika Jakarta Satu telah
            diberitahu tentang kemungkinan kerusakan tersebut), yang dihasilkan
            dari:{" "}
          </Typography>
          <Box component="ol" sx={{ pl: 2, fontSize: "14px" }}>
            <Box component="li" sx={{ mb: 1 }}>
              penggunaan atau ketidakmampuan untuk menggunakan layanan oleh
              Pengguna;
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              akses tidak sah atau perubahan transmisi atau data Pengguna;
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              kegagalan atau kesalahan layanan milik pihak ketiga;
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              pernyataan atau perilaku pihak ketiga di layanan{" "}
              <strong>Jakarta Satu</strong>; dan
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              atau hal lain yang berkaitan dengan layanan pihak ketiga.
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}
          >
            Pengakuan dan Persetujuan
          </Typography>
          <Box component="ol" sx={{ pl: 2, fontSize: "14px" }}>
            <Box component="li" sx={{ mb: 1 }}>
              Pengguna menyatakan informasi pribadi yang diserahkan kepada
              <strong> Jakarta Satu</strong> pada saat pendaftaran akun atau
              pembaharuan merupakan data yang akurat dan mutakhir;
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              Dalam hal Pengguna berusia di bawah 18 tahun dan belum menikah,
              Pengguna menyatakan dan menjamin bahwa Pengguna telah memperoleh
              izin dari orang tua atau wali hukum. Dengan memberikan
              persetujuan, orang tua atau wali hukum Pengguna setuju untuk ikut
              tunduk pada Syarat & Ketentuan ini;
            </Box>
            <Box component="li" sx={{ mb: 1 }}>
              Dalam hal Pengguna memberikan informasi pribadi yang berkaitan
              dengan individu lain (misalnya informasi pribadi anggota keluarga,
              pasangan, atau pihak lain) saat mengakses dan menggunakan{" "}
              <strong>Jakarta Satu</strong>, maka Pengguna menyatakan dan
              menjamin bahwa Pengguna telah memperoleh persetujuan dari individu
              tersebut dan dengan ini menyetujui atas nama individu tersebut
              untuk, pengumpulan, penggunaan, pengungkapan dan pengolahan
              informasi pribadi mereka oleh
              <strong> Jakarta Satu</strong>.
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontSize: "14px", fontWeight: "600", mb: 1 }}
          >
            Kontak Informasi
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px", mb: 2 }}>
            Jika Pengguna memiliki pertanyaan, komentar atau masalah tentang
            Syarat & Ketentuan ini, silakan berkirim email ke{" "}
            <strong>
              <i>jakartasatu@jakarta.go.id</i>
            </strong>{" "}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#F2F5F9",
        backgroundImage: "none",
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#F2F5F9",
          minHeight: "100vh",
          width: "100%",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo - Mobile outside container */}
        {isMobile && (
          <Box
            sx={{
              textAlign: "center",
              mt: 2,
              mb: 2,
              zIndex: 10,
            }}
          >
            <Image
              src="./assets/logo-jakartasatu-orange.png"
              width={isSmallMobile ? 210 : 200}
              height={isSmallMobile ? 60 : 50}
              alt="Logo JakartaSatu"
            />
          </Box>
        )}

        {/* Main Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: isMobile ? "auto" : "100vh",
            paddingTop: isMobile ? "0" : "50px",
            paddingBottom: isMobile ? "20px" : "50px",
            paddingX: isMobile ? "16px" : "20px",
          }}
        >
          {/* White Container Box - Desktop/Tablet */}
          <Box
            sx={{
              width: "100%",
              maxWidth: isMobile ? "100%" : isTablet ? "900px" : "1150px",
              backgroundColor: isMobile ? "transparent" : "white",
              borderRadius: isMobile ? "0" : "20px",
              boxShadow: isMobile ? "none" : 3,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: isMobile ? "0" : isTablet ? "40px" : "60px",
              position: "relative",
              margin: "0 auto",
            }}
          >
            {/* Logo - Desktop/Tablet */}
            {!isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  top: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 10,
                }}
              >
                <Image
                  src="./assets/logo-jakartasatu-orange.png"
                  width={isTablet ? 230 : 270}
                  height={isTablet ? 65 : 75}
                  alt="Logo JakartaSatu"
                />
              </Box>
            )}

            {/* Form */}
            <Box
              sx={{
                width: isMobile ? "100%" : isTablet ? "55%" : "50%",
                backgroundColor: "transparent",
                borderRadius: "0",
                boxShadow: "none",
                padding: isMobile ? "0" : isTablet ? "20px" : "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                mt: !isMobile ? "60px" : 0,
              }}
            >
              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <Stack spacing={isMobile ? 2.5 : 2}>
                  <FormControl component="fieldset" sx={{ mt: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "black",
                        mb: 1,
                      }}
                    >
                      Apakah Anda seorang ASN Jakarta?
                    </Typography>
                    <RadioGroup
                      row={!isMobile}
                      value={isASN}
                      onChange={(e) => setisASN(e.target.value)}
                    >
                      <FormControlLabel
                        value="ya"
                        control={<Radio />}
                        label="Ya"
                        sx={{
                          "& .MuiFormControlLabel-label": { fontSize: "14px" },
                        }}
                      />
                      <FormControlLabel
                        value="tidak"
                        control={<Radio />}
                        label="Tidak"
                        sx={{
                          "& .MuiFormControlLabel-label": { fontSize: "14px" },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>

                  {isASN === "ya" && (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: isMobile ? "column" : "row",
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <InputLabel
                            required
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              mb: 1,
                              color: "black",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          >
                            NRK
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="nrk"
                            value={nrk}
                            onChange={(e) => {
                              setNrk(e.target.value);
                              setIsValid(null);
                            }}
                            placeholder="Masukkan 6 Digit Angka NRK"
                            type="tel"
                            size={isMobile ? "medium" : "medium"}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "48px",
                                borderRadius: "10px",
                                backgroundColor: isMobile
                                  ? "white"
                                  : "transparent",
                                paddingRight: "14px",

                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#0035774D",
                                  borderWidth: "2px",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#003577",
                                  borderWidth: "2px",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#003577",
                                    borderWidth: "2px",
                                  },
                              },

                              "& input": {
                                height: "48px",
                                padding: "0 14px",
                                boxSizing: "border-box",
                              },
                              "& input::placeholder": {
                                fontSize: "14px",
                                color: "rgba(0, 53, 119, 0.3)",
                                opacity: 1,
                              },
                            }}
                          />
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                          {isValid === true ? (
                            <Button
                              disabled
                              sx={{
                                width: "100px",
                                height: "48px",
                                borderRadius: "10px",
                                backgroundColor: "#07975C",
                                color: "white",
                                textTransform: "none",
                                "&:hover": {
                                  backgroundColor: "#07975C",
                                  opacity: "90%",
                                },
                              }}
                            >
                              Valid
                            </Button>
                          ) : (
                            <Button
                              onClick={handleCheckNRK}
                              sx={{
                                width: "100px",
                                height: "48px",
                                borderRadius: "10px",
                                backgroundColor: "#003577",
                                color: "white",
                                textTransform: "none",
                                "&:hover": {
                                  backgroundColor: "#003577",
                                  opacity: "90%",
                                },
                              }}
                            >
                              Periksa
                            </Button>
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: isMobile ? "column" : "row",
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <InputLabel
                            required
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              mb: 1,
                              color: "black",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          >
                            Email
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="email"
                            placeholder="Masukkan Email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            size={isMobile ? "medium" : "medium"}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "48px",
                                borderRadius: "10px",
                                backgroundColor: isMobile
                                  ? "white"
                                  : "transparent",
                                paddingRight: "14px",

                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#0035774D",
                                  borderWidth: "2px",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#003577",
                                  borderWidth: "2px",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#003577",
                                    borderWidth: "2px",
                                  },
                              },

                              "& input": {
                                height: "48px",
                                padding: "0 14px",
                                boxSizing: "border-box",
                              },
                              "& input::placeholder": {
                                fontSize: "14px",
                                color: "rgba(0, 53, 119, 0.3)",
                                opacity: 1,
                              },
                            }}
                          />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <InputLabel
                            required
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              mb: 1,
                              color: "black",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          >
                            Nomor Ponsel
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="phone"
                            type="tel"
                            placeholder="Masukkan Nomor Ponsel"
                            size={isMobile ? "medium" : "medium"}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "48px",
                                borderRadius: "10px",
                                backgroundColor: isMobile
                                  ? "white"
                                  : "transparent",
                                paddingRight: "14px",

                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#0035774D",
                                  borderWidth: "2px",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#003577",
                                  borderWidth: "2px",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#003577",
                                    borderWidth: "2px",
                                  },
                              },

                              "& input": {
                                height: "48px",
                                padding: "0 14px",
                                boxSizing: "border-box",
                              },
                              "& input::placeholder": {
                                fontSize: "14px",
                                color: "rgba(0, 53, 119, 0.3)",
                                opacity: 1,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </>
                  )}

                  {isASN === "tidak" && (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: isMobile ? "column" : "row",
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <InputLabel
                            required
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              mb: 1,
                              color: "black",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          >
                            Nama
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="nama"
                            placeholder="Masukkan Nama Lengkap"
                            size={isMobile ? "medium" : "medium"}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "48px",
                                borderRadius: "10px",
                                backgroundColor: isMobile
                                  ? "white"
                                  : "transparent",
                                paddingRight: "14px",

                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#0035774D",
                                  borderWidth: "2px",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#003577",
                                  borderWidth: "2px",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#003577",
                                    borderWidth: "2px",
                                  },
                              },

                              "& input": {
                                height: "48px",
                                padding: "0 14px",
                                boxSizing: "border-box",
                              },
                              "& input::placeholder": {
                                fontSize: "14px",
                                color: "rgba(0, 53, 119, 0.3)",
                                opacity: 1,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: isMobile ? "column" : "row",
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <InputLabel
                            required
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              mb: 1,
                              color: "black",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          >
                            Email
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="email"
                            placeholder="Masukkan Email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            size={isMobile ? "medium" : "medium"}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "48px",
                                borderRadius: "10px",
                                backgroundColor: isMobile
                                  ? "white"
                                  : "transparent",
                                paddingRight: "14px",

                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#0035774D",
                                  borderWidth: "2px",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#003577",
                                  borderWidth: "2px",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#003577",
                                    borderWidth: "2px",
                                  },
                              },

                              "& input": {
                                height: "48px",
                                padding: "0 14px",
                                boxSizing: "border-box",
                              },
                              "& input::placeholder": {
                                fontSize: "14px",
                                color: "rgba(0, 53, 119, 0.3)",
                                opacity: 1,
                              },
                            }}
                          />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <InputLabel
                            required
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              mb: 1,
                              color: "black",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          >
                            Nomor Ponsel
                          </InputLabel>
                          <TextField
                            fullWidth
                            id="phone"
                            placeholder="Masukkan Nomor Ponsel"
                            type="tel"
                            size={isMobile ? "medium" : "medium"}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "48px",
                                borderRadius: "10px",
                                backgroundColor: isMobile
                                  ? "white"
                                  : "transparent",
                                paddingRight: "14px",

                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#0035774D",
                                  borderWidth: "2px",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#003577",
                                  borderWidth: "2px",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#003577",
                                    borderWidth: "2px",
                                  },
                              },

                              "& input": {
                                height: "48px",
                                padding: "0 14px",
                                boxSizing: "border-box",
                              },
                              "& input::placeholder": {
                                fontSize: "14px",
                                color: "rgba(0, 53, 119, 0.3)",
                                opacity: 1,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexDirection: isMobile ? "column" : "row",
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <InputLabel
                            required
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "black",
                              mb: 1,
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          >
                            Instansi
                          </InputLabel>
                          <FormControl fullWidth required>
                            <Select
                              ref={selectRef}
                              required
                              value={instansi}
                              onChange={(e) => setInstansi(e.target.value)}
                              displayEmpty
                              size="medium"
                              error={!instansi && error}
                              MenuProps={{
                                disablePortal: false,
                                PaperProps: {
                                  sx: {
                                    width:
                                      selectWidth > 0
                                        ? `${selectWidth}px`
                                        : "auto",
                                    minWidth:
                                      selectWidth > 0
                                        ? `${selectWidth}px`
                                        : "auto",
                                    maxWidth:
                                      selectWidth > 0
                                        ? `${selectWidth}px`
                                        : "auto",
                                    "& .MuiMenuItem-root": {
                                      whiteSpace: "normal",
                                      wordWrap: "break-word",
                                      fontSize: "14px",
                                      padding: "8px 14px",
                                      width: "100%",
                                      boxSizing: "border-box",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    },
                                  },
                                },
                                anchorOrigin: {
                                  vertical: "bottom",
                                  horizontal: "left",
                                },
                                transformOrigin: {
                                  vertical: "top",
                                  horizontal: "left",
                                },
                              }}
                              sx={{
                                width: "100%",
                                height: "48px",
                                borderRadius: "10px",
                                backgroundColor: isMobile
                                  ? "white"
                                  : "transparent",

                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#0035774D",
                                  borderWidth: "2px",
                                  borderStyle: "solid",
                                },
                                "& .MuiOutlinedInput-root": {
                                  height: "48px",
                                  borderRadius: "10px",
                                  backgroundColor: isMobile
                                    ? "white"
                                    : "transparent",
                                  "& fieldset": {
                                    borderColor: "#0035774D",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#003577",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#003577",
                                  },
                                },
                                "& .MuiSelect-select": {
                                  fontSize: "14px",
                                  color: instansi ? "black" : "#0035774D",
                                  padding: "0 14px",
                                  display: "flex",
                                  alignItems: "center",
                                  height: "48px",
                                },
                              }}
                            >
                              <MenuItem value="" disabled>
                                Pilih Instansi
                              </MenuItem>
                              {instansiOptions.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <InputLabel
                            required
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              mb: 1,
                              color: "black",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          >
                            Nama Instansi / Institut
                          </InputLabel>
                          <TextField
                            placeholder="Masukkan Nama Instansi"
                            fullWidth
                            id="instansi"
                            size={isMobile ? "medium" : "medium"}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "48px",
                                borderRadius: "10px",
                                backgroundColor: isMobile
                                  ? "white"
                                  : "transparent",
                                paddingRight: "14px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#0035774D",
                                  borderWidth: "2px",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#003577",
                                  borderWidth: "2px",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#003577",
                                    borderWidth: "2px",
                                  },
                              },
                              "& input": {
                                height: "48px",
                                padding: "0 14px",
                                boxSizing: "border-box",
                              },
                              "& input::placeholder": {
                                fontSize: "14px",
                                color: "rgba(0, 53, 119, 0.3)",
                                opacity: 1,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </>
                  )}

                  <Box>
                    <InputLabel
                      required
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        mb: 1,
                        color: "black",
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                    >
                      Kata Sandi
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="password"
                      placeholder="Masukkan Kata Sandi"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      size={isMobile ? "medium" : "medium"}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "48px",
                          borderRadius: "10px",
                          backgroundColor: isMobile ? "white" : "transparent",
                          paddingRight: "14px",

                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0035774D",
                            borderWidth: "2px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#003577",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#003577",
                            borderWidth: "2px",
                          },
                        },

                        "& input": {
                          height: "48px",
                          padding: "0 14px",
                          boxSizing: "border-box",
                        },
                        "& input::placeholder": {
                          fontSize: "14px",
                          color: "rgba(0, 53, 119, 0.3)",
                          opacity: 1,
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      fontSize: "12px",
                      color: "black",
                      mt: 1,
                      padding: "15px",
                      backgroundColor: "#F2F5F9",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography variant="caption" display="block">
                      ○ Kata sandi terdiri dari minimal 8 karakter
                    </Typography>
                    <Typography variant="caption" display="block">
                      ○ Terdapat karakter alfabet [a-z]
                    </Typography>
                    <Typography variant="caption" display="block">
                      ○ Terdapat karakter alfabet kapital [A-Z]
                    </Typography>
                    <Typography variant="caption" display="block">
                      ○ Terdapat karakter angka [0-9]
                    </Typography>
                    <Typography variant="caption" display="block">
                      ○ Terdapat karakter spesial [@!$%^*#?&]
                    </Typography>
                  </Box>

                  <Box>
                    <InputLabel
                      required
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        mb: 1,
                        color: "black",
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                    >
                      Konfirmasi Kata Sandi
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="confirm-password"
                      placeholder="Konfirmasi Kata Sandi"
                      type={showPassword ? "text" : "password"}
                      size={isMobile ? "medium" : "medium"}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "48px",
                          borderRadius: "10px",
                          backgroundColor: isMobile ? "white" : "transparent",
                          paddingRight: "14px",

                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0035774D",
                            borderWidth: "2px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#003577",
                            borderWidth: "2px",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#003577",
                            borderWidth: "2px",
                          },
                        },

                        "& input": {
                          height: "48px",
                          padding: "0 14px",
                          boxSizing: "border-box",
                        },
                        "& input::placeholder": {
                          fontSize: "14px",
                          color: "rgba(0, 53, 119, 0.3)",
                          opacity: 1,
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  {/* Terms and Conditions - Mobile */}
                  {isMobile && (
                    <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
                      <TermsAndConditions isMobileVersion={true} />
                    </Box>
                  )}

                  {/* Terms Checkbox */}
                  <FormGroup>
                    <FormControlLabel
                      sx={{
                        alignItems: "flex-start",
                        mt: 1,
                        borderRadius: 15,
                      }}
                      control={
                        <Checkbox
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          sx={{ pt: 0, borderRadius: "15px" }}
                        />
                      }
                      label={
                        <span style={{ fontSize: "14px", lineHeight: "1.4" }}>
                          Saya menyatakan telah membaca dan menyetujui{" "}
                          <span style={{ color: "#003577" }}>
                            Syarat dan Ketentuan
                          </span>{" "}
                          serta{" "}
                          <span style={{ color: "#003577" }}>
                            Kebijakan Privasi
                          </span>{" "}
                          Jakarta Satu yang berlaku untuk pendaftaran akun.{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      labelPlacement="end"
                    />
                  </FormGroup>

                  {/* Error Message */}
                  {error && (
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ textAlign: "center", mt: 1 }}
                    >
                      {error}
                    </Typography>
                  )}

                  {/* Register Button */}
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      width: "100%",
                      height: isMobile ? "52px" : "50px",
                      borderRadius: "30px",
                      background: "#133473",
                      color: "white",
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: "500",
                      mb: 2,
                      "&:hover": {
                        background: "#0f2859",
                      },
                    }}
                  >
                    Register
                  </Button>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#1E293B",
                      fontWeight: "500",
                      textAlign: "left",
                    }}
                  >
                    Sudah punya Akun?{" "}
                    <Link
                      href="/geoportal/login"
                      sx={{
                        color: "#6366F1",
                        fontWeight: "500",
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Login
                    </Link>
                  </Typography>
                </Stack>
              </form>
            </Box>

            {/* Syarat dan Ketentuan - Desktop/Tablet */}
            {!isMobile && (
              <Box
                sx={{
                  width: isTablet ? "45%" : "50%",
                  padding: isTablet ? "20px" : "30px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  height: "auto",
                  mt: "60px",
                }}
              >
                <TermsAndConditions />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default RegisterForm;
