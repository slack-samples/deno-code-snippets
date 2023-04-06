import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "reply-to-reaction-workflow",
  title: "Reply to Reaction Workflow",
  input_parameters: {
    properties: {
      // All the possible inputs from the "reaction_added" event trigger
      channel_id: { type: Schema.slack.types.channel_id },
      user_id: { type: Schema.slack.types.user_id },
      message_ts: { type: Schema.types.string },
      reaction: { type: Schema.types.string },
    },
    required: ["channel_id", "user_id", "message_ts", "reaction"],
  },
});

workflow.addStep(Schema.slack.functions.ReplyInThread, {
  message_context: {
    channel_id: workflow.inputs.channel_id,
    message_ts: workflow.inputs.message_ts,
  },
  message:
    `Hey <@${workflow.inputs.user_id}>, thanks for adding :${workflow.inputs.reaction}:!`,
});

export default workflow;
