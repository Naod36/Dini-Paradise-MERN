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
