import { db } from '@/db';
import { waitList } from '@/db/schemas/wait-list';
import { WaitingListFormData } from '@/validations/waiting-list';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const getWaitlistRecordByEmail = async (email: string) => {
  return await db.query.waitList.findFirst({
    where: (waitList) => eq(waitList.email, email),
  });
};

export const createWaitlistRecord = async (data: WaitingListFormData) => {
  const results = await db
    .insert(waitList)
    .values({
      id: nanoid(),
      email: data.email.toLowerCase(),
      name: data.name,
      organization: data.organization,
      heardAboutUs: data.heardFromUs,
    })
    .returning();

  return results[0];
};
