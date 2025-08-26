import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Kordinat = ({ view }) => {
  const [kordinat, setKordinat] = useState({
    latitude: 6.176923,
    longitude: 106.826959,
  });
  const [latitude, setLatitude] = useState("S");
  const [longitude, setLongitude] = useState("E");

  useEffect(() => {
    if (view) {
      view.on("pointer-move", (event) => {
        let screenPoint = {
          x: event.x,
          y: event.y,
        };
        let mapPoint = view.toMap(screenPoint);
        let latitude = mapPoint.latitude.toFixed(6);
        let longitude = mapPoint.longitude.toFixed(6);

        if (latitude < 0) {
          setLatitude("S");
          latitude = latitude * -1;
        } else {
          setLatitude("N");
        }

        if (longitude < 0) {
          setLongitude("W");
          longitude = longitude * -1;
        } else {
          setLongitude("E");
        }

        setKordinat({
          latitude: latitude,
          longitude: longitude,
        });
      });
    }
  }, [view]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 2, columnGap: 1, flexWrap: "nowrap", textWrap: "nowrap", backgroundColor: "white", borderRadius: "7px"}}>
      {kordinat && (
        <>
          <Typography variant="caption" fontSize={"0.7rem"}>Lat :</Typography>
          <Typography variant="caption" fontSize={"0.7rem"}>{`${kordinat.latitude}°${latitude}`}</Typography>
          <Typography variant="caption" fontSize={"0.7rem"}>Long :</Typography>
          <Typography variant="caption" fontSize={"0.7rem"}>{`${kordinat.longitude}°${longitude}`}</Typography>
        </>
      )}
    </Box>
  );
};

export default Kordinat;
