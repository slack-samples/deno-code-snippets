import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { Connectors } from "deno-slack-hub/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "Giphy-Workflow",
  title: "Connector Example: Giphy",
  input_parameters: {
    properties: {
      interactivity: { type: Schema.slack.types.interactivity },
      user_id: { type: Schema.slack.types.user_id },
      channel_id: { type: Schema.slack.types.channel_id },
    },
    required: ["interactivity", "user_id", "channel_id"],
  },
});

const form = workflow.addStep(Schema.slack.functions.OpenForm, {
  title: "Generate Giphy URL",
  interactivity: workflow.inputs.interactivity,
  fields: {
    elements: [
      { name: "text", title: "Search word", type: Schema.types.string },
    ],
    required: ["text"],
  },
});

const gif = workflow.addStep(
  Connectors.Giphy.functions.GetTranslatedGif,
  {
    search_term: form.outputs.fields.text,
    weirdness: "0",
  },
);

workflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: workflow.inputs.channel_id,
  message:
    `<@${workflow.inputs.user_id}> posted "${form.outputs.fields.text}" GIF image:\n${gif.outputs.gif_title_url}`,
});

export default workflow;
