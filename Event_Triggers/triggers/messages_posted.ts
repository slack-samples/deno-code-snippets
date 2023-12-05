import { Trigger } from "deno-slack-sdk/types.ts";
import {
  TriggerContextData,
  TriggerEventTypes,
  TriggerTypes,
} from "deno-slack-api/mod.ts";
import workflow from "../workflows/ping_pong_message.ts";

const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Event,
  name: "Trigger the ping-pong message workflow",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    // TODO: Update this list
    channel_ids: ["C03E94MKS"],
    // See https://api.slack.com/automation/triggers/event for details
    filter: {
      version: 1,
      root: {
        operator: "OR",
        inputs: [
          { statement: "{{data.text}} CONTAINS 'PING'" },
          { statement: "{{data.text}} CONTAINS 'Ping'" },
          { statement: "{{data.text}} CONTAINS 'ping'" },
        ],
      },
    },
  },
  inputs: {
    channel_id: { value: TriggerContextData.Event.MessagePosted.channel_id },
    message_ts: { value: TriggerContextData.Event.MessagePosted.message_ts },
  },
};
export default trigger;
