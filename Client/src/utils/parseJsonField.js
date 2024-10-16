export const parseJsonField = (fieldValue) => {
  if (typeof fieldValue === "string") {
    try {
      const parsedValue = JSON.parse(fieldValue);
      if (Array.isArray(parsedValue)) {
        return parsedValue;
      }
    } catch (error) {
      // Parsing failed; return the original string
      console.error("Failed to parse JSON field:", error);
    }
  }
  return fieldValue;
};
