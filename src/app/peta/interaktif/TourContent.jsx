import { Box, Button, Typography } from "@mui/material";

const TourContent = ({index, nextHandle}) => {

  return (
    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      {index === 0 && (<Typography>Selamat datang di website Jakartasatu</Typography>) }
      {index === 1 && (<Typography>Tersedia berbagai kategori data spasial, silahkan</Typography>) }
      {index === 2 && (<Typography>Ruang tempat layer data yang telah diaktifkan</Typography>) }
      {index === 3 && (<Typography>Buka katalog data spasial</Typography>) }
      {index === 4 && (<Typography>Jelajahi kategori data spasial yang tersedia</Typography>) }
      {index === 5 && (<Typography>Jelajahi list data spasial sesuai kategori</Typography>) }
      {index === 6 && (<Typography>Tambahkan layer ke halaman peta</Typography>) }
      {index === 7 && (<Typography>Tutup window katalog data spasial</Typography>) }
      {index === 8 && (<Typography>Detail dari layer, ada beberapa fungsi yang bisa diterapkan</Typography>) }
      {index === 9 && (<Typography>Mengaktifkan dan menonaktifkan layer bisa dengan klik checkbox</Typography>) }
      {index === 10 && (<Typography>Tombol info layer untuk melihat detail data layer</Typography>) }
      {index === 11 && (<Typography>Info detail layer bisa dilihat disini</Typography>) }
      {index === 12 && (<Typography>Tombol untuk melihat tabel layer</Typography>) }
      {index === 13 && (<Typography>Tabel layer akan muncul disini</Typography>) }
      {index === 14 && (<Typography>Tombol untuk melakukan query layer</Typography>) }
      {index === 15 && (<Typography>Query layer dilakukan dengan menentukan expresi di dalam query window ini</Typography>) }
      {index === 16 && (<Typography>Berikut adalah query Kelurahan Cideng</Typography>) }
      {index === 17 && (<Typography>Tombol untuk menambahkan query</Typography>) }
      {index === 18 && (<Typography>Tombol untuk mereset query</Typography>) }
      {index === 19 && (<Typography>Terapkan expresi query yang sudah dibuat pada layar</Typography>) }
      <Button sx={{width: "50px", height: "30px", backgroundColor: "lightblue", borderRadius: "5px", "&:hover": { backgroundColor: "lightblue" }}} onClick={nextHandle}>
        Next
      </Button>
    </Box>
  );
};

export default TourContent;
