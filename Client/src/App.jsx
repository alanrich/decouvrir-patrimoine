import React, { useState, useCallback, Suspense, lazy } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
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
}));

const WorkspaceContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  marginTop: "7rem", // Account for MainAppBar and MainToolBar height
  overflow: "auto",
});

const LeftPane = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "1rem",
  height: "100%",
  overflow: "hidden",
  // Makes sure that each component takes up 50% of the height
  "& > div": {
    flex: "0 0 50%", // fix the height at 50%, prevent any expansion/shrinking on zoom
    overflow: "hidden",
  },
});

const RightPane = styled("div")({
  display: "flex",
  flex: "1",
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

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { domainObjects, totalObjects, loading } = useDomainObjects(
    debouncedSearchTerm,
    selectedDataSet,
    page,
    rowsPerPage,
    [{ id: sortBy, desc: sortOrder === "desc" }] // Pass sortBy as an array
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

  const handleClearSelectedObject = useCallback(() => {
    clearSelectedObject();
  }, [clearSelectedObject]);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AppContainer>
          <MainDrawer setSelectedDataSet={setSelectedDataSet} />

          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
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
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <SummaryTableWrapper
                      domainObjects={domainObjects} // why are we using filteredObjects here
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
                    />
                  </Box>
                )}

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    mt: "1rem",
                  }}
                >
                  <DetailViewWrapper
                    object={selectedObject}
                    selectedDataSet={selectedDataSet}
                  />
                </Box>

                {selectedObject && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClearSelectedObject}
                    sx={{
                      mt: "1rem",
                      padding: "0.625rem 1.25rem",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#d32f2f" },
                    }}
                  >
                    Clear Selection
                  </Button>
                )}
              </LeftPane>
              <RightPane>
                <Suspense fallback={<div>Loading map...</div>}>
                  <MapView
                    domainObjects={domainObjects}
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
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;