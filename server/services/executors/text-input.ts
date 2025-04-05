import { createLogger } from '@/lib/loggers';
import { TextInputTask } from '@/lib/workflows/task/inputs';
import { type ExecutionPhaseConfiguration } from '@/types/executor';

const logger = createLogger('Text Input Executor');

export const textInputExecutor = async (
  config: ExecutionPhaseConfiguration<typeof TextInputTask>,
) => {
  const textInput = config.getInput('Text');
  logger.info(
    `Executing text input executor with environment: ${JSON.stringify(
      textInput,
      null,
      2,
    )}`,
  );
  return true;
};
