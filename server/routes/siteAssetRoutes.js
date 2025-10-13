const express = require("express");
const router = express.Router();
const SiteAsset = require("../models/SiteAsset");

// @route   GET /api/site-assets/key/:key
// @desc    Get a single site asset by its unique key
router.get("/key/:key", async (req, res) => {
  try {
    const asset = await SiteAsset.findOne({ key: req.params.key });
    if (!asset) {
      return res.status(404).json({ msg: "Asset not found" });
    }
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
