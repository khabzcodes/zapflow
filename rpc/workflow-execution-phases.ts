import { baseApiRoute } from './config';

const route = baseApiRoute.workflowExecutionPhases;

export const getWorkflowExecutionPhase = async (phaseId: string) => {
  const response = await route[':id'].$get({ param: { id: phaseId } });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { phase } = await response.json();
  return phase;
};
