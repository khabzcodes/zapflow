'use client';
import { FullPageLoader } from '@/components/shared/full-page-loader';
import { Editor } from '@/app/workflow/editor/[workflowId]/_components/editor';
import { QUERY_KEYS } from '@/rpc/keys';
import { getOrganizationWorkFlow } from '@/rpc/workflows';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

export default function EditorPage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const { workflowId } = React.use(params);

  const {
    data: workflow,
    isPending,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_ORGANIZATION_WORKFLOW_BY_ID, { workflowId }],
    queryFn: async () => await getOrganizationWorkFlow(workflowId),
  });

  if (isPending) {
    return <FullPageLoader />;
  }

  if (!isPending && error && !workflow) {
    return toast.error(error.message);
  }

  console.log(workflow);

  return (
    <Editor
      workflow={{
        ...workflow,
        createdAt: workflow?.createdAt ? new Date(workflow.createdAt) : null,
        updatedAt: workflow?.updatedAt ? new Date(workflow.updatedAt) : null,
      }}
    />
  );
}
