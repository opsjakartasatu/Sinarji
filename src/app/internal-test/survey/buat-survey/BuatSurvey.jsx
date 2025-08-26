"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const BuatSurvey = ({ session }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (formValues) => {
    try {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${session?.user?.access_token}`);

      const body = new FormData();
      body.append("title", formValues.title);
      body.append("content", formValues.description);
      body.append("thumbnail", formValues.thumbnail);

      const response = await fetch(`${process.env.BASE_URL}/api/proxy/survey/add-new-survey`, {
        method: "POST",
        body,
        headers,
      });

      const data = await response.json();

      if (response.ok && data.status) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Survei berhasil dibuat!",
        });

        router.push(`${process.env.BASE_URL}/internal-test/survey`);
      } else {
        throw new Error(data.message || "Gagal membuat survei");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.message || "Terjadi kesalahan saat mengirim data",
      });
      console.error("Fetch error:", error);
    }
  };

  const uploadImage = async (name, path, file) => {
    try {
      const body = new FormData();
      body.append("name", name);
      body.append("path", path);
      body.append("file", file);

      const response = await fetch(
        `${process.env.BASE_PATH}/api/minio/writeFile`,
        {
          method: "POST",
          body,
        }
      );

      const data = await response.json();

      if (response.ok && data.url) {
        return data.url;
      } else {
        throw new Error("Gagal mengunggah gambar");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Gagal Upload", error.message, "error");
      return null;
    }
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const timestamp = Date.now();
    const uploadedUrl = await uploadImage(timestamp, "survey/thumbnail", file);

    if (uploadedUrl) {
      setFormValues((prev) => ({
        ...prev,
        thumbnail: uploadedUrl,
      }));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Buat Survei
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Halaman untuk membuat survei
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Nama Survei"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Deskripsi"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />

        <Box>
          <Button variant="outlined" component="label">
            Upload Thumbnail
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleThumbnailChange}
            />
          </Button>
          {formValues.thumbnail && (
            <Typography variant="body2" mt={1}>
              Uploaded: {formValues.thumbnail}
            </Typography>
          )}
        </Box>

        <Box textAlign="right">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#219653",
              borderRadius: "20px",
              px: 4,
              py: 1,
              "&:hover": {
                backgroundColor: "#1e8749",
              },
            }}
            onClick={() => handleSubmit(formValues)}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BuatSurvey;
