import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // no need to set host or port etc.
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  host: "smtp.gmail.com",
  port: 465,
});
