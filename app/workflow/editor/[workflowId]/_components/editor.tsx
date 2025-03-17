import { Workflow } from '@/types/workflow';
import { ReactFlowProvider } from '@xyflow/react';
import { WorkflowEditor } from '@/components/workflows/editor/workflow-editor';
import { TopNav } from './top-nav';
import { TaskMenu } from '@/components/workflows/task-menu';

type EditorProps = {
  workflow: Workflow;
};

export const Editor = ({ workflow }: EditorProps) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <TopNav
          workflowId={workflow.id}
          title={workflow.name}
          description={workflow.description || ''}
        />
        <section className="flex h-full overflow-auto">
          <TaskMenu />
          <WorkflowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};
