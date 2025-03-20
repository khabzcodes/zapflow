import { Icons } from '@/components/ui/icons';
import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';
import { LucideProps } from 'lucide-react';

export const SendGmailEmailTask = {
  type: TaskType.SEND_GMAIL_EMAIL,
  label: 'Send Email',
  description: 'Send an email using Gmail',
  icon: (props: LucideProps) => <Icons.gmail {...props} />,
  inputs: [
    {
      name: 'To',
      type: TaskParamType.STRING,
      helperText: 'Email addresses (comma-separated for multiple recipients)',
      required: true,
      hideHandle: false,
    },
    {
      name: 'Subject',
      type: TaskParamType.STRING,
      helperText: 'Subject of the email',
      required: true,
      hideHandle: false,
    },
    {
      name: 'Body',
      type: TaskParamType.STRING,
      helperText: 'Body of the email',
      required: true,
      hideHandle: false,
      variant: 'textarea',
    },
  ],
  outputs: [
    {
      name: 'Response',
      type: TaskParamType.JSON,
    },
  ],
};
