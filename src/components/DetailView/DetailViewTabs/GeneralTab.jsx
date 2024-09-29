import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import BusinessIcon from "@mui/icons-material/Business";
import PublicIcon from "@mui/icons-material/Public";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const GeneralTab = ({ object }) => {
  if (!object) {
    return <Typography color="textSecondary">No item selected.</Typography>;
  }

  return (
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
  );
};

GeneralTab.propTypes = {
  object: PropTypes.shape({
    adresse: PropTypes.string,
    code_insee: PropTypes.string,
    commune: PropTypes.string,
    geo_point_2d: PropTypes.shape({
      lat: PropTypes.number,
      lon: PropTypes.number,
    }),
  }),
};

GeneralTab.defaultProps = {
  object: null,
};

export default GeneralTab;
