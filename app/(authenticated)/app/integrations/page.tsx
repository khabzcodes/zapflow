'use client';

import { ConnectionCard, IntegrationsHeader } from '@/components/integrations';
import { Icons } from '@/components/ui/icons';
import { connections } from '@/config/connections';
import { getIntegrations } from '@/rpc/integrations';
import { QUERY_KEYS } from '@/rpc/keys';
import { useQuery } from '@tanstack/react-query';

const Loader = () => {
  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl flex items-center justify-center">
      <Icons.spinner className="animate-spin h-6 w-6" />
    </div>
  );
};

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
      {isPending ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default IntegrationsPage;
