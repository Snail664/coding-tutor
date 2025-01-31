import { NextResponse } from "next/server";
import { getRateLimitCount } from "@/lib/redis";
import { getSession } from "@auth0/nextjs-auth0";

const DAILY_LIMITS = {
  hint: 20,
  chat: 20,
} as const;

export async function rateLimitMiddleware(
  request: Request,
  type: keyof typeof DAILY_LIMITS
) {
  const session = await getSession();
  if (!session?.user) {
    return {
      error: true,
      response: new NextResponse("Unauthorized", { status: 401 }),
    };
  }

  // Skip rate limiting in development
  if (process.env.NODE_ENV !== "production") {
    console.log(
      "Skipping rate limiting in development: ",
      process.env.NODE_ENV
    );
    return { error: false, remaining: DAILY_LIMITS[type] };
  }

  const count = await getRateLimitCount(session.user.sub, type);

  if (count > DAILY_LIMITS[type]) {
    return {
      error: true,
      response: NextResponse.json(
        {
          error: `Daily ${type} limit reached`,
          remaining: 0,
        },
        { status: 429 }
      ),
    };
  }

  return {
    error: false,
    remaining: DAILY_LIMITS[type] - count,
  };
}
