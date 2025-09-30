import { getValidYahooAccessToken } from "@/lib/yahooAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const token = await getValidYahooAccessToken(session.user.id);
  if (!token) return new Response("Yahoo not linked", { status: 400 });

  // Example: Yahoo Fantasy "games" for NFL (game code 'nfl')
  const resp = await axios.get(
    "https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games;game_keys=nfl/leagues",
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
  );

  return Response.json(resp.data);
}
