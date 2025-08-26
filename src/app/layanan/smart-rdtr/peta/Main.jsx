import { Box, Button, Grid, IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import SidePanel from "./components/SidePanel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Draw from "@arcgis/core/views/draw/Draw.js";
import Graphic from "@arcgis/core/Graphic";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
  webpack: false,
});

const Main = () => {
  const [view, setView] = useState();
  const [rdtrlayers, setRdtrLayers] = useState();
  const [drawStatus, setDrawStatus] = useState(false);
  const [draw, setDraw] = useState();
  const [geoJSON, setGeoJSON] = useState();
  const [kegiatan, setKegiatan] = useState();
  const [layers, setLayers] = useState();
  const [klb, setKLB] = useState(0);
  const [kdb, setKDB] = useState(0);
  const [kdh, setKDH] = useState(0);
  const [subLayer, setSublayer] = useState();

  useEffect(() => {
    async function main() {
      const responseKegiatan = await fetch(
        "/geoportal/api/smartrdtr/kegiatan"
      );
      const kegiatan = await responseKegiatan.json();
      setKegiatan(kegiatan.data);
      const responseLayers = await fetch("/geoportal/api/smartrdtr/layers");
      const layers = await responseLayers.json();
      setLayers(layers.data);
    }
    main();
  }, []);

  useEffect(() => {
    if (view) {
      const drawInstance = new Draw({
        view: view,
      });
      setDraw(drawInstance);
    }
  }, [view]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid xs={12} sm={3.2} md={3.2} lg={3.2} xl={3.2}>
          <Box sx={{ height: "723px" }}>
            <SidePanel
              kegiatan={kegiatan}
              view={view}
              setView={setView}
              geoJSON={geoJSON}
              setGeoJSON={setGeoJSON}
              drawStatus={drawStatus}
              kdb={kdb}
              kdh={kdh}
              klb={klb}
              setKDB={setKDB}
              setKDH={setKDH}
              setKLB={setKLB}
              subLayer={subLayer}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={8.5} md={8.5} lg={8.5} xl={8.5}>
          <Box sx={{ height: "723px", position: "relative" }}>
            <Map
              view={view}
              setView={setView}
              layers={layers}
              rdtrlayers={rdtrlayers}
              setRdtrLayers={setRdtrLayers}
              setKDB={setKDB}
              setKDH={setKDH}
              setKLB={setKLB}
              setSubLayer={setSublayer}
              draw={draw}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;