import { SendGmailEmailTask } from '../task/gmail';
import { GmailTriggerTask } from '../task/gmail-trigger';
import { CustomWebhookTask, WebhookResponseTask } from '../task/webhooks';
import { GetVariableFromResponseTask } from '../task/tools';

export const taskMenuList = [
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
];
