import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import workflow from "../workflows/pto.ts";

/**
 * This trigger starts the workflow when an end-user clicks the link.
 * Learn more at https://api.slack.com/future/triggers/link
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Datastore TTL Demo Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {
    interactivity: { value: "{{data.interactivity}}" },
    user_id: { value: "{{data.user_id}}" },
  },
};

// Note that the Trigger object must be default-exported
export default trigger;
