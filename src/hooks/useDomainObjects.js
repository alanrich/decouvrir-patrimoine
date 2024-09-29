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
        if (selectedDataSet === "videoprotection") {
          dataFile = "/data/videoprotection.json";
        }
        if (selectedDataSet === "museums") {
          dataFile = "/data/museums.json";
        }
        const response = await fetch(dataFile);
        const data = await response.json();

        // validate the data based on data set user selects
        let validData = [];
        if (Array.isArray(data)) {
          if (dataFile === "/data/videoprotection.json") {
            validData = data.filter(
              (object) =>
                object.adresse &&
                object.commune &&
                object.geo_point_2d &&
                typeof object.geo_point_2d.lat === "number" &&
                typeof object.geo_point_2d.lon === "number"
            );
          } else if (dataFile === "/data/museums.json") {
            validData = data.filter(
              (object) =>
                object.adresse &&
                object.ville &&
                object.coordonnees &&
                typeof object.coordonnees.lat === "number" &&
                typeof object.coordonnees.lon === "number"
            );
          }
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
  // TO DO: This will get more more complex when multiple domain object types are added
  useEffect(() => {
    const term = searchTerm || "";
    setFilteredObjects(
      domainObjects.filter((object) => {
        if (selectedDataSet === "videoprotection") {
          return (
            object.adresse.toLowerCase().includes(term.toLowerCase()) ||
            object.commune.toLowerCase().includes(term.toLowerCase())
          );
        } else if (selectedDataSet === "museums") {
          return (
            (typeof object.nom_officiel === "string" &&
              object.nom_officiel.toLowerCase().includes(term.toLowerCase())) ||
            (typeof object.ville === "string" &&
              object.ville.toLowerCase().includes(term.toLowerCase()))
          );
        }
        return false;
      })
    );
  }, [searchTerm, domainObjects, selectedDataSet]);
  return { filteredObjects, loading };
};
