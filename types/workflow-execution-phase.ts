import { AppNode } from '@/types/app-node'; // Add this import

export type IWorkflowExecutionPhase = {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'created';
  completedAt: Date | null;
  workflowExecutionId: string;
  phaseNumber: string;
  node: AppNode;
  startedAt: Date;
  inputs: unknown;
  outputs: unknown;
};
