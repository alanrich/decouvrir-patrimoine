import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Drawer, List, ListItem, IconButton, ListItemIcon, Toolbar, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from '@mui/material/styles';

const MainDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerItems = [
    { icon: <DashboardIcon />, label: 'Dashboard' },
    { icon: <AccountCircleIcon />, label: 'Profile' },
    { icon: <SettingsIcon />, label: 'Settings' },
  ];

  const drawerContent = (
    <List>
        {drawerItems.map((item, index) => (
          <ListItem button key={index}>
            <Tooltip title={item.label} placement='top-end'>
            <ListItemIcon
              sx={{
                minWidth: '0', // Remove the default padding since we have such a narrow drawer
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {item.icon} 
            </ListItemIcon>
            </Tooltip>
          </ListItem>
        ))}
    </List>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,  // Better mobile performance on mobile ==> KEEP
            }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 60 },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 60,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 60,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default MainDrawer;

