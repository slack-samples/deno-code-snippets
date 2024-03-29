import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import workflow from "../workflows/do_nothing.ts";

/**
 * This trigger starts the workflow at specific time intervals.
 * Learn more at https://api.slack.com/automation/triggers/scheduled
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Scheduled,
  name: "Schedule Workflow Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  schedule: {
    // This start_time means 5 seconds after you run `slack trigger create` command
    start_time: new Date(new Date().getTime() + 5_000).toISOString(),
    frequency: { type: "once" },
  },
};
// Note that the Trigger object must be default-exported
export default trigger;
