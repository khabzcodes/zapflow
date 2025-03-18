import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';

export const GmailTriggerTask = {
  type: TaskType.GMAIL_TRIGGER,
  label: 'Gmail Trigger',
  description:
    'Triggers when a new email is received to be processed according to specified criteria',
  icon: '/connections/gmail.png',
  inputs: [
    {
      name: 'Connection',
      type: TaskParamType.STRING,
      helperText: 'Select a connection',
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
