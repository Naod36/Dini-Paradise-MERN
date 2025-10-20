const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://dini-paradise-frontend.onrender.com",
];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/dini-paradise";

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 20000 })

  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Dini Paradise API",
    status: "Server is running successfully",
  });
});
// Define Routes
<<<<<<< HEAD
=======
app.use("/api/auth", require("./routes/authRoutes")); // <-- NEW LINE for Auth
app.use("/api/reservations", require("./routes/reservationsRoutes"));
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
app.use("/api/images", require("./routes/imageRoutes"));
app.use("/api/menu-items", require("./routes/menuItemRoutes"));
app.use("/api/site-assets", require("./routes/siteAssetRoutes"));
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
});

module.exports = app;
