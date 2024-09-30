import React from "react";
import { Grid, Typography } from "@mui/material";

const GeneralTab = ({ object }) => {
  if (!object) {
    return <Typography color="textSecondary">No item selected.</Typography>;
  }

  const { rawData, dataSet } = object;

  return (
    <Grid container spacing={2}>
      {dataSet === "videoprotection" && (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">{object.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Address: {object.address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">City: {object.city}</Typography>
          </Grid>
          {/* Add more fields as needed */}
        </>
      )}

      {dataSet === "museums" && (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">{object.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Address: {object.address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">City: {object.city}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Category: {rawData.categorie}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Themes: {rawData.domaine_thematique.join(", ")}
            </Typography>
          </Grid>
          {/* Add more fields as needed */}
        </>
      )}
    </Grid>
  );
};

GeneralTab.defaultProps = {
  object: null,
};

export default GeneralTab;
