import { useMediaQuery, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Upgrade";
import { Sidebar, Logo } from 'react-mui-sidebar';

const MSidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const sidebarWidth = "270px";

  if (lgUp) {
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
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Sidebar
              width={'270px'}
              collapsewidth="80px"
              open={isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              <Logo img="" />
              <Box>
                <SidebarItems />
                <Upgrade />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box px={2}>
        <Sidebar
          width={'270px'}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={false}
        >
          <Logo img="" />
          <SidebarItems />
          <Upgrade />
        </Sidebar>
      </Box>
    </Drawer>
  );
};

export default MSidebar;
