import React, { useState } from 'react';
import SummaryTable from './SummaryTable';

const SummaryTableWrapper = ({ domainObjects, onSelect }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  return (
    <SummaryTable
      domainObjects={domainObjects}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onSelect={onSelect}
    />
  );
};

export default SummaryTableWrapper;