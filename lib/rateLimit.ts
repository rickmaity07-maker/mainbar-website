import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

// Sliding window: 5 requests per 10 minutes per identifier (typically client IP).
// A real customer submits the booking form once, maybe twice on a retry —
// this only bites repeated/automated submissions.
const WINDOW = "10 m";
const MAX_REQUESTS = 5;

let ratelimit: Ratelimit | null = null;
let warnedMissingConfig = false;

function getRatelimit(): Ratelimit | null {
  if (ratelimit) return ratelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (!warnedMissingConfig) {
      console.warn(
        "[rateLimit] UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN not set — rate limiting is DISABLED. " +
          "Set them in production so /api/booking is actually protected against abuse."
      );
      warnedMissingConfig = true;
    }
    return null;
  }

  ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS, WINDOW),
    prefix: "mainbar-ratelimit",
  });
  return ratelimit;
}

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getRatelimit();
  if (!limiter) {
    // Fail open when not configured (e.g. local dev) rather than blocking real usage.
    return { allowed: true };
  }

  const result = await limiter.limit(identifier);
  if (result.success) {
    return { allowed: true };
  }

  const retryAfterSeconds = Math.max(0, Math.ceil((result.reset - Date.now()) / 1000));
  return { allowed: false, retryAfterSeconds };
}
