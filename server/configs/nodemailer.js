import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenv.config();

const smtpHost = (process.env.SMTP_HOST || "smtp-relay.brevo.com").trim();
const smtpPort = parseInt(process.env.SMTP_PORT) || 587;
const smtpUser = (process.env.SMTP_USER || process.env.SENDER_EMAIL)?.trim();
const smtpPass = (process.env.SMTP_PASS)?.trim();

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