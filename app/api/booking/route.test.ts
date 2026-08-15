import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /api/booking", () => {
  it("returns 400 (not 500) for a malformed JSON body", async () => {
    const request = new Request("http://localhost/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not valid json{{{",
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Invalid JSON body");
  });

  it("returns 400 for a syntactically valid but semantically invalid body", async () => {
    const request = new Request("http://localhost/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seating: "inside" }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
