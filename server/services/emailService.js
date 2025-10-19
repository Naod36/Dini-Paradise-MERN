// services/emailService.js
require("dotenv").config();
const { MailerSend, EmailParams, Recipient, Sender } = require("mailersend");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER_FORUSER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const fromEmailUser = process.env.EMAIL_USER_FORUSER;

const fromEmail = process.env.FROM_EMAIL;
const fromName = process.env.FROM_NAME || "DINI";
const adminEmail = process.env.ADMIN_EMAIL;

async function sendEmailUser(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmailUser}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Email error:", err.message);
  }
}
// Helper function for sending
async function sendEmail(emailParams) {
  try {
    const res = await mailersend.email.send(emailParams);
    console.log("✅ Email sent:", res?.body || res);
  } catch (err) {
    console.error("❌ MailerSend error:", err?.response?.body || err);
  }
}
async function sendConfirmationEmail(reservation) {
  const mailOptions = {
    from: `"DINI" <${process.env.EMAIL_USER}>`,
    to: reservation.email,
    subject: "Your Reservation Has Been Confirmed!",
    html: `
      <h1>Reservation Confirmed 🎉</h1>
      <p>Hi ${reservation.fullName},</p>
      <p>Your reservation at DINI has been <b>confirmed</b>.</p>
      <ul>
        <li>Date: ${new Date(
          reservation.reservationDate
        ).toLocaleDateString()}</li>
        <li>Time: ${reservation.reservationTime}</li>
        <li>Guests: ${reservation.guests}</li>
      </ul>
      <p>We look forward to serving you!</p>
      <p>— The DINI Team</p>
    `,
  };
  await transporter.sendMail(mailOptions);
}

async function sendCancellationEmail(reservation) {
  const mailOptions = {
    from: `"DINI" <${process.env.EMAIL_USER_FORUSER}>`,
    to: reservation.email,
    subject: "Your Reservation Has Been Cancelled",
    html: `
      <h1>Reservation Cancelled</h1>
      <p>Hi ${reservation.fullName},</p>
      <p>We’re sorry to inform you that your reservation at DINI has been <b>cancelled</b>.</p>
      <p>If you believe this is an error, please contact us directly.</p>
      <p>— The DINI Team</p>
    `,
  };
  await transporter.sendMail(mailOptions);
}

// Admin notification
const sendAdminNotification = async (reservation) => {
  try {
    const subject = `[New Reservation] Table for ${
      reservation.guests
    } on ${new Date(reservation.reservationDate).toLocaleDateString()}`;

    const html = `
      <h1>New Table Reservation Received</h1>
      <p>A new reservation has been made. Review in the admin panel.</p>
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
    `;

    const emailParams = new EmailParams()
      .setFrom(new Sender(fromEmail, fromName))
      .setTo([new Recipient(adminEmail, "Admin")])
      .setSubject(subject)
      .setHtml(html);

    await sendEmail(emailParams);
    console.log("📩 Admin notification sent.");
  } catch (err) {
    console.error("Error sending admin notification:", err);
  }
};

// User confirmation
// const sendUserConfirmation = async (reservation) => {
//   try {
//     const subject = `Your Reservation at DINI is Pending Confirmation`;
//     const html = `
//       <h1>Thank You for Your Reservation, ${reservation.fullName}!</h1>
//       <p>We have received your request and it is now pending confirmation.</p>
//       <h2>Your Reservation Details:</h2>
//       <ul>
//         <li><strong>Guests:</strong> ${reservation.guests}</li>
//         <li><strong>Date:</strong> ${new Date(
//           reservation.reservationDate
//         ).toLocaleDateString("en-US", {
//           weekday: "long",
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })}</li>
//         <li><strong>Time:</strong> ${reservation.reservationTime}</li>
//         <li><strong>Status:</strong> ${reservation.status}</li>
//       </ul>
//       <p>If you have any questions, please contact us directly.</p>
//       <p>Best regards,<br/>The DINI Team</p>
//     `;

//     const emailParams = new EmailParams()
//       .setFrom(new Sender(fromEmail, fromName))
//       .setTo([new Recipient(reservation.email, reservation.fullName)])
//       .setSubject(subject)
//       .setHtml(html);

//     await sendEmail(emailParams);
//     console.log("📩 User confirmation sent.");
//   } catch (err) {
//     console.error("Error sending user confirmation email:", err);
//   }
// };
const sendUserConfirmation = async (reservation) => {
  const subject = `Your Reservation at DINI is Pending Confirmation`;
  const html = `
    <h1>Thank You for Your Reservation, ${reservation.fullName}!</h1>
    <p>We have received your request and it is now pending confirmation.</p>
    <ul>
      <li><strong>Guests:</strong> ${reservation.guests}</li>
      <li><strong>Date:</strong> ${new Date(
        reservation.reservationDate
      ).toLocaleDateString()}</li>
      <li><strong>Time:</strong> ${reservation.reservationTime}</li>
      <li><strong>Status:</strong> ${reservation.status}</li>
    </ul>
    <p>Best regards,<br/>The DINI Team</p>
  `;

  await sendEmailUser(reservation.email, subject, html);
  console.log("📩 User confirmation sent.");
};

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
  sendConfirmationEmail,
  sendCancellationEmail,
};
