"use server";

import { comparePasswords, createUserSession } from "@/utils/auth/nodemodule";
import { db } from "@/utils/drizzle";
import { usersTable } from "@/utils/drizzle/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signIn(data: FormData) {
  try {
    const user = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    const existingUser = await db.query.usersTable.findFirst({
      columns: { password: true, salt: true, id: true, email: true, role: true },
      where: eq(usersTable.email, user.email),
    });
    if (!existingUser || existingUser.password == null || existingUser.salt == null) {
      return "Unable to login";
    }
    const isCorrectPassword = await comparePasswords({
      hashedPassword: existingUser.password,
      password: user.password,
      salt: existingUser.salt,
    });
    if (!isCorrectPassword) return "Incorrect password";
    await createUserSession(existingUser, await cookies());
  } catch (error) {
    console.error("Error::", error);
    return "Error when creating account";
  }
  redirect("/auth/private");
}
