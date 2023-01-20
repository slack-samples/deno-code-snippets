# Datastores

This sub-app guides you on how to use
[datastores](https://api.slack.com/future/datastores). If you haven't set up
Slack CLI and the project on your local machine yet, visit
[the top-level guide document](../README.md) first.

## Supported Workflows

- **Task Manager Workflow:** Demonstrate how to interact with datastore records

## Task Manager Workflow

In this example workflow, you will create a link trigger, click the link to
start the workflow, and see the terminal output logs to know how the datastore
API calls work.

### Create a Link Trigger

[Triggers](https://api.slack.com/future/triggers) are what cause workflows to
run. These triggers can be invoked by a user or automatically as a response to
an event within Slack.

A [link trigger](https://api.slack.com/future/triggers/link) is a type of
trigger that generates a **Shortcut URL**, which, when posted in a channel or
added as a bookmark, becomes a link. When clicked, the link trigger will run the
associated workflow.

Link triggers are _unique to each installed version of your app_. This means
that Shortcut URLs will be different across each workspace, as well as between
[locally run](#running-your-project-locally) and
[deployed apps](#deploying-your-app). When creating a trigger, you must select
the workspace that you'd like to create the trigger in. Each workspace has a
development version (denoted by `(dev)`), as well as a deployed version.

To create a link trigger for the workflow in this template, run the following
command:

```zsh
$ slack trigger create --trigger-def ./Datastores/triggers/link.ts
```

After selecting a Workspace, the trigger should be created successfully.

After selecting a Workspace, the output provided will include the link trigger
Shortcut URL. Copy and paste this URL into a channel as a message, or add it as
a bookmark in a channel of the workspace you selected.

## Running Your Project Locally

While building your app, you can see your changes propagated to your workspace
in real-time with `slack run`. In both the CLI and in Slack, you'll know an app
is the development version if the name has the string `(dev)` appended.

```zsh
# Run app locally
$ slack run

Connected, awaiting events
```

Once running, click the
[previously created Shortcut URL](#create-a-link-trigger) associated with the
`(dev)` version of your app. This should start the included sample workflow.

To stop running locally, press `<CTRL> + C` to end the process.

## Manual Testing

Once you click the link trigger in a channel, the trigger starts the
`Datastores/workflow/form_demo.ts` workflow, which runs the
`Datastores/functions/tasks_demo.ts` function, which performs various datastore
API calls and outputs it in the console.

## Run Queries via Slack CLI

When you want to run ad-hoc queries and/or do bulk data inserts,
`slack datastore query` command is useful for it!

```zsh
$ slack datastore put '{"datastore": "tasks", "item": {"id": "1", "title": "Make a phone call"}}'

🎉  Stored below record in the datastore: tasks
{
  "id": "1",
  "title": "Make a phone call"
}

$ slack datastore query '
{
  "datastore": "tasks",
  "expression": "begins_with(#title, :title)",
  "expression_attributes": {"#title": "title"},
  "expression_values": {":title": "Make a "}
}
'

🎉  Retrieved 1 items from datastore: tasks

{
  "id": "1",
  "title": "Make a phone call"
}
```

## Deploying Your App

Once you're done with development, you can deploy the production version of your
app to Slack hosting using `slack deploy`:

```zsh
$ slack deploy
```

After deploying, create a trigger for the production version of your app (not
appended with `(dev)`). Once the trigger is invoked, the workflow should run
just as it did when developing locally.

## Project Structure

### `manifest.ts`

The [app manifest](https://api.slack.com/future/manifest) contains the app's
configuration. This file defines attributes like app name and description.

### `slack.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

### `Datastores/datastores`

[Datastores](https://api.slack.com/future/datastores) can securely store and
retrieve data for your application. Required scopes to use datastores include
`datastore:write` and `datastore:read`.

### `Datastores/functions`

[Functions](https://api.slack.com/future/functions) are reusable building blocks
of automation that accept inputs, perform calculations, and provide outputs.
Functions can be used independently or as steps in workflows.

### `Datastores/workflows`

A [workflow](https://api.slack.com/future/workflows) is a set of steps that are
executed in order. Each step in a workflow is a function.

Workflows can be configured to run without user input, or they can collect
inputs by beginning with a [form](https://api.slack.com/future/forms) before
continuing to the next step.

### `Datastores/triggers`

[Triggers](https://api.slack.com/future/triggers) determine when workflows are
executed. A trigger file describes a scenario in which a workflow should be run,
such as a user pressing a button or when a specific event occurs.

## What's Next?

To learn more about other samples, visit [the top-level guide](../README.md) to
find more!
