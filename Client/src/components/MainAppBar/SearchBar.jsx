import React from "react";
import { IconButton, Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

const SearchBar = ({
  searchActive,
  searchTerm,
  setSearchTerm,
  handleSearchClick,
  handleSearchClose,
}) => {
  const theme = useTheme();

  return (
    <>
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
    </>
  );
};

export default SearchBar;
