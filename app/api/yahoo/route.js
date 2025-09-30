import { yahooAuthUrl } from "@/lib/yahooAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // export it to import here

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  // include a state if you want CSRF/returnTo; for now keep simple
  const url = yahooAuthUrl();
  return Response.redirect(url, 302);
}
