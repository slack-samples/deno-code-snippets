import { DefineFunction, SlackFunction } from "deno-slack-sdk/mod.ts";
import Tasks from "../datastores/tasks.ts";

export const def = DefineFunction({
  callback_id: "datastore-demo",
  title: "Datastore demo",
  source_file: "Datastores/functions/tasks_demo.ts",
  input_parameters: { properties: {}, required: [] },
  output_parameters: { properties: {}, required: [] },
});

export default SlackFunction(def, async ({ client }) => {
  const creation = await client.apps.datastore.put({
    datastore: Tasks.name,
    item: { "id": "1", "title": "Make a phone call to Jim" },
  });
  console.log(`creation result: ${JSON.stringify(creation, null, 2)}`);
  if (creation.error) {
    return { error: creation.error };
  }

  const query = await client.apps.datastore.query({
    datastore: Tasks.name,
    expression: "#id = :id",
    expression_attributes: { "#id": "id" },
    expression_values: { ":id": "1" },
  });
  console.log(`query result: ${JSON.stringify(query, null, 2)}`);
  if (query.error) {
    return { error: query.error };
  }

  const modification = await client.apps.datastore.put({
    datastore: Tasks.name,
    item: { "id": "1", "title": "Make a phone call to Jim", "due": "Dec 18" },
  });
  console.log(`modification result: ${JSON.stringify(modification, null, 2)}`);
  if (modification.error) {
    return { error: modification.error };
  }

  const deletion = await client.apps.datastore.delete({
    datastore: Tasks.name,
    id: "1",
  });
  console.log(`deletion result: ${JSON.stringify(deletion, null, 2)}`);
  if (deletion.error) {
    return { error: deletion.error };
  }

  return { outputs: {} };
});
