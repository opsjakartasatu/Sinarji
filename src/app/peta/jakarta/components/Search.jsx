import { Box, List, OutlinedInput, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EsriSearch from "@arcgis/core/widgets/Search";

const Search = ({ view, width, height }) => {
  const [search, setSearch] = useState();
  const [searchText, setSearchText] = useState();
  const [suggestions, setSuggestions] = useState();

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
        maxSuggestions: 6,
      });
      setSearch(searchWidget);
    }
    return () => {
      if (search) {
        search.destroy();
      }
    };
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

  const handleListClick = (suggestionText) => {
    setSearchText(suggestionText);
    search.searchTerm = suggestionText;
    search.search();
    setSuggestions([]);
  };

  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
      <OutlinedInput
        type="search"
        id="searchInput"
        value={searchText}
        onChange={handleTextChange}
        placeholder="Cari Alamat"
        sx={{
          fontFamily: 'var(--font-family)',
          fontSize: "0.9em",
          width: width,
          height: height,
          paddingLeft: "1%",
          borderRadius: "8px",
          background: "white",
          boxShadow: "0px 4px 20px rgba(170, 180, 190, 0.3)",
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
        }}
      >
        {suggestions && suggestions.length > 0 && (
          <List
            sx={{
              display: "grid",
              maxWidth: width,
              boxShadow: "0px 4px 20px rgba(170, 180, 190, 0.3)",
            }}
            style={{ padding: "10px 10px" }}
          >
            {suggestions.map((suggestion, index) => (
              <Typography
                variant="p"
                key={index}
                onClick={() => handleListClick(suggestion.text)}
                sx={{
                  fontSize: "0.9em",
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
