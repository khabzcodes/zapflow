import { Workflow } from '@/types/workflow';
import '@xyflow/react/dist/style.css';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { createFlowNode } from '@/lib/workflows/create-flow-node';
import { TaskType } from '@/enums/task-type';
import React from 'react';
import { CustomControls } from './controls/custom-controls';
import { DeletableEdge } from '@/components/edges/deletable-edge';
import { AppNode } from '@/types/app-node';
import { nodeTypes } from '@/config/node-type-mapper';
import { TaskRegistry } from '@/lib/workflows/task/registry';
import { toast } from 'sonner';

type WorkflowEditorProps = {
  workflow: Workflow;
};

const edgeTypes = {
  default: DeletableEdge,
};

const snapGrid: [number, number] = [16, 16];
const fitViewOptions = { padding: 2 };

export const WorkflowEditor = ({ workflow }: WorkflowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, updateNodeData } = useReactFlow();

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
      if (!connection.targetHandle) return;

      const node = nodes.find((nd) => nd.id === connection.target);
      if (!node) return;

      const nodeInputs = node.data.inputs;
      delete nodeInputs[connection.targetHandle];
      updateNodeData(node.id, { inputs: nodeInputs });
    },
    [nodes, setEdges, updateNodeData],
  );

  const onNodesDelete = React.useCallback(
    (deleted: AppNode[]) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge),
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            })),
          );

          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [setEdges, edges, nodes],
  );

  const isValidConnection = React.useCallback(
    (connection: Edge | Connection) => {
      if (connection.sourceHandle === connection.target) {
        toast.error('Cannot connect a node to itself');
        return false;
      }

      const source = nodes.find((nd) => nd.id === connection.source);
      const target = nodes.find((nd) => nd.id === connection.target);
      if (!source || !target) {
        toast.error('Invalid connection');
        return false;
      }

      const sourceType = source?.data?.type as keyof typeof TaskRegistry;
      const targetType = target?.data?.type as keyof typeof TaskRegistry;

      const sourceTask = TaskRegistry[sourceType];
      const targetTask = TaskRegistry[targetType];

      const output = sourceTask.outputs.find(
        (o) => o.name === connection.sourceHandle,
      );
      const input = targetTask.inputs.find(
        (i) => i.name === connection.targetHandle,
      );
      if (input?.type !== output?.type) {
        toast.error('Invalid connection');
        return false;
      }

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) {
          toast.error('Cycle detected');
          return false;
        }
        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) {
            return true;
          }
          if (hasCycle(outgoer, visited)) {
            return true;
          }
        }
      };

      const detectedCycle = hasCycle(target);
      return !detectedCycle;
    },
    [edges, nodes],
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
        onNodesDelete={onNodesDelete}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        proOptions={{ hideAttribution: true }}>
        <CustomControls />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </main>
  );
};
