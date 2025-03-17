import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';

export const SendGmailEmailTask = {
  type: TaskType.SEND_GMAIL_EMAIL,
  label: 'Send Email',
  description: 'Send an email using Gmail',
  icon: '/connections/gmail.png',
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
    },
  ],
};
