import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { getExecutionPhaseById } from '../services/workflow-execution-phase';

export const workflowExecutionPhaseRoutes = new Hono<{
  Variables: {
    session: typeof auth.$Infer.Session.session | null;
  };
}>().get('/:id', async (c) => {
  try {
    const session = c.get('session');
    const workflowExecutionPhaseId = c.req.param('id');
    if (!session || !session.activeOrganizationId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const phase = await getExecutionPhaseById(workflowExecutionPhaseId);
    if (!phase) {
      return c.json({ error: 'Phase not found' }, 404);
    }

    return c.json({ phase }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});
