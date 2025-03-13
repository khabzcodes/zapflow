import { auth } from '@/lib/auth';
import { Hono } from 'hono';
import { google } from 'googleapis';
import { createIntegration } from '../services/integrations';
import { getMemberByOrganizationAndUserId } from '../services/members';

export const connectionRoutes = new Hono<{
  Variables: {
    session: typeof auth.$Infer.Session.session | null;
  };
}>()
  .get('/connect/google-sheets', async (c) => {
    try {
      const session = c.get('session');
      if (!session || !session.activeOrganizationId) {
        return c.json({ message: 'Unauthorized' });
      }
      const oauthClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${process.env.BETTER_AUTH_URL}/api/server/connections/callback/google-sheet`,
      );

      const authUrl = oauthClient.generateAuthUrl({
        scope:
          'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/spreadsheets',
        access_type: 'offline',
        prompt: 'consent',
      });

      return c.redirect(authUrl);
    } catch (error) {
      // TODO: logger
      console.log(error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  })
  .get('/callback/google-sheet', async (c) => {
    try {
      const session = c.get('session');
      if (!session || !session.activeOrganizationId || !session.userId) {
        return c.json({ message: 'Unauthorized' }, 401);
      }
      const code = c.req.query('code');
      if (!code) {
        return c.json({ error: 'Invalid code' }, 400);
      }

      const oauthClient = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${process.env.BETTER_AUTH_URL}/api/server/connections/callback/google-sheet`,
      );

      const { tokens } = await oauthClient.getToken(code);

      const organizationId = session.activeOrganizationId;
      const userId = session.userId;
      const appName = 'google-sheets';
      const credentials = JSON.stringify(tokens);

      const member = await getMemberByOrganizationAndUserId(
        organizationId,
        userId,
      );
      if (!member) {
        return c.json({ error: 'Member not found' }, 404);
      }

      const integration = await createIntegration(
        organizationId,
        member.id,
        appName,
        credentials,
      );
      if (!integration) {
        return c.json({ error: 'Failed to create integration' }, 500);
      }

      return c.redirect(`${process.env.BETTER_APP_URL}/app/integrations`);
    } catch (error) {
      // TODO: logger
      console.log(error);
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  });
