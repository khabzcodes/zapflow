import { baseApiRoute } from './config';

const route = baseApiRoute.integrations;

export const getIntegrations = async () => {
  const response = await route.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { integrations } = await response.json();

  return integrations;
};
