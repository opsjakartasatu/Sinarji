import React, { useState, useRef, useEffect } from 'react';
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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Snackbar,
  Alert,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { 
  Edit, 
  Close, 
  Download, 
  Delete,
  MyLocation,
  Timeline,
  Crop32,
  Save,
  Layers,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Circle,
  PlayArrow,
  Stop,
} from '@mui/icons-material';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import Swal from 'sweetalert2';

// Import untuk Shapefile - PERBAIKAN UTAMA
import * as shpwrite from 'shp-write';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const DrawWidget = ({ view, buttonSize, tooltip = "right" }) => {
  // State management
  const [open, setOpen] = useState(false);
  const [drawingData, setDrawingData] = useState({
    name: '',
    geometryType: '',
    geometry: null,
    isDrawing: false,
    completed: false,
    layerId: null
  });
  
  const [layers, setLayers] = useState([]);
  const [downloadFormat, setDownloadFormat] = useState('geojson');
  const [selectedLayerForDownload, setSelectedLayerForDownload] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('info');
  const [isDownloading, setIsDownloading] = useState(false);
  
  const sketchViewModelRef = useRef(null);
  const graphicsLayersRef = useRef(new Map());
  const eventHandlersRef = useRef([]);
  const currentLayerRef = useRef(null);
  const drawingInProgressRef = useRef(false);
  const pendingDrawingDataRef = useRef(null);

  // Initialize Sketch ViewModel
  useEffect(() => {
    if (view && !sketchViewModelRef.current) {
      // Buat layer default untuk drawing
      const defaultLayer = new GraphicsLayer({
        title: "Drawing Layer",
        id: "drawing_layer_temp"
      });
      
      view.map.add(defaultLayer);
      currentLayerRef.current = defaultLayer;

      sketchViewModelRef.current = new SketchViewModel({
        view: view,
        layer: defaultLayer,
        pointSymbol: {
          type: "simple-marker",
          color: [255, 0, 0],
          outline: {
            color: [255, 255, 255],
            width: 2
          },
          size: 12
        },
        polylineSymbol: {
          type: "simple-line",
          color: [0, 100, 255],
          width: 4
        },
        polygonSymbol: {
          type: "simple-fill",
          color: [255, 165, 0, 0.4],
          outline: {
            color: [255, 165, 0],
            width: 3
          }
        }
      });

      // Event listeners
      const createHandler = sketchViewModelRef.current.on("create", (event) => {
        console.log("Create event:", event.state, event);
        
        if (event.state === "start") {
          console.log("Drawing started");
          drawingInProgressRef.current = true;
        } else if (event.state === "active") {
          console.log("Drawing in progress");
        } else if (event.state === "complete") {
          console.log("Drawing completed:", event.graphic);
          
          drawingInProgressRef.current = false;
          
          // Simpan data drawing yang sudah selesai
          const completedData = {
            ...pendingDrawingDataRef.current,
            geometry: event.graphic.geometry,
            completed: true,
            isDrawing: false
          };
          
          setDrawingData(completedData);
          
          // Tampilkan dialog konfirmasi untuk menyimpan
          showSaveConfirmation(completedData);
          
        } else if (event.state === "cancel") {
          console.log("Drawing cancelled");
          drawingInProgressRef.current = false;
          pendingDrawingDataRef.current = null;
          
          setDrawingData(prev => ({
            ...prev,
            isDrawing: false,
            completed: false,
            geometry: null
          }));
        }
      });

      const updateHandler = sketchViewModelRef.current.on("update", (event) => {
        console.log("Update event:", event.state);
      });

      const doubleClickHandler = view.on("double-click", (event) => {
        if (drawingData.completed && drawingData.geometry && !drawingInProgressRef.current) {
          event.stopPropagation();
          saveDrawingDirectly();
        }
      });

      eventHandlersRef.current = [createHandler, updateHandler, doubleClickHandler];
    }

    return () => {
      // Cleanup
      if (sketchViewModelRef.current) {
        eventHandlersRef.current.forEach(handler => {
          if (handler && handler.remove) {
            handler.remove();
          }
        });
        
        sketchViewModelRef.current.destroy();
        sketchViewModelRef.current = null;
      }
      
      // Cleanup layers
      if (currentLayerRef.current && view && view.map) {
        view.map.remove(currentLayerRef.current);
      }
      
      graphicsLayersRef.current.forEach(layer => {
        if (view && view.map) {
          view.map.remove(layer);
        }
      });
      graphicsLayersRef.current.clear();
    };
  }, [view]);

  // Helper functions
  const showNotificationMessage = (message, severity = 'info') => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setShowNotification(true);
  };

  const getGeometryTypeName = (type) => {
    switch (type) {
      case 'point': return 'Titik';
      case 'polyline': return 'Garis';
      case 'polygon': return 'Poligon';
      default: return 'Geometri';
    }
  };

  const getDrawingInstruction = (geometryType) => {
    switch (geometryType) {
      case 'point':
        return 'Klik pada peta untuk membuat titik. Double-click untuk menyimpan setelah selesai.';
      case 'polyline':
        return 'Klik pada peta untuk membuat garis. Klik ganda untuk menyelesaikan, kemudian double-click pada peta untuk menyimpan.';
      case 'polygon':
        return 'Klik pada peta untuk membuat poligon. Klik ganda untuk menyelesaikan, kemudian double-click pada peta untuk menyimpan.';
      default:
        return 'Mulai menggambar pada peta. Double-click untuk menyimpan setelah selesai.';
    }
  };

  // Conversion functions
  const convertToGeoJSON = (layer) => {
    const features = layer.features.map(feature => ({
      type: "Feature",
      properties: {
        id: feature.id,
        name: feature.attributes.name,
        type: feature.attributes.type,
        created: feature.attributes.created,
        layer_name: layer.title
      },
      geometry: {
        type: feature.geometry.type === 'point' ? 'Point' : 
              feature.geometry.type === 'polyline' ? 'LineString' : 'Polygon',
        coordinates: getCoordinatesFromGeometry(feature.geometry)
      }
    }));

    return {
      type: "FeatureCollection",
      name: layer.title,
      crs: {
        type: "name",
        properties: {
          name: "EPSG:4326"
        }
      },
      features: features
    };
  };

  const convertToKML = (layer) => {
    const features = layer.features.map(feature => {
      const coords = getCoordinatesFromGeometry(feature.geometry);
      let coordString = '';
      let geometryXml = '';
      
      if (feature.geometry.type === 'point') {
        coordString = `${coords[0]},${coords[1]},0`;
        geometryXml = `<Point><coordinates>${coordString}</coordinates></Point>`;
      } else if (feature.geometry.type === 'polyline') {
        coordString = coords.map(coord => `${coord[0]},${coord[1]},0`).join(' ');
        geometryXml = `<LineString><coordinates>${coordString}</coordinates></LineString>`;
      } else if (feature.geometry.type === 'polygon') {
        coordString = coords[0].map(coord => `${coord[0]},${coord[1]},0`).join(' ');
        geometryXml = `<Polygon><outerBoundaryIs><LinearRing><coordinates>${coordString}</coordinates></LinearRing></outerBoundaryIs></Polygon>`;
      }
      
      return `
        <Placemark>
          <name><![CDATA[${feature.attributes.name}]]></name>
          <description><![CDATA[
            Type: ${feature.attributes.type}<br/>
            Created: ${feature.attributes.created}<br/>
            Layer: ${layer.title}
          ]]></description>
          <ExtendedData>
            <Data name="id"><value>${feature.id}</value></Data>
            <Data name="type"><value>${feature.attributes.type}</value></Data>
            <Data name="created"><value>${feature.attributes.created}</value></Data>
          </ExtendedData>
          ${geometryXml}
        </Placemark>`;
    }).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name><![CDATA[${layer.title}]]></name>
    <description><![CDATA[Created by Drawing Tool - ${new Date().toISOString()}]]></description>
    ${features}
  </Document>
</kml>`;
  };

  // PERBAIKAN UTAMA: Fungsi convertToShapefile menggunakan shp-write
  const convertToShapefile = async (layer) => {
    try {
      // Validasi input
      if (!layer || !layer.features || layer.features.length === 0) {
        throw new Error("Layer kosong atau tidak valid");
      }

      // Konversi ke GeoJSON format yang diperlukan shp-write
      const geojson = convertToGeoJSON(layer);
      
      // Validasi apakah ada features
      if (!geojson.features || geojson.features.length === 0) {
        throw new Error("Tidak ada features untuk di-export");
      }

      // Clean layer name untuk nama file yang valid
      const cleanLayerName = layer.title
        .replace(/[^a-zA-Z0-9\s]/g, '') // Hapus karakter khusus
        .replace(/\s+/g, '_') // Ganti spasi dengan underscore
        .substring(0, 50); // Batasi panjang nama

      // Opsi untuk shp-write
      const shapefileOptions = {
        folder: cleanLayerName, // Nama folder utama
        types: {
          point: `${cleanLayerName}_points`,    // Nama file untuk titik
          polygon: `${cleanLayerName}_polygons`, // Nama file untuk poligon
          line: `${cleanLayerName}_lines`       // Nama file untuk garis
        }
      };

      // Gunakan shp-write untuk menghasilkan shapefile
      // shp-write.download() akan otomatis men-download file ZIP
      const shapefileBlob = await new Promise((resolve, reject) => {
        try {
          // shp-write.download mengembalikan blob atau langsung men-download
          const result = shpwrite.download(geojson, shapefileOptions);
          
          // Jika shp-write mengembalikan blob
          if (result instanceof Blob) {
            resolve(result);
          } else {
            // Jika shp-write langsung men-download, kita perlu membuat blob alternatif
            // Untuk kasus ini, kita akan menggunakan zip method
            shpwrite.zip(geojson, shapefileOptions).then(resolve).catch(reject);
          }
        } catch (error) {
          reject(error);
        }
      });

      return shapefileBlob;

    } catch (error) {
      console.error("Error in convertToShapefile:", error);
      throw new Error(`Gagal membuat shapefile: ${error.message}`);
    }
  };

  const getCoordinatesFromGeometry = (geometry) => {
    switch (geometry.type) {
      case 'point':
        return [geometry.longitude, geometry.latitude];
      case 'polyline':
        return geometry.paths[0].map(coord => [coord[0], coord[1]]);
      case 'polygon':
        return geometry.rings.map(ring => 
          ring.map(coord => [coord[0], coord[1]])
        );
      default:
        return [];
    }
  };

  // Enhanced download function
  const downloadLayer = async () => {
    const layer = layers.find(l => l.id === parseInt(selectedLayerForDownload));
    
    if (!layer || layer.features.length === 0) {
      showNotificationMessage("Tidak ada data untuk diunduh", "warning");
      return;
    }

    setIsDownloading(true);
    
    try {
      let dataToDownload;
      let filename;
      let mimeType;
      let isBlob = false;

      switch (downloadFormat) {
        case 'geojson':
          dataToDownload = JSON.stringify(convertToGeoJSON(layer), null, 2);
          filename = `${layer.title}.geojson`;
          mimeType = 'application/json';
          break;

        case 'kml':
          dataToDownload = convertToKML(layer);
          filename = `${layer.title}.kml`;
          mimeType = 'application/vnd.google-earth.kml+xml';
          break;

        case 'shapefile':
          showNotificationMessage("Sedang membuat shapefile...", "info");
          dataToDownload = await convertToShapefile(layer);
          filename = `${layer.title.replace(/[^a-zA-Z0-9]/g, '_')}_shapefile.zip`;
          mimeType = 'application/zip';
          isBlob = true;
          break;

        default:
          throw new Error('Format tidak didukung');
      }

      // Download file
      if (isBlob) {
        saveAs(dataToDownload, filename);
      } else {
        const blob = new Blob([dataToDownload], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      showNotificationMessage(`File ${filename} berhasil diunduh`, "success");

    } catch (error) {
      console.error('Error downloading file:', error);
      showNotificationMessage(`Gagal mengunduh file: ${error.message}`, "error");
    } finally {
      setIsDownloading(false);
    }
  };

  // ALTERNATIF: Jika ingin menggunakan handleDownload seperti contoh yang diberikan
  const handleDownload = async () => {
    const layer = layers.find(l => l.id === parseInt(selectedLayerForDownload));
    
    if (!layer || layer.features.length === 0) {
      showNotificationMessage("Tidak ada data untuk diunduh", "warning");
      return;
    }

    if (downloadFormat === 'shapefile') {
      try {
        setIsDownloading(true);
        showNotificationMessage("Sedang membuat shapefile...", "info");
        
        // Konversi ke GeoJSON
        const geojsonData = convertToGeoJSON(layer);
        
        // Clean layer name
        const cleanLayerName = layer.title
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .replace(/\s+/g, '_')
          .substring(0, 50);

        // Opsi untuk shp-write sesuai contoh yang diberikan
        const options = {
          folder: cleanLayerName, // Nama folder yang akan berisi file shapefile
          types: {
            point: `${cleanLayerName}_points`,    // untuk geometri titik
            polygon: `${cleanLayerName}_polygons`, // untuk geometri poligon
            line: `${cleanLayerName}_lines`       // untuk geometri garis
          }
        };

        // Download shapefile menggunakan shp-write
        shpwrite.download(geojsonData, options);
        
        showNotificationMessage("Shapefile berhasil diunduh", "success");
        
      } catch (error) {
        console.error('Error downloading shapefile:', error);
        showNotificationMessage(`Gagal mengunduh shapefile: ${error.message}`, "error");
      } finally {
        setIsDownloading(false);
      }
    } else {
      // Untuk format lain, gunakan downloadLayer() yang sudah ada
      downloadLayer();
    }
  };

  // Drawing functions
  const showSaveConfirmation = (completedData) => {
    Swal.fire({
      title: 'Gambar Selesai!',
      text: `Apakah Anda ingin menyimpan "${completedData.name}" (${getGeometryTypeName(completedData.geometry.type)})?`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Ya, Simpan!',
      cancelButtonText: 'Batal',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p><strong>Nama:</strong> ${completedData.name}</p>
          <p><strong>Jenis:</strong> ${getGeometryTypeName(completedData.geometry.type)}</p>
          <p style="font-size: 12px; color: #666; margin-top: 15px;">
            Tip: Anda juga bisa double-click pada peta untuk menyimpan
          </p>
        </div>
      `
    }).then((result) => {
      if (result.isConfirmed) {
        saveDrawingDirectly();
      } else {
        cancelCurrentDrawing();
      }
    });
  };

  const startDrawing = () => {
    if (!drawingData.name.trim()) {
      showNotificationMessage("Masukkan nama terlebih dahulu!", "warning");
      return;
    }
    
    if (!drawingData.geometryType) {
      showNotificationMessage("Pilih jenis geometri terlebih dahulu!", "warning");
      return;
    }

    if (!sketchViewModelRef.current) {
      showNotificationMessage("Drawing tool belum siap!", "error");
      return;
    }

    try {
      pendingDrawingDataRef.current = {
        name: drawingData.name,
        geometryType: drawingData.geometryType
      };

      if (!currentLayerRef.current) {
        const tempLayer = new GraphicsLayer({
          title: `Drawing_${drawingData.name}`,
          id: `temp_${Date.now()}`
        });
        view.map.add(tempLayer);
        currentLayerRef.current = tempLayer;
        sketchViewModelRef.current.layer = tempLayer;
      }

      sketchViewModelRef.current.cancel();
      
      setDrawingData(prev => ({
        ...prev,
        isDrawing: true,
        completed: false,
        geometry: null
      }));
      
      setOpen(false);
      
      const geometryType = drawingData.geometryType;
      console.log("Starting to draw:", geometryType);
      
      sketchViewModelRef.current.create(geometryType);
      
      showNotificationMessage(getDrawingInstruction(geometryType), "info");
      
    } catch (error) {
      console.error("Error starting drawing:", error);
      showNotificationMessage(`Gagal memulai proses menggambar: ${error.message}`, "error");
      
      setDrawingData(prev => ({
        ...prev,
        isDrawing: false,
        completed: false
      }));
      
      pendingDrawingDataRef.current = null;
    }
  };

  const cancelCurrentDrawing = () => {
    try {
      if (sketchViewModelRef.current) {
        sketchViewModelRef.current.cancel();
      }
      
      if (currentLayerRef.current) {
        currentLayerRef.current.removeAll();
      }
      
      setDrawingData(prev => ({
        ...prev,
        isDrawing: false,
        completed: false,
        geometry: null
      }));
      
      pendingDrawingDataRef.current = null;
      drawingInProgressRef.current = false;
      
      showNotificationMessage("Proses menggambar dibatalkan", "info");
      
    } catch (error) {
      console.error("Error cancelling drawing:", error);
      showNotificationMessage("Error saat membatalkan drawing", "error");
    }
  };

  const saveDrawingDirectly = () => {
    const dataToSave = drawingData.completed ? drawingData : pendingDrawingDataRef.current;
    
    if (!dataToSave || !drawingData.geometry) {
      showNotificationMessage("Tidak ada data yang dapat disimpan", "warning");
      return;
    }

    try {
      const layerId = Date.now();
      const featureId = Date.now() + Math.random();
      
      const feature = {
        id: featureId,
        geometry: drawingData.geometry,
        attributes: {
          name: dataToSave.name,
          type: drawingData.geometry.type,
          created: new Date().toISOString(),
          layerId: layerId
        }
      };
      
      const savedLayer = new GraphicsLayer({
        title: dataToSave.name,
        id: layerId.toString(),
        visible: true
      });
      
      const graphic = new Graphic({
        geometry: drawingData.geometry,
        attributes: feature.attributes
      });
      
      savedLayer.add(graphic);
      view.map.add(savedLayer);
      graphicsLayersRef.current.set(layerId, savedLayer);
      
      const newLayer = {
        id: layerId,
        title: dataToSave.name,
        features: [feature],
        visible: true,
        created: new Date().toISOString()
      };
      
      setLayers(prev => [...prev, newLayer]);
      
      if (currentLayerRef.current) {
        currentLayerRef.current.removeAll();
      }
      
      setDrawingData({
        name: '',
        geometryType: '',
        geometry: null,
        isDrawing: false,
        completed: false,
        layerId: null
      });
      
      pendingDrawingDataRef.current = null;
      drawingInProgressRef.current = false;
      
      setSelectedLayerForDownload(layerId.toString());
      
      showNotificationMessage(`Data "${newLayer.title}" berhasil disimpan!`, "success");
      
    } catch (error) {
      console.error("Error saving drawing:", error);
      showNotificationMessage("Gagal menyimpan data", "error");
    }
  };

  // UI Handlers
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    if (drawingData.isDrawing || drawingInProgressRef.current) {
      Swal.fire({
        title: 'Batalkan Drawing?',
        text: 'Anda sedang dalam proses menggambar. Apakah Anda ingin membatalkannya?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Batalkan',
        cancelButtonText: 'Lanjut Drawing'
      }).then((result) => {
        if (result.isConfirmed) {
          cancelCurrentDrawing();
          setOpen(false);
        }
      });
    } else {
      setOpen(false);
    }
  };

  const deleteLayer = (layerId) => {
    const layer = layers.find(l => l.id === layerId);
    if (!layer) return;

    Swal.fire({
      title: 'Hapus Layer?',
      text: `Apakah Anda yakin ingin menghapus layer "${layer.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          // Remove from map
          const mapLayer = graphicsLayersRef.current.get(layerId);
          if (mapLayer && view && view.map) {
            view.map.remove(mapLayer);
          }
          
          // Remove from references
          graphicsLayersRef.current.delete(layerId);
          
          // Remove from state
          setLayers(prev => prev.filter(l => l.id !== layerId));
          
          // Reset selection if deleted layer was selected
          if (selectedLayerForDownload === layerId.toString()) {
            setSelectedLayerForDownload('');
          }
          
          showNotificationMessage(`Layer "${layer.title}" berhasil dihapus`, "success");
          
        } catch (error) {
          console.error("Error deleting layer:", error);
          showNotificationMessage("Gagal menghapus layer", "error");
        }
      }
    });
  };

  const toggleLayerVisibility = (layerId) => {
    const mapLayer = graphicsLayersRef.current.get(layerId);
    if (mapLayer) {
      mapLayer.visible = !mapLayer.visible;
      
      setLayers(prev => 
        prev.map(layer => 
          layer.id === layerId 
            ? { ...layer, visible: mapLayer.visible }
            : layer
        )
      );
    }
  };

  const zoomToLayer = (layerId) => {
    const mapLayer = graphicsLayersRef.current.get(layerId);
    if (mapLayer && view) {
      try {
        const extent = mapLayer.fullExtent;
        if (extent) {
          view.goTo(extent.expand(1.2));
        }
      } catch (error) {
        console.error("Error zooming to layer:", error);
        showNotificationMessage("Gagal zoom to layer", "error");
      }
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowNotification(false);
  };

  const getStatusColor = () => {
    if (drawingData.isDrawing) return '#ff9800'; // Orange
    if (drawingData.completed) return '#4caf50'; // Green
    return '#2196f3'; // Blue
  };

  const getStatusText = () => {
    if (drawingData.isDrawing) return 'Sedang Menggambar...';
    if (drawingData.completed) return 'Selesai';
    return 'Siap';
  };

  // Render component
  return (
    <>
      <Tooltip title="Drawing Tool" placement={tooltip}>
        <IconButton
          onClick={handleClickOpen}
          sx={{
            width: buttonSize,
            height: buttonSize,
            backgroundColor: open ? 'rgba(33, 150, 243, 0.1)' : 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
            },
          }}
        >
          <Edit />
        </IconButton>
      </Tooltip>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { minHeight: '600px' }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Drawing Tool</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                label={getStatusText()}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(),
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
              <IconButton onClick={handleClose} size="small">
                <Close />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={3}>
            {/* Left Panel - Drawing Controls */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Buat Geometri Baru
                </Typography>
                
                {/* Drawing Status */}
             {/* Drawing Status */}
                {(drawingData.isDrawing || drawingData.completed) && (
                  <Alert 
                    severity={drawingData.completed ? "success" : "info"} 
                    sx={{ mb: 2 }}
                  >
                    {drawingData.isDrawing && 
                      `Sedang menggambar "${drawingData.name}" (${getGeometryTypeName(drawingData.geometryType)})`
                    }
                    {drawingData.completed && 
                      `Drawing "${drawingData.name}" selesai! Double-click pada peta untuk menyimpan.`
                    }
                  </Alert>
                )}

                <Box sx={{ mb: 2 }}>
                  <TextField
                    label="Nama Geometri"
                    fullWidth
                    value={drawingData.name}
                    onChange={(e) => setDrawingData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={drawingData.isDrawing}
                    placeholder="Masukkan nama untuk geometri Anda"
                  />
                </Box>

                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <FormLabel component="legend">Jenis Geometri</FormLabel>
                  <RadioGroup
                    value={drawingData.geometryType}
                    onChange={(e) => setDrawingData(prev => ({ ...prev, geometryType: e.target.value }))}
                    disabled={drawingData.isDrawing}
                  >
                    <FormControlLabel 
                      value="point" 
                      control={<Radio />} 
                      label="Titik (Point)" 
                    />
                    <FormControlLabel 
                      value="polyline" 
                      control={<Radio />} 
                      label="Garis (Polyline)" 
                    />
                    <FormControlLabel 
                      value="polygon" 
                      control={<Radio />} 
                      label="Poligon (Polygon)" 
                    />
                  </RadioGroup>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={startDrawing}
                    disabled={drawingData.isDrawing || !drawingData.name.trim() || !drawingData.geometryType}
                    startIcon={<PlayArrow />}
                    fullWidth
                  >
                    Mulai Menggambar
                  </Button>
                  
                  {drawingData.isDrawing && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={cancelCurrentDrawing}
                      startIcon={<Stop />}
                      fullWidth
                    >
                      Batalkan
                    </Button>
                  )}
                </Box>

                {drawingData.completed && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={saveDrawingDirectly}
                    startIcon={<Save />}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Simpan Sekarang
                  </Button>
                )}

                {/* Drawing Instructions */}
                {drawingData.geometryType && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Instruksi:</strong><br />
                      {getDrawingInstruction(drawingData.geometryType)}
                    </Typography>
                  </Alert>
                )}
              </Paper>

              {/* Download Panel */}
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Download Data
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Pilih Layer</InputLabel>
                    <Select
                      value={selectedLayerForDownload}
                      onChange={(e) => setSelectedLayerForDownload(e.target.value)}
                      label="Pilih Layer"
                    >
                      {layers.map((layer) => (
                        <MenuItem key={layer.id} value={layer.id.toString()}>
                          {layer.title} ({layer.features.length} features)
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Format Download</InputLabel>
                    <Select
                      value={downloadFormat}
                      onChange={(e) => setDownloadFormat(e.target.value)}
                      label="Format Download"
                    >
                      <MenuItem value="geojson">GeoJSON</MenuItem>
                      <MenuItem value="kml">KML</MenuItem>
                      <MenuItem value="shapefile">Shapefile (ZIP)</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDownload}
                    disabled={!selectedLayerForDownload || isDownloading}
                    startIcon={<Download />}
                    fullWidth
                  >
                    {isDownloading ? 'Sedang Download...' : 'Download'}
                  </Button>
                </Box>

                {downloadFormat === 'shapefile' && (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    <Typography variant="body2">
                      Shapefile akan didownload dalam format ZIP yang berisi file .shp, .shx, .dbf, dan .prj
                    </Typography>
                  </Alert>
                )}
              </Paper>
            </Grid>

            {/* Right Panel - Layer Management */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Daftar Layer ({layers.length})
                </Typography>
                
                {layers.length === 0 ? (
                  <Alert severity="info">
                    Belum ada layer yang dibuat. Mulai dengan menggambar geometri baru.
                  </Alert>
                ) : (
                  <List>
                    {layers.map((layer, index) => (
                      <React.Fragment key={layer.id}>
                        <ListItem
                          sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            mb: 1,
                            backgroundColor: layer.visible ? '#f9f9f9' : '#f0f0f0'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => toggleLayerVisibility(layer.id)}
                              color={layer.visible ? "primary" : "default"}
                            >
                              {layer.visible ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </Box>
                          
                          <ListItemText
                            primary={
                              <Box>
                                <Typography variant="subtitle2" component="div">
                                  {layer.title}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {layer.features.length} features • {new Date(layer.created).toLocaleDateString()}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <Box sx={{ mt: 0.5 }}>
                                {layer.features.map((feature, idx) => (
                                  <Chip
                                    key={idx}
                                    label={getGeometryTypeName(feature.geometry.type)}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                  />
                                ))}
                              </Box>
                            }
                          />
                          
                          <ListItemSecondaryAction>
                            <Box>
                              <Tooltip title="Zoom to Layer">
                                <IconButton
                                  size="small"
                                  onClick={() => zoomToLayer(layer.id)}
                                  sx={{ mr: 0.5 }}
                                >
                                  <MyLocation />
                                </IconButton>
                              </Tooltip>
                              
                              <Tooltip title="Delete Layer">
                                <IconButton
                                  size="small"
                                  onClick={() => deleteLayer(layer.id)}
                                  color="error"
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                        
                        {index < layers.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </Paper>

              {/* Statistics Panel */}
              {layers.length > 0 && (
                <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Statistik
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center', py: 1 }}>
                          <Typography variant="h6" color="primary">
                            {layers.length}
                          </Typography>
                          <Typography variant="caption">
                            Total Layer
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center', py: 1 }}>
                          <Typography variant="h6" color="secondary">
                            {layers.reduce((sum, layer) => sum + layer.features.length, 0)}
                          </Typography>
                          <Typography variant="caption">
                            Total Features
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center', py: 1 }}>
                          <Typography variant="h6" color="success.main">
                            {layers.filter(layer => layer.visible).length}
                          </Typography>
                          <Typography variant="caption">
                            Layer Visible
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  {/* Feature Type Statistics */}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Distribusi Geometri:
                    </Typography>
                    {(() => {
                      const stats = layers.reduce((acc, layer) => {
                        layer.features.forEach(feature => {
                          const type = feature.geometry.type;
                          acc[type] = (acc[type] || 0) + 1;
                        });
                        return acc;
                      }, {});
                      
                      return Object.entries(stats).map(([type, count]) => (
                        <Chip
                          key={type}
                          label={`${getGeometryTypeName(type)}: ${count}`}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ));
                    })()}
                  </Box>
                </Paper>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationSeverity}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DrawWidget;