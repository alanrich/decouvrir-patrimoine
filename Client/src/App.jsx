import React, { useState, useCallback, useEffect, Suspense, lazy } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import MainAppBar from "./components/MainAppBar/MainAppBar";
import MainToolBar from "./components/MainToolBar/MainToolBar";
import MainDrawer from "./components/MainDrawer/MainDrawer";
import SummaryTableWrapper from "./components/SummaryTable/SummaryTableWrapper";
import DetailViewWrapper from "./components/DetailView/DetailViewWrapper";
import { useDebounce } from "./hooks/useDebounce";
import { useDomainObjects } from "./hooks/useDomainObjects";
import { usePersistentSelectedObject } from "./hooks/usePersistentSelectedObject";
import ErrorBoundary from "./components/ErrorBoundary";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
    background: { default: "#f4f6f8", paper: "#fff" },
    text: { primary: "#333", secondary: "#555" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: { fontWeight: 500, letterSpacing: "0.02em" },
  },
});

const AppContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  // overflowX: "hidden",
}));

const WorkspaceContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  marginTop: "8rem", // Account for MainAppBar and MainToolBar height
  overflow: "auto",
});

const LeftPane = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "1rem",
  paddingTop: "2rem",
  height: "100%",
  width: "50%",
  overflow: "hidden",
  justifyContent: "center",
  alignItems: "center",
  // Makes sure that each component takes up 50% of the height
  "& > div": {
    width: "100%",
    flex: "0 0 50%", // prevent any expansion/shrinking on zoom
    overflow: "hidden",
  },
});

const RightPane = styled("div")({
  display: "flex",
  flex: "1",
  width: "50%",
  padding: "1rem",
  backgroundColor: "#e0e0e0",
});

const MapView = lazy(() => import("./components/MapView/MapView"));

function App() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedDataSet, setSelectedDataSet] = useState("museums");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const debouncedSearchTerm = useDebounce(searchTerm, 500); //TODO: Reassess deboounce time

  const { domainObjects, totalObjects, loading } = useDomainObjects(
    debouncedSearchTerm,
    selectedDataSet,
    page,
    rowsPerPage,
    sortBy,
    sortOrder
  );

  const {
    selectedObject,
    setSelectedObject,
    selectedObjectLoaded,
    clearSelectedObject,
  } = usePersistentSelectedObject();

  const handleSetSearchTerm = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleSetSelectedObject = useCallback(
    (object) => {
      setSelectedObject(object);
    },
    [setSelectedObject]
  );
  /*
*
*  We Need to implement the clear button in a better fashion, it was too prominent
*
  const handleClearSelectedObject = useCallback(() => {
    clearSelectedObject();
  }, [clearSelectedObject]);
*/
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [sortBy, sortOrder, debouncedSearchTerm]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router basename="/work-sample">
          <AppContainer>
            <MainDrawer setSelectedDataSet={setSelectedDataSet} />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                // overflowX: "hidden",
              }}
            >
              <MainAppBar />
              <MainToolBar
                searchTerm={searchTerm}
                setSearchTerm={handleSetSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                selectedDataSet={selectedDataSet}
              />

              <WorkspaceContainer>
                <LeftPane>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <SummaryTableWrapper
                        domainObjects={domainObjects}
                        totalObjects={totalObjects}
                        onSelect={handleSetSelectedObject}
                        selectedDataSet={selectedDataSet}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                      />
                    </Box>
                  )}

                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: "1rem",
                      width: "100%",
                    }}
                  >
                    <DetailViewWrapper
                      object={selectedObject}
                      selectedDataSet={selectedDataSet}
                    />
                  </Box>
                </LeftPane>
                <RightPane>
                  <Suspense fallback={<div>Loading map...</div>}>
                    <MapView
                      domainObjects={domainObjects} // TODO: modify useDomainObjects to return an object with all markers
                      totalObjects={totalObjects}
                      selectedObject={selectedObject}
                      selectedObjectLoaded={selectedObjectLoaded}
                      onSelect={setSelectedObject}
                    />
                  </Suspense>
                </RightPane>
              </WorkspaceContainer>
            </div>
          </AppContainer>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
