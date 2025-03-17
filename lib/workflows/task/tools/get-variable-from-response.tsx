import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';

export const GetVariableFromResponseTask = {
  type: TaskType.GET_VARIABLE_FROM_RESPONSE,
  label: 'Get Variable From Response',
  description: 'Get a value from the previously stored variable',
  icon: '/connections/tools.png',
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
      type: TaskParamType.STRING,
    },
  ],
};
