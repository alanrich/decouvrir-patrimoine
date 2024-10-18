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
        // First, fetch the image titles (this is what your current hook does)
        const response = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
            title
          )}&prop=images&format=json&origin=*`
        );
        const data = await response.json();
        const pageId = Object.keys(data.query.pages)[0];
        const pageImages = data.query.pages[pageId]?.images || [];

        // Next, resolve the URLs for these images
        const imageTitles = pageImages.map((img) => img.title).join("|");
        const urlResponse = await fetch(
          `https://fr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
            imageTitles
          )}&prop=imageinfo&iiprop=url&format=json&origin=*`
        );
        const urlData = await urlResponse.json();
        const imageUrls = Object.values(urlData.query.pages).map(
          (img) => img.imageinfo?.[0]?.url
        );

        setImages(imageUrls);
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
