import { auth } from '@/lib/auth';
import { Hono } from 'hono';

export const sessionRoutes = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    member: typeof auth.$Infer.Member | null;
  };
}>().get('/', async (c) => {
  try {
    const session = c.get('session');
    const member = c.get('member');
    const user = c.get('user');

    if (!session || !member || !user)
      return c.json({ error: 'Unauthorized' }, 401);

    return c.json({ session, member, user }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});
