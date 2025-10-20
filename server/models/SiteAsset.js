const mongoose = require("mongoose");
const SiteAssetSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // ADD THIS FIELD: Used to group assets by the page they appear on
  page: {
    type: String,
    required: true,
    enum: ["home", "about", "gallery", "itemMenu", "contact", "global"], // Use an enum for consistency
    lowercase: true,
    trim: true,
  },
  src: { type: String, required: true },
  public_id: { type: String, required: true },
  alt: { type: String, required: true },
});

module.exports = mongoose.model("SiteAsset", SiteAssetSchema);
