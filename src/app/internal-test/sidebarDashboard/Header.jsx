import React from 'react';
import {
  useTheme,
  useMediaQuery,
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
} from '@mui/material';
import Link from 'next/link';
// components
import Profile from './Profile';
// import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';

const Header = ({ toggleMobileSidebar }) => {
  const theme = useTheme();
  // const isDesktop = useMediaQuery(theme.breakpoints.up("xl"));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "2px 4px 12px 0px rgba(0, 0, 0, 0.10)",
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('xl')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            // marginLeft: isDesktop ? "276px" : "",
            display: {
              // xl: 'none',
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <DehazeRoundedIcon width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
          >
            <Badge variant="dot" color="primary">
              {/* <EmailRoundedIcon fontSize="32" sx={{ color: "var(--jakartasatu-biru)" }} /> */}
              <EmailOutlinedIcon fontSize="32" sx={{ color: "var(--jakartasatu-biru)" }} />
            </Badge>
          </IconButton>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
