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
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ControlPanel } from './control-panel';
import { CustomControls } from './controls/custom-control';
import React from 'react';
import { TriggerNode } from '@/components/nodes/trigger';
import { ActionNode } from '@/components/nodes/action';
import { Module } from '@/types/module';
import { nanoid } from 'nanoid';

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
    (connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: 'smoothstep',
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const findFreePosition = (
    nodes: Node[],
    startX = 400,
    startY = 100,
    gridSize = 200,
  ) => {
    const isPositionOccupied = (x: number, y: number) => {
      return nodes.some(
        (node) =>
          Math.abs(node.position.x - x) < gridSize &&
          Math.abs(node.position.y - y) < gridSize,
      );
    };

    let x = startX;
    let y = startY;
    let attempts = 0;
    const maxAttempts = 100;

    while (isPositionOccupied(x, y) && attempts < maxAttempts) {
      if (attempts % 4 === 0) {
        y += gridSize;
        x = startX;
      } else {
        x += gridSize;
      }
      attempts++;
    }

    return { x, y };
  };

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

  const handleAddModule = React.useCallback(
    (module: Module) => {
      const id = nanoid();
      const newNode: Node = {
        id,
        type: module.type,
        // Find free position
        position: findFreePosition(nodes),
        data: {
          id,
          label: module.label,
          description: module.description,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes],
  );
  // Update nodes with trigger handler
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        console.log(node);
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
      defaultEdges={initialEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionMode={ConnectionMode.Loose}
      proOptions={{ hideAttribution: true }}
      fitView>
      <Background gap={16} />
      <CustomControls />
      <ControlPanel onAddModule={handleAddModule} />
    </ReactFlow>
  );
};
