import { useState, useEffect } from "react";

const WIKIPEDIA_API_BASE = "https://fr.wikipedia.org/w/api.php";

export const useWikiPageContent = (title) => {
  const [wikiPageContentData, setWikiPageContentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchWikiArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        // Search for the Wikipedia page using the title
        const searchUrl = `${WIKIPEDIA_API_BASE}?action=query&list=search&srsearch=${encodeURIComponent(
          title
        )}&format=json&origin=*`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (!searchData.query || searchData.query.search.length === 0) {
          setError("Aucune page Wikipedia trouvée pour ce titre.");
          setLoading(false);
          return;
        }

        const pageId = searchData.query.search[0].pageid;

        // Fetch the entire content of the page using the page ID
        const contentUrl = `${WIKIPEDIA_API_BASE}?action=parse&pageid=${pageId}&prop=text&format=json&origin=*`;
        const contentResponse = await fetch(contentUrl);
        const contentData = await contentResponse.json();

        let content = contentData.parse?.text?.["*"];
        if (content) {
          // Parse the HTML string into a DOM object
          const parser = new DOMParser();
          const doc = parser.parseFromString(content, "text/html");

          // Remove all divs with a class containing the word "bandeau"
          const unwantedDivs = doc.querySelectorAll("div[class*='bandeau']");
          unwantedDivs.forEach((div) => div.remove());

          // Serialize the cleaned DOM object back into an HTML string
          const cleanedContent = new XMLSerializer().serializeToString(doc);

          // Update the state with the cleaned content
          setWikiPageContentData({
            title: searchData.query.search[0].title, // Use the title from search results
            content: cleanedContent, // Cleaned full article content
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

  return { wikiPageContentData, loading, error };
};
