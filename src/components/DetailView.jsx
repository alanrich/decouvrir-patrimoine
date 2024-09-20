import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const DetailView = ({ object }) => {
  return (
    <Card style={{ marginTop: '20px' }}>
        <CardHeader title="Detail View" />
        <CardContent>
            {object ? (
                <>
                <Typography variant="h5">{object.name}</Typography>
                <Typography>Type: {object.type}</Typography>
                <Typography>Tasks: {object.tasks.join(", ")}</Typography>
                <Typography>Permissions: {object.permissions.join(", ")}</Typography>
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
