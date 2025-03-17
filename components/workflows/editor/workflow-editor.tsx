import { Workflow } from '@/types/workflow';
import '@xyflow/react/dist/style.css';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { createFlowNode } from '@/lib/workflows/create-flow-node';
import { TaskType } from '@/enums/task-type';
import CustomNode from '@/components/nodes/custom-node.tsx';
import React from 'react';
import { CustomControls } from './controls/custom-controls';
import { DeletableEdge } from '@/components/edges/deletable-edge';
import { AppNode } from '@/types/app-node';

type WorkflowEditorProps = {
  workflow: Workflow;
};

const nodeTypes = {
  ZapflowNode: CustomNode,
};

const edgeTypes = {
  default: DeletableEdge,
};

const snapGrid: [number, number] = [16, 16];
const fitViewOptions = { padding: 2 };

export const WorkflowEditor = ({ workflow }: WorkflowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport } = useReactFlow();

  React.useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodes = workflow.nodes as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const edges = workflow.edges as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const viewPort = workflow.viewPort as any;
      if (nodes) setNodes(nodes);
      if (edges) setEdges(edges);
      if (viewPort) setViewport(viewPort);
    } catch (error) {
      console.log(error);
    }
  }, [
    setEdges,
    setNodes,
    setViewport,
    workflow.edges,
    workflow.nodes,
    workflow.viewPort,
  ]);

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

  const onConnect = React.useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges],
  );

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        proOptions={{ hideAttribution: true }}>
        <CustomControls />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </main>
  );
};
