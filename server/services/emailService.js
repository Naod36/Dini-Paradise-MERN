// services/emailService.js

const sgMail = require("@sendgrid/mail");

// Set the API key from your .env file
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fromEmail = process.env.FROM_EMAIL;
const adminEmail = process.env.ADMIN_EMAIL;

/**
 * Sends a notification email to the admin about a new reservation.
 * @param {object} reservation - The reservation object from MongoDB.
 */
const sendAdminNotification = (reservation) => {
  const msg = {
    to: adminEmail,
    from: fromEmail,
    subject: `[New Reservation] Table for ${reservation.guests} on ${new Date(
      reservation.reservationDate
    ).toLocaleDateString()}`,
    html: `
      <h1>New Table Reservation Received</h1>
      <p>A new reservation has been made. Please review the details below and confirm it in the admin panel.</p>
      <h2>Reservation Details:</h2>
      <ul>
        <li><strong>Name:</strong> ${reservation.fullName}</li>
        <li><strong>Email:</strong> ${reservation.email}</li>
        <li><strong>Phone:</strong> ${reservation.phone}</li>
        <li><strong>Guests:</strong> ${reservation.guests}</li>
        <li><strong>Date:</strong> ${new Date(
          reservation.reservationDate
        ).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</li>
        <li><strong>Time:</strong> ${reservation.reservationTime}</li>
        <li><strong>Requests:</strong> ${reservation.requests || "None"}</li>
      </ul>
      <p>This email was sent automatically. Please log in to the admin panel to manage this reservation.</p>
    `,
  };
  console.log("message sent to admin");

  sgMail
    .send(msg)
    .catch((error) =>
      console.error("Error sending admin email:", error.response?.body || error)
    );
};

/**
 * Sends a confirmation email to the user who made the reservation.
 * @param {object} reservation - The reservation object from MongoDB.
 */
const sendUserConfirmation = (reservation) => {
  const msg = {
    to: reservation.email,
    from: fromEmail,
    subject: `Your Reservation at DINI is Pending Confirmation`,
    html: `
      <h1>Thank You for Your Reservation, ${reservation.fullName}!</h1>
      <p>We have received your request and it is now pending confirmation. We will notify you shortly once it's confirmed.</p>
      <h2>Your Reservation Details:</h2>
      <ul>
        <li><strong>Guests:</strong> ${reservation.guests}</li>
        <li><strong>Date:</strong> ${new Date(
          reservation.reservationDate
        ).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</li>
        <li><strong>Time:</strong> ${reservation.reservationTime}</li>
        <li><strong>Status:</strong> ${reservation.status}</li>
      </ul>
      <p>If you have any questions, please contact us directly.</p>
      <p>Best regards,<br/>The DINI Team</p>
    `,
  };

  sgMail
    .send(msg)
    .catch((error) =>
      console.error(
        "Error sending user confirmation email:",
        error.response?.body || error
      )
    );
};

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
};
