import { workflowExecution } from '@/db/schemas/workflow-execution';
import { IWorkflowExecutionPhase } from './workflow-execution-phase';

export type IWorkflowExecution = typeof workflowExecution.$inferSelect;

export interface IWorkflowExecutionWithPhase extends IWorkflowExecution {
  phases: IWorkflowExecutionPhase[];
}
