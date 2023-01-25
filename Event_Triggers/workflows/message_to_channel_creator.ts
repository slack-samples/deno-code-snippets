import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "message-to-channel-creator-workflow",
  title: "Message to Channel Creator Workflow",
  input_parameters: {
    properties: {
      // All the possible inputs from the "channel_created" event trigger
      channel_id: { type: Schema.slack.types.channel_id },
      channel_name: { type: Schema.types.string },
      channel_type: { type: Schema.types.string },
      creator_id: { type: Schema.slack.types.user_id },
      created: { type: Schema.types.string },
    },
    required: ["creator_id"],
  },
});

workflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: workflow.inputs.channel_id,
  message:
    `Hi <@${workflow.inputs.creator_id}>, thanks for creating this channel!`,
});

export default workflow;
