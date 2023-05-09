import { Trigger } from "deno-slack-sdk/types.ts";
import {
  TriggerContextData,
  TriggerEventTypes,
  TriggerTypes,
} from "deno-slack-api/mod.ts";
import workflow from "../workflows/reply_to_reaction.ts";

const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Event,
  name: "Trigger the example workflow",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.ReactionAdded,
    // TODO: Update this list
    channel_ids: ["C03E94MKS"],
  },
  inputs: {
    channel_id: { value: TriggerContextData.Event.ReactionAdded.channel_id },
    user_id: { value: TriggerContextData.Event.ReactionAdded.user_id },
    message_ts: { value: TriggerContextData.Event.ReactionAdded.message_ts },
    reaction: { value: TriggerContextData.Event.ReactionAdded.reaction },
  },
};
export default trigger;
