import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

// Refer to https://api.slack.com/future/datastores for details
const datastore = DefineDatastore({
  name: "pto_notifications",
  // The primary key's type must be string
  primary_key: "id",
  time_to_live_attribute: "end_at",
  attributes: {
    id: { type: Schema.types.string, required: true },
    user_id: { type: Schema.slack.types.user_id, required: true },
    start_at: { type: Schema.slack.types.timestamp, required: true },
    end_at: { type: Schema.slack.types.timestamp, required: true },
    note: { type: Schema.types.string, required: false },
  },
});

export default datastore;
