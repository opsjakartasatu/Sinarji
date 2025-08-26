import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';
import * as shp from 'shpjs';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import Swal from 'sweetalert2';

const UploadData = ({ view, setLayerChange, buttonSize, tooltip = "right" }) => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [layerTitle, setLayerTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadType, setUploadType] = useState('file');
  const [serviceURL, setServiceURL] = useState('');
  const steps = ['Nama Layer', 'Tipe Data Spasial', 'Input Data'];

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setLayerTitle('');
    setSelectedFile(null);
    setServiceURL('');
    setUploadType('file');
  };

  const sweetAlertCustomStyles = {
    popup: 'swal2-popup',
    confirmButton: `
      background-color: #1976d2 !important;
      color: #fff !important;
      box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12) !important;
      padding: 6px 16px !important;
      font-size: 0.875rem !important;
      min-width: 64px !important;
      box-sizing: border-box !important;
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
      font-weight: 500 !important;
      line-height: 1.75 !important;
      border-radius: 4px !important;
      text-transform: uppercase !important;
      border: 0 !important;
      margin: 8px !important;
      cursor: pointer !important;
      font-family: "Roboto","Helvetica","Arial",sans-serif !important;
    `
  };

  const showSweetAlert = async (title, text, icon) => {
    setOpen(false);
    
    const result = await Swal.fire({
      title,
      text,
      icon,
      timer: '3000',
      timerProgressBar: true, 
      confirmButtonText: 'OK',
      buttonsStyling: true,
      allowOutsideClick: false,
      customClass: {
        popup: sweetAlertCustomStyles.popup
      },
      confirmButtonColor: '#7B68EE' 
    });
  
    if (result.isConfirmed) {
      setOpen(true);
    }
  };

  // Fungsi validasi untuk setiap step
  const handleNext = async () => {
    if (activeStep === 0 && !layerTitle.trim()) {
      await showSweetAlert(
        "Peringatan!",
        "Ketik nama data yang ingin ditampilkan",
        "warning"
      );
      return;
    }
    if (activeStep === 1 && !uploadType) {
      await showSweetAlert(
        "Peringatan!",
        "Pilih tipe data yang ingin diunggah",
        "warning"
      );
      return;
    }
    if (activeStep === 2) {
      if (uploadType === 'file' && !selectedFile) {
        await showSweetAlert(
          "Peringatan!",
          "Tidak ada file yang dipilih",
          "warning"
        );
        return;
      }
      if (uploadType === 'service' && !serviceURL.trim()) {
        await showSweetAlert(
          "Peringatan!",
          "Masukkan URL service",
          "warning"
        );
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Fungsi untuk mengunggah file shapefile (.zip)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      await showSweetAlert(
        "Peringatan!",
        "Tidak ada file yang dipilih",
        "warning"
      );
      return;
    }
  
    if (!file.name.toLowerCase().endsWith('.zip')) {
      await showSweetAlert(
        "Peringatan!",
        "Harap unggah file zip yang berisi data spasial berformat shapefile",
        "warning"
      );
      return;
    }
  
    setSelectedFile(file);
  };

  // Fungsi utama untuk memproses dan menambahkan layer ke peta
 // Fungsi utama untuk memproses dan menambahkan layer ke peta
const processAndAddLayer = async () => {
  try {
    // Cek apakah layer dengan nama yang sama sudah ada
    const existingLayer = view?.map?.layers?.items?.find(
      (layer) => layer.title === layerTitle
    );
    
    if (existingLayer) {
      await showSweetAlert(
        "Peringatan!",
        "Layer dengan nama tersebut sudah tersedia",
        "warning"
      );
      return;
    }
    
    let newLayer;
    
    if (uploadType === 'file') {
      // Proses upload shapefile
      const arrayBuffer = await selectedFile.arrayBuffer();
      const geojson = await shp(arrayBuffer);
      
      if (!geojson || !geojson.features || geojson.features.length === 0) {
        await showSweetAlert(
          "Error!",
          "Shapefile tidak valid atau kosong",
          "error"
        );
        return;
      }

      const blob = new Blob([JSON.stringify(geojson)], {
        type: "application/json",
      });
      const geojsonUrl = URL.createObjectURL(blob);

      const geometryType = geojson.features[0].geometry.type;
      const symbol =
        geometryType === "Polygon"
          ? {
              type: "simple-fill",
              color: [227, 139, 79, 1],
              outline: {
                color: [255, 255, 255, 1],
                width: 1,
              },
            }
          : geometryType === "LineString"
          ? {
              type: "simple-line",
              color: [51, 51, 204, 1],
              width: "2pt",
            }
          : {
              type: "simple-marker",
              color: [255, 165, 0, 1],
              outline: {
                color: "#FFFFFF",
                width: 1,
              },
              size: "10px",
            };

      const renderer = {
        type: "simple",
        symbol: symbol,
      };

      newLayer = new GeoJSONLayer({
        url: geojsonUrl,
        title: layerTitle,
        visible: true,
        renderer: renderer,
      });
    } else if (uploadType === 'service') {
      if (serviceURL.includes("FeatureServer")) {
        newLayer = new FeatureLayer({
          url: serviceURL,
          title: layerTitle,
          visible: true,
        });
      } else if (serviceURL.includes("MapServer")) {
        newLayer = new MapImageLayer({
          url: serviceURL,
          title: layerTitle,
          visible: true,
        });
      } else {
        await showSweetAlert(
          "Peringatan!",
          "URL service tidak valid. Harap masukkan URL yang mengandung 'FeatureServer' atau 'MapServer'.",
          "warning"
        );
        return;
      }
    }
    
    // Properti Untuk Menandai diunggah melalui form 
    newLayer.isUploaded = true;
    
    view.map.add(newLayer);

    newLayer.when(
      () => {
        // Jika layer memiliki properti fullExtent, set pusat ke koordinat Monas
        const center = newLayer.fullExtent ? [106.826959, -6.176923] : view.center;
        view.goTo({ center, zoom: 14 }, { duration: 1000 });
        setLayerChange((prev) => !prev);
        handleClose();
      },
      (error) => {
        view.map.remove(newLayer);
        showSweetAlert(
          "Service Error!",
          "Service tidak dapat diproses. Service mungkin sedang tidak aktif, ter-disable, atau terjadi gangguan. Alasan: " + error.message,
          "error"
        );
      }
    );
    
    
    // Menambahkan event listener untuk menangkap error pada tile (misal error 404)
    view.whenLayerView(newLayer).then((layerView) => {
      if (layerView.on) {
        const tileErrorHandler = layerView.on("tile-error", (event) => {
          view.map.remove(newLayer);
          showSweetAlert(
            "Service Error!",
            "Service tidak dapat diproses. Terjadi kesalahan dalam memuat tile. Alasan: " +
              (event.error ? event.error.message : "Unknown error"),
            "error"
          );
          // Hapus listener setelah error pertama
          tileErrorHandler.remove();
        });
      }
    });
    
  } catch (error) {
    console.error("Gagal memproses data:", error);
    await showSweetAlert(
      "Gagal!",
      "Gagal untuk mengunggah data, periksa kembali data yang anda input",
      "error"
    );
  }
};


  // Fungsi untuk mengembalikan tampilan konten pada setiap langkah stepper
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <TextField
            autoFocus
            margin="dense"
            label="Ketik nama data yang ingin ditampilkan"
            fullWidth
            value={layerTitle}
            onChange={(e) => setLayerTitle(e.target.value)}
            inputProps={{ maxLength: 50 }}
            helperText={`${layerTitle.length}/50 karakter`}
          />
        );
      case 1:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Pilih Tipe Data</FormLabel>
            <RadioGroup row value={uploadType} onChange={(e) => setUploadType(e.target.value)}>
              <FormControlLabel value="file" control={<Radio />} label="Unggah Shapefile" />
              <FormControlLabel value="service" control={<Radio />} label="Gunakan Link Service" />
            </RadioGroup>
          </FormControl>
        );
      case 2:
        return uploadType === 'file' ? (
          <Box sx={{ textAlign: 'center' }}>
            <input
              type="file"
              accept=".zip"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="input-upload-data"
            />
            <label htmlFor="input-upload-data">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUpload />}
              >
                Cari Data 
              </Button>
            </label>
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                File yang dipilih: {selectedFile.name}
              </Typography>
            )}
            <FormHelperText sx={{ mt: 1, fontSize: '0.875rem', color: 'gray' }}>
              Upload shapefile dalam bentuk .zip yang berisi file .shp, .shx, .dbf, .prj
            </FormHelperText>
          </Box>
        ) : (
          <TextField
            autoFocus
            margin="dense"
            label="Masukkan URL Service"
            fullWidth
            value={serviceURL}
            onChange={(e) => setServiceURL(e.target.value)}
            helperText="Contoh: https://example.com/arcgis/rest/services/xxx/FeatureServer/0"
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          backgroundColor: "white",
          rowGap: 2,
          maxWidth: buttonSize,
        }}
      >
        <Tooltip title="Upload Data" placement={tooltip}>
          <IconButton
            onClick={handleClickOpen}
            sx={{ height: buttonSize, width: buttonSize, padding: 0 }}
          >
            <CloudUpload />
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          Upload Data
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ my: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Kembali
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={processAndAddLayer}
                disabled={(uploadType === 'file' && !selectedFile) || (uploadType === 'service' && !serviceURL.trim())}
              >
                Simpan
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === 0 ? !layerTitle.trim() : false}
              >
                Selanjutnya
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadData;
