import { describe, expect, it } from "vitest";
import { checkRateLimit } from "./rateLimit";

describe("checkRateLimit", () => {
  it("fails open (allows the request) when Upstash env vars are not configured", async () => {
    // In this test environment UPSTASH_REDIS_REST_URL/TOKEN are unset, matching
    // local dev before Upstash is provisioned. Production must set them for the
    // sliding-window limit to actually apply — see lib/rateLimit.ts.
    const result = await checkRateLimit("test-client");
    expect(result.allowed).toBe(true);
  });
});
