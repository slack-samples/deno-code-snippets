import { Trigger } from "deno-slack-sdk/types.ts";
import {
  TriggerContextData,
  TriggerEventTypes,
  TriggerTypes,
} from "deno-slack-api/mod.ts";
import workflow from "../workflows/message_to_channel_creator.ts";

const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Event,
  name: "Channel Creation Trigger",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  event: { event_type: TriggerEventTypes.ChannelCreated },
  inputs: {
    channel_id: { value: TriggerContextData.Event.ChannelCreated.channel_id },
    channel_name: {
      value: TriggerContextData.Event.ChannelCreated.channel_name,
    },
    channel_type: {
      value: TriggerContextData.Event.ChannelCreated.channel_type,
    },
    creator_id: { value: TriggerContextData.Event.ChannelCreated.creator_id },
    created: { value: TriggerContextData.Event.ChannelCreated.created },
  },
};

export default trigger;
