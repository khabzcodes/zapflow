import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { updateOrganizationWorkflow } from '@/rpc/workflows';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';

export const SaveButton = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({
      workflowId,
      nodes,
      edges,
      viewPort,
    }: {
      workflowId: string;
      nodes: string;
      edges: string;
      viewPort: string;
    }) =>
      await updateOrganizationWorkflow(workflowId, {
        nodes,
        edges,
        viewPort,
      }),
    onSuccess: () => {
      toast.success('Workflow updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <Button
      disabled={isPending}
      size="sm"
      variant="secondary"
      onClick={async () => {
        const nodes = JSON.stringify(toObject().nodes);
        const edges = JSON.stringify(toObject().edges);
        const viewPort = JSON.stringify(toObject().viewport);
        await mutateAsync({ workflowId, nodes, edges, viewPort });
      }}>
      {isPending ? <Icons.spinner className="animate-spin" /> : <Icons.save />}
      Save
    </Button>
  );
};
