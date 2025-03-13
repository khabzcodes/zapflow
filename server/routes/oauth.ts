import { auth } from '@/lib/auth';
import { Hono } from 'hono';

export const oauthRoutes = new Hono<{
  Variables: {
    session: typeof auth.$Infer.Session.session | null;
  };
}>().get('/google', async (c) => {
  try {
    const session = c.get('session');
    if (!session || !session.activeOrganizationId)
      return c.json({ error: 'Unauthorized' }, 401);
  } catch (error) {
    console.log(error);
  }
});
