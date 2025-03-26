import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { getExecutionById } from '../services/workflow-execution';
import { IWorkflowExecutionWithPhase } from '@/types/workflow-execution';

export const workflowExecutionRoutes = new Hono<{
  Variables: {
    session: typeof auth.$Infer.Session.session | null;
  };
}>().get('/:id', async (c) => {
  try {
    const session = c.get('session');
    const workflowExecutionId = c.req.param('id');
    if (!session || !session.activeOrganizationId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const executionResult = await getExecutionById(workflowExecutionId);
    if (!executionResult) {
      return c.json({ error: 'Execution not found' }, 404);
    }
    const execution: IWorkflowExecutionWithPhase = executionResult;

    return c.json({ execution }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});
