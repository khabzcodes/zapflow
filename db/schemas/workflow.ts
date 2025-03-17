import { jsonb, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { member, organization } from './auth-schema';

export const workflowStatusEnum = pgEnum('workflow_status', [
  'draft',
  'active',
  'inactive',
]);

export const workflow = pgTable('workflows', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description').default(''),
  status: workflowStatusEnum('status').notNull().default('draft'),
  nodes: jsonb('nodes').notNull().default([]),
  edges: jsonb('edges').notNull().default([]),
  viewPort: jsonb('view_port').notNull().default({}),
  createdById: text('created_by_id')
    .notNull()
    .references(() => member.id),
  updatedById: text('updated_by_id')
    .notNull()
    .references(() => member.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
