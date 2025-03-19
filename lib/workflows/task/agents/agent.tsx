import { TaskParamType } from '@/enums/task-param-types';
import { TaskType } from '@/enums/task-type';

export const AgentTask = {
  type: TaskType.AGENT,
  label: 'Agent',
  description:
    "Define the agent's instructions, then enter a task to complete using tools.",
  icon: '/connections/agents.png',
  inputs: [
    {
      name: 'Language Model',
      type: TaskParamType.STRING,
      helperText: 'Select the language mode for the agent',
      required: true,
      hideHandle: true,
      variant: 'select',
      options: [
        { label: 'OpenAI', value: 'openai' },
        { label: 'Anthropic', value: 'anthropic' },
      ],
    },
    {
      name: 'Model Name',
      type: TaskParamType.STRING,
      helperText: 'Enter the model name for the agent',
      required: true,
      hideHandle: true,
      variant: 'select',
      options: [
        { label: 'gpt-4o-mini', value: 'gpt-4o-mini' },
        { label: 'gpt-4o', value: 'gpt-4o' },
        { label: 'gpt-4o-turbo', value: 'gpt-4o-turbo' },
        { label: 'gpt-4o-turbo-preview', value: 'gpt-4o-preview' },
      ],
    },
    {
      name: 'API Key',
      type: TaskParamType.STRING,
      helperText: 'Enter the API key for the agent',
      required: true,
      hideHandle: false,
    },
    {
      name: 'Instructions',
      type: TaskParamType.STRING,
      helperText: 'Enter the instructions for the agent',
      required: true,
      hideHandle: false,
      variant: 'textarea',
    },
  ],
  outputs: [
    {
      name: 'Response',
      type: TaskParamType.STRING,
    },
  ],
};
