'use client';
import { useQuery } from '@tanstack/react-query';
import { WorkflowsHeader } from './_components/header';
import { QUERY_KEYS } from '@/rpc/keys';
import { getOrganizationWorkflows } from '@/rpc/workflows';
import { FullPageLoader } from '@/components/shared/full-page-loader';
import { EmptyPlaceholder } from '@/components/shared/empty-placeholder';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { CreateWorkflowDialog } from '@/components/workflows';
import React from 'react';

const WorkflowsPage = () => {
  const [isOpenCreateWorkflow, setOpenCreateWorkflow] =
    React.useState<boolean>(false);

  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_ORGANIZATION_WORKFLOWS],
    queryFn: async () => await getOrganizationWorkflows(),
  });

  if (isPending) {
    return <FullPageLoader />;
  }

  if (!isPending && error && !data) {
    return;
  }
  return (
    <div className="space-y-2">
      <WorkflowsHeader
        isOpen={isOpenCreateWorkflow}
        setIsOpen={setOpenCreateWorkflow}
      />
      {data.length ? (
        <div className="flex flex-col gap-2">
          {data.map((workflow) => (
            <a
              key={workflow.id}
              href={`/workflow/editor/${workflow.id}`}>
              {workflow.name}
            </a>
          ))}
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="nodeMoveUp" />
          <EmptyPlaceholder.Title>No workflows.</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any workflows yet. Create a new workflow to get
            started.
          </EmptyPlaceholder.Description>
          <Button onClick={() => setOpenCreateWorkflow(!isOpenCreateWorkflow)}>
            <Icons.plusSquare />
            Create your first automation workflow
          </Button>
        </EmptyPlaceholder>
      )}
      <CreateWorkflowDialog
        isOpen={isOpenCreateWorkflow}
        setIsOpen={setOpenCreateWorkflow}
      />
    </div>
  );
};

export default WorkflowsPage;
