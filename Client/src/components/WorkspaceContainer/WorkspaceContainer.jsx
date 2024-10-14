import React, { Suspense, lazy } from "react";
import { styled } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";
import SummaryTableWrapper from "../SummaryTable/SummaryTableWrapper";
import DetailViewWrapper from "../DetailView/DetailViewWrapper";

const MapView = lazy(() => import("../MapView/MapView"));

const StyledWorkspaceContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  marginTop: "4rem",
  overflow: "auto",
});

const LeftPane = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "1rem",
  height: "100%",
  width: "50%",
  overflow: "hidden",
  justifyContent: "center",
  alignItems: "center",
  "& > div": {
    width: "100%",
    flex: "0 0 50%",
    overflow: "hidden",
  },
});

const RightPane = styled("div")({
  display: "flex",
  flex: 1,
  width: "50%",
  padding: "1rem",
  backgroundColor: "#e0e0e0",
});

const WorkspaceContainer = ({
  loading,
  domainObjects,
  totalObjects,
  handleSetSelectedObject,
  selectedDataSet,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  selectedObject,
  selectedObjectLoaded,
  setSelectedObject,
}) => {
  return (
    <StyledWorkspaceContainer>
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
            domainObjects={domainObjects}
            totalObjects={totalObjects}
            selectedObject={selectedObject}
            selectedObjectLoaded={selectedObjectLoaded}
            onSelect={setSelectedObject}
          />
        </Suspense>
      </RightPane>
    </StyledWorkspaceContainer>
  );
};

export default WorkspaceContainer;