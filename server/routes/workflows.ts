import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createWorkflowSchema } from '@/validations/workflows';
import { getMemberByOrganizationAndUserId } from '../services/members';
import {
  createWorkflow,
  getWorkflowsByOrganizationId,
} from '../services/workflows';

export const workflowRoutes = new Hono<{
  Variables: {
    session: typeof auth.$Infer.Session.session | null;
  };
}>()
  .get('/', async (c) => {
    try {
      const session = c.get('session');
      if (!session || !session.activeOrganizationId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const workflows = await getWorkflowsByOrganizationId(
        session.activeOrganizationId,
      );

      return c.json({ workflows }, 200);
    } catch (error) {
      console.log(error);

      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .post('/', zValidator('json', createWorkflowSchema), async (c) => {
    try {
      const body = c.req.valid('json');

      const session = c.get('session');
      if (!session || !session.activeOrganizationId || !session.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const member = await getMemberByOrganizationAndUserId(
        session.activeOrganizationId,
        session.userId,
      );
      if (!member) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const workflow = await createWorkflow(
        session.activeOrganizationId,
        member.id,
        body,
      );
      if (!workflow) {
        return c.json({ error: 'Failed to create workflow' }, 500);
      }

      return c.json({ workflow }, 201);
    } catch (error) {
      console.log(error);

      return c.json({ error: 'Internal Server Error' }, 500);
    }
  });
