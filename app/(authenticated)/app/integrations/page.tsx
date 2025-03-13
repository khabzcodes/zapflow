import { ConnectionCard, IntegrationsHeader } from '@/components/integrations';
import { connections } from '@/config/connections';

const IntegrationsPage = () => {
  return (
    <div>
      <IntegrationsHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {connections.map((connection) => (
          <ConnectionCard
            key={connection.name}
            connection={connection}
            connected={false}
          />
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;
