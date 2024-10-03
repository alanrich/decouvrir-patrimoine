import React from "react";
import SummaryTable from "./SummaryTable";
import { Box } from "@mui/material";

const SummaryTableWrapper = ({
  domainObjects,
  totalObjects,
  onSelect,
  selectedDataSet,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  sortBy,
  setSortBy,
  sortOrder,
}) => {
  let columns = [];

  if (selectedDataSet === "museums") {
    columns = [
      { Header: "Name", accessor: "name" },
      { Header: "City", accessor: "city" },
      { Header: "Latitude", accessor: "latitude" },
      { Header: "Longitude", accessor: "longitude" },
    ];
  } else if (selectedDataSet === "festivals") {
    columns = [
      { Header: "Name", accessor: "name" },
      { Header: "Genre", accessor: "genre" },
      { Header: "City", accessor: "city" },
      { Header: "Latitude", accessor: "latitude" },
      { Header: "Longitude", accessor: "longitude" },
    ];
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SummaryTable
        columns={columns}
        domainObjects={domainObjects}
        page={page}
        rowsPerPage={rowsPerPage}
        totalObjects={totalObjects}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        onSelect={onSelect}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
      />
    </Box>
  );
};

export default SummaryTableWrapper;
