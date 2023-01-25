import { DefineWorkflow } from "deno-slack-sdk/mod.ts";
import { def as TasksDemo } from "../functions/tasks_demo.ts";

const workflow = DefineWorkflow({
  callback_id: "datastore-demo-workflow",
  title: "Datastore Demo Workflow",
  input_parameters: { properties: {}, required: [] },
});

workflow.addStep(TasksDemo, {});

export default workflow;
