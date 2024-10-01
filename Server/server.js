const express = require("express");
const cors = require("cors"); // Import CORS middleware
const app = express();

const festivalsData = require("./api/festivals.json");
const museumsData = require("./api/museums.json");

// allow FE requests from a different port no.
app.use(cors());

// Festival data endpoint
app.get("/api/festivals", (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const rowsPerPage = parseInt(req.query.rowsPerPage) || 10;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = festivalsData.slice(startIndex, endIndex);

  res.json({
    total: festivalsData.length,
    data: paginatedData,
  });
});

// Museum data endpoint
app.get("/api/museums", (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const rowsPerPage = parseInt(req.query.rowsPerPage) || 10;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = museumsData.slice(startIndex, endIndex);

  res.json({
    total: museumsData.length,
    data: paginatedData,
  });
});

app.listen(3001, () => console.log("Server running on port 3001"));
