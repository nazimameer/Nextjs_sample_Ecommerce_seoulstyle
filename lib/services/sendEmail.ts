import nodemailer from "nodemailer";
import { env } from "@/data/env/server";
import { SendEmailOptions } from "./interface";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_PORT),
  secure: false, // Use true for port 465, false for 587
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export async function sendEmail(data: SendEmailOptions) {
  const { to, subject, html } = data;

  await transporter.sendMail({
    from: `"SeoulStyle" <${env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
}
