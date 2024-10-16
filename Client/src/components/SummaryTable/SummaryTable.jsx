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
  const theme = useTheme();
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
        backgroundColor: theme.palette.grey[500],
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
  setSortBy,
  setSortOrder,
}) => {
  const theme = useTheme();
  const [columnWidths, setColumnWidths] = useState({});

  const tableRef = useRef(null);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: domainObjects,
        manualSortBy: true,
        initialState: {
          sortBy: [{ id: sortBy, desc: sortOrder === "desc" }],
        },
        disableMultiSort: true,
        autoResetSortBy: false,
      },
      useSortBy
    );

  const handleMouseDown = (columnId) => (event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = columnWidths[columnId] || 150;

    const handleMouseMove = (event) => {
      const newWidth = startWidth + event.clientX - startX;
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [columnId]: newWidth > 50 ? newWidth : 50,
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
        acc[column.id] = columnWidths[column.id] || tableWidth / columns.length;
        return acc;
      },
      {}
    );

    setColumnWidths(initialColumnWidths);
  }, []);

  const handleSort = (column) => {
    const isDesc = sortBy === column.id && sortOrder === "desc";
    setSortBy(column.id);
    setSortOrder(isDesc ? "asc" : "desc");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          overflowX: "auto",
          overflowY: "auto",
          margin: 0,
          padding: 0,
          minHeight: 0,
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
                sx={{
                  height: "36px",
                }}
              >
                {headerGroup.headers.map((column, index) => {
                  const isLastColumn = index === headerGroup.headers.length - 1;
                  return (
                    <TableCell
                      {...column.getHeaderProps()}
                      sx={{
                        cursor: "pointer",
                        position: "sticky",
                        top: 0,
                        backgroundColor: theme.palette.primary.main,
                        color: column.isSorted
                          ? theme.palette.grey[300]
                          : theme.palette.common.white,
                        fontWeight: "bold",
                        fontSize: theme.typography.body2.fontSize,
                        zIndex: 2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: columnWidths[column.id]
                          ? `${columnWidths[column.id]}px`
                          : "150px",
                        minWidth: `${columnWidths[column.id]}px`,
                      }}
                      onClick={() => handleSort(column)}
                    >
                      <TableSortLabel
                        active={sortBy === column.id}
                        direction={sortOrder === "desc" ? "desc" : "asc"}
                        sx={{
                          color: "inherit",
                          "& .MuiTableSortLabel-icon": {
                            color:
                              sortBy === column.id
                                ? theme.palette.grey[300]
                                : theme.palette.common.white,
                          },
                          "&:hover": {
                            color: theme.palette.grey[300],
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
                    "&:hover": { backgroundColor: theme.palette.primary.light },
                    "& .MuiTableCell-root": {
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    },
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: theme.typography.body2.fontSize,
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
          borderTop: `1px solid ${theme.palette.grey[300]}`,
          backgroundColor: theme.palette.grey[500],
          height: "32px",
          flexShrink: 0,
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
            padding: "0 16px",
            "& .MuiToolbar-root": {
              height: "32px",
              color: theme.palette.common.white,
              fontWeight: "bold",
              minHeight: "32px",
              padding: 0,
            },
            "& .MuiTablePagination-displayedRows, & .MuiTablePagination-actions":
              {
                fontSize: theme.typography.body2.fontSize,
                color: theme.palette.common.white,
                fontWeight: "bold",
              },
          }}
        />
      </Box>
    </Box>
  );
};

export default SummaryTable;
