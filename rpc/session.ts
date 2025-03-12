import { baseApiRoute } from './config';

const route = baseApiRoute.session;

export async function getSession() {
  const response = await route.$get();
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
}
