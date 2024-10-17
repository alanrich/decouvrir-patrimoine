import { useState, useEffect } from "react";

const WIKIPEDIA_API_BASE = "https://fr.wikipedia.org/w/api.php";

export const useWikiImages = (names) => {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!names || names.length === 0) {
      setImages({});
      setErrors({});
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchImages = async () => {
      setLoading(true);
      const newImages = {};
      const newErrors = {};

      await Promise.all(
        names.map(async (name) => {
          try {
            // First, search for the page on French Wikipedia
            const searchUrl = `${WIKIPEDIA_API_BASE}?action=query&list=search&srsearch=${encodeURIComponent(
              name
            )}&format=json&origin=*`;
            console.log("searchURL ..... " + JSON.stringify(searchUrl));
            const searchResponse = await fetch(searchUrl);
            console.log(
              "search response ..... " + JSON.stringify(searchResponse)
            );
            const searchData = await searchResponse.json();
            console.log("searchData ..... " + JSON.stringify(searchData));

            if (searchData?.query?.search?.length > 0) {
              const pageId = searchData.query.search[0].pageid;
              console.log("pageId ..... " + JSON.stringify(pageId));
              // Use the page ID to get the image
              const imageUrl = `${WIKIPEDIA_API_BASE}?action=query&prop=pageimages&pageids=${pageId}&format=json&pithumbsize=500&origin=*`;
              console.log("imageURL ..... " + JSON.stringify(imageUrl));
              const imageResponse = await fetch(imageUrl);
              console.log(
                "imageResponse ..... " + JSON.stringify(imageResponse)
              );
              const imageData = await imageResponse.json();
              console.log("imageData ..... " + JSON.stringify(imageData));

              const page = imageData.query.pages[pageId];
              console.log("page ..... " + JSON.stringify(page));
              if (page?.thumbnail?.source) {
                newImages[name] = page.thumbnail.source;
              } else {
                newErrors[name] = `No image found for ${name}`;
              }
            } else {
              newErrors[name] = `No Wikipedia page found for ${name}`;
            }
          } catch (error) {
            newErrors[name] = error.message;
          }
        })
      );

      if (!isCancelled) {
        setImages(newImages);
        setErrors(newErrors);
        setLoading(false);
      }
    };

    fetchImages();

    return () => {
      isCancelled = true;
    };
  }, [names]);

  return { images, loading, errors };
};
