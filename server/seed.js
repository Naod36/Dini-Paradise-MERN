const mongoose = require("mongoose");
const User = require("./models/User"); // Path to your User model
require("dotenv").config(); // Ensure this is run to load MONGODB_URI

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/dini-paradise";

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB.");

    // Check if admin already exists to prevent duplicates
    const existingAdmin = await User.findOne({ email: "admin@dini.com" });
    if (existingAdmin) {
      console.log("Admin user already exists. Skipping seed.");
      await mongoose.disconnect();
      return;
    }

    // CREATE NEW ADMIN INSTANCE (The .save() method below will hash the password)
    const newAdmin = new User({
      email: "admin@dini.com",
      // The password MUST be the plain text password here
      password: "password123",
      role: "admin",
    });

    await newAdmin.save();
    console.log("Admin user created and password hashed successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding admin user:", error);
    await mongoose.disconnect();
  }
};

seedAdmin();
