import { Icons } from '@/components/ui/icons';
import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';
import { LucideProps } from 'lucide-react';

export const WebhookResponseTask = {
  type: TaskType.WEBHOOK_RESPONSE,
  label: 'Webhook Response',
  icon: (props: LucideProps) => <Icons.webhook {...props} />,
  description: 'Creates a response to the webhook',
  inputs: [
    {
      name: 'Status',
      type: TaskParamType.NUMBER,
      helperText: 'The status code of the response',
      required: true,
      hideHandle: true,
    },
    {
      name: 'Body',
      type: TaskParamType.STRING,
      helperText: 'The body of the response',
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [],
};
