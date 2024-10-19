const mongoose = require("mongoose");

const operaSchema = new mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  type: String,
  lieu: String,
  architecte: String,
  inauguration: String,
  capacite: String,
  site_web: String,
  coordonnees: {
    latitude: Number,
    longitude: Number,
  },
});

operaSchema.index({
  name: "text",
  lieu: "text",
  type: "text",
});

operaSchema.index({ name: 1 });
operaSchema.index({ commune: 1 });
operaSchema.index({ periode_ou_style: 1 });

const OperaHouse = mongoose.model("OperaHouses", operaSchema);

module.exports = OperaHouse;
