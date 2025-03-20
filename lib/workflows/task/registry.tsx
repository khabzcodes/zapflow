import { GmailTriggerTask } from './gmail-trigger';
import { SendGmailEmailTask } from './gmail';
import { CustomWebhookTask, WebhookResponseTask } from './webhooks';
import { GetVariableFromResponseTask } from './tools';
import { TextInputTask } from './inputs';
import { AgentTask } from './agents';
import { TaskType } from '@/enums/task-type';
import { WorkflowTask } from '@/types/workflow';

type Registry = {
  [K in TaskType]: WorkflowTask;
};

export const TaskRegistry: Registry = {
  GMAIL_TRIGGER: GmailTriggerTask,
  SEND_GMAIL_EMAIL: SendGmailEmailTask,
  CUSTOM_WEBHOOK: CustomWebhookTask,
  WEBHOOK_RESPONSE: WebhookResponseTask,
  GET_VARIABLE_FROM_RESPONSE: GetVariableFromResponseTask,
  TEXT_INPUT: TextInputTask,
  AGENT: AgentTask,
};
