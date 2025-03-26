import { jsonb, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { workflowExecution } from './workflow-execution';
import { relations } from 'drizzle-orm';

export const executionPhaseStatusEnum = pgEnum('execution_phase_status', [
  'created',
  'running',
  'completed',
  'failed',
]);

export const workflowExecutionPhase = pgTable('workflow_execution_phases', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  workflowExecutionId: text('workflow_execution_id')
    .notNull()
    .references(() => workflowExecution.id),
  status: executionPhaseStatusEnum('status').notNull().default('created'),
  phaseNumber: text('phase_number').notNull(),
  node: jsonb('node').notNull().default({}),
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
  inputs: jsonb('inputs').notNull().default({}),
  outputs: jsonb('outputs').notNull().default({}),
});

export const workflowExecutionPhaseRelations = relations(
  workflowExecutionPhase,
  ({ one }) => ({
    workflowExecution: one(workflowExecution, {
      fields: [workflowExecutionPhase.workflowExecutionId],
      references: [workflowExecution.id],
    }),
  }),
);
