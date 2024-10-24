import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const ProfileMenu = ({
  anchorElProfile,
  openProfile,
  handleProfileMenuOpen,
  handleProfileMenuClose,
  handleLogin,
  handleLogout,
}) => {
  return (
    <>
      <IconButton color="inherit" onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchorElProfile}
        open={openProfile}
        onClose={handleProfileMenuClose}
        sx={{ mt: 2 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleLogin}>Login</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
