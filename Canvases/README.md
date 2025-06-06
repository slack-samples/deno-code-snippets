## Supported Workflows

- **Copy Canvas Demo Workflow:** Demonstrate how to create a canvas using
  `CanvasCreate` and copy the canvas using `CanvasCopy`
- **Create Canvas Demo Workflow:** Demonstrate create a canvas using
  `CanvasCreate`
- **Update Canvas Demo Workflow:** Demonstrate create a canvas using
  `CanvasCreate` and update that canvas content using `CanvasUpdateContent`
- **Share Canvas Demo Workflow:** Demonstrate create a canvas using
  `CanvasCreate` and share the create canvas using `CanvasUpdateContent` to the
  user and channel that run the workflow

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
$ slack trigger create --trigger-def ./Canvases/triggers/canvas_share_link.ts
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
`Canvases/workflows/*` workflow, which opens perform the canvas operation

## Create Canvas Demo Workflow

To create a link trigger for the Block Kit based workflow in this template, run
the following command:

```zsh
$ slack trigger create --trigger-def ./Canvases/triggers/canvas_create_link.ts
```

You can run the workflow the same way as the above workflow. The workflow will
create a canvas and set the owner of the canvas as the user that ran the
workflow

## Copy Canvas Demo Workflow

To create a link trigger for the Block Kit based workflow in this template, run
the following command:

```zsh
$ slack trigger create --trigger-def ./Canvases/triggers/canvas_copy_link.ts
```

You can run the workflow the same way as the above workflow. The workflow will
create a canvas and then will create a copy of the created canvas

## Update Canvas Demo Workflow

To create a link trigger for the Block Kit based workflow in this template, run
the following command:

```zsh
$ slack trigger create --trigger-def ./Canvases/triggers/canvas_update_link.ts
```

You can run the workflow the same way as the above workflow. The workflow will
create a canvas and then will insert content to that canvas

## Share Canvas Demo Workflow

To create a link trigger for the Block Kit based workflow in this template, run
the following command:

```zsh
$ slack trigger create --trigger-def ./Canvases/triggers/canvas_share_link.ts
```

You can run the workflow the same way as the above workflow. The workflow will
create a canvas and then Share it with the user and channel that run the
workflow

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

### `.slack/hooks.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

### `Canvases/workflows`

A [workflow](https://api.slack.com/automation/workflows) is a set of steps that
are executed in order. Each step in a workflow is a function.

Workflows can be configured to run without user input, or they can collect
inputs by beginning with a [form](https://api.slack.com/automation/forms) before
continuing to the next step.

### `Canvases/triggers`

[Triggers](https://api.slack.com/automation/triggers) determine when workflows
are executed. A trigger file describes a scenario in which a workflow should be
run, such as a user pressing a button or when a specific event occurs.

## What's Next?

To learn more about other samples, visit [the top-level guide](../README.md) to
find more!
