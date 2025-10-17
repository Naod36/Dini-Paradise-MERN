const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Prevents password from being included in query results by default
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// --- Pre-save Hook: Hash password before saving ---
UserSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords in the auth route
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // Note: 'this.password' needs to be explicitly selected in the query for this to work
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
