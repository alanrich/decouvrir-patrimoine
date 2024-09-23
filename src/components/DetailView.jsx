import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import { styled } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import BusinessIcon from "@mui/icons-material/Business";
import PublicIcon from "@mui/icons-material/Public";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const ChromeTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    display: "none", // Hide the default MUI tab indicator
  },
  "& .Mui-selected": {
    color: "#1976d2", // Blue color for active tab text
    fontWeight: "bold",
  },
});

const ChromeTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minWidth: 72,
  marginRight: theme.spacing(0.5),
  padding: "0.5rem 1rem", // Padding for spacing between tabs
  borderRadius: "0.75rem 0.75rem 0 0",
  backgroundColor: "#e0e0e0",
  transition: "background-color 0.3s ease-in-out",
  // borderBottom: "3px solid transparent",

  "&.Mui-selected": {
    backgroundColor: "#ADD8E6",
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)", // Slight shadow to elevate active tab
    //borderBottom: "3px solid #ffffff", // Active tab border extending down
  },

  "&:hover": {
    backgroundColor: "#ADD8E6", // Hover effect for inactive tabs ==> Change color
  },
}));

// Tab Panel renders content based on which tab is selected
const TabPanel = ({ children, value, index }) => {
  return value === index ? <Box sx={{ padding: 2 }}>{children}</Box> : null;
};

const DetailView = ({ object }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
      {/* Tabs for DetailView */}
      <Box
        sx={{
          backgroundColor: "#f4f6f8",
          padding: "8px 8px",
          borderBottom: "1px solid #ddd",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          height: "3.5rem", // Set height of header area so active tab covers full height ==> Might complicate future styling work
        }}
      >
        <ChromeTabs value={tabValue} onChange={handleTabChange}>
          {["General", "Incidents", "Persons of Interest", "Notes"].map(
            (label, index) => (
              <ChromeTab
                key={label}
                label={label}
                selected={tabValue === index}
              />
            )
          )}
        </ChromeTabs>
      </Box>

      {/* Tab Content */}
      <CardContent sx={{ padding: "16px", flex: 1 }}>
        {object ? (
          <>
            {/* General Tab */}
            <TabPanel value={tabValue} index={0}>
              {object ? (
                <Grid container spacing={2}>
                  {/* Address */}
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LocationOnIcon
                      sx={{ color: "#1976d2", marginRight: "8px" }}
                    />
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
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
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
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <BusinessIcon
                      sx={{ color: "#1976d2", marginRight: "8px" }}
                    />
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
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
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
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <GpsFixedIcon
                      sx={{ color: "#1976d2", marginRight: "8px" }}
                    />
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
            </TabPanel>

            {/* Incidents Tab */}
            <TabPanel value={tabValue} index={1}>
              <Typography>Incidents data will be shown here...</Typography>
            </TabPanel>

            {/* Persons of Interest Tab */}
            <TabPanel value={tabValue} index={2}>
              <Typography>
                Persons of Interest data will be shown here...
              </Typography>
            </TabPanel>

            {/* Notes Tab */}
            <TabPanel value={tabValue} index={3}>
              <Typography>Notes data will be shown here...</Typography>
            </TabPanel>
          </>
        ) : (
          <Typography color="textSecondary">No item selected.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailView;
