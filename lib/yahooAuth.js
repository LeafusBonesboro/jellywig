import { AuthorizationCode } from "simple-oauth2";
import { prisma } from "@/lib/prisma";

export function yahooOAuthClient() {
  return new AuthorizationCode({
    client: {
      id: process.env.YAHOO_CLIENT_ID,
      secret: process.env.YAHOO_CLIENT_SECRET,
    },
    auth: {
      tokenHost: "https://api.login.yahoo.com",
      authorizePath: "/oauth2/request_auth",
      tokenPath: "/oauth2/get_token",
    },
  });
}

export function yahooAuthUrl(state = "state") {
  const client = yahooOAuthClient();
  return client.authorizeURL({
    redirect_uri: process.env.YAHOO_REDIRECT_URI,
    response_type: "code",
    scope: "fspt-w", // Yahoo Fantasy read/write; adjust as needed
    state,
  });
}

/** Exchange code -> tokens and persist for the user */
export async function exchangeAndStoreYahooToken({ code, userId }) {
  const client = yahooOAuthClient();
  const tokenParams = {
    code,
    redirect_uri: process.env.YAHOO_REDIRECT_URI,
  };
  const accessToken = await client.getToken(tokenParams);

  const data = accessToken.token; // { access_token, refresh_token, expires_in, ... }
  const expiresAt = new Date(Date.now() + (data.expires_in - 60) * 1000); // 60s safety

  // Upsert integration
  await prisma.integration.upsert({
    where: { userId_provider: { userId, provider: "yahoo" } },
    create: {
      userId,
      provider: "yahoo",
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt,
      scope: data.scope ?? null,
    },
    update: {
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? undefined,
      expiresAt,
      scope: data.scope ?? null,
    },
  });

  return { ok: true };
}

/** Ensure valid token (refresh if expired) and return it */
export async function getValidYahooAccessToken(userId) {
  const rec = await prisma.integration.findFirst({
    where: { userId, provider: "yahoo" },
  });
  if (!rec) return null;

  if (rec.expiresAt > new Date(Date.now() + 30 * 1000)) {
    return rec.accessToken; // still valid
  }

  // refresh
  const client = yahooOAuthClient();
  const refreshed = await client.createToken({
    refresh_token: rec.refreshToken,
  }).refresh();

  const data = refreshed.token;
  const expiresAt = new Date(Date.now() + (data.expires_in - 60) * 1000);

  await prisma.integration.update({
    where: { id: rec.id },
    data: {
      accessToken: data.access_token,
      // Yahoo sometimes re-sends a new refresh token; store if present
      refreshToken: data.refresh_token ?? rec.refreshToken,
      expiresAt,
      scope: data.scope ?? rec.scope,
    },
  });
  return data.access_token;
}
