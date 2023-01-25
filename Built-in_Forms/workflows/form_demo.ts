import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "form-demo-workflow",
  title: "OpenForm Demo Workflow",
  input_parameters: {
    properties: {
      interactivity: { type: Schema.slack.types.interactivity },
      user_id: { type: Schema.slack.types.user_id },
      channel_id: { type: Schema.slack.types.channel_id },
    },
    required: ["interactivity", "user_id", "channel_id"],
  },
});

// Step using the built-in form
const formStep = workflow.addStep(Schema.slack.functions.OpenForm, {
  title: "Send a greeting",
  interactivity: workflow.inputs.interactivity,
  submit_label: "Send greeting",
  fields: {
    // fields.elements will be converted to Block Kit components under the hood
    // To learn more on Block Kit, visit https://api.slack.com/block-kit
    elements: [
      {
        name: "recipient",
        title: "Recipient",
        type: Schema.slack.types.user_id, // => "users_select"
        default: workflow.inputs.user_id,
      },
      {
        name: "channel",
        title: "Channel to send message to",
        type: Schema.slack.types.channel_id, // => "channels_select"
        default: workflow.inputs.channel_id,
      },
      {
        name: "message",
        title: "Message to recipient",
        type: Schema.types.string, // => "plain_text_input"
        long: true, // => multiline: true
        minLength: 1, // inclusive
        maxLength: 100, // inclusive
      },
      {
        name: "favorite_animal",
        title: "Favorite Animal",
        type: Schema.types.string, // => "static_select"
        choices: [
          { value: "dog", title: "Dog" },
          { value: "cat", title: "Cat" },
        ],
        enum: ["dog", "cat"],
        default: "cat",
      },
      {
        name: "favorite_animals",
        title: "Favorite Animals",
        type: Schema.types.array, // => "mutli_static_select"
        items: {
          type: Schema.types.string,
          choices: [
            { value: "dog", title: "Dog" },
            { value: "cat", title: "Cat" },
          ],
          enum: ["dog", "cat"],
        },
        maxItems: 2,
        default: ["cat"],
      },
      {
        name: "contact",
        title: "Your Email Address",
        type: Schema.types.string,
        format: "email", // => "email_text_input"
      },
      {
        name: "channels",
        title: "Favorite Channels",
        type: Schema.types.array, // => "multi_channels_select"
        items: { type: Schema.slack.types.channel_id },
      },
      {
        name: "team_members",
        title: "Team Members",
        type: Schema.types.array, // => "multi_users_select"
        items: { type: Schema.slack.types.user_id },
      },
      {
        name: "approved",
        title: "Already Approved by My Manager",
        type: Schema.types.boolean, // => "checkboxes"
      },
      {
        name: "count",
        title: "Count",
        type: Schema.types.integer, // => "number_input" with is_decimal_allowed: false
      },
      {
        name: "amount",
        title: "Amount",
        type: Schema.types.number, // => "number_input"
      },
      {
        name: "due_date",
        title: "Due Date",
        type: Schema.slack.types.date, // => "datepicker"
      },
      {
        name: "due_time",
        title: "Due Date Time",
        type: Schema.slack.types.timestamp, // => "datetimepicker"
      },
      {
        name: "rich_text",
        title: "Rich Text Input",
        type: Schema.slack.types.rich_text,
      },
    ],
    required: ["recipient", "channel", "message"],
  },
});

// Confirm the outputs from the above OpenForm function
workflow.addStep(Schema.slack.functions.SendEphemeralMessage, {
  // The name of the element will be the key to access the value
  user_id: formStep.outputs.fields.recipient,
  channel_id: formStep.outputs.fields.channel,
  message: "OpenForm's `outputs.fields`: ```" +
    formStep.outputs.fields +
    "```",
});

export default workflow;
