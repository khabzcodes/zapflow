import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import {
  createWorkflowSchema,
  updateWorkflowSchema,
} from '@/validations/workflows';
import { getMemberByOrganizationAndUserId } from '../services/members';
import {
  createWorkflow,
  getWorkflowById,
  getWorkflowsByOrganizationId,
  updateWorkflow,
} from '../services/workflows';
import { AppNode } from '@/types/app-node';
import { Edge } from '@xyflow/react';
import { FlowToExecutionPlan } from '@/lib/workflows/execution-plan';
import {
  createExecution,
  executeWorkflow,
} from '../services/workflow-execution';

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
  .get('/:id', async (c) => {
    try {
      const workflowId = c.req.param('id');
      const session = c.get('session');
      if (!session || !session.activeOrganizationId || !session.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const member = await getMemberByOrganizationAndUserId(
        session.activeOrganizationId,
        session.userId,
      );
      if (!member || member.organizationId !== session.activeOrganizationId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const workflow = await getWorkflowById(workflowId);
      if (!workflow) {
        return c.json({ error: 'Workflow not found' }, 404);
      }

      return c.json({ workflow }, 200);
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
  })
  .put('/:id', zValidator('json', updateWorkflowSchema), async (c) => {
    try {
      const workflowId = c.req.param('id');
      const body = c.req.valid('json');

      const session = c.get('session');
      if (!session || !session.activeOrganizationId || !session.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const member = await getMemberByOrganizationAndUserId(
        session.activeOrganizationId,
        session.userId,
      );

      if (!member || member.organizationId !== session.activeOrganizationId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const workflow = await getWorkflowById(workflowId);
      if (!workflow) {
        return c.json({ error: 'Workflow not found' }, 404);
      }

      const updatedWorkflow = await updateWorkflow(
        workflowId,
        body.nodes,
        body.edges,
        body.viewPort,
        member.id,
      );
      if (!updatedWorkflow) {
        return c.json({ error: 'Failed to update workflow' }, 500);
      }

      return c.json({ workflow: updatedWorkflow }, 200);
    } catch (error) {
      console.log(error);

      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .post('/:id/run', async (c) => {
    try {
      const session = c.get('session');
      const workflowId = c.req.param('id');

      if (!session || !session.activeOrganizationId || !session.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const workflow = await getWorkflowById(workflowId);
      if (!workflow) {
        return c.json({ error: 'Workflow not found' }, 404);
      }

      const nodes = workflow.nodes as AppNode[];
      const edges = workflow.edges as Edge[];

      const { executionPlan, error } = FlowToExecutionPlan(nodes, edges);
      if (error || !executionPlan) {
        return c.json({ error: 'Failed to create execution plan' }, 500);
      }

      const execution = await createExecution(
        workflowId,
        session.activeOrganizationId,
        executionPlan,
      );

      if (execution.status === 'pending') {
        executeWorkflow(execution.id);
      }

      return c.json(
        {
          workflowId: workflowId,
          executionId: execution.id,
        },
        201,
      );
    } catch (error) {
      console.log(error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  });
