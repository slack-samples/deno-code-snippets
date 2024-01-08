import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const def = DefineFunction({
  callback_id: "block-kit-modal-demo",
  title: "Block Kit modal demo",
  source_file: "Block_Kit_Modals/functions/demo.ts",
  input_parameters: {
    properties: { interactivity: { type: Schema.slack.types.interactivity } },
    required: ["interactivity"],
  },
  output_parameters: { properties: {}, required: [] },
});

export default SlackFunction(
  def,
  // ---------------------------
  // The first handler function that opens a modal.
  // This function can be called when the workflow executes the function step.
  // ---------------------------
  async ({ inputs, client }) => {
    // Open a new modal with the end-user who interacted with the link trigger
    const response = await client.views.open({
      interactivity_pointer: inputs.interactivity.interactivity_pointer,
      view: {
        "type": "modal",
        // Note that this ID can be used for dispatching view submissions and view closed events.
        "callback_id": "first-page",
        // This option is required to be notified when this modal is closed by the user
        "notify_on_close": true,
        "title": { "type": "plain_text", "text": "My App" },
        "submit": { "type": "plain_text", "text": "Next" },
        "close": { "type": "plain_text", "text": "Close" },
        "blocks": [
          {
            "type": "input",
            "block_id": "first_text",
            "element": { "type": "plain_text_input", "action_id": "action" },
            "label": { "type": "plain_text", "text": "First" },
          },
        ],
      },
    });
    if (response.error) {
      const error =
        `Failed to open a modal in the demo workflow. Contact the app maintainers with the following information - (error: ${response.error})`;
      return { error };
    }
    return {
      // To continue with this interaction, return false for the completion
      completed: false,
    };
  },
)
  // ---------------------------
  // The handler that can be called when the above modal data is submitted.
  // It saves the inputs from the first page as private_metadata,
  // and then displays the second-page modal view.
  // ---------------------------
  .addViewSubmissionHandler(["first-page"], ({ view }) => {
    // Extract the input values from the view data
    const firstText = view.state.values.first_text.action.value;
    // Input validations
    if (firstText.length < 20) {
      return {
        response_action: "errors",
        // The key must be a valid block_id in the blocks on a modal
        errors: { first_text: "Must be 20 characters or longer" },
      };
    }
    // Successful. Update the modal with the second page presentation
    return {
      response_action: "update",
      view: {
        "type": "modal",
        "callback_id": "second-page",
        // This option is required to be notified when this modal is closed by the user
        "notify_on_close": true,
        "title": { "type": "plain_text", "text": "My App" },
        "submit": { "type": "plain_text", "text": "Next" },
        "close": { "type": "plain_text", "text": "Close" },
        // Hidden string data, which is not visible to end-users
        // You can use this property to transfer the state of interaction
        // to the following event handlers.
        // (Up to 3,000 characters allowed)
        "private_metadata": JSON.stringify({ firstText }),
        "blocks": [
          // Display the inputs from "first-page" modal view
          {
            "type": "section",
            "text": { "type": "mrkdwn", "text": `First: ${firstText}` },
          },
          // New input block to receive text
          {
            "type": "input",
            "block_id": "second_text",
            "element": { "type": "plain_text_input", "action_id": "action" },
            "label": { "type": "plain_text", "text": "Second" },
          },
        ],
      },
    };
  })
  // ---------------------------
  // The handler that can be called when the second modal data is submitted.
  // It displays the completion page view with the inputs from
  // the first and second pages.
  // ---------------------------
  .addViewSubmissionHandler(["second-page"], ({ view }) => {
    // Extract the first-page inputs from private_metadata
    const { firstText } = JSON.parse(view.private_metadata!);
    // Extract the second-page inputs from the view data
    const secondText = view.state.values.second_text.action.value;
    // Displays the third page, which tells the completion of the interaction
    return {
      response_action: "update",
      view: {
        "type": "modal",
        "callback_id": "completion",
        // This option is required to be notified when this modal is closed by the user
        "notify_on_close": true,
        "title": { "type": "plain_text", "text": "My App" },
        // This modal no longer accepts further inputs.
        // So, the "Submit" button is intentionally removed from the view.
        "close": { "type": "plain_text", "text": "Close" },
        // Display the two inputs
        "blocks": [
          {
            "type": "section",
            "text": { "type": "mrkdwn", "text": `First: ${firstText}` },
          },
          {
            "type": "section",
            "text": { "type": "mrkdwn", "text": `Second: ${secondText}` },
          },
        ],
      },
    };
  })
  // ---------------------------
  // The handler that can be called when the second modal data is closed.
  // If your app runs some resource-intensive operations on the backend side,
  // you can cancel the ongoing process and/or tell the end-user
  // what to do next in DM and so on.
  // ---------------------------
  .addViewClosedHandler(
    ["first-page", "second-page", "completion"],
    async ({ body, client, view }) => {
      console.log(`view_closed handler called: ${JSON.stringify(view)}`);
      await client.functions.completeSuccess({
        function_execution_id: body.function_data.execution_id,
        outputs: {}
      });
    },
  );
