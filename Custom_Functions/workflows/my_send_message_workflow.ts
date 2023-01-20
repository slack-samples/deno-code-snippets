import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "my-send-message-workflow",
  title: "MySendMessage Workflow",
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
        description: "The channel ID passed from this workflow's trigger",
      },
    },
    required: ["channel_id"],
  },
});

import { def as MySendMessage } from "../functions/my_send_message.ts";

workflow.addStep(MySendMessage, {
  channel_id: workflow.inputs.channel_id,
  message: "Hello World!",
});

export default workflow;
