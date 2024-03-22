# External API Calls

This sub-app guides you on calling an external API in your custom function. If
you haven't set up the Slack CLI and the project on your local machine yet,
visit [the top-level guide document](../README.md) first.

## Supported Workflows

- **External API Call Workflow:** Fetch data from https://httpbin.org/get , and
  then display it in an ephemeral message

## External API Call Workflow

All the external domains must be listed in the `outgoingDomains` array in
`manifest.ts` file. With that, your custom functions can perform HTTP requests
to allowed domain URLs.

Apart from that, nothing is different from the `Custom_Functions` sample app.

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
$ slack trigger create --trigger-def ./External_API_Calls/triggers/link.ts
```

After selecting a Workspace, the trgger should be created successfully.

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
`External_API_Calls/workflows/ephemeral_message.ts` workflow, which runs your
custom function `External_API_Calls/functions/httpbin_get.ts`.

When it's successful, you will see the following ephemeral message in the same
channel. The `user_agent` and `origin` can be different, though.

```
Received from httpbin.org:
{
  "user_agent": "Deno/1.26.1",
  "origin": "35.74.58.174",
  "url": "https://httpbin.org/get"
}
```

## Testing

For an example of how to test a function, see
`External_API_Calls/functions/httpbin_get_test.ts`. Test filenames should be
suffixed with `_test`. You can run the test by running
`deno test External_API_Calls/functions/httpbin_get_test.ts` in your terminal
window.

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

### `External_API_Calls/functions`

[Functions](https://api.slack.com/automation/functions) are reusable building
blocks of automation that accept inputs, perform calculations, and provide
outputs. Functions can be used independently or as steps in workflows.

### `External_API_Calls/workflows`

A [workflow](https://api.slack.com/automation/workflows) is a set of steps that
are executed in order. Each step in a workflow is a function.

Workflows can be configured to run without user input, or they can collect
inputs by beginning with a [form](https://api.slack.com/automation/forms) before
continuing to the next step.

### `External_API_Calls/triggers`

[Triggers](https://api.slack.com/automation/triggers) determine when workflows
are executed. A trigger file describes a scenario in which a workflow should be
run, such as a user pressing a button or when a specific event occurs.

## What's Next?

If you'd like to explore this concept more, the following sample apps also do
external API calls.

- https://github.com/slack-samples/deno-github-functions
- https://github.com/slack-samples/deno-message-translator

To learn more about other samples, visit [the top-level guide](../README.md) to
find more!
