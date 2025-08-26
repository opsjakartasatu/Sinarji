import React from "react";

import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";

const NavItem = ({ item, level, pathDirect, onClick }) => {

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "2px",
      padding: "8px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: "white",
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: "grey",
        color: "black",
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "black",
        "&:hover": {
          backgroundColor: "black",
          color: "white",
        },
      },
    },
  }));

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color: "inherit",
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText>
            {item.title}
          </ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
