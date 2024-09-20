import React from 'react';
import { TableRow } from '@mui/material';
import SummaryTableCell from './SummaryTableCell';

const SummaryTableRow = ({ headerRow = false, object, onSelect }) => {
  if (headerRow) {
    return (
      <TableRow>
        <SummaryTableCell isHeader={true} content="Address" />
        <SummaryTableCell isHeader={true} content="INSEE Code" />
        <SummaryTableCell isHeader={true} content="Municipality" />
        <SummaryTableCell isHeader={true} content="Latitude" />
        <SummaryTableCell isHeader={true} content="Longitude" />
      </TableRow>
    );
    
  }
  if (!object) {
    return null; // Prevent rendering if object is undefined
  }

  return (
    <TableRow hover onClick={() => onSelect(object)}>
      <SummaryTableCell content={object.adresse || 'N/A'} />
      <SummaryTableCell content={object.code_insee || 'N/A'} />
      <SummaryTableCell content={object.commune || 'N/A'} />
      <SummaryTableCell content={object.geo_point_2d?.lat || 'N/A'} />
      <SummaryTableCell content={object.geo_point_2d?.lon || 'N/A'} />
    </TableRow>
  );
};
export default SummaryTableRow;
