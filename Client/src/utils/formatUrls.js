export const formatUrls = (value) => {
  let urls = [];

  if (typeof value === "string") {
    // Check if the string is a JSON array
    if (value.startsWith("[") && value.endsWith("]")) {
      try {
        urls = JSON.parse(value);
      } catch (e) {
        // If parsing fails, treat as a single URL
        urls = [value];
      }
    } else {
      urls = [value];
    }
  } else if (Array.isArray(value)) {
    urls = value;
  } else {
    urls = ["Non disponible"];
  }

  // Ensure each URL starts with 'http://' or 'https://' only if it's a valid URL
  const formattedUrls = urls.map((url) => {
    if (typeof url !== "string") return "Non disponible"; // Handle non-string values

    const trimmedUrl = url.trim(); // Remove any leading/trailing whitespace

    if (trimmedUrl.toLowerCase() === "non disponible") {
      return "Non disponible";
    }
    if (!/^https?:\/\//i.test(trimmedUrl)) {
      return "http://" + trimmedUrl; // Default to http:// if no protocol is present
    }
    return trimmedUrl;
  });

  return formattedUrls;
};
