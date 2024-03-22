import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { def as PTODemo } from "../functions/pto_demo.ts";

const workflow = DefineWorkflow({
  callback_id: "datastore-ttl-demo-workflow",
  title: "Datastore TTL Demo Workflow",
  input_parameters: {
    properties: {
      interactivity: { type: Schema.slack.types.interactivity },
      user_id: { type: Schema.slack.types.user_id },
    },
    required: ["interactivity", "user_id"],
  },
});

workflow.addStep(PTODemo, {
  interactivity: workflow.inputs.interactivity,
  user_id: workflow.inputs.user_id,
});

export default workflow;
