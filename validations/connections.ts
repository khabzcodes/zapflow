import { ConnectionInput } from '@/types/connection';
import { z } from 'zod';

export const connectSchema = z.object({
  provider: z.string(),
});

export const createConnectionInputsValidationSchema = (
  inputs: ConnectionInput[],
) => {
  const schema: Record<string, z.ZodType> = {};

  inputs.forEach((input) => {
    let fieldSchema = z.string();

    if (input.required) {
      fieldSchema = fieldSchema.min(1, `${input.label} is required`);
    }

    schema[input.name] = fieldSchema;
  });

  return z.object(schema);
};
