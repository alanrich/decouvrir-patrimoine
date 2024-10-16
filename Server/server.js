require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Museum = require("./models/museum");
const Festival = require("./models/festival");
const Jardin = require("./models/jardin");
const MaisonsDesIllustres = require("./models/maisonsDesIllustres");
const ArchitectureContemporaines = require("./models/architectureContemporaines");

const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;
const cors = require("cors");

// Re-enable CORS with specific origin
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only your domain
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// Field Maps
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

const jardinFieldMap = {
  name: "nom_du_jardin",
  city: "commune",
  genre: "types",
  type: "types",
};

const maisonsDesIllustresFieldMap = {
  name: "nom",
  city: "commune",
  genre: "types",
};

const architectureContemporainesFieldMap = {
  name: "titre_courant",
  city: "commune",
  genre: "denominations",
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

  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }

  const sort = {};
  if (sortBy) {
    const dbField = museumFieldMap[sortBy];
    if (dbField) {
      sort[dbField] = sortOrder === "asc" ? 1 : -1;
    } else {
      return res.status(400).json({ error: "Invalid sort field" });
    }
  }

  try {
    const total = await Museum.countDocuments(query);
    const data = await Museum.find(query)
      .sort(sort)
      .collation({ locale: "fr", strength: 1 })
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

  const query = {
    commune_principale_de_deroulement: { $exists: true, $ne: null },
    "geocodage_xy.lat": { $type: "number" },
    "geocodage_xy.lon": { $type: "number" },
  };

  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }

  const sort = {};
  if (sortBy) {
    const dbField = festivalFieldMap[sortBy];
    if (dbField) {
      sort[dbField] = sortOrder === "asc" ? 1 : -1;
    } else {
      return res.status(400).json({ error: "Invalid sort field" });
    }
  }

  try {
    const total = await Festival.countDocuments(query);
    const data = await Festival.find(query)
      .sort(sort)
      .collation({ locale: "fr", strength: 1 })
      .skip(page * rowsPerPage)
      .limit(parseInt(rowsPerPage))
      .lean();

    res.json({ total, data });
  } catch (error) {
    console.error("Error fetching festivals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Jardins Endpoint
app.get("/api/jardins", async (req, res) => {
  const {
    page = 0,
    rowsPerPage = 10,
    sortBy,
    sortOrder = "asc",
    searchTerm,
  } = req.query;

  const query = {};

  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }

  const sort = {};
  if (sortBy) {
    const dbField = jardinFieldMap[sortBy];
    if (dbField) {
      sort[dbField] = sortOrder === "asc" ? 1 : -1;
    } else {
      return res.status(400).json({ error: "Invalid sort field" });
    }
  }

  try {
    const total = await Jardin.countDocuments(query);
    const data = await Jardin.find(query)
      .sort(sort)
      .collation({ locale: "fr", strength: 1 })
      .skip(page * rowsPerPage)
      .limit(parseInt(rowsPerPage))
      .lean();

    res.json({ total, data });
  } catch (error) {
    console.error("Error fetching jardins:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Maisons des Illustres Endpoint
app.get("/api/maisons-des-illustres", async (req, res) => {
  const {
    page = 0,
    rowsPerPage = 10,
    sortBy,
    sortOrder = "asc",
    searchTerm,
  } = req.query;

  const query = {};

  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }

  const sort = {};
  if (sortBy) {
    const dbField = maisonsDesIllustresFieldMap[sortBy];
    if (dbField) {
      sort[dbField] = sortOrder === "asc" ? 1 : -1;
    } else {
      return res.status(400).json({ error: "Invalid sort field" });
    }
  }

  try {
    const total = await MaisonsDesIllustres.countDocuments(query);
    const data = await MaisonsDesIllustres.find(query)
      .sort(sort)
      .collation({ locale: "fr", strength: 1 })
      .skip(page * rowsPerPage)
      .limit(parseInt(rowsPerPage))
      .lean();

    res.json({ total, data });
  } catch (error) {
    console.error("Error fetching maisons des illustres:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Architecture Contemporaine Endpoint
app.get("/api/architecture-contemporaines", async (req, res) => {
  const {
    page = 0,
    rowsPerPage = 10,
    sortBy,
    sortOrder = "asc",
    searchTerm,
  } = req.query;

  const query = {};

  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }

  const sort = {};
  if (sortBy) {
    const dbField = architectureContemporainesFieldMap[sortBy];
    if (dbField) {
      sort[dbField] = sortOrder === "asc" ? 1 : -1;
    } else {
      return res.status(400).json({ error: "Invalid sort field" });
    }
  }

  try {
    const total = await ArchitectureContemporaines.countDocuments(query);
    const data = await ArchitectureContemporaines.find(query)
      .sort(sort)
      .collation({ locale: "fr", strength: 1 })
      .skip(page * rowsPerPage)
      .limit(parseInt(rowsPerPage))
      .lean();

    res.json({ total, data });
  } catch (error) {
    console.error("Error fetching architecture contemporaine:", error);
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
      await Jardin.init();
      await MaisonsDesIllustres.init();
      await ArchitectureContemporaines.init();
      console.log("Indexes exist");
    } catch (error) {
      console.error("Error initializing indexes:", error);
    }
  })
  .catch((err) => console.log("MongoDB connection error:", err));
