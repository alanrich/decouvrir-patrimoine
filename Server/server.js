const express = require("express");
const cors = require("cors");
const app = express();

const festivalsData = require("./api/festivals.json");
const museumsData = require("./api/museums.json");

// allow FE requests from a different port no.
app.use(cors());

// Festival data endpoint
app.get("/api/festivals", (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const rowsPerPage = parseInt(req.query.rowsPerPage) || 10;
  const sortByParam = req.query.sortBy;
  const sortOrder = req.query.sortOrder || "asc";
  const searchTerm = req.query.searchTerm
    ? req.query.searchTerm.toLowerCase()
    : "";

  // Map the client-side sortBy parameter to the raw data fields from JSON Obj
  const fieldMap = {
    name: "nom_du_festival",
    city: "commune_principale_de_deroulement",
    genre: "discipline_dominante",
  };

  let data = festivalsData; // Create a copy of the data array rather than mutating original

  // Apply Filtering
  if (searchTerm) {
    data = data.filter((item) => {
      const name = item.nom_du_festival
        ? item.nom_du_festival.toLowerCase()
        : "";
      const city = item.commune_principale_de_deroulement
        ? item.commune_principale_de_deroulement.toLowerCase()
        : "";

      return name.includes(searchTerm) || city.includes(searchTerm);
    });
  }

  // Apply Sorting
  if (sortByParam) {
    const sortBy = fieldMap[sortByParam];

    if (sortBy) {
      data.sort((a, b) => {
        const aValue = a[sortBy] ? a[sortBy].toString().toLowerCase() : "";
        const bValue = b[sortBy] ? b[sortBy].toString().toLowerCase() : "";

        if (aValue < bValue) {
          return sortOrder === "desc" ? 1 : -1;
        }
        if (aValue > bValue) {
          return sortOrder === "desc" ? -1 : 1;
        }
        return 0;
      });
    }
  }

  // Apply Pagination
  const startIndex = page * rowsPerPage;
  // const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex + rowsPerPage);

  res.json({
    total: data.length,
    data: paginatedData,
  });
});

// Museum data endpoint
app.get("/api/museums", (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const rowsPerPage = parseInt(req.query.rowsPerPage) || 10;
  const sortByParam = req.query.sortBy;
  const sortOrder = req.query.sortOrder || "asc";
  const searchTerm = req.query.searchTerm
    ? req.query.searchTerm.toLowerCase()
    : "";

  const fieldMap = {
    name: "nom_officiel",
    city: "ville",
  };

  let data = museumsData;

  // Apply Filtering
  if (searchTerm) {
    data = data.filter((item) => {
      const name = item.nom_officiel ? item.nom_officiel.toLowerCase() : "";
      const city = item.ville ? item.ville.toLowerCase() : "";

      return name.includes(searchTerm) || city.includes(searchTerm);
    });
  }

  // Apply Sorting
  if (sortByParam) {
    const sortBy = fieldMap[sortByParam];
    if (sortBy) {
      data.sort((a, b) => {
        const aValue = a[sortBy] ? a[sortBy].toString().toLowerCase() : "";
        const bValue = b[sortBy] ? b[sortBy].toString().toLowerCase() : "";

        if (aValue < bValue) {
          return sortOrder === "desc" ? 1 : -1;
        }
        if (aValue > bValue) {
          return sortOrder === "desc" ? -1 : 1;
        }
        return 0;
      });
    }
  }

  // Apply Pagination
  const startIndex = page * rowsPerPage;
  // const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex + rowsPerPage);

  res.json({
    total: data.length,
    data: paginatedData,
  });
});

app.listen(3001, () => console.log("Server running on port 3001"));
