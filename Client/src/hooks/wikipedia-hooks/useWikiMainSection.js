import { useState, useEffect } from "react";

export const useWikiMainSection = (title) => {
  const [mainSection, setMainSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchMainSection = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
            title
          )}&prop=text&section=0&format=json&origin=*`
        );
        const data = await response.json();
        const htmlText = data?.parse?.text?.["*"] || "Non disponible";
        setMainSection(htmlText);
      } catch (err) {
        setError("Failed to fetch the main section.");
      } finally {
        setLoading(false);
      }
    };

    fetchMainSection();
  }, [title]);

  return { mainSection, loading, error };
};
