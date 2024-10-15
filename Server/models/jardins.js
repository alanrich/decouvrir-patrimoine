const mongoose = require("mongoose");

const jardinsSchema = new mongoose.Schema({
  nom_du_jardin: String,
  code_postal: String,
  region: String,
  departement: String,
  adresse_complete: String,
  adresse_de_l_entree_du_public: String,
  numero_et_libelle_de_la_voie: String,
  complement_d_adresse: String,
  commune: String,
  code_insee: String,
  code_insee_departement: String,
  code_insee_region: String,
  latitude: String,
  longitude: String,
  site_internet_et_autres_liens: [String],
  types: [String],
  annee_d_obtention: String,
  description: String,
  auteur_nom_de_l_illustre: String,
  identifiant_deps: String,
  identifiant_origine: String,
  accessible_au_public: [String],
  conditions_d_ouverture: [String],
  equipement_precision: String,
  date_de_creation: String,
  date_de_maj: String,
  coordonnees_geographiques: {
    lat: Number,
    lon: Number,
  },
});

jardinsSchema.index({
  nom_du_jardin: "text",
  commune: "text",
  types: "text",
});
jardinsSchema.index({ nom_du_jardin: 1 });
jardinsSchema.index({ commune: 1 });
jardinsSchema.index({ tpes: 1 });

const Jardins = mongoose.model("Jardins", jardinsSchema);

module.exports = Jardins;
