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
  setSortOrder,
}) => {
  let columns = [];

  if (selectedDataSet === "museums") {
    columns = [
      { Header: "Name", accessor: "name" },
      {
        Header: "Genres",
        accessor: "genre",
        Cell: ({ value }) =>
          Array.isArray(value) ? value.join(", ") : "Non disponible",
      },
      { Header: "City", accessor: "city" },
    ];
  } else if (selectedDataSet === "festivals") {
    columns = [
      { Header: "Name", accessor: "name" },
      { Header: "Genre", accessor: "genre" },
      { Header: "City", accessor: "city" },
    ];
  } else if (selectedDataSet === "jardins") {
    columns = [
      { Header: "Name", accessor: "name" },
      { Header: "Genre", accessor: "genre" },
      { Header: "City", accessor: "city" },
    ];
  } else if (selectedDataSet === "maisonsDesIllustres") {
    columns = [
      { Header: "Name", accessor: "name" },
      {
        Header: "Genre",
        accessor: "genre",
        Cell: ({ value }) =>
          Array.isArray(value) ? value.join(", ") : "Non disponible",
      },
      { Header: "City", accessor: "city" },
    ];
  } else if (selectedDataSet === "cathedrals") {
    columns = [
      { Header: "Nom", accessor: "name" },
      { Header: "Style", accessor: "genre" },
      { Header: "Ville", accessor: "city" },
    ];
  } else if (selectedDataSet === "chateaux") {
    columns = [
      { Header: "Nom", accessor: "name" },
      { Header: "Période ou Style", accessor: "genre" },
      { Header: "Commune", accessor: "city" },
    ];
  } else if (selectedDataSet === "operaHouses") {
    columns = [
      { Header: "Nom", accessor: "name" },
      { Header: "Type", accessor: "genre" },
      { Header: "Lieu", accessor: "city" },
    ];
  } else if (selectedDataSet === "architectureContemporaines") {
    columns = [
      { Header: "Name", accessor: "name" },
      {
        Header: "Genre",
        accessor: "genre",
        Cell: ({ value }) =>
          Array.isArray(value) ? value.join(", ") : "Non disponible",
      },
      { Header: "City", accessor: "city" },
    ];
  }

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
        setSortOrder={setSortOrder}
      />
    </Box>
  );
};

export default SummaryTableWrapper;
