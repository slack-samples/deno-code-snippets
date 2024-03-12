import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * This workflow demonstrates how to create a canvas with content and share it with channels and user.
 *
 * To run the workflow, you need to have the following scopes in "botScopes" property in `manifest.ts` file:
 * - "canvases:write"
 * - "canvases:read"
 * - "chat:write"
 * - "chat:write.public"
 * - "im:write"
 * - "group:write"
 *
 * You also need the following configuration on `manifest.ts` file:
 *   features: {
 *     appHome: {
 *       messagesTabEnabled: true,
 *       messagesTabReadOnlyEnabled: false,
 *     },
 *   },
 * Learn more about the update canvas content slack function: https://api.slack.com/reference/functions/share_canvas
 * To learn more on workflows, read https://api.slack.com/future/workflows
 */
const workflow = DefineWorkflow({
  callback_id: "canvas-share-workflow",
  title: "Create and share a canvas",
  description: "Create and Share canvas",
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

workflow.addStep(
  Schema.slack.functions.ShareCanvas,
  {
    canvas_id: createCanvasStep.outputs.canvas_id,
    channel_ids: [workflow.inputs.channel],
    user_ids: [workflow.inputs.user],
    access_level: "edit",
    message: [
      {
        "type": "rich_text",
        "elements": [
          {
            "type": "rich_text_section",
            "elements": [{
              "type": "text",
              "text": "Sharing the create canvas",
            }],
          },
        ],
      },
    ],
  },
);

export default workflow;
