import { z } from 'zod';
import { heardAboutUsEnum } from '@/db/schemas/wait-list';

export const heardAboutUsOptions = heardAboutUsEnum.enumValues;

export const waitingListSchema = z.object({
  name: z
    .string({
      message: 'Name is required',
    })
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string({
      message: 'Email is required.',
    })
    .email({
      message: 'Please enter a valid email address',
    }),
  organization: z.string().optional(),
  heardFromUs: z.enum(heardAboutUsEnum.enumValues, {
    errorMap: () => ({ message: 'Please select how you heard about us' }),
  }),
});

export type WaitingListFormData = z.infer<typeof waitingListSchema>;
