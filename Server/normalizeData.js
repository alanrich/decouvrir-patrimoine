const fs = require("fs");
const path = require("path");

// Function to normalize field names
function normalizeFieldNames(data) {
  return data.map((item) => {
    const normalizedItem = {};
    for (const key in item) {
      const normalizedKey = key
        .toLowerCase()
        .replace(/\s+/g, "_") // Replace spaces with underscores
        .replace(/[^\w]/g, ""); // Remove non-word characters except underscores
      normalizedItem[normalizedKey] = item[key];
    }
    return normalizedItem;
  });
}

// Normalize Châteaux data
const chateauxData = require("./api/chateaux.json");
const normalizedChateauxData = normalizeFieldNames(chateauxData);
fs.writeFileSync(
  path.join(__dirname, "api", "normalized_chateaux.json"),
  JSON.stringify(normalizedChateauxData, null, 2)
);

// Normalize Opera Houses data
const operaHousesData = require("./api/opera-houses.json");
const normalizedOperaHousesData = normalizeFieldNames(operaHousesData);
fs.writeFileSync(
  path.join(__dirname, "api", "normalized_opera_houses.json"),
  JSON.stringify(normalizedOperaHousesData, null, 2)
);

// Normalize Cathedrals data
const cathedralsData = require("./api/cathedrals.json");
const normalizedCathedralsData = normalizeFieldNames(cathedralsData);
fs.writeFileSync(
  path.join(__dirname, "api", "normalized_cathedrals.json"),
  JSON.stringify(normalizedCathedralsData, null, 2)
);

console.log("Data normalization complete.");
