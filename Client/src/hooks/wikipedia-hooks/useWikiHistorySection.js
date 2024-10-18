import { useState, useEffect } from "react";

export const useWikiHistorySection = (title) => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchWikiHistorySection = async () => {
      setLoading(true);
      setError(null);

      try {
        // First API call to get the section metadata
        const response = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
            title
          )}&prop=sections&format=json&origin=*`
        );
        const data = await response.json();
        console.log("data >>>>>> ", JSON.stringify(data));

        if (!data.parse) {
          setError("No content found for the given title.");
          setHistoryData(null);
          setLoading(false);
          return;
        }

        // List of keywords related to history
        const historyKeywords = [
          "histoire",
          "historique",
          "origines",
          "évolution",
          "développement",
          "fondation",
          "chronologie",
          "contexte historique",
          "formation",
          "création",
          "naissance",
        ];

        // Filter sections related to history using regular expressions
        const historySections = data.parse.sections.filter((section) =>
          historyKeywords.some((keyword) =>
            new RegExp(`\\b${keyword}\\b`, "i").test(section.line)
          )
        );
        console.log("historySections >>>>>> ", JSON.stringify(historySections));

        if (historySections.length === 0) {
          setError("No history section found.");
          setHistoryData(null);
          setLoading(false);
          return;
        }

        // Fetch the first matching history section to improve performance
        const section = historySections[0];
        const sectionResponse = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
            title
          )}&section=${section.index}&prop=text&format=json&origin=*`
        );
        const sectionData = await sectionResponse.json();
        console.log("sectionData >>>> ", JSON.stringify(sectionData));

        const content = sectionData.parse?.text?.["*"];

        setHistoryData({
          title: section.line,
          content,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch history section.");
      } finally {
        setLoading(false);
      }
    };

    fetchWikiHistorySection();
  }, [title]);

  return { historyData, loading, error };
};
