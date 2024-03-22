# Connector Functions

This sub-app guides you on adding connector functions to your workflow. If you
haven't set up the Slack CLI and the project on your local machine yet, visit
[the top-level guide document](../README.md) first.

## Supported Workflows

- **Giphy Workflow:** Post a channel message with a Giphy GIF image URL for a
  given text
- **Google Calendar Workflow:** Create a new event on Google Calendar within
  Slack and then share the URL in a channel

## Giphy Workflow

In this example workflow, you will create a link trigger, click the link to
start the workflow, submit the modal data, and then see the outputs in the
channel.

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
$ slack trigger create --trigger-def ./Connectors/triggers/giphy.ts
```

After selecting a Workspace, the trigger should be created successfully.

After selecting a Workspace, the output provided will include the link trigger
Shortcut URL. Copy and paste this URL into a channel as a message, or add it as
a bookmark in a channel of the workspace you selected.

## Manual Testing

Once you click the link trigger in a channel, the trigger starts the
`Connectors/workflows/giphy.ts` workflow, which runs
[a Giphy Connector function](https://api.slack.com/reference/connectors/giphy/get_translated_gif)
along with other two Slack functions.

When it's successful, you will see a modal dialog with lots of input fields.
Once you submit it, you will receive a Giphy image URL in the same channel.

## Google Calendar Workflow

In this example workflow, you will create a link trigger, click the link to
start the workflow, submit the modal data, and then see the outputs in the
channel.

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
$ slack trigger create --trigger-def ./Connectors/triggers/google_calendar.ts
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
`Connectors/workflows/google_calendar.ts` workflow, which runs
[a Google Calendar Connector function](https://api.slack.com/reference/connectors/google.calendar/create_event)
along with other two Slack functions.

When it's successful, you will see a modal dialog with lots of input fields.
Once you submit it, the workflow creates a new event on the Google Calendar
side, and then post the event URL in the same channel.

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

### `Connectors/workflows`

A [workflow](https://api.slack.com/automation/workflows) is a set of steps that
are executed in order. Each step in a workflow is a function.

Workflows can be configured to run without user input, or they can collect
inputs by beginning with a [form](https://api.slack.com/automation/forms) before
continuing to the next step.

### `Connectors/triggers`

[Triggers](https://api.slack.com/automation/triggers) determine when workflows
are executed. A trigger file describes a scenario in which a workflow should be
run, such as a user pressing a button or when a specific event occurs.

## What's Next?

To learn more about other samples, visit [the top-level guide](../README.md) to
find more!
