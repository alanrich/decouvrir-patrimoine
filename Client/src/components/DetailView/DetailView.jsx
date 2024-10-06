import React, { memo } from "react";
import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TabPanelContent from "./TabPanelContent";

const tabStyles = {
  tabList: {
    display: "flex",
    backgroundColor: "#1976d2",
    borderBottom: "1px solid #ddd",
    height: "36px",
    margin: 0,
    padding: 0,
    position: "sticky",
    top: 0,
    zIndex: 2,
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
    if (!object) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            border: "2px solid #ddd",
            overflow: "hidden", // overflow: "auto",
            mb: "8px",
            padding: "16px",
            height: "100%",
          }}
        >
          <Typography color="textSecondary">No item selected.</Typography>
        </Box>
      );
    }
    const tabConfigs = [
      {
        label: "Overview",
        fields: [
          { title: "Name", value: object.name },
          { title: "Adresse", value: object.address },
          { title: "Ville", value: object.city },
          // Add more fields later after refactor complete
        ],
      },
      {
        label: "Histoire",
        fields: [{ title: "Histoire", value: object.rawData.histoire }],
      },
      {
        label: "Œuvres",
        fields: [
          { title: "Artistes", value: object.rawData.artiste },
          { title: "Thèmes", value: object.rawData.themes },
        ],
      },
      {
        label: "Info",
        fields: [
          { title: "Adresse", value: object.rawData.adresse },
          { title: "Ville", value: object.rawData.ville },
          { title: "Téléphone", value: object.rawData.telephone },
          { title: "Site Web", value: object.rawData.url, type: "link" },
        ],
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
          height: "100%",
          overflow: "hidden",
          mb: "8px",
        }}
      >
        <Tabs
          selectedIndex={tabValue}
          onSelect={(index) => handleTabChange(null, index)}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <TabList style={tabStyles.tabList}>
            {tabConfigs.map((tab, index) => (
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

          {tabConfigs.map((tab, index) => (
            <TabPanel key={index} style={{ flex: 1, overflow: "hidden" }}>
              <TabPanelContent fields={tab.fields} />
            </TabPanel>
          ))}
        </Tabs>
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
