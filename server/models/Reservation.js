// models/Reservation.js
const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    // Guest Information
    fullName: {
      type: String,
      required: [true, "Full Name is required."],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
    },
    guests: {
      type: Number,
      required: [true, "Number of guests is required."],
      min: [1, "Must have at least 1 guest."],
      // Note: The form has '4+' as an option. We will handle the conversion in the route.
    },

    // Reservation Details (Refactored)
    reservationDate: {
      type: Date, // Store as a Date object for the date portion
      required: [true, "Reservation date is required."],
    },
    reservationTime: {
      type: String, // Storing time as a string (e.g., "18:30") is often easiest
      required: [true, "Reservation time is required."],
      trim: true,
    },

    // Additional Information
    requests: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Special requests cannot exceed 500 characters"],
    },

    // System/Tracking Fields
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    isAgreedToTerms: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model. Use 'Reservation' as the collection name.

module.exports = mongoose.model("Reservation", ReservationSchema);
