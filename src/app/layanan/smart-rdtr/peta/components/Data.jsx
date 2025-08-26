import { ExpandLess, MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  ListItemButton,
  ListItemText,
  Slider,
  styled,
} from "@mui/material";
import { useEffect } from "react";
import Shapefile from "./Shapefile";

const listStyle = {
  margin: "60px 0",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "93%",
  textAlign: "left",
  overflowY: "scroll",
  borderRadius: "5px",
  "::-webkit-scrollbar": {
    width: "10px",
    borderRadius: "5px",
  },
  "::-webkit-scrollbar-track": {
    border: "1px solid #DFE6E9",
    borderRadius: "5px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "var(--jakartasatu-biru)",
    borderRadius: "5px",
  },
};

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 5,
  marginRight: "10px",
  width: 23,
  height: 23,
  outline: "1px solid #003577",
}));

const BpCheckedIcon = styled(BpIcon)({
  borderRadius: 5,
  width: 23,
  height: 23,
  outline: "2px solid #003577",
  background: "var(--jakartasatu-biru)",
  backgroundImage:
    "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
    " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
    "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
});

const Data = ({ view, groupList, setGroupList, geoJSON, setGeoJSON }) => {
  useEffect(() => {
    if (view?.map?.layers?.items?.filter((layer) => layer.type !== "graphics").length > 0) {
      const groupsLayer = view.map.layers.items.filter((group) => group.type !== "graphics").reverse();
      setGroupList((prevState) => {
        return groupsLayer.map((group, index) => {
          const prevGroup = prevState.find(
            (prev) => prev.group.id === group.id
          );
          const newexpand = prevGroup ? prevGroup.expand : false;
          const newGroup = prevGroup ? prevGroup.group : group;
          return {
            ...prevGroup,
            group: newGroup,
            expand: newexpand,
          };
        });
      });
    }
  }, [view?.map?.layers?.items?.length, geoJSON]);

  const toggleGroupVisible = (list) => {
    return () => {
      list.group.visible = !list.group.visible;
      setGroupList((prevState) => {
        const updatedState = [...prevState];
        return updatedState;
      });
    };
  };

  const toggleGroupExpand = (index) => {
    return () => {
      setGroupList((prevState) => {
        const updatedState = [...prevState];
        updatedState[index].expand = !updatedState[index].expand;
        return updatedState;
      });
    };
  };

  const toggleLayerVisible = (layer) => {
    return () => {
      layer.visible = !layer.visible;
      setGroupList((prevState) => {
        const updatedState = [...prevState];
        return updatedState;
      });
    };
  };

  const sliderHandle = (layer, value) => {
    layer.opacity = value;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "5%",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Shapefile geoJSON={geoJSON} setGeoJSON={setGeoJSON} view={view} />
      </Box>
      <Box sx={listStyle}>
        {view &&
          view.map.layers.items.filter((layer) => layer.type !== "graphics").reverse().map((group, index) => (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              key={index}
            >
              <Box
                sx={{
                  width: "20%",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                key={`${index} satu`}
              >
                <Checkbox
                  checked={group.visible}
                  onChange={toggleGroupVisible(groupList[index])}
                  icon={<BpIcon />}
                  checkedIcon={<BpCheckedIcon />}
                  key={`${index} satu checkbox`}
                />
              </Box>
              <Box
                sx={{
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                }}
                key={`${index} dua`}
              >
                <ListItemButton
                  onClick={toggleGroupExpand(index)}
                  sx={{ width: "100%", height: "50px", padding: 1 }}
                  key={`${index} dua ListItemButton`}
                >
                  <ListItemText
                    primary={group.title}
                    key={`${index} dua ListItemText`}
                  />
                  {groupList[index]?.expand ? <ExpandLess /> : <MoreHoriz />}
                </ListItemButton>
                <Collapse
                  in={groupList[index]?.expand}
                  key={`${index} dua Collapse`}
                >
                  <FormGroup key={`${index} dua FormGroup`}>
                    {group.layers.items.map((layer, i) => (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                groupList[index]?.group?.layers?.items[i]
                                  ?.visible ?? false
                              }
                              icon={<BpIcon />}
                              checkedIcon={<BpCheckedIcon />}
                              key={`${index} dua Checkbox ${i}`}
                            />
                          }
                          onChange={toggleLayerVisible(layer)}
                          label={layer.title}
                          key={`${index} dua FormControlLabel ${i}`}
                        />
                        <Slider
                          valueLabelDisplay="auto"
                          value={layer.opaicty}
                          defaultValue={0.5}
                          min={0}
                          max={1}
                          step={0.1}
                          onChange={(event, value) => sliderHandle(layer, value)}
                          sx={{ left: "20%", width: "60%" }}
                        /></>
                    ))}
                  </FormGroup>
                </Collapse>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Data;
