import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const def = DefineFunction({
  callback_id: "httpbin_get",
  title: "Receive data from an httpbin.org API endpoint",
  source_file: "External_API_Calls/functions/httpbin_get.ts",
  input_parameters: { properties: {}, required: [] },
  output_parameters: {
    properties: {
      user_agent: { type: Schema.types.string },
      origin: { type: Schema.types.string },
      url: { type: Schema.types.string },
    },
    required: [],
  },
});

export default SlackFunction(def, async () => {
  const response = await fetch("https://httpbin.org/get", {});
  if (!response.ok) {
    const body = await response.text();
    const error =
      `Failed to fetch data from httpbin.org (status: ${response.status}, body: ${body})`;
    return { error };
  }
  const body = await response.json();
  return {
    outputs: {
      url: body.url,
      origin: body.origin,
      user_agent: body.headers["User-Agent"],
    },
  };
});
