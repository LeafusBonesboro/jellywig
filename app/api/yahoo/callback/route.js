import { yahooOAuthClient } from "@/lib/yahooAuth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("No code returned", { status: 400 });
  }

  try {
    const client = yahooOAuthClient();

    const tokenParams = {
      code,
      redirect_uri: process.env.YAHOO_REDIRECT_URI,
    };

    const accessToken = await client.getToken(tokenParams);

    await prisma.yahooToken.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        accessToken: accessToken.token.access_token,
        refreshToken: accessToken.token.refresh_token,
        expiresAt: new Date(
          Date.now() + accessToken.token.expires_in * 1000
        ),
      },
      update: {
        accessToken: accessToken.token.access_token,
        refreshToken: accessToken.token.refresh_token,
        expiresAt: new Date(
          Date.now() + accessToken.token.expires_in * 1000
        ),
      },
    });

    return Response.redirect("/dashboard");
  } catch (error) {
    console.error("Error exchanging Yahoo token:", error);
    return new Response("Failed to get token", { status: 500 });
  }
}
