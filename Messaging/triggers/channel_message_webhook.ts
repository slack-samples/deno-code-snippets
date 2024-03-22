import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import workflow from "../workflows/channel_message.ts";

/**
 * This trigger starts the workflow when an end-user clicks the link.
 * Learn more at https://api.slack.com/automation/triggers/webhook
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Webhook, // Incoming Webhooks
  name: "Channel Messaging Workflow Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {
    // The channel must be included in request body data
    channel_id: { value: "{{data.channel_id}}" },
  },
};

// Note that the Trigger object must be default-exported
export default trigger;
