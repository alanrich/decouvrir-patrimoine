import React, { useState, useEffect, useRef } from "react";
import { useTable, useSortBy } from "react-table";
import { useTheme } from "@mui/material/styles";
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

const Resizer = ({ onMouseDown }) => {
  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        cursor: "col-resize",
        position: "absolute",
        top: 0,
        right: "0px",
        bottom: 0,
        zIndex: 10,
        width: "5px",
        backgroundColor: "#808080",
      }}
    />
  );
};

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
  sortOrder,
}) => {
  const theme = useTheme();
  const [columnWidths, setColumnWidths] = useState({});

  const tableRef = useRef(null); // Used to calculate table size when resizing columns
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

  const handleMouseDown = (columnId) => (event) => {
    event.preventDefault(); // prevents text selection when resizing columns
    const startX = event.clientX;
    const startWidth = columnWidths[columnId] || 150;
    console.log("column ID >>>> " + columnId);

    const handleMouseMove = (event) => {
      const newWidth = startWidth + event.clientX - startX;
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [columnId]: newWidth > 50 ? newWidth : 50, // Set a minimum column width
      }));
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (!tableRef.current) return;

    const tableWidth = tableRef.current.clientWidth;
    const initialColumnWidths = headerGroups[0]?.headers.reduce(
      (acc, column) => {
        console.log(`Setting initial width for column ${column.id}`);
        acc[column.id] = columnWidths[column.id] || tableWidth / columns.length; // Ensure a default width is set for each column
        return acc;
      },
      {}
    );

    setColumnWidths(initialColumnWidths);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

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
          overflowX: "scroll",
          overflowY: "auto",
          margin: 0,
          padding: 0,
          height: "100%",
        }}
      >
        <MuiTable
          stickyHeader
          {...getTableProps()}
          ref={tableRef}
          sx={{ tableLayout: "fixed", width: "100%" }}
        >
          <TableHead
            sx={{
              tableLayout: "fixed",
              "& .MuiTableCell-root": {
                paddingTop: "2px",
                paddingBottom: "2px",
                height: "36px",
                minHeight: "36px",
              },
            }}
          >
            {headerGroups.map((headerGroup) => (
              <TableRow
                {...headerGroup.getHeaderGroupProps()}
                sx={{ height: "36px" }}
              >
                {headerGroup.headers.map((column, index) => {
                  const isLastColumn = index === headerGroup.headers.length - 1; // we dont want the resizer on the end of the last column
                  return (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      sx={{
                        cursor: "pointer",
                        position: "sticky",
                        top: 0,
                        backgroundColor: theme.palette.primary.main,
                        color: column.isSorted ? "#D3D3D3" : "#fff",
                        fontWeight: "bold",
                        fontSize: ".8125rem",
                        zIndex: 2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: columnWidths[column.id]
                          ? `${columnWidths[column.id]}px`
                          : "150px",
                        minWidth: `${columnWidths[column.id]}px`,
                      }}
                    >
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? "desc" : "asc"}
                        sx={{
                          color: "inherit", // Inherit color from TableCell
                          "& .MuiTableSortLabel-icon": {
                            color: column.isSorted ? "#D3D3D3" : "#fff", // Change arrow color when sorted
                          },
                          "&:hover": {
                            color: "#D3D3D3", // Maintain hover color
                          },
                        }}
                      >
                        {column.render("Header")}
                      </TableSortLabel>
                      {!isLastColumn && (
                        <Resizer onMouseDown={handleMouseDown(column.id)} />
                      )}
                    </TableCell>
                  );
                })}
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
                  {row.cells.map((cell) => {
                    //console.log("cell.column.id >>>>> " + cell.column.id);
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: ".72rem",
                        }}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
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
          backgroundColor: "#808080",
        }}
      >
        <TablePagination
          component="div"
          count={totalObjects}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[10, 25, 50, 100]}
          sx={{
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 0,
            "& .MuiToolbar-root": {
              height: "32px",
              color: "#fff",
              fontWeight: "bold",
            },
            "& .MuiTablePagination-displayedRows, & .MuiTablePagination-actions":
              {
                fontSize: "0.8125rem",
                color: "#fff",
                fontWeight: "bold",
              },
          }}
        />
      </Box>
    </Box>
  );
};

export default SummaryTable;
