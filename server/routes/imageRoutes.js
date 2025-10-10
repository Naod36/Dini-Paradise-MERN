const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

// @route   GET /api/images
// @desc    Get all gallery images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 }); // Sort by newest
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// We will add POST and DELETE routes here for the admin panel later.
// For now, this is all we need for the gallery display.

module.exports = router;
