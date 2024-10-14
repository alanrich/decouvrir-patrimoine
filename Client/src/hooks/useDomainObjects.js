import { useState, useEffect } from "react";

// Helper function to format names
const formatFrench = (name) => {
  if (!name) return name;

  return name
    .split(" ")
    .map((word) => {
      // Keep lowercase all french words that stay lowercase in proper nouns
      if (word.toLowerCase() === "de") {
        return "de";
      }
      if (word.toLowerCase() === "des") {
        return "des";
      }
      if (word.toLowerCase() === "du") {
        return "du";
      }
      if (word.toLowerCase() === "en") {
        return "en";
      }
      if (word.toLowerCase() === "aux") {
        return "aux";
      }
      if (word.toLowerCase() === "dans") {
        return "dans";
      }
      // Do not capitalize if the second character is an apostrophe
      if (word.length > 1 && word[1] === "'") {
        return word;
      }
      // Capitalize the first character
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

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

  const API_BASE_URL = "http://localhost:3001";

  useEffect(() => {
    // fetch the data from the API
    const fetchData = async () => {
      try {
        let apiUrl = "";
        // If issue persists, lets set a default value for the sortParam
        let sortParam = "";

        if (sortBy && sortBy.length > 0) {
          sortParam = `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        }

        const searchParam = searchTerm
          ? `&searchTerm=${encodeURIComponent(searchTerm)}`
          : "";

        const constructApiUrl = (endpoint) => {
          return `${API_BASE_URL}/api/${endpoint}?page=${page}&rowsPerPage=${rowsPerPage}${sortParam}${searchParam}`;
        };

        if (selectedDataSet === "museums") {
          apiUrl = constructApiUrl("museums");
        } else if (selectedDataSet === "festivals") {
          apiUrl = constructApiUrl("festivals");
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-requested-with": "XMLHttpRequest",
            Accept: "application/json",
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
                  name: formatFrench(object.nom_officiel),
                  address: formatFrench(object.adresse) || "Non disponible",
                  city: formatFrench(object.ville),
                  genre:
                    formatFrench(object.domaine_thematique) || "Non disponible",
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
                typeof object.commune_principale_de_deroulement === "string" &&
                object.geocodage_xy &&
                typeof object.geocodage_xy.lat === "number" &&
                typeof object.geocodage_xy.lon === "number"
              )
                return {
                  id: object.identifiant || object.identifiant_cnm,
                  genre:
                    formatFrench(object.discipline_dominante) ||
                    "Non disponible",
                  name: formatFrench(object.nom_du_festival),
                  address:
                    formatFrench(object.adresse_postale) ||
                    formatFrench(object.nom_de_la_voie) ||
                    "Non disponible",
                  city:
                    formatFrench(object.commune_principale_de_deroulement) ||
                    "Non disponible",
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
    API_BASE_URL, // Why are we including this value in the dependency array
  ]);

  return { domainObjects, totalObjects, loading };
};
