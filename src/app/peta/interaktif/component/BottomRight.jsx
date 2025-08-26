import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Zoom from "@/components/peta/interaktif/Zoom";
import Locate from "@/components/peta/interaktif/Locate";
import Home from "@/components/peta/interaktif/Home";
import Basemap from "@/components/peta/interaktif/Basemap";
import NearMe from "@/components/peta/interaktif/NearMe";
import Legenda from "@/components/peta/interaktif/Legenda";
import MeasurementArea from "@/components/peta/interaktif/MeasurementArea";
import MeasurementLine from "@/components/peta/interaktif/MeasurementLine";
import Draw from "@arcgis/core/views/draw/Draw.js";

const BottomRight = ({ view, center, zoom }) => {
  const [draw, setDraw] = useState();
  const [drawStatus, setDrawStatus] = useState(false);
  const [drawingType, setDrawingType] = useState("");

  useEffect(() => {
    if(view) {
      const draw = new Draw({
        view: view
      });
      setDraw(draw);
    }
  }, [view]);

  return (
    <Box sx={{ display: "flex", rowGap: 2, flexDirection: "column", alignItems: "flex-end" }}>
      <Basemap view={view}/>
      <Legenda view={view} />
      <Home view={view} center={center} zoom={zoom}/>
      <NearMe view={view} />
      <MeasurementArea view={view} draw={draw} drawStatus={drawStatus} setDrawStatus={setDrawStatus} drawingType={drawingType} setDrawingType={setDrawingType}/>
      <MeasurementLine view={view} draw={draw} drawStatus={drawStatus} setDrawStatus={setDrawStatus} drawingType={drawingType} setDrawingType={setDrawingType}/>
      <Locate view={view} />
      <Zoom view={view} buttonSize="48px"/>
    </Box>
  );
};

export default BottomRight;
