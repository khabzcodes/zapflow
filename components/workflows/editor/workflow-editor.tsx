import { Workflow } from '@/types/workflow';
import '@xyflow/react/dist/style.css';
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { createFlowNode } from '@/lib/workflows/create-flow-node';
import { TaskType } from '@/enums/task-type';
import CustomNode from '@/components/nodes/custom-node.tsx';
import React from 'react';
import { CustomControls } from './controls/custom-controls';

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
    createFlowNode(TaskType.SEND_GMAIL_EMAIL),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  console.log(setNodes);
  console.log(setEdges);

  const onDragOver = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData('application/reactflow');
      if (typeof taskType === undefined || !taskType) return;

      const position = { x: event.clientX, y: event.clientY };

      const newNode = createFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes],
  );

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
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        proOptions={{ hideAttribution: true }}>
        <CustomControls />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </main>
  );
};
