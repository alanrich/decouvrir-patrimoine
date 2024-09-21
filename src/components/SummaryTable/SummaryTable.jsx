import React from 'react';
import { Table as MuiTable, TableBody, TableContainer, TableHead, Paper, TablePagination } from '@mui/material';
import SummaryTableRow from './SummaryTableRow';

const SummaryTable = ({ domainObjects, page, rowsPerPage, onPageChange, onRowsPerPageChange, onSelect, columns }) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <SummaryTableRow headerRow={true} columns={columns} />
        </TableHead>
        <TableBody>
          {domainObjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((object, index) => (
            <SummaryTableRow key={index} object={object} columns={columns} onSelect={onSelect} />
          ))}
        </TableBody>
      </MuiTable>

      <TablePagination
        component="div"
        count={domainObjects.length}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </TableContainer>
  );
};

export default SummaryTable;
