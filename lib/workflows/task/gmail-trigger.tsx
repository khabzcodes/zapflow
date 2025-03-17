import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';

export const GmailTriggerTask = {
  type: TaskType.GMAIL_TRIGGER,
  label: 'Gmail Trigger',
  icon: '/connections/gmail.png',
  inputs: [
    {
      name: 'Connection',
      type: TaskParamType.STRING,
      helperText: 'Select a connection',
      required: true,
      hideHandle: true,
    },
    // {
    //   name: 'Folder',
    //   type: TaskParamType.STRING,
    //   helperText: 'Select a folder',
    //   required: true,
    //   hideHandle: true,
    // },
  ],
};
