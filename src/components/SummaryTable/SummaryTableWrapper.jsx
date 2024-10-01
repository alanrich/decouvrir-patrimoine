import React, { useState } from "react";
import SummaryTable from "./SummaryTable";
import { Box } from "@mui/material";

const SummaryTableWrapper = ({ domainObjects, onSelect, selectedDataSet }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SummaryTable
        columns={columns}
        domainObjects={domainObjects}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onSelect={onSelect}
      />
    </Box>
  );
};

export default SummaryTableWrapper;
