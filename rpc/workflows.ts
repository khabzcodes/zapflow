import {
  CreateWorkflowInputData,
  UpdateWorkflowInputData,
} from '@/validations/workflows';
import { baseApiRouteWithAuth } from './config';

const route = baseApiRouteWithAuth.workflows;

export const getOrganizationWorkflows = async () => {
  const response = await route.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { workflows } = await response.json();

  return workflows;
};

export const createOrganizationWorkflow = async (
  data: CreateWorkflowInputData,
) => {
  const response = await route.$post({ json: data });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { workflow } = await response.json();
  return workflow;
};

export const getOrganizationWorkFlow = async (workflowId: string) => {
  const response = await route[':id'].$get({ param: { id: workflowId } });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { workflow } = await response.json();
  return workflow;
};

export const updateOrganizationWorkflow = async (
  workflowId: string,
  data: UpdateWorkflowInputData,
) => {
  const response = await route[':id'].$put({
    param: { id: workflowId },
    json: data,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { workflow } = await response.json();
  return workflow;
};

export const runWorkflow = async (workflowId: string) => {
  const response = await route[':id'].run.$post({ param: { id: workflowId } });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const data = await response.json();

  return data;
};
