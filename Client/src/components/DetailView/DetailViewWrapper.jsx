import React, { useState, useCallback } from "react";
import DetailView from "./DetailView";
import { Box } from "@mui/material";
import { useMuseumImage } from "../../hooks/useMuseumImage"; // Import the new hook

const DetailViewWrapper = ({ object, selectedDataSet }) => {
  const [tabValue, setTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use the museum name to fetch the Wikipedia image
  const museumName = object?.name;
  const {
    imageUrl,
    loading: imageLoading,
    error: imageError,
  } = useMuseumImage(museumName);

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
        imageUrl={imageUrl} // Pass the image URL to DetailView
        imageLoading={imageLoading}
        imageError={imageError}
      />
    </Box>
  );
};

export default DetailViewWrapper;
