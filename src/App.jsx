import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainAppBar from "./components/MainAppBar/MainAppBar";
import MainToolBar from "./components/MainToolBar/MainToolBar";
import MainDrawer from "./components/MainDrawer/MainDrawer";
import SummaryTableWrapper from "./components/SummaryTable/SummaryTableWrapper";
import DetailView from "./components/DetailView";
import MapView from "./components/MapView/MapView";
import { useDomainObjects } from "./hooks/useDomainObjects";
import { usePersistentSelectedObject } from "./hooks/usePersistentSelectedObject";

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
});

const RightPane = styled("div")({
  display: "flex",
  flex: "1",
  padding: "1rem",
  backgroundColor: "#e0e0e0",
});

function App() {
  const [searchTerm, setSearchTerm] = useState(null);
  const { selectedObject, setSelectedObject, clearSelectedObject } =
    usePersistentSelectedObject();
  const { filteredObjects, loading } = useDomainObjects(searchTerm);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <MainDrawer />

        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <MainAppBar />
          <MainToolBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <WorkspaceContainer>
            <LeftPane>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <SummaryTableWrapper
                    domainObjects={filteredObjects}
                    onSelect={setSelectedObject}
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
                <DetailView object={selectedObject} />
              </Box>

              {selectedObject && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={clearSelectedObject}
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
              <MapView
                domainObjects={filteredObjects}
                selectedObject={selectedObject}
                onSelect={setSelectedObject}
              />
            </RightPane>
          </WorkspaceContainer>
        </div>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
