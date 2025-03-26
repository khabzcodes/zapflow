import { db } from '@/db';
import { workflowExecution } from '@/db/schemas/workflow-execution';
import { workflowExecutionPhase } from '@/db/schemas/workflow-execution-phase';
import { TaskRegistry } from '@/lib/workflows/task/registry';
import { WorkflowExecutionPlan } from '@/types/workflow';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const createExecution = async (
  workflowId: string,
  organizationId: string,
  executionPlan: WorkflowExecutionPlan,
) => {
  const executionId = nanoid();
  return await db.transaction(async (tx) => {
    const [execution] = await tx
      .insert(workflowExecution)
      .values({
        id: executionId,
        workflowId,
        organizationId,
        trigger: 'manual',
        status: 'pending',
      })
      .returning();

    executionPlan.flatMap(async (phase) => {
      phase.nodes.flatMap(async (node) => {
        await tx.insert(workflowExecutionPhase).values({
          id: nanoid(),
          workflowExecutionId: execution.id,
          status: 'created',
          phaseNumber: phase.phase.toString(),
          node,
          inputs: node,
          name: TaskRegistry[node.data.type].label,
        });
      });
    });

    return execution;
  });
};

export const getExecutionById = async (id: string) => {
  return await db.query.workflowExecution.findFirst({
    where: (execution) => eq(execution.id, id),
    with: {
      phases: true,
    },
  });
};
