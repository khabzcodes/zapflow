import { db } from '@/db';
import { workflowExecutionPhase } from '@/db/schemas/workflow-execution-phase';
import { TaskRegistry } from '@/lib/workflows/task/registry';
import { AppNode } from '@/types/app-node';
import { nanoid } from 'nanoid';

export const createExecutionPhases = async (
  executionId: string,
  phase: string,
  node: AppNode,
) => {
  const results = await db
    .insert(workflowExecutionPhase)
    .values({
      id: nanoid(),
      workflowExecutionId: executionId,
      status: 'created',
      phaseNumber: phase,
      node,
      inputs: node,
      name: TaskRegistry[node.data.type].label,
    })
    .returning();

  return results[0];
};
