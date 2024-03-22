import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import workflow from "../workflows/ephemeral_message.ts";

/**
 * This trigger starts the workflow when an end-user clicks the link.
 * Learn more at https://api.slack.com/automation/triggers/link
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "httpbin.org Demo Workflow Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {
    // The channel where you click the link trigger
    channel_id: { value: TriggerContextData.Shortcut.channel_id },
    // The user ID who clicks the link trigger
    user_id: { value: TriggerContextData.Shortcut.user_id },
  },
};

// Note that the Trigger object must be default-exported
export default trigger;
