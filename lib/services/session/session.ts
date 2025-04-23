import { z } from "zod";
import { User, userRoles } from "@/lib/models";
import crypto from "crypto";
import { redisClient } from "../redis";
import {
  COOKIE_SESSION_KEY,
  SESSION_EXPIRATION_SECONDS,
} from "@/utils/constants";
import { DBSizeCommand } from "@upstash/redis";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const sessionSchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.enum(userRoles),
});

type UserSession = z.infer<typeof sessionSchema>;
export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;

  if (!sessionId) return null;

  return getUserBySessionId(sessionId);
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });

  setCookie(sessionId, cookies);
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, "get" | "delete">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  await redisClient.del(`session:${sessionId}`);
  cookies.delete(COOKIE_SESSION_KEY);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

async function getUserBySessionId(sessionId: string) {
  const rawUser = await redisClient.get(`session:${sessionId}`);

  const { success, data: user } = sessionSchema.safeParse(rawUser);

  success ? user : null;
}

export interface IAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault?: boolean;
}

interface IUserProjection {
  id: number;
  email: string;
  addresses: IAddress[];
  role: string;
  isDeleted: boolean;
}

type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;

type User = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>;

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: true;
}): Promise<FullUser>;

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: false;
}): Promise<FullUser | null>;

function _getCurrentUser(options: {
  withFullUser: false;
  redirectIfNotFound: true;
}): Promise<User>;

function _getCurrentUser(options: {
  withFullUser: false;
  redirectIfNotFound: false;
}): Promise<User | null>;

async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
} = {}) {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    if (redirectIfNotFound) return redirect("/login");
    return null;
  }

  if (withFullUser) {
    const fullUser = await getUserFromDb(user.id);
    if (fullUser == null) {
      return {
        success: false,
        status: 404,
        message: "User not found in database",
      };
    }
  }

  return null;
}

export const getCurrentUser = cache(_getCurrentUser);

function getUserFromDb(id: string): Promise<IUserProjection | null> {
  return User.findById(id, {
    id: 1,
    email: 1,
    addresses: 1,
    role: 1,
    isDeleted: 1,
  });
}
