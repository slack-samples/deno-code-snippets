import {stub} from "@std/testing/mock";
import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "@std/assert";
import handler from "./my_send_message.ts";

// Utility for generating valid arguments
const { createContext } = SlackFunctionTester("my-function");

Deno.test("Send a message successfully", async () => {
  using _stubFetch = stub(
    globalThis,
    "fetch",
    (url: string | URL | Request, options?: RequestInit) => {
      const request = url instanceof Request ? url : new Request(url, options);

      assertEquals(request.method, "POST");
      assertEquals(request.url, "https://slack.com/api/chat.postMessage");

      const body = JSON.stringify({ ok: true, ts: "1111.2222" });
      return Promise.resolve(
        new Response(body, { status: 200 })
      );
    }
  );

  const inputs = { channel_id: "C111", message: "Hi there!" };
  const token = "xoxb-valid";
  const env = { LOG_LEVEL: "INFO" };
  const { outputs, error } = await handler(
    createContext({ inputs, env, token }),
  );
  assertEquals(error, undefined);
  assertEquals(outputs, { ts: "1111.2222" });
});

Deno.test("Fail to send a message with invalid token", async () => {
  using _stubFetch = stub(
    globalThis,
    "fetch",
    (url: string | URL | Request, options?: RequestInit) => {
      const request = url instanceof Request ? url : new Request(url, options);

      assertEquals(request.method, "POST");
      assertEquals(request.url, "https://slack.com/api/chat.postMessage");
      const authHeader = request.headers.get("Authorization");
    if (authHeader !== "Bearer xoxb-valid") {
      // invalid token pattern
      const body = JSON.stringify({ ok: false, error: "invalid_auth" });
      return Promise.resolve(new Response(body, { status: 200 }));
    }
    const body = JSON.stringify({ ok: true, ts: "1111.2222" });
    return Promise.resolve(new Response(body, { status: 200 }));
  }
  );

  const inputs = { channel_id: "C111", message: "Hi there!" };
  const token = "xoxb-invalid";
  const env = { LOG_LEVEL: "INFO" };
  const { outputs, error } = await handler(
    createContext({ inputs, env, token }),
  );
  assertEquals(error, "Failed to post a message due to invalid_auth");
  assertEquals(outputs, undefined);
});

Deno.test("Fail to send a message to an unknown channel", async () => {
  using _stubFetch = stub(
    globalThis,
    "fetch",
    async (url: string | URL | Request, options?: RequestInit) => {
      const request = url instanceof Request ? url : new Request(url, options);

      assertEquals(request.method, "POST");
      assertEquals(request.url, "https://slack.com/api/chat.postMessage");

      const params = await request.formData();
    if (params.get("channel") !== "C111") {
      // unknown channel
      const body = JSON.stringify({ ok: false, error: "channel_not_found" });
      return new Response(body, { status: 200 });
    }
    const body = JSON.stringify({ ok: true, ts: "1111.2222" });
    return new Response(body, { status: 200 });
    }
  );

  const inputs = { channel_id: "D111", message: "Hi there!" };
  const token = "xoxb-valid";
  const env = { LOG_LEVEL: "INFO" };
  const { outputs, error } = await handler(
    createContext({ inputs, env, token }),
  );
  assertEquals(error, "Failed to post a message due to channel_not_found");
  assertEquals(outputs, undefined);
});
