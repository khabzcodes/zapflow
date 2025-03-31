import { ConnectionInput } from '@/types/connection';
import { z } from 'zod';

export const connectSchema = z.object({
  provider: z.string(),
});

export const createConnectionInputsValidationSchema = (
  inputs: ConnectionInput[],
) => {
  const credentialsSchema: Record<string, z.ZodType> = {};

  inputs.forEach((input) => {
    let fieldSchema = z.string();
    if (input.required) {
      fieldSchema = fieldSchema.min(1, `${input.label} is required`);
    }
    credentialsSchema[input.name] = fieldSchema;
  });

  // Separate schema for configuration
  return z.object({
    configName: z
      .string()
      .min(1, 'Configuration name is required')
      .max(50, 'Configuration name cannot exceed 50 characters')
      .regex(
        /^[a-zA-Z0-9-_ ]+$/,
        'Configuration name can only contain letters, numbers, spaces, hyphens and underscores',
      ),
    credentials: z.object(credentialsSchema),
  });
};
