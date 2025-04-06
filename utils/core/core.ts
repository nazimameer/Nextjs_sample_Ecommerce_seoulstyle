import crypto from "crypto";

// OTP
export const generateOtp = () =>
  parseInt(crypto.randomInt(100000, 999999).toString());

// User id
export const generateUserId = () =>
  parseInt(crypto.randomInt(10000000, 100000000).toString());
