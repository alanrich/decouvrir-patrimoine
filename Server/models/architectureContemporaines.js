const mongoose = require("mongoose");

const architectureContemporainesSchema = new mongoose.Schema({
  reference_de_la_notice: String,
  ancienne_reference_de_la_notice_renv: String,
  cadre_de_l_etude: String,
  region: String,
  numero_departement: String,
  commune: String,
  ancien_nom_commune: String,
  insee: String,
  lieudit: String,
  adresse_normalisee: String,
  adresse_forme_editoriale: String,
  references_cadastrales: String,
  coordonnees: {
    lon: Number,
    lat: Number,
  },
  titre_courant: String,
  departement_en_lettres: String,
  vocable_pour_les_edifices_cultuels: String,
  denominations: [String],
  destination_actuelle_de_l_edifice: String,
  siecle_de_la_campagne_principale_de_construction: String,
  siecle_de_campagne_secondaire_de_construction: String,
  datation_de_l_edifice: String,
  description_historique: String,
  auteur_de_l_edifice: String,
  date_de_label: String,
  precisions_sur_l_interet: String,
  elements_remarquables_dans_l_edifice: String,
  observations: String,
  statut_juridique_du_proprietaire: String,
  etablissement_affectataire_de_l_edifice: String,
  auteur_de_la_photographie_autp: String,
  liens_externes: [String],
  acces_memoire_web: [String],
  materiaux_du_gros_oeuvre: String,
  type_de_couverture: String,
  partie_d_elevation_exterieure: String,
  materiaux_de_la_couverture: String,
  typologie_de_plan: String,
  technique_du_decor_porte_de_l_edifice: String,
  indexation_iconographique_normalisee: String,
  description_de_l_elevation_interieure: String,
  emplacement_forme_structure_escalier: String,
  etat_de_conservation: String,
  description_de_l_edifice: String,
  commune_forme_editoriale: String,
});

architectureContemporainesSchema.index({
  titre_courant: "text",
  commune: "text",
  region: "text",
});
architectureContemporainesSchema.index({ denominations: 1 });
architectureContemporainesSchema.index({ titre_courant: 1 });
architectureContemporainesSchema.index({ commune: 1 });
architectureContemporainesSchema.index({ region: 1 });

const ArchitectureContemporaines = mongoose.model(
  "ArchitectureContemporaines",
  architectureContemporainesSchema
);

module.exports = ArchitectureContemporaines;
