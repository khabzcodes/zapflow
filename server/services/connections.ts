import { db } from '@/db';
import { connection } from '@/db/schemas/connection';
import { ConnectionInput } from '@/types/connection';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const getConnectionsByOrganizationId = async (
  organizationId: string,
) => {
  return await db.query.connection.findMany({
    where: (connection) => eq(connection.organizationId, organizationId),
  });
};

export const createOrganizationConnection = async (
  organizationId: string,
  provider: string,
  memberId: string,
  connectionName: string,
  settings: ConnectionInput[],
) => {
  const results = await db
    .insert(connection)
    .values({
      id: nanoid(),
      organizationId,
      name: connectionName,
      provider,
      settings,
      createdById: memberId,
    })
    .returning();

  console.log(results);

  return results[0];
};
