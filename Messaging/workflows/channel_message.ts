import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * This workflow demonstrates how to post a message in a channel.
 *
 * To run the workflow, you need to have the following scopes in "botScopes" property in `manifest.ts` file:
 * - "chat:write"
 * - "chat:write.public"
 *
 * To learn more on workflows, read https://api.slack.com/automation/workflows
 */
const workflow = DefineWorkflow({
  callback_id: "channel-message-workflow",
  title: "Channel Message Workflow",
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

// Send a message in a channel using the built-in function
workflow.addStep(Schema.slack.functions.SendMessage, {
  // Set the channel ID given by the trigger -> workflow
  channel_id: workflow.inputs.channel_id,
  message: "Hello World!",
});

export default workflow;
