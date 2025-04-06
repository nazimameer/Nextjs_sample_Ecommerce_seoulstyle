import { model, models, Schema } from "mongoose"; // Importing Mongoose modules
import { IOtp } from "./interface";

const OTPSchema = new Schema<IOtp>(
  {
    email: { type: String, required: true },
    otp: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    lastSentAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const OTP = models?.OTP || model<IOtp>("OTP", OTPSchema);
