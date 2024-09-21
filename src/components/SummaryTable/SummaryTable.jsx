import React from 'react';
import { Table as MuiTable, TableBody, TableContainer, TableHead, Paper, TablePagination, Box } from '@mui/material';
import SummaryTableRow from './SummaryTableRow';

const SummaryTable = ({ domainObjects, page, rowsPerPage, onPageChange, onRowsPerPageChange, onSelect, columns }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          flex: '1 1 auto',
          overflowX: 'scroll',  // Always show horizontal scrollbar ==> IS NOT WORKING 
          overflowY: 'scroll',  // Always show vertical scrollbar ==> IS NOT WORKING
          maxHeight: '360px',  // Default height for the table body ==> LOOKS GOOD 
          resize: 'vertical',  // Enable vertical resizing ==> FOR FUTURE WORK
          scrollbarWidth: 'thin',  // For Firefox
          '&::-webkit-scrollbar': {  // For WebKit browsers
            height: '8px',
            width: '8px', 
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        }}
      >
        <MuiTable stickyHeader>
          <TableHead>
            <SummaryTableRow headerRow={true} columns={columns} />
          </TableHead>
          <TableBody>
            {domainObjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((object, index) => (
              <SummaryTableRow key={index} object={object} columns={columns} onSelect={onSelect} />
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
        />
      </Box>
    </Box>
  );
};

export default SummaryTable;
