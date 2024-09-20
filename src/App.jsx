import React, { useState } from 'react';
import TableView from './components/TableView';
import DetailView from './components/DetailView';
import SearchBar from './components/SearchBar';
import { Box, CircularProgress } from '@mui/material';
import { useDomainObjects } from './hooks/useDomainObjects';

function App() {
  const [selectedObject, setSelectedObject] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null)

  const { filteredObjects, loading } = useDomainObjects(searchTerm)

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      { loading ? (
      <CircularProgress /> 
      ) : (
        <TableView domainObjects={filteredObjects} onSelect={setSelectedObject} />
      )}

      <Box sx={{ mt: 2 }}>
        <DetailView object={selectedObject} />
      </Box>
    </div>
  );
}

export default App;
