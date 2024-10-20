import { useState, useEffect } from "react";

export const useWikiCollectionSection = (title) => {
  const [collectionSection, setCollectionSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchCollectionSection = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
            title
          )}&prop=text&section=2&format=json&origin=*`
        );
        const data = await response.json();
        const htmlText = data?.parse?.text?.["*"] || "Non disponible";
        setCollectionSection(htmlText);
      } catch (err) {
        setError("Failed to fetch the collection section.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionSection();
  }, [title]);

  return { collectionSection, loading, error };
};
