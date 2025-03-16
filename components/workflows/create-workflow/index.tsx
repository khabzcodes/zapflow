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
import { Textarea } from '@/components/ui/textarea';
import { createOrganizationWorkflow } from '@/rpc/workflows';
import {
  CreateWorkflowInputData,
  createWorkflowSchema,
} from '@/validations/workflows';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type CreateWorkflowDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const CreateWorkflowDialog = ({
  isOpen,
  setIsOpen,
}: CreateWorkflowDialogProps) => {
  const router = useRouter();
  const form = useForm<CreateWorkflowInputData>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(createWorkflowSchema),
    mode: 'onChange',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (input: CreateWorkflowInputData) =>
      createOrganizationWorkflow(input),
    onSuccess: (response) => {
      toast.success('Workflow created successfully');
      router.push(`/workflow/editor/${response.id}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const onSubmit = useCallback(
    (data: CreateWorkflowInputData) => {
      mutate(data);
    },
    [mutate],
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new workflow</DialogTitle>
          <DialogDescription>
            Start building your automation workflow by creating a new workflow.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              size="sm">
              Create workflow
              {isPending && <Icons.spinner className="animate-spin" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
