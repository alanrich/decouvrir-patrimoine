import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// TODO: e and e accent aigu, accent grave, accent circonflex should not be recognized as unique characters
// just make accents of all letters irrelevent to search
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      variant="outlined"
      value={searchTerm || ""}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={{
        borderRadius: "0.5rem",
        height: "3rem",
        "& .MuiOutlinedInput-root": {
          height: "2rem",
          borderRadius: "1rem",
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
          },
        },
        maxWidth: "18rem",
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            backgroundColor: "#fff",
          },
        },
      }}
    />
  );
};

export default SearchBar;
