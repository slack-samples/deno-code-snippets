import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "ping-pong-message-workflow",
  title: "Ping Pong Message Workflow",
  input_parameters: {
    properties: {
      // All the possible inputs from the "message_posted" event trigger
      channel_id: { type: Schema.slack.types.channel_id },
      message_ts: { type: Schema.types.string },
    },
    required: ["channel_id", "message_ts"],
  },
});

workflow.addStep(Schema.slack.functions.ReplyInThread, {
  message_context: {
    channel_id: workflow.inputs.channel_id,
    message_ts: workflow.inputs.message_ts,
  },
  message: ":wave: Pong!",
});

export default workflow;
