import { WorkflowCanvas } from '@/components/workflows';
import type { Node, Edge } from '@xyflow/react';

const CreateWorkflowPage = () => {
  const initialNodes: Node[] = [
    {
      id: 'trigger-1',
      type: 'trigger',
      position: { x: 100, y: 100 },
      data: {
        label: 'Trigger',
        description: 'Triggers when webhook is called',
        id: 'trigger-1',
      },
    },
    {
      id: 'action-1',
      type: 'action',
      position: { x: 400, y: 100 },
      data: {
        label: 'Send Email',
        description: 'Sends an email notification',
        triggered: false,
      },
    },
    {
      id: 'action-2',
      type: 'action',
      position: { x: 600, y: 600 },
      data: {
        label: 'Send Email',
        description: 'Sends an email notification',
        triggered: false,
      },
    },
  ];

  const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

  return (
    <WorkflowCanvas
      initialNodes={initialNodes}
      initialEdges={initialEdges}
    />
  );
};

export default CreateWorkflowPage;
