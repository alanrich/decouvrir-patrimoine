import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';

const TableView = ({ domainObjects, onSelect }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow> 
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {domainObjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((object, index) => (
            <TableRow key={object.id} hover onClick={() => onSelect(object)}>
              <TableCell>{object.adresse}</TableCell>
              <TableCell>{object.code_insee}</TableCell>
              <TableCell>{object.commune}</TableCell>
              <TableCell>{object.geo_point_2d.lat}</TableCell>
              <TableCell>{object.geo_point_2d.lon}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={domainObjects.length} // Total number of rows
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
     />
    </TableContainer>
  );
};

export default TableView;

