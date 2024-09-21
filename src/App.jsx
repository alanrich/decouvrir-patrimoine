import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography, Box, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import SummaryTableWrapper from './components/SummaryTable/SummaryTableWrapper';
import DetailView from './components/DetailView';
import SearchBar from './components/SearchBar';
import { useDomainObjects } from './hooks/useDomainObjects';
import { usePersistentSelectedObject } from './hooks/usePersistentSelectedObject';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f4f6f8', // Light grey
      paper: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
});

const AppContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: theme.palette.background.default,
}));

const TableContainer = styled('div')({
  width: '80%',
  margin: '20px 0',
});

const Header = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  marginBottom: '20px',
  color: theme.palette.primary.main,
}));

function App() {
  const [searchTerm, setSearchTerm] = useState(null);
  const { selectedObject, setSelectedObject, clearSelectedObject } = usePersistentSelectedObject();
  const { filteredObjects, loading } = useDomainObjects(searchTerm);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize styles across browsers */}
      <AppContainer>
        <Header variant="h5">Anabasis Dashboard</Header>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <SummaryTableWrapper domainObjects={filteredObjects} onSelect={setSelectedObject} />
          </TableContainer>
        )}

        <Box sx={{ mt: 2 }}>
          <DetailView object={selectedObject} />
        </Box>

        {selectedObject && (
          <Button
            variant="contained"
            color="secondary"
            onClick={clearSelectedObject}
            sx={{
              mt: 2,
              padding: '10px 20px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#d32f2f' },
            }}
          >
            Clear Selection
          </Button>
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;