# Button Interactions

This sub-app guides you on how to handle button interactions in a channel
message. If you haven't set up the Slack CLI and the project on your local
machine yet, visit [the top-level guide document](../README.md) first.

## Supported Workflows

- **Interactive Blocks Demo Workflow:** Demonstrate how to handle the built-in
  `SendMessage`'s `interactive_blocks`
- **Block Kit Button Demo Workflow:** Demonstrate how to handle Block Kit's
  button blocks

## Interactive Blocks Demo Workflow

In this example workflow, you will create a link trigger, click the link to
start the workflow, and see how the interactions with `interactive_blocks` work.

### Create a Link Trigger

[Triggers](https://api.slack.com/automation/triggers) are what cause workflows
to run. These triggers can be invoked by a user or automatically as a response
to an event within Slack.

A [link trigger](https://api.slack.com/automation/triggers/link) is a type of
trigger that generates a **Shortcut URL**, which, when posted in a channel or
added as a bookmark, becomes a link. When clicked, the link trigger will run the
associated workflow.

Link triggers are _unique to each installed version of your app_. This means
that Shortcut URLs will be different across each workspace, as well as between
[locally run](#running-your-project-locally) and
[deployed apps](#deploying-your-app). When creating a trigger, you must select
the workspace that you'd like to create the trigger in. Each workspace has a
development version (denoted by `(local)`), as well as a deployed version.

To create a link trigger for the workflow in this template, run the following
command:

```zsh
$ slack trigger create --trigger-def ./Button_Interactions/triggers/interactive_blocks_link.ts
```

After selecting a Workspace, the trigger should be created successfully.

After selecting a Workspace, the output provided will include the link trigger
Shortcut URL. Copy and paste this URL into a channel as a message, or add it as
a bookmark in a channel of the workspace you selected.

## Running Your Project Locally

While building your app, you can see your changes propagated to your workspace
in real-time with `slack run`. In both the CLI and in Slack, you'll know an app
is the development version if the name has the string `(local)` appended.

```zsh
# Run app locally
$ slack run

Connected, awaiting events
```

Once running, click the
[previously created Shortcut URL](#create-a-link-trigger) associated with the
`(local)` version of your app. This should start the included sample workflow.

To stop running locally, press `<CTRL> + C` to end the process.

## Manual Testing

Once you click the link trigger in a channel, the trigger starts the
`Button_Interactions/workflows/interactive_blocks_demo.ts` workflow, which opens
a modal dialog for you.

When it's successful, you will see a message with two buttons. When you click
one of them, `Button_Interactions/functions/handle_interactive_blocks.ts`
function will be executed.

You can handle the click event data. However, it's not feasible to customize the
message UI with `SendMessage`'s `interactive_blocks`. When you need to go
further, you can directly use Block Kit in your `chat.postMessage` API payload.

## Block Kit Button Demo Workflow

To create a link trigger for the Block Kit based workflow in this template, run
the following command:

```zsh
$ slack trigger create --trigger-def ./Button_Interactions/triggers/block_kit_button_link.ts
```

You can run the workflow the same way as the above `interactive_blocks` one. The
workflow behaves mostly the same, but the key difference is that message
modification when clicking a button. You can customize the UI and its behaviors
as you want.

## Deploying Your App

Once you're done with development, you can deploy the production version of your
app to Slack hosting using `slack deploy`:

```zsh
$ slack deploy
```

After deploying, create a trigger for the production version of your app (not
appended with `(local)`). Once the trigger is invoked, the workflow should run
just as it did when developing locally.

## Project Structure

### `manifest.ts`

The [app manifest](https://api.slack.com/automation/manifest) contains the app's
configuration. This file defines attributes like app name and description.

### `slack.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

### `Button_Interactions/functions`

[Functions](https://api.slack.com/automation/functions) are reusable building
blocks of automation that accept inputs, perform calculations, and provide
outputs. Functions can be used independently or as steps in workflows.

### `Button_Interactions/workflows`

A [workflow](https://api.slack.com/automation/workflows) is a set of steps that
are executed in order. Each step in a workflow is a function.

Workflows can be configured to run without user input, or they can collect
inputs by beginning with a [form](https://api.slack.com/automation/forms) before
continuing to the next step.

### `Button_Interactions/triggers`

[Triggers](https://api.slack.com/automation/triggers) determine when workflows
are executed. A trigger file describes a scenario in which a workflow should be
run, such as a user pressing a button or when a specific event occurs.

## What's Next?

To learn more about other samples, visit [the top-level guide](../README.md) to
find more!
