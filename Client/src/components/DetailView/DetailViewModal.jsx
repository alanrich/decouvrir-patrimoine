import React from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PropTypes from "prop-types";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
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

const DetailViewModal = ({
  isModalOpen,
  handleModalClose,
  tabConfigs,
  tabValue,
  handleTabChange,
  imageUrl,
  imageLoading,
  imageError,
}) => {
  const filteredTabConfigs = tabConfigs.filter((tab) => tab.label !== "Photo");

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="detail-view-modal"
      aria-describedby="expanded-detail-view"
    >
      <Box
        sx={{
          position: "absolute",
          padding: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "90%",
          bgcolor: "#e0e0e0", // Light grey background for the modal
          boxShadow: 24,
          p: 2,
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Left Panel for Tabs and Content with Card-like styling */}
        <Box
          sx={{
            flex: "1", // Left panel takes up half of the modal
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
            height: "100%", // Full height of the panel
            padding: "16px", // Equal padding on left and right
          }}
        >
          <Box
            sx={{
              width: "100%", // Ensure full width
              height: "90%", // Increased height to 90%
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Elevated shadow
              borderRadius: "8px", // Rounded corners
              backgroundColor: "#fff", // White card background
              padding: "16px", // Internal padding for the card content
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
                {filteredTabConfigs.map((tab, index) => (
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
                  <FullscreenExitIcon fontSize="small" />
                </IconButton>
              </TabList>

              {filteredTabConfigs.map((tab, index) => (
                <TabPanel
                  key={index}
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    ...(tab.label === "Histoire" && {
                      maxWidth: "85%", // Extend text width for Histoire
                      margin: "0 auto", // Center the text
                    }),
                  }}
                >
                  <TabPanelContent fields={tab.fields} isModal={true} />
                </TabPanel>
              ))}
            </Tabs>
          </Box>
        </Box>

        {/* Right Panel for the Image */}
        <Box
          sx={{
            flex: "1", // Right panel takes up half of the modal
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px", // Equal padding for spacing
          }}
        >
          {imageLoading && <Typography>Loading image...</Typography>}
          {imageError && <Typography>Error: {imageError}</Typography>}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Museum Image"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

DetailViewModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  tabConfigs: PropTypes.array.isRequired,
  tabValue: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  imageLoading: PropTypes.bool,
  imageError: PropTypes.string,
};

export default DetailViewModal;
