const legends = {
  Elevasi: {
    "Referensi High Tide": [
      { title: "Di bawah laut", gradient: "linear-gradient(to right, #0995FC, #052943)" },
      { title: "Di atas laut", gradient: "linear-gradient(to right, #090F0D, #9F9D9B)" },
    ],
    "Referensi MSL": [
      { title: "Di bawah laut", gradient: "linear-gradient(to right, #0A7FD4, #0C2C3D)" },
      { title: "Di atas laut", gradient: "linear-gradient(to right, #090F0D, #9F9D9B)" },
    ],
  },
  "Penurunan Tanah": {
    Laju: [
      { title: "Laju -15 cm/th", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Laju -8 cm/th", gradient: "linear-gradient(to right, #EAFF00, #F9FFB5)" },
      { title: "Laju -4 cm/th", gradient: "linear-gradient(to right, #6CAEF5, #BDD5EE)" },
      { title: "Laju 0 cm/th", gradient: "linear-gradient(to right, #0026BD, #B2C1FF)" },
    ],
    Magnitude: [
      { title: "Magnitude -3.0 m", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Magnitude -2.0 m", gradient: "linear-gradient(to right, #EAFF00, #F9FFB5)" },
      { title: "Magnitude -1.0 m", gradient: "linear-gradient(to right, #6CAEF5, #BDD5EE)" },
      { title: "Magnitude 0 m", gradient: "linear-gradient(to right, #0026BD, #B2C1FF)" },
    ],
  },
  "Water Table": {
    "WT-Akuifer Tertekan 1": [
      { title: "-40 s/d -130 m", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "-30 s/d -40 m", gradient: "linear-gradient(to right, #FF8769, #FDCEC3)" },
      { title: "-20 s/d -30 m", gradient: "linear-gradient(to right, #EAFF00, #F9FFB5)" },
      { title: "0 s/d -20 m", gradient: "linear-gradient(to right, #0026BD, #B2C1FF)" },
    ],
    "WT-Akuifer Tertekan 2": [
      { title: "-40 s/d -130 m", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "-30 s/d -40 m", gradient: "linear-gradient(to right, #FF8769, #FDCEC3)" },
      { title: "-20 s/d -30 m", gradient: "linear-gradient(to right, #EAFF00, #F9FFB5)" },
      { title: "0 s/d -20 m", gradient: "linear-gradient(to right, #0026BD, #B2C1FF)" },
    ],
  },
  Akuifer: {
    "Akuifer Tertekan 1": [
      { title: "Rusak", gradient: "linear-gradient(to right, #800000, #C69898)" },
      { title: "Kritis", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Rawan", gradient: "linear-gradient(to right, #FF8400, #FFDEBA)" },
      { title: "Aman", gradient: "linear-gradient(to right, #00FF00, #C5F5C5)" },
    ],
    "Akuifer Tertekan 2": [
      { title: "Rusak", gradient: "linear-gradient(to right, #800000, #C69898)" },
      { title: "Kritis", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Rawan", gradient: "linear-gradient(to right, #FF8400, #FFDEBA)" },
      { title: "Aman", gradient: "linear-gradient(to right, #00FF00, #C5F5C5)" },
    ],
  },
  Zonasi: {
    "Zona Tertekan 1": [
      { title: "Zona Larangan Eksploitasi Air Tanah", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Zona Eksploitasi Terbatas Air Tanah", gradient: "linear-gradient(to right, #FF8400, #FFDEBA)" },
      { title: "Zona Bebas Eksploitasi Air Tanah", gradient: "linear-gradient(to right, #FFCCB7, #F6DCD0)" },
    ],
    "Zona Tertekan 2": [
      { title: "Zona Larangan Eksploitasi Air Tanah", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Zona Eksploitasi Terbatas Air Tanah", gradient: "linear-gradient(to right, #FF8400, #FFDEBA)" },
      { title: "Zona Bebas Eksploitasi Air Tanah", gradient: "linear-gradient(to right, #FFCCB7, #F6DCD0)" },
    ],
  },
  Intrusi: {
    "Air Laut": [
      { title: "Zona Intrusi Air Laut", gradient: "linear-gradient(to right, #FF8400, #FFDEBA)" },
      { title: "Zona Tidak Intrusi Air Laut", gradient: "linear-gradient(to right, #0026BD, #B2C1FF)" },
    ],
  },
  "Banjir Fluvia": {
    "Skenario Banjir Q5": [
      { title: "Banjir", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Tidak Banjir", gradient: "linear-gradient(to right, #00FF00, #F2D500)" },
    ],
    "Skenario Banjir Q25": [
      { title: "Banjir", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Tidak Banjir", gradient: "linear-gradient(to right, #00FF00, #F2D500)" },
    ],
    "Skenario Banjir Q50": [
      { title: "Banjir", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Tidak Banjir", gradient: "linear-gradient(to right, #00FF00, #F2D500)" },
    ],
  },
  "Banjir ROB": {
    "Skenario Tanpa Tanggul": [
      { title: "Banjir", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Tidak Banjir", gradient: "linear-gradient(to right, #00FF00, #F2D500)" },
    ],
    "Skenario Dengan Tanggul": [
      { title: "Banjir", gradient: "linear-gradient(to right, #FF0000, #FFD6D6)" },
      { title: "Tidak Banjir", gradient: "linear-gradient(to right, #00FF00, #F2D500)" },
    ],
  },
};

export default legends;
