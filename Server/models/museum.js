const mongoose = require("mongoose");

const museumSchema = new mongoose.Schema({
  identifiant: String,
  nom_officiel: String,
  adresse: String,
  lieu: String,
  code_postal: String,
  ville: String,
  region: String,
  departement: String,
  url: String,
  telephone: String,
  categorie: String,
  domaine_thematique: [String],
  histoire: String,
  atout: String,
  themes: String,
  artiste: String,
  personnage_phare: String,
  interet: String,
  protection_batiment: String,
  protection_espace: String,
  refmer: String,
  annee_creation: Number,
  date_de_mise_a_jour: Date,
  coordonnees: {
    lat: Number,
    lon: Number,
  },
});

const Museum = mongoose.model("Museum", museumSchema);

module.exports = Museum;