import React, { memo } from "react";
import { Card, CardContent, Typography, Box, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import GeneralTab from "./DetailViewTabs/GeneralTab";
import HistoryTab from "./DetailViewTabs/HistoryTab";
import VisitorInfoTab from "./DetailViewTabs/VisitorInfoTab";
import ArtworksTab from "./DetailViewTabs/ArtworksTab";
import TabPanel from "./DetailViewTabs/TabPanel";

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

  "&.Mui-selected": {
    backgroundColor: "#ADD8E6",
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)", // Slight shadow to elevate active tab
  },

  "&:hover": {
    backgroundColor: "#ADD8E6", // Hover effect for inactive tabs
  },
}));

const DetailView = memo(
  ({ object, selectedDataSet, tabValue, handleTabChange }) => {
    const tabs = [
      { label: "Overview", component: <GeneralTab object={object} /> },
      { label: "Histoire", component: <HistoryTab object={object} /> },
      { label: "Œuvres", component: <ArtworksTab object={object} /> },
      {
        label: "Infos Visiteur",
        component: <VisitorInfoTab object={object} />,
      },
      // TODO: Add more tabs later, think what tabs should be called
    ];
    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          border: "1px solid #ddd",
          overflow: "auto",
          mb: "16px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f4f6f8",
            padding: "8px 8px",
            borderBottom: "1px solid #ddd",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            height: "3.5rem",
          }}
        >
          <ChromeTabs value={tabValue} onChange={handleTabChange}>
            {tabs.map((tab, index) => (
              <ChromeTab
                key={index}
                label={tab.label}
                // selected={tabValue === index}
              />
            ))}
          </ChromeTabs>
        </Box>

        <CardContent sx={{ padding: "16px", flex: 1 }}>
          {object ? (
            tabs.map((tab, index) => (
              <TabPanel key={index} value={tabValue} index={index}>
                {tab.component}
              </TabPanel>
            ))
          ) : (
            <Typography color="textSecondary">No item selected.</Typography>
          )}
        </CardContent>
      </Card>
    );
  }
);

DetailView.propTypes = {
  object: PropTypes.object,
  selectedDataSet: PropTypes.string.isRequired,
  tabValue: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};

export default DetailView;
