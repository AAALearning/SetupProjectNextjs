import { redisClient } from "@/utils/redis";
import crypto from "crypto";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { COOKIE_SESSION_KEY, SESSION_EXPIRATION_SECONDS } from ".";

export const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex").normalize(); // 5c42891c60590f5e23f1c449e926b521
};

export const hashPassword = (password: string, salt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error);
      resolve(hash.toString("hex").normalize());
    });
  });
};

export const createUserSession = async (
  user: { id: string; role: "user" | "admin" },
  cookieStore: ReadonlyRequestCookies
) => {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  redisClient.set(`session:${sessionId}`, user, {
    ex: SESSION_EXPIRATION_SECONDS,
  });
  cookieStore.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
};

export async function comparePasswords({
  password,
  salt,
  hashedPassword,
}: {
  password: string;
  salt: string;
  hashedPassword: string;
}) {
  const inputHashedPassword = await hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(inputHashedPassword, "hex"), Buffer.from(hashedPassword, "hex"));
}
