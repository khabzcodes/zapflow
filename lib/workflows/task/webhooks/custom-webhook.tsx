import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';

export const CustomWebhookTask = {
  type: TaskType.CUSTOM_WEBHOOK,
  label: 'Custom Webhook',
  description: 'Triggers when webhook is received',
  icon: '/connections/webhook.png',
  inputs: [
    {
      name: 'URL',
      type: TaskParamType.STRING,
      helperText: 'URL to trigger the webhook',
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [
    {
      name: 'Response',
      type: TaskParamType.STRING,
    },
  ],
};
