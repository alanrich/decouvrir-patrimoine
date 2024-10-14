import React, { memo } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // the default styles are creating the inconsistency in tabpanel height
import TabPanelContent from "./TabPanelContent";
import DetailViewModal from "./DetailViewModal";

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
    alignItems: "center",
  },
  tab: {
    flex: 1,
    height: "100%",
    padding: "0 16px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#1976d2",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: ".8125rem",
    border: "none",
    outline: "none",
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
    tabValue,
    handleTabChange,
    handleModalOpen,
    handleModalClose,
    isModalOpen,
    imageUrl,
    imageLoading,
    imageError,
    tabConfigs,
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
            overflow: "hidden",
            height: "100%",
            mb: "8px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <Tabs
              selectedIndex={tabValue}
              onSelect={(index) => handleTabChange(null, index)}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <TabList
                style={{
                  ...tabStyles.tabList,
                  padding: "0",
                  margin: "0",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#1976d2",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {tabConfigs.map((tab, index) => (
                  <Tab
                    key={index}
                    style={{
                      ...tabStyles.tab,
                      ...(tabValue === index ? tabStyles.selectedTab : {}),
                      padding: "0", // Override default padding
                      margin: "0", // Override default margin
                      height: "100%", // Ensure full height to create a uniform tablist unaffected by FullscreenIcon
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      position: "static",
                      bottom: "auto",
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
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px", // Match the Tabs' horizontal padding
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
                  {tab.label === "Photo" ? (
                    // Special handling for the Photo tab
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflowY: "auto", // Make photo tab scrollable
                        height: "100%", // Full height available
                        padding: "16px",
                      }}
                    >
                      {imageLoading && (
                        <Typography>Loading image...</Typography>
                      )}
                      {imageError && (
                        <Typography>Error: {imageError}</Typography>
                      )}
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={`${object.name} Image`}
                          style={{ maxWidth: "100%", maxHeight: "400px" }}
                        />
                      )}
                    </Box>
                  ) : (
                    <TabPanelContent fields={tab.fields} fontSize="0.875rem" />
                  )}
                </TabPanel>
              ))}
            </Tabs>
          </Box>

          <Box
            sx={{
              flexShrink: 0,
              borderTop: "1px solid #ddd",
              padding: "0px 16px",
              backgroundColor: "#808080",
              height: "32px",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {object.name || "No Name Available"}
            </Typography>
          </Box>
        </Box>

        <DetailViewModal
          tabConfigs={tabConfigs}
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          imageUrl={imageUrl}
          imageLoading={imageLoading}
          imageError={imageError}
          object={object}
        />
      </>
    );
  }
);

DetailView.propTypes = {
  object: PropTypes.object,
  tabValue: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  imageLoading: PropTypes.bool,
  imageError: PropTypes.string,
  tabConfigs: PropTypes.array.isRequired,
};

export default DetailView;
