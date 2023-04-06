import { Trigger } from "deno-slack-sdk/types.ts";
import workflow from "../workflows/task_manager.ts";

/**
 * This trigger starts the workflow when an end-user clicks the link.
 * Learn more at https://api.slack.com/future/triggers/link
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: "shortcut",
  name: "Datastore Demo Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {},
};

// Note that the Trigger object must be default-exported
export default trigger;
