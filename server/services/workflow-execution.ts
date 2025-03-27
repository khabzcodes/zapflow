import { db } from '@/db';
import { workflow } from '@/db/schemas/workflow';
import { workflowExecution } from '@/db/schemas/workflow-execution';
import { workflowExecutionPhase } from '@/db/schemas/workflow-execution-phase';
import { ExecutorRegistry } from '@/server/services/executors/registry';
import { TaskRegistry } from '@/lib/workflows/task/registry';
import { AppNode } from '@/types/app-node';
import { WorkflowExecutionPlan } from '@/types/workflow';
import { IWorkflowExecutionWithPhase } from '@/types/workflow-execution';
import { IWorkflowExecutionPhase } from '@/types/workflow-execution-phase';
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
      workflow: true,
      phases: true,
    },
  });
};

export const executeWorkflow = async (executionId: string) => {
  const execution = await getExecutionById(executionId);
  if (!execution) {
    throw new Error('Execution not found');
  }

  await initializeWorkflowExecution(executionId, execution.workflowId);
  await initializeExecutionPhases(execution as IWorkflowExecutionWithPhase);

  const executionFailed = false;
  for (const phase of execution.phases) {
    await executeWorkflowPhase(phase as IWorkflowExecutionPhase);
  }

  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
  );
};

export const initializeWorkflowExecution = async (
  executionId: string,
  workflowId: string,
) => {
  await db
    .update(workflowExecution)
    .set({ status: 'running', startedAt: new Date() })
    .where(eq(workflowExecution.id, executionId));

  await db
    .update(workflow)
    .set({
      lastRunAt: new Date(),
      lastRunStatus: 'running',
      lastRunId: executionId,
    })
    .where(eq(workflow.id, workflowId));
};

export const initializeExecutionPhases = async (
  execution: IWorkflowExecutionWithPhase,
) => {
  for (const phase of execution.phases) {
    await db
      .update(workflowExecutionPhase)
      .set({
        status: 'pending',
      })
      .where(eq(workflowExecutionPhase.id, phase.id));
  }
};

export const finalizeWorkflowExecution = async (
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
) => {
  await db
    .update(workflowExecution)
    .set({
      status: executionFailed ? 'failed' : 'completed',
      completedAt: new Date(),
    })
    .where(eq(workflowExecution.id, executionId));
  await db
    .update(workflow)
    .set({
      lastRunStatus: executionFailed ? 'failed' : 'completed',
    })
    .where(eq(workflow.id, workflowId) && eq(workflow.lastRunId, executionId));
};

export const executeWorkflowPhase = async (phase: IWorkflowExecutionPhase) => {
  const startedAt = new Date();

  await db
    .update(workflowExecutionPhase)
    .set({
      status: 'running',
      startedAt,
    })
    .where(eq(workflowExecutionPhase.id, phase.id));

  const success = executePhase(phase, phase.node);

  await finalizeWorkflowPhase(phase.id, false);

  return { success };
};

export const finalizeWorkflowPhase = async (
  phaseId: string,
  failed: boolean,
) => {
  await db
    .update(workflowExecutionPhase)
    .set({
      status: failed ? 'failed' : 'completed',
      completedAt: new Date(),
    })
    .where(eq(workflowExecutionPhase.id, phaseId));
};

export const executePhase = async (
  phase: IWorkflowExecutionPhase,
  node: AppNode,
) => {
  const runFn = ExecutorRegistry[node.data.type];
  if (!runFn) {
    return false;
  }

  return await runFn();
};
