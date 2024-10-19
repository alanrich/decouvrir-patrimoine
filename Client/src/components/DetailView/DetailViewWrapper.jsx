import React, { useState, useCallback } from "react";
import DetailView from "./DetailView";
import { Box } from "@mui/material";
import { useWikiImage } from "../../hooks/wikipedia-hooks/useWikiImage";
import { useWikiAdditionalImages } from "../../hooks/wikipedia-hooks/useWikiAdditionalImages";
import { useWikiPageContent } from "../../hooks/wikipedia-hooks/useWikiPageContent";
import { useWikiCollectionSection } from "../../hooks/wikipedia-hooks/useWikiCollectionSection";

const DetailViewWrapper = ({ object, selectedDataSet }) => {
  const [tabValue, setTabValue] = useState(0);
  const [modalTabValue, setModalTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Adjust objectName based on dataset
  const objectName =
    object?.name ||
    object?.rawData?.nom ||
    object?.rawData?.nom_du_jardin ||
    object?.rawData?.nom_du_festival;

  const {
    imageUrl,
    loading: imageLoading,
    error: imageError,
  } = useWikiImage(objectName);
  const {
    wikiPageContentData,
    loading: wikiPageContentLoading,
    error: wikiPageContentError,
  } = useWikiPageContent(objectName);
  const {
    wikiCollectionSection,
    loading: collectionLoading,
    error: collectionError,
  } = useWikiCollectionSection(objectName);

  // Fetch wiki images for artists (for the Œuvres tab)

  const artistNames = React.useMemo(() => {
    // If 'artiste' is null or undefined, return the fallback message
    if (!object?.rawData?.artiste) {
      return ["Aucune information sur des artistes notables n'est disponible."];
    }

    // If 'artiste' is an array, return it as is (even if it's empty)
    if (Array.isArray(object.rawData.artiste)) {
      return object.rawData.artiste;
    }

    // If 'artiste' is a string, split by comma and clean up the names
    if (typeof object.rawData.artiste === "string") {
      return object.rawData.artiste
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name !== "");
    }

    // Default to an empty array if none of the conditions are met
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
              { title: "Nom", value: object?.name || "Non disponible" },
              { title: "Adresse", value: object?.address || "Non disponible" },
              { title: "Ville", value: object?.city || "Non disponible" },
              {
                title: "Artistes Notables",
                value: object?.rawData?.artiste || "Non disponible",
              },
              {
                title: "Catégorie",
                value: object?.rawData?.categorie || "Non disponible",
              },
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
              {
                title: "Histoire",
                value: object?.rawData?.histoire || "Non disponible",
              },
            ],
          },
          {
            label: "Œuvres",
            fields: [
              {
                title: "Artistes Notables",
                value: object?.rawData?.artiste || "Non disponible",
                type: "wikiLink",
              },
              {
                title: "Thèmes",
                value: object?.rawData?.themes || "Non disponible",
              },
            ],
          },
          {
            label: "Coordonnées",
            fields: [
              { title: "Ville", value: object?.city || "Non disponible" },
              { title: "Adresse", value: object?.address || "Non disponible" },
              {
                title: "Site Web",
                value: object?.rawData?.url || "Non Disponible",
                type: "URL",
              },
              {
                title: "Numéro de Téléphone",
                value: object?.rawData?.telephone || "Non disponible",
              },
            ],
          },
        ];
      default:
        return [
          {
            label: "Photo",
            fields: [],
          },
          {
            label: "Aperçu",
            fields: [
              {
                title: "Nom",
                value:
                  object?.rawData?.nom ||
                  object?.rawData?.nom_du_jardin ||
                  object?.rawData?.nom_du_festival ||
                  "Non disponible",
              },
              {
                title: "Catégorie",
                value: Array.isArray(object?.rawData?.types)
                  ? object.rawData.types.join(", ")
                  : object?.rawData?.types ||
                    object?.rawData?.discipline_dominante ||
                    "Non disponible",
              },
              {
                title: "Ville",
                value:
                  object?.rawData?.commune ||
                  object?.rawData?.commune_principale_de_deroulement ||
                  "Non disponible",
              },
              {
                title: "Adresse",
                value:
                  object?.rawData?.adresse_complete ||
                  object?.rawData?.adresse_postale ||
                  "Non disponible",
              },
            ],
          },
          {
            label: "Description",
            fields: [
              {
                title: "Description",
                value: object?.rawData?.description || "Non disponible",
              },
              {
                title: "Histoire",
                value: object?.rawData?.histoire || "Non disponible",
              },
              {
                title: "Année de Création",
                value:
                  object?.rawData?.annee_de_creation_du_festival ||
                  object?.rawData?.annee_d_obtention ||
                  "Non disponible",
              },
            ],
          },
          {
            label: "Coordonnées",
            fields: [
              {
                title: "Région",
                value:
                  object?.rawData?.region ||
                  object?.rawData?.region_principale_de_deroulement ||
                  "Non disponible",
              },
              {
                title: "Ville",
                value:
                  object?.rawData?.commune ||
                  object?.rawData?.commune_principale_de_deroulement ||
                  "Non disponible",
              },
              {
                title: "Adresse",
                value:
                  object?.rawData?.adresse_complete ||
                  object?.rawData?.adresse_postale ||
                  "Non disponible",
              },
              {
                title: "Site Web",
                value:
                  object?.rawData?.site_internet_et_autres_liens ||
                  "Non Disponsible",
                type: "URL",
              },
              {
                title: "Email",
                value: object?.rawData?.adresse_e_mail || "Non disponible",
              },
            ],
          },
        ];
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
        wikiPageContentData={wikiPageContentData}
        wikiCollectionSection={wikiCollectionSection}
        artistNames={artistNames}
        tabConfigs={tabConfigs}
      />
    </Box>
  );
};

export default DetailViewWrapper;
