import React, { memo } from "react";
import { CardContent, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GeneralTab from "./DetailViewTabs/GeneralTab";
import HistoryTab from "./DetailViewTabs/HistoryTab";
import VisitorInfoTab from "./DetailViewTabs/VisitorInfoTab";
import ArtworksTab from "./DetailViewTabs/ArtworksTab";

const tabStyles = {
  tabList: {
    display: "flex",
    backgroundColor: "#1976d2",
    borderBottom: "1px solid #ddd",
    height: "36px",
    margin: 0,
    padding: 0,
  },
  tab: {
    flex: 1,
    padding: "8px 16px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#1976d2",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: ".8125rem",
    border: "none",
    outline: "none",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTab: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    fontWeight: "bold",
    fontSize: ".8125rem",
  },
};

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
    ];

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          border: "1px solid #ddd",
          overflow: "auto",
          mb: "8px",
        }}
      >
        <Tabs
          selectedIndex={tabValue}
          onSelect={(index) => handleTabChange(null, index)}
        >
          <TabList style={tabStyles.tabList}>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                style={{
                  ...tabStyles.tab,
                  ...(tabValue === index ? tabStyles.selectedTab : {}),
                }}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          {tabs.map((tab, index) => (
            <TabPanel key={index}>{tab.component}</TabPanel>
          ))}
        </Tabs>

        {/* Removed duplicated TabPanel rendering */}
        <CardContent sx={{ padding: "16px", flex: 1 }}>
          {!object && (
            <Typography color="textSecondary">No item selected.</Typography>
          )}
        </CardContent>
      </Box>
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
