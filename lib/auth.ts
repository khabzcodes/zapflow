import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { organization } from 'better-auth/plugins';
import * as schemas from '@/db/schemas/auth-schema';
import { nanoid } from 'nanoid';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
      async sendInvitationEmail(invitation) {
        console.log('Sending invitation email to', invitation);
      },
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const organizations = await db
            .insert(schemas.organization)
            .values({
              id: user.id,
              name: `${user.name}'s organization`,
              slug: user.id,
              logo: null,
              createdAt: new Date(),
            })
            .returning();

          const organization = organizations[0];
          await db.insert(schemas.member).values({
            id: nanoid(),
            userId: user.id,
            organizationId: organization.id,
            role: 'owner',
            createdAt: new Date(),
          });
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
