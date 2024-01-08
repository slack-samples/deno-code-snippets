import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { Connectors } from "deno-slack-hub/mod.ts";

const workflow = DefineWorkflow({
  callback_id: "Google-Calendar-Workflow",
  title: "Connector Example: Google Calendar",
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
  title: "Create New Event",
  interactivity: workflow.inputs.interactivity,
  fields: {
    elements: [
      {
        name: "summary",
        title: "Summary",
        type: Schema.types.string,
      },
      {
        name: "start_time",
        title: "Start Time",
        type: Schema.slack.types.timestamp,
      },
      {
        name: "end_time",
        title: "End Time",
        type: Schema.slack.types.timestamp,
      },
      {
        name: "attendees",
        title: "Attendees",
        type: Schema.types.array,
        items: { type: Schema.slack.types.user_id },
        default: [workflow.inputs.user_id],
      },
      {
        name: "location",
        title: "Location",
        type: Schema.types.string,
      },
      {
        name: "description",
        title: "Description",
        type: Schema.types.string,
        long: true,
      },
    ],
    required: ["summary", "start_time", "end_time", "attendees"],
  },
});

const gcal = workflow.addStep(Connectors.GoogleCalendar.functions.CreateEvent, {
  google_access_token: {
    credential_source: "END_USER",
  },
  summary: form.outputs.fields.summary,
  start_time: form.outputs.fields.start_time,
  end_time: form.outputs.fields.end_time,
  attendees: form.outputs.fields.attendees,
  location: form.outputs.fields.location,
  description: form.outputs.fields.description,
});

workflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: workflow.inputs.channel_id,
  message:
    `:white_check_mark: <@${workflow.inputs.user_id}> created a new event "${form.outputs.fields.summary}" :point_right: ${gcal.outputs.event_link}`,
});

export default workflow;
