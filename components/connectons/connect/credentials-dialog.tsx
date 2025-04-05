import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { createOrganizationConnection } from '@/rpc/connections';
import { Connection, ConnectionInput } from '@/types/connection';
import { createConnectionInputsValidationSchema } from '@/validations/connections';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type CredentialsDialogProps = {
  connection: Connection;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const CredentialsDialog = ({
  connection,
  isOpen,
  setIsOpen,
}: CredentialsDialogProps) => {
  const mutation = useMutation({
    mutationFn: async (data: FormValues) =>
      createOrganizationConnection(
        connection.name,
        data.configName,
        data.credentials as ConnectionInput[], // Transform credentials into an array of ConnectionInput
      ),
    onSuccess: () => {
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const inputs = connection.inputs as ConnectionInput[];

  const validationSchema = createConnectionInputsValidationSchema(inputs);

  type FormValues = z.infer<typeof validationSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      configName: '',
      credentials: inputs.reduce(
        (acc, input) => ({
          ...acc,
          [input.name]: input.value || '',
        }),
        {},
      ),
    },
    mode: 'onChange',
  });

  const getConnectionInput = (
    name: string,
  ): ConnectionInput & { value: string } => {
    const formValues = form.getValues();
    const input = inputs.find((input) => input.name === name);
    if (!input) {
      throw new Error(`Input with name ${name} not found`);
    }
    return {
      ...input,
      value: formValues.credentials[name] || '',
    };
  };

  const handleSubmit = async (values: FormValues) => {
    // Transform credentials into the expected format
    const credentialsData = Object.keys(values.credentials).map((name) => ({
      ...getConnectionInput(name),
      value: values.credentials[name],
    }));

    await mutation.mutateAsync({
      configName: values.configName,
      credentials: credentialsData,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{connection.displayName} Credentials</DialogTitle>
          <DialogDescription>{connection.description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="configName"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Connection Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter configuration name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-800" />
                </FormItem>
              )}
            />
            {inputs.map((input) => (
              <FormField
                key={input.name}
                control={form.control}
                name={`credentials.${input.name}`}
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>{input.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter ${input.label.toLowerCase()}`}
                        type={input.type === 'password' ? 'password' : 'text'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-800" />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="submit"
              disabled={mutation.isPending}>
              Connect
              {mutation.isPending && (
                <Icons.spinner className="animate-spin ml-2" />
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
