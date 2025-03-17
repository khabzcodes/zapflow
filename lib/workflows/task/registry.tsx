import { GmailTriggerTask } from './gmail-trigger';
import { SendGmailEmailTask } from './gmail';
import { CustomWebhookTask, WebhookResponseTask } from './webhooks';

export const TaskRegistry = {
  GMAIL_TRIGGER: GmailTriggerTask,
  SEND_GMAIL_EMAIL: SendGmailEmailTask,
  CUSTOM_WEBHOOK: CustomWebhookTask,
  WEBHOOK_RESPONSE: WebhookResponseTask,
};
