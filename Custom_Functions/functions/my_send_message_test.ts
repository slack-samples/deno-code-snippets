import * as mf from "mock-fetch/mod.ts";
import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "std/testing/asserts.ts";
import handler from "./my_send_message.ts";

// After this method call,
// all `globalThis.fetch` calls will be replaced with mock behaviors
mf.install();

// Utility for generating valid arguments
const { createContext } = SlackFunctionTester("my-function");

Deno.test("Send a message successfully", async () => {
  mf.mock("POST@/api/chat.postMessage", () => {
    const body = JSON.stringify({ ok: true, ts: "1111.2222" });
    return new Response(body, { status: 200 });
  });
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
  mf.mock("POST@/api/chat.postMessage", (args) => {
    const authHeader = args.headers.get("Authorization");
    if (authHeader !== "Bearer xoxb-valid") {
      // invalid token pattern
      const body = JSON.stringify({ ok: false, error: "invalid_auth" });
      return new Response(body, { status: 200 });
    }
    const body = JSON.stringify({ ok: true, ts: "1111.2222" });
    return new Response(body, { status: 200 });
  });
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
  mf.mock("POST@/api/chat.postMessage", async (args) => {
    const params = await args.formData();
    if (params.get("channel") !== "C111") {
      // unknown channel
      const body = JSON.stringify({ ok: false, error: "channel_not_found" });
      return new Response(body, { status: 200 });
    }
    const body = JSON.stringify({ ok: true, ts: "1111.2222" });
    return new Response(body, { status: 200 });
  });
  const inputs = { channel_id: "D111", message: "Hi there!" };
  const token = "xoxb-valid";
  const env = { LOG_LEVEL: "INFO" };
  const { outputs, error } = await handler(
    createContext({ inputs, env, token }),
  );
  assertEquals(error, "Failed to post a message due to channel_not_found");
  assertEquals(outputs, undefined);
});
