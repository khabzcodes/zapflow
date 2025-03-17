import { db } from '@/db';
import { workflow as workflows } from '@/db/schemas/workflow';
import { CreateWorkflowInputData } from '@/validations/workflows';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const getWorkflowsByOrganizationId = async (organizationId: string) => {
  return await db.query.workflow.findMany({
    where: (workflow) => eq(workflow.organizationId, organizationId),
  });
};

export const getWorkflowById = async (workflowId: string) => {
  return await db.query.workflow.findFirst({
    where: (workflow) => eq(workflow.id, workflowId),
  });
};

export const createWorkflow = async (
  organizationId: string,
  memberId: string,
  data: CreateWorkflowInputData,
) => {
  const results = await db
    .insert(workflows)
    .values({
      id: nanoid(),
      createdById: memberId,
      updatedById: memberId,
      organizationId,
      name: data.name,
      description: data.description,
    })
    .returning();

  return results[0];
};

export const updateWorkflow = async (
  workflowId: string,
  nodes: string,
  edges: string,
  viewPort: string,
  memberId: string,
) => {
  const results = await db
    .update(workflows)
    .set({
      nodes: JSON.parse(nodes),
      edges: JSON.parse(edges),
      viewPort: JSON.parse(viewPort),
      updatedById: memberId,
      updatedAt: new Date(),
    })
    .where(eq(workflows.id, workflowId))
    .returning();

  return results[0];
};
