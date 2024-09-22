import React from 'react';
import { TableRow } from '@mui/material';
import SummaryTableCell from './SummaryTableCell';

const SummaryTableRow = ({ headerRow = false, object, onSelect, columns }) => {
  if (headerRow) {
    return (
      <TableRow
        sx={{
          backgroundColor: '#e0e0e0',
          fontWeight: 'bold',
          '& .MuiTableCell-root': {
            paddingTop: '10px',
            paddingBottom: '10px',
          },
        }}
      >
        {columns.map((column) => (
          <SummaryTableCell key={column.accessor} isHeader={true} content={column.Header} />
        ))}
      </TableRow>
    );
  }

  if (!object) {
    return null; // Prevent rendering if object is undefined
  }

  return (
    <TableRow
      hover
      onClick={() => onSelect(object)}
      sx={{
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#e3f2fd' },
        '& .MuiTableCell-root': {
          paddingTop: '10px',
          paddingBottom: '10px',
        },
      }}
    >
      {columns.map((column) => {
        // Extract the value using the accessor
        const value = column.accessor.split('.').reduce((acc, key) => acc && acc[key], object) || 'N/A';
        return (
          <SummaryTableCell key={column.accessor} content={value} />
        );
      })}
    </TableRow>
  );
};

export default SummaryTableRow;
