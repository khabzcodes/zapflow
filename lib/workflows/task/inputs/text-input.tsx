import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';

export const TextInputTask = {
  type: TaskType.TEXT_INPUT,
  label: 'Text',
  description: 'Get text input from the background or user',
  icon: '/connections/inputs.png',
  inputs: [
    {
      name: 'Text',
      type: TaskParamType.STRING,
      helperText: 'Text input',
      required: true,
      hideHandle: false,
    },
  ],
  outputs: [
    {
      name: 'Message',
      type: TaskParamType.STRING,
    },
  ],
};
