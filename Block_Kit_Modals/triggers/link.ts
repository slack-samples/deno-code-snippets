import { Trigger } from "deno-slack-api/types.ts";
import workflow from "../workflows/block_kit_modal_demo.ts";

/**
 * This trigger starts the workflow when an end-user clicks the link.
 * Learn more at https://api.slack.com/future/triggers/link
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: "shortcut",
  name: "Block Kit Modal Demo Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {
    // interactivity is necessary for opening a modal
    interactivity: { value: "{{data.interactivity}}" },
  },
};

// Note that the Trigger object must be default-exported
export default trigger;
