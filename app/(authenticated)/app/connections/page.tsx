'use client';
import { ConnectionList } from '@/components/connectons';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ConnectionsPage = () => {
  return (
    <div>
      <PageHeader
        title="Connections"
        description="Access a centralized connection of third-party services to simplify your automation workflows.">
        <Button size="sm">
          <Icons.plusSquare />
          Create new connection
        </Button>
      </PageHeader>
      <Tabs defaultValue="connected">
        <TabsList className="w-full">
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="browse">Browse</TabsTrigger>
        </TabsList>
        <TabsContent value="connected">Connected</TabsContent>
        <TabsContent value="browse">
          <ConnectionList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectionsPage;
