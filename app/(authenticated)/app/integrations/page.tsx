import { ConnectionCard, IntegrationsHeader } from '@/components/integrations';
import { connections } from '@/config/connections';

const IntegrationsPage = () => {
  return (
    <div>
      <IntegrationsHeader />
      <div className="space-y-2">
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
