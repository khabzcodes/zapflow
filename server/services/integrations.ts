import { db } from '@/db';
import { integration } from '@/db/schemas/integration';
import { nanoid } from 'nanoid';

export const createIntegration = async (
  organizationId: string,
  memberId: string,
  appName: string,
  credentials: string,
) => {
  const results = await db
    .insert(integration)
    .values({
      id: nanoid(),
      organizationId,
      appName,
      credentials,
      status: 'connected',
      createdById: memberId,
      updatedById: memberId,
    })
    .returning();

  return results[0];
};
