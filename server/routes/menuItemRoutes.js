const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
<<<<<<< HEAD

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
=======
const jwt = require("jsonwebtoken"); // <-- 1. REQUIRED PACKAGE

// --- AUTH MIDDLEWARE IMPLEMENTATION ---
const authMiddleware = (req, res, next) => {
  // 1. Get token from header (e.g., "Bearer eyJhbGciOi...")
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    // Token is missing entirely
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Check for the "Bearer " prefix and extract the raw token
  if (authHeader.indexOf("Bearer ") !== 0) {
    return res
      .status(401)
      .json({ msg: "Invalid token format, expected 'Bearer <token>'" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    // 2. Verify the token using the secret key
    // NOTE: The fallback secret is only for local dev. Ensure process.env.JWT_SECRET is set on Render.
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret-for-development-only"
    );

    // 3. Attach the decoded user payload (e.g., user ID, role) to the request object
    req.user = decoded.user;

    // 4. Proceed to the route handler
    next();
  } catch (err) {
    // Token is invalid (expired, wrong secret, malformed)
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ msg: "Token is not valid or has expired" });
  }
};

// @route   GET /api/menu-items
// @desc    Get all menu items, with optional filtering
// @access  Public
router.get("/", async (req, res) => {
  try {
    const filter = {}; // Allow filtering by category, e.g., /api/menu-items?category=Pizza

    if (req.query.category) {
      filter.category = req.query.category;
    } // Allow filtering for popular items, e.g., /api/menu-items?popular=true

>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
    if (req.query.popular === "true") {
      filter.isPopular = true;
    }

    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
<<<<<<< HEAD
    res.status(500).send("Server Error");
  }
});

// We will add POST, PUT, DELETE routes here for the admin panel later.
=======
    res.status(500).json({ msg: "Server Error during GET" }); // Use JSON for errors
  }
});

// @route   POST /api/menu-items
// @desc    Create a new menu item (Admin)
// @access  Private (Admin)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error during POST" }); // Use JSON for errors
  }
});

// @route   PUT /api/menu-items/:id
// @desc    Update an existing menu item (Admin)
// @access  Private (Admin)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    let item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Menu item not found" });
    }

    item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error during PUT" }); // Use JSON for errors
  }
});

// @route   DELETE /api/menu-items/:id
// @desc    Delete a menu item (Admin)
// @access  Private (Admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Menu item not found" });
    }

    await MenuItem.findByIdAndDelete(req.params.id);

    res.json({ msg: "Menu item removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error during DELETE" }); // Use JSON for errors
  }
});
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5

module.exports = router;
