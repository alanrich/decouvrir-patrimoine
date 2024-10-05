import React from "react";
import { Typography, Grid, Paper, Link } from "@mui/material";

const VisitorInfoTab = ({ object }) => {
  if (!object) {
    return <Typography color="textSecondary">No item selected.</Typography>;
  }

  const { rawData } = object;

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: "bold",
          letterSpacing: "0.25px",
          textTransform: "uppercase",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        Informations pour les Visiteurs
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" color="textSecondary">
            Adresse:
          </Typography>
          <Typography variant="body1">{rawData.adresse}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" color="textSecondary">
            Ville:
          </Typography>
          <Typography variant="body1">{rawData.ville}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" color="textSecondary">
            Téléphone:
          </Typography>
          <Typography variant="body1">{rawData.telephone || "N/A"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" color="textSecondary">
            Site Web:
          </Typography>
          {rawData.url ? (
            <Link href={`http://${rawData.url}`} target="_blank" rel="noopener">
              {rawData.url}
            </Link>
          ) : (
            <Typography variant="body1">N/A</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VisitorInfoTab;
