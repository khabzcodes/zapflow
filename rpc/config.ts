import { hc } from 'hono/client';
import type { AppTypes } from '@/server';

const baseAppUrl =
  process.env.NEXT_PUBLIC_BASE_ROUTE || 'http://localhost:3000';

export const client = hc<AppTypes>(baseAppUrl);
export const baseApiRoute = client.api.server;
