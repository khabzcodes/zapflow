import { hc } from 'hono/client';
import type { AppTypes } from '@/server';

const baseAppUrl = process.env.BETTER_AUTH_URL || 'http://localhost:3000';

export const client = hc<AppTypes>(baseAppUrl);
export const baseApiRoute = client.api.server;
