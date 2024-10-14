// Helper function to format French names
const formatFrench = (name) => {
  if (!name || typeof name !== "string") return name;

  const lowerCaseWords = ["de", "des", "du", "en", "et", "aux", "dans"];

  const words = name.split(" ");
  return words
    .map((word, index) => {
      // Lowercase words unless it's the first word
      if (lowerCaseWords.includes(word.toLowerCase()) && index !== 0) {
        return word.toLowerCase();
      }

      // Handle words with apostrophes
      const apostropheIndex = word.indexOf("'");
      if (apostropheIndex === 1) {
        // Lowercase letter before apostrophe
        const beforeApostrophe = word.charAt(0).toLowerCase();
        // Capitalize letter after apostrophe
        const afterApostrophe =
          word.charAt(apostropheIndex + 1).toUpperCase() +
          word.slice(apostropheIndex + 2);
        return beforeApostrophe + "'" + afterApostrophe;
      }

      // Handle hyphenated words
      if (word.includes("-")) {
        return word
          .split("-")
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join("-");
      }

      // Capitalize the first letter of all strings
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export default formatFrench;
