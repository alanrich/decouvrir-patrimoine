const mongoose = require("mongoose");

const maisonsDesIllustresSchema = new mongoose.Schema({
  identifiant_deps: String,
  nom: String,
  adresse_complete: String,
  commune: String,
  code_postal: String,
  ville: String,
  region: String,
  departement: String,
  site_internet_et_autres_liens: [String],
  latitude: Number,
  longitude: Number,
  types: [String],
  annee_d_obtention: String,
  description: String,
  auteur_nom_de_l_illustre: String,
  entite_juridique_de_rattachement: String,
  code_insee: String,
  code_insee_departement: String,
  code_insee_region: Number,
  accessible_au_public: [String],
  conditions_d_ouverture: [String],
  date_de_creation: Date,
  date_de_maj: Date,
  coordonnees_geographiques: {
    lat: Number,
    lon: Number,
  },
});

maisonsDesIllustresSchema.index({
  nom: "text",
  commune: "text",
  types: "text",
  auteur_nom_de_l_illustre: "text",
});
maisonsDesIllustresSchema.index({ types: 1 });
maisonsDesIllustresSchema.index({ nom: 1 });
maisonsDesIllustresSchema.index({ commune: 1 });
maisonsDesIllustresSchema.index({ auteur_nom_de_l_illustre: 1 });

const MaisonsDesIllustres = mongoose.model(
  "Maisons des Illustres",
  maisonsDesIllustresSchema
);

module.exports = MaisonsDesIllustres;
