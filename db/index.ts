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

const connectionString = process.env.DATABASE_URL!;

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, {
  schema: {
    user,
    session,
    organization,
    member,
    integration,
    // Relations
    memberRelations,
  },
});
