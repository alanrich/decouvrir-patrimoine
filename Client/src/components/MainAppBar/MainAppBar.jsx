import React, { useState } from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import SortMenu from "./SortMenu";
import SearchBar from "./SearchBar";
import CulturalMenu from "./CulturalMenu";
import ProfileMenu from "./ProfileMenu";
import AppTitle from "./AppTitle";
import sortOptionsMap from "../../constants/sortOptionsMap";
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
      <AppTitle />
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "100%",
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(2),
            justifyContent: "flex-end",
          }}
        >
          {/* Search */}
          <SearchBar
            searchActive={searchActive}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchClick={handleSearchClick}
            handleSearchClose={handleSearchClose}
          />
          <SortMenu
            anchorElSort={anchorElSort}
            openSort={openSort}
            handleSortMenuOpen={handleSortMenuOpen}
            handleSortMenuClose={handleSortMenuClose}
            sortOptions={sortOptions}
            localSortBy={localSortBy}
            setLocalSortBy={setLocalSortBy}
            localSortOrder={localSortOrder}
            setLocalSortOrder={setLocalSortOrder}
            handleApplySort={handleApplySort}
          />
          {/* Cultural selection */}
          <CulturalMenu
            anchorElCultural={anchorElCultural}
            openCultural={openCultural}
            handleCulturalMenuOpen={handleCulturalMenuOpen}
            handleCulturalMenuClose={handleCulturalMenuClose}
            handleCulturalSelection={handleCulturalSelection}
          />
          {/* Profile */}
          <ProfileMenu
            anchorElProfile={anchorElProfile}
            openProfile={openProfile}
            handleProfileMenuOpen={handleProfileMenuOpen}
            handleProfileMenuClose={handleProfileMenuClose}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
