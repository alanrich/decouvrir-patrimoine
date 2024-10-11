const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();

// Import models
const Museum = require("./models/museum");
const Festival = require("./models/festival");

// MongoDB URI and server port
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "https://alanrich.dev", // Ensure your domain is correct
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  })
);

// Field Maps for Sorting
const museumFieldMap = {
  name: "nom_officiel",
  city: "ville",
  genre: "domaine_thematique",
};

const festivalFieldMap = {
  name: "nom_du_festival",
  city: "commune_principale_de_deroulement",
  genre: "discipline_dominante",
};

// Museums Endpoint
app.get("/api/museums", async (req, res) => {
  const {
    page = 0,
    rowsPerPage = 10,
    sortBy,
    sortOrder = "asc",
    searchTerm,
  } = req.query;

  const query = {};

  // Apply filtering
  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }

  // Apply sorting
  const sort = {};
  if (sortBy) {
    const dbField = museumFieldMap[sortBy];
    if (dbField) {
      sort[dbField] = sortOrder === "asc" ? 1 : -1;
    } else {
      console.error(`Invalid sort field: ${sortBy}`);
      return res.status(400).json({ error: "Invalid sort field" });
    }
  }

  try {
    const total = await Museum.countDocuments(query);
    const data = await Museum.find(query)
      .sort(sort)
      .skip(page * rowsPerPage)
      .limit(parseInt(rowsPerPage))
      .lean();

    res.json({ total, data });
  } catch (error) {
    console.error("Error fetching museums:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Festivals Endpoint
app.get("/api/festivals", async (req, res) => {
  const {
    page = 0,
    rowsPerPage = 10,
    sortBy,
    sortOrder = "asc",
    searchTerm,
  } = req.query;

  const query = {};

  // Apply filtering
  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }

  // Apply sorting
  const sort = {};
  if (sortBy) {
    const dbField = festivalFieldMap[sortBy];
    if (dbField) {
      sort[dbField] = sortOrder === "asc" ? 1 : -1;
    } else {
      console.error(`Invalid sort field: ${sortBy}`);
      return res.status(400).json({ error: "Invalid sort field" });
    }
  }

  try {
    const total = await Festival.countDocuments(query);
    const data = await Festival.find(query)
      .sort(sort)
      .skip(page * rowsPerPage)
      .limit(parseInt(rowsPerPage))
      .lean();

    res.json({ total, data });
  } catch (error) {
    console.error("Error fetching festivals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("MongoDB connected");

    try {
      await Museum.init();
      await Festival.init();
      console.log("Indexes exist");
    } catch (error) {
      if (error.code === 85) {
        console.log("Index already exists with different options, skipping...");
      } else {
        console.error("Error initializing indexes:", error);
      }
    }
  })
  .catch((err) => console.log("MongoDB connection error:", err));
