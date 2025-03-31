import { ConnectionInput } from '@/types/connection';
import { baseApiRoute } from './config';

const route = baseApiRoute.connections;

export const createOrganizationConnection = async (
  provider: string,
  connectionName: string,
  inputs: ConnectionInput[],
) => {
  const response = await route.credentials[':provider'].$post({
    param: { provider },
    json: {
      credentials: inputs,
      configName: connectionName,
    },
  });

  const data = await response.json();
  return data;
};
