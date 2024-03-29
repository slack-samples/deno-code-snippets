import { Manifest } from "deno-slack-sdk/mod.ts";

// Messaging/*
import ChannelMessageWorkflow from "./Messaging/workflows/channel_message.ts";
import EphemeralMessageWorkflow from "./Messaging/workflows/ephemeral_message.ts";
import DirectMessageWorkflow from "./Messaging/workflows/direct_message.ts";

// Built-in_Forms/*
import FormDemoWorkflow from "./Built-in_Forms/workflows/form_demo.ts";

// Connectors/*
import GiphyConnectorWorkflow from "./Connectors/workflows/giphy.ts";
import GoogleCalendarConnectorWorkflow from "./Connectors/workflows/google_calendar.ts";

// Custom_Functions/*
import MySendMessageWorflow from "./Custom_Functions/workflows/my_send_message_workflow.ts";

// External_API_Calls/*
import HttpbinWorkflow from "./External_API_Calls/workflows/ephemeral_message.ts";

// Datastores/*
import TaskManagerWorkflow from "./Datastores/workflows/task_manager.ts";
import PTOWorkflow from "./Datastores/workflows/pto.ts";
import Tasks from "./Datastores/datastores/tasks.ts";
import PTOs from "./Datastores/datastores/pto.ts";

// Event_Triggers/*
import MessageToChannelCreatorWorkflow from "./Event_Triggers/workflows/message_to_channel_creator.ts";
import ReplyToReactionWorkflow from "./Event_Triggers/workflows/reply_to_reaction.ts";
import PingPongMessageWorkflow from "./Event_Triggers/workflows/ping_pong_message.ts";

// Scheduled Triggers/*
import ScheduledWorkflow from "./Scheduled_Triggers/workflows/do_nothing.ts";

// Button_Interactions/*
import InteractiveBlocksModalDemoWorkflow from "./Button_Interactions/workflows/interactive_blocks_demo.ts";
import BlockKitButtonDemoWorkflow from "./Button_Interactions/workflows/block_kit_button_demo.ts";

// Block_Kit_Modals/*
import BlockKitModalDemoWorkflow from "./Block_Kit_Modals/workflows/block_kit_modal_demo.ts";

// Canvas Triggers/*
import CanvasCreateWorkflow from "./Canvases/workflows/create_canvas.ts";
import CanvasUpdateWorkflow from "./Canvases/workflows/update_canvas.ts";
import CanvasShareWorkflow from "./Canvases/workflows/share_canvas.ts";
import CanvasCopyWorkflow from "./Canvases/workflows/copy_canvas.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "deno-code-snippets",
  description: "A collection of Slack's next-gen platform feature demos",
  icon: "assets/default_new_app_icon.png",
  workflows: [
    ChannelMessageWorkflow,
    EphemeralMessageWorkflow,
    DirectMessageWorkflow,
    FormDemoWorkflow,
    GiphyConnectorWorkflow,
    GoogleCalendarConnectorWorkflow,
    MySendMessageWorflow,
    HttpbinWorkflow,
    TaskManagerWorkflow,
    PTOWorkflow,
    MessageToChannelCreatorWorkflow,
    ReplyToReactionWorkflow,
    PingPongMessageWorkflow,
    ScheduledWorkflow,
    InteractiveBlocksModalDemoWorkflow,
    BlockKitButtonDemoWorkflow,
    BlockKitModalDemoWorkflow,
    CanvasCreateWorkflow,
    CanvasUpdateWorkflow,
    CanvasShareWorkflow,
    CanvasCopyWorkflow,
  ],
  outgoingDomains: [
    "httpbin.org", // for External_API_Calls/functions/*
  ],
  datastores: [
    Tasks, // for Datastores/*
    PTOs, // for Datastores/*
  ],
  features: {
    appHome: {
      messagesTabEnabled: true,
      messagesTabReadOnlyEnabled: false,
    },
  },
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "groups:write", // for Event_Triggers's ShareCanvasWorkflow
    "im:write", // for Event_Triggers's ShareCanvasWorkflow
    "channels:read", // for Event_Triggers's MessageToChannelCreatorWorkflow
    "reactions:read", // for Event_Triggers's ReplyToReactionWorkflow
    "channels:history", // for Event_Triggers's PingPongMessageWorkflow
    "datastore:read", // for Datastores/*
    "datastore:write", // for Datastores/*
    "canvases:read", // for Canvases/*
    "canvases:write", // for Canvases/*
  ],
});
