import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { getMembersByOrganizationId } from '../services/members';
import { APIError } from 'better-call';

export const memberRoutes = new Hono<{
  Variables: {
    session: typeof auth.$Infer.Session.session | null;
  };
}>().get('/', async (c) => {
  try {
    const session = c.get('session');
    console.log(session);
    if (!session || !session.activeOrganizationId)
      return c.json({ error: 'Unauthorized' }, 401);

    const members = await getMembersByOrganizationId(
      session.activeOrganizationId,
    );

    return c.json({ members }, 200);
  } catch (error) {
    if (error instanceof APIError) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});
