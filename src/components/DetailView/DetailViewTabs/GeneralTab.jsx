import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const FieldTitle = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  backgroundColor: "#e0f7fa", // Light blue color
  color: theme.palette.text.primary,
  padding: "6px 12px",
  borderRadius: "20px",
  marginBottom: "8px",
  fontWeight: "bold",
}));

const Field = ({ title, value }) => (
  <Grid item xs={12} sm={6}>
    <FieldTitle variant="subtitle1">{title}:</FieldTitle>
    <Typography variant="body1" sx={{ marginLeft: 1 }}>
      {value}
    </Typography>
  </Grid>
);

const GeneralTab = ({ object }) => {
  if (!object) {
    return <Typography color="textSecondary">No item selected.</Typography>;
  }

  const { rawData } = object;

  const excludedKeys = [
    "coordonnees",
    "adresse",
    "ville",
    "nom_officiel",
    "identifiant",
    "refmer",
  ];

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* General Info */}
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            {object.name}
          </Typography>
        </Grid>

        <Field title="Adresse" value={object.address || "No info given"} />
        <Field title="Ville" value={object.city || "No info given"} />

        {/* Additional Museum Data */}
        {Object.keys(rawData)
          .filter((key) => !excludedKeys.includes(key))
          .map((key) => {
            const formattedKey = key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());
            const value =
              rawData[key] != null && rawData[key] !== ""
                ? Array.isArray(rawData[key])
                  ? rawData[key].join(", ")
                  : rawData[key]
                : "No info given";
            return <Field key={key} title={formattedKey} value={value} />;
          })}
      </Grid>
    </Paper>
  );
};

export default GeneralTab;
