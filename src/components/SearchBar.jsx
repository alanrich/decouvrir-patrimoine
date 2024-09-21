import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={{
        mb: 2,
        borderRadius: '8px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px',
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
          },
        },
      }}
    />
  );
};

export default SearchBar;
