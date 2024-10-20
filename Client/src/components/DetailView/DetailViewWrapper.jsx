import React, { useState, useCallback } from "react";
import DetailView from "./DetailView";
import { Box } from "@mui/material";
import { useWikiImage } from "../../hooks/wikipedia-hooks/useWikiImage";
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

  // TODO: Pass loading and error values to DetailView
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
                title: "Site web",
                value: object?.rawData?.url || "Non Disponible",
                type: "URL",
              },
              {
                title: "Numéro de téléphone",
                value: object?.rawData?.telephone || "Non disponible",
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
              { title: "Nom", value: object?.name || "Non disponible" },
              { title: "Ville", value: object?.city || "Non disponible" },
              {
                title: "Genre de jardin",
                value: object?.genre || "Non disponible",
              },
              {
                title: "Description",
                value: object?.description || "Non disponible",
              },

              { title: "Site Web", value: object?.website || "Non disponible" },
              {
                title: "Auteur nom de l'illustre",
                value: object?.famousPerson || "Non disponible",
              },
              {
                title: "Année d'obtenation",
                value: object?.inauguralYear || "Non disponible",
              },
            ],
          },
          {
            label: "Coordonnées",
            fields: [
              { title: "Adresse", value: object?.address || "Non disponible" },
              { title: "Ville", value: object?.city || "Non disponible" },
              { title: "Région", value: object?.region || "Non disponible" },
              {
                title: "Département",
                value: object?.department || "Non disponible",
              },
              {
                title: "Coordonnées géographiques",
                value:
                  [object?.latitutde, object?.longitude] || "Non disponible",
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
              { title: "Nom", value: object?.name || "Non disponible" },
              { title: "Ville", value: object?.city || "Non disponible" },
              { title: "Adresse", value: object?.address || "Non disponible" },
              {
                title: "Description du bâtiment",
                value: object?.description || "Non disponible",
              },
              {
                title: "Précisions Sur l'intérêt",
                value: object?.interestingFacts || "Non disponible",
              },
              {
                title: "Remarquables de l'edifice",
                value: object?.remarkableElements || "Non disponible",
              },
              {
                title: "Materieux du gros œuvre",
                value: object?.structuralMaterial || "Non disponible",
              },
              {
                title: "Statut juridique du proprietaire",
                value: object?.publicOrPrivate || "Non disponible",
              },
            ],
          },
          {
            label: "Histoire",
            fields: [
              {
                title: "Histoire du bâtiment",
                value: object?.historicalDescription || "Non disponible",
              },
              {
                title: "Date de label",
                value: object?.designationDate || "Non disponible",
              },
              {
                title: "Architecte",
                value: object?.architect || "Non disponible",
              },
              {
                title: "Siecle de la campagne principale de construction",
                value: object?.constructionCentury || "Non disponible",
              },
              {
                title: "Siecle de la campagne secondaire de construction",
                value: object?.renovationCentury || "Non disponible",
              },
              {
                title: "Datation de l'edifice",
                value: object?.yearCreated || "Non disponible",
              },
            ],
          },
          {
            label: "Coordonnées",
            fields: [
              { title: "Adresse", value: object?.address || "Non disponible" },
              { title: "Ville", value: object?.city || "Non disponible" },
              { title: "Région", value: object?.region || "Non disponible" },
              {
                title: "Département",
                value: object?.department || "Non disponible",
              },
              {
                title: "Références Cadastrales",
                value: object?.referencesCadastrales || "Non disponible",
              },
              {
                title: "Coordonnées géographiques",
                value: [object?.lat, object?.lon] || "Non disponible",
              },
            ],
          },
        ];

      case "chateaux":
        return [
          {
            label: "Photo",
            fields: [],
          },
          {
            label: "Aperçu",
            fields: [
              { title: "Nom", value: object?.name || "Non disponible" },
              { title: "Ville", value: object?.city || "Non disponible" },
              {
                title: "Type de Château",
                value: object?.type || "Non disponible",
              },
              {
                title: "Periode ou style",
                value: object?.style || "Non disponible",
              },
              {
                title: "Région historique",
                value: object?.region_historique || "Non disponible",
              },
              {
                title: "Proprietaire",
                value: object?.proprietaire || "Non disponible",
              },
            ],
          },
          {
            label: "Coordonnées",
            fields: [
              { title: "Région", value: object?.region || "Non disponible" },
              {
                title: "Département",
                value: object?.department || "Non disponible",
              },
              { title: "Ville", value: object?.city || "Non disponible" },
              {
                title: "Coordonnées géographiques",
                value:
                  [object?.latitude, object?.longitude] || "Non disponible",
              }, // TODO: Let's display a map in the right panel for coordonnées tab
            ],
          },
        ];

      case "cathedrals":
        return [
          {
            label: "Photo",
            fields: [],
          },
          {
            label: "Aperçu",
            fields: [
              { title: "Nom", value: object?.name || "Non disponible" },
              { title: "Ville", value: object?.city || "Non disponible" },
              { title: "Région", value: object?.region || "Non disponible" },
              {
                title: "Département",
                value: object?.department || "Non disponible",
              },

              {
                title: "Style dominant",
                value: object?.genre || "Non disponible",
              },
              {
                title: "Site web",
                value: object?.webSite || "Non disponible",
                type: "URL",
              },
              {
                title: "Coordonnées géographiques",
                value:
                  [object?.latitude, object?.longitude] || "Non disponible",
              },
            ],
          },
        ];

      case "operaHouses":
        return [
          {
            label: "Photo",
            fields: [],
          },
          {
            label: "Aperçu",
            fields: [
              { title: "Nom", value: object?.name || "Non disponible" },
              { title: "Ville", value: object?.city || "Non disponible" },
              {
                title: "Type de bâtiment",
                value: object?.genre || "Non disponible",
              },
              {
                title: "Architecte",
                value: object?.architect || "Non disponible",
              },
              {
                title: "Capacité",
                value: object?.capacity || "Non disponible",
              },
              {
                title: "Site web",
                value: object?.website || "Non disponible",
                type: "URL",
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
              { title: "Nom", value: object?.name || "Non disponible" },
              { title: "Ville", value: object?.city || "Non disponible" },
              {
                title: "Auteur Nom de l'illustre",
                value: object?.famousPerson || "Non disponible",
              },

              {
                title: "Description",
                value: object?.description || "Non Disponible",
              },
              {
                title: "Site Web",
                value: object?.webSite || "Non disponible",
                type: "URL",
              },
            ],
          },
          {
            label: "Coordonnées",
            fields: [
              { title: "Nom", value: object?.name || "Non disponible" },
              { title: "Adresse", value: object?.address || "Non disponible" },
              { title: "Ville", value: object?.city || "Non disponible" },
              { title: "Région", value: object?.region || "Non disponible" },
              {
                title: "Département",
                value: object?.department || "Non disponible",
              },
              {
                title: "Site web",
                value: object?.webSite || "Non disponible",
                type: "URL",
              },
              {
                title: "Coordonnées géographiques",
                value:
                  [object?.latitude, object?.longitude] || "Non disponible",
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
        objectName={objectName}
      />
    </Box>
  );
};

export default DetailViewWrapper;
