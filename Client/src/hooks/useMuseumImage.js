import { useState, useEffect } from "react";

const WIKIPEDIA_API_BASE = "https://fr.wikipedia.org/w/api.php";

export const useMuseumImage = (museumName) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!museumName) return;

    const fetchImage = async () => {
      console.log("fetchImage fired");
      setLoading(true);
      setError(null);

      try {
        // Step 1: Target the museum's Wikipedia page by name
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
            setError("No image found for this museum.");
          }
        } else {
          setError("No Wikipedia page found for this museum.");
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
