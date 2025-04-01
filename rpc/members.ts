import { baseApiRouteWithAuth } from './config';

const route = baseApiRouteWithAuth.members;

export const getOrganizationMembers = async () => {
  const response = await route.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { members } = await response.json();
  return members;
};
