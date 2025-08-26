import { useTheme, useMediaQuery, Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Upgrade";

import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import MenuItems from "@/components/sidebarDashboard/MenuItems";
import CustomImage from "@/components/CustomImage";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const MSidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const sidebarWidth = "270px";

  if (isDesktop) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxShadow: "2px 4px 12px 0px rgba(0, 0, 0, 0.10)",
              borderRight: "none",
            },
          }}
        >
          <Link href="/" style={{ margin: "0 auto" }}>
            <CustomImage
              src="/assets/logo-jakartasatu-orange.png"
              alt="Gambar"
              draggable={false}
              width={0}
              height={0}
              style={{
                userDrag: "none",
                userSelect: "none",

                margin: "5px 0",
                width: 'auto',
                maxWidth: "176px",
                height: 'auto',
                alignSelf: "center"
              }}
            />
          </Link>
          <Box
            sx={{
              height: "100%",
              overflow: "auto",
              marginRight: "10px",

              '::-webkit-scrollbar': {
                width: '6px',
              },
              '::-webkit-scrollbar-track': {
                borderRadius: '12px',
                border: "1px solid #DFE6E9",
                // margin: "20px"
              },
              '::-webkit-scrollbar-thumb': {
                background: '#003577',
                borderRadius: '12px',
              },
              '::-webkit-scrollbar-thumb:hover': {
                background: '#002b5e',
              },
            }}
          >
            <Box sx={{
              padding: "24px 10px 0 19px",
              margin: "-37px 0 -90px 0"
            }}>
              <SidebarItems />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      // disableScrollLock
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          // width: sidebarWidth,
          boxShadow: "2px 4px 12px 0px rgba(0, 0, 0, 0.10)",
          borderRight: "none",
        },
      }}
    >
      <Link href="/" style={{ margin: "0 auto" }}>
        <CustomImage
          src="/assets/logo-jakartasatu-orange.png"
          alt="Gambar"
          draggable={false}
          width={0}
          height={0}
          style={{
            userDrag: "none",
            userSelect: "none",

            margin: "5px 0",
            width: 'auto',
            maxWidth: "176px",
            height: 'auto',
            alignSelf: "center"
          }}
        />
      </Link>
      <Box
        sx={{
          height: "100%",
          overflow: "auto",
          marginRight: "10px",

          '::-webkit-scrollbar': {
            width: '6px',
          },
          '::-webkit-scrollbar-track': {
            borderRadius: '12px',
            border: "1px solid #DFE6E9",
            // margin: "20px"
          },
          '::-webkit-scrollbar-thumb': {
            background: '#003577',
            borderRadius: '12px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#002b5e',
          },
        }}
      >
        <Box sx={{
          width: sidebarWidth,
          padding: "24px 10px 0 19px",
          margin: "-37px 0 -90px 0"
        }}>
          <SidebarItems />
        </Box>
      </Box>
    </Drawer>
  );
};

export default MSidebar;
