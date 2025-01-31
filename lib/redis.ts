import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getRateLimitCount(
  userId: string,
  type: "hint" | "chat"
): Promise<number> {
  const today = new Date().toISOString().split("T")[0];
  const key = `${userId}:${type}:${today}`;

  const count = await redis.incr(key);
  // Set expiry for 24 hours if this is a new key
  if (count === 1) {
    await redis.expire(key, 24 * 60 * 60);
  }

  return count;
}
