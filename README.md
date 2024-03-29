# Deno Code Snippets

This app demonstrates most of Slack's next-generation platform features in a
simple form. Refer to each sub app's README for more details.

**Guide Outline**:

- [Setup](#setup)
  - [Install the Slack CLI](#install-the-slack-cli)
  - [Clone the Sample App](#clone-the-sample-app)
- [Sample Apps](#sample-apps)
- [Resources](#resources)

---

## Setup

Before getting started, make sure you have a development workspace where you
have permissions to install apps. If you don’t have one set up, go ahead and
[create one](https://slack.com/create). Also, please note that the workspace
requires any of [the Slack paid plans](https://slack.com/pricing).

### Install the Slack CLI

To use this template, you first need to install and configure the Slack CLI.
Step-by-step instructions can be found in our
[Quickstart Guide](https://api.slack.com/automation/quickstart).

### Clone the Sample App

Start by cloning this repository:

```zsh
# Clone this project onto your machine
$ slack create my-code-snippets-app -t slack-samples/deno-code-snippets

# Change into this project directory
$ cd my-code-snippets-app
```

## Sample Apps

This app consists of a number of sample apps. Go over the list of sub-apps below
and start with any of them:

- [Messaging](./Messaging/): Post a channel message via the built-in
  [`SendMessage`](https://api.slack.com/reference/functions/send_message),
  [`SendEphemeralMessage`](https://api.slack.com/reference/functions/send_ephemeral_message),
  and [`SendDm`](https://api.slack.com/reference/functions/send_dm) functions
- [Built-in Forms](./Built-in_Forms/): Open a modal dialog using the built-in
  [`OpenForm`](https://api.slack.com/reference/functions/open_form)
- [Canvases](./Canvases/): Use canvas via the built-in
  [`CopyCanvas`](https://api.slack.com/reference/functions/canvas_copy),
  [`CreateCanvas`](https://api.slack.com/reference/functions/canvas_create),
  [`CanvasUpdateContent`](https://api.slack.com/reference/functions/canvas_update_content),
  [`ShareCanvas`](https://api.slack.com/reference/functions/share_canvas),
- [Connectors](./Connectors/): Use connector steps within your coded workflow
- [Custom Functions](./Custom_Functions/) function: Do anything you want by
  writing TypeScript code
- [External API Calls](./External_API_Calls/): Call other service's APIs in your
  custom function
- [Datastores](./Datastores/): Use datastores to store your app's data
- [Event Triggers](./Event_Triggers/): Start a workflow when a Slack event
  occurs
- [Scheduled Triggers](./Scheduled_Triggers/): Schedule workflow executions

The following ones may be a little bit advanced:

- [Button Interactions](./Button_Interactions/): Place a button in a message and
  handle the interactions with a custom function
- [Block Kit Modals](./Block_Kit_Modals/): Fully leverage Slack's
  [modals](https://api.slack.com/surfaces/modals/using) and its foundation,
  [Block Kit UI framework](https://api.slack.com/block-kit)

## Resources

To learn more about developing with the CLI, you can visit the following guides:

- [Creating a new app with the CLI](https://api.slack.com/automation/create)
- [Configuring your app](https://api.slack.com/automation/manifest)
- [Developing locally](https://api.slack.com/automation/run)

To view all documentation and guides available, visit the
[Overview page](https://api.slack.com/automation/overview).
