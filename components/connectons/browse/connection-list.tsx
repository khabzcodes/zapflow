import { connectionConfig } from '@/config/connecton-config';
import { ConnectionCard } from './connection-card';

export const ConnectionList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {connectionConfig.map((connection, idx) => (
        <ConnectionCard
          key={idx}
          connection={connection}
        />
      ))}
    </div>
  );
};
