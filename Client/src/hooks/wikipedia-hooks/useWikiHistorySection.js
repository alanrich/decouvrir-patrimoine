import { useState, useEffect } from "react";

export const useWikiHistorySection = (title) => {
  const [historySection, setHistorySection] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchHistorySection = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
            title
          )}&prop=text&section=1&format=json&origin=*`
        );
        const data = await response.json();
        const htmlText = data?.parse?.text?.["*"] || "Non disponible";
        setHistorySection(htmlText);
      } catch (err) {
        setError("Failed to fetch the history section.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorySection();
  }, [title]);

  return { historySection, loading, error };
};
