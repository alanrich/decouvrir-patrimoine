const mongoose = require("mongoose");

const castleSchema = new mongoose.Schema({
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
  coordonnes: {
    latitude: Number,
    longitude: Number,
  },
});

castleSchema.index({
  name: "text",
  commune: "text",
  periode_ou_style: "text",
});

castleSchema.index({ name: 1 });
castleSchema.index({ commune: 1 });
castleSchema.index({ periode_ou_style: 1 });

const Castle = mongoose.model("Castle", castleSchema);

module.exports = Castle;
