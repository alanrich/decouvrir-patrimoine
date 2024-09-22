import React from "react";
import { TableCell } from "@mui/material";

const SummaryTableCell = ({ isHeader = false, content }) => {
  return (
    <TableCell
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {isHeader ? <strong>{content}</strong> : content}
    </TableCell>
  );
};

export default SummaryTableCell;
