// MainToolBar.jsx

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  Divider,
  Typography,
  IconButton,
  InputBase,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const MainToolBar = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  selectedDataSet,
  setSelectedDataSet,
}) => {
  const sortOptions =
    selectedDataSet === "festivals"
      ? [
          { value: "name", label: "Name" },
          { value: "city", label: "City" },
          { value: "genre", label: "Genre" },
        ]
      : [
          { value: "name", label: "Name" },
          { value: "city", label: "City" },
        ];

  // Sorting Menu State
  const [anchorElSort, setAnchorElSort] = useState(null);
  const openSort = Boolean(anchorElSort);

  // Search Bar State
  const [searchActive, setSearchActive] = useState(false);

  // Local state for sorting selections
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  const [localSortOrder, setLocalSortOrder] = useState(sortOrder);

  // Cultural Selection Menu State
  const [anchorElCultural, setAnchorElCultural] = useState(null);
  const openCultural = Boolean(anchorElCultural);

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

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#808080",
        height: "64px",
        top: "4rem",
        left: "0",
        right: "0",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          paddingLeft: "16px",
          paddingRight: "64px",
          minHeight: "64px",
        }}
      >
        {/* Left side: Button for selecting data set */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            // Adding margin-left to ensure it doesn't overlap with MainDrawer
            marginLeft: { xs: "60px", sm: "70px" }, // Adjust based on screen size
          }}
        >
          <Button
            variant="outlined"
            onClick={handleCulturalMenuOpen}
            sx={{
              backgroundColor: "#fff",
              textTransform: "none",
              fontSize: "0.875rem",
              minWidth: "200px",
              height: "40px",
              whiteSpace: "nowrap",
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
        </Box>

        {/* Right side: Search and Sort */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            maxWidth: "calc(100% - 200px)", // Adjust based on button width
          }}
        >
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
                backgroundColor: "#f1f3f4",
                borderRadius: "24px",
                padding: "0 8px",
                height: "40px",
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

          <Button
            variant="outlined"
            onClick={handleSortMenuOpen}
            startIcon={<SortIcon />}
            sx={{
              backgroundColor: "#fff",
              textTransform: "none",
              fontSize: "0.875rem",
              minWidth: "80px",
              height: "40px",
              whiteSpace: "nowrap",
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
                sx={{ fontSize: "0.875rem" }}
              >
                {option.label}
              </MenuItem>
            ))}
            <Divider />
            <Box sx={{ padding: "0.5rem 1.5rem" }}>
              <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainToolBar;
