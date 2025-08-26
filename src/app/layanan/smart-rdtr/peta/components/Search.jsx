import { Box, List, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import EsriSearch from "@arcgis/core/widgets/Search";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";

const Search = ({ view, bahasa = "ID" }) => {
  const theme = useTheme();
  const isMobile2 = useMediaQuery(theme.breakpoints.down("431"));
  const width = isMobile2 ? "80vw" : "543px";
  const height = "39px";

  const [search, setSearch] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchGraphic, setSearchGraphic] = useState(null);

  // Fungsi untuk memproses input koordinat
  const processCoordinates = (input) => {
    const coordRegex = /^\s*(-?\d+(\.\d+)?)\s*[,\s]\s*(-?\d+(\.\d+)?)\s*$/;
    const match = input.match(coordRegex);
    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[3]);
      // Validasi rentang koordinat (contoh: area Jakarta)
      if (lat >= -6.4 && lat <= -6.0 && lon >= 106.6 && lon <= 107.0) {
        return { latitude: lat, longitude: lon };
      }
    }
    return null;
  };

  // Fungsi membuat marker kustom beserta popup
  const createGraphic = (geometry, attributes) => {
    const { name, latitude, longitude } = attributes;
    const locationIconSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(255, 0, 0)">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
      </svg>
    `;
    const locationIconUrl =
      "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(locationIconSVG);

    return new Graphic({
      geometry: geometry,
      symbol: {
        type: "picture-marker",
        url: locationIconUrl,
        width: "38px",
        height: "38px",
      },
      attributes: { name, latitude, longitude },
      popupTemplate: {
        title: "Hasil Pencarian",
        content: (evt) => {
          const g = evt.graphic;
          const locName = g.attributes.name;
          const lat = g.attributes.latitude;
          const lon = g.attributes.longitude;
          let html = "";
          if (locName) {
            html += `<b>Lokasi:</b> ${locName}<br>`;
          }
          html += `<b>Koordinat:</b> ${lat}, ${lon}`;
          return html;
        },
      },
    });
  };

  // Tambahkan marker pencarian ke view dan buka popup
  const addSearchGraphic = (geometry, locationName) => {
    if (searchGraphic) {
      view.graphics.remove(searchGraphic);
    }
    let pointGeometry = geometry;
    if (geometry.spatialReference.wkid !== view.spatialReference.wkid) {
      pointGeometry = webMercatorUtils.geographicToWebMercator(geometry);
    }
    const originalCoords =
      geometry.spatialReference.wkid === 4326
        ? geometry
        : webMercatorUtils.webMercatorToGeographic(geometry);
    const lat = originalCoords.latitude || originalCoords.y;
    const lon = originalCoords.longitude || originalCoords.x;
    const graphic = createGraphic(pointGeometry, {
      name: locationName,
      latitude: lat,
      longitude: lon,
    });
    view.graphics.add(graphic);
    setSearchGraphic(graphic);
    view.popup.open({
      location: pointGeometry,
      features: [graphic],
    });
  };

  // Fungsi zoom ke lokasi pencarian
  const zoomToLocation = (point) => {
    let targetPoint = point;
    if (point.spatialReference.wkid !== view.spatialReference.wkid) {
      targetPoint = webMercatorUtils.geographicToWebMercator(point);
    }
    view.goTo(
      { target: targetPoint, zoom: 16 },
      { duration: 1000, easing: "ease-out" }
    );
  };

  // Menangani pencarian jika input merupakan koordinat
  const handleCoordinateSearch = (coordinates) => {
    const point = new Point({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      spatialReference: new SpatialReference({ wkid: 4326 }),
    });
    addSearchGraphic(point, "Koordinat");
    zoomToLocation(point);
    setSuggestions([]);
  };

  useEffect(() => {
    if (view) {
      const handleMapClick = () => {
        setSuggestions([]);
      };
      view.on("click", handleMapClick);
  
      return () => {
        view.on("click", handleMapClick);
      };
    }
  }, [view]);

  // Inisialisasi widget EsriSearch secara offscreen
  useEffect(() => {
    if (view) {
      const offscreenContainer = document.createElement("div");
      const searchWidget = new EsriSearch({
        container: offscreenContainer,
        view: view,
        allPlaceholder: "Jalan/Bangunan/RT/RW / Koordinat",
        includeDefaultSources: false,
        locationEnabled: false,
        resultGraphicEnabled: false,
        popupEnabled: false,
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
            minSuggestCharacters: 3,
          },
          {
            name: "Koordinat",
            placeholder: "Masukkan Koordinat (lat, lon)",
            getSuggestions: (params) => {
              const input = params.suggestTerm;
              const coordinates = processCoordinates(input);
              if (coordinates) {
                return Promise.resolve([
                  {
                    text: `Koordinat: ${coordinates.latitude}, ${coordinates.longitude}`,
                    location: coordinates,
                  },
                ]);
              }
              return Promise.resolve([]);
            },
            getResults: (params) => {
              if (params.suggestResult && params.suggestResult.location) {
                const { latitude, longitude } = params.suggestResult.location;
                const point = new Point({
                  latitude,
                  longitude,
                  spatialReference: new SpatialReference({ wkid: 4326 }),
                });
                const webMercatorPoint = webMercatorUtils.geographicToWebMercator(point);
                const buffer = 100;
                return Promise.resolve([
                  {
                    extent: {
                      xmin: webMercatorPoint.x - buffer,
                      ymin: webMercatorPoint.y - buffer,
                      xmax: webMercatorPoint.x + buffer,
                      ymax: webMercatorPoint.y + buffer,
                      spatialReference: webMercatorPoint.spatialReference,
                    },
                    feature: {
                      geometry: point,
                      attributes: {
                        title: `Koordinat: ${latitude}, ${longitude}`,
                      },
                    },
                    name: `Koordinat: ${latitude}, ${longitude}`,
                  },
                ]);
              }
              return Promise.resolve([]);
            },
          },
        ],
      });

      setSearch(searchWidget);

      searchWidget.on("select-result", (event) => {
        if (event.result && event.result.feature) {
          const feature = event.result.feature;
          const geom = feature.geometry;
          const matchAddr =
            feature.attributes.Match_addr ||
            feature.attributes.title ||
            "Koordinat";
          addSearchGraphic(geom, matchAddr);
          zoomToLocation(geom);
        }
      });
    }
    return () => {
      if (search) {
        search.destroy();
      }
    };
  }, [view]);

  // Memastikan popup tidak menampilkan marker jika popup tertutup
  useEffect(() => {
    if (view && view.popup) {
      view.popup.autoCloseEnabled = false;
      const popupWatchHandle = view.popup.watch("visible", (visible) => {
        if (!visible && searchGraphic) {
          view.graphics.remove(searchGraphic);
          setSearchGraphic(null);
        }
      });
      return () => {
        popupWatchHandle.remove();
      };
    }
  }, [view, searchGraphic]);

  // Tangani perubahan teks di input
  const handleTextChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
    const coordinates = processCoordinates(newSearchText);
    if (coordinates) {
      setSuggestions([
        {
          text: `Koordinat: ${coordinates.latitude}, ${coordinates.longitude}`,
          location: coordinates,
        },
      ]);
    } else if (search) {
      search.suggest(newSearchText).then((response) => {
        if (response && response.results) {
          const allSuggestions = response.results.flatMap(
            (res) => res.results || []
          );
          setSuggestions(allSuggestions);
        } else {
          setSuggestions([]);
        }
      });
    }
  };

  // Tangani klik pada salah satu suggestion
  const handleListClick = (suggestion) => {
    setSearchText(suggestion.text);
    if (suggestion.location) {
      handleCoordinateSearch(suggestion.location);
    } else if (search) {
      search.search(suggestion.text).then((response) => {
        if (
          response &&
          response.results &&
          response.results.length > 0 &&
          response.results[0].feature
        ) {
          const feature = response.results[0].feature;
          const geom = feature.geometry;
          const matchAddr =
            feature.attributes.Match_addr ||
            response.results[0].name ||
            "Koordinat";
          addSearchGraphic(geom, matchAddr);
          zoomToLocation(geom);
        }
      });
    }
  };

  // Eksekusi pencarian ketika menekan Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const coordinates = processCoordinates(searchText);
      if (coordinates) {
        handleCoordinateSearch(coordinates);
      } else if (search) {
        search.search(searchText).then((response) => {
          if (
            response &&
            response.results &&
            response.results.length > 0 &&
            response.results[0].feature
          ) {
            const feature = response.results[0].feature;
            const geom = feature.geometry;
            const matchAddr =
              feature.attributes.Match_addr ||
              response.results[0].name ||
              "Koordinat";
            addSearchGraphic(geom, matchAddr);
            zoomToLocation(geom);
          }
        });
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
        placeholder={
          bahasa === "ID"
            ? "Cari Alamat atau Koordinat (lat, lon) ..."
            : "Search Address or Coordinates (lat, lon) ..."
        }
        sx={{
          fontFamily: "var(--font-family)",
          fontSize: "0.9em",
          width: width,
          height: height,
          paddingLeft: "1%",
          borderRadius: "40px",
          background: "white",
          boxShadow: "0px 4px 20px rgba(170, 180, 190, 0.3)",
        }}
      />
      {suggestions && suggestions.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            background: "white",
            border: "1px solid #DFE6E9",
            borderRadius: "20px",
            zIndex: 1000,
            mt: 1,
            width: width,
          }}
        >
          <List
            sx={{
              display: "grid",
              width: "100%", 
              boxShadow: "0px 4px 20px rgba(170, 180, 190, 0.3)",
              padding: "10px 10px",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <Typography
                key={index}
                onClick={() => handleListClick(suggestion)}
                sx={{
                  fontSize: "0.9em",
                  backgroundColor: "white",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#e4e4e4" },
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  py: "0px",
                  width: "100%", 
                }}
              >
                {suggestion.text}
              </Typography>
            ))}
          </List>
        </Box>
      )}
    </Stack>
  );
};

export default Search;