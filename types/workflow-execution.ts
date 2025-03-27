import { workflowExecution } from '@/db/schemas/workflow-execution';
import { IWorkflowExecutionPhase } from './workflow-execution-phase';
import { Workflow } from './workflow';

export type IWorkflowExecution = typeof workflowExecution.$inferSelect;

export interface IWorkflowExecutionWithPhase extends IWorkflowExecution {
  phases: IWorkflowExecutionPhase[];
  workflow: Workflow;
}
