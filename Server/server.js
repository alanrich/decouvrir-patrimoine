require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Import models
const Museum = require("./models/museum");
const Festival = require("./models/festival");
const Jardin = require("./models/jardin");
const MaisonsDesIllustres = require("./models/maisonsDesIllustres");
const ArchitectureContemporaines = require("./models/architectureContemporaines");
const Cathedral = require("./models/cathedral");
const Chateau = require("./models/chateau");
const OperaHouse = require("./models/operaHouse");

const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

// Re-enable CORS with specific origin
app.use(
  cors({
    origin: "http://localhost:3000",
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

const chateauFieldMap = {
  name: "name",
  city: "commune",
  genre: "periode_ou_style",
};

const operaFieldMap = {
  name: "name",
  city: "lieu",
  genre: "type",
};

const cathedralFieldMap = {
  name: "name",
  city: "ville",
  genre: "style_dominant",
};

// Create a reusable API handler for all datasets
const createApiEndpoint = (Model, fieldMap) => async (req, res) => {
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
    const dbField = fieldMap[sortBy];
    if (dbField) {
      sort[dbField] = sortOrder === "asc" ? 1 : -1;
    } else {
      return res.status(400).json({ error: "Invalid sort field" });
    }
  }

  try {
    const total = await Model.countDocuments(query);
    const data = await Model.find(query)
      .sort(sort)
      .collation({ locale: "fr", strength: 1 })
      .skip(page * rowsPerPage)
      .limit(parseInt(rowsPerPage))
      .lean();

    res.json({ total, data });
  } catch (error) {
    console.error(`Error fetching data:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// API Endpoints
app.get("/api/museums", createApiEndpoint(Museum, museumFieldMap));
app.get("/api/festivals", createApiEndpoint(Festival, festivalFieldMap));
app.get("/api/jardins", createApiEndpoint(Jardin, jardinFieldMap));
app.get(
  "/api/maisons-des-illustres",
  createApiEndpoint(MaisonsDesIllustres, maisonsDesIllustresFieldMap)
);
app.get(
  "/api/architecture-contemporaines",
  createApiEndpoint(
    ArchitectureContemporaines,
    architectureContemporainesFieldMap
  )
);

// New Endpoints for Cathedrals, Châteaux, and Opera Houses
app.get("/api/cathedrals", createApiEndpoint(Cathedral, cathedralFieldMap));
app.get("/api/chateaux", createApiEndpoint(Chateau, chateauFieldMap));
app.get("/api/opera-houses", createApiEndpoint(OperaHouse, operaFieldMap));

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
      await Cathedral.init();
      await Chateau.init();
      await OperaHouse.init();
      console.log("Indexes exist");
    } catch (error) {
      console.error("Error initializing indexes:", error);
    }
  })
  .catch((err) => console.log("MongoDB connection error:", err));
