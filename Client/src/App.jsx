import React, { useState, useCallback, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import MainAppBar from "./components/MainAppBar/MainAppBar";
import MainDrawer from "./components/MainDrawer/MainDrawer";
import { useDebounce } from "./hooks/useDebounce";
import { useDomainObjects } from "./hooks/useDomainObjects";
import { usePersistentSelectedObject } from "./hooks/usePersistentSelectedObject";
import ErrorBoundary from "./components/ErrorBoundary";
import WorkspaceContainer from "./components/WorkspaceContainer/WorkspaceContainer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const AppContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.palette.background.default,
  overflow: "hidden",
}));

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDataSet, setSelectedDataSet] = useState("museums");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  // Reset page when sort options or search term change
  useEffect(() => {
    setPage(0);
  }, [sortBy, sortOrder, debouncedSearchTerm]);

  // Reset page when dataset changes
  useEffect(() => {
    setPage(0);
  }, [selectedDataSet]);

  // Update selectedObject to the first item when domainObjects change
  useEffect(() => {
    if (domainObjects.length > 0) {
      setSelectedObject(domainObjects[0]);
    } else {
      setSelectedObject(null);
    }
  }, [domainObjects, setSelectedObject]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <AppContainer>
            <MainDrawer />
            <MainAppBar
              searchTerm={searchTerm}
              setSearchTerm={handleSetSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              selectedDataSet={selectedDataSet}
              setSelectedDataSet={setSelectedDataSet}
            />
            <WorkspaceContainer
              loading={loading}
              domainObjects={domainObjects}
              totalObjects={totalObjects}
              handleSetSelectedObject={handleSetSelectedObject}
              selectedDataSet={selectedDataSet}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              selectedObject={selectedObject}
              selectedObjectLoaded={selectedObjectLoaded}
              setSelectedObject={setSelectedObject}
            />
          </AppContainer>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
