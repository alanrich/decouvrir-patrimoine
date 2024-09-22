import { useState, useEffect } from "react";

export const useDomainObjects = (searchTerm) => {
  const [domainObjects, setDomainObjects] = useState([]);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the local JSON file, can't find an API atm
        const response = await fetch("/data/videoprotection.json");
        const data = await response.json();
        setDomainObjects(data);
        setFilteredObjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading JSON file:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter objects based on the terms that are searched
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
