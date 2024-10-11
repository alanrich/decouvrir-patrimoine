/*const express = require("express");
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

// Use CORS with specific settings
app.use(
  cors({
    origin: "https://alanrich.dev", // Allow only your domain
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// Field Maps for Sorting
const museumFieldMap = {
  name: "nom_officiel",
  city: "ville",
  genre: "domaine_thematique",
  // Add other mappings as needed
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
    const data = await Museum.find(query, {
      identifiant: 1,
      nom_officiel: 1,
      adresse: 1,
      ville: 1,
      region: 1,
      coordonnees: 1,
      url: 1,
      telephone: 1,
      categorie: 1,
      histoire: 1,
      personnage_phare: 1,
      interet: 1,
      annee_creation: 1,
      domaine_thematique: 1,
      artiste: 1,
    })
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
    const data = await Festival.find(query, {
      identifiant: 1,
      nom_du_festival: 1,
      discipline_dominante: 1,
      commune_principale_de_deroulement: 1,
      annee_de_creation_du_festival: 1,
      site_internet_du_festival: 1,
      envergure_territoriale: 1,
      adresse_postale: 1,
      adresse_e_mail: 1,
      sous_categorie_spectacle_vivant: 1,
      sous_categorie_musique: 1,
      sous_categorie_cinema_et_audiovisuel: 1,
      sous_categorie_arts_visuels_et_arts_numeriques: 1,
      sous_categorie_livre_et_litterature: 1,
      geocodage_xy: 1,
    })
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
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connected");

    try {
      await Museum.init();
      await Festival.init();
      console.log("Indexes exist");
    } catch (error) {
      console.error("Error initializing indexes:", error);
    }
  })
  .catch((err) => console.log("MongoDB connection error:", err));
*/
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

// Use CORS with specific settings
app.use(
  cors({
    origin: true, // Allow only your domain
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
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
