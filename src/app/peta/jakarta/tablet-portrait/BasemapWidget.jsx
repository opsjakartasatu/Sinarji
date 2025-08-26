import { Close, Collections } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import CustomImage from "@/components/CustomImage";

const BasemapWidget = ({ view, buttonSize, imageSize, basemapDKI }) => {
  const [basemapOpen, setBasemapOpen] = useState(false);
  const toggleBasemap = () => {
    setBasemapOpen(!basemapOpen);
  };

  // const handleBasemapDKI = () => {
  //   view.map.basemap = basemapDKI;
  // };
  const handleBasemapStreets = () => {
    view.map.basemap = "streets";
  };
  const handleBasemapOSM = () => {
    view.map.basemap = "osm";
  };
  const handleBasemapSatellite = () => {
    view.map.basemap = "satellite";
  };
  const handleBasemapHybrid = () => {
    view.map.basemap = "hybrid";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        rowGap: "5px",
        height: buttonSize,
      }}
    >
      <Box
        sx={{
          maxWidth: buttonSize,
          backgroundColor: "white",
          borderRadius: "7px",
        }}
      >
        <Tooltip title={!basemapOpen && "Basemap"} placement="left">
          {basemapOpen ? (
            <IconButton
              onClick={toggleBasemap}
              sx={{ height: buttonSize, width: buttonSize, padding: 0 }}
            >
              <Close />
            </IconButton>
          ) : (
            <IconButton
              onClick={toggleBasemap}
              sx={{ height: buttonSize, width: buttonSize, padding: 0 }}
            >
              <Collections />
            </IconButton>
          )}
        </Tooltip>
      </Box>
      {basemapOpen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 2,
            columnGap: "2px",
          }}
        >
          {/* <Tooltip title="Basemap DKI" placement="left">
            <IconButton
              onClick={handleBasemapDKI}
              sx={{ height: buttonSize, width: buttonSize }}
            >
              <Image
                src={
                  "https://jakartasatu.jakarta.go.id/portal/sharing/rest/content/items/afe064255a184168ae05628587819480/data"
                }
                width={imageSize}
                height={imageSize}
                alt="Gambar"
              />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Streets" placement="left">
            <IconButton
              onClick={handleBasemapStreets}
              sx={{ height: buttonSize, width: buttonSize }}
            >
              <CustomImage
                src="/assets/Streets-Clip.jpg"
                alt="Gambar"
                draggable={false}
                width={imageSize}
                height={imageSize}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="OSM" placement="left">
            <IconButton
              onClick={handleBasemapOSM}
              sx={{ height: buttonSize, width: buttonSize }}
            >
              <CustomImage
                src="/assets/OSM-Clip.jpg"
                alt="Gambar"
                draggable={false}
                width={imageSize}
                height={imageSize}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Satellite" placement="left">
            <IconButton
              onClick={handleBasemapSatellite}
              sx={{ height: buttonSize, width: buttonSize }}
            >
              <CustomImage
                src="/assets/Satellite-Clip.jpg"
                alt="Gambar"
                draggable={false}
                width={imageSize}
                height={imageSize}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Hybrid" placement="left">
            <IconButton
              onClick={handleBasemapHybrid}
              sx={{ height: buttonSize, width: buttonSize }}
            >
              <CustomImage
                src="/assets/Hybrid-Clip.jpg"
                alt="Gambar"
                draggable={false}
                width={imageSize}
                height={imageSize}
              />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default BasemapWidget;
