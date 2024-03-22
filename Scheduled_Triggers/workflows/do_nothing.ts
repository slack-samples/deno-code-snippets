import { DefineWorkflow } from "deno-slack-sdk/mod.ts";

/**
 * This workflow does nothing, but you can confirm it was invoked by checking `slack activity -t` command outputs.
 * To learn more on workflows, read https://api.slack.com/automation/workflows
 */
const workflow = DefineWorkflow({
  callback_id: "scheduled-workflow",
  title: "Scheduled Workflow",
  input_parameters: { properties: {}, required: [] },
});

export default workflow;
