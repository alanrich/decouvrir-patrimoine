import { useState, useEffect } from "react";

export const usePersistentSelectedObject = () => {
  const [selectedObject, setSelectedObject] = useState(null);

  // Store the selected object
  useEffect(() => {
    selectedObject &&
      localStorage.setItem("selectedObject", JSON.stringify(selectedObject));
  }, [selectedObject]);

  // Load the selected object
  useEffect(() => {
    const storedObject = localStorage.getItem("selectedObject");
    storedObject && setSelectedObject(JSON.parse(storedObject));
  }, []);

  // Clear the selected object from state and local storage
  const clearSelectedObject = () => {
    setSelectedObject(null);
    localStorage.removeItem("selectedObject");
  };

  return { selectedObject, setSelectedObject, clearSelectedObject };
};
