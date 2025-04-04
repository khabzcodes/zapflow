import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { memberRoutes } from './routes/members';
import { connectionRoutes } from './routes/connections';
import { integrationRoutes } from './routes/integrations';
import { workflowRoutes } from './routes/workflows';
import { workflowExecutionRoutes } from './routes/workflow-executions';
import { workflowExecutionPhaseRoutes } from './routes/workflow-execution-phases';
import { waitlistRoutes } from './routes/waiting-list';

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    member: typeof auth.$Infer.Member | null;
  };
}>().basePath('/api/server');

app.on(['POST', 'GET', 'PUT', 'DELETE', 'PATCH'], '/api/server/*', (c) => {
  return auth.handler(c.req.raw);
});

app.use('*', async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  const member = await auth.api.getActiveMember({ headers: c.req.raw.headers });

  if (!session) {
    c.set('user', null);
    c.set('session', null);
    c.set('member', null);
    return next();
  }

  c.set('user', session.user);
  c.set('session', session.session);
  c.set('member', member);
  return next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route('/public/waitingList', waitlistRoutes)
  .route('/protected/members', memberRoutes)
  .route('/protected/connections', connectionRoutes)
  .route('/protected/integrations', integrationRoutes)
  .route('/protected/workflows', workflowRoutes)
  .route('/protected/workflowExecutions', workflowExecutionRoutes)
  .route('/protected/workflowExecutionPhases', workflowExecutionPhaseRoutes);

export default app;
export type AppTypes = typeof routes;
