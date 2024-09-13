import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST!,
  port: 587,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },

  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASSWORD!,
  },
});

export const VerificationTemplate = (url: string) => {
  return `<html>
    <head>
      <title>Email Verification From Thera Notes</title>
    </head>
    <body>
      <h1>Email Verification</h1>
      <p>Hello,</p>
      <p>Please click the button below to verify your email address:</p>
      <a
        href='${url}'
        style='padding: 10px; background-color: #4CAF50; color: white; text-decoration: none; display: inline-block;'
      >
        Verify Email
      </a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    </body>
  </html>`;
};
