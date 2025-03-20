import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useExecutionPlan } from '@/hooks/workflows/use-execution-plan';
import { runWorkflow } from '@/rpc/workflows';
import { useMutation } from '@tanstack/react-query';

export const ExecuteButton = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();

  const mutation = useMutation({
    mutationFn: async (workflowId: string) => await runWorkflow(workflowId),
    onSuccess: () => {
      console.log('---Workflow Executed---');
    },
    onError: (error) => {
      console.error('---Error Executing Workflow---');
      console.error(error);
    },
  });
  return (
    <Button
      onClick={async () => {
        const plan = generate();
        if (!plan) {
          return;
        }
        await mutation.mutateAsync(workflowId);
      }}
      size="sm"
      variant="outline">
      <Icons.play />
      Execute
    </Button>
  );
};
