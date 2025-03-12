import { db } from '@/db';
import { eq } from 'drizzle-orm';

export const getOrganizationById = async (id: string) => {
  return await db.query.organization.findFirst({
    where: (organization) => eq(organization.id, id),
  });
};
