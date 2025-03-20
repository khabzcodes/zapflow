import { useFlowValidation } from '@/hooks/workflows/use-flow-validation';
import { cn } from '@/lib/utils';
import { useReactFlow } from '@xyflow/react';

type NodeCardProps = {
  nodeId: string;
  selected: boolean;
  readonly children: React.ReactNode;
};

export const NodeCard = ({ nodeId, selected, children }: NodeCardProps) => {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();

  const hasValidationErrors = invalidInputs.some(
    (input) => input.nodeId === nodeId,
  );

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;

        const { position, measured } = node;
        if (!position || !measured) return;

        const { width, height } = measured;
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;
        if (x === undefined || y === undefined) return;

        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        });
      }}
      className={cn(
        'bg-background border-2 w-[420px] gap-1 flex flex-col drag-handle',
        selected && 'border-primary',
        hasValidationErrors && 'border-destructive',
      )}>
      {children}
    </div>
  );
};
