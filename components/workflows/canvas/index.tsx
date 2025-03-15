'use client';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ControlPanel } from './control-panel';

export const WorkflowCanvas = () => {
  return (
    <ReactFlow fitView>
      <Background />
      <Controls />
      <ControlPanel />
    </ReactFlow>
  );
};
