import { Icons } from '@/components/ui/icons';
import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';
import { LucideProps } from 'lucide-react';

export const GetVariableFromResponseTask = {
  type: TaskType.GET_VARIABLE_FROM_RESPONSE,
  label: 'Get variable',
  description: 'Get a value from the previously stored variable',
  icon: (props: LucideProps) => <Icons.textFont {...props} />,
  inputs: [
    {
      name: 'Variable name',
      type: TaskParamType.STRING,
      helperText: 'Enter the variable name',
      required: true,
    },
  ],
  outputs: [
    {
      name: 'Response',
      type: TaskParamType.JSON,
    },
  ],
};
