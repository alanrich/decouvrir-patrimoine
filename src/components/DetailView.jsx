import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const DetailView = ({ object }) => {
  return (
    <Card style={{ marginTop: '20px' }}>
        <CardHeader title="Detail View" />
        <CardContent>
  {object ? (
    <>
      <Typography variant="h5">{object.name || "No Name Provided"}</Typography>
      <Typography>Type: {object.type || "Unknown Type"}</Typography>
      {/* Safely handle tasks and permissions, assuming they're arrays */}
      <Typography>Tasks: {object.tasks && Array.isArray(object.tasks) ? object.tasks.join(", ") : "No Tasks Available"}</Typography>
      <Typography>Permissions: {object.permissions && Array.isArray(object.permissions) ? object.permissions.join(", ") : "No Permissions Available"}</Typography>
    </>
  ) : (
    <Typography style={{ color: 'gray' }}>
      No item selected. Please select an item from the table.
    </Typography>
  )}
</CardContent>

    </Card>
  );
};

export default DetailView;
