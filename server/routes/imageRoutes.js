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

router.post("/", async (req, res) => {
  const { name, description, src, public_id, alt } = req.body;
  try {
    // We also need to get the 'key' from the body now.
    const { key } = req.body;

    let asset = new Image({
      key, // <-- ADD THIS
      name,
      description,
      // page, // <-- REMOVE THIS
      src,
      public_id,
      alt,
    });
    await asset.save();
    res.status(201).json(asset);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ msg: "A gallery item with this key already exists." });
    }
    res.status(500).json({ msg: "Server Error", error: err.message }); // Send JSON
  }
});

router.put("/:key", async (req, res) => {
  const { name, description, src, public_id, alt } = req.body;

  // Build asset fields object
  const assetFields = {};
  if (name) assetFields.name = name;
  if (description) assetFields.description = description;
  if (src) assetFields.src = src;
  if (public_id) assetFields.public_id = public_id;
  if (alt) assetFields.alt = alt;

  try {
    let asset = await Image.findOneAndUpdate(
      { key: req.params.key },
      { $set: assetFields },
      { new: true, runValidators: true } // new: true returns the updated document
    );

    if (!asset) {
      return res.status(404).json({ msg: "Image not found" });
    }

    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/menu-items/:id
// @desc    Delete a menu item (Admin)
// @access  Private (Admin)
router.delete("/:key", async (req, res) => {
  try {
    // 1. Use findOneAndDelete() to find the document by its 'key'
    //    and delete it in one atomic operation.
    const asset = await Image.findOneAndDelete({ key: req.params.key });

    // 2. This 'if' check now works correctly. If no document
    //    matched the key, 'asset' will be null.
    if (!asset) {
      return res.status(404).json({ msg: "The Gallery asset not found" });
    }

    // 3. If we get here, the item was found and successfully deleted.
    res.json({ msg: "Gallery asset removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error during DELETE" });
  }
});

// We will add POST and DELETE routes here for the admin panel later.
// For now, this is all we need for the gallery display.

module.exports = router;
