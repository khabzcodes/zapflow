import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import { Icons } from '@/components/ui/icons';

type IntegrationDetailsHeaderProps = {
  displayName: string;
  name: string;
  icon: string;
  connected: boolean;
};

export const IntegrationDetailsHeader = ({
  displayName,
  name,
  icon,
  connected,
}: IntegrationDetailsHeaderProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = useCallback(() => {
    setIsConnecting(true);
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      `/api/server/connections/connect/${name}`,
      `Connect ${displayName}`,
      `width=${width},height=${height},left=${left},top=${top},popup=1`,
    );

    // Optional: Handle popup closing
    const timer = setInterval(() => {
      if (popup?.closed) {
        clearInterval(timer);
        // Refresh the page or update the connection status
        window.location.reload();
      }
    }, 500);
  }, [name, displayName]);
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Image
          src={icon || '/placeholder.svg'}
          alt={name}
          width={48}
          height={48}
          className="object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold">{displayName}</h1>
          <Badge
            variant="outline"
            className="text-muted-foreground">
            {!connected ? 'Not Connected' : 'Connected'}
          </Badge>
        </div>
      </div>
      {connected ? (
        <Button>Disconnect</Button>
      ) : (
        <Button
          className="cursor-pointer"
          onClick={handleConnect}
          variant="default"
          disabled={isConnecting}>
          Connect
          {isConnecting && (
            <Icons.spinner className="animate-spin h-4 w-4 ml-2" />
          )}
        </Button>
      )}
    </div>
  );
};
