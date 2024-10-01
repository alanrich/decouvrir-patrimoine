import { useState, useEffect } from "react";

export const useDomainObjects = (searchTerm, selectedDataSet) => {
  const [domainObjects, setDomainObjects] = useState([]);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // fetch the data from the data folder
    const fetchData = async () => {
      try {
        let dataFile = "";
        if (selectedDataSet === "museums") {
          dataFile = "/data/museums.json";
        } else if (selectedDataSet === "festivals") {
          dataFile = "/data/festivals.json";
        }

        const response = await fetch(dataFile);
        const data = await response.json();

        // validate the data based on data set user selects
        let validData = [];
        if (Array.isArray(data)) {
          validData = data
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
                  object.discipline_dominante &&
                  object.nom_du_festival &&
                  object.adresse_postale &&
                  object.commune_principale_de_deroulement &&
                  object.geocodage_xy &&
                  object.geocodage_xy.lat &&
                  object.geocodage_xy.lon &&
                  typeof object.geocodage_xy.lat === "number" &&
                  typeof object.geocodage_xy.lon === "number"
                )
                  return {
                    id:
                      object.identifiant ||
                      object.identifiant_cnm ||
                      object.code_insee_commune,
                    genre: object.discipline_dominante,
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
          setFilteredObjects(validData);
        } else {
          console.error("Data isn't an array", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading JSON file:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDataSet]);

  // Filter objects based on the terms that are searched
  useEffect(() => {
    const term = searchTerm || "";
    const filtered = domainObjects.filter((object) => {
      return (
        (object.name &&
          object.name.toLowerCase().includes(term.toLowerCase())) ||
        (object.city && object.city.toLowerCase().includes(term.toLowerCase()))
      );
    });
    // Fix performance issues
    const paginated = filtered.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    setFilteredObjects(paginated);
  }, [searchTerm, domainObjects, page, rowsPerPage]);

  return { filteredObjects, loading };
};
