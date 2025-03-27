import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { workflow } from './workflow';
import { organization } from './auth-schema';
import { relations } from 'drizzle-orm';
import { workflowExecutionPhase } from './workflow-execution-phase';

export const triggerTypeEnum = pgEnum('trigger_type', ['manual', 'scheduled']);
export const executionStatusEnum = pgEnum('execution_status', [
  'pending',
  'running',
  'completed',
  'failed',
]);

export const workflowExecution = pgTable('workflow_executions', {
  id: text('id').primaryKey(),
  workflowId: text('workflow_id')
    .notNull()
    .references(() => workflow.id),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id),
  trigger: triggerTypeEnum('trigger').notNull().default('manual'),
  status: executionStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
});

export const workflowExecutionRelations = relations(
  workflowExecution,
  ({ one, many }) => ({
    workflow: one(workflow, {
      fields: [workflowExecution.workflowId],
      references: [workflow.id],
    }),
    organization: one(organization, {
      fields: [workflowExecution.organizationId],
      references: [organization.id],
    }),
    phases: many(workflowExecutionPhase),
  }),
);
