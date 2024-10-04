import React, { useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TablePagination,
  Box,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";

const SummaryTable = ({
  domainObjects,
  page,
  rowsPerPage,
  totalObjects,
  onPageChange,
  onRowsPerPageChange,
  onSelect,
  columns,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: domainObjects,
        manualPagination: true,
        manualSortBy: true,
        pageCount: Math.ceil(totalObjects / rowsPerPage),
        initialState: {
          pageIndex: page,
          pageSize: rowsPerPage,
          sortBy: [{ id: sortBy, desc: sortOrder === "desc" }],
        },
        disableMultiSort: true,
        autoResetSortBy: false,
      },
      useSortBy
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          margin: 0,
          padding: 0,
          height: "100%",
        }}
      >
        <MuiTable stickyHeader {...getTableProps()}>
          <TableHead
            sx={{
              "& .MuiTableCell-root": {
                paddingTop: "10px",
                paddingBottom: "10px",
              },
            }}
          >
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? "desc" : "asc"}
                    >
                      {column.render("Header")}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  hover
                  onClick={() => onSelect(row.original)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#e3f2fd" },
                    "& .MuiTableCell-root": {
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    },
                  }}
                >
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <Box
        sx={{
          flexShrink: 0,
          borderTop: "1px solid #ddd",
          padding: "0px 16px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <TablePagination
          component="div"
          count={totalObjects}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            minHeight: "42px",
            "& .MuiToolbar-root": {
              minHeight: "42px",
            },
            "& .MuiTablePagination-displayedRows, & .MuiTablePagination-actions":
              {
                fontSize: "0.8125rem",
              },
          }}
        />
      </Box>
    </Box>
  );
};

export default SummaryTable;
