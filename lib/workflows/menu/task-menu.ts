import { SendGmailEmailTask } from '../task/gmail';
import { GmailTriggerTask } from '../task/gmail-trigger';
import { CustomWebhookTask, WebhookResponseTask } from '../task/webhooks';
import { GetVariableFromResponseTask } from '../task/tools';
import { TextInputTask } from '../task/inputs';
import { AgentTask } from '../task/agents';

export const taskMenuList = [
  {
    title: 'Inputs',
    icon: '/connections/inputs.png',
    tasks: [TextInputTask],
  },
  {
    title: 'Gmail',
    icon: '/connections/gmail.png',
    tasks: [SendGmailEmailTask, GmailTriggerTask],
  },
  {
    title: 'Webhooks',
    icon: '/connections/webhook.png',
    tasks: [CustomWebhookTask, WebhookResponseTask],
  },
  {
    title: 'Tools',
    icon: '/connections/tools.png',
    tasks: [GetVariableFromResponseTask],
  },
  {
    title: 'Agents',
    icon: '/connections/agents.png',
    tasks: [AgentTask],
  },
];
