import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  InputBase,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTheme } from "@mui/material/styles";

const MainAppBar = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  selectedDataSet,
  setSelectedDataSet,
}) => {
  const theme = useTheme();
  // Sorting Menu State
  const [anchorElSort, setAnchorElSort] = useState(null);
  const openSort = Boolean(anchorElSort);

  // Search Bar State
  const [searchActive, setSearchActive] = useState(false);

  // Cultural Selection Menu State
  const [anchorElCultural, setAnchorElCultural] = useState(null);
  const openCultural = Boolean(anchorElCultural);

  // Profile Menu State
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const openProfile = Boolean(anchorElProfile);

  // Local state for sorting selections
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  const [localSortOrder, setLocalSortOrder] = useState(sortOrder);

  const sortOptions =
    selectedDataSet === "festivals"
      ? [
          { value: "name", label: "Nom" },
          { value: "city", label: "Ville" },
          { value: "genre", label: "Genre" },
        ]
      : [
          { value: "name", label: "Nom" },
          { value: "city", label: "Ville" },
          { value: "genre", label: "Genre" },
        ];

  // Handlers for sorting menu
  const handleSortMenuOpen = (event) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleSortMenuClose = () => {
    setAnchorElSort(null);
  };

  const handleApplySort = () => {
    setSortBy(localSortBy);
    setSortOrder(localSortOrder);
    handleSortMenuClose();
  };

  // Handlers for search bar
  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const handleSearchClose = () => {
    setSearchTerm("");
    setSearchActive(false);
  };

  // Handlers for cultural selection menu
  const handleCulturalMenuOpen = (event) => {
    setAnchorElCultural(event.currentTarget);
  };
  const handleCulturalMenuClose = () => {
    setAnchorElCultural(null);
  };
  const handleCulturalSelection = (dataSet) => {
    setSelectedDataSet(dataSet);
    handleCulturalMenuClose();
  };

  // Profile Menu Handlers
  const handleProfileMenuOpen = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  const handleLogin = () => {
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    handleProfileMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "4rem" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          minHeight: "64px",
        }}
      >
        {/* Left: App name */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: theme.spacing(1) }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: "bold",
              color: theme.palette.grey[300],
            }}
          >
            Anabasis
          </Typography>
        </Box>

        {/* Right: Search, Sort, Cultural selection, and Profile */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(2),
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          {/* Search */}
          {!searchActive ? (
            <IconButton
              onClick={handleSearchClick}
              sx={{
                padding: "6px",
                height: "40px",
                width: "40px",
                color: "inherit",
              }}
            >
              <SearchIcon />
            </IconButton>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.palette.grey[200],
                borderRadius: "24px",
                padding: "0 8px",
                height: "40px",
                maxWidth: "300px",
              }}
            >
              <InputBase
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                sx={{ flex: 1, marginLeft: "8px", height: "100%" }}
              />
              <IconButton onClick={handleSearchClose} sx={{ padding: "6px" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}

          {/* Sort */}
          <Button
            variant="outlined"
            onClick={handleSortMenuOpen}
            startIcon={<SortIcon />}
            sx={{
              backgroundColor: theme.palette.background.paper,
              textTransform: "none",
              fontSize: theme.typography.body1.fontSize,
              minWidth: "80px",
              height: "40px",
              borderRadius: theme.shape.borderRadiusMedium,
            }}
          >
            Sort
          </Button>
          <Menu
            anchorEl={anchorElSort}
            open={openSort}
            onClose={handleSortMenuClose}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={option.value}
                selected={option.value === localSortBy}
                onClick={() => setLocalSortBy(option.value)}
                sx={{ fontSize: theme.typography.body2.fontSize }}
              >
                {option.label}
              </MenuItem>
            ))}
            <Divider />
            <Box sx={{ padding: "0.5rem 1.5rem" }}>
              <Typography
                variant="body2"
                sx={{ marginBottom: "0.5rem", fontSize: "0.8125rem" }}
              >
                Sort Order
              </Typography>
              <ToggleButtonGroup
                value={localSortOrder}
                exclusive
                onChange={(event, newOrder) => {
                  if (newOrder !== null) {
                    setLocalSortOrder(newOrder);
                  }
                }}
                size="small"
                sx={{
                  "& .MuiToggleButton-root": {
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                  },
                }}
              >
                <ToggleButton value="asc">
                  <ArrowUpwardIcon
                    fontSize="small"
                    sx={{ marginRight: "4px" }}
                  />
                  Asc
                </ToggleButton>
                <ToggleButton value="desc">
                  <ArrowDownwardIcon
                    fontSize="small"
                    sx={{ marginRight: "4px" }}
                  />
                  Desc
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Divider />
            <MenuItem
              onClick={handleApplySort}
              sx={{
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              Apply
            </MenuItem>
          </Menu>

          {/* Cultural selection */}
          <Button
            variant="outlined"
            onClick={handleCulturalMenuOpen}
            sx={{
              backgroundColor: theme.palette.background.paper,
              textTransform: "none",
              fontSize: theme.typography.body1.fontSize,
              minWidth: "200px",
              height: "40px",
              borderRadius: theme.shape.borderRadiusMedium,
            }}
          >
            Sélectionner un Lieu Culturel
          </Button>
          <Menu
            anchorEl={anchorElCultural}
            open={openCultural}
            onClose={handleCulturalMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => handleCulturalSelection("festivals")}>
              Festivals
            </MenuItem>
            <MenuItem onClick={() => handleCulturalSelection("museums")}>
              Museums
            </MenuItem>
          </Menu>

          {/* Profile */}
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ p: 0 }}
          >
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
