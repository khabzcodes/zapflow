import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const heardAboutUsEnum = pgEnum('hear_about_us', [
  'social_media',
  'search_engine',
  'other',
]);

export const waitList = pgTable('wait_list', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  organization: text('organization'),
  heardAboutUs: heardAboutUsEnum('hear_about_us').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
