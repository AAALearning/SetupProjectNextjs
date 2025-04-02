import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getOAuthClient, OAuthProvider } from "../actions";
import { cookies } from "next/headers";
import { db } from "@/utils/drizzle";
import { eq } from "drizzle-orm";
import { userOAuthAccountTable, usersTable } from "@/utils/drizzle/schema";
import { createUserSession } from "@/utils/auth/nodemodule";

export async function GET(request: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider: rawProvider } = await params;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  // provider gửi code tới đây mà lỗi thì phải redirect tới trang lỗi
  if (typeof code !== "string" || typeof state !== "string") {
    redirect(`/auth/signin?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`);
  }

  const oAuthClient = getOAuthClient(rawProvider as OAuthProvider);
  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state, await cookies());
    const user = await connectUserToAccount(oAuthUser, rawProvider as OAuthProvider);
    await createUserSession(user, await cookies());
  } catch (error) {
    console.error(error);
    redirect(`/auth/signin?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`);
  }
  redirect("/auth/private");
}

function connectUserToAccount(
  { id, email, name }: { id: string; email: string; name: string },
  provider: OAuthProvider
) {
  return db.transaction(async (trx) => {
    let user = await trx.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      columns: { id: true, role: true },
    });
    if (user == null) {
      const [newUser] = await trx
        .insert(usersTable)
        .values({
          email: email,
          name: name,
        })
        .returning({ id: usersTable.id, role: usersTable.role });
      user = newUser;
    }

    await trx
      .insert(userOAuthAccountTable)
      .values({
        provider,
        providerAccountId: id,
        userId: user.id,
      })
      .onConflictDoNothing();

    return user;
  });
}
