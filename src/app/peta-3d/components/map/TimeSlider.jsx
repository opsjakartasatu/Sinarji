import * as React from "react";

import { Box, Slider, Typography } from "@mui/material";

export default function TimeSlider({
  onTimeChange,
  times = [],
  selectedTime,
  sliderSx = {},
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (times.length > 0) {
      const validIndex = Math.max(0, Math.min(selectedIndex, times.length - 1));

      setSelectedIndex(validIndex);
    }
  }, [times]);

  React.useEffect(() => {
    if (!selectedTime || times.length === 0) return;

    const idx = times.findIndex((t) => t === selectedTime);

    if (idx !== -1 && idx !== selectedIndex) {
      setSelectedIndex(idx);
    }
  }, [selectedTime, times]);

  React.useEffect(() => {
    if (
      times.length > 0 &&
      selectedIndex >= 0 &&
      selectedIndex < times.length
    ) {
      onTimeChange?.(times[selectedIndex]);
    } else {
      onTimeChange?.(null);
    }
  }, [selectedIndex, times]);

  const marks = times.map((time, index) => ({
    value: index,
    label: time,
  }));

  const handleChange = (_, newValue) => {
    const newIndex = Number(newValue);

    if (newIndex >= 0 && newIndex < times.length) {
      setSelectedIndex(newIndex);

      onTimeChange?.(times[newIndex]);
    }
  };

  console.log(times, "disini");
  const valuetext = (value) => times[value] || "";

  if (times.length === 0) {
    return (
      <Box
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.9)",
          px: { xs: 2, sm: 3 },
          py: { xs: 1.5, sm: 2 },
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        {/* <Typography variant="body2">Tidak ada data waktu genangan</Typography> */}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.85)",
        px: { xs: 1.5, sm: 4, md: 8 },
        py: { xs: 1, sm: 2 },
        mt: { xs: 1, sm: 2 },
        borderRadius: 3,
        boxShadow: 4,
        width: { xs: "85%", sm: "90%", md: "80%" },
        maxWidth: { xs: 300, sm: 500, md: 600 },
        ...sliderSx,
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{
          textAlign: "center",
          fontSize: { xs: "0.8rem", sm: "1rem", md: "1.1rem" },
          mb: { xs: 0.5, sm: 0.5 },
        }}
      >
        Waktu Prediksi Banjir (
        {new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
        )
      </Typography>

      <Slider
        aria-label="Waktu Prediksi Banjir"
        marks={marks}
        step={1}
        min={0}
        max={times.length - 1}
        value={selectedIndex}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        sx={{
          color: "primary.main",
          height: { xs: 2, sm: 4 },
          "& .MuiSlider-thumb": {
            width: { xs: 10, sm: 14 },
            height: { xs: 10, sm: 14 },
          },
          "& .MuiSlider-mark": {
            height: { xs: 3, sm: 6 },
            width: { xs: 2, sm: 4 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "red",
          },
          "& .MuiSlider-valueLabel": {
            fontSize: { xs: "0.6rem", sm: "0.75rem" },
            top: -6,
            backgroundColor: "primary.main",
          },
          "& .MuiSlider-markLabel": {
            fontSize: { xs: "0.6rem", sm: "0.8rem" },
          },
        }}
      />
    </Box>
  );
}
