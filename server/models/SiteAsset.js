const mongoose = require("mongoose");
<<<<<<< HEAD

=======
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
const SiteAssetSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true, // This is crucial
=======
    unique: true,
    trim: true,
  },
  // ADD THIS FIELD: Used to group assets by the page they appear on
  page: {
    type: String,
    required: true,
    enum: ["home", "about", "gallery", "itemMenu", "contact", "global"], // Use an enum for consistency
    lowercase: true,
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
    trim: true,
  },
  src: { type: String, required: true },
  public_id: { type: String, required: true },
  alt: { type: String, required: true },
});

module.exports = mongoose.model("SiteAsset", SiteAssetSchema);
