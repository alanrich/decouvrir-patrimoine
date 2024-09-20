import React, { useState } from 'react';
import SummaryTableWrapper from './components/SummaryTable/SummaryTableWrapper';
import DetailView from './components/DetailView';
import SearchBar from './components/SearchBar';
import { Box, Button, CircularProgress } from '@mui/material';
import { useDomainObjects } from './hooks/useDomainObjects';
import { usePersistentSelectedObject } from './hooks/usePersistentSelectedObject';

function App() {
  const [searchTerm, setSearchTerm] = useState(null)
  const { selectedObject, setSelectedObject, clearSelectedObject } = usePersistentSelectedObject();
  const { filteredObjects, loading } = useDomainObjects(searchTerm)

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      { loading ? (
      <CircularProgress /> 
      ) : (
        <SummaryTableWrapper domainObjects={filteredObjects} onSelect={setSelectedObject} />
      )}

      <Box sx={{ mt: 2 }}>
        <DetailView object={selectedObject} />
      </Box>
      {selectedObject && (
        <Button
          variant="contained"
          color="secondary"
          onClick={clearSelectedObject}
          sx={{ mt: 2 }}
        >
          Clear Selection
        </Button>
      )}
    </div>
  );
}

export default App;
