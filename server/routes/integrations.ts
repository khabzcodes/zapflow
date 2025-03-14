import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { getIntegrationsByOrganizationId } from '../services/integrations';

export const integrationRoutes = new Hono<{
  Variables: {
    session: typeof auth.$Infer.Session.session | null;
  };
}>()
  .get('/', async (c) => {
    try {
      const session = c.get('session');
      if (!session || !session.activeOrganizationId)
        return c.json({ error: 'Unauthorized' }, 401);

      const integrations = await getIntegrationsByOrganizationId(
        session.activeOrganizationId,
      );

      return c.json({ integrations }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .get('/:name', async (c) => {
    try {
      const session = c.get('session');
      if (!session || !session.activeOrganizationId)
        return c.json({ error: 'Unauthorized' }, 401);

      const name = c.req.param('name');

      const integrations = await getIntegrationsByOrganizationId(
        session.activeOrganizationId,
      );

      const integration = integrations.find(
        (integration) => integration.appName === name,
      );

      return c.json({ integration }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  });
