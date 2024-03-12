import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * This workflow demonstrates how to create a canvas and copy it.
 * Note: Copy canvas only work for enterprise grid workspaces
 *
 * To run the workflow, you need to have the following scopes in "botScopes" property in `manifest.ts` file:
 * - "canvases:read"
 * - "canvases:write"
 *
 * Learn more about the copy canvas slack function: https://api.slack.com/reference/functions/canvas_copy
 * To learn more on workflows, read https://api.slack.com/future/workflows
 */
const workflow = DefineWorkflow({
  callback_id: "canvas-copy-workflow",
  title: "Create a canvas and copy it",
  description: "Create and copy a canvas",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
    },
    required: ["channel"],
  },
});

const createCanvasStep = workflow.addStep(
  Schema.slack.functions.CanvasCreate,
  {
    title: "Hello world",
    owner_id: workflow.inputs.user,
  },
);

workflow.addStep(
  Schema.slack.functions.CanvasCopy,
  {
    canvas_id: createCanvasStep.outputs.canvas_id,
    title: "Copy of Hello world",
    owner_id: workflow.inputs.user,
  },
);

export default workflow;
