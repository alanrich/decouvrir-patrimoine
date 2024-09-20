import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{ marginBottom: '20px' }}
    />
  );
};

export default SearchBar;
