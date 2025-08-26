import { Autorenew } from "@mui/icons-material";
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, OutlinedInput, TextField, styled } from "@mui/material";
import { useState } from "react";

const checkboxListStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "80%",
  textAlign: "left",
  overflowY: "scroll",
  borderRadius: "5px",
  "::-webkit-scrollbar": {
    width: "10px",
    borderRadius: "5px"
  },
  "::-webkit-scrollbar-track": {
    border: "1px solid #DFE6E9",
    borderRadius: "5px"
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: 'var(--jakartasatu-biru)',
    borderRadius: "5px"
  },
}

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 5,
  marginRight: "10px",
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
    " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
    "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
});

const Kegiatan = ({ kegiatan, listKegiatan, setListKegiatan, searchInput, setSearchInput, subLayer }) => {
  const [loading, setLoading] = useState(false);
  const [loadingKegiatan, setLoadingKegiatan] = useState(null);

  const filterKegiatan = async (subLayer, kegiatan) => {
    const kegiatanExists = listKegiatan.includes(kegiatan);
    const updatedListKegiatan = kegiatanExists ? listKegiatan.filter((item) => item !== kegiatan) : [...listKegiatan, kegiatan];
    setListKegiatan(updatedListKegiatan);
    const queryWhere = updatedListKegiatan.length > 0 ? updatedListKegiatan.map((selectedKegiatan) => `IZN LIKE '%${selectedKegiatan}%'`).join(" OR ") : "1=1";
    if (subLayer) {
      try {
        setLoading(true);
        setLoadingKegiatan(kegiatan);
        subLayer.definitionExpression = queryWhere;
        await subLayer.layer.refresh();
        setLoading(false);
        setLoadingKegiatan(null);
      } catch (error) {
        console.error("Error applying filter to subLayer:", error);
        setLoading(false);
        setLoadingKegiatan(null);
      }
    } else {
      console.error("SubLayer is not defined.");
    }
  };

  const resetKegiatan = async (subLayer) => {
    setListKegiatan([]);
    subLayer.definitionExpression = "";
    await subLayer.layer.refresh();
  }

  const searchKegiatan = () => {
    const input = document.getElementById("searchInput");
    if (input) {
      setSearchInput(input.value);
    }
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      padding: "5%"
    }}>
      <Box sx={{
        width: "100%",
        height: "10%"
      }}>
        <OutlinedInput
          id="searchInput"
          type="search"
          placeholder="Cari kegiatan ..."
          onChange={searchKegiatan}
          value={searchInput}
          sx={{
            fontFamily: 'var(--font-family)',
            fontSize: "0.9em",
            width: "100%",
            maxWidth: '900px',
            height: '39px',
            paddingLeft: '1%',
            borderRadius: '40px',
            background: 'white',
            border: "1px solid rgba(0, 69, 129, 0.30)",
            boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
          }}
        />
      </Box>
      <Box sx={{
        width: "100%",
        height: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Button variant="contained" startIcon={<Autorenew />} onClick={() => resetKegiatan(subLayer)}>
          Atur Ulang
        </Button>
      </Box>
      <Box sx={checkboxListStyle}>
        <FormGroup sx={{ padding: "5px" }}>
          {kegiatan && (searchInput === "" ?
            kegiatan.map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={listKegiatan.includes(item)}
                      icon={<BpIcon />}
                      checkedIcon={<BpCheckedIcon />}
                      onChange={() => filterKegiatan(subLayer, item)}
                    />
                  }
                  label={item}
                />
                {loading && loadingKegiatan === item && (
                  <CircularProgress size={20} sx={{ marginLeft: '10px' }} />
                )}
              </Box>
            )) :
            kegiatan?.filter((kegiatan) => kegiatan.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())).map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={listKegiatan.includes(item)}
                      icon={<BpIcon />}
                      checkedIcon={<BpCheckedIcon />}
                      onChange={() => filterKegiatan(subLayer, item)}
                    />
                  }
                  label={item}
                />
                {loading && loadingKegiatan === item && (
                  <CircularProgress size={20} sx={{ marginLeft: '10px' }} />
                )}
              </Box>
            ))
          )}
        </FormGroup>
      </Box>
    </Box>
  );
};

export default Kegiatan;
