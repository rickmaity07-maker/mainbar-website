import { describe, expect, it } from "vitest";
import { getClientIp } from "./clientIp";

function requestWithHeaders(headers: Record<string, string>): Request {
  return new Request("http://localhost/api/booking", { headers });
}

describe("getClientIp", () => {
  it("uses the first address in x-forwarded-for", () => {
    const req = requestWithHeaders({ "x-forwarded-for": "203.0.113.5, 70.41.3.18" });
    expect(getClientIp(req)).toBe("203.0.113.5");
  });

  it("trims whitespace around the first address", () => {
    const req = requestWithHeaders({ "x-forwarded-for": "  203.0.113.5  , 70.41.3.18" });
    expect(getClientIp(req)).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", () => {
    const req = requestWithHeaders({ "x-real-ip": "198.51.100.7" });
    expect(getClientIp(req)).toBe("198.51.100.7");
  });

  it("returns 'unknown' when no IP headers are present", () => {
    const req = requestWithHeaders({});
    expect(getClientIp(req)).toBe("unknown");
  });
});
