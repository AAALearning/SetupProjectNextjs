import crypto from "crypto";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const oAuthProviders = ["discord"] as const;
export type OAuthProvider = (typeof oAuthProviders)[number];

const STATE_COOKIE_KEY = "oAuthState";
const CODE_VERIFIER_COOKIE_KEY = "oAuthCodeVerifier";
const COOKIE_EXPIRATION_SECONDS = 60 * 10;

function createState(cookies: Pick<ReadonlyRequestCookies, "set">) {
  const state = crypto.randomBytes(64).toString("hex").normalize();
  cookies.set(STATE_COOKIE_KEY, state, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
  });
  return state;
}

function createCodeVerifier(cookies: Pick<ReadonlyRequestCookies, "set">) {
  const codeVerifier = crypto.randomBytes(64).toString("hex").normalize();
  cookies.set(CODE_VERIFIER_COOKIE_KEY, codeVerifier, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
  });
  return codeVerifier;
}

class OAuthClient<T> {
  private readonly provider: OAuthProvider;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly scopes: string[];
  private readonly urls: {
    auth: string;
    token: string;
    user: string;
  };
  private readonly userInfo: {
    parser: (data: T) => { id: string; email: string; name: string };
  };
  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
    userInfo,
  }: {
    provider: OAuthProvider;
    clientId: string;
    clientSecret: string;
    scopes: string[];
    urls: {
      auth: string;
      token: string;
      user: string;
    };
    userInfo: {
      parser: (data: T) => { id: string; email: string; name: string };
    };
  }) {
    this.provider = provider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scopes = scopes;
    this.urls = urls;
    this.userInfo = userInfo;
  }

  private get redirectUrl() {
    return new URL(this.provider, process.env.OAUTH_REDIRECT_URL_BASE);
  }

  createAuthUrl(cookies: Pick<ReadonlyRequestCookies, "set">) {
    const state = createState(cookies);
    const codeVerifier = createCodeVerifier(cookies);
    const url = new URL(this.urls.auth);
    url.searchParams.set("client_id", this.clientId);
    url.searchParams.set("redirect_uri", this.redirectUrl.toString());
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", this.scopes.join(" "));
    url.searchParams.set("state", state);
    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set("code_challenge", crypto.hash("sha256", codeVerifier, "base64url"));
    return url.toString();
  }

  async fetchUser(code: string, state: string, cookies: Pick<ReadonlyRequestCookies, "get">) {
    const isValidState = validateState(state, cookies);
    if (!isValidState) throw new Error("State error");
    const { accessToken, tokenType } = await this.fetchToken(code, getCodeVerifier(cookies));

    const user = await fetch(this.urls.user, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((rawData) => {
        if (!rawData) throw new Error("Invalid user");
        return rawData;
      });
    return this.userInfo.parser(user);
  }

  private fetchToken(code: string, codeVerifier: string) {
    return fetch(this.urls.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code,
        redirect_uri: this.redirectUrl.toString(),
        grant_type: "authorization_code",
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code_verifier: codeVerifier,
      }),
    })
      .then((res) => res.json())
      .then((rawData) => {
        console.log("Token fetched from oauth server::", rawData);
        if (!rawData.access_token || !rawData.token_type) throw new Error("Invalid token");
        return {
          accessToken: rawData.access_token,
          tokenType: rawData.token_type,
        };
      });
  }
}

function createDiscordOAuthClient() {
  return new OAuthClient({
    provider: "discord",
    clientId: process.env.DISCORD_CLIENT_ID ?? "",
    clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
    scopes: ["identify", "email"],
    urls: {
      auth: "https://discord.com/oauth2/authorize",
      token: "https://discord.com/api/oauth2/token",
      user: "https://discord.com/api/users/@me",
    },
    userInfo: {
      parser: (user: { id: string; username: string; global_name?: string | null; email: string }) => ({
        id: user.id,
        name: user.global_name ?? user.username,
        email: user.email,
      }),
    },
  });
}

export function getOAuthClient(provider: OAuthProvider) {
  switch (provider) {
    case "discord":
      return createDiscordOAuthClient();
    default:
      throw new Error(`Invalid provider: ${provider satisfies never}`);
  }
}
function validateState(state: string, cookies: Pick<ReadonlyRequestCookies, "get">) {
  const cookieState = cookies.get(STATE_COOKIE_KEY)?.value;
  return cookieState === state;
}

function getCodeVerifier(cookies: Pick<ReadonlyRequestCookies, "get">) {
  const codeVerifier = cookies.get(CODE_VERIFIER_COOKIE_KEY)?.value;
  if (codeVerifier == null) throw new Error("Invalid code verifier");
  return codeVerifier;
}
