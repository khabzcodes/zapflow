import { Workflow } from '@/types/workflow';
import '@xyflow/react/dist/style.css';
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { createFlowNode } from '@/lib/workflows/create-flow-node';
import { TaskType } from '@/enums/task-type';
import CustomNode from '@/components/nodes/custom-node.tsx';

type WorkflowEditorProps = {
  workflow: Workflow;
};

const nodeTypes = {
  ZapflowNode: CustomNode,
};

const snapGrid: [number, number] = [16, 16];
const fitViewOptions = { padding: 2 };

export const WorkflowEditor = ({ workflow }: WorkflowEditorProps) => {
  console.log('workflow', workflow);
  const [nodes, setNodes, onNodesChange] = useNodesState([
    createFlowNode(TaskType.GMAIL_TRIGGER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  console.log(setNodes);
  console.log(setEdges);
  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView>
        <Controls
          position="top-left"
          fitViewOptions={fitViewOptions}
        />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </main>
  );
};
