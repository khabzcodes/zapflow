import { Icons } from '@/components/ui/icons';
import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';
import { LucideProps } from 'lucide-react';

export const CustomWebhookTask = {
  type: TaskType.CUSTOM_WEBHOOK,
  label: 'Custom Webhook',
  description: 'Triggers when webhook is received',
  icon: (props: LucideProps) => <Icons.webhook {...props} />,
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
