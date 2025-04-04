import { jsonb, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { member, organization } from './auth-schema';
import { relations } from 'drizzle-orm';

export const statusEnum = pgEnum('connection_status', [
  'connected',
  'disconnected',
]);

export const connection = pgTable('connections', {
  id: text('id').notNull().primaryKey(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  provider: text('provider').notNull(),
  settings: jsonb('settings').default({}),
  status: statusEnum('status').notNull().default('connected'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  createdById: text('created_by_id')
    .notNull()
    .references(() => member.id),
  updatedById: text('updated_by_id').references(() => member.id),
});

export const connectionRelations = relations(connection, ({ one }) => ({
  organization: one(organization, {
    fields: [connection.organizationId],
    references: [organization.id],
  }),
  createdBy: one(member, {
    fields: [connection.createdById],
    references: [member.id],
  }),
  updatedBy: one(member, {
    fields: [connection.updatedById],
    references: [member.id],
  }),
}));
