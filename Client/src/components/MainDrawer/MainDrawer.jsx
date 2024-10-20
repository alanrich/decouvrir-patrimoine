import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useTheme } from "@mui/material/styles";

const MainDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerItems = [
    {
      icon: <DashboardIcon />,
      label: "Coming Soon....Dashboard",
    },
    { icon: <AccountCircleIcon />, label: "Coming Soon....Profile" },
    { icon: <SettingsIcon />, label: "Coming Soon....Settings" },
  ];

  const drawerContent = (
    <List>
      {drawerItems.map((item, index) => (
        <ListItem
          button
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Tooltip title={item.label} placement="top-end">
            <ListItemIcon
              sx={{
                minWidth: "0",
                display: "flex",
                justifyContent: "center",
                color: theme.palette.common.white,
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
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 60,
                backgroundColor: theme.palette.grey[500],
              },
            }}
          >
            <Toolbar />
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 60,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 60,
              boxSizing: "border-box",
              backgroundColor: theme.palette.grey[500],
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
