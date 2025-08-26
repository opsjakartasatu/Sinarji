import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import Kegiatan from "./Kegiatan";
import Data from "./Data";
import Intensitas from "./Intensitas";

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value != index}
      id={`tabpanel-${index}`}
      style={{ width: "100%", height: "100%" }}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const allyProps = (index) => {
  return {
    id: `tabpanel-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const SidePanel = ({
  kegiatan,
  layerView,
  view,
  setView,
  geoJSON,
  setGeoJSON,
  drawStatus,
  klb,
  setKLB,
  kdb,
  setKDB,
  kdh,
  setKDH,
  subLayer
}) => {
  const [listKegiatan, setListKegiatan] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [groupList, setGroupList] = useState([]);

  const [ldb, setLDB] = useState();
  const [llb, setLLB] = useState();
  const [jlb, setJLB] = useState();
  const [lh, setLH] = useState();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        border: "2px solid rgba(0, 53, 119, 0.40)",
        borderRadius: "9px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "6%",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="fullWidth"
          textColor="inherit"
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "7px 7px 0px 0px",
          }}
          indicatorColor="#00ffffff"
        >
          <Tab
            label="Data"
            {...allyProps(0)}
            sx={{
              fontFamily: "var(--font-family)",
              backgroundColor:
                tabValue === 0 ? "white" : "var(--jakartasatu-biru)",
              fontWeight: tabValue === 0 ? 500 : 500,
              color: tabValue === 0 ? "var(--jakartasatu-biru)" : "white",
              borderRadius: "7px 0px 0px 0px",
              opacity: 1,
              textTransform: "none",
            }}
          />
          <Tab
            label="Intensitas"
            {...allyProps(1)}
            sx={{
              fontFamily: "var(--font-family)",
              backgroundColor:
                tabValue === 1 ? "white" : "var(--jakartasatu-biru)",
              fontWeight: tabValue === 1 ? 500 : 500,
              color: tabValue === 1 ? "var(--jakartasatu-biru)" : "white",
              opacity: 1,
              textTransform: "none",
            }}
          />
          <Tab
            label="Kegiatan"
            {...allyProps(2)}
            sx={{
              fontFamily: "var(--font-family)",
              height: "100%",
              backgroundColor:
                tabValue === 2 ? "white" : "var(--jakartasatu-biru)",
              fontWeight: "tabValue === 2 ? 500 : 500",
              color: tabValue === 2 ? "var(--jakartasatu-biru)" : "white",
              borderRadius: "0px 7px 0px 0px",
              opacity: 1,
              textTransform: "none",
            }}
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "94%",
        }}
      >
        <TabPanel value={tabValue} index={0}>
          <Data
            view={view}
            setView={setView}
            groupList={groupList}
            setGroupList={setGroupList}
            geoJSON={geoJSON}
            setGeoJSON={setGeoJSON}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Intensitas
            jlb={jlb}
            setJLB={setJLB}
            kdb={kdb}
            setKDB={setKDB}
            kdh={kdh}
            klb={klb}
            ldb={ldb}
            llb={llb}
            lh={lh}
            setKDH={setKDH}
            setKLB={setKLB}
            setLDB={setLDB}
            setLLB={setLLB}
            setLH={setLH}
            drawStatus={drawStatus}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Kegiatan
          view={view}
            kegiatan={kegiatan}
            layerView={layerView}
            listKegiatan={listKegiatan}
            setListKegiatan={setListKegiatan}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            subLayer={subLayer}
          />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default SidePanel;
