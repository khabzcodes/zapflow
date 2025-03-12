import { organization } from '@/db/schemas/auth-schema';

export type Organization = typeof organization.$inferSelect;
