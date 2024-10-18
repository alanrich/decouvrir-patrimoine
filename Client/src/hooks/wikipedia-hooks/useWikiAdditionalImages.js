import { useState, useEffect } from "react";

export const useWikiAdditionalImages = (title) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
            title
          )}&prop=images&format=json&origin=*`
        );
        const data = await response.json();
        const pageId = Object.keys(data.query.pages)[0];
        const pageImages = data.query.pages[pageId]?.images || [];
        setImages(pageImages);
      } catch (err) {
        setError("Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [title]);

  return { images, loading, error };
};
