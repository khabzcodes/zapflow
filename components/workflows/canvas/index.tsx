'use client';
import {
  ReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type OnEdgesChange,
  type OnNodesChange,
  type Node,
  type Edge,
  type OnConnect,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ControlPanel } from './control-panel';
import { CustomControls } from './controls/custom-control';
import React from 'react';
import { TriggerNode } from '@/components/nodes/trigger';
import { ActionNode } from '@/components/nodes/action';

export type WorkflowCanvasProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

export const WorkflowCanvas = ({
  initialNodes,
  initialEdges,
}: WorkflowCanvasProps) => {
  const [nodes, setNodes] = React.useState<Node[]>(initialNodes);
  const [edges, setEdges] = React.useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = React.useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = React.useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = React.useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  // Handle trigger action
  const handleTrigger = React.useCallback(
    (triggerId: string) => {
      const connectedEdges = edges.filter((edge) => edge.source === triggerId);
      const targetNodeIds = connectedEdges.map((edge) => edge.target);

      setNodes((nds) =>
        nds.map((node) => {
          if (targetNodeIds.includes(node.id) && node.type === 'action') {
            const now = new Date().toLocaleTimeString();
            return {
              ...node,
              data: {
                ...node.data,
                triggered: true,
                triggeredAt: now,
              },
            };
          }
          return node;
        }),
      );
    },
    [edges, setNodes],
  );
  // Update nodes with trigger handler
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === 'trigger') {
          return {
            ...node,
            data: {
              ...node.data,
              onTrigger: handleTrigger,
            },
          };
        }
        return node;
      }),
    );
  }, [handleTrigger, setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      proOptions={{ hideAttribution: true }}
      fitView>
      <Background gap={16} />
      <CustomControls />
      <ControlPanel />
    </ReactFlow>
  );
};
