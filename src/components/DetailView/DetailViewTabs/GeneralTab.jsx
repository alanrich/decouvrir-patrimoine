import React from "react";
import { Grid, Typography } from "@mui/material";

const GeneralTab = ({ object }) => {
  if (!object) {
    return <Typography color="textSecondary">No item selected.</Typography>;
  }

  const { rawData, dataSet } = object;
  // TODO: determine which data should be excluded from general tab
  const excludedKeys = [
    "coordonnees",
    "adresse",
    "ville",
    "nom_officiel",
    "identifiant",
    "refmer",
  ];
  // TODO: Implement a filter to either remove empty fields or display "no info given"

  return (
    <Grid container spacing={2}>
      {dataSet === "videoprotection" && (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">{object.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Adresse: {object.address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Ville: {object.city}</Typography>
          </Grid>
          {/* Add more fields as needed */}
        </>
      )}

      {dataSet === "museums" && (
        <>
          {/* General Info that Each DataSet ought to display */}
          <Grid item xs={12}>
            <Typography variant="h6">{object.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Adresse:{" "}
            </Typography>
            <Typography variant="body1">{object.address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Ville:{" "}
            </Typography>
            <Typography variant="body1">{object.city}</Typography>
          </Grid>

          {/* Data Specific to Museum DataSet */}
          {Object.keys(rawData)
            .filter((key) => !excludedKeys.includes(key))
            .map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="subtitle1" color="textSecondary">
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                  :
                </Typography>
                <Typography variant="body1">
                  {Array.isArray(rawData[key])
                    ? rawData[key].join(", ")
                    : rawData[key]}
                </Typography>
              </Grid>
            ))}
        </>
      )}
    </Grid>
  );
};

GeneralTab.defaultProps = {
  object: null,
};

export default GeneralTab;
