import React, { useState, useCallback } from "react";
import DetailView from "./DetailView";
import { Box } from "@mui/material";
import { useMuseumImage } from "../../hooks/useMuseumImage";

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

  const tabConfigs = [
    {
      label: "Photo",
      fields: [],
    },
    {
      label: "Overview",
      fields: [
        { title: "Name", value: object?.name },
        { title: "Adresse", value: object?.address },
        { title: "Ville", value: object?.city },
        { title: "Notable Artists", value: object?.rawData?.personnage_phare },
        { title: "Museum Category", value: object?.rawData?.categorie },
        {
          title: "Genres",
          value: Array.isArray(object?.genre)
            ? object.genre.join(", ")
            : "Not available",
        },
      ],
    },
    {
      label: "Histoire",
      fields: [{ title: "Histoire", value: object?.rawData?.histoire }],
    },
    {
      label: "Œuvres",
      fields: [
        { title: "Artistes", value: object?.rawData?.artiste },
        { title: "Thèmes", value: object?.rawData?.themes },
      ],
    },
    {
      label: "Info",
      fields: [
        { title: "Adresse", value: object?.rawData?.adresse },
        { title: "Ville", value: object?.rawData?.ville },
        { title: "Téléphone", value: object?.rawData?.telephone },
        { title: "Site Web", value: object?.rawData?.url, type: "link" },
      ],
    },
  ];

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
        imageUrl={imageUrl}
        imageLoading={imageLoading}
        imageError={imageError}
        tabConfigs={tabConfigs}
      />
    </Box>
  );
};

export default DetailViewWrapper;
