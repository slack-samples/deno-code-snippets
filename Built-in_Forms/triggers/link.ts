import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import workflow from "../workflows/form_demo.ts";

/**
 * This trigger starts the workflow when an end-user clicks the link.
 * Learn more at https://api.slack.com/automation/triggers/link
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Form Demo Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {
    // interactivity is necessary for using OpenForm function
    interactivity: { value: TriggerContextData.Shortcut.interactivity },
    // The following inputs are not necessary for OpenForm
    // You'll use this just for the succeeding functions,
    // which confirm the outputs of OpenForm
    user_id: { value: TriggerContextData.Shortcut.user_id },
    channel_id: { value: TriggerContextData.Shortcut.channel_id },
  },
};

// Note that the Trigger object must be default-exported
export default trigger;
