import { z } from 'zod';

export const connectSchema = z.object({
  provider: z.string(),
});
