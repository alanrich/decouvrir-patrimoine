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

//console.warn = () => {};

const AppContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
}));

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

  useEffect(() => {
    setPage(0);
  }, [sortBy, sortOrder, debouncedSearchTerm]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <AppContainer>
            <MainDrawer />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
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
            </div>
          </AppContainer>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
