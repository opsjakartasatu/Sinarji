import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Paper, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Download } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import Loader from "../loader";

import styles from "../../page.module.css";

const BpIcon = styled('span')(() => ({
  borderRadius: 5,
  margin: "0 10px",
  width: 23,
  height: 23,
  outline: '1px solid #003577',
}));

const BpCheckedIcon = styled(BpIcon)({
  borderRadius: 5,
  width: 23,
  height: 23,
  outline: '2px solid #003577',
  background: 'var(--jakartasatu-biru)',
  backgroundImage:
    "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
    " fillRule='evenodd' clipRule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
    "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
});

const Result = ({ fetchStatus, urlImages }) => {
  const theme = useTheme();
  const isMobileLG = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobileHeight = useMediaQuery("(max-height: 431px)");
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [layerStates, setLayerStates] = useState({});

  useEffect(() => {
    let map;
    if (urlImages && urlImages.length > 0 && mapRef.current) {
      map = new Map({
        container: mapRef.current,
        center: [106.82654395700384, -6.1747853953193],
        zoom: 9,
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "&copy; OpenStreetMap Contributors",
              maxzoom: 19,
            },
          },
          layers: [
            {
              id: "osm",
              type: "raster",
              source: "osm",
            },
          ],
        },
        maxZoom: 18,
        maxPitch: 85,
      });

      setMapInstance(map);

      map.on("load", () => {
        const initialLayerStates = {};
        urlImages.forEach(({ imageId, urlImage }) => {
          const sourceId = `Raster-${imageId}`;
          const layerId = `Layer-${imageId}`;

          map.addSource(sourceId, {
            type: "raster",
            tiles: [urlImage],
            tileSize: 256,
          });

          map.addLayer({
            id: layerId,
            type: "raster",
            source: sourceId,
            minzoom: 0,
            maxzoom: 20,
            paint: { "raster-opacity": 1 },
          });

          initialLayerStates[imageId] = { visible: true, opacity: 1 };
        });
        setLayerStates(initialLayerStates);
      });
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [urlImages, mapRef.current]);

  const handleToggleLayer = (imageId) => {
    setLayerStates((prev) => {
      const newState = {
        ...prev,
        [imageId]: {
          ...prev[imageId],
          visible: !prev[imageId].visible,
        },
      };
      mapInstance?.setLayoutProperty(
        `Layer-${imageId}`,
        "visibility",
        newState[imageId].visible ? "visible" : "none"
      );
      return newState;
    });
  };

  const handleOpacityChange = (imageId, value) => {
    setLayerStates((prev) => {
      const newState = {
        ...prev,
        [imageId]: {
          ...prev[imageId],
          opacity: value,
        },
      };
      mapInstance?.setPaintProperty(
        `Layer-${imageId}`,
        "raster-opacity",
        value
      );
      return newState;
    });
  };

  const handleDownloadLink = (downloadLink) => {
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "image_download.tif";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const [isHidden, setIsHidden] = useState(true);

  const toggleBoxVisibility = () => setIsHidden(!isHidden);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            color: "black",
          }}
        >
          {fetchStatus === "pending" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader />
            </Box>
          ) : urlImages && urlImages.length > 0 ? (
            <>
              <Box
                sx={{
                  display: fetchStatus === "success" ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
                ref={mapRef}
              >
                {isMobileHeight ? (
                  <>
                    <Paper
                      elevation={0}
                      onClick={toggleBoxVisibility}
                      sx={{
                        padding: "30px 5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        position: "absolute",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        boxShadow: "0 -5px 20px 0 rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(100px)",
                        borderRadius: "15px 0 0 15px",
                        right: isHidden ? "0" : "41.8vw",
                        transform: isHidden ? "translateX(0)" : "translateX(50%)",
                        zIndex: 998,
                        color: "black",
                        transition: "right 0.3s ease-in-out, transform 0.3s ease-in-out",
                        textTransform: "none",
                        fontSize: "16px",
                      }}
                    >
                      {isHidden ? <KeyboardArrowLeftRoundedIcon sx={{ color: "black" }} /> : <KeyboardArrowRightRoundedIcon sx={{ color: "black" }} />}
                    </Paper>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        position: "absolute",
                        zIndex: 999,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        boxShadow: "0 -5px 20px 0 rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(100px)",
                        right: isHidden ? "-40vw" : "0",
                        top: 0,
                        width: "40vw",
                        height: "100%",
                        transition: "right 0.3s ease-in-out",
                        overflowY: "scroll",
                      }}
                    >
                      <Box
                        sx={{
                          margin: "5px 10px 5px 20px",
                          paddingRight: "20px",
                          overflowY: "scroll",

                          '::-webkit-scrollbar': {
                            width: '10px',
                          },
                          '::-webkit-scrollbar-track': {
                            borderRadius: '5px',
                            border: "1px solid #DFE6E9",
                            margin: "20px"
                          },
                          '::-webkit-scrollbar-thumb': {
                            background: '#003577',
                            borderRadius: '5px',
                          },
                          '::-webkit-scrollbar-thumb:hover': {
                            background: '#002b5e',
                          },
                        }}
                      >
                        {urlImages?.map(({ imageId, downloadLink }) => (
                          <Box key={imageId} sx={{ marginBottom: "10px" }}>
                            <FormControlLabel
                              sx={{
                                overflowWrap: "break-word",
                                wordBreak: "break-word",
                                whiteSpace: "normal"
                              }}
                              control={
                                <Checkbox
                                  checked={layerStates[imageId]?.visible || false}
                                  onChange={() => handleToggleLayer(imageId)}
                                  color="primary"
                                  icon={<BpIcon />}
                                  checkedIcon={<BpCheckedIcon />}
                                />
                              }
                              label={`${imageId}`}
                            />
                            <Stack direction="row" justifyContent="center" alignItems="center" gap={4}>
                              <Slider
                                valueLabelDisplay="auto"
                                value={layerStates[imageId]?.opacity || 0}
                                min={0}
                                max={1}
                                step={0.01}
                                onChange={(event, value) =>
                                  handleOpacityChange(imageId, value)
                                }
                                sx={{ marginLeft: "51px" }}
                              />
                              <IconButton onClick={() => handleDownloadLink(downloadLink)}>
                                <FileDownloadOutlinedIcon sx={{ fontSize: "30px" }} />
                              </IconButton>
                            </Stack>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    {isMobileLG ? (
                      <>
                        <Paper
                          elevation={0}
                          onClick={toggleBoxVisibility}
                          sx={{
                            padding: "5px 30px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            position: "absolute",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(100px)",
                            boxShadow: "0 -5px 20px 0 rgba(0, 0, 0, 0.1)",
                            borderRadius: "15px 15px 0 0",
                            bottom: isHidden ? "0" : "30vh",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 1000,
                            color: "black",
                            transition: "bottom 0.3s ease-in-out",
                            textTransform: "none",
                            fontSize: "16px",
                          }}
                        > Layer
                          {isHidden ? <KeyboardArrowUpRoundedIcon sx={{ color: "black" }} /> : <KeyboardArrowDownRoundedIcon sx={{ color: "black" }} />}
                        </Paper>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            position: "absolute",
                            zIndex: 999,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(100px)",
                            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                            borderRadius: "25px 25px 0 0",
                            bottom: isHidden ? "-40vh" : "0",
                            left: 0,
                            width: "100%",
                            height: "30vh",
                            transition: "bottom 0.3s ease-in-out",
                            overflowY: "scroll",
                          }}
                        >
                          <Box
                            sx={{
                              margin: "5px 10px 5px 20px",
                              paddingRight: "20px",
                              overflowY: "scroll",

                              '::-webkit-scrollbar': {
                                width: '10px',
                              },
                              '::-webkit-scrollbar-track': {
                                borderRadius: '5px',
                                border: "1px solid #DFE6E9",
                                margin: "20px"
                              },
                              '::-webkit-scrollbar-thumb': {
                                background: '#003577',
                                borderRadius: '5px',
                              },
                              '::-webkit-scrollbar-thumb:hover': {
                                background: '#002b5e',
                              },
                            }}
                          >
                            {urlImages?.map(({ imageId, downloadLink }) => (
                              <Box key={imageId} sx={{ marginBottom: "10px" }}>
                                <FormControlLabel
                                  sx={{
                                    overflowWrap: "break-word",
                                    wordBreak: "break-word",
                                    whiteSpace: "normal"
                                  }}
                                  control={
                                    <Checkbox
                                      checked={layerStates[imageId]?.visible || false}
                                      onChange={() => handleToggleLayer(imageId)}
                                      color="primary"
                                      icon={<BpIcon />}
                                      checkedIcon={<BpCheckedIcon />}
                                    />
                                  }
                                  label={`${imageId}`}
                                />
                                <Stack direction="row" justifyContent="center" alignItems="center" gap={4}>
                                  <Slider
                                    valueLabelDisplay="auto"
                                    value={layerStates[imageId]?.opacity || 0}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onChange={(event, value) =>
                                      handleOpacityChange(imageId, value)
                                    }
                                    sx={{ marginLeft: "51px" }}
                                  />
                                  <IconButton onClick={() => handleDownloadLink(downloadLink)}>
                                    <FileDownloadOutlinedIcon sx={{ fontSize: "30px" }} />
                                  </IconButton>
                                </Stack>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box sx={{
                          display: "flex",
                          flexDirection: "column",
                          position: "absolute",
                          zIndex: 999,
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          backdropFilter: "blur(100px)",
                          borderRadius: "20px",
                          boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.1)",
                          // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          top: "125px",
                          right: "20px",
                          width: "400px",
                          height: "100%",
                          maxHeight: "50vh",
                        }}>
                          <Box
                            sx={{
                              margin: "5px 10px 5px 20px",
                              paddingRight: "20px",
                              overflowY: "scroll",

                              '::-webkit-scrollbar': {
                                width: '10px',
                              },
                              '::-webkit-scrollbar-track': {
                                borderRadius: '5px',
                                border: "1px solid #DFE6E9",
                                margin: "20px"
                              },
                              '::-webkit-scrollbar-thumb': {
                                background: '#003577',
                                borderRadius: '5px',
                              },
                              '::-webkit-scrollbar-thumb:hover': {
                                background: '#002b5e',
                              },
                            }}
                          >
                            {urlImages?.map(({ imageId, downloadLink }) => (
                              <Box key={imageId} sx={{ marginBottom: "10px" }}>
                                <FormControlLabel
                                  sx={{
                                    overflowWrap: "break-word",
                                    wordBreak: "break-word",
                                    whiteSpace: "normal"
                                  }}
                                  control={
                                    <Checkbox
                                      checked={layerStates[imageId]?.visible || false}
                                      onChange={() => handleToggleLayer(imageId)}
                                      color="primary"
                                      icon={<BpIcon />}
                                      checkedIcon={<BpCheckedIcon />}
                                    />
                                  }
                                  label={`Layer ${imageId}`}
                                />
                                <Stack direction="row" justifyContent="center" alignItems="center" gap={4}>
                                  <Slider
                                    valueLabelDisplay="auto"
                                    value={layerStates[imageId]?.opacity || 0}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onChange={(event, value) =>
                                      handleOpacityChange(imageId, value)
                                    }
                                    sx={{ marginLeft: "51px" }}
                                  />
                                  <IconButton onClick={() => handleDownloadLink(downloadLink)}>
                                    <FileDownloadOutlinedIcon sx={{ fontSize: "30px" }} />
                                  </IconButton>
                                </Stack>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </>
                    )}
                  </>
                )}
              </Box>
            </>
          ) : (
            <Typography variant="p"
              sx={{
                fontSize: "20px",
                fontWeight: "400",
                textAlign: "center",
                color: "gray",
              }}
            >
              Masukkan paramater pada <b>data selection</b> untuk menampilkan data
            </Typography>
          )}
        </Box>
      </div>
    </main >
  );
};

export default Result;
