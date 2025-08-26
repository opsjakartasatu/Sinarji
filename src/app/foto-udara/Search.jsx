import { Box, InputAdornment, List, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import EsriSearch from "@arcgis/core/widgets/Search";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";
import PopupTemplate from "@arcgis/core/PopupTemplate";

const Search = ({ view, views, bahasa = "ID" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("431"));
  const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));

  const [search, setSearch] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchGraphics, setSearchGraphics] = useState([]); 

  const activeViews = views || (view ? [view] : []);
  const primaryView = view || (views && views[0]);

  useEffect(() => {
    if (primaryView) {
      const searchWidget = new EsriSearch({
        view: primaryView,
        allPlaceholder: "Jalan/Bangunan/RT/RW / Koordinat",
        includeDefaultSources: false,
        locationEnabled: false,
        sources: [
          {
            url: "https://tataruang.jakarta.go.id/server/rest/services/Locator_DKI/GeocodeServer",
            singleLineFieldName: "SingleLine",
            name: "Jakarta Geocoding Service",
            placeholder: "Jalan/Bangunan/RT/RW",
            outFields: ["*"],
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 3
          },
          {
            name: "Koordinat",
            placeholder: "Masukkan Koordinat (lat, lon)",
            getSuggestions: (params) => {
              const input = params.suggestTerm;
              const coordinates = processCoordinates(input);
              if (coordinates) {
                return Promise.resolve([{
                  text: `Koordinat: ${coordinates.latitude}, ${coordinates.longitude}`,
                  location: coordinates
                }]);
              }
              return Promise.resolve([]);
            },
            getResults: (params) => {
              if (params.suggestResult && params.suggestResult.location) {
                const { latitude, longitude } = params.suggestResult.location;
                const point = new Point({
                  latitude,
                  longitude,
                  spatialReference: new SpatialReference({ wkid: 4326 })
                });

                const webMercatorPoint = webMercatorUtils.geographicToWebMercator(point);
                const buffer = 100;

                return Promise.resolve([{
                  extent: {
                    xmin: webMercatorPoint.x - buffer,
                    ymin: webMercatorPoint.y - buffer,
                    xmax: webMercatorPoint.x + buffer,
                    ymax: webMercatorPoint.y + buffer,
                    spatialReference: webMercatorPoint.spatialReference
                  },
                  feature: {
                    geometry: point,
                    attributes: {
                      title: `Koordinat: ${latitude}, ${longitude}`
                    }
                  },
                  name: `Koordinat: ${latitude}, ${longitude}`
                }]);
              }
              return Promise.resolve([]);
            }
          }
        ]
      });

      setSearch(searchWidget);

      searchWidget.on("select-result", (event) => {
        if (event.result) {
          const attributes = {
            title: event.result.name || event.result.feature?.attributes?.title || "Lokasi Ditemukan"
          };
          addSearchGraphic(event.result.feature.geometry, attributes);
        }
      });
    }

    return () => {
      if (search) {
        search.destroy();
      }
     
      clearSearchGraphics();
    };
  }, [primaryView, views]); 
  const processCoordinates = (input) => {
    const coordRegex = /^\s*(-?\d+(\.\d+)?)\s*[,\s]\s*(-?\d+(\.\d+)?)\s*$/;
    const match = input.match(coordRegex);

    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[3]);

      // Range Koordinat Jakarta
      if (lat >= -6.4 && lat <= -6.0 && lon >= 106.6 && lon <= 107.0) {
        return { latitude: lat, longitude: lon };
      }
    }
    return null;
  };

  const addSearchGraphic = (geometry, attributes = {}) => {
    clearSearchGraphics();

    const newGraphics = [];

    activeViews.forEach((currentView, index) => {
      if (currentView) {
        let pointGeometry = geometry;
        if (geometry.spatialReference.wkid !== currentView.spatialReference.wkid) {
          pointGeometry = webMercatorUtils.geographicToWebMercator(geometry);
        }

        currentView.graphics.add(graphic);
        newGraphics.push(graphic);

        currentView.popup.watch("visible", (visible) => {
          if (visible) {
            setTimeout(() => {
              const closeButton = document.getElementById("closeSearchResult");
              if (closeButton) {
                closeButton.onclick = () => {
                  clearSearchGraphics();
                  currentView.popup.close();
                };
              }
            }, 100);
          }
        });

        if (index === 0 || views) { 
          currentView.popup.open({
            features: [graphic],
            location: pointGeometry
          });
        }
      }
    });

    setSearchGraphics(newGraphics);
  };

  const clearSearchGraphics = () => {
    searchGraphics.forEach(graphic => {
      activeViews.forEach(currentView => {
        if (currentView && currentView.graphics) {
          currentView.graphics.remove(graphic);
        }
      });
    });
    setSearchGraphics([]);
  };

  const zoomToLocation = (point) => {
    activeViews.forEach(currentView => {
      if (currentView) {
        let targetPoint = point;
        if (point.spatialReference.wkid !== currentView.spatialReference.wkid) {
          targetPoint = webMercatorUtils.geographicToWebMercator(point);
        }

        currentView.goTo({
          target: targetPoint,
          zoom: 18
        }, {
          duration: 1000,
          easing: "ease-out"
        });
      }
    });
  };

  const handleCoordinateSearch = (coordinates) => {
    const point = new Point({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      spatialReference: new SpatialReference({ wkid: 4326 })
    });

    const attributes = {
      title: `Koordinat: ${coordinates.latitude}, ${coordinates.longitude}`
    };

    addSearchGraphic(point, attributes);
    zoomToLocation(point);
    setSuggestions([]);
  };

  const handleTextChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    if (newSearchText.trim() === "") {
      setSuggestions([]);
      return;
    }

    const coordinates = processCoordinates(newSearchText);
    if (coordinates) {
      setSuggestions([{
        text: `Koordinat: ${coordinates.latitude}, ${coordinates.longitude}`,
        location: coordinates
      }]);
    } else if (search) {
      search.suggest(newSearchText).then((response) => {
        if (response && response.results) {
          const allSuggestions = response.results.flatMap(result => result.results || []);
          setSuggestions(allSuggestions);
        } else {
          setSuggestions([]);
        }
      });
    }
  };

  // Fungsi untuk menangani klik pada saran lokasi
  const handleListClick = (suggestion) => {
    setSearchText(suggestion.text);
    setSuggestions([]); 
    if (suggestion.location) {
      handleCoordinateSearch(suggestion.location);
    } else if (search) {
      search.search(suggestion.text);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const coordinates = processCoordinates(searchText);
      if (coordinates) {
        handleCoordinateSearch(coordinates);
      } else if (search) {
        search.search(searchText);
      }
    }
  };

  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
      <OutlinedInput
        type="search"
        id="searchInput"
        value={searchText}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        placeholder={bahasa === "ID" ? "Cari Alamat atau Koordinat (lat, lon) ..." : "Search Address or Coordinates (lat, lon) ..."}
        startAdornment={
          <InputAdornment position="start" sx={{ margin: "0 10px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.91582 0.351563C8.33451 0.351697 6.77617 0.729987 5.37079 1.45487C3.96541 2.17976 2.75376 3.23022 1.83693 4.51861C0.920099 5.807 0.324668 7.29597 0.100316 8.86128C-0.124036 10.4266 0.0291973 12.0229 0.547231 13.5169C1.06526 15.011 1.93308 16.3595 3.07827 17.4499C4.22346 18.5404 5.61281 19.3411 7.13042 19.7854C8.64803 20.2297 10.2499 20.3047 11.8023 20.004C13.3548 19.7033 14.8128 19.0357 16.0548 18.0569L20.3155 22.3176C20.5355 22.5301 20.8302 22.6477 21.1361 22.645C21.442 22.6424 21.7346 22.5197 21.9509 22.3034C22.1673 22.087 22.29 21.7944 22.2926 21.4885C22.2953 21.1826 22.1777 20.8879 21.9652 20.6679L17.7045 16.4072C18.8572 14.945 19.5748 13.1877 19.7754 11.3366C19.976 9.48545 19.6514 7.61525 18.8388 5.94C18.0261 4.26476 16.7582 2.85214 15.1802 1.86383C13.6022 0.87552 11.7778 0.351437 9.91582 0.351563ZM2.33249 10.2682C2.33249 8.257 3.13145 6.32815 4.5536 4.906C5.97575 3.48385 7.9046 2.6849 9.91582 2.6849C11.927 2.6849 13.8559 3.48385 15.2781 4.906C16.7002 6.32815 17.4992 8.257 17.4992 10.2682C17.4992 12.2795 16.7002 14.2083 15.2781 15.6305C13.8559 17.0526 11.927 17.8516 9.91582 17.8516C7.9046 17.8516 5.97575 17.0526 4.5536 15.6305C3.13145 14.2083 2.33249 12.2795 2.33249 10.2682Z" fill="var(--jakartasatu-biru)" />
            </svg>
          </InputAdornment>
        }
        sx={{
          fontFamily: 'var(--font-family)',
          width: isMobileMD ? '90vw' : '350px',
          margin: "0 auto",
          height: '49px',
          paddingLeft: '1%',
          borderRadius: '40px',
          background: 'white',
          border: "1px solid rgba(0, 69, 129, 0.30)",
          boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "white",
          border: "1px solid #DFE6E9",
          borderRadius: "20px",
          zIndex: 1000,
        }}
      >
        {suggestions && suggestions.length > 0 && (
          <List
            sx={{
              display: "grid",
              width: isMobileMD ? '90vw' : '350px',
              boxShadow: "0px 4px 20px rgba(170, 180, 190, 0.3)",
            }}
            style={{ padding: "10px 10px" }}
          >
            {suggestions.map((suggestion, index) => (
              <Typography
                variant="p"
                key={index}
                onClick={() => handleListClick(suggestion)}
                sx={{
                  margin: "2px 0",
                  backgroundColor: "white",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#e4e4e4" },
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                }}
              >
                {suggestion.text}
              </Typography>
            ))}
          </List>
        )}
      </Box>
    </Stack>
  );
};

export default Search;