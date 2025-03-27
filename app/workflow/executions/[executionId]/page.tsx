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
import { getWorkflowExecutionPhase } from '@/rpc/workflow-execution-phases';

const ExecutionPage = ({
  params,
}: {
  params: Promise<{ executionId: string }>;
}) => {
  const [selectedPhaseId, setSelectedPhaseId] = React.useState<string | null>(
    null,
  );

  const { executionId } = React.use(params);
  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEYS.GET_WORKFLOW_EXECUTION_BY_ID, executionId],
    queryFn: async () => await getWorkflowExecution(executionId),
    refetchInterval: (query) =>
      query.state.data?.status === 'running' ? 1000 : false,
  });
  const { data: phaseDetails } = useQuery({
    queryKey: [QUERY_KEYS.GET_WORKFLOW_EXECUTION_PHASE_BY_ID, selectedPhaseId],
    enabled: !!selectedPhaseId,
    queryFn: () => getWorkflowExecutionPhase(selectedPhaseId!),
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
                startedAt: data.startedAt ? new Date(data.startedAt) : null,
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
                workflow: {
                  ...data.workflow,
                  createdAt: data.workflow.createdAt
                    ? new Date(data.workflow.createdAt)
                    : null,
                  updatedAt: data.workflow.updatedAt
                    ? new Date(data.workflow.updatedAt)
                    : null,
                  lastRunAt: data.workflow.lastRunAt
                    ? new Date(data.workflow.lastRunAt)
                    : null,
                },
              }}
              onSelectPhase={(phaseId) => setSelectedPhaseId(phaseId)}
            />
            <pre>{JSON.stringify(phaseDetails, null, 4)}</pre>
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};

export default ExecutionPage;
