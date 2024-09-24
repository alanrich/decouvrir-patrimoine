import { useState, useEffect } from "react";

export const useDomainObjects = (searchTerm) => {
  const [domainObjects, setDomainObjects] = useState([]);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Can't find an API atm, just fetch some downloadable data for now
        const response = await fetch("/data/videoprotection.json");
        const data = await response.json();
        // First check the data is a valid array
        if (Array.isArray(data)) {
          const validData = data.filter(
            (object) =>
              object.adresse &&
              object.commune &&
              object.geo_point_2d &&
              typeof object.geo_point_2d.lat === "number" &&
              typeof object.geo_point_2d.lon === "number"
          );
          setDomainObjects(validData);
          // setFilteredObjects(validData);
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
  }, []);

  // Filter objects based on the terms that are searched
  // TO DO: This will get more more complex when multiple domain object types are added
  useEffect(() => {
    const term = searchTerm || "";
    setFilteredObjects(
      domainObjects.filter(
        (object) =>
          object.adresse.toLowerCase().includes(term.toLowerCase()) ||
          object.commune.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [searchTerm, domainObjects]);
  return { filteredObjects, loading };
};
