import { Trigger } from "deno-slack-api/types.ts";
import workflow from "../workflows/ephemeral_message.ts";

/**
 * This trigger starts the workflow when an end-user clicks the link.
 * Learn more at https://api.slack.com/future/triggers/link
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: "shortcut",
  name: "Ephemeral Messaging Workflow Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {
    // The channel where you click the link trigger
    channel_id: { value: "{{data.channel_id}}" },
    // The user ID who clicks the link trigger
    user_id: { value: "{{data.user_id}}" },
  },
};

// Note that the Trigger object must be default-exported
export default trigger;
