import React, { memo } from "react";
import { Typography, Box, IconButton, Modal } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
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
    alignItems: "center", // for the icon button
  },
  tab: {
    flex: 1,
    height: "100%", // added to address tab extending below tabslist
    padding: "0 16px", // removed 8px vertical padding, looks like tabs are extending below tabslist
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
  fullscreenIcon: {
    marginLeft: "auto",
    padding: "4px",
    color: "#FFFFFF",
    border: "none",
    outline: "none",
  },
};

const DetailView = memo(
  ({
    object,
    selectedDataSet,
    tabValue,
    handleTabChange,
    handleModalOpen,
    handleModalClose,
    isModalOpen,
  }) => {
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
            overflow: "hidden",
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
          { title: "Notable Artists", value: object.rawData.personnage_phare },
          { title: "Museum Category", value: object.rawData.categorie },
          {
            title: "Genres",
            value: Array.isArray(object.genre)
              ? object.genre.join(", ")
              : "Not available",
          },
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
      <>
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
              <IconButton
                aria-label="fullscreen"
                onClick={isModalOpen ? handleModalClose : handleModalOpen}
                sx={{
                  ...tabStyles.fullscreenIcon,
                  color: "#FFFFFF",
                }}
                size="small"
              >
                {isModalOpen ? (
                  <FullscreenExitIcon fontSize="small" />
                ) : (
                  <FullscreenIcon fontSize="small" />
                )}
              </IconButton>
            </TabList>

            {tabConfigs.map((tab, index) => (
              <TabPanel key={index} style={{ flex: 1, overflow: "hidden" }}>
                <TabPanelContent fields={tab.fields} />
              </TabPanel>
            ))}
          </Tabs>
        </Box>
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="detail-view-modal"
          aria-describedby="expanded-detail-view"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              height: "90%",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 0,
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Tabs
                selectedIndex={tabValue}
                onSelect={(index) => handleTabChange(null, index)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                forceRenderTabPanel
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

                  <IconButton
                    aria-label="exit fullscreen"
                    onClick={handleModalClose}
                    sx={{
                      ...tabStyles.fullscreenIcon,
                      color: "#FFFFFF",
                    }}
                    size="small"
                  >
                    <FullscreenExitIcon fontSize="small" />{" "}
                  </IconButton>
                </TabList>

                {tabConfigs.map((tab, index) => (
                  <TabPanel key={index} style={{ flex: 1, overflow: "hidden" }}>
                    <TabPanelContent fields={tab.fields} />
                  </TabPanel>
                ))}
              </Tabs>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }
);

DetailView.propTypes = {
  object: PropTypes.object,
  selectedDataSet: PropTypes.string.isRequired,
  tabValue: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

export default DetailView;
