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
const Architecture = require("./models/architecture");
const Cathedral = require("./models/cathedral");
const Castle = require("./models/castle");
const Opera = require("./models/opera");
const path = require("path");

const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;

// Enable CORS for development (you might disable this in production)
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this for your production domain
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// Middleware to parse JSON bodies (optional but recommended)
app.use(express.json());

// ========================
// Your API Endpoints Below
// ========================

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

const architectureFieldMap = {
  name: "titre_courant",
  city: "commune",
  genre: "denominations",
};

const castleFieldMap = {
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
    rowsPerPage = 25,
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
  "/api/architectures",
  createApiEndpoint(Architecture, architectureFieldMap)
);
app.get("/api/cathedrals", createApiEndpoint(Cathedral, cathedralFieldMap));
app.get("/api/castles", createApiEndpoint(Castle, castleFieldMap));
app.get("/api/operas", createApiEndpoint(Opera, operaFieldMap));

// ========================
// Serve React Frontend
// ========================

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, "..", "Client", "build")));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Client", "build", "index.html"));
});

// ========================
// Start the Server
// ========================

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
      await Architecture.init();
      await Cathedral.init();
      await Castle.init();
      await Opera.init();
      console.log("Indexes exist");
    } catch (error) {
      console.error("Error initializing indexes:", error);
    }
  })
  .catch((err) => console.log("MongoDB connection error:", err));
