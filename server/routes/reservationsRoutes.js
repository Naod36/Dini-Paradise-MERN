<<<<<<< HEAD
// pages/api/reservations.js

import dbConnect from "../../lib/dbConnect";
import Reservation from "../../models/Reservation"; // Import the new model
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    // Updated field names to match the form structure and new model
    const {
      fullName,
      email,
      phone,
      guests,
      reservationDate,
      reservationTime,
      requests,
      agreeTerms,
    } = req.body;

    // 1. Basic Server-Side Validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !guests ||
      !reservationDate ||
      !reservationTime ||
      !agreeTerms
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    // Convert guests to number (handle '4+' case from select)
    const partySize = guests === "4+" ? 5 : parseInt(guests, 10);

    try {
      // 2. Save to MongoDB
      const newReservation = await Reservation.create({
        fullName,
        email,
        phone,
        guests: partySize,
        reservationDate: new Date(reservationDate), // Store date as Date object
        reservationTime, // Store time as a string (e.g., "19:00")
        requests,
        isAgreedToTerms: agreeTerms,
      });

      // 3. Send Email Notification (Admin Alert)
      await resend.emails.send({
        from: "Table Reservations <alerts@yourverifieddomain.com>",
        to: [process.env.ADMIN_EMAIL], // Your restaurant's admin email
        subject: `NEW TABLE RESERVATION for ${fullName} (${partySize} people)`,
        html: `
                    <h1>New Table Reservation Received!</h1>
                    <p><strong>Name:</strong> ${fullName}</p>
                    <p><strong>Guests:</strong> ${partySize}</p>
                    <p><strong>Date:</strong> ${reservationDate}</p>
                    <p><strong>Time:</strong> ${reservationTime}</p>
                    <p><strong>Contact:</strong> ${email} / ${phone}</p>
                    <p><strong>Requests:</strong> ${requests || "None"}</p>
                    <p>View details in your admin dashboard.</p>
                `,
      });

      return res.status(201).json({ success: true, data: newReservation });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid data submitted.",
          details: error.message,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
=======
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
>>>>>>> f502a8653b903797caad2a904a1ef771c89443b5
