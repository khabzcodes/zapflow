import { workflow } from '@/db/schemas/workflow';

export type Workflow = typeof workflow.$inferSelect;
