import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import PTO from "../datastores/pto.ts";

export const def = DefineFunction({
  callback_id: "datastore-ttl-demo",
  title: "Datastore TTL demo",
  source_file: "Datastores/functions/pto_demo.ts",
  input_parameters: {
    properties: {
      interactivity: { type: Schema.slack.types.interactivity },
      user_id: { type: Schema.slack.types.user_id },
    },
    required: ["interactivity", "user_id"],
  },
  output_parameters: { properties: {}, required: [] },
});

export default SlackFunction(def, async ({ inputs, client }) => {
  const offset = (await client.users.info({
    user: inputs.user_id,
  })).user?.tz_offset || 0;

  const {
    items: allItems,
    response_metadata,
  } = await client.apps.datastore.query({ datastore: PTO.name });
  let cursor = response_metadata?.next_cursor;
  while (cursor) {
    const {
      items,
      response_metadata,
    } = await client.apps.datastore.query({ datastore: PTO.name, cursor });
    allItems.push(...items);
    cursor = response_metadata?.next_cursor;
  }
  const blocksToDisplayPTOs: any[] = [];
  allItems.forEach((item) => {
    const startAt = new Date(item.start_at * 1000);
    startAt.setDate(startAt.getDate() - 1);
    const from = toDate(offset, startAt);
    const endAt = new Date(item.end_at * 1000);
    endAt.setDate(endAt.getDate() - 1);
    const to = toDate(offset, endAt);
    const note = item.note ? `(${item.note})` : "";
    blocksToDisplayPTOs.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `<@${item.user_id}> ${from} - ${to} ${note}`,
      },
    });
  });
  if (blocksToDisplayPTOs.length > 0) {
    blocksToDisplayPTOs.push({ "type": "divider" });
  }

  const initialDate = toDate(offset);
  const blocks = [
    {
      "type": "input",
      "block_id": "start_at",
      "element": {
        "type": "datepicker",
        "initial_date": initialDate,
        "action_id": "action",
      },
      "label": { "type": "plain_text", "text": "Start at" },
      "optional": false,
    },
    {
      "type": "input",
      "block_id": "end_at",
      "element": {
        "type": "datepicker",
        "initial_date": initialDate,
        "action_id": "action",
      },
      "label": { "type": "plain_text", "text": "End at" },
      "optional": false,
    },
    {
      "type": "input",
      "block_id": "note",
      "element": { "type": "plain_text_input", "action_id": "action" },
      "label": { "type": "plain_text", "text": "Note" },
      "optional": true,
    },
  ];

  const response = await client.views.open({
    interactivity_pointer: inputs.interactivity.interactivity_pointer,
    view: {
      "type": "modal",
      "callback_id": "pto-submission",
      "title": { "type": "plain_text", "text": "PTOs" },
      "submit": { "type": "plain_text", "text": "Submit" },
      "close": { "type": "plain_text", "text": "Close" },
      "blocks": blocksToDisplayPTOs.concat(blocks),
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
})
  .addViewSubmissionHandler(
    ["pto-submission"],
    async ({ view, inputs, client }) => {
      const offset =
        (await client.users.info({ user: inputs.user_id })).user?.tz_offset ||
        0;
      const userId = inputs.user_id;
      const creation = await client.apps.datastore.put({
        datastore: PTO.name,
        item: {
          id: userId + "-" + new Date().getTime(),
          user_id: userId,
          note: view.state.values.note.action.value,
          start_at: toTimestamp(
            offset,
            view.state.values.start_at.action.selected_date,
          ),
          end_at: toTimestamp(
            offset,
            view.state.values.end_at.action.selected_date,
          ),
        },
      });
      if (!creation.ok) {
        console.log(
          `Failed to create a data row: ${JSON.stringify(creation, null, 2)}`,
        );
        return { error: creation.error };
      }
      return {
        response_action: "update",
        view: {
          "type": "modal",
          "callback_id": "completion",
          "title": { "type": "plain_text", "text": "PTOs" },
          "close": { "type": "plain_text", "text": "Close" },
          "blocks": [
            {
              "type": "section",
              "text": { "type": "mrkdwn", "text": "Thank you!" },
            },
          ],
        },
      };
    },
  );

function toDate(
  offset: number,
  date: Date | undefined = undefined,
): string {
  const d = date ?? new Date();
  d.setTime(d.getTime() + offset * 1000);
  const year = d.getFullYear();
  const month = ("0" + String(d.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + String(d.getUTCDate())).slice(-2);
  return `${year}-${month}-${day}`;
}

function toTimestamp(
  offset: number,
  date: string,
): number {
  const d = new Date(date);
  d.setTime(d.getTime() + offset * 1000);
  d.setDate(d.getDate() + 1); // set when the following day starts
  return d.getTime() / 1000;
}
