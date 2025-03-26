import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useExecutionPlan } from '@/hooks/workflows/use-execution-plan';
import { runWorkflow } from '@/rpc/workflows';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const ExecuteButton = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (workflowId: string) => runWorkflow(workflowId),
    onSuccess: (response) => {
      router.push(`/workflow/executions/${response.executionId}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          return;
        }
        mutation.mutate(workflowId);
      }}
      size="sm"
      variant="outline">
      {mutation.isPending ? (
        <Icons.spinner className="animate-spin" />
      ) : (
        <Icons.play />
      )}
      Execute
    </Button>
  );
};
