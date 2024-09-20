import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TableView = ({ domainObjects, onSelect }) => {
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
          {domainObjects.map((object) => (
            <TableRow key={object.id} hover onClick={() => onSelect(object)}>
              <TableCell>{object.id}</TableCell>
              <TableCell>{object.name}</TableCell>
              <TableCell>{object.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;

