'use client';

import { ConnectionCard, IntegrationsHeader } from '@/components/integrations';
import { connections } from '@/config/connections';
import { getIntegrations } from '@/rpc/integrations';
import { QUERY_KEYS } from '@/rpc/keys';
import { useQuery } from '@tanstack/react-query';

const IntegrationsPage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_ORGANIZATION_INTEGRATIONS],
    queryFn: async () => await getIntegrations(),
  });

  if (!isPending && error && !data) {
    return;
  }

  return (
    <div>
      <IntegrationsHeader />
      <div className="space-y-2">
        {connections.map((connection) => (
          <ConnectionCard
            key={connection.name}
            connection={connection}
            connected={
              data?.some(
                (integration) => integration.appName === connection.name,
              ) ?? false
            }
          />
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;
