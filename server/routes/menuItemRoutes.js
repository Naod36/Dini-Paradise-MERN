const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// @route   GET /api/menu-items
// @desc    Get all menu items, with optional filtering
// @access  Public
router.get("/", async (req, res) => {
  try {
    const filter = {};

    // Allow filtering by category, e.g., /api/menu-items?category=Pizza
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Allow filtering for popular items, e.g., /api/menu-items?popular=true
    if (req.query.popular === "true") {
      filter.isPopular = true;
    }

    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// We will add POST, PUT, DELETE routes here for the admin panel later.

module.exports = router;
