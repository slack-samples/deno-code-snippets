# Event Triggers

This sub-app guides you on how to use
[event triggers](https://api.slack.com/future/triggers/event). If you haven't
set up the Slack CLI and the project on your local machine yet, visit
[the top-level guide document](../README.md) first.

## Supported Workflows

- **Message To Channel Creator Workflow:** Post a message mentioning the channel
  creator when a channel is created
- **Reply To Reaction Workflow:** Rely in a message's thread when a reaction is
  added to a message
- **Ping Pong Message Workflow:** Post a "pong" message when receiving a message

## Message To Channel Creator Workflow

This example workflow can be invoked when a public channel is created in the
associated workspace.

To create an event trigger for the workflow in this template, run the following
command:

```zsh
$ slack trigger create --trigger-def ./Event_Triggers/triggers/channel_created.ts
```

To verify the behavior, create a new public channel. If the app is running, this
workflow will be invoked and its bot user will post a message mentioning you in
the created channel :tada:

## Reply To Reaction Workflow

This example workflow can be invoked when a reaction is added to a message in
the associated channels.

Before creating a trigger as usual, open the
`Event_Triggers/triggers/reaction_added.ts` source file, and then **edit the
part `channel_ids: ["C03E94MKS"],` with valid channel IDs in your workspace**.
The easiest way to know a channel ID is to click a channel name in the Slack
client UI, scroll down to the bottom in the popup modal, and then copy the
string starting with a "C" letter.

To create an event trigger for the workflow in this template, run the following
command:

```zsh
$ slack trigger create --trigger-def ./Event_Triggers/triggers/reaction_added.ts
```

To verify the behavior, add a reaction to a message in any of the specified
channels. This workflow will be invoked and its bot user will post a message
mentioning you in the message's thread.

## Running Your Project Locally

While building your app, you can see your changes propagated to your workspace
in real-time with `slack run`. In both the CLI and in Slack, you'll know an app
is the development version if the name has the string `(local)` appended.

```zsh
# Run app locally
$ slack run

Connected, awaiting events
```

To stop running locally, press `<CTRL> + C` to end the process.

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

The [app manifest](https://api.slack.com/future/manifest) contains the app's
configuration. This file defines attributes like app name and description.

### `slack.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

### `Event_Triggers/workflows`

A [workflow](https://api.slack.com/future/workflows) is a set of steps that are
executed in order. Each step in a workflow is a function.

Workflows can be configured to run without user input, or they can collect
inputs by beginning with a [form](https://api.slack.com/future/forms) before
continuing to the next step.

### `Event_Triggers/triggers`

[Triggers](https://api.slack.com/future/triggers) determine when workflows are
executed. A trigger file describes a scenario in which a workflow should be run,
such as a user pressing a button or when a specific event occurs.

## What's Next?

To learn more about other samples, visit [the top-level guide](../README.md) to
find more!
