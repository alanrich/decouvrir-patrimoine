import React from "react";
import { Typography, Paper } from "@mui/material";

const ArtworksTab = ({ object }) => {
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
        Œuvres Notables
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Artistes:
      </Typography>
      <Typography variant="body1">{rawData.artiste || "N/A"}</Typography>

      <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 2 }}>
        Thèmes:
      </Typography>
      <Typography variant="body1">{rawData.themes || "N/A"}</Typography>
    </Paper>
  );
};

export default ArtworksTab;
