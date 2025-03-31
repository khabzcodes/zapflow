import { Badge } from '@/components/ui/badge';
import { Connection } from '@/types/connection';
import React from 'react';
import { useRouter } from 'next/navigation';

type ConnectionCardProps = {
  connection: Connection;
};

export const ConnectionCard = ({ connection }: ConnectionCardProps) => {
  const router = useRouter();
  return (
    <div
      className="border p-4 items-start md:items-center hover:border-white transition-colors duration-200 cursor-pointer"
      onClick={() => router.push(`/app/connections/${connection.name}`)}>
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="w-8 h-8 bg-secondary rounded-sm flex items-center justify-center p-2 mr-1">
          <connection.icon />
        </div>
        <div>
          <h3>{connection.displayName}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {connection.description}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {connection.categories.map((category) => (
          <Badge
            key={`${connection.name}-${category}`}
            variant="secondary"
            className="rounded-sm text-xs">
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};
