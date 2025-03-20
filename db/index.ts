import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {
  user,
  session,
  organization,
  member,
  memberRelations,
} from './schemas/auth-schema';
import { integration } from './schemas/integration';
import { workflow } from './schemas/workflow';
import {
  workflowExecution,
  workflowExecutionRelations,
} from './schemas/workflow-execution';
import { workflowExecutionPhase } from './schemas/workflow-execution-phase';

const connectionString = process.env.DATABASE_URL!;

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, {
  schema: {
    user,
    session,
    organization,
    member,
    integration,
    workflow,
    workflowExecution,
    workflowExecutionPhase,
    // Relations
    memberRelations,
    workflowExecutionRelations,
  },
});
