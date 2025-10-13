const mongoose = require("mongoose");

const SiteAssetSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true, // This is crucial
    trim: true,
  },
  src: { type: String, required: true },
  public_id: { type: String, required: true },
  alt: { type: String, required: true },
});

module.exports = mongoose.model("SiteAsset", SiteAssetSchema);
