import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { def as SendBlockKitMessage } from "../functions/send_block_kit_message.ts";

const workflow = DefineWorkflow({
  callback_id: "block-kit-button-demo-workflow",
  title: "Block Kit Button Demo Workflow",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      user_id: { type: Schema.slack.types.user_id },
    },
    required: ["channel_id", "user_id"],
  },
});

workflow.addStep(SendBlockKitMessage, {
  user_id: workflow.inputs.user_id,
  channel_id: workflow.inputs.channel_id,
});

export default workflow;
