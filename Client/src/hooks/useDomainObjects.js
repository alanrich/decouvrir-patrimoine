import { useState, useEffect, useMemo } from "react";

export const useDomainObjects = (
  searchTerm,
  selectedDataSet,
  page,
  rowsPerPage
) => {
  const [domainObjects, setDomainObjects] = useState([]);
  const [totalObjects, setTotalObjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch the data from the API
    const fetchData = async () => {
      try {
        let apiUrl = "";
        if (selectedDataSet === "museums") {
          apiUrl = `http://localhost:3001/api/museums?page=${page}&rowsPerPage=${rowsPerPage}`;
        } else if (selectedDataSet === "festivals") {
          apiUrl = `http://localhost:3001/api/festivals?page=${page}&rowsPerPage=${rowsPerPage}`;
        }

        const response = await fetch(apiUrl);
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
                  address: object.adresse,
                  city: object.ville,
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
                // object.geocodage_xy.lat &&
                // object.geocodage_xy.lon &&
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
  }, [selectedDataSet, page, rowsPerPage]);

  // Filter objects based on the terms that are searched
  const filteredObjects = useMemo(() => {
    const term = searchTerm ? searchTerm.toLowerCase() : "";

    return domainObjects.filter((object) => {
      return (
        (object.name && object.name.toLowerCase().includes(term)) ||
        (object.city && object.city.toLowerCase().includes(term))
      );
    });
  }, [searchTerm, domainObjects]);

  return { filteredObjects, domainObjects, totalObjects, loading };
};
