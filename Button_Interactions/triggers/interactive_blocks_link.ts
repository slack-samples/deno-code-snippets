import { Trigger } from "deno-slack-sdk/types.ts";
import workflow from "../workflows/interactive_blocks_demo.ts";

/**
 * This trigger starts the workflow when an end-user clicks the link.
 * Learn more at https://api.slack.com/future/triggers/link
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: "shortcut",
  name: "Interactive Blocks Demo Workflow Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {
    channel_id: { value: "{{data.channel_id}}" },
    user_id: { value: "{{data.user_id}}" },
  },
};

// Note that the Trigger object must be default-exported
export default trigger;
