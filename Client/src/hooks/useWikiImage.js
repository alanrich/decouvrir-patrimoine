import { useState, useEffect } from "react";

const WIKIPEDIA_API_BASE = "https://fr.wikipedia.org/w/api.php";

export const useWikiImage = (museumName) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Clear the previous image when the museumName changes -> previously old imges were displayed when
    // new selection from summary table fetched no image from wiki api
    setImageUrl(null);
    setError(null);

    if (!museumName) return;

    const fetchImage = async () => {
      setLoading(true);

      try {
        // Target the museum's Wikipedia page by name
        const searchUrl = `${WIKIPEDIA_API_BASE}?action=query&list=search&srsearch=${encodeURIComponent(
          museumName
        )}&format=json&origin=*`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (searchData?.query?.search?.length > 0) {
          const pageId = searchData.query.search[0].pageid;

          // Use the page ID to get the image
          const imageUrl = `${WIKIPEDIA_API_BASE}?action=query&prop=pageimages&pageids=${pageId}&format=json&pithumbsize=1000&origin=*`;
          const imageResponse = await fetch(imageUrl);
          const imageData = await imageResponse.json();

          const page = imageData.query.pages[pageId];
          if (page?.thumbnail?.source) {
            setImageUrl(page.thumbnail.source);
          } else {
            setError("Aucune image trouvée pour ce musée..");
          }
        } else {
          setError("Aucune page Wikipedia trouvée pour ce musée.");
        }
      } catch (error) {
        setError("Failed to fetch the museum image.");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [museumName]);

  return { imageUrl, loading, error };
};
