"use server";

import { connectToDB } from "@/lib/database/mogoose";
import { OTP } from "@/lib/models";
import { sendEmail } from "@/lib/services/sendEmail";
import { ISendAuthMailRes, ISendEmailOptions } from "./interface";
import { generateOneTimePasswordEmailTemplate } from "@/lib/services/emailTemplates";
import { constructCurrentFormattedDate, getCurrentYear } from "@/utils";
import { OTP_VALIDITY_DURATION, RESEND_WAIT_DURATION } from "@/utils/constants";
import { generateOtp } from "@/utils/core";

/**
 * Sends a one-time password (OTP) to the user's email.
 * Prevents resending within 1 minute.
 */
export async function sendAuthMail(email: string): Promise<ISendAuthMailRes> {
  try {
    await connectToDB(); // Connect to the database
    const now = new Date();
    const existingOtp = await OTP.findOne({ email });

    const currentDate = constructCurrentFormattedDate();
    const currentYear = getCurrentYear();

    if (existingOtp) {
      const timeSinceLastSend =
        now.getTime() - new Date(existingOtp.lastSentAt).getTime();

      // Block resending OTP if within cooldown period
      if (timeSinceLastSend < RESEND_WAIT_DURATION) {
        const waitTime = Math.ceil(
          (RESEND_WAIT_DURATION - timeSinceLastSend) / 1000
        );
        return {
          success: false,
          status: 429,
          message: `Please wait ${waitTime} seconds before resending.`,
        };
      }

      // Update OTP and expiration
      const newOtp = generateOtp();
      existingOtp.otp = newOtp;
      existingOtp.expiresAt = new Date(now.getTime() + OTP_VALIDITY_DURATION);
      existingOtp.lastSentAt = now;
      await existingOtp.save();

      // Send updated OTP via email
      const emailData: ISendEmailOptions = {
        to: email,
        subject: "Your One-Time Password",
        html: generateOneTimePasswordEmailTemplate(
          newOtp,
          currentDate,
          currentYear
        ),
      };

      await sendEmail(emailData);
      return { success: true, status: 200, message: "OTP sent successfully!" };
    }

    // No existing OTP — create a new one
    const otp = generateOtp();
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(now.getTime() + OTP_VALIDITY_DURATION),
      lastSentAt: now,
    });

    // Send new OTP via email
    const emailData: ISendEmailOptions = {
      to: email,
      subject: "Your One-Time Password",
      html: generateOneTimePasswordEmailTemplate(otp, currentDate, currentYear), // Generate the HTML content for the email
    };

    await sendEmail(emailData);
    return { success: true, status: 201, message: "OTP sent successfully!" };
  } catch (error) {
    // Throw error
    console.error("Error sending OTP:", error);
    return { success: false, status: 500, message: "Internal Server Error" };
  }
}
