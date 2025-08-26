import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// import { PersonOutlineRoundedIcon, IconMail, IconUser } from "@tabler/icons-react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

const Profile = () => {
  const basePath = process.env.BASE_PATH;
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        {/* <PersonRoundedIcon fontSize="32" sx={{ color: "var(--jakartasatu-biru)" }} /> */}
        <PersonOutlineOutlinedIcon fontSize="32" sx={{ color: "var(--jakartasatu-biru)" }} />
        {/* <Avatar
          src=""
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        /> */}
      </IconButton>

      {/* Message Dropdown */}
      <Menu
        id="msgs-menu"
        // disableScrollLock
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: "20px",
            marginTop: "10px",
            minWidth: 170,
            color: 'rgb(55, 65, 81)',
            boxShadow: '2px 4px 12px 0px rgba(0, 0, 0, 0.10)',

            '& .MuiMenu-list': {
              padding: '10px',
            },
            '& .MuiMenuItem-root': {
              gap: "10px",
              color: "rgba(0, 0, 0, 0.70)",
              fontFamily: "inherit",
              fontSize: "16px",
              fontWeight: "500",

              '& .MuiSvgIcon-root': {
                fontSize: 20,
                marginRight: 1.5,
              },
            },
          }
        }}
      >
        <Box mt={1} py={1} px={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => signOut({ callbackUrl: `${basePath}` })}
            fullWidth
            sx={{
              fontFamily: 'var(--font-family)',
              fontSize: "18px",
              borderRadius: "30px",
              textTransform: "none",
              // width: "149px",
              height: "49px",
              color: "white",
              background: 'var(--jakartasatu-biru)',
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
