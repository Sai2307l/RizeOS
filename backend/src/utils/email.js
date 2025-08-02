import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendVerificationEmail = async (userEmail, token) => {
  const url = `${process.env.FRONTEND_URL}/api/auth/verify-email?token=${token}`;
  await transporter.sendMail({
    from: `"RizeOS" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Verify Your Email for RizeOS",
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
  });
};
