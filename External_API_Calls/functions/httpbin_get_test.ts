import * as mf from "mock-fetch/mod.ts";
import { assertEquals } from "std/testing/asserts.ts";
import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import handler from "./httpbin_get.ts";

// Replaces globalThis.fetch with the mocked copy
mf.install();

const { createContext } = SlackFunctionTester("my-function");

Deno.test("Perform an API call successfully", async () => {
  mf.mock("GET@/get", () => {
    return new Response(JSON.stringify({
      "args": {},
      "headers": { "User-Agent": "Deno/1.26.1" },
      "origin": "35.74.58.174",
      "url": "https://httpbin.org/get",
    }));
  });
  const { outputs, error } = await handler(createContext({ inputs: {} }));
  assertEquals(outputs, {
    origin: "35.74.58.174",
    url: "https://httpbin.org/get",
    user_agent: "Deno/1.26.1",
  });
  assertEquals(error, undefined);
});

Deno.test("Fail to access the API endpoins", async () => {
  mf.mock("GET@/get", () => {
    return new Response("Bad Gateway", { status: 502 });
  });
  const { outputs, error } = await handler(createContext({ inputs: {} }));
  assertEquals(outputs, undefined);
  assertEquals(
    error,
    "Failed to fetch data from httpbin.org (status: 502, body: Bad Gateway)",
  );
});
