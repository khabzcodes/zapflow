import { db } from '@/db';
import { eq } from 'drizzle-orm';

export const getMembersByOrganizationId = async (organizationId: string) => {
  return await db.query.member.findMany({
    where: (member) => eq(member.organizationId, organizationId),
    with: {
      user: true,
      organization: true,
    },
  });
};
