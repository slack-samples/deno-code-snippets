# Scheduled Triggers

This sub-app guides you on invoking a workflow using a
[scheduled trigger](https://api.slack.com/future/triggers/scheduled). A
scheduled trigger can invoke a workflow periodically or only once. The supported
intervals as of this writing are "once", "hourly", "daily", "weekly", "monthly",
and "yearly".

If you haven't set up Slack CLI and the project on your local machine yet, visit
[the top-level guide document](../README.md) first.

## Supported Workflows

- **Scheduled Workflow:** Do nothing apart from Slack server-side logging

## Scheduled Workflow

To create a scheduled trigger for the workflow in this template, run the
following command:

```zsh
$ slack trigger create --trigger-def ./Scheduled_Triggers/triggers/scheduled_only_once.ts
```

After selecting a Workspace, the trgger should be created successfully.

The sample workflow will be invoked in 5 seconds, but it actually does nothing.
To confirm that the workflow is invoked for sure, run the following command to
check Slack's server-side logs in your termninal.

```zsh
$ slack activity -t
```

You will see a few lines of logs like this:

```
2023-01-20 10:17:06 [info] [Fn04KS1D0335] (Trace=Tr04KUKQDD0U) Function execution started for workflow function 'Scheduled Workflow'
2023-01-20 10:17:06 [info] [Wf04KUJK493N] (Trace=Tr04KP7MHUPP) Execution started for workflow 'Scheduled Workflow'
2023-01-20 10:17:07 [info] [Fn04KS1D0335] (Trace=Tr04KUKQDD0U) Function execution completed for function 'Scheduled Workflow'
2023-01-20 10:17:07 [info] [Wf04KUJK493N] (Trace=Tr04KP7MHUPP) Execution completed for workflow 'Scheduled Workflow'
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

### `Scheduled_Triggers/workflows`

A [workflow](https://api.slack.com/future/workflows) is a set of steps that are
executed in order. Each step in a workflow is a function.

Workflows can be configured to run without user input, or they can collect
inputs by beginning with a [form](https://api.slack.com/future/forms) before
continuing to the next step.

### `Scheduled_Triggers/triggers`

[Triggers](https://api.slack.com/future/triggers) determine when workflows are
executed. A trigger file describes a scenario in which a workflow should be run,
such as a user pressing a button or when a specific event occurs.

## What's Next?

The `do_nothing` workflow does nothing as its name implies. To learn how to
build more meaningful workflows, please check the following sample workflow. The
workflow can be invoked ever day to maintain some data.

- https://github.com/slack-samples/deno-message-translator/blob/main/triggers/daily_maintenance_job.ts
- https://github.com/slack-samples/deno-message-translator/blob/main/workflows/maintenance_job.ts

To learn more about other samples, visit [the top-level guide](../README.md) to
find more!
