import { useState, useEffect } from "react";

// TODO: create a new variable that contains name and geocoords
// this variable will set a state to populate the map with markers for all domainObjects in selectedDataSet
export const useDomainObjects = (
  searchTerm,
  selectedDataSet,
  page,
  rowsPerPage,
  sortBy,
  sortOrder
) => {
  const [domainObjects, setDomainObjects] = useState([]);
  const [totalObjects, setTotalObjects] = useState(0);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Prepend the CORS-Anywhere proxy URL to the API base URL
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  useEffect(() => {
    // fetch the data from the API
    const fetchData = async () => {
      try {
        let apiUrl = "";
        let sortParam = "";

        if (sortBy && sortBy.length > 0) {
          sortParam = `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }

        const searchParam = searchTerm
          ? `&searchTerm=${encodeURIComponent(searchTerm)}`
          : "";

        if (selectedDataSet === "museums") {
          apiUrl = `${CORS_PROXY}${API_BASE_URL}/api/museums?page=${page}&rowsPerPage=${rowsPerPage}${sortParam}${searchParam}`;
        } else if (selectedDataSet === "festivals") {
          apiUrl = `${CORS_PROXY}${API_BASE_URL}/api/festivals?page=${page}&rowsPerPage=${rowsPerPage}${sortParam}${searchParam}`;
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "x-requested-with": "XMLHttpRequest", // Add this header
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const result = await response.json();
        const data = result.data;

        // validate the data based on data set user selects
        const validData = data
          .map((object) => {
            if (selectedDataSet === "museums") {
              if (
                object.nom_officiel &&
                object.adresse &&
                object.ville &&
                object.coordonnees &&
                typeof object.coordonnees.lat === "number" &&
                typeof object.coordonnees.lon === "number"
              ) {
                return {
                  id: object.identifiant,
                  name: object.nom_officiel,
                  address: object.adresse || "No address provided",
                  city: object.ville,
                  genre:
                    object.domaine_thematique || "No information available",
                  latitude: object.coordonnees.lat,
                  longitude: object.coordonnees.lon,
                  rawData: object,
                  dataSet: selectedDataSet,
                };
              }
            }
            if (selectedDataSet === "festivals") {
              if (
                object.nom_du_festival &&
                object.commune_principale_de_deroulement &&
                object.geocodage_xy &&
                typeof object.geocodage_xy.lat === "number" &&
                typeof object.geocodage_xy.lon === "number"
              )
                return {
                  id: object.identifiant || object.identifiant_cnm,
                  genre: object.discipline_dominante || "N/A",
                  name: object.nom_du_festival,
                  address:
                    object.adresse_postale ||
                    object.nom_de_la_voie ||
                    "No address provided",
                  city: object.commune_principale_de_deroulement,
                  latitude: object.geocodage_xy.lat,
                  longitude: object.geocodage_xy.lon,
                  rawData: object,
                  dataSet: selectedDataSet,
                };
            }
            return null; // Exclude any invalid data
          })
          .filter(Boolean); // Remove any null entries

        setDomainObjects(validData);
        setTotalObjects(result.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [
    searchTerm,
    selectedDataSet,
    page,
    rowsPerPage,
    sortBy,
    sortOrder,
    API_BASE_URL,
  ]);

  return { domainObjects, totalObjects, loading };
};
