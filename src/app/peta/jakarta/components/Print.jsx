import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { Print as PrintIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import jsPDF from "jspdf";
import Swal from "sweetalert2";

const Print = ({ view, buttonSize }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMasking, setIsMasking] = useState(false);
  const [title, setTitle] = useState("");
  const [isReadyToPrint, setIsReadyToPrint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paperSize, setPaperSize] = useState("A3");
  const [orientation, setOrientation] = useState("landscape");
  const [error, setError] = useState(null);
  const [selectedExtent, setSelectedExtent] = useState(null);
  const [insetExtent, setInsetExtent] = useState(null);

  const paperSizes = {
    A3: { width: 420, height: 297 },
  };

  const getColorFromSymbol = (color) => {
    if (!color) return [0, 0, 0]; // Default to black if no color is provided
    
    if (Array.isArray(color)) {
        return color;
    }
    
    if (typeof color === 'object') {
        if (color.a === 0) return [255, 255, 255]; // Default to white for transparent
        return [
            color.r || 0,
            color.g || 0,
            color.b || 0,
            color.a !== undefined ? color.a : 1
        ];
    }
    
    return [0, 0, 0]; // Default fallback
  };

  // Function to get unique symbols
  const getUniqueSymbols = (features, renderer, layer) => {
    const symbolMap = new Map();
    
    if (!renderer) {
      // Try to get renderer directly from the layer if not provided
      if (layer && layer.renderer) {
        renderer = layer.renderer;
      } else {
        return [];
      }
    }

    if (renderer.type === "simple") {
      symbolMap.set('simple', {
        symbol: renderer.symbol,
        label: renderer.label || (layer ? layer.title : '') || ''
      });
    } else if (renderer.type === "unique-value") {
      // For FeatureServer, ensure we're checking the correct field
      const field = renderer.field || renderer.uniqueValueInfos?.[0]?.fieldName;
      
      if (!field && features.length > 0) {
        // Fall back to simple rendering if field info is missing
        symbolMap.set('simple', {
          symbol: renderer.defaultSymbol || renderer.symbol,
          label: (layer ? layer.title : '') || ''
        });
      } else {
        features.forEach(feature => {
          const value = feature.attributes[field];
          const symbolInfo = renderer.uniqueValueInfos.find(info => 
            info.value?.toString() === value?.toString()
          ) || renderer.defaultSymbol;
          
          if (symbolInfo) {
            const key = symbolInfo.value?.toString() || symbolInfo.label;
            if (!symbolMap.has(key)) {
              symbolMap.set(key, {
                symbol: symbolInfo.symbol,
                label: symbolInfo.label || symbolInfo.value
              });
            }
          }
        });
      }
    } else if (renderer.type === "class-breaks") {
      const field = renderer.field;
      if (!field && features.length > 0) {
        symbolMap.set('simple', {
          symbol: renderer.defaultSymbol || renderer.symbol,
          label: (layer ? layer.title : '') || ''
        });
      } else {
        features.forEach(feature => {
          const value = feature.attributes[field];
          const symbolInfo = renderer.classBreakInfos.find(info => 
            value >= info.minValue && value <= info.maxValue
          ) || renderer.defaultSymbol;
          
          if (symbolInfo) {
            const key = `${symbolInfo.minValue}-${symbolInfo.maxValue}`;
            if (!symbolMap.has(key)) {
              symbolMap.set(key, {
                symbol: symbolInfo.symbol,
                label: symbolInfo.label
              });
            }
          }
        });
      }
    } else if (renderer.visualVariables) {
      // Handle visual variables for FeatureServer
      symbolMap.set('visual-variable', {
        symbol: renderer.symbol || renderer.defaultSymbol,
        label: (layer ? layer.title : '') || 'Visual Variable'
      });
    }
    
    return Array.from(symbolMap.values());
  };

  const drawPointSymbol = async (pdf, x, y, symbol) => {
    if (!symbol) return;
    
    if (symbol.type === "picture-marker") {
        try {
            const response = await fetch(symbol.url);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = function() {
                    const img = new Image();
                    img.src = reader.result;
                    img.onload = function() {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = 20;
                        canvas.height = 20;
                        ctx.drawImage(img, 0, 0, 20, 20);
                        pdf.addImage(canvas.toDataURL(), 'PNG', x - 3, y - 3, 6, 6);
                        resolve();
                    };
                };
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error loading custom symbol:", error);
            pdf.circle(x, y, 2, "F");
        }
        return;
    }

    const [r, g, b] = getColorFromSymbol(symbol.color);
    pdf.setFillColor(r, g, b);
    pdf.setDrawColor(r, g, b);

    const size = symbol.size ? symbol.size / 4 : 2;

    if (symbol.cim || symbol.iconPath) {
        pdf.rect(x - size, y - size, size * 2, size * 2, "F");
        return;
    }

    if (symbol.type === "simple-marker") {
        switch (symbol.style) {
            case "circle":
                pdf.circle(x, y, size, "F");
                break;
            case "square":
                pdf.rect(x - size, y - size, size * 2, size * 2, "F");
                break;
            case "diamond":
                pdf.lines(
                    [[size, 0], [0, size], [-size, 0], [0, -size]],
                    x, y, [1, 1], "F"
                );
                break;
            case "cross":
                pdf.line(x - size, y, x + size, y);
                pdf.line(x, y - size, x, y + size);
                break;
            case "x":
                pdf.lines(
                    [[-size, -size], [size, size], [-size, size], [size, -size]],
                    x, y, [1, 1], "S"
                );
                break;
            case "triangle":
                pdf.lines(
                    [[0, -size], [size, size], [-size, size], [0, -size]],
                    x, y, [1, 1], "F"
                );
                break;
            default:
                pdf.circle(x, y, size, "F");
        }
    }
  };

  const drawLineSymbol = (pdf, x, y, symbol) => {
    if (!symbol) return;

    const [r, g, b] = getColorFromSymbol(symbol.color);
    pdf.setDrawColor(r, g, b);
    
    const width = symbol.width || 0.5;
    pdf.setLineWidth(width);
    
    switch (symbol.style) {
        case "dash":
            pdf.setLineDashPattern([2, 2], 0);
            break;
        case "dot":
            pdf.setLineDashPattern([1, 1], 0);
            break;
        case "dashdot":
            pdf.setLineDashPattern([3, 1, 1, 1], 0);
            break;
        case "longdash":
            pdf.setLineDashPattern([4, 2], 0);
            break;
        case "longdashdot":
            pdf.setLineDashPattern([8, 2, 1, 2], 0);
            break;
        default:
            pdf.setLineDashPattern([], 0);
    }
    
    pdf.line(x - 5, y, x + 5, y);
    pdf.setLineDashPattern([], 0);
  };

  const drawPolygonSymbol = (pdf, x, y, symbol, size = 6) => {
    if (!symbol) return;

    const rectWidth = 10;
    const rectHeight = 6;
    const currentFillColor = pdf.getFillColor();
    const currentDrawColor = pdf.getDrawColor();
    const currentLineWidth = pdf.getLineWidth();
    const currentLineDash = pdf.getLineDash ? pdf.getLineDash() : [];

    // Melakukan pemeriksaan jika polygon berjenis hollow
    const isHollow = symbol.style === "hollow" || 
                    symbol.style === "none" ||
                    (symbol.type === "simple-fill" && symbol.style === "none") ||
                    !symbol.color || 
                    (symbol.color && symbol.color.a === 0);

    // Membuat batasan lebar outline jika polygon berjenis hollow
    const getOutlineWidth = (outlineWidth, isHollow) => {
      return isHollow ? Math.min(outlineWidth || 0.5, 0.8) : outlineWidth || 0.5;
    };

    // Membuat Kondisi Jika Polygon Berjenis Hollow maka dia akan memiliki fill collor berwarna putih
    if (isHollow) {
      pdf.setFillColor(255, 255, 255);
      pdf.rect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight, "F");
      
      if (symbol.outline) {
        const [outlineR, outlineG, outlineB] = getColorFromSymbol(symbol.outline.color) || [0, 0, 0];
        pdf.setDrawColor(outlineR, outlineG, outlineB);
        const limitedWidth = getOutlineWidth(symbol.outline.width, true);
        pdf.setLineWidth(limitedWidth);

        if (symbol.outline.style === "dash" && pdf.setLineDash) {
          pdf.setLineDash([2, 2]);
        } else if (pdf.setLineDash) {
          pdf.setLineDash([]);
        }

        pdf.rect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight, "S");
      } else {
        pdf.setDrawColor(0, 0, 0);
        pdf.setLineWidth(0.5);
        pdf.rect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight, "S");
      }
    } else {
      const [r, g, b] = getColorFromSymbol(symbol.color) || [0, 0, 0];
      pdf.setFillColor(r, g, b);

      if (symbol.outline) {
        const [outlineR, outlineG, outlineB] = getColorFromSymbol(symbol.outline.color) || [0, 0, 0];
        pdf.setDrawColor(outlineR, outlineG, outlineB);
        pdf.setLineWidth(symbol.outline.width || 0.5);

        if (symbol.outline.style === "dash" && pdf.setLineDash) {
          pdf.setLineDash([2, 2]);
        } else if (pdf.setLineDash) {
          pdf.setLineDash([]);
        }

        pdf.rect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight, "FD");
      } else {
        pdf.rect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight, "F");
      }
    }
    pdf.setFillColor(currentFillColor);
    pdf.setDrawColor(currentDrawColor);
    pdf.setLineWidth(currentLineWidth);
    if (pdf.setLineDash) {
      pdf.setLineDash(currentLineDash);
    }
  };

  const addScalebar = async (pdf, view) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);

    // Mengambil skala dari peta
    const scale = view.scale;
    const pdfWidth = 65; 
    const groundDistance = scale * (pdfWidth / 1000);

    // Menghitung ukuran ground distance pada skala
    const niceDistance = getNiceRoundNumber(groundDistance);
    const ratio = niceDistance / groundDistance;
    const adjustedPdfWidth = Math.min(pdfWidth * ratio, 70); 

    // Konfigurasi border scalebar
    const borderX = 309;
    const borderY = 40;
    const borderWidth = 106;
    const borderHeight = 30;

    // Ruang untuk north arrow (sekitar 25mm) ditambah margin
    const northArrowWidth = borderHeight * 0.65; 
    const northArrowMargin = 5; 
    const scalebarMargin = 10; 
    
    // Posisi awal scalebar dengan northarrow
    const startX = borderX + northArrowMargin + northArrowWidth + scalebarMargin;
    const startY = borderY + (borderHeight / 2) + 1.5; 
    const barHeight = 3;

    // Membuat gambar scalebar
    const segments = 4; 
    const segmentWidth = adjustedPdfWidth / segments;
    for (let i = 0; i < segments; i++) {
      const x = startX + i * segmentWidth;
      if (i % 2 === 0) {
        pdf.setFillColor(0, 0, 0);
      } else {
        pdf.setFillColor(200, 200, 200);
      }
      pdf.rect(x, startY, segmentWidth, barHeight, i % 2 === 0 ? "F" : "FD");
    }

    // Style untuk scalebar
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.rect(startX, startY, adjustedPdfWidth, barHeight);

    // Menambahkan label pada scalebar
    for (let i = 0; i <= segments; i++) {
      const x = startX + i * segmentWidth;
      pdf.line(x, startY - 1, x, startY + barHeight + 1);
      const distance = (niceDistance / segments) * i;
      const label = formatDistance(distance);
      pdf.setFontSize(8);
      const textWidth = pdf.getStringUnitWidth(label) * 8 / pdf.internal.scaleFactor;
      pdf.text(label, x - textWidth / 2, startY + barHeight + 6);
    }
  };

  // Membulatkan angka pada skala
  const getNiceRoundNumber = (number) => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(number)));
    const normalized = number / magnitude;

    if (normalized < 1.5) return magnitude;
    if (normalized < 3.5) return 2 * magnitude;
    if (normalized < 7.5) return 5 * magnitude;
    return 10 * magnitude;
  };

  // Merubah angka skala menjadi format meter atau kilometer berdasarkan zoom pada peta 
  const formatDistance = (distance) => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(1)} km`;
    }
    return `${Math.round(distance)} m`;
  }; 
    
  //Membuat Grid Peta
  const drawGrid = (pdf, extent, mapWidth, mapHeight, startX, startY) => {
    pdf.setDrawColor(128, 128, 128); 
    pdf.setLineWidth(0.2);
    pdf.setLineDashPattern([1, 1], 0); 

    // Menghitung Interval Nilai x dan nilai y pada grid 
    const xRange = extent.xmax - extent.xmin;
    const yRange = extent.ymax - extent.ymin;

    // Menghitung Interval Grid Dalam Derajad
    const xInterval = getNiceGridInterval(xRange);
    const yInterval = getNiceGridInterval(yRange);

    // Menghitung awal dan akhir garis grid pada peta 
    const xStart = Math.ceil(extent.xmin / xInterval) * xInterval;
    const xEnd = Math.floor(extent.xmax / xInterval) * xInterval;
    const yStart = Math.ceil(extent.ymin / yInterval) * yInterval;
    const yEnd = Math.floor(extent.ymax / yInterval) * yInterval;

    // Konversi Koordinat x dan y pada halaman peta 
    const xToPage = (x) => {
      const xPct = (x - extent.xmin) / xRange;
      return startX + (xPct * mapWidth);
    };

    const yToPage = (y) => {
      const yPct = (y - extent.ymin) / yRange;
      return startY + mapHeight - (yPct * mapHeight);
    };

    // Membuat gambar garis vertikal (garis longitude/bujur pada grid)
    for (let x = xStart; x <= xEnd; x += xInterval) {
      const xPos = xToPage(x);
      if (xPos >= startX && xPos <= startX + mapWidth) {
        pdf.line(xPos, startY, xPos, startY + mapHeight);

        // Menambahkan label pada longitude
        pdf.setFontSize(5);
        const lonLabel = `${Math.abs(x).toFixed(4)}°${x >= 0 ? 'mT' : 'mB'}`;
        if (xPos >= startX && xPos <= startX + mapWidth) {
          pdf.text(lonLabel, xPos, startY + mapHeight + 3, { 
            align: 'center', 
            angle: 0 
          });
        }
      }
    }

    // Membuat gambar garis horizontal (garis latitude/lintang pada grid)
    for (let y = yStart; y <= yEnd; y += yInterval) {
      const yPct = (y - extent.ymin) / yRange;
      const yPos = startY + mapHeight - (yPct * mapHeight);
      //Menambahkan label pada grid latitude
      pdf.line(startX, yPos, startX + mapWidth, yPos);
      pdf.setFontSize(5);
      const latLabel = `${Math.abs(y).toFixed(4)}°${y >= 0 ? 'mU' : 'mS'}`;
      pdf.text(latLabel, startX - 1, yPos, { align: 'left', angle: 90 });
    }

    // Membuat border diarea grid
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.setLineDashPattern([], 0);
    pdf.rect(startX, startY, mapWidth, mapHeight);
  };
  
  // Perhitungan untuk mendapatkan interval grid peta
  const getNiceGridInterval = (range) => {
    let targetIntervals = 6; 
    let roughInterval = range / targetIntervals;  
    
    // Pembulatan angka pada grid peta
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughInterval)));
    const normalized = roughInterval / magnitude;
    let niceInterval;
    if (normalized <= 1) niceInterval = 1;
    else if (normalized <= 2) niceInterval = 2;
    else if (normalized <= 5) niceInterval = 5;
    else niceInterval = 10;

    return niceInterval * magnitude;
  }; 

    
  //Membuat Inset Peta
  const createInsetMap = async (pdf, view, mainExtent, insetZoomOutFactor = 3.5) => {
    try {
      const centerPoint = mainExtent.center;
  
      // Buat container untuk peta inset
      const insetMapDiv = document.createElement("div");
      insetMapDiv.style.width = "400px";
      insetMapDiv.style.height = "200px";
      insetMapDiv.style.position = "absolute";
      insetMapDiv.style.visibility = "hidden";
      document.body.appendChild(insetMapDiv);
  
      // Buat peta inset
      const insetView = new view.constructor({
        container: insetMapDiv,
        map: new view.map.constructor({
          basemap: "streets",
        }),
        center: centerPoint,
        zoom: view.zoom - insetZoomOutFactor,
      });
  
      // Sinkronisasi zoom inset dengan peta utama
      const updateInsetZoom = () => {
        const insetZoom = view.zoom - insetZoomOutFactor;
        insetView.zoom = insetZoom;
      };
  
      // Perbarui zoom inset saat zoom peta utama berubah
      const zoomWatcher = view.watch("zoom", () => {
        updateInsetZoom();
      });
  
      await insetView.when();
      await new Promise((resolve) => {
        const handle = insetView.watch("updating", (updating) => {
          if (!updating) {
            handle.remove();
            resolve();
          }
        });
      });
  
      // Tambahkan (extent indicator) ke peta inset
      const Graphic = (await import("@arcgis/core/Graphic")).default;
      const GraphicsLayer = (await import("@arcgis/core/layers/GraphicsLayer")).default;
  
      const graphicsLayer = new GraphicsLayer();
      insetView.map.add(graphicsLayer);
  
      const extentIndicator = new Graphic({
        geometry: mainExtent,
        symbol: {
          type: "simple-fill",
          color: [0, 0, 0, 0],
          outline: {
            color: [255, 0, 0, 1],
            width: 2,
          },
        },
      });
  
      graphicsLayer.add(extentIndicator);
  
      // Menampilkan extent indicator
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      const screenshotWidth = 570;
      const screenshotHeight = Math.round(screenshotWidth / 2.375);
  
      // Ambil screenshot peta inset
      const insetScreenshot = await insetView.takeScreenshot({
        format: "png",
        quality: 100,
        width: screenshotWidth,
        height: screenshotHeight,
      });
  
      // Gambar border untuk inset
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(1);
      pdf.rect(309, 75, 106, 45, "D");
      const insetX = 309 + (106 - 95) / 2;
      const insetY = 75 + (45 - 40) / 2;
  
      // Menambahkan inset pada layout peta
      pdf.addImage(
        insetScreenshot.dataUrl,
        "PNG",
        insetX,
        insetY,
        95,
        40
      );
  
      zoomWatcher.remove();
      insetView.destroy();
      document.body.removeChild(insetMapDiv);
    } catch (error) {
      console.error("Error creating inset map:", error);
    }
  };

  const addNorthArrow = async (pdf) => {
    // Koordinat border scalebar
    const borderX = 309;
    const borderY = 40;  
    const borderHeight = 35; 
    
    // Posisi north arrow - di kiri dengan jarak yang sama seperti logo
    const margin = 5; 
    const arrowX = borderX + margin; 
    const arrowCenterY = borderY + (borderHeight / 2); 
    const arrowSize = borderHeight * 0.65;
    const arrowY = arrowCenterY - (arrowSize / 2);
    
    const northArrowImagePath = "/geoportal/assets/north-arrow.png";
    try {
      const img = new Image();
      img.crossOrigin = "Anonymous"; 
      img.src = northArrowImagePath;
  
      await new Promise((resolve, reject) => {
        img.onload = () => {
          pdf.addImage(img, "PNG", arrowX, arrowY, arrowSize, arrowSize);
          resolve();
        };
        img.onerror = (err) => reject(err);
      });
    } catch (error) {
      console.error("Error loading North Arrow image:", error);
    }
  };

  const handlePrintClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setTitle("");
    setError(null);
  };

  const handleAreaSelect = () => {
    setIsDialogOpen(false);
    setIsMasking(true);
    setIsReadyToPrint(true);
    setSelectedExtent(view.extent.clone());
  };

  function getLegendOrder(item) {
    const geometryType = item.layer?.geometryType;
    const symbolCount = item.symbols.length;
    
    if (geometryType === "point" || geometryType === "multipoint") {
      return 1; 
    }
    if (geometryType === "polyline") {
      return 2; 
    }
    if (geometryType === "polygon") {
      return symbolCount === 1 ? 3 : 4;
    }
    if (geometryType === "multipolygon") {
      return symbolCount === 1 ? 3 : 4;
    }
    return 99;
  }

  // Enhanced getFeaturesInExtent function to better handle MapServer sublayers
  const getFeaturesInExtent = async (layer, extent) => {
    if (!layer || !layer.visible) return [];
    
    try {
      // Check if the layer has queryFeatures method
      if (typeof layer.queryFeatures === 'function') {
        try {
          const query = layer.createQuery();
          query.geometry = extent;
          query.spatialRelationship = "intersects";
          query.outFields = ["*"];
          query.returnGeometry = true;
          const result = await layer.queryFeatures(query);
          return result.features || [];
        } catch (err) {
          console.error(`Error querying features for layer ${layer.title}:`, err);
          return [];
        }
      }
      // Handle layers without queryFeatures method (e.g., TileLayer, GroupLayer)
      else {
        console.log(`Layer ${layer.title || 'unnamed'} does not support querying.`);
        return [];
      }
    } catch (error) {
      console.error(`Error in getFeaturesInExtent for layer ${layer?.title || 'unknown'}:`, error);
      return [];
    }
  };

  // Fix for the addLegend function to properly handle MapImageLayer sublayers
  const addLegend = async (pdf, visibleLayers, extent, isNewPage = false, limitItems = false) => {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    let legendY, startX, borderWidth;
    let symbolWidth, fontSizeTitle, fontSizeItems, spacingBetweenLayers;
    let currentColumnX;
    let maxTextWidth;
    const lineHeight = 5;

    // Halaman Pertama 
    if (!isNewPage) {
      startX = 309; 
      const boxY = 120; 
      borderWidth = 106; 

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      const disclaimerTitle = "Disclaimer";
      const titleWidth = pdf.getTextWidth(disclaimerTitle);
      const titleX = startX + (borderWidth - titleWidth) / 2;
      const titleY = boxY + 8;
      pdf.text(disclaimerTitle, titleX, titleY);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.setLineHeightFactor(1.5);
      const disclaimerText =
        "Peta ini dicetak berdasarkan data yang tersedia pada saat pembuatan dan mungkin tidak mencerminkan perubahan terkini. 'Peta Cetak Jakarta Satu' ditujukan semata-mata untuk informasi keruangan dan bukan sebagai dasar resmi produk perizinan atau pengambilan keputusan hukum. Apabila terdapat perbedaan informasi terkait letak, bentuk, posisi serta informasi lainnya dapat disampaikan melalui jakartasatu@jakarta.go.id";
      const margin = 5; 
      const textAreaWidth = borderWidth - margin * 2; 
      const disclaimerLines = pdf.splitTextToSize(disclaimerText, textAreaWidth);
      const textX = startX + margin;
      const textY = titleY + 6;
      pdf.text(disclaimerLines, textX, textY, { maxWidth: textAreaWidth, align: "justify" });
      pdf.setLineHeightFactor(1);

      return { items: [], totalItems: 0, drawnItems: 0 };
    }
    // Halaman Kedua
    else {
      pdf.setFont("helvetica", "bold");
      fontSizeTitle = 12;
      pdf.setFontSize(fontSizeTitle);
      const header = "Legenda";
      const headerWidth = pdf.getTextWidth(header);
      const rectLeft = 5;
      const rectTop = 45;
      const rectWidth = pageWidth - 10
    const rectCenterX = rectLeft + rectWidth / 2;
    const textY = rectTop + 10;
    pdf.text(header, rectCenterX - headerWidth / 2, textY);
    pdf.setFont("helvetica", "normal");

    const innerMargin = 10;
    currentColumnX = rectLeft + innerMargin;
    legendY = textY + 10;
    borderWidth = 106;
    symbolWidth = 15;
    fontSizeItems = 8;
    spacingBetweenLayers = 2;
    maxTextWidth = borderWidth - 20 - 5;
  }

  // Import required ESRI modules
  const FeatureLayer = (await import("@arcgis/core/layers/FeatureLayer")).default;
  
  let allLegendItems = [];
  
  // Handle all visible layers
  for (const layer of visibleLayers) {
    if (!layer.visible) continue;
    
    try {
      // Special handling for MapImageLayer (MapServer) layers
      if (layer.type === "map-image") {
        // Process each visible sublayer
        const sublayers = layer.sublayers?.items || [];
        for (const sublayer of sublayers) {
          if (!sublayer.visible) continue;
          
          try {
            // Create a temporary FeatureLayer to access the sublayer
            const tempUrl = `${layer.url}/${sublayer.id}`;
            const tempLayer = new FeatureLayer({ 
              url: tempUrl,
              title: sublayer.title || layer.title
            });
            
            await tempLayer.load();
            
            // Check if we have features in the current extent
            const features = await getFeaturesInExtent(tempLayer, extent);
            if (features.length === 0) continue;
            
            // Get renderer from the sublayer
            const renderer = sublayer.renderer || tempLayer.renderer;
            if (!renderer) continue;
            
            const uniqueSymbols = getUniqueSymbols(features, renderer, tempLayer);
            if (uniqueSymbols.length === 0) continue;
            
            allLegendItems.push({ 
              layer: tempLayer, 
              symbols: uniqueSymbols,
              title: sublayer.title || layer.title
            });
          } catch (err) {
            console.error(`Error processing sublayer ${sublayer.id} in MapImageLayer:`, err);
          }
        }
      } else {
        // Standard handling for FeatureLayers
        const features = await getFeaturesInExtent(layer, extent);
        if (features.length === 0) continue;
        
        const renderer = layer.renderer;
        if (!renderer) continue;
        
        const uniqueSymbols = getUniqueSymbols(features, renderer, layer);
        if (uniqueSymbols.length === 0) continue;
        
        allLegendItems.push({ 
          layer, 
          symbols: uniqueSymbols,
          title: layer.title
        });
      }
    } catch (err) {
      console.error(`Error processing layer for legend:`, err);
    }
  }

  // Sort legend items
  allLegendItems.sort((a, b) => getLegendOrder(a) - getLegendOrder(b));

  const totalItems = allLegendItems.reduce((sum, item) => sum + (item.symbols.length > 0 ? item.symbols.length : 1), 0);
  pdf.setFont("helvetica", "normal");
  let itemCount = 0;
  let initialLegendY = legendY;
  const columnSpacing = 10;
  const maxColumns = 3; 
  let columnCount = 1;
  const itemGap = 10; 

  for (const item of allLegendItems) {
    if (!isNewPage && limitItems && itemCount >= 6) break;

    pdf.setFontSize(fontSizeItems);
    // Use the title property we explicitly set earlier
    const layerTitle = item.title || item.layer.title || "Layer";
    const titleLines = pdf.splitTextToSize(layerTitle, maxTextWidth);
    let estimatedHeight = titleLines.length * lineHeight + 5;
    if (item.symbols.length > 1) {
      estimatedHeight += item.symbols.length * 8 + 5;
    }

    if (isNewPage && legendY + estimatedHeight > (pageHeight - 15)) {
      columnCount++;
      if (columnCount <= maxColumns) {
        currentColumnX += borderWidth + columnSpacing;
        legendY = initialLegendY;
      } else break;
    }

    let symbolStartX = isNewPage ? currentColumnX + 10 : (startX + 10);
    let textStartX = symbolStartX + 10;

    // If only 1 symbol (whether from polygon or multipolygon layer), display in "polygon single" group
    if (item.symbols.length === 1) {
      const symbolInfo = item.symbols[0];
      pdf.setFontSize(fontSizeItems);
      const symbolScale = isNewPage ? 0.6 : 1;
      const fontHeight = pdf.getTextDimensions("Aj").h; 
      const symbolOffsetY = (item.layer.geometryType === "point" || item.layer.geometryType === "multipoint")
        ? fontHeight / 4 : fontHeight / 3;
      const symbolYPosition = legendY - symbolOffsetY;
      const textYPosition = legendY; 

      // Draw the symbol based on geometry type
      switch (item.layer.geometryType) {
        case "point":
        case "multipoint":
          await drawPointSymbol(pdf, symbolStartX, symbolYPosition, symbolInfo.symbol, symbolScale);
          break;
        case "polyline":
          drawLineSymbol(pdf, symbolStartX, symbolYPosition, symbolInfo.symbol, symbolScale);
          break;
        case "polygon":
        case "multipolygon":
          drawPolygonSymbol(pdf, symbolStartX, symbolYPosition, symbolInfo.symbol, symbolScale);
          break;
      }

      pdf.setFont("helvetica", "bold");
      // Use symbol label or layer title
      if (symbolInfo.label) {
        const labelLines = pdf.splitTextToSize(symbolInfo.label.toString(), maxTextWidth - 15);
        pdf.text(labelLines, textStartX, textYPosition);
        if (labelLines.length > 1) legendY += (labelLines.length - 1) * lineHeight;
      } else {
        // Fall back to layer title if no label
        pdf.text(layerTitle, textStartX, textYPosition);
      }
      pdf.setFont("helvetica", "normal");
      legendY += itemGap;
      itemCount++;
    }
    // Multiple symbols
    else {
      pdf.setFont("helvetica", "bold");
      pdf.text(titleLines, textStartX, legendY);
      pdf.setFont("helvetica", "normal");
      legendY += titleLines.length * lineHeight + 3;

      for (const symbolInfo of item.symbols) {
        if (!symbolInfo.symbol) continue;
        if (isNewPage && legendY + 8 > (pageHeight - 15)) {
          columnCount++;
          if (columnCount <= maxColumns) {
            currentColumnX += borderWidth + columnSpacing;
            legendY = initialLegendY;
          } else break;
        }
        symbolStartX = isNewPage ? currentColumnX + 10 : (startX + 10);
        textStartX = symbolStartX + 10;
        const symbolScale = isNewPage ? 0.6 : 1;
        const fontHeight = pdf.getTextDimensions("Aj").h;
        const symbolOffsetY = (item.layer.geometryType === "point" || item.layer.geometryType === "multipoint")
          ? fontHeight / 4 : fontHeight / 3;
        const symbolYPosition = legendY - symbolOffsetY;
        
        // Draw the symbol based on geometry type
        switch (item.layer.geometryType) {
          case "point":
          case "multipoint":
            await drawPointSymbol(pdf, symbolStartX, symbolYPosition, symbolInfo.symbol, symbolScale);
            break;
          case "polyline":
            drawLineSymbol(pdf, symbolStartX, symbolYPosition, symbolInfo.symbol, symbolScale);
            break;
          case "polygon":
          case "multipolygon":
            drawPolygonSymbol(pdf, symbolStartX, symbolYPosition, symbolInfo.symbol, symbolScale);
            break;
        }
        
        if (symbolInfo.label) {
          const labelLines = pdf.splitTextToSize(symbolInfo.label.toString(), maxTextWidth - 15);
          pdf.text(labelLines, textStartX, legendY);
          legendY += labelLines.length * lineHeight;
        } else {
          legendY += lineHeight;
        }
        legendY += 3; 
        itemCount++;
        if (!isNewPage && limitItems && itemCount >= 6) break;
      }
      legendY += itemGap;
    }
  }

  return { items: allLegendItems, totalItems: totalItems, drawnItems: itemCount };
};


    const handlePrintArea = async () => {
      if (!view || !selectedExtent) return;

      setIsLoading(true);
      try {
        const visibleLayers = view.map.layers.filter(layer => layer.visible);
        await view.when();

        const { width, height } = paperSizes[paperSize];
        const isLandscape = orientation === "landscape";
        const pageWidth = isLandscape ? width : height;
        const pageHeight = isLandscape ? height : width;
        const mapWidth = pageWidth * 0.7;
        const mapHeight = pageHeight * 0.93;

        const screenshot = await view.takeScreenshot({
          extent: selectedExtent,
          format: "png",
          quality: 100,
          width: Math.round(mapWidth * 3.6),
          height: Math.round(mapHeight * 3.6)
        });

        // Inisialisasi jsPDF
        const pdf = new jsPDF({
          orientation: orientation,
          unit: "mm",
          format: [width, height]
        });

        // HALAMAN PERTAMA: Peta & Disclaimer
        pdf.addImage(
          screenshot.dataUrl,
          "PNG",
          10,
          10,
          mapWidth,
          mapHeight,
          undefined,
          "FAST"
        );

        // Tambahkan judul, north arrow, scalebar, dsb. (Contoh singkat)
        const addTitle = (pdf, isSecondPage = false) => {
          let titleBoxX, titleBoxY, titleBoxWidth, titleBoxHeight;
          const margin = 5;
          if (isSecondPage) {
            titleBoxX = 5;
            titleBoxY = 5;
            titleBoxWidth = pageWidth - 10; 
            titleBoxHeight = 40;
          } else {
            titleBoxX = 309;
            titleBoxY = 5;
            titleBoxWidth = 106;
            titleBoxHeight = 40;
          }
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(14);
          const logoWidth = 20;
          const logoHeight = 20;
          const logoX = titleBoxX + margin;
          const logoY = titleBoxY + (titleBoxHeight - logoHeight) / 2;
          const textStartX = logoX + logoWidth + margin;
          const availableWidth = titleBoxWidth - (textStartX - titleBoxX) - margin;
          const titleLines = pdf.splitTextToSize(title, availableWidth);
          const lineHeight = 8;
          const totalTextHeight = titleLines.length * lineHeight;
          const startY = titleBoxY + (titleBoxHeight - totalTextHeight) / 2 + lineHeight / 2;

          titleLines.forEach((line, index) => {
            const y = startY + index * lineHeight;
            pdf.text(line, textStartX + (availableWidth / 2), y, {
              align: "center",
              baseline: "middle",
            });
          });
          
          // Logo
          const logo = "/geoportal/assets/logo-jktsatu-besar.png"; 
          const img = new Image();
          img.onload = () => {
            pdf.addImage(img, "PNG", logoX, logoY, logoWidth, logoHeight);
          };
          img.src = logo;
        };

        addTitle(pdf);
        await addNorthArrow(pdf);
        drawGrid(pdf, selectedExtent, mapWidth, mapHeight, 10, 10);
        await addScalebar(pdf, view);
        await addLegend(pdf, visibleLayers, selectedExtent, false, true);

        // Buat inset map
        await createInsetMap(pdf, view, selectedExtent);

        // Tambahkan info proyeksi, dsb. (contoh)
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.text("Proyeksi Peta", 315, 228);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text("Proyeksi  : Universal Transverse Mercator (UTM)", 315, 235);
        pdf.text("Zona       : 48S", 315, 242);
        pdf.text("Datum     : WGS 1984", 315, 249);

        // Sumber peta + timestamp
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.text("Sumber Peta & Tanggal Pembuatan Peta", 315, 265);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text("Data Jakarta Satu", 315, 272);
        pdf.link(315, 268, 50, 10, { url: "https://jakartasatu.jakarta.go.id/geoportal" });
        const timestamp = new Date().toLocaleString();
        pdf.text(`Waktu Cetak: ${timestamp}`, 315, 280);

        // Border halaman pertama 
        pdf.setLineWidth(1);
        pdf.setDrawColor(0, 0, 0);
        pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);
        pdf.rect(mapWidth + 15, 5, pageWidth - mapWidth - 20, pageHeight - 10);
        pdf.rect(309, 5, 106, 40, "D");
        pdf.rect(309, 45, 106, 30, "D");
        pdf.rect(309, 75, 106, 45, "D");
        pdf.rect(309, 120, 106, 100, "D");
        pdf.rect(309, 220, 106, 37, "D");
        pdf.rect(309, 257, 106, 35, "D");

        // HALAMAN KEDUA: Tampilkan legendanya
        pdf.addPage();
        pdf.setLineWidth(1);
        pdf.setDrawColor(0, 0, 0);
        pdf.rect(5, 5, pageWidth - 10, 40, "D");
        pdf.rect(5, 45, pageWidth - 10, pageHeight - 50, "D");

        addTitle(pdf, true);
        await addLegend(pdf, visibleLayers, selectedExtent, true, false);

        // Simpan PDF
        const pdfId = `${title.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`;
        Swal.fire({
          title: 'Peta Siap diunduh',
          text: 'Klik "Unduh" untuk mendapatkan file PDF Peta.',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Unduh',
          cancelButtonText: 'Batal',
          confirmButtonColor: "#3085d6",
          cancelButtonColor : "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            pdf.save(`${pdfId}.pdf`);
          }
        });

      } catch (error) {
        console.error("Error generating PDF:", error);
        setError("Error generating PDF. Please try again.");
      } finally {
        setIsLoading(false);
        setIsMasking(false);
        setIsReadyToPrint(false);
        setSelectedExtent(null);
      }
    };

 
  return (
  <>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {/* Tombol Cetak Area Ini */}
      {isReadyToPrint && (
        <Button
          variant="contained"
          onClick={handlePrintArea}
          disabled={isLoading}
          sx={{
            backgroundColor: "#003577",
            "&:hover": {
              backgroundColor: "#002755",
            },
            zIndex: 1000,
            borderRadius: "12px",
            padding: "12px 24px",
            fontSize: "16px",
            width: "200px",
            textTransform: "none",
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={20} color="inherit" sx={{ marginRight: 1 }} />
              Peta di proses
            </>
          ) : (
            "Cetak Area Ini"
          )}
        </Button>
      )}

      {/* Tombol Print */}
      <IconButton
        onClick={handlePrintClick}
        disabled={isLoading}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          backgroundColor: "white",
          width: 48,
          rowGap: "7px",
          boxShadow: 1,
        }}
      >
        {isLoading ? <CircularProgress size={24} /> : <PrintIcon />}
      </IconButton>
    </Box>

    {/* Dialog untuk input judul */}
    <Dialog
      open={isDialogOpen}
      onClose={handleDialogClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px", 
          padding: "16px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "bold",
          fontSize: "18px",
          padding: 0,
        }}
      >
        Judul Peta
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: "relative",
            color: (theme) => theme.palette.grey[500],
            marginLeft: "auto",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <TextField
          autoFocus
          fullWidth
          value={title}
          size="medium"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ketik Judul Peta yang Ingin Dicetak"
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px", 
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleAreaSelect}
          disabled={!title}
          sx={{
            backgroundColor: "#003577",
            "&:hover": {
              backgroundColor: "#002755",
            },
            borderRadius: "8px", 
            textTransform: "none", 
          }}
        >
          Selanjutnya
        </Button>
      </DialogContent>
    </Dialog>

    {/* Masking saat area dipilih */}
    {isMasking && (
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "250mm",
          height: "187mm",
          background: "rgba(255, 51, 0, 0.1)",
          border: "2px dashed rgb(255, 51, 0)",
          pointerEvents: "none",
          zIndex: 999,
        }}
      />
    )}

    {/* Snackbar untuk pesan error */}
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={() => setError(null)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  </>
  );
};

export default Print;