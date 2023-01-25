import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const def = DefineFunction({
  callback_id: "send_interactive_message",
  title: "Send a message with interactive blocks",
  source_file: "Button_Interactions/functions/send_block_kit_message.ts",
  input_parameters: {
    properties: {
      user_id: { type: Schema.slack.types.user_id },
      channel_id: { type: Schema.slack.types.channel_id },
    },
    required: ["user_id", "channel_id"],
  },
  output_parameters: { properties: {}, required: [] },
});

export default SlackFunction(
  def,
  // When the workflow is executed, this handler is called
  async ({ inputs, client }) => {
    const text = `Do you approve <@${inputs.user_id}>'s time off request?`;
    // Block Kit elements (https://api.slack.com/block-kit)
    const blocks = [
      {
        type: "section",
        text: { type: "mrkdwn", text },
      },
      { type: "divider" },
      {
        type: "actions",
        block_id: "approve-deny-buttons",
        elements: [
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
    ];
    const response = await client.chat.postMessage({
      channel: inputs.channel_id,
      text,
      blocks,
    });
    if (response.error) {
      console.log(JSON.stringify(response, null, 2));
      const error = `Failed to post a message due to ${response.error}`;
      return { error };
    }
    // To continue with this interaction, return false for the completion
    return { completed: false };
  },
)
  // Handle the "Approve" button clicks
  .addBlockActionsHandler("approve", async ({ body, client, inputs }) => {
    const text = "Thank you for approving the request!";
    const response = await client.chat.update({
      channel: inputs.channel_id,
      ts: body.container.message_ts,
      text,
      blocks: [{ type: "section", text: { type: "mrkdwn", text } }],
    });
    if (response.error) {
      const error = `Failed to update the message due to ${response.error}`;
      return { error };
    }
    return { completed: true, outputs: {} };
  })
  // Handle the "Deny" button clicks
  .addBlockActionsHandler("deny", async ({ body, client, inputs }) => {
    const text =
      "OK, we need more information... Could you share the reason for denial?";
    const messageResponse = await client.chat.update({
      channel: inputs.channel_id,
      ts: body.container.message_ts,
      text,
      blocks: [{ type: "section", text: { type: "mrkdwn", text } }],
    });
    if (messageResponse.error) {
      const error =
        `Failed to update the message due to ${messageResponse.error}`;
      return { error };
    }
    const modalResponse = await client.views.open({
      interactivity_pointer: body.interactivity.interactivity_pointer,
      view: buildNewModalView(),
    });
    if (modalResponse.error) {
      const error = `Failed to open a modal due to ${modalResponse.error}`;
      return { error };
    }
    return { completed: false };
  })
  // Handle the button click events on the modal
  .addBlockActionsHandler("clear-inputs", async ({ body, client }) => {
    const response = await client.views.update({
      interactivity_pointer: body.interactivity.interactivity_pointer,
      view_id: body.view.id,
      view: buildNewModalView(),
    });
    if (response.error) {
      const error = `Failed to update a modal due to ${response.error}`;
      return { error };
    }
    return { completed: false };
  })
  // Handle the data submission from the modal
  .addViewSubmissionHandler(
    ["deny-reason-submission"],
    ({ view }) => {
      const values = view.state.values;
      const reason = String(Object.values(values)[0]["deny-reason"].value);
      if (reason.length <= 5) {
        console.log(reason);
        const errors: Record<string, string> = {};
        const blockId = Object.keys(values)[0];
        errors[blockId] = "The reason must be 5 characters or longer";
        return { response_action: "errors", errors };
      }
      return {};
    },
  )
  // Handle the events when the end-user closes the modal
  .addViewClosedHandler(
    ["deny-reason-submission", "deny-reason-confirmation"],
    ({ view }) => {
      console.log(JSON.stringify(view, null, 2));
    },
  );

/**
 * Returns the initial state of the modal view
 * @returns the initial modal view
 */
function buildNewModalView() {
  return {
    "type": "modal",
    "callback_id": "deny-reason-submission",
    "title": { "type": "plain_text", "text": "Reason for the denial" },
    "notify_on_close": true,
    "submit": { "type": "plain_text", "text": "Confirm" },
    "blocks": [
      {
        "type": "input",
        // If you reuse block_id when refreshing an existing modal view,
        // the old block may remain. To avoid this, always set a random value.
        "block_id": crypto.randomUUID(),
        "label": { "type": "plain_text", "text": "Reason" },
        "element": {
          "type": "plain_text_input",
          "action_id": "deny-reason",
          "multiline": true,
          "placeholder": {
            "type": "plain_text",
            "text": "Share the reason why you denied the request in detail",
          },
        },
      },
      {
        "type": "actions",
        "block_id": "clear",
        "elements": [
          {
            type: "button",
            action_id: "clear-inputs",
            text: { type: "plain_text", text: "Clear all the inputs" },
            style: "danger",
          },
        ],
      },
    ],
  };
}
