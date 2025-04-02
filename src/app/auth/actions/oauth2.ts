"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getOAuthClient, OAuthProvider } from ".";

export const oAuthSignIn = async (provider: OAuthProvider) => {
  const oAuthClient = getOAuthClient(provider);
  redirect(oAuthClient.createAuthUrl(await cookies()));
};
