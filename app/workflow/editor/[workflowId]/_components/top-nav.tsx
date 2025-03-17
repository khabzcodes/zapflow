import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { updateOrganizationWorkflow } from '@/rpc/workflows';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type TopNavProps = {
  workflowId: string;
  title: string;
  description: string;
};
export const TopNav = ({ workflowId, title, description }: TopNavProps) => {
  const router = useRouter();
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
    <div className="flex p-2 border-b border-separate justify-between items-center w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1">
        <Icons.arrowLeft
          className="cursor-pointer"
          onClick={() => router.push('/app/workflows')}
        />
        <p className="font-bold">Workflow Editor</p>
      </div>
      <div className="text-center">
        <p className="font-bold">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <div className="flex gap-2">
        <Button
          disabled={isPending}
          size="sm"
          variant="outline">
          <Icons.play />
          Execute
        </Button>
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
          {isPending ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <Icons.save />
          )}
          Save
        </Button>
      </div>
    </div>
  );
};
