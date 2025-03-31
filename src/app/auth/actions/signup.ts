"use server";

import { db } from "@/utils/drizzle";
import { usersTable } from "@/utils/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createUserSession, generateSalt, hashPassword } from "@/utils/auth/nodemodule";

export default async function signUp(data: FormData) {
  try {
    const user = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      username: data.get("username") as string,
    };
    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, user.email),
    });
    if (existingUser) {
      return "Email already exists";
    }
    const salt = generateSalt();
    const hashedPassword: string = await hashPassword(user.password, salt);
    const [addedUser] = await db
      .insert(usersTable)
      .values({
        email: user.email,
        password: hashedPassword,
        salt: salt,
        name: user.username,
      })
      .returning({ id: usersTable.id, role: usersTable.role });
    if (addedUser == null) {
      return "Unable to create account";
    }
    await createUserSession(addedUser, await cookies());
  } catch (error) {
    console.error("Error::", error);
    return "Error when creating account";
  }
  redirect("/auth/private");
}
