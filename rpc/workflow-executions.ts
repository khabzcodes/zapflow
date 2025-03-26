import { baseApiRoute } from './config';

const route = baseApiRoute.workflowExecutions;

export const getWorkflowExecution = async (executionId: string) => {
  const response = await route[':id'].$get({ param: { id: executionId } });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { execution } = await response.json();
  return execution;
};
