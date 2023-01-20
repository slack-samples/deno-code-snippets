import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { def as Demo } from "../functions/demo.ts";

const workflow = DefineWorkflow({
  callback_id: "block-kit-modal-demo-workflow",
  title: "Block Kit Modal Demo Workflow",
  input_parameters: {
    properties: { interactivity: { type: Schema.slack.types.interactivity } },
    required: ["interactivity"],
  },
});

workflow.addStep(Demo, { interactivity: workflow.inputs.interactivity });

export default workflow;
