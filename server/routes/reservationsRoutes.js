// routes/reservations.js

const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const {
  sendAdminNotification,
  sendUserConfirmation,
} = require("../services/emailService");

// --- CREATE a new reservation ---
// @route   POST /api/reservations
// @desc    Create a new reservation and send emails
router.post("/", async (req, res) => {
  try {
    // Basic validation to ensure checkbox was ticked
    if (!req.body.isAgreedToTerms) {
      return res
        .status(400)
        .json({ message: "You must agree to the terms and conditions." });
    }

    // Create a new reservation instance from the request body
    const newReservation = new Reservation({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      guests: Number(req.body.guests), // Ensure guests is a number
      reservationDate: req.body.reservationDate,
      reservationTime: req.body.reservationTime,
      requests: req.body.requests,
      isAgreedToTerms: req.body.isAgreedToTerms,
    });

    // Save the reservation to the database
    const savedReservation = await newReservation.save();

    // After saving, trigger the emails (don't wait for them to finish)
    sendAdminNotification(savedReservation);
    sendUserConfirmation(savedReservation);

    // Send a success response back to the client
    res.status(201).json({
      message: "Reservation successfully created!",
      reservation: savedReservation,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    // Handle validation errors from Mongoose
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// --- GET all reservations (for the admin panel) ---
// @route   GET /api/reservations
// @desc    Fetch all reservations, sorted by most recent
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Server error fetching reservations." });
  }
});

// --- UPDATE reservation status ---
// @route   PUT /api/reservations/:id/status
// @desc    Update a reservation's status (Confirm or Cancel)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!["Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Send email based on new status
    if (status === "Confirmed") {
      const { sendConfirmationEmail } = require("../services/emailService");
      await sendConfirmationEmail(reservation);
    } else if (status === "Cancelled") {
      const { sendCancellationEmail } = require("../services/emailService");
      await sendCancellationEmail(reservation);
    }

    res.json({ message: "Reservation status updated", reservation });
  } catch (error) {
    console.error("Error updating reservation status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
