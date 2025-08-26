import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import EsriSearch from "@arcgis/core/widgets/Search";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, IconButton, InputAdornment, List, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import "@arcgis/core/assets/esri/themes/light/main.css";
import Popup from "@arcgis/core/widgets/Popup";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Basemap from "@arcgis/core/Basemap";
import '../../../components/navbar/style.css';
import './petahome.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Link from "next/link";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const MapComponent = ({ isWidget }) => {
  const theme = useTheme();
  const isMobile2 = useMediaQuery(theme.breakpoints.down("431"));

  const mapRef = useRef();
  const [view, setView] = useState();
  const [center, setCenter] = useState([106.826959, -6.176923]);
  const [zoom, setZoom] = useState(15);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState();
  const [suggestions, setSuggestions] = useState([]);

  const zoomIn = () => {
    view.goTo({ zoom: view.zoom + 1 });
  };

  const zoomOut = () => {
    view.goTo({ zoom: view.zoom - 1 });
  };

  useEffect(() => {
    if (isWidget) {
      const basemap2020 = new Basemap({
        title: "Peta Dasar 2020",
        thumbnailUrl:
          "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/afe064255a184168ae05628587819480/data",
        baseLayers: new TileLayer({
          title: "Peta Dasar 2020",
          url: "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/Peta_Dasar_DKI_Jakarta/MapServer",
        }),
      });
      const map = new Map({
        basemap: basemap2020,
      });
      const view = new MapView({
        map: map,
        container: mapRef.current,
        center: center,
        zoom: zoom,
        ui: {
          components: [],
        },
        popup: new Popup({
          defaultPopupTemplateEnabled: true,
          dockEnabled: false,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
          },
          visibleElements: {
            closeButton: true,
          },
        }),
      });
      setView(view);
    } else {
      const basemap2020 = new Basemap({
        title: "Peta Dasar 2020",
        thumbnailUrl:
          "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/afe064255a184168ae05628587819480/data",
        baseLayers: new TileLayer({
          title: "Peta Dasar 2020",
          url: "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/Peta_Dasar_DKI_Jakarta/MapServer",
        }),
      });
      const halte = new FeatureLayer({
        url: "https://jakartasatu.jakarta.go.id/server/rest/services/BINAMARGA/Halte_Dinas_Bina_Marga_Edit/FeatureServer/0"
      });
      const jalurTJ = new FeatureLayer({
        url: "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/Jalur_Transjakarta/FeatureServer/0"
      });
      const puskesmas = new FeatureLayer({
        url: "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/Peta_Kesehatan/FeatureServer/4"
      });
      const map = new Map({
        basemap: basemap2020,
        layers: [jalurTJ, halte, puskesmas]
      });
      const view = new MapView({
        map: map,
        container: mapRef.current,
        center: [106.826959, -6.176923],
        zoom: 15,
        navigation: {
          gamepad: {
            enabled: false
          },
          browserTouchPanEnabled: true,
          momentumEnabled: false,
          mouseWheelZoomEnabled: false
        },
        ui: {
          components: [],
        },
        popup: new Popup({
          defaultPopupTemplateEnabled: true,
          dockEnabled: false,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
          },
          visibleElements: {
            closeButton: true,
          },
        }),
      });
      setView(view);
    }
  }, [isWidget]);

  useEffect(() => {
    if (view) {
      const searchWidget = new EsriSearch({
        view: view,
        allPlaceholder: "Jalan/Bangunan/RT/RW",
        includeDefaultSources: false,
        locationEnabled: false,
        sources: [
          {
            url: "https://tataruang.jakarta.go.id/server/rest/services/Locator_DKI/GeocodeServer",
            singleLineFieldName: "SingleLine",
            name: "Jakarta Geocoding Service",
            placeholder: "Jalan/Bangunan/RT/RW",
          },
        ],
        maxSuggestions: 15,
      });
      setSearch(searchWidget);
    }
  }, [view]);

  const handleTextChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    search.searchTerm = newSearchText;

    search.suggest(newSearchText).then((value) => {
      if (value) {
        const searchSuggestion = value.results[0].results;
        setSuggestions(searchSuggestion);
      }
    });
  };

  return (
    <>
      <Box ref={mapRef} sx={{ width: "100%", height: "100%" }}>
        <>
          <Stack
            sx={{
              padding: "15px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <OutlinedInput
              type="search"
              id="searchInput"
              value={searchText}
              onChange={handleTextChange}
              placeholder="Cari Peta"
              // endAdornment={
              //     <InputAdornment position="end">
              //         {searchText && (
              //             <IconButton
              //                 aria-label="clear"
              //                 edge="end"
              //                 size="small"
              //                 onClick={() => {
              //                     setSearchText('');
              //                 }}
              //             >
              //                 <ClearRoundedIcon size="small" onClick={handleClearIcon} />
              //             </IconButton>
              //         )}
              //     </InputAdornment>
              // }
              sx={{
                // fontFamily: "__Inter_c128ca",
                fontSize: "0.9em",
                // width: isMobile2 ? '80vw' : '543px',
                width: isMobile2 ? '80vw' : '40vw',
                minWidth: isMobile2 ? "" : "300px",
                maxWidth: "700px",
                height: '39px',
                paddingLeft: '1%',
                borderRadius: '40px',
                background: 'white',
                boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
              }}
            />
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              background: "white",
              border: "1px solid #DFE6E9",
              borderRadius: "20px",
            }}>
              {suggestions && suggestions.length > 0 && (
                <List sx={{ fontFamily: "__Inter_c128ca", display: "grid", width: isMobile2 ? '80vw' : '40vw', minWidth: isMobile2 ? "" : "300px", boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)', }}
                  style={{
                    padding: "10px 20px"
                  }}>
                  {suggestions.map((suggestion, index) => (
                    <Typography variant="p"
                      key={index}
                      onClick={() => handleListClick(suggestion.text)}
                      sx={{
                        fontFamily: "__Inter_c128ca",
                        fontSize: "0.9em",
                        backgroundColor: "white",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#e4e4e4" },
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        paddingTop: "2px",
                        paddingBottom: "2px"
                      }}
                    >
                      {suggestion.text}
                    </Typography>
                  ))}
                </List>
              )}
            </Box>
          </Stack>

          {/* <Link href="/peta/interaktif">
            <Stack
              sx={{
                borderRadius: "5px",
                backgroundColor: "white",
                width: "39px",
                position: "absolute",
                marginLeft: "-60px",
                marginTop: isMobile2 ? "340px" : "20px",
                boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
                border: "1px solid #DFE6E9",
              }}>
              <Tooltip placement="top-end" arrow title="Untuk fitur lainnya dapat dilihat dalam bentuk fullscreen"
                slotProps={{
                  popper: {
                    sx: {
                      [`&.${tooltipClasses.popper}[data-popper-placement*="top-end"] .${tooltipClasses.tooltip}`]: {
                        background: 'var(--jakartasatu-biru)',
                        boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.10)',
                        maxWidth: "249px",
                        color: "white",
                        fontFamily: 'var(--font-family)',
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "150%",
                      },
                    },
                  },
                }}>
                <IconButton disableRipple>
                  <OpenInFullRoundedIcon
                    style={{
                      color: 'var(--jakartasatu-biru)',

                    }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Link> */}

          <Stack
            direction="column"
            spacing={1}
            sx={{
              borderRadius: "5px",
              backgroundColor: "white",
              width: "39px",
              position: "absolute",
              marginLeft: "-60px",
              marginTop: isMobile2 ? "393px" : "548px",
              boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
              border: "1px solid #DFE6E9",
            }}>
            <Tooltip placement="left" title="Perbesar"
              slotProps={{
                popper: {
                  sx: {
                    [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                    {
                      background: 'var(--jakartasatu-biru)',
                      boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.10)',
                      color: "white",
                      fontFamily: 'var(--font-family)',
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "150%",
                    },
                  },
                },
              }}>
              <IconButton onClick={zoomIn} disableRipple>
                <AddRoundedIcon style={{ color: 'var(--jakartasatu-biru)' }} />
              </IconButton>
            </Tooltip>
            <Tooltip placement="left" title="Perkecil"
              slotProps={{
                popper: {
                  sx: {
                    [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                    {
                      background: 'var(--jakartasatu-biru)',
                      boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.10)',
                      color: "white",
                      fontFamily: 'var(--font-family)',
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "150%",
                    },
                  },
                },
              }}>
              <IconButton onClick={zoomOut} disableRipple>
                <RemoveRoundedIcon style={{ color: 'var(--jakartasatu-biru)' }} />
              </IconButton>
            </Tooltip>
          </Stack>
          <Box sx={{
            padding: "15px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            justifyContent: "center",
            alignItems: "center",
            marginTop: isMobile2 ? "428px" : "585px",
          }}>
            <Link href="/peta/jakarta">
              <Button variant="contained"
                sx={{
                  // fontFamily: "__Inter_c128ca",
                  textTransform: "none",
                  fontSize: "0.9em",
                  fontWeight: "600",
                  width: isMobile2 ? '50vw' : '30vw',
                  minWidth: isMobile2 ? "" : "230px",
                  maxWidth: "230px",
                  height: '39px',
                  borderRadius: isMobile2 ? '5px' : '40px',
                  background: '#F7941D',
                  color: "white",
                  boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
                }}>
                Halaman Peta Jakarta
              </Button>
            </Link>
          </Box>
        </>
      </Box>
    </>
  );
};

export default MapComponent;
