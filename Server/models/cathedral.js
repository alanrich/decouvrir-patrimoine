const mongoose = require("mongoose");

const cathedralSchema = new mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  style_dominant: String,
  site_web: String,
  department: String,
  region: String,
  ville: String,
  coordonnees: {
    latitude: Number,
    longitude: Number,
  },
});

cathedralSchema.index({
  name: "text",
  ville: "text",
  style_dominant: "text",
});

cathedralSchema.index({ name: 1 });
cathedralSchema.index({ ville: 1 });
cathedralSchema.index({ style_dominant: 1 });

const Cathedral = mongoose.model("Cathedrals", cathedralSchema);

module.exports = Cathedral;
