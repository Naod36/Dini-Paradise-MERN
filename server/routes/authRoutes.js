const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // <-- Assuming you have a User model

// NOTE: You MUST create a MongoDB collection/model named 'User'
// and ensure you have at least one admin user seeded with a hashed password!

// @route   POST /api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if the user exists (and ensure they have the 'admin' role)
    let user = await User.findOne({ email });

    // Basic check: If you are only supporting one admin, you can simplify this.
    if (!user || user.role !== "admin") {
      return res
        .status(400)
        .json({ msg: "Invalid Credentials or not authorized as admin." });
    }

    // 2. Compare the sent password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials." });
    }

    // 3. Create the JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role, // Crucial for role-based authorization
      },
    };

    // 4. Sign (Create) the token
    // This token uses the same JWT_SECRET defined in your .env
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" }, // Token expiration time
      (err, token) => {
        if (err) throw err;
        // 5. Send the token back to the client
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Login Server Error:", err.message);
    res.status(500).send("Server Error during Login");
  }
});

module.exports = router;
