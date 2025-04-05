import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { getMemberByOrganizationAndUserId } from '../services/members';
import { createOrganizationConnection } from '../services/connections';
import { ConnectionInput } from '@/types/connection';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { createLogger } from '@/lib/loggers/console-logger';
import { encrypt } from '@/utils/crypto';

const logger = createLogger('WaitingListRoutes');

export const connectionRoutes = new Hono<{
  Variables: {
    session: typeof auth.$Infer.Session.session | null;
  };
}>().post(
  '/credentials/:provider',
  zValidator(
    'json',
    z.object({
      configName: z.string().min(1, 'Configuration name is required'),
      credentials: z.array(
        z.object({
          name: z.string(),
          label: z.string(),
          type: z.string(),
          required: z.boolean(),
          variant: z.string().optional(),
          value: z.string(),
        }),
      ),
    }),
  ),
  async (c) => {
    try {
      const body: {
        configName: string;
        credentials: ConnectionInput[];
      } = await c.req.json();

      const session = c.get('session');
      const provider = c.req.param('provider');

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

      const encryptedCredentials: ConnectionInput[] = body.credentials.map(
        (credential) => ({
          ...credential,
          value: encrypt(credential.value),
        }),
      );

      console.table(encryptedCredentials);
      console.table(body.credentials);

      await createOrganizationConnection(
        session.activeOrganizationId,
        provider,
        member.id,
        body.configName,
        encryptedCredentials,
      );

      return c.json(
        {
          message: 'Connection created successfully',
        },
        200,
      );
    } catch (error) {
      logger.error('Error creating connection:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
);
