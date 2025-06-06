import {stub} from "@std/testing/mock";
import { assertEquals } from "@std/assert";
import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import handler from "./httpbin_get.ts";

const { createContext } = SlackFunctionTester("my-function");

Deno.test("Perform an API call successfully", async () => {
  using _stubFetch = stub(
    globalThis,
    "fetch",
    (url: string | URL | Request, options?: RequestInit) => {
      const request = url instanceof Request ? url : new Request(url, options);

      assertEquals(request.method, "GET");
      assertEquals(request.url, "https://httpbin.org/get");

      return Promise.resolve(
        new Response(JSON.stringify({
          "args": {},
          "headers": { "User-Agent": "Deno/1.26.1" },
          "origin": "35.74.58.174",
          "url": "https://httpbin.org/get",
        }))
      );
    }
  );

  const { outputs, error } = await handler(createContext({ inputs: {} }));
  assertEquals(outputs, {
    origin: "35.74.58.174",
    url: "https://httpbin.org/get",
    user_agent: "Deno/1.26.1",
  });
  assertEquals(error, undefined);
});

Deno.test("Fail to access the API endpoints", async () => {
  using _stubFetch = stub(
    globalThis,
    "fetch",
    (url: string | URL | Request, options?: RequestInit) => {
      const request = url instanceof Request ? url : new Request(url, options);

      assertEquals(request.method, "GET");
      assertEquals(request.url, "https://httpbin.org/get");

      return Promise.resolve(
        new Response("Bad Gateway", { status: 502 })
      );
    }
  );

  const { outputs, error } = await handler(createContext({ inputs: {} }));
  assertEquals(outputs, undefined);
  assertEquals(
    error,
    "Failed to fetch data from httpbin.org (status: 502, body: Bad Gateway)",
  );
});
