import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { organization } from 'better-auth/plugins';
import * as schemas from '@/db/schemas/auth-schema';
import { nanoid } from 'nanoid';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schemas,
  }),
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
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
              name: user?.name
                ? `${user.name}'s Organization`
                : `${user.email.split('@')[0]}'s Organization`,
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
  socialProviders: {
    github: {
      enabled: true,
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
});
