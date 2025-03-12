import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { sessionRoutes } from './routes/session';

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    member: typeof auth.$Infer.Member | null;
    organization: typeof auth.$Infer.Organization | null;
  };
}>().basePath('/api/server');

app.on(['POST', 'GET', 'PUT', 'DELETE', 'PATCH'], '/api/server/*', (c) => {
  return auth.handler(c.req.raw);
});

app.use('*', async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  const member = await auth.api.getActiveMember({ headers: c.req.raw.headers });
  const organization = await auth.api.setActiveOrganization({
    body: {
      organizationId: session?.session.activeOrganizationId,
    },
  });

  if (!session) {
    c.set('user', null);
    c.set('session', null);
    c.set('member', null);
    c.set('organization', null);
    return next();
  }

  c.set('user', session.user);
  c.set('session', session.session);
  c.set('member', member);
  c.set('organization', organization);
  return next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/session', sessionRoutes);

export default app;
export type AppTypes = typeof routes;
