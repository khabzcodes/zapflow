import { GmailTriggerTask } from './gmail-trigger';
import { SendGmailEmailTask } from './gmail';
import { CustomWebhookTask, WebhookResponseTask } from './webhooks';
import { GetVariableFromResponseTask } from './tools';

export const TaskRegistry = {
  GMAIL_TRIGGER: GmailTriggerTask,
  SEND_GMAIL_EMAIL: SendGmailEmailTask,
  CUSTOM_WEBHOOK: CustomWebhookTask,
  WEBHOOK_RESPONSE: WebhookResponseTask,
  GET_VARIABLE_FROM_RESPONSE: GetVariableFromResponseTask,
};
