import { baseApiRouteWithAuth } from './config';

const route = baseApiRouteWithAuth.integrations;

export const getIntegrations = async () => {
  const response = await route.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { integrations } = await response.json();

  return integrations;
};

export const getIntegration = async (name: string) => {
  const response = await route[':name'].$get({ param: { name } });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { integration } = await response.json();
  if (!integration) {
    return null;
  }

  return integration;
};
