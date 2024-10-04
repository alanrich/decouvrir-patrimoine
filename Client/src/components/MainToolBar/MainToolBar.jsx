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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import SearchBar from "../SearchBar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MainToolBar = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  selectedDataSet,
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Local state for sorting selections
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  const [localSortOrder, setLocalSortOrder] = useState(sortOrder);

  // Handlers for opening and closing the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handler for applying the sorting
  const handleApplySort = () => {
    setSortBy(localSortBy);
    setSortOrder(localSortOrder);
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#808080",
        height: "3rem",
        top: "4rem",
        left: "60px", // leave in px
        right: "0",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "100%",
          paddingRight: "80px", // padding to align with search bar
        }}
      >
        {/* Container for Sort Control and Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Sort Control */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "16px", // Position Sort Control 16px left of Search Bar
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={handleClick}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                backgroundColor: "#fff",
                textTransform: "none",
                fontSize: "0.8rem",
                minWidth: "100px",
                height: "2rem",
              }}
            >
              Sort By:{" "}
              {sortOptions.find((option) => option.value === sortBy)?.label ||
                "Select"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "sort-button",
              }}
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              transformOrigin={{ horizontal: "left", vertical: "top" }}
            >
              {sortOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  selected={option.value === localSortBy}
                  onClick={() => {
                    setLocalSortBy(option.value);
                  }}
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
                  <ToggleButton value="asc">Asc</ToggleButton>
                  <ToggleButton value="desc">Desc</ToggleButton>
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
          <Box
            sx={{
              marginRight: "80px",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainToolBar;
