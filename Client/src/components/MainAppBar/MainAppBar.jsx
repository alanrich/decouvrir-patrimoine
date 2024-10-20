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

  const sortOptionsMap = {
    festivals: [
      { value: "name", label: "Nom" },
      { value: "city", label: "Ville" },
      { value: "genre", label: "Genre" },
    ],
    museums: [
      { value: "name", label: "Nom" },
      { value: "city", label: "Ville" },
    ],
    jardins: [
      { value: "name", label: "Nom" },
      { value: "city", label: "Ville" },
      { value: "type", label: "Type de jardin" },
    ],
    maisonsDesIllustres: [
      { value: "name", label: "Nom" },
      { value: "city", label: "Ville" },
      { value: "genre", label: "Genre" },
    ],
    architectureContemporaines: [
      { value: "name", label: "Nom" },
      { value: "city", label: "Ville" },
      { value: "genre", label: "Genre" },
    ],
    chateaux: [
      { value: "name", label: "Nom" },
      { value: "city", label: "Commune" },
      { value: "genre", label: "Période ou Style" },
    ],
    operaHouses: [
      { value: "name", label: "Nom" },
      { value: "city", label: "Lieu" },
      { value: "genre", label: "Type" },
    ],
    cathedrals: [
      { value: "name", label: "Nom" },
      { value: "city", label: "Ville" },
      { value: "genre", label: "Style" },
    ],
  };

  const sortOptions = sortOptionsMap[selectedDataSet] || sortOptionsMap.museums;

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
    setSearchTerm("");
    setSearchActive(false);
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
            sx={theme.typography.fancyText}
          >
            Découvrir Patrimoine
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
                backgroundColor: theme.palette.background.white,
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
            Tier
          </Button>
          <Menu
            anchorEl={anchorElSort}
            open={openSort}
            onClose={handleSortMenuClose}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            transformOrigin={{ horizontal: "center", vertical: "top" }}
            PaperProps={{
              sx: {
                borderRadius: theme.shape.borderRadiusSmall,
                boxShadow: theme.shadows[2],
              },
            }}
            sx={{
              mt: 1,
            }}
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
                Ordre de tri
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
                  croissant
                </ToggleButton>
                <ToggleButton value="desc">
                  <ArrowDownwardIcon
                    fontSize="small"
                    sx={{ marginRight: "4px" }}
                  />
                  décroissant
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Divider />
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                padding: "4px 12px", // Smaller padding to avoid too much extra space
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: theme.shape.borderRadiusMedium,
                width: "fit-content", // Box should only be as wide as its content
                margin: "8px auto", // Add space around the box and center it horizontally
              }}
            >
              <MenuItem
                onClick={handleApplySort}
                sx={{
                  ...theme.typography.fancyText,
                  justifyContent: "center",
                  width: "fit-content",
                }}
              >
                Appliquer
              </MenuItem>
            </Box>
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
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              sx: {
                borderRadius: theme.shape.borderRadiusSmall,
                boxShadow: theme.shadows[2],
              },
            }}
            sx={{
              mt: 1,
            }}
          >
            <MenuItem onClick={() => handleCulturalSelection("museums")}>
              Musées
            </MenuItem>
            <MenuItem onClick={() => handleCulturalSelection("jardins")}>
              Jardins
            </MenuItem>
            <MenuItem onClick={() => handleCulturalSelection("chateaux")}>
              Châteaux
            </MenuItem>
            <MenuItem onClick={() => handleCulturalSelection("cathedrals")}>
              Cathédrals
            </MenuItem>
            <MenuItem onClick={() => handleCulturalSelection("operaHouses")}>
              Salles d'Opéra
            </MenuItem>
            <MenuItem
              onClick={() => handleCulturalSelection("maisonsDesIllustres")}
            >
              Maisons des Illustres
            </MenuItem>
            {/*
            *
            * TO DO: This data set needs a better hook to fetch wiki info
            * 
            * 
            <MenuItem
              onClick={() =>
                handleCulturalSelection("architectureContemporaines")
              }
            >
              Architecture Contemporaine
            </MenuItem>
            */}
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
