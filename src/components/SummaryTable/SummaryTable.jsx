import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TablePagination,
  Box,
} from '@mui/material';
import SummaryTableRow from './SummaryTableRow';

const SummaryTable = ({
  domainObjects,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onSelect,
  columns,
  height,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // Remove flex: 1 to prevent the Box from stretching
        // Set a fixed height or let the parent control it
        height: height ||'100%',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          // Remove flex: 1 to prevent stretching
          // Set maxHeight to constrain the table's height
          maxHeight: '100%', // Ensures it doesn't exceed its parent's height
          overflowY: 'auto', // Enables vertical scrolling when content overflows
          // Remove padding and margins that might affect the height
          margin: 0,
          padding: 0,
        }}
      >
        <MuiTable stickyHeader>
          <TableHead
            sx={{
              '& .MuiTableCell-root': {
                paddingTop: '10px',
                paddingBottom: '10px',
              },
            }}
          >
            <SummaryTableRow headerRow={true} columns={columns} />
          </TableHead>
          <TableBody>
            {domainObjects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((object, index) => (
                <SummaryTableRow
                  key={index}
                  object={object}
                  columns={columns}
                  onSelect={onSelect}
                />
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <Box
        sx={{
          flexShrink: 0,
          borderTop: '1px solid #ddd',
          padding: '0px 16px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <TablePagination
          component="div"
          count={domainObjects.length}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            minHeight: '42px',
            '& .MuiToolbar-root': {
              minHeight: '42px',
            },
            '& .MuiTablePagination-displayedRows, & .MuiTablePagination-actions': {
              fontSize: '0.8125rem',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SummaryTable;