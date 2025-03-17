import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';

export const WebhookResponseTask = {
  type: TaskType.WEBHOOK_RESPONSE,
  label: 'Webhook Response',
  icon: '/connections/webhook.png',
  description: 'Creates a response to the webhook',
  inputs: [
    {
      name: 'status',
      type: TaskParamType.NUMBER,
      helperText: 'The status code of the response',
      required: true,
      hideHandle: true,
    },
    {
      name: 'body',
      type: TaskParamType.STRING,
      helperText: 'The body of the response',
      required: true,
      hideHandle: true,
    },
  ],
};
