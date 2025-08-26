import LayerInfo from "@/components/peta/interaktif/LayerInfo";
import MejaKerja from "@/components/peta/interaktif/MejaKerja";
import { Menu, MenuOpen } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TopLeft = ({ view, setTableOpen, layerTable, setLayerTable, tableRef, catalogOpen, setCatalogOpen, handleCatalogOpen, addedLayers, setAddedLayers, isMobile, infoLayerOpen, setInfoLayerOpen, layerInfo, setLayerInfo, mejaKerjaVisible, handleCloseMejaKerja, handleOpenMejaKerja, setHandleSetQueryTour, tourState }) => {
  
  const router = useRouter();

  return (
    <Box sx={{display: "flex", flexDirection: "column", rowGap: "3%", height: "100%", width: "100%"}}>
      <Box sx={{display: "flex", flexDirection: "row", width: "100%", height: "48px", justifyContent: "space-between"}}>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "48px", width: "48px", backgroundColor: "white", borderRadius: 2}}>
          {mejaKerjaVisible ? (
            <IconButton onClick={handleCloseMejaKerja} className="meja-kerja">
              <MenuOpen />
            </IconButton>
          ) : (
            <Tooltip title="Meja Kerja" placement="bottom">
            <IconButton onClick={handleOpenMejaKerja} className="meja-kerja">
              <Menu />
            </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "48px", width: "80%", backgroundColor: "white", borderRadius: 2}}>
          <Button sx={{width: "100%", height: "100%"}} onClick={() => router.back()}>
            JAKARTA SATU
          </Button>
        </Box>
      </Box>
      <Box sx={{display: mejaKerjaVisible ? "flex" : "none", width: "100%", height: "90%"}}>
        <MejaKerja view={view} addedLayers={addedLayers} setAddedLayers={setAddedLayers} setInfoLayerOpen={setInfoLayerOpen} setLayerInfo={setLayerInfo} setTableOpen={setTableOpen} layerTable={layerTable} setLayerTable={setLayerTable} tableRef={tableRef} open={open} catalogOpen={catalogOpen} setCatalogOpen={setCatalogOpen} handleCatalogOpen={handleCatalogOpen} isMobile={isMobile} setHandleSetQueryTour={setHandleSetQueryTour} tourState={tourState}/>
      </Box>
      {infoLayerOpen && <LayerInfo infoLayerOpen={infoLayerOpen} setInfoLayerOpen={setInfoLayerOpen} layerInfo={layerInfo} />}
    </Box>
  );
};

export default TopLeft;
