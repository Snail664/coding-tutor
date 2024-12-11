import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function authMiddleware() {
  const session = await getSession();

  if (!session || !session.user) {
    return {
      error: "Unauthorized",
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { session };
}
