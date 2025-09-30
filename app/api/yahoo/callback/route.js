import { exchangeAndStoreYahooToken } from "@/lib/yahooAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (error) {
    return Response.redirect("/dashboard?link=yahoo&status=error", 302);
  }
  try {
    await exchangeAndStoreYahooToken({ code, userId: session.user.id });
    return Response.redirect("/dashboard?link=yahoo&status=ok", 302);
  } catch (e) {
    console.error(e);
    return Response.redirect("/dashboard?link=yahoo&status=error", 302);
  }
}
