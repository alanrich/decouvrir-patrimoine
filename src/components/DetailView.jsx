import React from "react";
import { Card, CardContent, Typography, Box, Grid, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import BusinessIcon from "@mui/icons-material/Business";
import PublicIcon from "@mui/icons-material/Public";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const DetailView = ({ object }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1, // Allow the component to grow and fill the parent
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        border: "1px solid #ddd",
        overflow: "auto",
      }}
    >
      {/* Header for DetailView */}
      <Box
        sx={{
          backgroundColor: "#f4f6f8",
          padding: "8px 16px",
          borderBottom: "1px solid #ddd",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "1rem", fontWeight: 500, color: "#333" }}
        >
          Detail View
        </Typography>
      </Box>

      <CardContent sx={{ padding: "16px", flex: 1 }}>
        {object ? (
          <Grid container spacing={2}>
            {/* Address */}
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <LocationOnIcon sx={{ color: "#1976d2", marginRight: "8px" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Address:
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginLeft: "8px", fontWeight: "bold" }}
              >
                {object.adresse || "N/A"}
              </Typography>
            </Grid>

            {/* INSEE Code */}
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <MapIcon sx={{ color: "#1976d2", marginRight: "8px" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                INSEE Code:
              </Typography>
              <Chip
                label={object.code_insee || "N/A"}
                sx={{
                  marginLeft: "8px",
                  backgroundColor: "#e0f7fa",
                  fontWeight: "bold",
                }}
              />
            </Grid>

            {/* Municipality */}
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <BusinessIcon sx={{ color: "#1976d2", marginRight: "8px" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Municipality:
              </Typography>
              <Chip
                label={object.commune || "N/A"}
                sx={{
                  marginLeft: "8px",
                  backgroundColor: "#e8eaf6",
                  fontWeight: "bold",
                }}
              />
            </Grid>

            {/* Latitude */}
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <PublicIcon sx={{ color: "#1976d2", marginRight: "8px" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Latitude:
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginLeft: "8px", fontWeight: "bold" }}
              >
                {object.geo_point_2d?.lat || "N/A"}
              </Typography>
            </Grid>

            {/* Longitude */}
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <GpsFixedIcon sx={{ color: "#1976d2", marginRight: "8px" }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Longitude:
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginLeft: "8px", fontWeight: "bold" }}
              >
                {object.geo_point_2d?.lon || "N/A"}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography color="textSecondary">No item selected.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailView;
