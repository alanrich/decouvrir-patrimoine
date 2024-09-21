import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainAppBar from './components/MainAppBar/MainAppBar';
import MainToolBar from './components/MainToolBar/MainToolBar';
import MainDrawer from './components/MainDrawer/MainDrawer';
import SummaryTableWrapper from './components/SummaryTable/SummaryTableWrapper';
import DetailView from './components/DetailView';
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
      default: '#f4f6f8',
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
  paddingLeft: '2rem',
  paddingRight: '2rem',
  paddingBottom: '2rem',
  paddingTop: '6.5rem', // Adjust for the combined height MainAppBar & MainToolBar
  backgroundColor: theme.palette.background.default,
}));

const TableContainer = styled('div')({
  width: '80%',
  margin: '2rem 0',
});

function App() {
  const [searchTerm, setSearchTerm] = useState(null);
  const { selectedObject, setSelectedObject, clearSelectedObject } = usePersistentSelectedObject();
  const { filteredObjects, loading } = useDomainObjects(searchTerm);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <MainAppBar />
        <MainToolBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <MainDrawer />

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <SummaryTableWrapper domainObjects={filteredObjects} onSelect={setSelectedObject} />
          </TableContainer>
        )}

        <Box sx={{ mt: '2rem' }}>
          <DetailView object={selectedObject} />
        </Box>

        {selectedObject && (
          <Button
            variant="contained"
            color="secondary"
            onClick={clearSelectedObject}
            sx={{
              mt: '2rem',
              padding: '0.625rem 1.25rem',
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