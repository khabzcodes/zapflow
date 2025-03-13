'use client';
import { Connection } from '@/types/connection';
import Image from 'next/image';
import { Icons } from '../ui/icons';

type ConnectionCardProps = {
  connection: Connection;
  connected: boolean;
};

export const ConnectionCard = ({
  connection,
  connected,
}: ConnectionCardProps) => {
  const handleConnect = () => {
    window.location.href = `/api/server/connections/connect/${connection.name}`;
  };

  return (
    <div className="border rounded-md p-4 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 flex items-center justify-center">
          <Image
            src={connection.icon}
            alt={connection.displayName}
            width={40}
            height={40}
          />
        </div>
        {connected ? (
          <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md">
            Connected
          </span>
        ) : (
          <Icons.plusSquare
            onClick={handleConnect}
            className="cursor-pointer hover:text-green-800"
          />
        )}
      </div>
      <h3 className="font-medium mb-1">{connection.displayName}</h3>
      <p className="text-sm text-gray-500 mb-4">{connection.description}</p>
    </div>
  );
};
