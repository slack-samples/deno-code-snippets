import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * This workflow demonstrates how a canvas.
 *
 * To run the workflow, you need to have the following scopes in "botScopes" property in `manifest.ts` file:
 * - "canvases:write"
 *
 * Learn more about the update canvas content slack function: https://api.slack.com/reference/functions/canvas_update_content
 * To learn more on workflows, read https://api.slack.com/future/workflows
 */
const workflow = DefineWorkflow({
  callback_id: "canvas-update-workflow",
  title: "Create and update a canvas",
  description: "Create, Update and Share canvas",
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
  Schema.slack.functions.CanvasUpdateContent,
  {
    canvas_id: createCanvasStep.outputs.canvas_id,
    action: "append",
    content: [
      {
        "type": "rich_text",
        "elements": [
          {
            "type": "rich_text_section",
            "elements": [{ "type": "text", "text": "Updating the canvas" }],
          },
        ],
      },
    ],
  },
);

export default workflow;
