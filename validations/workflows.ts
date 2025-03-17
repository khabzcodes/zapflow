import { z } from 'zod';

export const createWorkflowSchema = z.object({
  name: z
    .string({
      message: 'Name is required',
    })
    .min(1, {
      message: 'Name is required',
    })
    .max(50, {
      message: 'Name must be less than 50 characters',
    }),

  description: z.string().max(500, {
    message: 'Description must be less than 500 characters',
  }),
});

export const updateWorkflowSchema = z.object({
  nodes: z.string(),
  edges: z.string(),
  viewPort: z.string(),
});

export type CreateWorkflowInputData = z.infer<typeof createWorkflowSchema>;
export type UpdateWorkflowInputData = z.infer<typeof updateWorkflowSchema>;
