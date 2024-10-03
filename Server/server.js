require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Museum = require("./models/museum");
const Festival = require("./models/festival");

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");

  // Start the server
  app.listen(3001, () => console.log("Server running on port 3001"));
});

// Middleware
app.use(cors());

// Field Maps
const museumFieldMap = {
  name: "nom_officiel",
  city: "ville",
  // Add other mappings when we decide how else to sort
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

  // Apply Filtering
  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    query.$or = [{ nom_officiel: regex }, { ville: regex }];
  }

  // Apply Sorting
  const sort = {};
  if (sortBy) {
    const dbField = museumFieldMap[sortBy];
    if (dbField) {
      sort[dbField] = sortOrder === "asc" ? 1 : -1;
    } else {
      console.error(`Invalid sort field: ${sortBy}`);
      return res.status(400).json({ error: "Invalid sort field" }); // validation to handle invalid sortBy fields
    }
  }

  try {
    const total = await Museum.countDocuments(query);
    const data = await Museum.find(query)
      .sort(sort)
      .skip(page * rowsPerPage)
      .limit(parseInt(rowsPerPage));

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

  // Apply Filtering
  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    query.$or = [
      { nom_du_festival: regex },
      { commune_principale_de_deroulement: regex },
    ];
  }

  // Apply Sorting
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
      .limit(parseInt(rowsPerPage));

    res.json({ total, data });
  } catch (error) {
    console.error("Error fetching festivals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
