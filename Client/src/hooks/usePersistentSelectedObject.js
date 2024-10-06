import { useState, useEffect } from "react";

export const usePersistentSelectedObject = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  // flag for the Map to open with center placed upon geoLocation of selectedObject held in localStorage
  const [selectedObjectLoaded, setSelectedObjectLoaded] = useState(false);

  // Load the selected object
  useEffect(() => {
    const storedObject = localStorage.getItem("selectedObject");
    if (storedObject) {
      try {
        setSelectedObject(JSON.parse(storedObject));
        setSelectedObjectLoaded(true); // to inform the Map if a selected object was loaded from local Storage
      } catch (error) {
        console.error("Error parsing selectedObject from localStorage:", error);
        localStorage.removeItem("selectedObject"); // Handle invalid JSON if it is found in localStorage
        setSelectedObject(null);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedObject) {
      localStorage.setItem("selectedObject", JSON.stringify(selectedObject));
    } else {
      localStorage.removeItem("selectedObject");
    }
  }, [selectedObject]);

  useEffect(() => {
    if (selectedObjectLoaded) {
      setSelectedObjectLoaded(false);
    }
  }, [selectedObjectLoaded]);

  const clearSelectedObject = () => {
    setSelectedObject(null);
    localStorage.removeItem("selectedObject");
  };

  return {
    selectedObject,
    setSelectedObject,
    selectedObjectLoaded,
    clearSelectedObject,
  };
};
