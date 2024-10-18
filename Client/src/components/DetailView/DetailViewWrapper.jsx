import React, { useState, useCallback } from "react";
import DetailView from "./DetailView";
import { Box } from "@mui/material";
import { useWikiImage } from "../../hooks/wikipedia-hooks/useWikiImage";
import { useWikiAdditionalImages } from "../../hooks/wikipedia-hooks/useWikiAdditionalImages";
import { useWikiMainSection } from "../../hooks/wikipedia-hooks/useWikiMainSection";
import { useWikiHistorySection } from "../../hooks/wikipedia-hooks/useWikiHistorySection";
import { useWikiCollectionSection } from "../../hooks/wikipedia-hooks/useWikiCollectionSection";

const DetailViewWrapper = ({ object, selectedDataSet }) => {
  const [tabValue, setTabValue] = useState(0);
  const [modalTabValue, setModalTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch wiki image based on the object's name
  const objectName = object?.name;

  const {
    imageUrl,
    loading: imageLoading,
    error: imageError,
  } = useWikiImage(objectName);
  const {
    wikiImages,
    loading: imagesLoading,
    error: imagesError,
  } = useWikiAdditionalImages(objectName);
  const {
    wikiMainSection,
    loading: mainLoading,
    error: mainError,
  } = useWikiMainSection(objectName);
  const {
    historyData,
    loading: historyLoading,
    error: historyError,
  } = useWikiHistorySection(objectName);
  const {
    wikiCollectionSection,
    loading: collectionLoading,
    error: collectionError,
  } = useWikiCollectionSection(objectName);

  // Fetch wiki images for artists (for the Œuvres tab)

  const artistNames = React.useMemo(() => {
    if (!object?.rawData?.artiste) return [];

    if (Array.isArray(object.rawData.artiste)) {
      return object.rawData.artiste;
    }

    if (typeof object.rawData.artiste === "string") {
      return object.rawData.artiste
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name !== "");
    }

    return [];
  }, [object?.rawData?.artiste]);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setModalTabValue(0);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalTabChange = useCallback((event, newValue) => {
    setModalTabValue(newValue);
  }, []);

  const getTabConfigsForDataset = (object, selectedDataSet) => {
    switch (selectedDataSet) {
      case "museums":
        return [
          {
            label: "Photo",
            fields: [],
          },
          {
            label: "Aperçu",
            fields: [
              { title: "Nom", value: object?.name },
              { title: "Adresse", value: object?.address },
              { title: "Ville", value: object?.city },
              {
                title: "Artistes Notables",
                value: object?.rawData?.artiste,
              },
              { title: "Catégorie", value: object?.rawData?.categorie },
              {
                title: "Thèmes",
                value: Array.isArray(object?.rawData?.domaine_thematique)
                  ? object.rawData.domaine_thematique.join(", ")
                  : "Non Disponible",
              },
            ],
          },
          {
            label: "Histoire",
            fields: [
              { title: "Histoire", value: object?.rawData?.histoire },
              // Removed the "Histoire Wikipedia" field from here
            ],
          },
          {
            label: "Œuvres",
            fields: [
              {
                title: "Artistes Notables",
                value: object?.rawData?.artiste,
                type: "wikiLink",
              },
              { title: "Thèmes", value: object?.rawData?.themes },
            ],
          },
          {
            label: "Coordonnées",
            fields: [
              {
                title: "Numéro de Téléphone",
                value: object?.rawData?.telephone,
              },
              { title: "Site Web", value: object?.rawData?.url, type: "URL" },
            ],
          },
        ];
      // Include other cases as needed
      default:
        return [];
    }
  };

  const tabConfigs = getTabConfigsForDataset(object, selectedDataSet);

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
        modalTabValue={modalTabValue}
        handleModalTabChange={handleModalTabChange}
        imageUrl={imageUrl}
        imageLoading={imageLoading}
        imageError={imageError}
        wikiImages={wikiImages}
        wikiMainSection={wikiMainSection}
        historyData={historyData}
        wikiCollectionSection={wikiCollectionSection}
        artistNames={artistNames}
        tabConfigs={tabConfigs}
      />
    </Box>
  );
};

export default DetailViewWrapper;
