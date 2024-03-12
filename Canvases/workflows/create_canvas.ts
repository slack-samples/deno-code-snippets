import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * This workflow demonstrates how to create a canvas.
 *
 * To run the workflow, you need to have the following scopes in "botScopes" property in `manifest.ts` file:
 * - "canvases:write"
 *
 * Learn more about the create canvas slack function: https://api.slack.com/reference/functions/canvas_create
 * To learn more on workflows, read https://api.slack.com/future/workflows
 */
const workflow = DefineWorkflow({
  callback_id: "canvas-create-workflow",
  title: "Create a canvas",
  description: "Create a canvas",
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

workflow.addStep(
  Schema.slack.functions.CanvasCreate,
  {
    title: "Hello world",
    owner_id: workflow.inputs.user,
    content: [
      {
        "type": "rich_text",
        "elements": [
          {
            "type": "rich_text_section",
            "elements": [{ "type": "text", "text": "Hello new canvas" }],
          },
        ],
      },
    ],
  },
);

export default workflow;
