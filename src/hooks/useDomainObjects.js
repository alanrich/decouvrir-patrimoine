import { useState, useEffect } from "react";

export const useDomainObjects = (searchTerm, selectedDataSet) => {
  const [domainObjects, setDomainObjects] = useState([]);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch the data from the data folder
    const fetchData = async () => {
      try {
        let dataFile = "";
        if (selectedDataSet === "museums") {
          dataFile = "/data/museums.json";
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
    setFilteredObjects(
      domainObjects.filter((object) => {
        return (
          (object.name &&
            object.name.toLowerCase().includes(term.toLowerCase())) ||
          (object.city &&
            object.city.toLowerCase().includes(term.toLowerCase()))
        );
      })
    );
  }, [searchTerm, domainObjects]);

  return { filteredObjects, loading };
};
