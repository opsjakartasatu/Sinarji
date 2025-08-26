import { Close, SquareFoot } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Polygon from '@arcgis/core/geometry/Polygon';
import Graphic from '@arcgis/core/Graphic';
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js";
import Color from "@arcgis/core/Color.js";

const MeasurementArea = ({ view, draw, drawStatus, setDrawStatus, drawingType, setDrawingType, buttonSize, tooltip }) => {
  const [graphics, setGraphics] = useState();

  const handleDraw = () => {
    if(view && !drawStatus && draw) {
      setDrawStatus(true);
      setDrawingType("polygon")
      const action = draw.create("polygon");
      view.focus();
      action.on(["vertex-add", "vertex-remove", "draw-complete", "cursor-update"], (event) => {
        view.graphics.removeAll();
        const vertices = event.vertices;

        const polygon = new Polygon({
          rings: [vertices],
          hasM: false,
          hasZ: false,
          spatialReference: view.spatialReference
        });
        const area = geometryEngine.planarArea(polygon, "square-meters");
        let fixedArea
        if(area < 0) {
            fixedArea = area * -1
        } else {
            fixedArea = area
        }

        const simpleFillSymbol = new SimpleFillSymbol({
          color: new Color([123,234,201,0.7]),
          outline: new SimpleLineSymbol({
            cap: "round",
            color: new Color([103,182,228,1]),
            join: "round",
            miterLimit: 1,
            style: "long-dash",
            width: 2
          }),
          style: "solid"
        });

        const graphic = new Graphic({
          geometry: polygon,
          symbol: simpleFillSymbol
        });

        const label = new Graphic({
          visible: true,
          geometry: polygon,
          symbol: {
            type: "text",
            color: "white",
            haloColor: "black",
            haloSize: "1px",
            text: `${fixedArea.toFixed(0)}m2`,
            font: {
              size: 12,
              family: "Josefin Slab",
              weight: "bold"
            }
          }
        });
        view.graphics.addMany([graphic, label]);
        setGraphics([graphic, label]);
      })
    }
  };

  const handleClear = () => {
    view.graphics.removeMany(graphics);
    setDrawStatus(false);
    setDrawingType("");
  };

  return (
    <Box sx={{display: "flex", borderRadius: 2, backgroundColor: "white", rowGap: 2, maxWidth: "48px",}}>
        <Tooltip title="Ukur Area" placement={tooltip}>
            {drawStatus && drawingType === "polygon" ? (
              <IconButton sx={{height: buttonSize, width: buttonSize, padding: 0}} onClick={handleClear} disabled={drawingType === "polyline"}>
                <Close />
              </IconButton>
            ) : (
              <IconButton sx={{height: buttonSize, width: buttonSize, padding: 0}} onClick={handleDraw} disabled={drawingType === "polyline"}>
                <SquareFoot />
              </IconButton>
            )}
        </Tooltip>
    </Box>
  )
}

export default MeasurementArea