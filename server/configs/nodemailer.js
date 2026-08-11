import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "smtp-relay.brevo.com";
const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
const smtpUser = process.env.SMTP_USER || process.env.SENDER_EMAIL;
const smtpPass = process.env.SMTP_PASS;

// Create a transporter using flexible SMTP configuration
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // true for 465, false for 587 or other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export default transporter;