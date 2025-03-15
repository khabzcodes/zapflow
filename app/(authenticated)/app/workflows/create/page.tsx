import { WorkflowCanvas } from '@/components/workflows';
import type { Node, Edge } from '@xyflow/react';

const CreateWorkflowPage = () => {
  const initialNodes: Node[] = [];

  const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

  return (
    <WorkflowCanvas
      initialNodes={initialNodes}
      initialEdges={initialEdges}
    />
  );
};

export default CreateWorkflowPage;
