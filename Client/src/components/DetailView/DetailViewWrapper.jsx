import React, { useState, useCallback } from "react";
import DetailView from "./DetailView";
import { Box } from "@mui/material";
import { useWikiImage } from "../../hooks/useWikiImage";

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

  // Fetch wiki images for artists (for the Œuvres tab)
  // DetailViewWrapper.jsx

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
                value: object?.rawData?.personnage_phare,
              },
              { title: "Category", value: object?.rawData?.categorie },
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
            fields: [{ title: "Histoire", value: object?.rawData?.histoire }],
          },
          {
            label: "Œuvres",
            fields: [
              {
                title: "Artistes",
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
      case "festivals":
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
              { title: "Genre", value: object?.genre },
              {
                title: "Site Web",
                value: object?.rawData?.site_internet_du_festival,
                type: "URL",
              },
              { title: "Email", value: object?.rawData?.adresse_e_mail },
            ],
          },
          {
            label: "Détails",
            fields: [
              {
                title: "Discipline",
                value: object?.rawData?.discipline_dominante,
              },
              {
                title: "Échelle",
                value: object?.rawData?.envergure_territoriale,
              },
            ],
          },
        ];
      case "jardins":
        return [
          {
            label: "Photo",
            fields: [],
          },
          {
            label: "Aperçu",
            fields: [
              { title: "Nom", value: object?.name },
              { title: "Adresse", value: object?.rawData?.adresse_complete },
              { title: "Ville", value: object?.city },
              {
                title: "Types",
                value: Array.isArray(object?.rawData?.types)
                  ? object.rawData.types.join(", ")
                  : "Non disponible",
              },
              { title: "Description", value: object?.rawData?.description },
            ],
          },
          {
            label: "Coordonnées",
            fields: [
              {
                title: "Site Web",
                value: object?.rawData?.site_internet_et_autres_liens?.[0],
                type: "URL",
              },
              {
                title: "Accessible au Public",
                value: Array.isArray(object?.rawData?.accessible_au_public)
                  ? object.rawData.accessible_au_public.join(", ")
                  : "Non disponible",
              },
            ],
          },
        ];
      case "maisonsDesIllustres":
        return [
          {
            label: "Photo",
            fields: [],
          },
          {
            label: "Aperçu",
            fields: [
              { title: "Nom", value: object?.name },
              { title: "Adresse", value: object?.rawData?.adresse_complete },
              { title: "Ville", value: object?.city },
              {
                title: "Personne Célèbre",
                value: object?.rawData?.auteur_nom_de_l_illustre,
              },
              {
                title: "Types",
                value: Array.isArray(object?.rawData?.types)
                  ? object.rawData.types.join(", ")
                  : "Non disponible",
              },
              { title: "Description", value: object?.rawData?.description },
            ],
          },
          {
            label: "Coordonnées",
            fields: [
              {
                title: "Site Web",
                value: object?.rawData?.site_internet_et_autres_liens,
                type: "URL",
              },
              {
                title: "Accessible au Public",
                value: Array.isArray(object?.rawData?.accessible_au_public)
                  ? object.rawData.accessible_au_public.join(", ")
                  : "Non disponible",
              },
            ],
          },
        ];
      case "architectureContemporaines":
        return [
          {
            label: "Photo",
            fields: [],
          },
          {
            label: "Aperçu",
            fields: [
              { title: "Nom", value: object?.name },
              { title: "Adresse", value: object?.rawData?.adresse_normalisee },
              { title: "Ville", value: object?.city },
              {
                title: "Dénominations",
                value: Array.isArray(object?.rawData?.denominations)
                  ? object.rawData.denominations.join(", ")
                  : "Non disponible",
              },
              {
                title: "Architecte",
                value: object?.rawData?.auteur_de_l_edifice,
              },
              {
                title: "Date de l'Étiquette",
                value: object?.rawData?.date_de_label,
              },
            ],
          },
          {
            label: "Description Historique",
            fields: [
              {
                title: "Description",
                value: object?.rawData?.description_historique,
              },
            ],
          },
        ];
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
        artistNames={artistNames}
        tabConfigs={tabConfigs}
      />
    </Box>
  );
};

export default DetailViewWrapper;
