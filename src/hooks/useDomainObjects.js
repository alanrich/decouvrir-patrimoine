import { useState, useEffect } from 'react';

export const useDomainObjects = (searchTerm) => {
  const [domainObjects, setDomainObjects] = useState([]);
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate a fetch for now   
  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        { id: 1, name: "User Role 1", type: "Role", tasks: ["Task A", "Task B"], permissions: ["Read", "Write"] },
        { id: 2, name: "Component X", type: "Functional Component", tasks: ["Task C"], permissions: ["Execute"] },
      ];
      setDomainObjects(mockData);
      setFilteredObjects(mockData);
      setLoading(false);
    }, 2000);
  }, []);

  // Filter objects based on the search term
  useEffect(() => {
    const term = searchTerm || "";
    setFilteredObjects(
      domainObjects.filter((object) =>
        object.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [searchTerm, domainObjects]);

  return { filteredObjects, loading };
};
