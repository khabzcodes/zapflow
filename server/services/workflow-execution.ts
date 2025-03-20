import { db } from '@/db';
import { workflowExecution } from '@/db/schemas/workflow-execution';
import { nanoid } from 'nanoid';

export const createExecution = async (
  workflowId: string,
  organizationId: string,
) => {
  const results = await db
    .insert(workflowExecution)
    .values({
      id: nanoid(),
      workflowId,
      organizationId,
      trigger: 'manual',
      status: 'pending',
    })
    .returning();

  return results[0];
};
