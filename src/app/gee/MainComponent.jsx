"use client";

import { Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Overview from "./TabPanel/Overview";
import DataSelection from "./TabPanel/DataSelection";
import Result from "./TabPanel/Result";
import Navbar from "@/components/navbar/navbarGee";
import { useSession } from "next-auth/react";

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <AnimatePresence>
      {value === index && (
        <motion.div
          role="tabpanel"
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function allyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const MainComponent = () => {
  const [value, setValue] = useState(0);
  const [isCatalog, setIsCatalog] = useState(false);
  const [showDetailSentinel, setShowDetailSentinel] = useState(false);
  const [showDetailLandsat, setShowDetailLandsat] = useState(false);
  const [fetchStatus, setFetchStatus] = useState("");
  const [urlImages, setUrlImages] = useState();

  const { data: session, status } = useSession();
  const [currentTab, setCurrentTab] = useState(0);
  const [data, setData] = useState({
    data: "",
    image: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const manualChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    document.title =
      "Environmental Data Portal | Jakarta Satu (Satu Peta, Satu Data, Satu Kebijakan)";
  }, []);

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Navbar
        session={session}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <Tabs
        value={currentTab}
        onChange={handleChange}
        indicatorColor="none"
        sx={{
          "&.MuiTabs-root": {
            minHeight: 0,
          },
        }}
      ></Tabs>
      <TabPanel value={currentTab} index={0}>
        <Overview />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <DataSelection
          data={data}
          setData={setData}
          isCatalog={isCatalog}
          setIsCatalog={setIsCatalog}
          showDetailLandsat={showDetailLandsat}
          setShowDetailLandsat={setShowDetailLandsat}
          showDetailSentinel={showDetailSentinel}
          setShowDetailSentinel={setShowDetailSentinel}
          manualChange={manualChange}
          setFetchStatus={setFetchStatus}
          setUrlImages={setUrlImages}
          setCurrentTab={setCurrentTab}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <Result fetchStatus={fetchStatus} urlImages={urlImages} />
      </TabPanel>
    </>
  );
};

export default MainComponent;
