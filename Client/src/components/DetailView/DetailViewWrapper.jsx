import React, { useState, useCallback } from "react";
import DetailView from "./DetailView";
import { Box } from "@mui/material";

const DetailViewWrapper = ({ object, selectedDataSet }) => {
  const [tabValue, setTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DetailView
        object={object}
        selectedDataSet={selectedDataSet}
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
        isModalOpen={isModalOpen}
      />
    </Box>
  );
};

export default DetailViewWrapper;
