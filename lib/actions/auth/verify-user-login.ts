"use server";

import { connectToDB } from "@/lib/database/mogoose";
import { OTP, User } from "@/lib/models";
import { createUserSession } from "@/lib/services/session";
import { generateUserId } from "@/utils/core";
import { UserRoles } from "@/utils/types";
import { cookies } from "next/headers";
import { IVerifyAuthRes } from "./interface";

export async function verifyAuthOtp(
  email: string,
  otp: number
): Promise<IVerifyAuthRes> {
  try {
    await connectToDB();

    // Find the OTP document
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return { success: false, status: 400, message: "Invalid OTP" };
    }

    if (otpRecord.expiresAt < new Date()) {
      return { success: false, status: 401, message: "OTP expired" };
    }

    // OTP is valid — delete it
    await OTP.deleteOne({ _id: otpRecord._id });

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      const id = generateUserId();
      user = await User.create({ email, role: UserRoles.value1, id });
    }

    if (user === null) {
      return {
        success: false,
        status: 500,
        message: "Unable to create account",
      };
    }

    await createUserSession(user, await cookies());

    return {
      success: true,
      status: 200,
      message: "Logged in successfully",
      role: user.role,
    };
  } catch (error) {
    console.error("OTP verification failed", { email, otp, error });
    return { success: false, status: 500, message: "Something went wrong" };
  }
}
