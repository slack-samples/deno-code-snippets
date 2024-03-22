# Messaging

This sub-app guides you on how to post a channel message via the built-in
[`SendMessage`](https://api.slack.com/reference/functions/send_message),
[`SendEphemeralMessage`](https://api.slack.com/reference/functions/send_ephemeral_message),
and [`SendDm`](https://api.slack.com/reference/functions/send_dm)
functions. If you haven't set up the Slack CLI and the project on your local
machine yet, visit [the top-level guide document](../README.md) first.

## Supported Workflows

- **Channel Message Workflow:** Send an "in_channel" message, which is visible
  to everyone in a public channel
- **Ephemeral Message Workflow:** Send an "ephemeral" message, which is visible
  only to a specific person in a public channel
- **Direct Message Workflow:** Open a DM with a person and send a message in the
  private conversation

## Channel Message Workflow

When you run `./Messaging/workflows/channel_message.ts` workflow, it sends a
"Hello World!" message in a public channel. All you need to do are:

1. Create a trigger to start the workflow
2. Run your application using `slack run`
3. Invoke the workflow via the created trigger

### Create Triggers

[Triggers](https://api.slack.com/automation/triggers) are what cause workflows
to run. These triggers can be invoked by a user or automatically as a response
to an event within Slack.

By running this workflow, you will learn how to create and use two types of
triggers.

- Link trigger
- Webhook trigger

Either way, the workflow posts a message in a public channel. Let's start with a
link trigger.

#### Create a Link Trigger

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
$ slack trigger create --trigger-def ./Messaging/triggers/channel_message_link.ts
```

After selecting a Workspace, the output provided will include the link trigger
Shortcut URL. Copy and paste this URL into a channel as a message, or add it as
a bookmark in a channel of the workspace you selected.

Running `slack trigger create` command automatically installs your app with the
latest manifest metadata. Thus, your workflow is now ready to invoke. Once you
run the workflow, you will see "Hello World!" message in the same channel :tada:

#### Create a Webhook Trigger

A [webhook trigger](https://api.slack.com/automation/triggers/webhook) is a type
of a trigger that runs its associated workflow when a specific URL receives a
POST request.

To create a webhook trigger for the workflow in this template, run the following
command:

```zsh
$ slack trigger create --trigger-def ./Messaging/triggers/channel_message_webhook.ts
```

After selecting a Workspace, the output provided will include the webhook URL
starting with `https://hooks.slack.com/triggers/`. You can send "Hello World!"
message to a public channel by sending an HTTP POST request with a channel ID to
the webhook URL. The easiest way to know a channel ID is to click a channel name
in the Slack client UI, scroll down to the bottom in the popup modal, and then
copy the string starting with a "C" letter.

```zsh
$ curl -XPOST https://hooks.slack.com/triggers/your-url..... -d '{"channel_id": "C1234567890"}'
```

When you pass a valid **public** channel in the request body, you will see the
same "Hello World" message in the specified channel :tada:

## Ephemeral Message Workflow

Similarly, you can send an ephemeral message, which is visible to a specific
user, from a workflow. Create a link trigger:

```zsh
$ slack trigger create --trigger-def ./Messaging/triggers/ephemeral_message_link.ts
```

You can invoke the `./Messaging/workflows/ephemeral_message.ts` workflow from
the link trigger button. Then, you will receive an _"Only visible to you"_
message from the app.

## Direct Message Workflow

Lastly, try one more built-in function, which sends a direct message from your
app.

```zsh
$ slack trigger create --trigger-def ./Messaging/triggers/direct_message_link.ts
```

When you invoke the `./Messaging/workflows/direct_message.ts` workflow from the
link trigger, you will receive a DM from the app :tada:

## Deploying Your App

Once you're done with development, you can deploy the production version of your
app to Slack hosting using `slack deploy`:

```zsh
$ slack deploy
```

After deploying, create a trigger for the production version of your app (not
appended with `(local)`). Once the trigger is invoked, the workflow should run
just as it did when developing locally.

### Viewing Activity Logs

Activity logs for the production instance of your application can be viewed with
the `slack activity` command:

```zsh
$ slack activity
```

## Project Structure

### `manifest.ts`

The [app manifest](https://api.slack.com/automation/manifest) contains the app's
configuration. This file defines attributes like app name and description.

### `slack.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

### `Messaging/workflows`

A [workflow](https://api.slack.com/automation/workflows) is a set of steps that
are executed in order. Each step in a workflow is a function.

Workflows can be configured to run without user input, or they can collect
inputs by beginning with a [form](https://api.slack.com/automation/forms) before
continuing to the next step.

### `Messaging/triggers`

[Triggers](https://api.slack.com/automation/triggers) determine when workflows
are executed. A trigger file describes a scenario in which a workflow should be
run, such as a user pressing a button or when a specific event occurs.

## What's Next?

To learn more about other samples, visit [the top-level guide](../README.md) to
find more!
