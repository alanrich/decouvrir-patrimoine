import { useState, useEffect } from "react";

const WIKIPEDIA_API_BASE = "https://fr.wikipedia.org/w/api.php";

export const useWikiHistorySection = (title) => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchWikiArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Search for the Wikipedia page using the title (flexible approach)
        const searchUrl = `${WIKIPEDIA_API_BASE}?action=query&list=search&srsearch=${encodeURIComponent(
          title
        )}&format=json&origin=*`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        // Step 2: Handle case where no search results are found
        if (!searchData.query || searchData.query.search.length === 0) {
          setError("Aucune page Wikipedia trouvée pour ce titre.");
          setLoading(false);
          return;
        }

        // Get the page ID of the first search result
        const pageId = searchData.query.search[0].pageid;

        // Step 3: Fetch the entire content of the page using the page ID
        const contentUrl = `${WIKIPEDIA_API_BASE}?action=parse&pageid=${pageId}&prop=text&format=json&origin=*`;
        const contentResponse = await fetch(contentUrl);
        const contentData = await contentResponse.json();

        // Step 4: Extract and set the entire article content
        const content = contentData.parse?.text?.["*"];
        if (content) {
          // Maintain the existing return structure
          setHistoryData({
            title: searchData.query.search[0].title, // Use the title from search results
            content, // Full article content
          });
        } else {
          setError("Contenu de l'article introuvable.");
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération de l'article.");
      } finally {
        setLoading(false);
      }
    };

    fetchWikiArticle();
  }, [title]);

  return { historyData, loading, error };
};
