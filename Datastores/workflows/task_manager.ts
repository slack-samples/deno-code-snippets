import { DefineWorkflow } from "deno-slack-sdk/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "datastore-demo-workflow",
  title: "Datastore Demo Workflow",
  input_parameters: { properties: {}, required: [] },
});

import { def as TasksDemo } from "../functions/tasks_demo.ts";
workflow.addStep(TasksDemo, {});

export default workflow;
