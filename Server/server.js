require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Museum = require("./models/museum");
const Festival = require("./models/festival");
const Jardin = require("./models/jardin");
const MaisonsDesIllustres = require("./models/maisonsDesIllustres");
const ArchitectureContemporaines = require("./models/architectureContemporaines");
const path = require("path"); // Added to handle file paths

const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3001;
const cors = require("cors");

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
  // ... your existing code ...
});

// Festivals Endpoint
app.get("/api/festivals", async (req, res) => {
  // ... your existing code ...
});

// Jardins Endpoint
app.get("/api/jardins", async (req, res) => {
  // ... your existing code ...
});

// Maisons des Illustres Endpoint
app.get("/api/maisons-des-illustres", async (req, res) => {
  // ... your existing code ...
});

// Architecture Contemporaine Endpoint
app.get("/api/architecture-contemporaines", async (req, res) => {
  // ... your existing code ...
});

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
      await ArchitectureContemporaines.init();
      console.log("Indexes exist");
    } catch (error) {
      console.error("Error initializing indexes:", error);
    }
  })
  .catch((err) => console.log("MongoDB connection error:", err));
