import {
  Box,
  Button,
  createSvgIcon,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Sentinel from "../ImageComponent/Sentinel";
import IndexSentinel from "../ImageComponent/IndexSentinel";
import Landsat from "../ImageComponent/Landsat";
import IndexLandsat from "../ImageComponent/IndexLandsat";
import BAEI from "../DataExplanations/BAEI";
import BUI from "../DataExplanations/BUI";
import DBI from "../DataExplanations/DBI";
import EVI from "../DataExplanations/EVI";
import LST from "../DataExplanations/LST";
import NDBI from "../DataExplanations/NDBI";
import NDVI from "../DataExplanations/NDVI";
import NDWI from "../DataExplanations/NDWI";
import SAVI from "../DataExplanations/SAVI";

import styles from "../../page.module.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react";
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';

const CustomIcon = createSvgIcon(
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15.8333 5H4.16667C3.24619 5 2.5 5.74619 2.5 6.66667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V6.66667C17.5 5.74619 16.7538 5 15.8333 5Z" stroke="white" strokeWidth="1.66667" />
    <path d="M5.83301 5.41699H14.167C14.9642 5.41699 15.5201 5.41726 15.9395 5.47363C16.3469 5.52845 16.5629 5.6293 16.7168 5.7832C16.8707 5.93711 16.9716 6.1531 17.0264 6.56055C17.0724 6.90281 17.0783 7.33599 17.0801 7.91699H2.91992C2.9217 7.33599 2.92763 6.90281 2.97363 6.56055C3.02845 6.1531 3.1293 5.93711 3.2832 5.7832C3.43711 5.6293 3.6531 5.52845 4.06055 5.47363C4.47995 5.41726 5.03584 5.41699 5.83301 5.41699Z" fill="white" stroke="white" strokeWidth="0.833333" />
    <path d="M5.83398 2.5V5M14.1673 2.5V5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" />
  </svg>
);

const CustomMenuItem = styled(MenuItem)(() => ({
  fontFamily: "var(--font-family)",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "150%",
  letterSpacing: "-0.304px",
}));

const CustomSelectStyle = {
  textAlign: "start",
  color: "rgba(0, 0, 0, 0.40)",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "150%",
  letterSpacing: "-0.304px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: 'none',
    borderRadius: "8px",
  },
  "& .MuiSelect-outlined": {
    border: "1.5px solid rgba(0, 53, 119, 0.50)",
    borderRadius: "8px",
    backgroundColor: "white",

    '&:hover': {
      borderRadius: "8px",
      border: "2px solid rgba(0, 53, 119, 0.50)",
    },
    '&.Mui-focused': {
      borderRadius: "8px",
      border: "2px solid rgba(0, 53, 119, 0.50)",
    }
  },
  // Tambahkan ini untuk mengubah warna saat ada value yang dipilih
  "& .MuiSelect-select": {
    fontFamily: "var(--font-family)",
    color: "black",
    fontSize: "16px",
    fontWeight: 500,
  }
}

const images = [
  {
    value: "COPERNICUS/S2_SR_HARMONIZED",
    label: "Sentinel-2",
    indicies: [
      {
        value: "NDVI",
        label: "Normalized Difference Vegetation Index",
      },
      {
        value: "NDBI",
        label: "Normalized Difference Built-up Index",
      },
      {
        value: "NDWI",
        label: "Normalized Difference Water Index",
      },
      {
        value: "EVI",
        label: "Enhanced Vegetation Index",
      },
      {
        value: "SAVI",
        label: "Soil-Adjusted Vegetation Index",
      },
      {
        value: "BAEI",
        label: "Built-up Area Extraction Index",
      },
      {
        value: "BUI",
        label: "Built-up Index",
      },
    ],
  },
  {
    value: "LANDSAT/LC08/C02/T1_L2",
    label: "Landsat-8",
    indicies: [
      {
        value: "NDVI",
        label: "Normalized Difference Vegetation Index",
      },
      {
        value: "NDBI",
        label: "Normalized Difference Built-up Index",
      },
      {
        value: "NDWI",
        label: "Normalized Difference Water Index",
      },
      {
        value: "EVI",
        label: "Enhanced Vegetation Index",
      },
      {
        value: "LST",
        label: "Land Surface Temperature",
      },
      {
        value: "SAVI",
        label: "Soil-Adjusted Vegetation Index",
      },
      {
        value: "BAEI",
        label: "Built-up Area Extraction Index",
      },
      {
        value: "BUI",
        label: "Built-up Index",
      },
      {
        value: "DBI",
        label: "Dry Built-up Index",
      },
    ],
  },
];

const DataSelection = ({
  data,
  setData,
  isCatalog,
  setIsCatalog,
  showDetailLandsat,
  setShowDetailLandsat,
  showDetailSentinel,
  setShowDetailSentinel,
  manualChange,
  setFetchStatus,
  setUrlImages,
  setCurrentTab
}) => {
  const toggleCatalog = () => {
    setIsCatalog(!isCatalog);
  };

  const handleChange = (type, value) => {
    setData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleSubmit = async (index_type, citra_satelit, start_date, end_date) => {
    manualChange(setCurrentTab(2));

    setFetchStatus("pending");

    const formdata = new FormData();
    formdata.append("index_type", index_type);
    formdata.append("citra_satelit", citra_satelit);
    formdata.append("start_date", start_date);
    formdata.append("end_date", end_date);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch("api/gee", requestOptions);

      const result = await response.json();

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      setUrlImages(result.tileUrl);

      setFetchStatus("success"); // Set Fetch Status to "success" to remove loader
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [focusState, setFocusState] = useState({
    start_date: false,
    end_date: false
  });

  const handleFocus = (field) => {
    setFocusState(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleBlur = (field) => {
    setFocusState(prev => ({
      ...prev,
      [field]: false
    }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container} style={{ marginTop: "180px", width: "90vw", maxWidth: "1220px" }}>
        <section id="inputValue" style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}
          >
            <Typography variant="p"
              style={{
                color: 'var(--jakartasatu-biru)',
                textAlign: "center",
                fontSize: "36px",
                fontWeight: "800",
              }}>
              Environmental Data Portal
            </Typography>
            <Divider
              style={{
                margin: '15px auto 50px auto',
                backgroundColor: 'var(--jakartasatu-biru)',
                height: 5,
                width: '75px',
                borderRadius: '4px',
              }}
            />
          </Box>
          <Stack direction="column" justifyContent="center" gap={2}>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" gap={2}>
              <Stack direction="column" justifyContent="center" gap={2}>
                <FormControl sx={{ width: "100%", minWidth: "300px", maxWidth: "400px" }}>
                  <Select
                    displayEmpty
                    value={data.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    sx={CustomSelectStyle}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <em style={{ color: '#999', fontStyle: 'normal' }}>Satellite Image</em>;
                      }
                      // Cari label berdasarkan value yang dipilih
                      const selectedImage = images.find(image => image.value === selected);
                      return selectedImage ? selectedImage.label : selected;
                    }}
                  >
                    <CustomMenuItem disabled value="">
                      <em>Satellite Image</em>
                    </CustomMenuItem>
                    {images.map((image, index) => (
                      <CustomMenuItem key={index} value={image.value}>
                        {image.label}
                      </CustomMenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "100%", minWidth: "300px", maxWidth: "400px" }}>
                  <Select
                    displayEmpty
                    disabled={data.image ? false : true}
                    value={data.data}
                    onChange={(e) => handleChange("data", e.target.value)}
                    sx={CustomSelectStyle}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <em style={{ color: '#999', fontStyle: 'normal' }}>Select Data</em>;
                      }
                      // Cari indices berdasarkan image yang dipilih
                      const selectedImage = images.find(image => image.value === data.image);
                      if (selectedImage) {
                        const selectedIndex = selectedImage.indicies.find(index => index.value === selected);
                        return selectedIndex ? selectedIndex.value : selected;
                      }
                      return selected;
                    }}
                  >
                    <CustomMenuItem disabled value="">
                      <em>Select Data</em>
                    </CustomMenuItem>
                    {data.image === "COPERNICUS/S2_SR_HARMONIZED"
                      ? images[0].indicies.map((item, index) => (
                        <CustomMenuItem key={index} value={item.value}>
                          {item.value}
                        </CustomMenuItem>
                      ))
                      : data.image === "LANDSAT/LC08/C02/T1_L2"
                        ? images[1].indicies.map((item, index) => (
                          <CustomMenuItem key={index} value={item.value}>
                            {item.value}
                          </CustomMenuItem>
                        ))
                        : null}
                  </Select>
                </FormControl>
              </Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" justifyContent="center" gap={2}>
                  <div>
                    <DatePicker
                      value={data.startDate ? dayjs(data.startDate) : null}
                      onChange={(newValue) => handleChange("startDate", newValue ? newValue.format('YYYY-MM-DD') : '')}
                      slots={{ openPickerIcon: CustomIcon }}
                      slotProps={{
                        field: {
                          openPickerButtonPosition: 'start',
                        },
                      }}
                      sx={{
                        "& .MuiPickersOutlinedInput-root": {
                          background: "var(--jakartasatu-biru)",
                          color: "white",
                          borderRadius: "8px",

                          // fontFamily: "var(--font-family)",
                          fontSize: "16px",
                          fontWeight: 600,
                          lineHeight: "150%",
                          letterSpacing: "-0.304px",
                        }
                      }}
                    />
                  </div>
                  <div>
                    <DatePicker
                      value={data.endDate ? dayjs(data.endDate) : null}
                      onChange={(newValue) => handleChange("endDate", newValue ? newValue.format('YYYY-MM-DD') : '')}
                      slots={{ openPickerIcon: CustomIcon }}
                      slotProps={{
                        field: { openPickerButtonPosition: 'start' },
                      }}
                      sx={{
                        "& .MuiPickersOutlinedInput-root": {
                          background: "var(--jakartasatu-biru)",
                          color: "white",
                          borderRadius: "8px",

                          // fontFamily: "var(--font-family)",
                          fontSize: "16px",
                          fontWeight: 600,
                          lineHeight: "150%",
                          letterSpacing: "-0.304px",
                        }
                      }}
                    />
                  </div>
                </Stack>
              </LocalizationProvider>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Button
                disableElevation
                variant="contained"
                onClick={() => toggleCatalog()}
                sx={{
                  textTransform: "none",
                  borderRadius: "30px",
                  height: "42px",
                  width: "100%",
                  maxWidth: "150px",
                  padding: "0 20px",
                }}>
                Show Catalog
              </Button>
              <Button
                disableElevation
                disabled={
                  !data.image || !data.data || !data.startDate || !data.endDate
                }
                variant="contained"
                onClick={() =>
                  handleSubmit(data.data, data.image, data.startDate, data.endDate)
                }
                sx={{
                  textTransform: "none",
                  borderRadius: "30px",
                  height: "42px",
                  width: "100%",
                  maxWidth: "150px",
                  padding: "0 20px",
                }}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </section>
        <section id="catalogDetail" style={{ marginTop: "50px" }}>
          <Box
            sx={{
              display: data.data ? "flex" : "none",
              flexDirection: "column",
              rowGap: "10px",
              alignItems: "center",
              width: "100%",

              color: "rgba(0, 0, 0, 0.70)",
              textAlign: "justify",
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "190%"
            }}
          >
            <BAEI data={data.data} />
            <BUI data={data.data} />
            <DBI data={data.data} />
            <EVI data={data.data} />
            <LST data={data.data} />
            <NDBI data={data.data} />
            <NDVI data={data.data} />
            <NDWI data={data.data} />
            <SAVI data={data.data} />
          </Box>
          <Box
            sx={{
              display: isCatalog ? "flex" : "none",
              flexDirection: "column",
              rowGap: "10px",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TableContainer component={Paper} sx={{ borderRadius: "25px", marginBottom: "50px", boxShadow: "none", fontFamily: "inherit" }}>
              <Table sx={{ minWidth: 700, minHeight: 700 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "var(--jakartasatu-biru)" }}>
                    <TableCell
                      sx={{
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "600",
                        lineHeight: "150%",
                        letterSpacing: "-0.38px",
                        fontFamily: "inherit"
                      }}
                    >
                      Satellite
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "50%",
                        color: "white",
                        fontSize: "14pt",
                        border: "1px white solid",
                        fontWeight: "600",
                        fontFamily: "inherit"
                      }}
                    >
                      Index
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Sentinel
                        showDetailSentinel={showDetailSentinel}
                        setShowDetailSentinel={setShowDetailSentinel}
                      />
                    </TableCell>
                    <TableCell>
                      <IndexSentinel />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Landsat
                        showDetailLandsat={showDetailLandsat}
                        setShowDetailLandsat={setShowDetailLandsat}
                      />
                    </TableCell>
                    <TableCell>
                      <IndexLandsat />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </section>
      </div>
    </main>
  );
};

export default DataSelection;
