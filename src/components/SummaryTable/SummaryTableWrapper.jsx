import React, { useState } from "react";
import SummaryTable from "./SummaryTable";
import { Box } from "@mui/material";

const SummaryTableWrapper = ({ domainObjects, onSelect, selectedDataSet }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  let columns = [];
  if (selectedDataSet === "videoprotection") {
    columns = [
      { Header: "Address", accessor: "adresse" },
      { Header: "INSEE Code", accessor: "code_insee" },
      { Header: "Municipality", accessor: "commune" },
      { Header: "Latitude", accessor: "geo_point_2d.lat" },
      { Header: "Longitude", accessor: "geo_point_2d.lon" },
    ];
  } else if (selectedDataSet === "museums") {
    columns = [
      { Header: "Identifier", accessor: "identifiant" },
      { Header: "Official Name", accessor: "nom_officiel" },
      { Header: "City", accessor: "ville" },
      { Header: "Category", accessor: "categorie" },
      { Header: "Latitude", accessor: "coordonnees.lat" },
      { Header: "Longitude", accessor: "coordonnees.lon" },
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
