import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const def = DefineFunction({
  callback_id: "handle-interactive-blocks",
  title: "Handle button clicks in interactive_blocks",
  source_file: "Button_Interactions/functions/handle_interactive_blocks.ts",
  input_parameters: {
    // The input values from the SendMessage function's interactive_blocks
    properties: {
      action: { type: Schema.types.object },
      interactivity: { type: Schema.slack.types.interactivity },
      messageLink: { type: Schema.types.string },
      messageTs: { type: Schema.types.string },
    },
    required: ["action", "interactivity"],
  },
  output_parameters: { properties: {}, required: [] },
});

export default SlackFunction(
  def,
  // When the workflow is executed, this handler is called
  async ({ inputs, client }) => {
    if (inputs.action.action_id === "deny") {
      // Only when the click is on "Deny", this function opens a modal
      // to ask the reason of the denial
      const response = await client.views.open({
        interactivity_pointer: inputs.interactivity.interactivity_pointer,
        view: buildNewModalView(),
      });
      if (response.error) {
        const error = `Failed to open a modal due to ${response.error}`;
        return { error };
      }
      // Continue the interactions on the modal
      return { completed: false };
    }
    return { completed: true, outputs: {} };
  },
)
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
