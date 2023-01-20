import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * This workflow demonstrates how to send a DM.
 *
 * To run the workflow, you need to have the following scopes in "botScopes" property in `manifest.ts` file:
 * - "chat:write"
 *
 * To learn more on workflows, read https://api.slack.com/future/workflows
 */
const workflow = DefineWorkflow({
  callback_id: "direct-message-workflow",
  title: "Direct Message Workflow",
  input_parameters: {
    properties: {
      user_id: {
        type: Schema.slack.types.user_id,
        description: "The user ID passed from this workflow's trigger",
      },
    },
    required: ["user_id"],
  },
});

// Send a message in a channel using the built-in function
workflow.addStep(Schema.slack.functions.SendDm, {
  // Set the user ID given by the trigger -> workflow
  user_id: workflow.inputs.user_id,
  message: "Hello World!",
});

export default workflow;
