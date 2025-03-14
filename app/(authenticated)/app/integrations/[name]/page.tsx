'use client';
import { IntegrationDetailsHeader } from '@/components/integrations';
import { Icons } from '@/components/ui/icons';
import { connections } from '@/config/connections';
import { getIntegration } from '@/rpc/integrations';
import { QUERY_KEYS } from '@/rpc/keys';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Loader = () => {
  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl h-[calc(100vh-4rem)] flex items-center justify-center">
      <Icons.spinner className="animate-spin h-6 w-6" />
    </div>
  );
};

const IntegrationPage = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = React.use(params);
  const connection = connections.find((c) => c.name === name);

  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_INTEGRATION, { name }],
    queryFn: async () => await getIntegration(name),
  });

  if (!isPending && error) {
    return;
  }
  return (
    <div className="">
      {isPending ? (
        <Loader />
      ) : (
        <IntegrationDetailsHeader
          displayName={connection?.displayName ?? ''}
          name={connection?.name ?? ''}
          icon={connection?.icon ?? ''}
          connected={data ? true : false}
        />
      )}
    </div>
  );
};

export default IntegrationPage;
