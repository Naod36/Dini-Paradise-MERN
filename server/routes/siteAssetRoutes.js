const express = require("express");
const router = express.Router();
const SiteAsset = require("../models/SiteAsset");

// 1. GET ALL ASSETS FOR A SPECIFIC PAGE
// @route   GET /api/site-assets/page/:page
// @desc    Get all assets for a specific page (for admin listing)
router.get("/page/:page", async (req, res) => {
  try {
    const assets = await SiteAsset.find({ page: req.params.page }).sort({
      key: 1,
    });
    res.json(assets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 2. POST (CREATE) A NEW ASSET (Requires Admin Middleware/Auth)
// @route   POST /api/site-assets
// @desc    Create a new site asset
// NOTE: You must add authentication middleware here later.
router.post("/", async (req, res) => {
  const { key, page, src, public_id, alt } = req.body;
  try {
    let asset = new SiteAsset({ key, page, src, public_id, alt });
    await asset.save();
    res.status(201).json(asset);
  } catch (err) {
    console.error(err.message);
    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Asset key already exists" });
    }
    res.status(500).send("Server Error");
  }
});

// 3. PUT (UPDATE) AN EXISTING ASSET (Requires Admin Middleware/Auth)
// @route   PUT /api/site-assets/:key
// @desc    Update an existing site asset by key (e.g., change the src or alt text)
// NOTE: You must add authentication middleware here later.
router.put("/:key", async (req, res) => {
  const { src, public_id, alt } = req.body;

  // Build asset fields object
  const assetFields = {};
  if (src) assetFields.src = src;
  if (public_id) assetFields.public_id = public_id;
  if (alt) assetFields.alt = alt;

  try {
    let asset = await SiteAsset.findOneAndUpdate(
      { key: req.params.key },
      { $set: assetFields },
      { new: true, runValidators: true } // new: true returns the updated document
    );

    if (!asset) {
      return res.status(404).json({ msg: "Asset not found" });
    }

    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ... your existing GET by key route here ...
// router.get("/key/:key", async (req, res) => { /* ... */ });

module.exports = router;
