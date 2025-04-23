import { Document } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: number;
  expiresAt: Date;
  lastSentAt: Date;
}