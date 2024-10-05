const mongoose = require("mongoose");

const festivalSchema = new mongoose.Schema({
  identifiant: String,
  identifiant_cnm: String,
  nom_du_festival: String,
  envergure_territoriale: String, // Can be null
  region_principale_de_deroulement: String,
  departement_principal_de_deroulement: String,
  commune_principale_de_deroulement: String,
  code_postal_de_la_commune_principale_de_deroulement: String,
  code_insee_commune: String,
  code_insee_epci_collage_en_valeur: String,
  libelle_epci_collage_en_valeur: String,
  numero_de_voie: String, // Can be null
  type_de_voie_rue_avenue_boulevard_etc: String, // Can be null
  nom_de_la_voie: String, // Can be null
  adresse_postale: String, // Can be null
  complement_d_adresse_facultatif: String, // Can be null
  site_internet_du_festival: String,
  adresse_e_mail: String,
  decennie_de_creation_du_festival: String,
  annee_de_creation_du_festival: String,
  discipline_dominante: String,
  sous_categorie_spectacle_vivant: String,
  sous_categorie_musique: String, // Can be null
  sous_categorie_musique_cnm: String, // Can be null
  sous_categorie_cinema_et_audiovisuel: String, // Can be null
  sous_categorie_arts_visuels_et_arts_numeriques: String, // Can be null
  sous_categorie_livre_et_litterature: String,
  periode_principale_de_deroulement_du_festival: String,
  identifiant_agence_a: String, // Can be null
  geocodage_xy: {
    lat: Number,
    lon: Number,
  },
});

festivalSchema.index({
  nom_du_festival: "text",
  commune_principale_de_deroulement: "text",
  discipline_dominante: "text",
});
festivalSchema.index({ nom_du_festival: 1 });
festivalSchema.index({ commune_principale_de_deroulement: 1 });
festivalSchema.index({ discipline_dominante: 1 });

const Festival = mongoose.model("Festival", festivalSchema);

module.exports = Festival;
