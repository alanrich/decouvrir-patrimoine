import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const DetailView = ({ object }) => {
  return (
    <Card style={{ marginTop: '20px' }}>
      <CardHeader title="Detail View" />
      <CardContent>
        {object ? (
          <>
            <Typography variant="h5">{object.adresse || "No Address Provided"}</Typography>
            <Typography>INSEE Code: {object.code_insee || "Unknown Code"}</Typography>
            <Typography>Municipality: {object.commune || "Unknown Municipality"}</Typography>
            <Typography>Latitude: {object.geo_point_2d?.lat || "Unknown Latitude"}</Typography>
            <Typography>Longitude: {object.geo_point_2d?.lon || "Unknown Longitude"}</Typography>
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

