import { Trigger } from "deno-slack-api/types.ts";
import workflow from "../workflows/message_to_channel_creator.ts";

const trigger: Trigger<typeof workflow.definition> = {
  type: "event",
  name: "Channel Creation Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  event: { event_type: "slack#/events/channel_created" },
  inputs: {
    channel_id: { value: "{{data.channel_id}}" },
    channel_name: { value: "{{data.channel_name}}" },
    channel_type: { value: "{{data.channel_type}}" },
    creator_id: { value: "{{data.creator_id}}" },
    created: { value: "{{data.created}}" },
  },
};

export default trigger;
