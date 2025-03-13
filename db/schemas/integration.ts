import { pgTable, text, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { member, organization } from './auth-schema';

export const integration = pgTable('integrations', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  appName: text('app_name').notNull(),
  credentials: jsonb('credentials').notNull().default({}), // Encrypted sensitive data
  settings: jsonb('settings').default({}), // User-specific settings
  status: text('status').notNull().default('disconnected'), // 'connected', 'disconnected', 'error'
  createdById: text('created_by_id')
    .notNull()
    .references(() => member.id),
  updatedById: text('updated_by_id')
    .notNull()
    .references(() => member.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
