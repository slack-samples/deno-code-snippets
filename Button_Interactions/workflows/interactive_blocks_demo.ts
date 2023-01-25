import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { def as HandleInteractiveBlocks } from "../functions/handle_interactive_blocks.ts";

const workflow = DefineWorkflow({
  callback_id: "interactive-blocks-demo-workflow",
  title: "Interactive Blocks Demo Workflow",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      user_id: { type: Schema.slack.types.user_id },
    },
    required: ["channel_id", "user_id"],
  },
});

// Send a message via SendMessage + interactive_blocks
const sendMessageStep = workflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: workflow.inputs.channel_id,
  message: `Do you approve <@${workflow.inputs.user_id}>'s time off request?`,
  // Simplified blocks for interactions
  interactive_blocks: [
    {
      "type": "actions",
      "block_id": "approve-deny-buttons",
      "elements": [
        {
          type: "button",
          action_id: "approve",
          text: { type: "plain_text", text: "Approve" },
          style: "primary",
        },
        {
          type: "button",
          action_id: "deny",
          text: { type: "plain_text", text: "Deny" },
          style: "danger",
        },
      ],
    },
  ],
});

// Handle the button click events on interactive_blocks
workflow.addStep(HandleInteractiveBlocks, {
  // The clicked action's details
  action: sendMessageStep.outputs.action,
  // For further interactions on a modal
  interactivity: sendMessageStep.outputs.interactivity,
  // The message's URL
  messageLink: sendMessageStep.outputs.message_link,
  // The message's unique ID in the channel
  messageTs: sendMessageStep.outputs.message_ts,
});

export default workflow;
