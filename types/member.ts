import { Organization } from './organization';
import { User } from './user';
import { member } from '@/db/schemas/auth-schema';

export type Member = typeof member.$inferSelect;

export type MemberWithUserAndOrganization = Member & {
  user: User;
  organization: Organization;
};
