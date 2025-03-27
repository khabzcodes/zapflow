import { agentExecutor } from './agent';
import { textInputExecutor } from './text-input';

export const ExecutorRegistry = {
  GMAIL_TRIGGER: () => Promise.resolve(true),
  SEND_GMAIL_EMAIL: () => Promise.resolve(true),
  CUSTOM_WEBHOOK: () => Promise.resolve(true),
  WEBHOOK_RESPONSE: () => Promise.resolve(true),
  GET_VARIABLE_FROM_RESPONSE: () => Promise.resolve(true),
  TEXT_INPUT: textInputExecutor,
  AGENT: agentExecutor,
};
