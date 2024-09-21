import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import SearchBar from '../SearchBar';

const MainToolBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#808080',
        height: '3rem',
        top: '4rem',
        left: '60px',  // leave in px
        right: '0',
        boxShadow: 'none',
      }}
    >
      <Toolbar 
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Box sx={{ marginRight: '80px', height: '100%', display: 'flex', alignItems: 'center' }}>  
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainToolBar;
