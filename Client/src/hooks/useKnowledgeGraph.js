import { useState, useEffect } from "react";

const API_KEY = "AIzaSyAkJec5sUAZ6sw1vdyt8ehsF6AdXtTelYw";

export const useKnowledgeGraph = (query) => {
  const [entityData, setEntityData] = useState(null);
  const [kgLoading, setKgLoading] = useState(false);
  const [kgError, setKgError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchKnowledgeGraphData = async () => {
      setKgLoading(true);
      setKgError(null);

      try {
        const response = await fetch(
          `https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(
            query
          )}&key=${API_KEY}&limit=1&indent=True`
        );
        const data = await response.json();

        const entity = data.itemListElement?.[0]?.result || null;
        setEntityData(entity);
      } catch (error) {
        console.error("Error fetching data from Knowledge Graph API:", error);
        setKgError("Failed to fetch entity information.");
      } finally {
        setKgLoading(false);
      }
    };

    fetchKnowledgeGraphData();
  }, [query]);

  return { entityData, kgLoading, kgError };
};
