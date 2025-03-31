import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { redisClient } from "../redis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db } from "../drizzle";
import { eq } from "drizzle-orm";
import { usersTable } from "../drizzle/schema";

export const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const COOKIE_SESSION_KEY = "session-id";

export async function getUserFromSession(cookies: Pick<ReadonlyRequestCookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;
  const rawUser: {
    id: string;
    role: "user" | "admin";
  } | null = await redisClient.get(`session:${sessionId}`);
  return rawUser ?? null;
}

type FullUser = Exclude<Awaited<ReturnType<typeof getUserFromDb>>, undefined | null>;
type User = Exclude<Awaited<ReturnType<typeof getUserFromSession>>, undefined | null>;
// Cách để tạo ra các type return từ 1 function trong hàng loạt các usecase khác nhau nếu muốn rõ ràng. Nếu k buộc phải dùng any
function _getCurrentUser(options: { withFullUser: true; redirectIfNotFound: true }): Promise<FullUser>;
function _getCurrentUser(options: { withFullUser: true; redirectIfNotFound?: false }): Promise<FullUser | null>;
function _getCurrentUser(options: { withFullUser?: false; redirectIfNotFound: true }): Promise<User>;
function _getCurrentUser(options?: { withFullUser?: false; redirectIfNotFound?: false }): Promise<User | null>;

async function _getCurrentUser({ withFullUser = false, redirectIfNotFound = false } = {}) {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    if (redirectIfNotFound) return redirect("/auth/signin");
    return null;
  }

  if (withFullUser) {
    const fullUser = await getUserFromDb(user.id);
    // This should never happen
    if (fullUser == null) throw new Error("User not found in database");
    return fullUser;
  }

  return user;
}

export const getCurrentUser = cache(_getCurrentUser);

function getUserFromDb(id: string) {
  return db.query.usersTable.findFirst({
    columns: { id: true, email: true, role: true, name: true },
    where: eq(usersTable.id, id),
  });
}
