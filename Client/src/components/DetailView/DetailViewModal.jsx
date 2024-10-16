import React from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PropTypes from "prop-types";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import TabPanelContent from "./TabPanelContent";
import { useTheme } from "@mui/material/styles";
import "react-tabs/style/react-tabs.css";

const DetailViewModal = ({
  isModalOpen,
  handleModalClose,
  tabConfigs,
  modalTabValue,
  handleModalTabChange,
  imageUrl,
  imageLoading,
  imageError,
  object,
}) => {
  const theme = useTheme();

  const tabStyles = {
    tabList: {
      display: "flex",
      backgroundColor: theme.palette.primary.main,
      height: "36px",
      margin: 0,
      padding: 0,
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
      alignItems: "center",
    },
    tab: {
      flex: 1,
      height: "100%",
      padding: "0 16px",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontWeight: "bold",
      fontSize: ".8125rem",
      border: "none",
      outline: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    selectedTab: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontWeight: "bold",
      fontSize: ".8125rem",
    },
  };

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
          bgcolor: theme.palette.grey[400],
          boxShadow: 24,
          p: 2,
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Close button in the top right corner */}
        <IconButton
          aria-label="close modal"
          onClick={handleModalClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: theme.palette.common.black,
          }}
        >
          <FullscreenExitIcon fontSize="small" />
        </IconButton>

        {/* Left Panel for Tabs and Content with Card-like styling */}
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: theme.spacing(2),
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "90%",
              boxShadow: theme.shadows[1],
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.background.paper,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Tabs
              selectedIndex={modalTabValue}
              onSelect={(index) => handleModalTabChange(null, index)}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
              forceRenderTabPanel
            >
              <TabList
                style={{
                  ...tabStyles.tabList,
                  padding: "0",
                  margin: "0",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: theme.palette.primary.main,
                  borderBottom: "none",
                }}
              >
                {filteredTabConfigs.map((tab, index) => (
                  <Tab
                    key={index}
                    style={{
                      ...tabStyles.tab,
                      ...(modalTabValue === index ? tabStyles.selectedTab : {}),
                      padding: "0",
                      margin: "0",
                      height: "100%",
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
              </TabList>

              {filteredTabConfigs.map((tab, index) => (
                <TabPanel
                  key={index}
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    ...(["Histoire", "Œuvres"].includes(tab.label) && {
                      maxWidth: "85%",
                      margin: "0 auto",
                    }),
                  }}
                >
                  <TabPanelContent
                    fields={tab.fields}
                    isModal={true}
                    fontSize={theme.typography.body1.fontSize}
                  />
                </TabPanel>
              ))}
            </Tabs>
          </Box>
        </Box>

        {/* Right Panel for the Image */}
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing(2),
          }}
        >
          {imageLoading && <Typography>Loading image...</Typography>}
          {imageError && <Typography>Error: {imageError}</Typography>}
          {imageUrl && (
            <>
              <img
                src={imageUrl}
                alt="Museum Image"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: theme.shape.borderRadius,
                }}
              />
              {/* Display the museum name under the photo */}
              {object?.name && (
                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {object.name}
                </Typography>
              )}
            </>
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
  modalTabValue: PropTypes.number.isRequired,
  handleModalTabChange: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  imageLoading: PropTypes.bool,
  imageError: PropTypes.string,
  object: PropTypes.object.isRequired,
};

export default DetailViewModal;
