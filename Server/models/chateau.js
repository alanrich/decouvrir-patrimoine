const mongoose = require("mongoose");

const chateauSchema = new mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  commune: String,
  type: String,
  periode_ou_style: String,
  region: String,
  region_historique: String,
  department: String,
  proprietaire_actuel: String,
  coordonnees: {
    latitude: Number,
    longitude: Number,
  },
});

chateauSchema.index({
  name: "text",
  commune: "text",
  periode_ou_style: "text",
});

chateauSchema.index({ name: 1 });
chateauSchema.index({ commune: 1 });
chateauSchema.index({ periode_ou_style: 1 });

const Chateau = mongoose.model("Chateaux", chateauSchema);

module.exports = Chateau;
