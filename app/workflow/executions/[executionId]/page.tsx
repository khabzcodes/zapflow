'use client';
import { FullPageLoader } from '@/components/shared/full-page-loader';
import { QUERY_KEYS } from '@/rpc/keys';
import { getWorkflowExecution } from '@/rpc/workflow-executions';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { TopNav } from '../../editor/[workflowId]/_components/top-nav';
import { FlowValidationContextProvider } from '@/context/flow-validation-context';
import { ReactFlowProvider } from '@xyflow/react';
import { ExecutionTaskMenu } from './_components/task-menu';

const ExecutionPage = ({
  params,
}: {
  params: Promise<{ executionId: string }>;
}) => {
  const { executionId } = React.use(params);
  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_WORKFLOW_EXECUTION_BY_ID, { executionId }],
    queryFn: async () => await getWorkflowExecution(executionId),
  });

  if (isPending) {
    return <FullPageLoader />;
  }

  if (!isPending && error && !data) {
    return <div>Error: {error.message}</div>;
  }

  // if (data.status === 'pending') {
  //   console.log('Execute');
  // }
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <TopNav
            workflowId={data.workflowId}
            title={data.id}
            description={data.status}
            hideButtons={true}
          />
          <section className="flex h-full overflow-auto">
            <ExecutionTaskMenu
              execution={{
                ...data,
                createdAt: data.createdAt ? new Date(data.createdAt) : null,
                completedAt: data.completedAt
                  ? new Date(data.completedAt)
                  : null,
                phases: data.phases.map((phase) => ({
                  ...phase,
                  completedAt: phase.completedAt
                    ? new Date(phase.completedAt)
                    : null,
                  startedAt: new Date(phase.startedAt),
                })),
              }}
            />
            <div>{JSON.stringify(data, null, 2)}</div>
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};

export default ExecutionPage;
