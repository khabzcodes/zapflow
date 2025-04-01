import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { waitingListSchema } from '@/validations/waiting-list';
import {
  createWaitlistRecord,
  getWaitlistRecordByEmail,
} from '../services/waiting-list';

export const waitlistRoutes = new Hono().post(
  '/',
  zValidator('json', waitingListSchema),
  async (c) => {
    try {
      const body = c.req.valid('json');
      console.log('Received waitlist request:', body);
      const exists = await getWaitlistRecordByEmail(body.email.toLowerCase());
      if (exists) {
        return c.json({ error: 'You are already in the waiting list.' }, 409);
      }

      const waitlistRecord = await createWaitlistRecord(body);
      if (!waitlistRecord) {
        return c.json({ error: 'Failed to create waitlist record.' }, 500);
      }

      return c.json({ waitlistRecord }, 201);
    } catch (error) {
      console.error('Error creating waitlist record:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  },
);
