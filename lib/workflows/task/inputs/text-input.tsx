import { Icons } from '@/components/ui/icons';
import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';
import { LucideProps } from 'lucide-react';

export const TextInputTask = {
  type: TaskType.TEXT_INPUT,
  label: 'Text',
  description: 'Get text input from the background or user',
  icon: (props: LucideProps) => <Icons.cursorText {...props} />,
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
