import { user } from '@/db/schemas/auth-schema';

export type User = typeof user.$inferSelect;
