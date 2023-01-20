import { Trigger } from "deno-slack-api/types.ts";
import workflow from "../workflows/my_send_message_workflow.ts";

/**
 * This trigger starts the workflow when an end-user clicks the link.
 * Learn more at https://api.slack.com/future/triggers/link
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: "shortcut",
  name: "MySendMessage Workflow Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {
    // The channel where you click the link trigger
    channel_id: { value: "{{data.channel_id}}" },
  },
};

// Note that the Trigger object must be default-exported
export default trigger;
