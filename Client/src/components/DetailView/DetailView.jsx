import React, { memo } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TabPanelContent from "./TabPanelContent";
import DetailViewModal from "./DetailViewModal";
import { useTheme } from "@mui/material/styles";

const DetailView = memo(
  ({
    object,
    tabValue,
    handleTabChange,
    handleModalOpen,
    handleModalClose,
    modalTabValue,
    handleModalTabChange,
    isModalOpen,
    imageUrl,
    imageLoading,
    imageError,
    wikiImages,
    wikiMainSection,
    historyData,
    wikiCollectionSection,
    artistNames,
    tabConfigs,
  }) => {
    const theme = useTheme();

    const tabStyles = {
      tabList: {
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
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
      fullscreenIcon: {
        marginLeft: "auto",
        padding: "4px",
        color: theme.palette.common.white,
        border: "none",
        outline: "none",
      },
    };

    if (!object) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: theme.shadows[1],
            borderRadius: theme.shape.borderRadius,
            border: `2px solid ${theme.palette.grey[300]}`,
            overflow: "hidden",
            mb: "8px",
            padding: theme.spacing(2),
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
            boxShadow: theme.shadows[1],
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.grey[300]}`,
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
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                {tabConfigs.map((tab, index) => (
                  <Tab
                    key={index}
                    style={{
                      ...tabStyles.tab,
                      ...(tabValue === index ? tabStyles.selectedTab : {}),
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
                <IconButton
                  aria-label="fullscreen"
                  onClick={isModalOpen ? handleModalClose : handleModalOpen}
                  sx={{
                    ...tabStyles.fullscreenIcon,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 16px",
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
                <TabPanel
                  key={index}
                  style={{
                    flex: 1,
                    overflow: "hidden",
                  }}
                >
                  {tab.label === "Photo" ? (
                    // Special handling for the Photo tab
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflowY: "auto",
                        height: "100%",
                        padding: theme.spacing(2),
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
                    <TabPanelContent
                      fields={tab.fields}
                      fontSize={theme.typography.body1.fontSize}
                    />
                  )}
                </TabPanel>
              ))}
            </Tabs>
          </Box>

          <Box
            sx={{
              flexShrink: 0,
              borderTop: `1px solid ${theme.palette.grey[100]}`,
              padding: "0px 16px",
              backgroundColor: theme.palette.primary.main,
              height: "32px",
              borderBottomLeftRadius: theme.shape.borderRadius,
              borderBottomRightRadius: theme.shape.borderRadius,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
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
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          modalTabValue={modalTabValue}
          handleModalTabChange={handleModalTabChange}
          imageUrl={imageUrl}
          imageLoading={imageLoading}
          imageError={imageError}
          artistNames={artistNames}
          wikiImages={wikiImages}
          wikiMainSection={wikiMainSection}
          historyData={historyData}
          wikiCollectionSection={wikiCollectionSection}
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
  modalTabValue: PropTypes.number.isRequired,
  handleModalTabChange: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  imageLoading: PropTypes.bool,
  imageError: PropTypes.string,
  wikiImages: PropTypes.arrayOf(PropTypes.string),
  wikiMainSection: PropTypes.string,
  historyData: PropTypes.object,
  wikiCollectionSection: PropTypes.string,
  artistNames: PropTypes.arrayOf(PropTypes.string),
  tabConfigs: PropTypes.array.isRequired,
};

export default DetailView;
