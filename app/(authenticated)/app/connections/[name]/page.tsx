'use client';
import { CredentialsDialog } from '@/components/connectons/connect/credentials-dialog';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { connectionConfig } from '@/config/connecton-config';
import React from 'react';

const ConnectionPage = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = React.use(params);
  const [openCredentialsModal, setOpenCredentialsModal] =
    React.useState<boolean>(false);
  const connection = connectionConfig.find(
    (connection) => connection.name === name,
  );
  if (!connection) {
    return <div>Connection not found</div>;
  }

  const handleConnect = () => {
    if (connection.type === 'credentials') {
      setOpenCredentialsModal(true);
      return;
    }
    // TODO: Implement OAuth2 flow
  };
  return (
    <div>
      <PageHeader
        title={connection.displayName}
        description={connection.description}>
        <Button
          size="sm"
          onClick={handleConnect}>
          <Icons.plusSquare />
          Connect
        </Button>
      </PageHeader>
      <CredentialsDialog
        connection={connection}
        isOpen={openCredentialsModal}
        setIsOpen={setOpenCredentialsModal}
      />
    </div>
  );
};

export default ConnectionPage;
