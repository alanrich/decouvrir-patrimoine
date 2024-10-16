import React, { useState, useCallback } from "react";
import DetailView from "./DetailView";
import { Box } from "@mui/material";
import { useWikiImage } from "../../hooks/useWikiImage";

const DetailViewWrapper = ({ object, selectedDataSet }) => {
  const [tabValue, setTabValue] = useState(0);
  // fixes error where modal was opening with blank tabpanelcontent because we removed the image tab in the modal view
  const [modalTabValue, setModalTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch image based on the object's name
  const objectName = object?.name;
  const {
    imageUrl,
    loading: imageLoading,
    error: imageError,
  } = useWikiImage(objectName);

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
            label: "Overview",
            fields: [
              { title: "Name", value: object?.name },
              { title: "Address", value: object?.address },
              { title: "City", value: object?.city },
              {
                title: "Notable Artists",
                value: object?.rawData?.personnage_phare,
              },
              { title: "Category", value: object?.rawData?.categorie },
              {
                title: "Themes",
                value: Array.isArray(object?.rawData?.domaine_thematique)
                  ? object.rawData.domaine_thematique.join(", ")
                  : "Not available",
              },
            ],
          },
          {
            label: "History",
            fields: [{ title: "History", value: object?.rawData?.histoire }],
          },
          {
            label: "Works",
            fields: [
              { title: "Artists", value: object?.rawData?.artiste },
              { title: "Themes", value: object?.rawData?.themes },
            ],
          },
          {
            label: "Info",
            fields: [
              { title: "Phone", value: object?.rawData?.telephone },
              { title: "Website", value: object?.rawData?.url, type: "link" },
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
            label: "Overview",
            fields: [
              { title: "Name", value: object?.name },
              { title: "Address", value: object?.address },
              { title: "City", value: object?.city },
              { title: "Genre", value: object?.genre },
              {
                title: "Website",
                value: object?.rawData?.site_internet_du_festival,
                type: "link",
              },
              { title: "Email", value: object?.rawData?.adresse_e_mail },
            ],
          },
          {
            label: "Details",
            fields: [
              {
                title: "Discipline",
                value: object?.rawData?.discipline_dominante,
              },
              {
                title: "Scale",
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
            label: "Overview",
            fields: [
              { title: "Name", value: object?.name },
              { title: "Address", value: object?.rawData?.adresse_complete },
              { title: "City", value: object?.city },
              {
                title: "Types",
                value: Array.isArray(object?.rawData?.types)
                  ? object.rawData.types.join(", ")
                  : "Not available",
              },
              { title: "Description", value: object?.rawData?.description },
            ],
          },
          {
            label: "Info",
            fields: [
              {
                title: "Website",
                value: object?.rawData?.site_internet_et_autres_liens?.[0],
                type: "link",
              },
              {
                title: "Accessible to Public",
                value: Array.isArray(object?.rawData?.accessible_au_public)
                  ? object.rawData.accessible_au_public.join(", ")
                  : "Not available",
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
            label: "Overview",
            fields: [
              { title: "Name", value: object?.name },
              { title: "Address", value: object?.rawData?.adresse_complete },
              { title: "City", value: object?.city },
              {
                title: "Famous Person",
                value: object?.rawData?.auteur_nom_de_l_illustre,
              },
              {
                title: "Types",
                value: Array.isArray(object?.rawData?.types)
                  ? object.rawData.types.join(", ")
                  : "Not available",
              },
              { title: "Description", value: object?.rawData?.description },
            ],
          },
          {
            label: "Info",
            fields: [
              {
                title: "Website",
                value: object?.rawData?.site_internet_et_autres_liens,
                type: "link",
              },
              {
                title: "Accessible to Public",
                value: Array.isArray(object?.rawData?.accessible_au_public)
                  ? object.rawData.accessible_au_public.join(", ")
                  : "Not available",
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
            label: "Overview",
            fields: [
              { title: "Name", value: object?.name },
              { title: "Address", value: object?.rawData?.adresse_normalisee },
              { title: "City", value: object?.city },
              {
                title: "Denominations",
                value: Array.isArray(object?.rawData?.denominations)
                  ? object.rawData.denominations.join(", ")
                  : "Not available",
              },
              {
                title: "Architect",
                value: object?.rawData?.auteur_de_l_edifice,
              },
              { title: "Label Date", value: object?.rawData?.date_de_label },
            ],
          },
          {
            label: "Historical Description",
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
        tabConfigs={tabConfigs}
      />
    </Box>
  );
};

export default DetailViewWrapper;
