import { createLogger } from '@/lib/loggers';
import { AgentTask } from '@/lib/workflows/task/agents';
import { type ExecutionPhaseConfiguration } from '@/types/executor';

const logger = createLogger('Agent Executor');

export const agentExecutor = async (
  config: ExecutionPhaseConfiguration<typeof AgentTask>,
) => {
  const apiKey = config.getInput('API Key');
  const languageModel = config.getInput('Language Model');
  const modelName = config.getInput('Model Name');
  const instructions = config.getInput('Instructions');

  logger.info(
    `Executing text input executor with environment: ${JSON.stringify(
      {
        apiKey,
        languageModel,
        modelName,
        instructions,
      },
      null,
      2,
    )}`,
  );
  return true;
};
